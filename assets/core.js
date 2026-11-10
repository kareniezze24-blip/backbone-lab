(function () {
  var BL = window.BL = { views: {}, data: {} };

  // ---------- util
  BL.h = function (tag, attrs) {
    var e = document.createElement(tag); attrs = attrs || {};
    for (var k in attrs) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]);
      else if (attrs[k] === true) e.setAttribute(k, '');
      else if (attrs[k] !== false && attrs[k] != null) e.setAttribute(k, attrs[k]);
    }
    for (var i = 2; i < arguments.length; i++) add(e, arguments[i]);
    return e;
  };
  function add(e, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { add(e, x); }); return; }
    e.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  var h = BL.h;
  BL.$ = function (s, r) { return (r || document).querySelector(s); };
  BL.shuffle = function (a) { a = a.slice(); for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; } return a; };
  BL.esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  BL.pct = function (a, b) { return b ? Math.round(a / b * 100) : 0; };
  BL.bar = function (p) { return h('div', { class: 'bar' }, h('i', { style: 'width:' + p + '%' })); };

  // ---------- estado salvo no navegador
  var KEY = 'bl2';
  BL.state = (function () { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { return {}; } })();
  ['studied', 'steps', 'obs', 'notes', 'quiz', 'flash', 'subnet', 'diag'].forEach(function (k) { BL.state[k] = BL.state[k] || {}; });
  BL.save = function () { try { localStorage.setItem(KEY, JSON.stringify(BL.state)); } catch (e) {} };

  // ---------- markdown
  BL.md = window.markdownit({ html: false, linkify: false });
  (function () {
    var md = BL.md, fence = md.renderer.rules.fence;
    md.renderer.rules.fence = function (tokens, idx, o, env, self) {
      var t = tokens[idx];
      if (t.info.trim() === 'mermaid') return '<div class="mermaid">' + md.utils.escapeHtml(t.content) + '</div>';
      return fence(tokens, idx, o, env, self);
    };
    md.renderer.rules.table_open = function () { return '<div class="tablewrap"><table>'; };
    md.renderer.rules.table_close = function () { return '</table></div>'; };
    var link = md.renderer.rules.link_open || function (t, i, o, e, s) { return s.renderToken(t, i, o); };
    md.renderer.rules.link_open = function (tokens, idx, o, env, self) {
      var href = tokens[idx].attrGet('href') || '';
      if (/^https?:/.test(href)) { tokens[idx].attrSet('target', '_blank'); tokens[idx].attrSet('rel', 'noopener'); }
      return link(tokens, idx, o, env, self);
    };
  })();
  BL.theme = function () { return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default'; };
  BL.initMermaid = function () { if (window.mermaid) window.mermaid.initialize({ startOnLoad: false, theme: BL.theme(), securityLevel: 'strict' }); };
  BL.mountMd = function (el, text) {
    el.classList.add('md'); el.innerHTML = BL.md.render(text);
    el.querySelectorAll('pre').forEach(function (pre) {
      var b = h('button', { class: 'copy', type: 'button', onclick: function () {
        var c = pre.querySelector('code'); var t = c ? c.textContent : pre.textContent;
        if (navigator.clipboard) navigator.clipboard.writeText(t).then(function () { b.textContent = 'Copiado'; setTimeout(function () { b.textContent = 'Copiar'; }, 1200); });
      } }, 'Copiar');
      pre.append(b);
    });
    var nodes = el.querySelectorAll('.mermaid');
    if (nodes.length && window.mermaid) { try { window.mermaid.run({ nodes: nodes }); } catch (e) {} }
  };

  // ---------- carga
  BL.load = function () {
    function j(u) { return fetch(u).then(function (r) { if (!r.ok) throw new Error(u); return r.json(); }); }
    return Promise.all([j('data/index.json'), j('data/labs.json'), j('data/quiz.json'), j('data/decks.json')]).then(function (r) {
      BL.data.index = r[0]; BL.data.labs = r[1]; BL.data.quiz = r[2]; BL.data.decks = r[3];
      BL.pages = []; BL.pageById = {}; BL.modOf = {};
      r[0].modules.forEach(function (m) { m.pages.forEach(function (p) { p.mod = m; BL.pages.push(p); BL.pageById[p.id] = p; }); });
      BL.labById = {}; r[1].labs.forEach(function (l) { BL.labById[l.folder] = l; });
      BL.quizBySlug = {}; r[2].forEach(function (q) { BL.quizBySlug[q.slug] = q; });
    });
  };
  var mdCache = {};
  BL.fetchMd = function (file) {
    if (mdCache[file]) return Promise.resolve(mdCache[file]);
    return fetch(file).then(function (r) { if (!r.ok) throw new Error(file); return r.text(); }).then(function (t) { mdCache[file] = t; return t; });
  };

  // ---------- progresso
  BL.progress = function () {
    var studied = BL.pages.filter(function (p) { return BL.state.studied[p.id]; }).length;
    var steps = 0, stepsDone = 0;
    BL.data.labs.labs.forEach(function (l) { steps += l.passos.length; var a = BL.state.steps[l.folder] || []; stepsDone += l.passos.filter(function (_, i) { return a[i]; }).length; });
    var qs = Object.keys(BL.state.quiz).filter(function (k) { return BL.quizBySlug[k]; });
    var avg = qs.length ? Math.round(qs.reduce(function (s, k) { return s + BL.state.quiz[k].pct; }, 0) / qs.length) : null;
    return { studied: studied, totalPages: BL.pages.length, steps: steps, stepsDone: stepsDone, quizDone: qs.length, quizTotal: BL.data.quiz.length, avg: avg };
  };
  BL.labProgress = function (l) { var a = BL.state.steps[l.folder] || []; var d = l.passos.filter(function (_, i) { return a[i]; }).length; return { done: d, total: l.passos.length, pct: BL.pct(d, l.passos.length) }; };

  // ---------- roteamento
  function parse() { return location.hash.replace(/^#\/?/, '').split('/').filter(Boolean).map(decodeURIComponent); }
  BL.go = function (path) { location.hash = '#/' + path; };
  var app, lastRoute = '';
  function setTab(tab) { document.querySelectorAll('.tabs a').forEach(function (a) { a.classList.toggle('on', a.getAttribute('data-tab') === tab); }); }
  function route() {
    var p = parse(); var tab = p[0] || 'home';
    var key = p.join('/');
    app.innerHTML = '';
    document.getElementById('results').classList.add('hidden');
    var view = { home: BL.views.home, conceitos: BL.views.conceitos, labs: BL.views.labs, exercicios: BL.views.exercicios }[tab];
    if (!view) { tab = 'home'; view = BL.views.home; p = []; }
    setTab(tab);
    try { view(app, p.slice(1)); } catch (e) { app.append(h('div', { class: 'main' }, h('h1', {}, 'Algo deu errado'), h('p', {}, String(e && e.message || e)))); if (window.console) console.error(e); }
    if (key !== lastRoute) window.scrollTo(0, 0);
    lastRoute = key;
    if (tab !== 'home') { BL.state.last = key; BL.save(); }
  }
  BL.rerender = function () { var y = window.scrollY; var k = lastRoute; route(); lastRoute = k; window.scrollTo(0, y); };

  // ---------- layout com menu lateral
  BL.layout = function (side, main, wide) {
    var aside = h('aside', { class: 'side' }, side);
    var btn = h('button', { class: 'btn menubtn', type: 'button', onclick: function () { aside.classList.toggle('open'); btn.textContent = aside.classList.contains('open') ? '✕ Fechar menu' : '☰ Menu desta seção'; } }, '☰ Menu desta seção');
    return h('div', { class: 'layout' }, aside, h('main', { class: 'main' + (wide ? ' wide' : '') }, btn, main));
  };

  // ================= HOME =================
  BL.views.home = function (root) {
    var pr = BL.progress();
    var last = BL.state.last;
    root.append(h('div', { class: 'main wide' },
      h('div', { class: 'hero' }, h('h1', {}, 'Estude redes de operadora na prática'),
        h('p', { class: 'lead' }, 'Conceitos para entender, laboratórios para fazer e exercícios para fixar. Tudo no mesmo lugar, tudo interativo, com o seu progresso salvo neste navegador.'),
        h('div', { class: 'row' },
          h('a', { class: 'btn primary', href: '#/conceitos' }, 'Começar pelos conceitos'),
          h('a', { class: 'btn', href: '#/labs/topologia' }, 'Abrir a topologia interativa'),
          last ? h('a', { class: 'btn', href: '#/' + last }, 'Continuar de onde parei') : null)),
      h('div', { class: 'grid' },
        h('a', { class: 'card', href: '#/conceitos' }, h('h3', {}, 'Conceitos'), h('p', { class: 'muted' }, 'Tudo que um analista de rede precisa saber, de IP e VLAN a MPLS, PON, QoS e segurança.'), BL.bar(BL.pct(pr.studied, pr.totalPages)), h('small', { class: 'muted' }, pr.studied + ' de ' + pr.totalPages + ' tópicos estudados')),
        h('a', { class: 'card', href: '#/labs' }, h('h3', {}, 'Laboratórios'), h('p', { class: 'muted' }, 'Os 15 labs, cada um com o fundamento, a topologia, o passo a passo com o porquê e erros para diagnosticar.'), BL.bar(BL.pct(pr.stepsDone, pr.steps)), h('small', { class: 'muted' }, pr.stepsDone + ' de ' + pr.steps + ' passos concluídos')),
        h('a', { class: 'card', href: '#/exercicios' }, h('h3', {}, 'Exercícios'), h('p', { class: 'muted' }, 'Quiz, simulado, treino de sub-redes, flashcards e cenários de diagnóstico.'), BL.bar(BL.pct(pr.quizDone, pr.quizTotal)), h('small', { class: 'muted' }, pr.quizDone + ' de ' + pr.quizTotal + ' temas feitos' + (pr.avg != null ? ' · média ' + pr.avg + '%' : '')))),
      h('h2', {}, 'Como estudar'),
      h('div', { class: 'grid' },
        h('div', { class: 'card' }, h('h3', {}, '1. Entenda o conceito'), h('p', { class: 'muted' }, 'Leia o tópico na aba Conceitos e responda as perguntas de fixação.')),
        h('div', { class: 'card' }, h('h3', {}, '2. Faça o laboratório'), h('p', { class: 'muted' }, 'Leia o fundamento do lab, siga o passo a passo entendendo o porquê e provoque os erros.')),
        h('div', { class: 'card' }, h('h3', {}, '3. Pratique'), h('p', { class: 'muted' }, 'Resolva o quiz do tema, treine sub-redes e revise com flashcards.'))),
      h('div', { class: 'callout' }, 'Seu progresso fica salvo neste navegador (não vai para o GitHub nem para outros computadores).')));
  };

  // ================= CONCEITOS =================
  function sideConceitos(cur) {
    var kids = [h('h4', {}, 'Trilha de estudo')];
    BL.data.index.modules.forEach(function (m) {
      var done = m.pages.filter(function (p) { return BL.state.studied[p.id]; }).length;
      var d = h('details', { open: cur && cur.mod === m ? true : false }, h('summary', {}, h('span', {}, m.title), h('small', {}, done + '/' + m.pages.length)));
      m.pages.forEach(function (p) {
        d.append(h('a', { class: 'item' + (cur && cur.id === p.id ? ' on' : '') + (BL.state.studied[p.id] ? ' done' : ''), href: '#/conceitos/' + p.id }, h('span', { class: 'ck' }, BL.state.studied[p.id] ? '✓' : ''), p.title));
      });
      kids.push(d);
    });
    return kids;
  }
  BL.views.conceitos = function (root, p) {
    if (p.length >= 2) return conceitoPage(root, p[0] + '/' + p[1]);
    var pr = BL.progress();
    var main = [h('h1', {}, 'Conceitos'), h('p', { class: 'lead' }, 'Tudo que um analista de rede precisa saber, organizado em módulos. Estude na ordem ou pule para o que precisa.'),
      BL.bar(BL.pct(pr.studied, pr.totalPages)), h('p', { class: 'muted' }, pr.studied + ' de ' + pr.totalPages + ' tópicos estudados')];
    var grid = h('div', { class: 'grid' });
    BL.data.index.modules.forEach(function (m) {
      var done = m.pages.filter(function (x) { return BL.state.studied[x.id]; }).length;
      grid.append(h('a', { class: 'card', href: '#/conceitos/' + m.pages[0].id }, h('h3', {}, m.title), h('p', { class: 'muted' }, m.desc), BL.bar(BL.pct(done, m.pages.length)), h('small', { class: 'muted' }, done + ' de ' + m.pages.length + ' tópicos')));
    });
    main.push(grid);
    root.append(BL.layout(sideConceitos(null), main, true));
  };
  function conceitoPage(root, id) {
    var pg = BL.pageById[id];
    if (!pg) { root.append(BL.layout(sideConceitos(null), h('h1', {}, 'Tópico não encontrado'))); return; }
    var idx = BL.pages.indexOf(pg);
    var body = h('div'); body.append(h('p', { class: 'muted' }, 'Carregando...'));
    var studiedBtn = h('button', { class: 'btn' + (BL.state.studied[id] ? ' on' : ''), type: 'button', onclick: function () {
      if (BL.state.studied[id]) delete BL.state.studied[id]; else BL.state.studied[id] = true; BL.save(); BL.rerender();
    } }, BL.state.studied[id] ? '✓ Estudado' : 'Marcar como estudado');
    var chips = h('div', { class: 'chips' }, h('span', { class: 'chip nivel-' + pg.nivel }, pg.nivel), h('span', { class: 'chip' }, '⏱ ' + pg.tempo), h('span', { class: 'chip' }, pg.mod.title));
    var toc = h('div', { class: 'toc' });
    var fix = h('div');
    var prat = h('div');
    var main = [h('div', { class: 'muted' }, pg.mod.title + ' › '), h('h1', {}, pg.title), chips, toc, body, fix, prat,
      h('div', { class: 'row' }, studiedBtn),
      h('div', { class: 'pager' },
        idx > 0 ? h('a', { href: '#/conceitos/' + BL.pages[idx - 1].id }, h('small', {}, '← Anterior'), BL.pages[idx - 1].title) : h('span'),
        idx < BL.pages.length - 1 ? h('a', { href: '#/conceitos/' + BL.pages[idx + 1].id, style: 'text-align:right' }, h('small', {}, 'Próximo →'), BL.pages[idx + 1].title) : h('span'))];
    root.append(BL.layout(sideConceitos(pg), main));
    BL.fetchMd(pg.file).then(function (t) {
      body.innerHTML = ''; BL.mountMd(body, t);
      body.querySelectorAll('h2').forEach(function (hh, i) {
        hh.id = 'sec' + i;
        toc.append(h('a', { href: 'javascript:void(0)', onclick: function () { hh.scrollIntoView({ behavior: 'smooth', block: 'start' }); } }, hh.textContent));
      });
    }).catch(function () { body.innerHTML = ''; body.append(h('div', { class: 'callout warn' }, 'Não foi possível carregar este conteúdo.')); });
    if (pg.fixar && pg.fixar.length) {
      fix.append(h('h2', {}, 'Para fixar'), h('p', { class: 'muted' }, 'Responda mentalmente (ou por escrito) e clique para conferir.'));
      pg.fixar.forEach(function (qa) {
        var ans = h('div', { class: 'ans hidden' }, qa[1]);
        var b = h('button', { type: 'button', onclick: function () { ans.classList.toggle('hidden'); sp.textContent = ans.classList.contains('hidden') ? '▾' : '▴'; } }, h('span', {}, qa[0]));
        var sp = h('span', {}, '▾'); b.append(sp);
        fix.append(h('div', { class: 'fix' }, b, ans));
      });
    }
    var links = [];
    pg.labs.forEach(function (f) { var l = BL.labById[f]; if (l) links.push(h('a', { class: 'btn sm', href: '#/labs/' + f }, '🔧 ' + l.short + ': ' + l.nome)); });
    pg.ex.forEach(function (s) { var q = BL.quizBySlug[s]; if (q) links.push(h('a', { class: 'btn sm', href: '#/exercicios/quiz/' + s }, '✏️ Quiz: ' + q.titulo)); });
    if (links.length) prat.append(h('h2', {}, 'Pratique'), h('div', { class: 'row' }, links));
  }

  // ---------- busca
  var idxBuilt = null;
  function buildIndex() {
    if (idxBuilt) return idxBuilt;
    idxBuilt = Promise.all(BL.pages.map(function (p) { return BL.fetchMd(p.file).then(function (t) { return { kind: 'c', title: p.title, where: p.mod.title, href: '#/conceitos/' + p.id, text: t }; }).catch(function () { return null; }); })).then(function (arr) {
      arr = arr.filter(Boolean);
      BL.data.labs.labs.forEach(function (l) {
        var t = [l.objetivo, l.por_que, l.fundamentos, l.passos.map(function (s) { return s.join(' '); }).join(' '), l.erros.map(function (s) { return s.join(' '); }).join(' ')].join(' ');
        arr.push({ kind: 'l', title: l.short + ': ' + l.nome, where: 'Laboratórios', href: '#/labs/' + l.folder, text: t });
      });
      BL.data.quiz.forEach(function (q) { arr.push({ kind: 'e', title: 'Quiz: ' + q.titulo, where: 'Exercícios', href: '#/exercicios/quiz/' + q.slug, text: q.qs.map(function (x) { return x.q; }).join(' ') }); });
      return arr;
    });
    return idxBuilt;
  }
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ''); }
  BL.search = function (q) {
    var box = document.getElementById('results'); q = q.trim();
    if (q.length < 2) { box.classList.add('hidden'); return; }
    buildIndex().then(function (arr) {
      var nq = norm(q), res = [];
      arr.forEach(function (d) {
        var nt = norm(d.title), nb = norm(d.text), score = 0;
        if (nt.indexOf(nq) >= 0) score += 10;
        var i = nb.indexOf(nq); if (i >= 0) score += 3 + Math.min(5, (nb.split(nq).length - 1));
        if (score) { var s = Math.max(0, i - 40); res.push({ d: d, score: score, snip: i >= 0 ? d.text.slice(s, i + 90).replace(/[#|*`\n]+/g, ' ') : '' }); }
      });
      res.sort(function (a, b) { return b.score - a.score; });
      box.innerHTML = ''; box.classList.remove('hidden');
      if (!res.length) box.append(h('p', { class: 'muted', style: 'padding:10px' }, 'Nada encontrado para "' + q + '".'));
      res.slice(0, 14).forEach(function (r) {
        var a = h('a', { href: r.d.href, onclick: function () { box.classList.add('hidden'); } }, h('strong', {}, r.d.title), h('small', {}, r.d.where + (r.snip ? ' · …' + r.snip + '…' : '')));
        box.append(a);
      });
    });
  };

  // ---------- inicialização
  BL.start = function () {
    app = document.getElementById('app');
    BL.initMermaid();
    var t = BL.$('#theme');
    t.onclick = function () {
      var n = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', n); try { localStorage.setItem('bl_theme', n); } catch (e) {}
      t.textContent = n === 'dark' ? 'Tema claro' : 'Tema escuro'; BL.initMermaid(); BL.rerender();
    };
    t.textContent = document.documentElement.getAttribute('data-theme') === 'dark' ? 'Tema claro' : 'Tema escuro';
    var timer; BL.$('#search').addEventListener('input', function (e) { clearTimeout(timer); var v = e.target.value; timer = setTimeout(function () { BL.search(v); }, 200); });
    document.addEventListener('click', function (e) { if (!e.target.closest('#results') && e.target.id !== 'search') document.getElementById('results').classList.add('hidden'); });
    BL.load().then(function () { window.addEventListener('hashchange', route); route(); }).catch(function (e) {
      app.innerHTML = ''; app.append(h('div', { class: 'main' }, h('h1', {}, 'Não foi possível carregar os dados'), h('p', {}, 'Se você abriu o arquivo direto do computador, publique no GitHub Pages ou rode um servidor local (python3 -m http.server).'), h('p', { class: 'muted' }, String(e && e.message || e))));
    });
  };
})();
