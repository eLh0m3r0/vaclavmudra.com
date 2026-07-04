/* vaclavmudra.com — návrh v5.1 „Modrotisk"
   Scroll choreografie: jediný rAF loop, jen transform/opacity + canvas,
   všechno vypnutelné přes prefers-reduced-motion. Bez knihoven. */
(function () {
  'use strict';

  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = mq.matches;
  var onMq = function () { reduced = mq.matches; if (reduced) resetTransforms(); };
  if (mq.addEventListener) mq.addEventListener('change', onMq);
  else if (mq.addListener) mq.addListener(onMq);

  /* ---------- Prvky ---------- */

  var stamp = document.querySelector('[data-stamp]');
  var bands = [].slice.call(document.querySelectorAll('[data-band]'));
  var timeline = document.querySelector('[data-timeline]');
  var tlLine = timeline ? timeline.querySelector('.timeline__line') : null;
  var topstar = document.querySelector('[data-topstar]');
  var topstarGlyph = topstar ? topstar.querySelector('span') : null;
  var canvas = document.querySelector('[data-schematic]');

  /* ---------- Cache měření (žádné layout čtení v loopu) ---------- */

  var vh = window.innerHeight;
  var vw = window.innerWidth;
  var docH = 1;
  var tlCache = null; // {top, height}

  function docTop(el) {
    var r = el.getBoundingClientRect();
    return r.top + window.scrollY;
  }

  function measure() {
    vh = window.innerHeight;
    vw = window.innerWidth;
    docH = Math.max(1, document.documentElement.scrollHeight - vh);
    if (timeline) {
      tlCache = { top: docTop(timeline), height: Math.max(1, timeline.offsetHeight) };
    }
    bands.forEach(setupBand);
    sizeSchematic();
  }

  /* Pásy: doplnit kopie, aby smyčka pokryla i široké displeje */
  function setupBand(row) {
    var track = row.firstElementChild;
    var seq = track.firstElementChild;
    var seqW = seq.offsetWidth;
    if (!seqW) return;
    while (track.children.length < 8 && track.offsetWidth < vw + 2 * seqW) {
      track.appendChild(seq.cloneNode(true));
    }
    row._track = track;
    row._seqW = seqW;
    row._dir = parseFloat(row.getAttribute('data-band')) || -1;
    if (row._offset === undefined) row._offset = 0;
  }

  /* ---------- Schéma systému (canvas) ---------- */

  var ctx = null;
  var schematicT0 = null;   // čas prvního vykreslení
  var pulsePhase = 0;       // fáze putujících pulzů
  var NODES = [
    { x: 0.50, y: 0.46, w: 0,    h: 0,    r: 0.055, label: '',    hub: true },
    { x: 0.13, y: 0.16, w: 0.17, h: 0.13, label: 'API' },
    { x: 0.50, y: 0.07, w: 0.15, h: 0.12, label: 'UI' },
    { x: 0.86, y: 0.18, w: 0.17, h: 0.13, label: 'ERP' },
    { x: 0.10, y: 0.74, w: 0.17, h: 0.13, label: 'DB' },
    { x: 0.88, y: 0.72, w: 0.17, h: 0.13, label: 'SaaS' },
    { x: 0.52, y: 0.88, w: 0.19, h: 0.13, label: 'LLM', acid: true }
  ];
  var EDGES = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6]];

  function sizeSchematic() {
    if (!canvas) return;
    var box = canvas.getBoundingClientRect();
    if (!box.width) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.round(box.width);
    var h = Math.round(box.width * 10 / 13);
    if (canvas.width !== w * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.height = h + 'px';
      ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      canvas._w = w;
      canvas._h = h;
    }
  }

  function nodeCenter(n) {
    return { x: n.x * canvas._w, y: n.y * canvas._h };
  }

  /* Ortogonální (loketní) spoj mezi dvěma body — jako v ArchiMate */
  function elbow(a, b) {
    var midY = a.y + (b.y - a.y) * 0.5;
    return [a, { x: a.x, y: midY }, { x: b.x, y: midY }, b];
  }

  function pathLength(pts) {
    var L = 0;
    for (var i = 1; i < pts.length; i++) {
      L += Math.abs(pts[i].x - pts[i - 1].x) + Math.abs(pts[i].y - pts[i - 1].y);
    }
    return L;
  }

  function pointAt(pts, t) {
    var L = pathLength(pts) * t;
    for (var i = 1; i < pts.length; i++) {
      var seg = Math.abs(pts[i].x - pts[i - 1].x) + Math.abs(pts[i].y - pts[i - 1].y);
      if (L <= seg && seg > 0) {
        var f = L / seg;
        return {
          x: pts[i - 1].x + (pts[i].x - pts[i - 1].x) * f,
          y: pts[i - 1].y + (pts[i].y - pts[i - 1].y) * f
        };
      }
      L -= seg;
    }
    return pts[pts.length - 1];
  }

  function drawSchematic(t, velocity) {
    if (!ctx || !canvas._w) return;
    if (schematicT0 === null) schematicT0 = t;
    var elapsed = reduced ? 99999 : t - schematicT0;
    var W = canvas._w, H = canvas._h;
    ctx.clearRect(0, 0, W, H);

    var ink = '#101413', ink3 = '#7f8985', blue = '#2547f0', acid = '#d7f94b', bg = '#f5f7f6';
    var hub = nodeCenter(NODES[0]);

    // Hrany — kreslí se postupně (stagger po 140 ms, každá 500 ms)
    EDGES.forEach(function (e, i) {
      var target = NODES[e[1]];
      var pts = elbow(hub, nodeCenter(target));
      var p = Math.max(0, Math.min(1, (elapsed - 300 - i * 140) / 500));
      if (p === 0) return;
      var L = pathLength(pts);
      ctx.save();
      ctx.strokeStyle = blue;
      ctx.lineWidth = 1.5;
      ctx.setLineDash([L]);
      ctx.lineDashOffset = L * (1 - p);
      ctx.beginPath();
      ctx.moveTo(pts[0].x, pts[0].y);
      for (var j = 1; j < pts.length; j++) ctx.lineTo(pts[j].x, pts[j].y);
      ctx.stroke();
      ctx.restore();

      // Putující pulz (až po nakreslení hrany)
      if (p === 1 && !reduced) {
        var phase = (pulsePhase + i / EDGES.length) % 1;
        var pt = pointAt(pts, phase);
        ctx.fillStyle = blue;
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    // Uzly — naskakují po 120 ms
    NODES.forEach(function (n, i) {
      var p = Math.max(0, Math.min(1, (elapsed - i * 120) / 300));
      if (p === 0) return;
      ctx.save();
      ctx.globalAlpha = p;
      if (n.hub) {
        // středový uzel: kroužek s rotujícím ✳
        var r = n.r * W;
        ctx.fillStyle = bg;
        ctx.strokeStyle = blue;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(hub.x, hub.y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.translate(hub.x, hub.y);
        if (!reduced) ctx.rotate(t / 6000 + velocity * 0.002);
        ctx.strokeStyle = ink;
        ctx.lineWidth = 1.5;
        for (var k = 0; k < 4; k++) {
          ctx.beginPath();
          ctx.moveTo(-r * 0.52, 0);
          ctx.lineTo(r * 0.52, 0);
          ctx.stroke();
          ctx.rotate(Math.PI / 4);
        }
      } else {
        var c = nodeCenter(n);
        var w = n.w * W, h = n.h * H;
        ctx.fillStyle = n.acid ? acid : bg;
        ctx.strokeStyle = ink;
        ctx.lineWidth = 1;
        ctx.fillRect(c.x - w / 2, c.y - h / 2, w, h);
        ctx.strokeRect(c.x - w / 2, c.y - h / 2, w, h);
        ctx.fillStyle = ink;
        ctx.font = '600 11px "Spline Sans Mono", monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(n.label, c.x, c.y + 1);
        // pasovací křížky v rozích
        ctx.strokeStyle = ink3;
        ctx.lineWidth = 1;
        [[-1, -1], [1, 1]].forEach(function (q) {
          var cx = c.x + q[0] * (w / 2 + 7), cy = c.y + q[1] * (h / 2 + 7);
          ctx.beginPath();
          ctx.moveTo(cx - 3, cy); ctx.lineTo(cx + 3, cy);
          ctx.moveTo(cx, cy - 3); ctx.lineTo(cx, cy + 3);
          ctx.stroke();
        });
      }
      ctx.restore();
    });
  }

  /* ---------- Reveal (IntersectionObserver) ---------- */

  var revealEls = [].slice.call(document.querySelectorAll('[data-reveal]'));
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Jediný rAF loop ---------- */

  var lastY = window.scrollY;
  var smoothV = 0;       // vyhlazená rychlost scrollu (px/frame)
  var stampBoost = 0;    // příspěvek scrollu k rotaci razítka
  var lastT = 0;
  var starVisible = false;

  function loop(t) {
    try { tick(t); } catch (_) { /* jediný špatný frame nesmí zabít celou smyčku */ }
    requestAnimationFrame(loop);
  }

  function tick(t) {
    var dtn = lastT ? Math.min((t - lastT) / 16.67, 3) : 1; // normalizace na 60 fps
    lastT = t;

    var y = window.scrollY;
    var v = y - lastY;
    lastY = y;
    smoothV += (v - smoothV) * 0.12;

    if (!reduced) {
      // 1. Razítko — přírůstek rotace podle rychlosti scrollu
      if (stamp) {
        stampBoost += smoothV * 0.22 * dtn;
        stamp.style.setProperty('--boost', stampBoost.toFixed(2) + 'deg');
      }

      // 2. Protiběžné pásy — základní drift + zrychlení od scrollu
      bands.forEach(function (row) {
        if (!row._track) return;
        row._offset += row._dir * (0.55 + smoothV * 0.9) * dtn;
        var o = row._offset % row._seqW;
        if (o > 0) o -= row._seqW;
        row._offset = o;
        row._track.style.transform = 'translate3d(' + o.toFixed(2) + 'px,0,0)';
      });

      // 3. Kreslící se timeline
      if (tlLine && tlCache) {
        var p = (y + vh * 0.85 - tlCache.top) / tlCache.height;
        p = Math.max(0, Math.min(1, p));
        tlLine.style.transform = 'scaleY(' + p.toFixed(4) + ')';
      }

      // 4. Rotující ✳ = scroll progress
      if (topstarGlyph) {
        topstarGlyph.style.transform = 'rotate(' + (y / docH * 360).toFixed(1) + 'deg)';
      }

      // 5. Pulzy ve schématu — rychlost roste se scrollem
      pulsePhase = (pulsePhase + (0.0016 + Math.min(Math.abs(smoothV), 40) * 0.0004) * dtn) % 1;
    }

    // 6. Schéma se kreslí vždy (v reduced motion staticky, bez pulzů)
    drawSchematic(t, smoothV);

    // Viditelnost tlačítka zpět-nahoru (i při reduced motion)
    if (topstar) {
      var show = y > 400;
      if (show !== starVisible) {
        starVisible = show;
        topstar.classList.toggle('is-visible', show);
      }
    }
  }

  function resetTransforms() {
    bands.forEach(function (row) { if (row._track) row._track.style.transform = ''; });
    if (tlLine) tlLine.style.transform = 'scaleY(1)';
    if (topstarGlyph) topstarGlyph.style.transform = '';
    if (stamp) stamp.style.setProperty('--boost', '0deg');
  }

  /* ---------- Zpět nahoru ---------- */

  if (topstar) {
    topstar.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: reduced ? 'auto' : 'smooth' });
    });
  }

  /* ---------- E-mail: mailto + kopie do schránky ---------- */

  var emailLink = document.querySelector('[data-email]');
  if (emailLink) {
    var label = emailLink.querySelector('[data-email-text]');
    var original = label ? label.textContent : '';
    emailLink.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (!navigator.clipboard || !label) return;
      try { navigator.clipboard.writeText(original.trim()); } catch (_) {}
      label.textContent = emailLink.getAttribute('data-email-copied') || 'zkopírováno · otevírám mail…';
      setTimeout(function () { label.textContent = original; }, 1600);
    });
  }

  /* ---------- Přeměření při resize / doskládání layoutu ---------- */

  var resizeRaf = 0;
  function queueMeasure() {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(measure);
  }
  window.addEventListener('resize', queueMeasure);
  window.addEventListener('load', queueMeasure);
  if ('ResizeObserver' in window) {
    var ro = new ResizeObserver(queueMeasure);
    ro.observe(document.body);
  }

  measure();
  requestAnimationFrame(loop);
})();
