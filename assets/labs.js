(function () {
  var BL = window.BL, h = BL.h;
  var TABS = [['fundamentos', 'Fundamentos'], ['topologia', 'Topologia'], ['passos', 'Passo a passo'], ['erros', 'Erros'], ['reflexao', 'Reflexão']];

  function sideLabs(cur) {
    var kids = [h('a', { class: 'item' + (cur === 'visao' ? ' on' : ''), href: '#/labs' }, 'Visão geral'),
      h('a', { class: 'item' + (cur === 'topologia' ? ' on' : ''), href: '#/labs/topologia' }, '🗺 Topologia interativa')];
    BL.data.labs.fases.forEach(function (f) {
      kids.push(h('h4', {}, f.nome));
      f.labs.forEach(function (id) {
        var l = BL.labById[id], pr = BL.labProgress(l);
        kids.push(h('a', { class: 'item' + (cur === id ? ' on' : '') + (pr.done === pr.total && pr.total ? ' done' : ''), href: '#/labs/' + id },
          h('span', { class: 'ck' }, pr.done === pr.total && pr.total ? '✓' : ''), l.short + ': ' + l.nome));
      });
    });
    return kids;
  }

  BL.views.labs = function (root, p) {
    if (p[0] === 'topologia') return topoPage(root);
    if (p[0] && BL.labById[p[0]]) return labPage(root, p[0], p[1] || 'fundamentos');
    overview(root);
  };

  function overview(root) {
    var main = [h('h1', {}, 'Laboratórios'),
      h('p', { class: 'lead' }, 'A parte prática. Cada laboratório começa pelo fundamento (para você entender o que está fazendo), mostra a topologia, explica o porquê de cada passo e termina com erros para você diagnosticar.'),
      h('div', { class: 'callout' }, h('strong', {}, 'O ritmo de cada lab: '), 'Fundamentos → Topologia → Passo a passo → Erros → Reflexão.'),
      h('div', { class: 'row' }, h('a', { class: 'btn primary', href: '#/labs/topologia' }, '🗺 Abrir a topologia interativa'))];
    BL.data.labs.fases.forEach(function (f) {
      main.push(h('h2', {}, f.nome));
      var g = h('div', { class: 'grid' });
      f.labs.forEach(function (id) {
        var l = BL.labById[id], pr = BL.labProgress(l);
        g.append(h('a', { class: 'card', href: '#/labs/' + id }, h('h3', {}, l.short + ': ' + l.nome), h('p', { class: 'muted' }, l.objetivo.length > 130 ? l.objetivo.slice(0, 127) + '…' : l.objetivo), BL.bar(pr.pct), h('small', { class: 'muted' }, pr.done + ' de ' + pr.total + ' passos')));
      });
      main.push(g);
    });
    root.append(BL.layout(sideLabs('visao'), main, true));
  }

  function topoPage(root) {
    var box = h('div');
    var main = [h('h1', {}, 'Topologia interativa'),
      h('p', { class: 'lead' }, 'O backbone inteiro em um só lugar. Troque a camada para ver o que cada uma faz, simule falhas, altere custos do OSPF e acompanhe um pacote salto a salto.'),
      box];
    root.append(BL.layout(sideLabs('topologia'), main, true));
    window.Topo.mount(box, { stage: 3, layer: 'fisica', hint: 'Experimente: escolha "MPLS-TE", clique em "Derrubar R2" e depois em "Enviar pacote".' });
  }

  function labPage(root, id, tab) {
    var l = BL.labById[id], pr = BL.labProgress(l);
    var tabs = TABS.slice(); if (l.configs) tabs.push(['configs', 'Configs de referência']);
    if (!tabs.some(function (t) { return t[0] === tab; })) tab = 'fundamentos';
    var content = h('div');
    var main = [h('div', { class: 'muted' }, l.fase),
      h('h1', {}, l.titulo),
      BL.bar(pr.pct), h('p', { class: 'muted' }, pr.done + ' de ' + pr.total + ' passos concluídos'),
      h('div', { class: 'subtabs' }, tabs.map(function (t) { return h('a', { class: tab === t[0] ? 'on' : '', href: '#/labs/' + id + '/' + t[0] }, t[1]); })),
      content];
    root.append(BL.layout(sideLabs(id), main));
    ({ fundamentos: tFund, topologia: tTopo, passos: tPassos, erros: tErros, reflexao: tRef, configs: tCfg }[tab])(content, l);
    var i = tabs.findIndex(function (t) { return t[0] === tab; });
    if (i < tabs.length - 1) content.append(h('div', { class: 'row' }, h('a', { class: 'btn primary', href: '#/labs/' + id + '/' + tabs[i + 1][0] }, 'Próximo: ' + tabs[i + 1][1] + ' →')));
  }

  function tFund(c, l) {
    c.append(h('div', { class: 'callout' }, h('strong', {}, 'Objetivo: '), l.objetivo));
    c.append(h('h2', {}, 'Por que isso importa'), h('p', {}, l.por_que));
    var md = h('div'); BL.mountMd(md, l.fundamentos); c.append(h('h2', {}, 'Fundamentos'), md);
    if (l.pre.length) c.append(h('h2', {}, 'Antes de começar'), h('ul', {}, l.pre.map(function (x) { return h('li', {}, x); })));
    var reads = h('div', { class: 'row' });
    l.leitura.forEach(function (id) { var p = BL.pageById[id]; if (p) reads.append(h('a', { class: 'btn sm' + (BL.state.studied[id] ? ' on' : ''), href: '#/conceitos/' + id }, (BL.state.studied[id] ? '✓ ' : '📖 ') + p.title)); });
    c.append(h('h2', {}, 'Leitura recomendada'), h('p', { class: 'muted' }, 'Estude estes conceitos antes ou durante o lab.'), reads);
    c.append(h('h2', {}, 'O que costuma cair na prova'), h('ul', {}, l.prova.map(function (x) { return h('li', {}, x); })));
  }

  function tTopo(c, l) {
    var box = h('div'); c.append(box);
    window.Topo.mount(box, { stage: l.topo.stage, layer: l.topo.layer, svc: l.topo.svc || 'l2', hint: l.topo.dica });
    c.append(h('p', { class: 'muted' }, h('a', { href: '#/labs/topologia' }, 'Abrir a topologia em tela cheia')));
  }

  function tPassos(c, l) {
    var arr = BL.state.steps[l.folder] = BL.state.steps[l.folder] || [];
    c.append(h('p', {}, 'Cada passo vem com o ', h('strong', {}, 'porquê'), ', para você entender o que está fazendo e não apenas digitar comandos. Marque os passos conforme concluir.'));
    var all = false; var whys = [];
    var tg = h('button', { class: 'btn sm', type: 'button', onclick: function () { all = !all; whys.forEach(function (w) { w.classList.toggle('hidden', !all); }); tg.textContent = all ? 'Esconder todos os porquês' : 'Mostrar todos os porquês'; } }, 'Mostrar todos os porquês');
    c.append(h('div', { class: 'row' }, tg));
    l.passos.forEach(function (s, i) {
      var why = h('div', { class: 'why hidden' }, h('strong', {}, 'Por que: '), s[1]); whys.push(why);
      var cb = h('input', { type: 'checkbox', 'aria-label': 'Concluir passo ' + (i + 1) }); cb.checked = !!arr[i];
      var box = h('div', { class: 'step' + (arr[i] ? ' done' : '') });
      cb.onchange = function () { arr[i] = cb.checked; BL.save(); box.classList.toggle('done', cb.checked); upd(); };
      var btn = h('button', { class: 'btn sm', type: 'button', onclick: function () { why.classList.toggle('hidden'); } }, 'Por quê?');
      box.append(h('div', { class: 'top' }, cb, h('div', { class: 'num' }, i + 1), h('div', { class: 'txt' }, s[0]), btn), why);
      c.append(box);
    });
    var sum = h('div', { class: 'callout' }); c.append(sum);
    function upd() { var d = l.passos.filter(function (_, i) { return arr[i]; }).length; sum.textContent = d + ' de ' + l.passos.length + ' passos concluídos.'; }
    upd();
    var obs = BL.state.obs[l.folder] = BL.state.obs[l.folder] || [];
    c.append(h('h2', {}, 'O que observar'), h('p', { class: 'muted' }, 'Depois de configurar, confirme cada item. É assim que você sabe que o lab funcionou.'));
    l.observar.forEach(function (o, i) {
      var cb = h('input', { type: 'checkbox' }); cb.checked = !!obs[i]; cb.onchange = function () { obs[i] = cb.checked; BL.save(); };
      c.append(h('label', { class: 'chk', style: 'margin:6px 0' }, cb, h('span', { html: BL.md.renderInline(o) })));
    });
    c.append(h('h2', {}, 'Teste de falha'), h('ul', {}, l.falha.map(function (x) { return h('li', {}, x); })));
  }

  function tErros(c, l) {
    c.append(h('p', {}, 'Depois que o lab funciona, ', h('strong', {}, 'quebre de propósito'), ' e treine a investigação. Para cada sintoma, escolha a causa mais provável e leia o raciocínio.'));
    var res = BL.state.diag[l.folder] = BL.state.diag[l.folder] || {};
    var pool = []; BL.data.labs.labs.forEach(function (x) { if (x.folder !== l.folder) x.erros.forEach(function (e) { pool.push(e[0]); }); });
    l.erros.forEach(function (e, i) {
      var others = l.erros.filter(function (_, j) { return j !== i; }).map(function (x) { return x[0]; });
      var extra = BL.shuffle(pool).filter(function (x) { return others.indexOf(x) < 0 && x !== e[0]; });
      var opts = BL.shuffle([e[0]].concat(BL.shuffle(others).concat(extra).slice(0, 3)));
      var card = h('div', { class: 'card', style: 'margin:12px 0' });
      card.append(h('div', { class: 'muted' }, 'Cenário ' + (i + 1)), h('h3', {}, 'Sintoma: ' + e[1]), h('p', {}, 'Qual a causa mais provável?'));
      var box = h('div'), done = false;
      opts.forEach(function (o) {
        var b = h('button', { class: 'opt', type: 'button' }, o);
        b.onclick = function () {
          if (done) return; done = true; var ok = o === e[0];
          box.querySelectorAll('button').forEach(function (x) { x.disabled = true; if (x.textContent === e[0]) x.classList.add('ok'); });
          if (!ok) b.classList.add('bad');
          res[i] = ok; BL.save();
          box.append(h('div', { class: 'exp' }, h('strong', {}, ok ? 'Correto. ' : 'Não é essa. A causa era: ' + e[0] + '. '), h('br'), h('strong', {}, 'Como raciocinar: '), e[2]));
        };
        box.append(b);
      });
      card.append(box); c.append(card);
    });
  }

  function tRef(c, l) {
    c.append(h('p', {}, 'Responda por escrito, com suas palavras. Explicar é a melhor forma de descobrir o que ainda não ficou claro. Suas respostas ficam salvas neste navegador.'));
    l.reflexao.forEach(function (q, i) {
      var key = l.folder + ':' + i;
      var ta = h('textarea', { placeholder: 'Sua resposta...' }); ta.value = BL.state.notes[key] || '';
      ta.oninput = function () { BL.state.notes[key] = ta.value; BL.save(); };
      c.append(h('div', { class: 'card', style: 'margin:12px 0' }, h('h3', {}, (i + 1) + '. ' + q), ta));
    });
  }

  function tCfg(c, l) {
    c.append(h('div', { class: 'callout warn' }, 'Tente montar o lab raciocinando pelos passos e só depois compare com estes arquivos. Confirme os nomes das portas no seu equipamento antes de colar qualquer coisa.'));
    l.configs.forEach(function (cf) {
      var d = h('div'); BL.mountMd(d, '```\n' + cf.texto + '\n```');
      c.append(h('h2', {}, cf.nome), d);
    });
  }
})();
