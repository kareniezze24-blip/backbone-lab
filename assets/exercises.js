(function () {
  var BL = window.BL, h = BL.h;
  var MENU = [['', 'Visão geral'], ['quiz', 'Quiz por tema'], ['simulado', 'Simulado'], ['subredes', 'Treino de sub-redes'], ['flashcards', 'Flashcards'], ['diagnostico', 'Cenários de diagnóstico'], ['desempenho', 'Meu desempenho']];
  function side(cur) { return [h('h4', {}, 'Praticar')].concat(MENU.map(function (m) { return h('a', { class: 'item' + (cur === m[0] ? ' on' : ''), href: '#/exercicios' + (m[0] ? '/' + m[0] : '') }, m[1]); })); }
  function today() { return new Date().toISOString().slice(0, 10); }

  BL.views.exercicios = function (root, p) {
    var t = p[0] || '', box = h('div');
    root.append(BL.layout(side(t), box, true));
    ({ '': hub, quiz: quizView, simulado: simulado, subredes: subredes, flashcards: flashcards, diagnostico: diagnostico, desempenho: desempenho }[t] || hub)(box, p.slice(1));
  };

  function hub(c) {
    c.append(h('h1', {}, 'Exercícios'), h('p', { class: 'lead' }, 'Praticar é o que fixa. Escolha o formato que combina com o seu momento de estudo.'));
    var items = [['quiz', 'Quiz por tema', '9 temas com correção imediata e explicação. Ideal logo depois de estudar um conceito.'],
      ['simulado', 'Simulado', 'Questões sorteadas de todos os temas, com cronômetro. Para testar o nível geral.'],
      ['subredes', 'Treino de sub-redes', 'Questões novas a cada vez, mais uma calculadora. Sub-rede precisa sair de cabeça.'],
      ['flashcards', 'Flashcards', 'Cartões de revisão: conceitos, glossário, portas e números de prova.'],
      ['diagnostico', 'Cenários de diagnóstico', 'Veja o sintoma e descubra a causa, como em um chamado real.'],
      ['desempenho', 'Meu desempenho', 'Acompanhe resultados, pontos fracos e o que revisar.']];
    var g = h('div', { class: 'grid' });
    items.forEach(function (i) { g.append(h('a', { class: 'card', href: '#/exercicios/' + i[0] }, h('h3', {}, i[1]), h('p', { class: 'muted' }, i[2]))); });
    c.append(g);
  }

  // ================= motor de quiz =================
  function runQuiz(c, list, label, o) {
    o = o || {};
    var S = { list: list, i: 0, correct: 0, wrong: [], t0: Date.now() };
    var timerEl = h('span', { class: 'muted' }), tick = null;
    if (o.timer) { tick = setInterval(function () { if (!document.body.contains(timerEl)) { clearInterval(tick); return; } var s = Math.floor((Date.now() - S.t0) / 1000); timerEl.textContent = '⏱ ' + Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }, 500); }
    function q() {
      c.innerHTML = ''; var x = S.list[S.i];
      c.append(h('div', { class: 'muted' }, label + ' · Questão ' + (S.i + 1) + ' de ' + S.list.length + ' · Acertos: ' + S.correct + ' ', o.timer ? timerEl : null), BL.bar(Math.round(S.i / S.list.length * 100)), h('h2', {}, x.q));
      if (x.t === 'mc') {
        var order = BL.shuffle(x.opts.map(function (t, i) { return { t: t, ok: i === x.ans }; })), box = h('div'), done = false;
        order.forEach(function (op, idx) {
          var b = h('button', { class: 'opt', type: 'button' }, String.fromCharCode(65 + idx) + ') ' + op.t);
          b.onclick = function () {
            if (done) return; done = true;
            box.querySelectorAll('button').forEach(function (bb, j) { bb.disabled = true; if (order[j].ok) bb.classList.add('ok'); });
            if (op.ok) S.correct++; else { b.classList.add('bad'); S.wrong.push(x); }
            box.append(h('div', { class: 'exp' }, h('strong', {}, op.ok ? 'Correto. ' : 'Incorreto. '), x.exp || ''), h('div', { class: 'row' }, nextBtn()));
          };
          box.append(b);
        });
        c.append(box);
      } else {
        var ta = h('textarea', { placeholder: 'Escreva sua resposta antes de ver o gabarito...' }), res = h('div');
        var show = h('button', { class: 'btn primary', type: 'button' }, 'Mostrar resposta');
        show.onclick = function () {
          show.disabled = true;
          res.append(h('div', { class: 'exp' }, h('strong', {}, 'Resposta esperada: '), x.ans, x.exp ? h('p', { class: 'muted' }, x.exp) : null),
            h('div', { class: 'row' }, h('span', {}, 'Como foi a sua resposta?'),
              h('button', { class: 'btn', type: 'button', onclick: function () { S.correct++; next(); } }, 'Acertei'),
              h('button', { class: 'btn', type: 'button', onclick: function () { S.wrong.push(x); next(); } }, 'Errei ou faltou algo')));
        };
        c.append(ta, h('div', { class: 'row' }, show), res);
      }
    }
    function nextBtn() { return h('button', { class: 'btn primary', type: 'button', onclick: next }, S.i + 1 < S.list.length ? 'Próxima' : 'Ver resultado'); }
    function next() { S.i++; if (S.i < S.list.length) q(); else finish(); }
    function finish() {
      if (tick) clearInterval(tick);
      var total = S.list.length, pct = BL.pct(S.correct, total), secs = Math.floor((Date.now() - S.t0) / 1000);
      if (o.save) { BL.state.quiz[o.save] = { pct: pct, correct: S.correct, total: total, date: today() }; BL.save(); }
      c.innerHTML = '';
      c.append(h('h1', {}, 'Resultado: ' + label), h('div', { class: 'big' }, pct + '%'), h('p', {}, S.correct + ' de ' + total + ' acertos' + (o.timer ? ' em ' + Math.floor(secs / 60) + 'min' + ('0' + (secs % 60)).slice(-2) + 's' : '') + '.'), BL.bar(pct),
        h('p', {}, pct >= 80 ? 'Bom desempenho. Refaça em alguns dias para fixar.' : 'Revise os conceitos do tema e refaça os erros.'));
      if (S.wrong.length) { c.append(h('h3', {}, 'Para revisar'), h('ul', {}, S.wrong.map(function (x) { return h('li', {}, x.q); }))); }
      var row = h('div', { class: 'row' });
      if (S.wrong.length) row.append(h('button', { class: 'btn primary', type: 'button', onclick: function () { runQuiz(c, S.wrong, label + ' (revisão)', {}); } }, 'Refazer só os erros'));
      (o.estudar || []).forEach(function (id) { var pg = BL.pageById[id]; if (pg) row.append(h('a', { class: 'btn', href: '#/conceitos/' + id }, '📖 Estudar: ' + pg.title)); });
      row.append(h('a', { class: 'btn', href: o.back || '#/exercicios/quiz' }, 'Voltar'));
      c.append(row);
    }
    q();
  }

  function quizView(c, p) {
    if (p[0] && BL.quizBySlug[p[0]]) {
      var qz = BL.quizBySlug[p[0]], mix = false, onlyMc = false;
      c.append(h('h1', {}, qz.titulo), h('p', { class: 'lead' }, qz.intro));
      var m = h('input', { type: 'checkbox' }), o = h('input', { type: 'checkbox' });
      c.append(h('div', { class: 'row' }, h('label', { class: 'chk' }, m, 'Embaralhar questões'), h('label', { class: 'chk' }, o, 'Só objetivas')),
        h('div', { class: 'row' }, h('button', { class: 'btn primary', type: 'button', onclick: function () {
          var list = qz.qs.slice(); if (o.checked) list = list.filter(function (x) { return x.t === 'mc'; }); if (m.checked) list = BL.shuffle(list);
          runQuiz(c, list, qz.titulo, { save: o.checked ? null : qz.slug, estudar: qz.estudar });
        } }, 'Começar (' + qz.qs.length + ' questões)')));
      return;
    }
    c.append(h('h1', {}, 'Quiz por tema'), h('p', { class: 'lead' }, 'As objetivas corrigem na hora; nas discursivas você escreve, compara com o gabarito e se autoavalia.'));
    var g = h('div', { class: 'grid' });
    BL.data.quiz.forEach(function (qz) {
      var r = BL.state.quiz[qz.slug], n = qz.qs.filter(function (x) { return x.t === 'mc'; }).length;
      g.append(h('a', { class: 'card', href: '#/exercicios/quiz/' + qz.slug }, h('h3', {}, qz.titulo), h('p', { class: 'muted' }, qz.qs.length + ' questões (' + n + ' objetivas)'), r ? BL.bar(r.pct) : null, h('small', { class: 'muted' }, r ? 'Último: ' + r.pct + '% (' + r.correct + '/' + r.total + ')' : 'Ainda não feito')));
    });
    c.append(g);
  }

  function simulado(c) {
    c.append(h('h1', {}, 'Simulado'), h('p', { class: 'lead' }, 'Questões sorteadas de todos os temas, com cronômetro. Treine sob pressão, como na prova.'));
    var sel = h('select', {}, [10, 20, 30, 50].map(function (n) { return h('option', { value: n, selected: n === 20 }, n + ' questões'); }));
    var disc = h('input', { type: 'checkbox' });
    c.append(h('div', { class: 'row' }, sel, h('label', { class: 'chk' }, disc, 'Incluir discursivas')),
      h('div', { class: 'row' }, h('button', { class: 'btn primary', type: 'button', onclick: function () {
        var all = []; BL.data.quiz.forEach(function (q) { q.qs.forEach(function (x) { if (disc.checked || x.t === 'mc') all.push(x); }); });
        runQuiz(c, BL.shuffle(all).slice(0, parseInt(sel.value, 10)), 'Simulado', { timer: true, save: 'simulado', back: '#/exercicios/simulado' });
      } }, 'Começar o simulado')));
    var r = BL.state.quiz.simulado; if (r) c.append(h('p', { class: 'muted' }, 'Último simulado: ' + r.pct + '% (' + r.correct + '/' + r.total + ') em ' + r.date));
  }

  // ================= sub-redes =================
  function ip2n(s) { return s.split('.').reduce(function (a, b) { return a * 256 + (+b); }, 0); }
  function n2ip(n) { return [24, 16, 8, 0].map(function (sh) { return Math.floor(n / Math.pow(2, sh)) % 256; }).join('.'); }
  function maskN(p) { return p === 0 ? 0 : Math.pow(2, 32) - Math.pow(2, 32 - p); }
  function calc(ip, p) {
    var n = ip2n(ip), size = Math.pow(2, 32 - p), net = Math.floor(n / size) * size, bc = net + size - 1;
    return { net: net, bc: bc, size: size, first: p >= 31 ? net : net + 1, last: p >= 31 ? bc : bc - 1, hosts: p >= 31 ? (p === 31 ? 2 : 1) : size - 2, mask: maskN(p), wild: Math.pow(2, 32) - 1 - maskN(p) };
  }
  function rint(a, b) { return a + Math.floor(Math.random() * (b - a + 1)); }
  function rip(p) { var bases = [[10, rint(0, 255), rint(0, 255)], [172, rint(16, 31), rint(0, 255)], [192, 168, rint(0, 255)]]; var b = bases[rint(0, 2)]; return b.join('.') + '.' + rint(1, 254); }
  var TYPES = [['todos', 'Todos'], ['hosts', 'Hosts usáveis'], ['rede', 'Endereço de rede'], ['broadcast', 'Broadcast'], ['faixa', 'Primeiro e último host'], ['prefixo', 'Prefixo para N hosts'], ['mesma', 'Mesma rede?'], ['mascara', 'Máscara e prefixo'], ['wildcard', 'Wildcard']];
  function gen(type) {
    if (type === 'todos') type = ['hosts', 'rede', 'broadcast', 'faixa', 'prefixo', 'mesma', 'mascara', 'wildcard'][rint(0, 7)];
    var p, ip, r;
    if (type === 'hosts') { p = rint(20, 30); return { q: 'Quantos hosts usáveis tem uma rede /' + p + '?', ans: String(Math.pow(2, 32 - p) - 2), exp: 'Um /' + p + ' tem 2^' + (32 - p) + ' = ' + Math.pow(2, 32 - p) + ' endereços. Menos o de rede e o de broadcast: ' + (Math.pow(2, 32 - p) - 2) + '.' }; }
    if (type === 'rede') { p = rint(24, 30); ip = rip(p); r = calc(ip, p); return { q: 'Qual o endereço de REDE de ' + ip + '/' + p + '?', ans: n2ip(r.net), exp: 'Bloco de ' + r.size + ' endereços (256 - ' + (256 - r.size) + ' no último octeto). O IP cai no bloco que começa em ' + n2ip(r.net) + '.' }; }
    if (type === 'broadcast') { p = rint(24, 30); ip = rip(p); r = calc(ip, p); return { q: 'Qual o endereço de BROADCAST de ' + ip + '/' + p + '?', ans: n2ip(r.bc), exp: 'O bloco vai de ' + n2ip(r.net) + ' a ' + n2ip(r.bc) + '. O último endereço do bloco é o broadcast.' }; }
    if (type === 'faixa') { p = rint(24, 30); ip = rip(p); r = calc(ip, p); var first = rint(0, 1) === 0; return { q: 'Qual o ' + (first ? 'PRIMEIRO' : 'ÚLTIMO') + ' host usável de ' + ip + '/' + p + '?', ans: n2ip(first ? r.first : r.last), exp: 'Rede ' + n2ip(r.net) + ', broadcast ' + n2ip(r.bc) + '. Hosts de ' + n2ip(r.first) + ' a ' + n2ip(r.last) + '.' }; }
    if (type === 'prefixo') {
      var hs = [6, 10, 14, 30, 50, 60, 100, 120, 200, 250, 500, 1000], H = hs[rint(0, hs.length - 1)], pp = 32 - Math.ceil(Math.log(H + 2) / Math.LN2);
      return { q: 'Qual o menor prefixo (a maior máscara) que comporta ' + H + ' hosts? (ex.: 26 ou /26)', ans: String(pp), exp: 'Preciso de ' + H + ' + 2 = ' + (H + 2) + ' endereços. O menor bloco de potência de 2 que comporta isso é ' + Math.pow(2, 32 - pp) + ', ou seja, /' + pp + ' (' + (Math.pow(2, 32 - pp) - 2) + ' usáveis).' };
    }
    if (type === 'mesma') {
      p = rint(26, 30); ip = rip(p); r = calc(ip, p); var same = rint(0, 1) === 0, ip2;
      if (same) { ip2 = n2ip(r.first + rint(0, r.hosts - 1)); } else { ip2 = n2ip(r.net + r.size + rint(0, r.size - 1)); }
      var r2 = calc(ip2, p), isSame = r.net === r2.net;
      return { kind: 'yn', q: ip + '/' + p + ' e ' + ip2 + '/' + p + ' estão na MESMA rede?', ans: isSame ? 'sim' : 'nao', exp: ip + ' pertence à rede ' + n2ip(r.net) + '/' + p + '; ' + ip2 + ' pertence à ' + n2ip(r2.net) + '/' + p + '.' };
    }
    if (type === 'mascara') {
      p = rint(17, 30);
      if (rint(0, 1)) return { q: 'Qual a máscara decimal de /' + p + '?', ans: n2ip(maskN(p)), exp: '/' + p + ' tem ' + p + ' bits 1: ' + n2ip(maskN(p)) + '.' };
      return { q: 'Qual o prefixo de ' + n2ip(maskN(p)) + '? (ex.: 24)', ans: String(p), exp: 'Conte os bits 1 da máscara: ' + p + '.' };
    }
    p = rint(17, 30);
    return { q: 'Qual o wildcard de /' + p + '? (o inverso da máscara, usado em ACL e OSPF)', ans: n2ip(Math.pow(2, 32) - 1 - maskN(p)), exp: 'Wildcard = 255.255.255.255 menos a máscara (' + n2ip(maskN(p)) + ') = ' + n2ip(Math.pow(2, 32) - 1 - maskN(p)) + '.' };
  }
  BL.test = { gen: gen, calc: calc, ip2n: ip2n, n2ip: n2ip, maskN: maskN };
  function parseCalc(s) {
    s = s.trim(); var m = s.match(/^(\d+\.\d+\.\d+\.\d+)\s*(?:\/\s*(\d+)|\s+(\d+\.\d+\.\d+\.\d+))$/); if (!m) return null;
    var ip = m[1]; if (ip.split('.').some(function (x) { return +x > 255; })) return null;
    var p; if (m[2] != null) p = +m[2]; else { var mk = ip2n(m[3]); p = 0; while (p < 32 && (mk / Math.pow(2, 31 - p)) % 2 >= 1) p++; if (maskN(p) !== mk) return null; }
    if (p < 0 || p > 32) return null; return { ip: ip, p: p };
  }

  function subredes(c) {
    c.append(h('h1', {}, 'Treino de sub-redes'), h('p', { class: 'lead' }, 'Questões novas a cada vez. Calcule de cabeça primeiro e use a calculadora para conferir.'));
    var st = BL.state.subnet; st.total = st.total || 0; st.correct = st.correct || 0; st.best = st.best || 0; var streak = 0, type = 'todos', cur = null;
    var cols = h('div', { class: 'grid', style: 'grid-template-columns:repeat(auto-fit,minmax(320px,1fr));align-items:start' });
    var trainer = h('div', { class: 'card' }), calcBox = h('div', { class: 'card' });
    cols.append(trainer, calcBox); c.append(cols);

    function drawTrainer() {
      trainer.innerHTML = '';
      var sel = h('select', {}, TYPES.map(function (t) { return h('option', { value: t[0], selected: t[0] === type }, t[1]); })); sel.onchange = function () { type = sel.value; cur = gen(type); drawTrainer(); };
      trainer.append(h('h3', {}, 'Treino'), h('div', { class: 'row' }, h('span', { class: 'muted' }, 'Tipo:'), sel),
        h('p', { class: 'muted' }, 'Acertos: ' + st.correct + '/' + st.total + ' · Sequência: ' + streak + ' · Melhor sequência: ' + st.best));
      if (!cur) cur = gen(type);
      trainer.append(h('h2', { style: 'margin-top:6px' }, cur.q));
      var fb = h('div'), done = false;
      function finish(ok) {
        if (done) return; done = true; st.total++; if (ok) { st.correct++; streak++; if (streak > st.best) st.best = streak; } else streak = 0; BL.save();
        fb.append(h('div', { class: 'exp', style: ok ? '' : 'border-color:var(--bad)' }, h('strong', {}, ok ? 'Correto! ' : 'Resposta: ' + (cur.ans === 'nao' ? 'Não' : cur.ans === 'sim' ? 'Sim' : cur.ans) + '. '), cur.exp), h('div', { class: 'row' }, h('button', { class: 'btn primary', type: 'button', onclick: function () { cur = gen(type); drawTrainer(); } }, 'Próxima questão')));
      }
      if (cur.kind === 'yn') {
        trainer.append(h('div', { class: 'row' }, h('button', { class: 'btn', type: 'button', onclick: function () { finish(cur.ans === 'sim'); } }, 'Sim'), h('button', { class: 'btn', type: 'button', onclick: function () { finish(cur.ans === 'nao'); } }, 'Não')));
      } else {
        var inp = h('input', { type: 'text', placeholder: 'Sua resposta', autocomplete: 'off' });
        var ok = h('button', { class: 'btn primary', type: 'button', onclick: function () { var v = inp.value.trim().replace(/^\//, ''); finish(v === cur.ans); } }, 'Verificar');
        inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') ok.click(); });
        trainer.append(h('div', { class: 'row' }, inp), h('div', { class: 'row' }, ok)); setTimeout(function () { inp.focus(); }, 0);
      }
      trainer.append(fb);
    }
    drawTrainer();

    var inp = h('input', { type: 'text', value: '10.200.0.5/30', placeholder: 'ex.: 192.168.10.77/26' }), out = h('div');
    function run() {
      out.innerHTML = ''; var r = parseCalc(inp.value);
      if (!r) { out.append(h('p', { class: 'muted' }, 'Digite no formato 10.200.0.5/30 ou 10.200.0.5 255.255.255.252.')); return; }
      var k = calc(r.ip, r.p), priv = /^10\./.test(r.ip) || /^192\.168\./.test(r.ip) || /^172\.(1[6-9]|2\d|3[01])\./.test(r.ip) ? 'privado (RFC 1918)' : /^100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\./.test(r.ip) ? 'CGNAT (100.64.0.0/10)' : /^127\./.test(r.ip) ? 'loopback' : /^169\.254\./.test(r.ip) ? 'link-local' : 'público/outro';
      var rows = [['Rede', n2ip(k.net) + '/' + r.p], ['Máscara', n2ip(k.mask)], ['Wildcard', n2ip(k.wild)], ['Broadcast', n2ip(k.bc)], ['Primeiro host', n2ip(k.first)], ['Último host', n2ip(k.last)], ['Hosts usáveis', String(k.hosts)], ['Endereços no bloco', String(k.size)], ['Tipo', priv]];
      out.append(h('div', { class: 'kv' }, rows.map(function (x) { return [h('b', {}, x[0]), h('span', {}, x[1])]; })));
      if (r.p === 32) out.append(h('p', { class: 'muted' }, '/32: um único endereço (típico de Loopback).'));
      if (r.p === 30) out.append(h('p', { class: 'muted' }, '/30: dois hosts usáveis, ideal para link ponto a ponto.'));
    }
    inp.oninput = run;
    calcBox.append(h('h3', {}, 'Calculadora'), h('p', { class: 'muted' }, 'Informe um IP com prefixo ou máscara.'), inp, h('div', { style: 'height:10px' }), out); run();
  }

  // ================= flashcards =================
  function flashcards(c, p) {
    var deck = p[0] && BL.data.decks.filter(function (d) { return d.id === p[0]; })[0];
    if (!deck) {
      c.append(h('h1', {}, 'Flashcards'), h('p', { class: 'lead' }, 'Cartões para revisão rápida. Clique no cartão para virar, e marque se você sabia.'));
      var g = h('div', { class: 'grid' });
      BL.data.decks.forEach(function (d) { var k = Object.keys(BL.state.flash[d.id] || {}).filter(function (x) { return BL.state.flash[d.id][x]; }).length; g.append(h('a', { class: 'card', href: '#/exercicios/flashcards/' + d.id }, h('h3', {}, d.title), h('p', { class: 'muted' }, d.desc), BL.bar(BL.pct(k, d.cards.length)), h('small', { class: 'muted' }, k + ' de ' + d.cards.length + ' dominados'))); });
      c.append(g); return;
    }
    var known = BL.state.flash[deck.id] = BL.state.flash[deck.id] || {};
    var idxs = deck.cards.map(function (_, i) { return i; }), pos = 0, flipped = false, onlyUnk = false;
    function order() { return onlyUnk ? idxs.filter(function (i) { return !known[i]; }) : idxs; }
    function draw() {
      c.innerHTML = ''; var ord = order(); var kn = Object.keys(known).filter(function (x) { return known[x]; }).length;
      c.append(h('h1', {}, deck.title), h('p', { class: 'muted' }, kn + ' de ' + deck.cards.length + ' dominados'), BL.bar(BL.pct(kn, deck.cards.length)));
      var opt = h('input', { type: 'checkbox' }); opt.checked = onlyUnk; opt.onchange = function () { onlyUnk = opt.checked; pos = 0; flipped = false; draw(); };
      c.append(h('div', { class: 'row' }, h('label', { class: 'chk' }, opt, 'Só os que ainda não sei'), h('button', { class: 'btn sm', type: 'button', onclick: function () { idxs = BL.shuffle(idxs); pos = 0; flipped = false; draw(); } }, 'Embaralhar'), h('a', { class: 'btn sm', href: '#/exercicios/flashcards' }, 'Trocar de baralho')));
      if (!ord.length) { c.append(h('div', { class: 'callout' }, 'Você dominou todos os cartões deste baralho. Desmarque o filtro para revisar.')); return; }
      if (pos >= ord.length) pos = 0;
      var i = ord[pos], card = deck.cards[i];
      var face = h('div', { class: 'face' + (flipped ? ' back' : ''), role: 'button', tabindex: '0' }, flipped ? card[1] : card[0]);
      face.onclick = function () { flipped = !flipped; draw(); };
      face.onkeydown = function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); flipped = !flipped; draw(); } };
      c.append(h('p', { class: 'muted', style: 'text-align:center' }, 'Cartão ' + (pos + 1) + ' de ' + ord.length + (flipped ? ' · resposta' : ' · clique para virar')), h('div', { class: 'flash' }, face),
        h('div', { class: 'row', style: 'justify-content:center' },
          h('button', { class: 'btn', type: 'button', onclick: function () { pos = (pos - 1 + ord.length) % ord.length; flipped = false; draw(); } }, '←'),
          h('button', { class: 'btn', type: 'button', onclick: function () { known[i] = false; BL.save(); pos = (pos + 1) % ord.length; flipped = false; draw(); } }, 'Ainda não sei'),
          h('button', { class: 'btn primary', type: 'button', onclick: function () { known[i] = true; BL.save(); if (onlyUnk && pos >= order().length) pos = 0; else if (!onlyUnk) pos = (pos + 1) % ord.length; flipped = false; draw(); } }, 'Sei'),
          h('button', { class: 'btn', type: 'button', onclick: function () { pos = (pos + 1) % ord.length; flipped = false; draw(); } }, '→')));
    }
    draw();
  }

  // ================= diagnóstico =================
  function diagnostico(c) {
    c.append(h('h1', {}, 'Cenários de diagnóstico'), h('p', { class: 'lead' }, 'Você recebe o sintoma, como em um chamado, e escolhe a causa mais provável. Depois lê o raciocínio.'));
    var all = []; BL.data.labs.labs.forEach(function (l) { l.erros.forEach(function (e) { all.push({ lab: l, erro: e[0], sintoma: e[1], rac: e[2] }); }); });
    c.append(h('div', { class: 'row' }, h('button', { class: 'btn primary', type: 'button', onclick: function () { play(BL.shuffle(all).slice(0, 10)); } }, 'Começar (10 cenários)')));
    function play(list) {
      var i = 0, ok = 0, wrong = [];
      function q() {
        c.innerHTML = ''; var x = list[i], others = all.filter(function (y) { return y.erro !== x.erro; });
        var same = BL.shuffle(others.filter(function (y) { return y.lab === x.lab; })), diff = BL.shuffle(others.filter(function (y) { return y.lab !== x.lab; }));
        var seen = {}; seen[x.erro] = 1; var ds = [];
        same.concat(diff).forEach(function (y) { if (ds.length < 3 && !seen[y.erro]) { seen[y.erro] = 1; ds.push(y.erro); } });
        var opts = BL.shuffle([x.erro].concat(ds));
        c.append(h('div', { class: 'muted' }, 'Cenário ' + (i + 1) + ' de ' + list.length + ' · ' + x.lab.short + ' · Acertos: ' + ok), BL.bar(Math.round(i / list.length * 100)), h('h2', {}, 'Sintoma: ' + x.sintoma), h('p', {}, 'Qual a causa mais provável?'));
        var box = h('div'), done = false;
        opts.forEach(function (o) {
          var b = h('button', { class: 'opt', type: 'button' }, o);
          b.onclick = function () {
            if (done) return; done = true; var good = o === x.erro;
            box.querySelectorAll('button').forEach(function (bb) { bb.disabled = true; if (bb.textContent === x.erro) bb.classList.add('ok'); });
            if (good) ok++; else { b.classList.add('bad'); wrong.push(x); }
            box.append(h('div', { class: 'exp' }, h('strong', {}, good ? 'Correto. ' : 'A causa era: ' + x.erro + '. '), h('br'), h('strong', {}, 'Como raciocinar: '), x.rac),
              h('div', { class: 'row' }, h('button', { class: 'btn primary', type: 'button', onclick: function () { i++; if (i < list.length) q(); else end(); } }, i + 1 < list.length ? 'Próximo cenário' : 'Ver resultado')));
          };
          box.append(b);
        });
        c.append(box);
      }
      function end() {
        var pct = BL.pct(ok, list.length); BL.state.diag._game = { pct: pct, correct: ok, total: list.length, date: today() }; BL.save();
        c.innerHTML = ''; c.append(h('h1', {}, 'Resultado'), h('div', { class: 'big' }, pct + '%'), h('p', {}, ok + ' de ' + list.length + ' cenários.'), BL.bar(pct));
        if (wrong.length) c.append(h('h3', {}, 'Revise estes laboratórios'), h('ul', {}, wrong.map(function (x) { return h('li', {}, h('a', { href: '#/labs/' + x.lab.folder + '/erros' }, x.lab.short + ': ' + x.lab.nome), ' — ' + x.sintoma); })));
        c.append(h('div', { class: 'row' }, h('a', { class: 'btn primary', href: '#/exercicios/diagnostico', onclick: function () { setTimeout(BL.rerender, 0); } }, 'Jogar de novo')));
      }
      q();
    }
  }

  // ================= desempenho =================
  function desempenho(c) {
    var pr = BL.progress(), st = BL.state.subnet;
    c.append(h('h1', {}, 'Meu desempenho'), h('p', { class: 'lead' }, 'Seus resultados ficam salvos neste navegador. Use para decidir o que revisar.'));
    c.append(h('div', { class: 'grid' },
      h('div', { class: 'card' }, h('h3', {}, 'Conceitos'), BL.bar(BL.pct(pr.studied, pr.totalPages)), h('small', { class: 'muted' }, pr.studied + ' de ' + pr.totalPages + ' tópicos estudados')),
      h('div', { class: 'card' }, h('h3', {}, 'Laboratórios'), BL.bar(BL.pct(pr.stepsDone, pr.steps)), h('small', { class: 'muted' }, pr.stepsDone + ' de ' + pr.steps + ' passos')),
      h('div', { class: 'card' }, h('h3', {}, 'Quiz'), BL.bar(pr.avg || 0), h('small', { class: 'muted' }, pr.quizDone + ' de ' + pr.quizTotal + ' temas' + (pr.avg != null ? ' · média ' + pr.avg + '%' : ''))),
      h('div', { class: 'card' }, h('h3', {}, 'Sub-redes'), BL.bar(BL.pct(st.correct || 0, st.total || 0)), h('small', { class: 'muted' }, (st.correct || 0) + ' de ' + (st.total || 0) + ' · melhor sequência ' + (st.best || 0)))));
    var rows = BL.data.quiz.map(function (q) { var r = BL.state.quiz[q.slug]; return [q.titulo, r ? r.pct + '% (' + r.correct + '/' + r.total + ')' : 'não feito', r ? r.date : '', r && r.pct < 70 ? h('a', { href: '#/exercicios/quiz/' + q.slug }, 'Refazer') : (r ? '✓' : h('a', { href: '#/exercicios/quiz/' + q.slug }, 'Fazer'))]; });
    var sim = BL.state.quiz.simulado, dg = BL.state.diag._game;
    rows.push(['Simulado geral', sim ? sim.pct + '% (' + sim.correct + '/' + sim.total + ')' : 'não feito', sim ? sim.date : '', '']);
    rows.push(['Cenários de diagnóstico', dg ? dg.pct + '% (' + dg.correct + '/' + dg.total + ')' : 'não feito', dg ? dg.date : '', '']);
    var t = h('table', { class: 'plain' }, h('tr', {}, h('th', {}, 'Tema'), h('th', {}, 'Último resultado'), h('th', {}, 'Data'), h('th', {}, '')));
    rows.forEach(function (r) { t.append(h('tr', {}, r.map(function (x) { return h('td', {}, x); }))); });
    c.append(h('h2', {}, 'Resultados por tema'), t);
    var weak = BL.data.quiz.filter(function (q) { var r = BL.state.quiz[q.slug]; return r && r.pct < 70; });
    if (weak.length) c.append(h('div', { class: 'callout warn' }, h('strong', {}, 'Para revisar: '), weak.map(function (q) { return q.titulo; }).join(', ') + '.'));
    c.append(h('div', { class: 'row' }, h('button', { class: 'btn', type: 'button', onclick: function () { if (confirm('Apagar todo o progresso salvo neste navegador?')) { try { localStorage.removeItem('bl2'); } catch (e) {} location.reload(); } } }, 'Zerar todo o progresso')));
  }
})();
