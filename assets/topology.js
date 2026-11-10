(function () {
  var NS = 'http://www.w3.org/2000/svg';
  var NODES = {
    CE: { x: 80, y: 230, name: 'CE12800', sub: 'OLT / acesso', cls: 'cust', stage: 1,
      role: 'Faz o papel de OLT: equipamento de acesso em L2. O IP dele existe só para gerência.',
      ifs: ['Eth-Trunk 1 (GE1/0/0 + GE1/0/1) para o R1, trunk com a VLAN 100', 'Vlanif 100: 10.200.0.1/30', 'Gerência fora de banda (MEth0/0/0): 192.168.100.10/24'], labs: 'Labs 1, 1.5, 1.6 e 7' },
    R1: { x: 255, y: 230, name: 'R1', sub: 'PE1', cls: 'pe', stage: 1,
      role: 'Roteador de borda (PE). Recebe o acesso, coloca e retira labels e entrega o serviço.',
      ifs: ['Eth-Trunk 1 (Eth1/0/0 + Eth1/0/1) para a OLT', 'Vlanif 100: 10.200.0.2/30', 'Eth1/0/2 para o R2: 10.200.0.5/30', 'Para o R4 (a partir do Lab 3): 10.200.0.13/30', 'Loopback0: 10.200.255.1/32', 'Gerência: 192.168.100.1/24'], labs: 'Labs 1, 3, 5, 5.1, 6 e 6.1' },
    R2: { x: 435, y: 365, name: 'R2', sub: 'P (core)', cls: 'p', stage: 1,
      role: 'Roteador de trânsito (P). Só comuta por label e não conhece os clientes.',
      ifs: ['Eth1/0/0 para o R1: 10.200.0.6/30', 'Eth1/0/1 para o R3: 10.200.0.9/30', 'Loopback0: 10.200.255.2/32', 'Gerência: 192.168.100.2/24'], labs: 'Labs 1, 3, 5 e 5.1' },
    R4: { x: 435, y: 95, name: 'R4', sub: 'P (backup)', cls: 'p', stage: 2,
      role: 'Segundo roteador de trânsito. Forma o caminho alternativo entre R1 e R3.',
      ifs: ['Para o R1: 10.200.0.14/30', 'Para o R3: 10.200.0.17/30', 'Loopback0: 10.200.255.4/32', 'Gerência: 192.168.100.4/24'], labs: 'Labs 3, 5.1 e 5.2' },
    R3: { x: 615, y: 230, name: 'R3', sub: 'PE2', cls: 'pe', stage: 1,
      role: 'Segundo roteador de borda (PE). Faz o papel espelhado do R1 na outra ponta.',
      ifs: ['Eth1/0/0 para o R2: 10.200.0.10/30', 'Para o R4: 10.200.0.18/30', 'Para o R5 (futuro): 10.200.0.21/30', 'Loopback0: 10.200.255.3/32', 'Gerência: 192.168.100.3/24'], labs: 'Labs 1, 3, 5, 5.1, 6 e 6.1' },
    R5: { x: 758, y: 230, name: 'R5', sub: 'CE2 (site B)', cls: 'cust', stage: 3,
      role: 'Segundo cliente (site B). No Lab 6.1 vira a outra ponta da VPN do cliente.',
      ifs: ['Para o R3: 10.200.0.22/30', 'Loopback0: 10.200.255.5/32'], labs: 'Labs 6 e 6.1' }
  };
  var LINKS = [
    { id: 'CE-R1', a: 'CE', b: 'R1', stage: 1, net: '10.200.0.0/30', ips: 'CE12800 .1 e R1 .2', kind: 'Eth-Trunk de 2 cabos (LACP), trunk com a VLAN 100 e Vlanif nas duas pontas', phys: 'Eth-Trunk' },
    { id: 'R1-R2', a: 'R1', b: 'R2', stage: 1, net: '10.200.0.4/30', ips: 'R1 .5 e R2 .6', kind: 'Link L3 roteado, ponto a ponto', phys: 'L3 /30' },
    { id: 'R2-R3', a: 'R2', b: 'R3', stage: 1, net: '10.200.0.8/30', ips: 'R2 .9 e R3 .10', kind: 'Link L3 roteado, ponto a ponto', phys: 'L3 /30' },
    { id: 'R1-R4', a: 'R1', b: 'R4', stage: 2, net: '10.200.0.12/30', ips: 'R1 .13 e R4 .14', kind: 'Link L3 roteado do caminho alternativo', phys: 'L3 /30' },
    { id: 'R4-R3', a: 'R4', b: 'R3', stage: 2, net: '10.200.0.16/30', ips: 'R4 .17 e R3 .18', kind: 'Link L3 roteado do caminho alternativo', phys: 'L3 /30' },
    { id: 'R3-R5', a: 'R3', b: 'R5', stage: 3, net: '10.200.0.20/30', ips: 'R3 .21 e R5 .22', kind: 'Link PE-CE. No Lab 6.1 passa a pertencer à VRF do cliente.', phys: 'PE-CE' }
  ];
  var STAGES = [{ n: 1, t: 'Base (R1, R2, R3)' }, { n: 2, t: 'Com R4' }, { n: 3, t: 'Completa (com R5)' }];
  var LAYERS = [
    { id: 'fisica', t: 'Física e L2', d: 'Camadas 1 e 2: cabos, agregação e VLAN. O link da OLT é um Eth-Trunk de dois cabos (LACP) em trunk com a VLAN 100. Aqui ainda não existe roteamento. Clique no link CE12800 - R1 para derrubar cabos do agregado.' },
    { id: 'l3', t: 'IP e OSPF', d: 'Camada 3: cada link é um /30 e cada roteador tem uma Loopback /32. O OSPF anuncia links e Loopbacks e escolhe o menor custo. Altere os custos para mudar o caminho; custos iguais usam os dois caminhos (ECMP).' },
    { id: 'mpls', t: 'MPLS e LDP', d: 'O PE de entrada coloca uma label, o P a troca ou retira (PHP) e o PE de saída entrega o pacote IP. O LDP distribui as labels seguindo o caminho escolhido pelo OSPF.' },
    { id: 'te', t: 'MPLS-TE', d: 'Túnel com caminho escolhido: principal pelo R2 e secundário pelo R4 (hot-standby). O TE ignora o custo do OSPF. Derrube o R2 e veja o failover.' },
    { id: 'servico', t: 'Serviço (VPN)', d: 'O serviço do cliente viaja sobre o túnel. Em L2VPN o quadro Ethernet é levado como um cabo virtual; em L3VPN os PEs roteiam o tráfego do cliente dentro de uma VRF.' }
  ];

  function el(n, a, txt) { var e = document.createElementNS(NS, n); for (var k in a) e.setAttribute(k, a[k]); if (txt != null) e.textContent = txt; return e; }
  function H(tag, attrs, kids) {
    var e = document.createElement(tag); attrs = attrs || {};
    for (var k in attrs) { if (k === 'class') e.className = attrs[k]; else if (k.slice(0, 2) === 'on') e.addEventListener(k.slice(2), attrs[k]); else e.setAttribute(k, attrs[k]); }
    (kids || []).forEach(function (c) { if (c == null) return; e.append(c.nodeType ? c : document.createTextNode(String(c))); });
    return e;
  }
  function lk(id) { return LINKS.filter(function (l) { return l.id === id; })[0]; }
  function nodesOf(ids) { var seq = ['R1']; ids.forEach(function (id) { var l = lk(id); var last = seq[seq.length - 1]; seq.push(l.a === last ? l.b : l.a); }); return seq; }

  function mount(container, opts) {
    opts = opts || {};
    if (container._topoTimer) clearInterval(container._topoTimer);
    var st = {
      stage: opts.stage || 3, layer: opts.layer || 'fisica', svc: opts.svc || 'l2',
      down: { R2: false, R4: false }, linkdown: {}, cables: 2,
      costs: { 'R1-R2': 10, 'R2-R3': 10, 'R1-R4': 20, 'R4-R3': 20 },
      sel: null, step: -1, steps: [], timer: null
    };
    container.innerHTML = '';
    var root = H('div', { class: 'topo' });
    container.append(root);
    var ctl = H('div'), hint = H('div'), svgbox = H('div'), legend = H('div', { class: 'legend' }), status = H('div', { class: 'status' });
    var info = H('div', { class: 'card' }), pktbox = H('div', { class: 'card' }), panel = H('div', { class: 'card' });
    var cols = H('div', { class: 'cols' }, [H('div', {}, [svgbox, legend, status, pktbox]), H('div', {}, [info, H('div', { style: 'height:12px' }), panel])]);
    root.append(ctl, hint, cols);

    function nodeUp(id) { return NODES[id].stage <= st.stage && !st.down[id]; }
    function linkOn(l) { return l.stage <= st.stage; }
    function linkUp(l) { return linkOn(l) && nodeUp(l.a) && nodeUp(l.b) && !st.linkdown[l.id] && (l.id !== 'CE-R1' || st.cables > 0); }
    function pathUp(ids) { return ids.every(function (id) { return linkUp(lk(id)); }); }
    var P_R2 = ['R1-R2', 'R2-R3'], P_R4 = ['R1-R4', 'R4-R3'];
    function cost(ids) { return ids.reduce(function (s, id) { return s + st.costs[id]; }, 0); }
    function igpPaths() {
      var c = [P_R2, P_R4].filter(pathUp); if (!c.length) return [];
      var m = Math.min.apply(null, c.map(cost)); return c.filter(function (p) { return cost(p) === m; });
    }
    function tePath() { if (pathUp(P_R2)) return { ids: P_R2, kind: 'principal' }; if (st.stage >= 2 && pathUp(P_R4)) return { ids: P_R4, kind: 'backup' }; return null; }
    function activePaths() {
      if (st.layer === 'te' || st.layer === 'servico') { var t = tePath(); return t ? [t.ids] : []; }
      if (st.layer === 'l3' || st.layer === 'mpls') return igpPaths();
      return [];
    }
    function inActive(id) { return activePaths().some(function (p) { return p.indexOf(id) >= 0; }); }

    // ---------- controles
    function drawCtl() {
      ctl.innerHTML = '';
      if (opts.stageSelect !== false) {
        var r1 = H('div', { class: 'controls' }, [H('strong', {}, ['Etapa:'])]);
        STAGES.forEach(function (s) { r1.append(H('button', { class: 'btn sm' + (st.stage === s.n ? ' on' : ''), type: 'button', onclick: function () { st.stage = s.n; if (st.stage < 2) st.down.R4 = false; if (st.sel && !selValid()) st.sel = null; resetPkt(); render(); } }, [s.t])); });
        ctl.append(r1);
      }
      var r2 = H('div', { class: 'controls' }, [H('strong', {}, ['Camada:'])]);
      LAYERS.forEach(function (l) { r2.append(H('button', { class: 'btn sm' + (st.layer === l.id ? ' on' : ''), type: 'button', onclick: function () { st.layer = l.id; resetPkt(); render(); } }, [l.t])); });
      ctl.append(r2);
      if (st.layer === 'servico') {
        ctl.append(H('div', { class: 'controls' }, [H('strong', {}, ['Serviço:']),
          H('button', { class: 'btn sm' + (st.svc === 'l2' ? ' on' : ''), type: 'button', onclick: function () { st.svc = 'l2'; resetPkt(); render(); } }, ['L2VPN (pseudowire)']),
          H('button', { class: 'btn sm' + (st.svc === 'l3' ? ' on' : ''), type: 'button', onclick: function () { st.svc = 'l3'; resetPkt(); render(); } }, ['L3VPN (VRF)'])]));
      }
      var r3 = H('div', { class: 'controls' }, [H('strong', {}, ['Falha:'])]);
      ['R2', 'R4'].forEach(function (id) {
        var b = H('button', { class: 'btn sm' + (st.down[id] ? ' on' : ''), type: 'button', onclick: function () { st.down[id] = !st.down[id]; resetPkt(); render(); } }, [(st.down[id] ? 'Religar ' : 'Derrubar ') + id]);
        if (id === 'R4' && st.stage < 2) b.disabled = true; r3.append(b);
      });
      r3.append(H('button', { class: 'btn sm', type: 'button', onclick: function () { st.down.R2 = false; st.down.R4 = false; st.linkdown = {}; st.cables = 2; resetPkt(); render(); } }, ['Restaurar tudo']));
      ctl.append(r3);
      if (st.layer === 'l3' || st.layer === 'mpls') {
        var c = H('div', { class: 'controls' }, [H('strong', {}, ['Custos:'])]);
        var wrap = H('div', { class: 'costs' });
        Object.keys(st.costs).forEach(function (id) {
          if (st.stage < 2 && id.indexOf('R4') >= 0) return;
          var inp = H('input', { type: 'number', min: '1', max: '1000', value: String(st.costs[id]), 'aria-label': 'Custo ' + id });
          inp.onchange = function () { var v = parseInt(inp.value, 10); st.costs[id] = (v > 0 ? v : 1); resetPkt(); render(); };
          wrap.append(H('label', {}, [id + ' ', inp]));
        });
        c.append(wrap); ctl.append(c);
      }
    }
    function selValid() { if (!st.sel) return true; if (st.sel.t === 'n') return NODES[st.sel.id].stage <= st.stage; return lk(st.sel.id).stage <= st.stage; }

    // ---------- desenho
    function draw() {
      svgbox.innerHTML = '';
      var svg = el('svg', { viewBox: '0 0 830 460', role: 'img', 'aria-label': 'Topologia do backbone' });
      var lines = el('g', {}), labels = el('g', {}), nodes = el('g', {});
      LINKS.forEach(function (l) {
        if (!linkOn(l)) return;
        var a = NODES[l.a], b = NODES[l.b], dead = !linkUp(l), cls = 'link';
        if (l.id === 'CE-R1' && st.layer === 'fisica') cls += ' thick';
        if (l.id === 'CE-R1' && st.cables === 1 && !dead) cls += ' degraded';
        var act = inActive(l.id);
        var isBack = (l.id === 'R1-R4' || l.id === 'R4-R3');
        if ((st.layer === 'l3' || st.layer === 'mpls') && act) cls += ' active';
        if (st.layer === 'te') { if (act) cls += ' active'; else if (isBack && !dead) cls += ' backup'; }
        if (st.layer === 'servico' && act) cls += ' pw';
        if (dead) cls += ' down';
        lines.append(el('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, 'class': cls }));
        var hit = el('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, 'class': 'link hit' });
        hit.addEventListener('click', function () { st.sel = { t: 'l', id: l.id }; render(); });
        lines.append(hit);
        var mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, txt = '';
        if (st.layer === 'fisica') { txt = l.phys; if (l.id === 'CE-R1') txt = st.cables === 2 ? 'Eth-Trunk · 2 cabos' : st.cables === 1 ? 'Eth-Trunk · 1 cabo (degradado)' : 'Eth-Trunk · sem cabos'; }
        else if (st.layer === 'l3') { txt = l.net + (st.costs[l.id] != null ? ' · custo ' + st.costs[l.id] : ''); }
        else if (st.layer === 'mpls') txt = dead ? '' : (l.id === 'CE-R1' || l.id === 'R3-R5' ? 'IP' : 'LDP');
        else if (st.layer === 'te') txt = act ? 'túnel ativo' : (isBack && !dead ? 'backup' : '');
        else if (st.layer === 'servico') txt = act ? (st.svc === 'l2' ? 'pseudowire' : 'VPN') : '';
        if (dead && linkOn(l)) txt = 'caído';
        if (txt) { var oy = (l.id === 'R1-R4' || l.id === 'R4-R3') ? -10 : (l.id === 'R1-R2' || l.id === 'R2-R3') ? 20 : -14; labels.append(el('text', { x: mx, y: my + oy, 'text-anchor': 'middle', 'class': 'lbl' }, txt)); }
      });
      var ap = activePaths(), viaNode = ap.length ? (ap[0][0] === 'R1-R2' ? 'R2' : 'R4') : null;
      Object.keys(NODES).forEach(function (id) {
        var n = NODES[id]; if (n.stage > st.stage) return;
        var isDown = !!st.down[id];
        var g = el('g', { 'class': 'node ' + n.cls + (isDown ? ' down' : '') + (st.sel && st.sel.t === 'n' && st.sel.id === id ? ' sel' : ''), tabindex: '0', role: 'button', 'aria-label': n.name });
        g.append(el('rect', { x: n.x - 52, y: n.y - 26, width: 104, height: 52, rx: 10 }));
        g.append(el('text', { x: n.x, y: n.y - 3, 'text-anchor': 'middle', 'class': 'nm' }, n.name));
        g.append(el('text', { x: n.x, y: n.y + 15, 'text-anchor': 'middle', 'class': 'sb' }, isDown ? 'CAÍDO' : n.sub));
        g.addEventListener('click', function () { st.sel = { t: 'n', id: id }; render(); });
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter') { st.sel = { t: 'n', id: id }; render(); } });
        nodes.append(g);
        var note = '';
        if (!isDown) {
          if (st.layer === 'l3' && id.charAt(0) === 'R') note = 'lo 10.200.255.' + id.charAt(1);
          if (st.layer === 'mpls' && viaNode) { if (id === 'R1') note = 'push label'; else if (id === viaNode) note = 'PHP (retira)'; else if (id === 'R3') note = 'entrega IP'; }
          if (st.layer === 'te' && id === 'R1') note = 'origem do túnel';
          if (st.layer === 'te' && id === 'R3') note = 'destino (Loopback)';
          if (st.layer === 'servico' && (id === 'R1' || id === 'R3')) note = st.svc === 'l2' ? 'VSI / vsi-id 3051' : 'VRF CLIENTE_A';
          if (st.layer === 'servico' && (id === 'CE' || id === 'R5')) note = 'cliente';
          if (st.layer === 'fisica' && id === 'CE') note = 'VLAN 100 (trunk)';
        }
        if (note) nodes.append(el('text', { x: n.x, y: n.y + 46, 'text-anchor': 'middle', 'class': 'note' }, note));
      });
      svg.append(lines, labels, nodes);
      var pkt = el('circle', { 'class': 'pkt', r: 9, cx: 0, cy: 0, style: 'opacity:0' }); svg.append(pkt);
      svgbox.append(svg); svgbox._pkt = pkt;
      if (st.step >= 0 && st.steps[st.step]) movePkt(false);
    }
    function movePkt(anim) {
      var pkt = svgbox._pkt; if (!pkt) return; var s = st.steps[st.step]; if (!s) { pkt.style.opacity = 0; return; }
      var n = NODES[s.node]; if (!anim) pkt.style.transition = 'none'; else pkt.style.transition = '';
      pkt.style.opacity = 1; pkt.style.transform = 'translate(' + n.x + 'px,' + (n.y - 38) + 'px)';
    }

    // ---------- legenda e status
    function drawLegend() {
      legend.innerHTML = '';
      function item(c, t, dash) { var s = H('span'), i = H('i'); i.style.borderTopColor = c; if (dash) i.style.borderTopStyle = 'dashed'; s.append(i, document.createTextNode(t)); legend.append(s); }
      if (st.layer === 'l3' || st.layer === 'mpls') item('var(--accent)', 'caminho escolhido');
      if (st.layer === 'te') { item('var(--accent)', 'túnel ativo'); item('var(--warn)', 'backup (hot-standby)', true); }
      if (st.layer === 'servico') item('var(--blue)', 'serviço sobre o túnel');
      item('var(--bad)', 'caído', true); item('var(--warn)', 'degradado');
    }
    function drawStatus() {
      var ap = activePaths(), down = Object.keys(st.down).filter(function (k) { return st.down[k]; });
      var msg, bad = false;
      if (st.layer === 'fisica') {
        msg = st.cables === 2 ? 'Agregado com 2 cabos ativos. Clique no link CE12800 - R1 para derrubar cabos.' : st.cables === 1 ? 'Um cabo caiu: o agregado continua ativo com metade da banda e o ping não cai.' : 'Os dois cabos caíram: o agregado e a Vlanif 100 caem e a OLT fica isolada.';
        bad = st.cables === 0;
      } else if (!ap.length) { bad = true; msg = 'Sem caminho entre R1 e R3.' + (st.stage < 2 && (st.down.R2 || st.linkdown['R1-R2'] || st.linkdown['R2-R3']) ? ' Nesta etapa não existe o R4: a queda do R2 isola o R3. É o motivo de adicionar redundância.' : ' Os dois caminhos estão indisponíveis.'); }
      else {
        var names = ap.map(function (p) { return nodesOf(p).join(' > '); });
        if (st.layer === 'te' || st.layer === 'servico') { var t = tePath(); var sv = st.layer === 'servico'; msg = (t.kind === 'principal' ? (sv ? 'O serviço viaja pelo túnel principal: ' : 'Túnel TE no caminho principal: ') : (sv ? 'FAILOVER: o serviço passou ao túnel de backup: ' : 'FAILOVER: túnel no caminho de backup: ')) + names[0] + '.'; }
        else msg = ap.length > 1 ? 'Custos iguais: o tráfego é dividido entre ' + names.join(' e ') + ' (ECMP).' : 'Caminho escolhido: ' + names[0] + ' (custo ' + cost(ap[0]) + ').';
        if (down.length || Object.keys(st.linkdown).length) msg += ' ' + ({ l3: 'O OSPF recalculou ao perceber a falha (com BFD, em centenas de ms).', mpls: 'O LDP já tinha labels para o caminho alternativo.', te: 'O hot-standby assumiu sem recalcular.', servico: 'O serviço continua, porque segue o túnel.' }[st.layer] || '');
      }
      status.className = 'status' + (bad ? ' bad' : ''); status.textContent = msg;
    }
    function drawInfo() {
      info.innerHTML = '';
      var L = LAYERS.filter(function (x) { return x.id === st.layer; })[0];
      info.append(H('h3', {}, ['Camada: ' + L.t]), H('p', { class: 'muted' }, [L.d]));
    }

    // ---------- painel de seleção
    function drawPanel() {
      panel.innerHTML = '';
      if (!st.sel) { panel.append(H('p', { class: 'muted' }, ['Clique em um equipamento ou em um link para ver os detalhes.'])); return; }
      if (st.sel.t === 'n') {
        var n = NODES[st.sel.id];
        panel.append(H('h3', {}, [n.name + ' (' + n.sub + ')']), H('p', {}, [n.role]), H('p', { class: 'muted' }, ['Interfaces e endereços:']),
          H('ul', {}, n.ifs.map(function (x) { return H('li', {}, [x]); })), H('p', { class: 'muted' }, ['Onde é configurado: ' + n.labs]));
        if (st.sel.id === 'R2' || st.sel.id === 'R4') panel.append(H('button', { class: 'btn sm', type: 'button', onclick: function () { st.down[st.sel.id] = !st.down[st.sel.id]; resetPkt(); render(); } }, [st.down[st.sel.id] ? 'Religar' : 'Derrubar este roteador']));
      } else {
        var l = lk(st.sel.id);
        panel.append(H('h3', {}, ['Link ' + NODES[l.a].name + ' - ' + NODES[l.b].name]), H('p', {}, ['Rede: ' + l.net + ' (' + l.ips + ')']), H('p', {}, [l.kind]));
        if (l.id === 'CE-R1') {
          panel.append(H('p', { class: 'muted' }, ['Cabos ativos no agregado: ' + st.cables + ' de 2']),
            H('div', { class: 'row' }, [
              H('button', { class: 'btn sm', type: 'button', onclick: function () { st.cables = Math.max(0, st.cables - 1); resetPkt(); render(); } }, ['Derrubar 1 cabo']),
              H('button', { class: 'btn sm', type: 'button', onclick: function () { st.cables = 2; resetPkt(); render(); } }, ['Religar os cabos'])]));
        } else {
          panel.append(H('button', { class: 'btn sm', type: 'button', onclick: function () { st.linkdown[l.id] = !st.linkdown[l.id]; resetPkt(); render(); } }, [st.linkdown[l.id] ? 'Religar este link' : 'Derrubar este link']));
        }
      }
    }

    // ---------- pacote
    function chip(cls, t) { return { cls: cls, t: t }; }
    function buildSteps() {
      var ap = activePaths(); var steps = [];
      if (st.layer === 'fisica') return { steps: [], msg: 'Escolha uma camada de L3 para cima (IP e OSPF, MPLS, TE ou Serviço) para acompanhar um pacote.' };
      if (st.cables < 1 || st.linkdown['CE-R1']) return { steps: [], msg: 'O cliente está isolado: o link CE12800 - R1 está fora do ar.' };
      if (!ap.length) return { steps: [], msg: 'Sem caminho no backbone: o pacote não chega ao destino.' };
      if (st.stage >= 3 && (st.linkdown['R3-R5'])) return { steps: [], msg: 'O link R3 - R5 está fora do ar.' };
      var core = nodesOf(ap[0]); var route = ['CE'].concat(core); if (st.stage >= 3) route.push('R5');
      var via = core[1], last = core.length - 1;
      route.forEach(function (id, i) {
        var s = { node: id, title: '', detail: '', stack: [] };
        var isP = (id === 'R2' || id === 'R4');
        if (st.layer === 'l3') {
          if (id === 'CE') { s.title = 'CE12800 envia o pacote'; s.detail = 'O cliente envia um pacote IP ao gateway (R1).'; s.stack = [chip('ip', 'IP')]; }
          else if (id === 'R1') { s.title = 'R1 consulta a tabela de roteamento'; s.detail = 'A rota para o destino aponta para o próximo salto ' + via + ' (menor custo do OSPF).'; s.stack = [chip('ip', 'IP')]; }
          else if (isP) { s.title = id + ' encaminha por IP'; s.detail = 'Olha o cabeçalho IP e a própria tabela de rotas: próximo salto R3. Cada roteador decide de novo.'; s.stack = [chip('ip', 'IP')]; }
          else if (id === 'R3') { s.title = st.stage >= 3 ? 'R3 encaminha ao R5' : 'R3 recebe o pacote'; s.detail = st.stage >= 3 ? 'Consulta a tabela e entrega ao CE2 pela rede diretamente conectada.' : 'O destino está na rede do R3.'; s.stack = [chip('ip', 'IP')]; }
          else { s.title = 'R5 recebe o pacote'; s.detail = 'Fim do caminho.'; s.stack = [chip('ip', 'IP')]; }
        } else if (st.layer === 'mpls' || st.layer === 'te') {
          var te = st.layer === 'te';
          if (id === 'CE') { s.title = 'CE12800 envia o pacote'; s.detail = 'Pacote IP puro: as labels só existem dentro da operadora.'; s.stack = [chip('ip', 'IP')]; }
          else if (id === 'R1') { s.title = te ? 'R1 injeta o pacote no túnel TE' : 'R1 coloca a label (push)'; s.detail = te ? 'O destino é alcançado pelo túnel TE (RSVP-TE). A label do túnel leva o pacote até o R3 pelo caminho escolhido (' + via + ').' : 'O destino está associado a um LSP até o R3. O R1 (PE/LER) coloca a label 1001 recebida do vizinho por LDP.'; s.stack = [chip('lbl', te ? 'label túnel 3001' : 'label 1001'), chip('ip', 'IP')]; }
          else if (isP) { s.title = id + ' faz o PHP (retira a label)'; s.detail = 'Como o próximo salto é o último roteador do LSP, o penúltimo (PHP) retira a label e poupa trabalho ao R3. O P nunca olhou o IP do cliente.'; s.stack = [chip('ip', 'IP')]; }
          else if (id === 'R3') { s.title = st.stage >= 3 ? 'R3 consulta o IP e encaminha' : 'R3 recebe o IP puro'; s.detail = 'Chega sem label e é roteado normalmente.'; s.stack = [chip('ip', 'IP')]; }
          else { s.title = 'R5 recebe o pacote'; s.detail = 'Fim do caminho.'; s.stack = [chip('ip', 'IP')]; }
        } else {
          var l2 = st.svc === 'l2';
          if (id === 'CE') { s.title = 'Cliente envia'; s.detail = l2 ? 'Quadro Ethernet do cliente na VLAN do serviço.' : 'Pacote IP do cliente ao gateway (R1).'; s.stack = l2 ? [chip('eth', 'Quadro do cliente')] : [chip('ip', 'IP')]; }
          else if (id === 'R1') {
            s.title = l2 ? 'R1 encapsula no pseudowire' : 'R1 consulta a VRF CLIENTE_A';
            s.detail = l2 ? 'A Vlanif do cliente está ligada à VSI. O PE não olha o IP: põe a label do pseudowire (2001) e a label do túnel (3001).' : 'Na tabela da VRF a rede do site B aponta para o R3. Põe a label de VPN (4001) e a de transporte (3001).';
            s.stack = [chip('lbl', 'label túnel 3001'), chip(l2 ? 'pw' : 'vpn', l2 ? 'label PW 2001' : 'label VPN 4001'), l2 ? chip('eth', 'Quadro do cliente') : chip('ip', 'IP')];
          }
          else if (isP) { s.title = id + ' faz o PHP'; s.detail = 'O P só vê a label de transporte e a retira (PHP). A label do serviço continua escondida.'; s.stack = [chip(l2 ? 'pw' : 'vpn', l2 ? 'label PW 2001' : 'label VPN 4001'), l2 ? chip('eth', 'Quadro do cliente') : chip('ip', 'IP')]; }
          else if (id === 'R3') {
            s.title = l2 ? 'R3 retira o pseudowire' : 'R3 usa a label de VPN';
            s.detail = l2 ? 'A label 2001 identifica a VSI. O quadro é entregue ao cliente sem roteamento.' : 'A label 4001 indica a VRF CLIENTE_A. O R3 consulta a VRF e roteia para o R5.';
            s.stack = [l2 ? chip('eth', 'Quadro do cliente') : chip('ip', 'IP')];
          }
          else { s.title = 'R5 recebe'; s.detail = l2 ? 'O quadro chegou como se houvesse um cabo entre os sites.' : 'O pacote chegou ao site B.'; s.stack = [l2 ? chip('eth', 'Quadro do cliente') : chip('ip', 'IP')]; }
        }
        steps.push(s);
      });
      return { steps: steps, msg: '' };
    }
    function resetPkt() { if (st.timer) { clearInterval(st.timer); st.timer = null; } st.step = -1; st.steps = []; }
    function drawPkt() {
      pktbox.innerHTML = '';
      pktbox.append(H('h3', {}, ['Acompanhe um pacote']));
      var b = buildSteps();
      var row = H('div', { class: 'row' });
      var send = H('button', { class: 'btn primary sm', type: 'button', onclick: function () { var r = buildSteps(); st.steps = r.steps; st.step = 0; drawPkt(); movePkt(false); } }, ['Enviar pacote']);
      send.disabled = !b.steps.length; row.append(send);
      var next = H('button', { class: 'btn sm', type: 'button', onclick: function () { if (st.step < st.steps.length - 1) { st.step++; drawPkt(); movePkt(true); } } }, ['Próximo salto']);
      next.disabled = st.step < 0 || st.step >= st.steps.length - 1; row.append(next);
      var play = H('button', { class: 'btn sm', type: 'button', onclick: function () {
        if (st.timer) { clearInterval(st.timer); st.timer = null; drawPkt(); return; }
        var r = buildSteps(); st.steps = r.steps; if (st.step < 0 || st.step >= st.steps.length - 1) st.step = 0; drawPkt(); movePkt(false);
        st.timer = setInterval(function () { if (!document.body.contains(container)) { clearInterval(st.timer); return; } if (st.step < st.steps.length - 1) { st.step++; drawPkt(); movePkt(true); } else { clearInterval(st.timer); st.timer = null; drawPkt(); } }, 2200);
        container._topoTimer = st.timer; drawPkt();
      } }, [st.timer ? 'Pausar' : 'Reproduzir']);
      play.disabled = !b.steps.length; row.append(play);
      pktbox.append(row);
      if (!b.steps.length) { pktbox.append(H('p', { class: 'muted' }, [b.msg])); return; }
      if (st.step < 0) { pktbox.append(H('p', { class: 'muted' }, ['Clique em "Enviar pacote" para ver, salto a salto, o que cada equipamento faz e como o pacote muda.'])); return; }
      var s = st.steps[st.step];
      pktbox.append(H('p', { class: 'muted' }, ['Passo ' + (st.step + 1) + ' de ' + st.steps.length]), H('h3', {}, [s.title]), H('p', {}, [s.detail]),
        H('div', { class: 'stack' }, s.stack.map(function (c) { return H('div', { class: 'c ' + c.cls }, [c.t]); })),
        H('p', { class: 'muted' }, ['Os números das labels são apenas exemplos.']));
    }

    function render() { drawCtl(); hint.innerHTML = ''; if (opts.hint) hint.append(H('div', { class: 'callout' }, [opts.hint])); draw(); drawLegend(); drawStatus(); drawInfo(); drawPanel(); drawPkt(); }
    render();
    return { st: st };
  }
  window.Topo = { mount: mount };
})();
