/* Střídmá kinetická typografie pro varianty A: nadpisy s [data-kin].
   Písmena blízko kurzoru se pružně rozšíří a přitíží (osy wdth + wght)
   a při scrollu jimi projde jemná vlna úměrná rychlosti. V klidu
   (kurzor stojí, stránka nescrolluje) vše dosedne do výchozího stavu. */
(function () {
  'use strict';
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  var heads = [].slice.call(document.querySelectorAll('[data-kin]'));
  if (!heads.length) return;

  var pointer = { x: -1e4, y: -1e4, t: 0 };
  var lastY = window.scrollY, vel = 0, phase = 0;
  var all = [];
  var running = false;

  function split(h) {
    h.setAttribute('aria-label', h.textContent.replace(/\s+/g, ' ').trim());
    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 1) { walk(c); return; }
        if (c.nodeType !== 3 || !c.nodeValue.trim()) return;
        var frag = document.createDocumentFragment();
        // slovo = nedělitelný obal, jinak by se řádek mohl zlomit mezi písmeny;
        // tvrdá mezera (nbsp) zůstává uvnitř slova a drží ho pohromadě
        c.nodeValue.split(/([ \t\n\r]+)/).forEach(function (part) {
          if (!part) return;
          if (/^[ \t\n\r]+$/.test(part)) { frag.appendChild(document.createTextNode(' ')); return; }
          var w = document.createElement('span');
          w.className = 'kin-w';
          w.setAttribute('aria-hidden', 'true');
          [].slice.call(part).forEach(function (chr) {
            if (chr === '\u00a0') { w.appendChild(document.createTextNode(chr)); return; }
            var s = document.createElement('span');
            s.className = 'kin-ch';
            s.textContent = chr;
            w.appendChild(s);
            all.push({ el: s, i: all.length, cx: 0, cy: 0, dw: 0, dg: 0, vw: 0, vg: 0, lw: 0, lg: 0 });
          });
          frag.appendChild(w);
        });
        c.parentNode.replaceChild(frag, c);
      });
    })(h);
  }

  function measure() {
    var sy = window.scrollY;
    all.forEach(function (l) {
      var r = l.el.getBoundingClientRect();
      l.cx = r.left + r.width / 2;
      l.cy = r.top + r.height / 2 + sy;
    });
  }

  var frame = 0;
  function tick() {
    var now = performance.now();
    var idle = now - pointer.t;
    var inf = idle < 120 ? 1 : Math.max(0, 1 - (idle - 120) / 380); // po zastavení odezní
    var R = window.innerWidth * 0.11;
    var y = window.scrollY, vh = window.innerHeight;
    var py = pointer.y + y;
    // rychlost scrollu (vyhlazená) → amplituda vlny; při klidu klesá k nule
    vel += ((y - lastY) - vel) * 0.18; lastY = y;
    var amp = Math.min(Math.abs(vel) / 30, 1);
    phase += 0.06 + amp * 0.22;
    var active = amp > 0.01;
    if (++frame % 15 === 0) measure();
    all.forEach(function (l) {
      if (l.cy < y - 200 || l.cy > y + vh + 200) return;    // jen viditelné nadpisy
      var dx = pointer.x - l.cx, dy = (py - l.cy) * 1.4;
      var g = inf * Math.exp(-(dx * dx + dy * dy) / (R * R));
      var wave = Math.sin(l.i * 0.55 - phase);
      var tw = 16 * g + 9 * amp * wave;
      var tg = 120 * g + 45 * amp * Math.max(0, wave);
      // pružina: tuhost 0.14, tlumení 0.7 — dosedne zhruba za půl vteřiny
      l.vw = (l.vw + (tw - l.dw) * 0.14) * 0.7;
      l.vg = (l.vg + (tg - l.dg) * 0.14) * 0.7;
      l.dw += l.vw; l.dg += l.vg;
      if (Math.abs(l.dw - tw) < 0.05 && Math.abs(l.vw) < 0.02) { l.dw = tw; l.vw = 0; }
      if (Math.abs(l.dg - tg) < 0.4 && Math.abs(l.vg) < 0.1) { l.dg = tg; l.vg = 0; }
      if (Math.abs(l.dw) < 0.02) l.dw = 0;
      if (Math.abs(l.dg) < 0.2) l.dg = 0;
      // dosednutí na nulu se zapíše vždy, i když je rozdíl pod prahem
      if (Math.abs(l.dw - l.lw) > 0.1 || Math.abs(l.dg - l.lg) > 0.5 || (l.dw === 0 && l.lw !== 0) || (l.dg === 0 && l.lg !== 0)) {
        l.el.style.setProperty('--dw', l.dw.toFixed(2) + '%');
        l.el.style.setProperty('--dg', l.dg.toFixed(0));
        l.lw = l.dw; l.lg = l.dg;
      }
      if (l.dw || l.dg || l.vw || l.vg) active = true;
    });
    if (active || inf > 0) requestAnimationFrame(tick);
    else running = false;
  }
  function wake() { if (!running) { running = true; measure(); requestAnimationFrame(tick); } }

  // Písmena se rozdělí až po úvodní animaci, aby jí nepřebila šířku.
  setTimeout(function () {
    heads.forEach(split);
    measure();
    if (finePointer) window.addEventListener('pointermove', function (e) {
      pointer.x = e.clientX; pointer.y = e.clientY; pointer.t = performance.now();
      wake();
    }, { passive: true });
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', measure);
  }, 1900);
})();
