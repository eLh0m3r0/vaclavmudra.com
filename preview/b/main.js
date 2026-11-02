/* vaclavmudra.com — varianta B „Barevná pole"
   Bez knihoven. Jeden rAF loop; WebGL jen pro hero pole a vlnu nad
   náhledem projektu. Reduced motion = statická, plně použitelná stránka. */
(function () {
  'use strict';

  var doc = document.documentElement;
  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = mq.matches;
  var finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; };
  var smooth = function (a, b, x) { var t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };
  var io = 'IntersectionObserver' in window;

  var vw = window.innerWidth, vh = window.innerHeight;
  var pointer = { x: -9999, y: -9999, on: false };
  window.addEventListener('pointermove', function (e) {
    if (e.pointerType !== 'mouse') return;
    pointer.x = e.clientX; pointer.y = e.clientY; pointer.on = true;
    pointer.t = performance.now();
  }, { passive: true });
  document.addEventListener('pointerleave', function () { pointer.on = false; });

  /* ---------- Rozdělení nadpisů na písmena ---------- */

  var kins = [];
  $$('[data-kin]').forEach(function (h) {
    var letters = [];
    var n = 0;
    (function walk(node) {
      [].slice.call(node.childNodes).forEach(function (c) {
        if (c.nodeType === 1) { walk(c); return; }
        if (c.nodeType !== 3 || !c.nodeValue.trim()) return;
        var frag = document.createDocumentFragment();
        var sr = document.createElement('span');
        sr.className = 'sr-only';
        sr.textContent = c.nodeValue;
        frag.appendChild(sr);
        var vis = document.createElement('span');
        vis.setAttribute('aria-hidden', 'true');
        c.nodeValue.split(/( +)/).forEach(function (part) {
          if (!part) return;
          if (/^ +$/.test(part)) { vis.appendChild(document.createTextNode(' ')); return; }
          var w = document.createElement('span');
          w.className = 'w';
          [].slice.call(part).forEach(function (chr) {
            var s = document.createElement('span');
            s.className = 'ch';
            s.textContent = chr;
            s.style.setProperty('--n', n++);
            w.appendChild(s);
            letters.push({ el: s, wd: 100, wg: 300, vwd: 0, vwg: 0, cx: 0, cy: 0, i: letters.length });
          });
          vis.appendChild(w);
        });
        frag.appendChild(vis);
        c.parentNode.replaceChild(frag, c);
      });
    })(h);
    var hero = h.getAttribute('data-kin') === 'hero';
    var k = { el: h, letters: letters, hero: hero, visible: hero, baseWg: hero ? 300 : 320, settled: false };
    kins.push(k);
    if (!reduced) h.classList.add('is-armed');
  });

  // Měří se přes slovo (to se nehýbe) + offset písmene ve slově — písmena
  // mají vlastní transform (odhalení) a getBoundingClientRect by lhal.
  function measureKin(k) {
    var sy = window.scrollY;
    k.letters.forEach(function (l) {
      var w = l.el.parentNode;
      var wr = w._r || (w._r = w.getBoundingClientRect());
      l.cx = wr.left + l.el.offsetLeft + l.el.offsetWidth / 2;
      l.cy = wr.top + wr.height / 2 + sy;
    });
    k.letters.forEach(function (l) { l.el.parentNode._r = null; });
  }
  function measureLetters() { kins.forEach(measureKin); }

  /* ---------- Odhalování ---------- */

  var hero = $('.hero');
  if (io && !reduced) {
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); rio.unobserve(e.target); }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    $$('[data-rise]').forEach(function (el) { rio.observe(el); });
    kins.forEach(function (k) { if (!k.hero) rio.observe(k.el); });
    // viditelnost nadpisů pro kinetiku
    var kio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        var k = e.target._kin;
        k.visible = e.isIntersecting;
        // mimo obraz rovnou do klidu — po návratu nadpis nezavlní starým stavem
        if (!k.visible) k.letters.forEach(function (l) {
          l.wd = k.hero ? 96 : 100; l.wg = k.hero ? 280 : k.baseWg; l.vwd = l.vwg = 0; l.lwd = l.wd; l.lwg = l.wg;
          l.el.style.setProperty('--wd', l.wd); l.el.style.setProperty('--wg', l.wg);
        });
      });
    });
    kins.forEach(function (k) { k.el._kin = k; kio.observe(k.el); });
    requestAnimationFrame(function () { kins.forEach(function (k) { if (k.hero) k.el.classList.add('is-in'); }); });
  } else {
    $$('[data-rise]').forEach(function (el) { el.classList.add('is-in'); });
    kins.forEach(function (k) { k.el.classList.add('is-in'); });
  }

  /* ---------- Barevná pole: prahové přepnutí ---------- */
  // Jakmile horní hrana sekce překročí 55 % výšky okna, stránka přejde na její
  // dvojici barev. Samotný přechod dělá CSS (přerušitelný, bez bahnitých
  // mezitónů při pomalém scrollu) — viz .flow v styles.css.

  var fields = $$('[data-field]').map(function (el) {
    var cs = getComputedStyle(el);
    return { el: el, top: 0, bg: cs.getPropertyValue('--sbg').trim(), fg: cs.getPropertyValue('--sfg').trim() };
  });
  var current = -1;
  var themeMeta = $('meta[name="theme-color"]');
  if (fields.length) doc.classList.add('flow');
  function measureFields() {
    fields.forEach(function (f) { f.top = f.el.getBoundingClientRect().top + window.scrollY; });
  }
  function flow(y) {
    var line = y + vh * 0.55, idx = 0;
    for (var i = 0; i < fields.length; i++) if (fields[i].top <= line) idx = i;
    if (idx === current) return;
    var first = current < 0;
    current = idx;
    // text na dobu středu přelití ztlumit (mezitón pozadí nemá kontrast s žádnou barvou)
    if (!first && !reduced) {
      doc.classList.remove('is-washing');
      void doc.offsetWidth;
      doc.classList.add('is-washing');
      clearTimeout(flow._t);
      flow._t = setTimeout(function () { doc.classList.remove('is-washing'); }, 900);
    }
    doc.style.setProperty('--bg', fields[idx].bg);
    doc.style.setProperty('--fg', fields[idx].fg);
    if (themeMeta) themeMeta.setAttribute('content', fields[idx].bg);
  }

  /* ---------- Pásy ---------- */

  var bands = $$('[data-band]').map(function (row) {
    var track = row.firstElementChild, seq = track.firstElementChild;
    return { row: row, track: track, seq: seq, dir: +row.getAttribute('data-band'), off: 0, w: 0, skew: 0, visible: true };
  });
  function setupBands() {
    bands.forEach(function (b) {
      b.w = b.seq.offsetWidth;
      while (b.track.children.length < 6 && b.track.offsetWidth < vw + 2 * b.w) b.track.appendChild(b.seq.cloneNode(true));
    });
  }
  if (io) {
    var bio = new IntersectionObserver(function (es) { es.forEach(function (e) { e.target._b.visible = e.isIntersecting; }); });
    bands.forEach(function (b) { b.row._b = b; bio.observe(b.row); });
  }

  /* ---------- Plakáty projektů ---------- */

  var cards = $$('[data-card]').map(function (el) {
    return { el: el, inner: $('.pcard__inner', el), win: $('.win', el), stage: $('[data-tilt]', el), rx: 0, ry: 0, vx: 0, vy: 0, tx: 0, ty: 0, hover: false };
  });
  var stacked = window.matchMedia('(min-width: 901px)');
  cards.forEach(function (c) {
    if (!c.stage) return;
    c.stage.addEventListener('pointermove', function (e) {
      if (e.pointerType !== 'mouse') return;
      var r = c.stage.getBoundingClientRect();
      c.tx = ((e.clientY - r.top) / r.height - 0.5) * -12;
      c.ty = ((e.clientX - r.left) / r.width - 0.5) * 16;
      c.hover = true;
    });
    c.stage.addEventListener('pointerleave', function () { c.tx = 0; c.ty = 0; c.hover = false; });
  });

  /* ---------- WebGL: vlna nad náhledem ---------- */

  var ripple = (function () {
    if (reduced || !finePointer) return null;
    var cv = document.createElement('canvas');
    var gl = cv.getContext('webgl', { premultipliedAlpha: false, antialias: false });
    if (!gl) return null;
    var vs = 'attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;uv.y=1.-uv.y;gl_Position=vec4(p,0.,1.);}';
    var fs = [
      'precision mediump float;varying vec2 uv;uniform sampler2D t;uniform vec2 m;uniform float s,time,asp;',
      'void main(){',
      ' vec2 d=uv-m; d.x*=asp; float r=length(d);',
      ' float lens=exp(-r*r*14.)*.12*s;',
      ' vec2 q=m+(uv-m)*(1.-lens);',
      ' float w=sin(r*46.-time*7.)*exp(-r*5.)*.008*s;',
      ' vec2 dir=r>0.? normalize(uv-m):vec2(0.);',
      ' q+=dir*w;',
      ' float ca=.006*s*exp(-r*3.);',
      ' vec4 c=texture2D(t,q);',
      ' c.r=texture2D(t,q+dir*ca).r; c.b=texture2D(t,q-dir*ca).b;',
      ' gl_FragColor=vec4(c.rgb,1.);}'
    ].join('\n');
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
    gl.useProgram(pr);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    var U = { m: gl.getUniformLocation(pr, 'm'), s: gl.getUniformLocation(pr, 's'), time: gl.getUniformLocation(pr, 'time'), asp: gl.getUniformLocation(pr, 'asp') };
    var st = { view: null, img: null, s: 0, target: 0, mx: 0.5, my: 0.5, smx: 0.5, smy: 0.5 };
    function attach(view) {
      var img = $('img', view);
      if (!img || !img.complete || !img.naturalWidth) return;
      if (st.view !== view) {
        view.appendChild(cv);
        st.view = view; st.img = img;
        var r = view.getBoundingClientRect();
        var dpr = Math.min(window.devicePixelRatio || 1, 2);
        cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
        gl.viewport(0, 0, cv.width, cv.height);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        try { gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img); } catch (_) { st.view = null; return; }
        gl.uniform1f(U.asp, r.width / r.height);
      }
      st.target = 1;
    }
    $$('[data-gl]').forEach(function (view) {
      view.addEventListener('pointerenter', function (e) { if (e.pointerType === 'mouse') attach(view); });
      view.addEventListener('pointermove', function (e) {
        var r = view.getBoundingClientRect();
        st.mx = (e.clientX - r.left) / r.width; st.my = (e.clientY - r.top) / r.height;
      });
      view.addEventListener('pointerleave', function () { st.target = 0; });
    });
    return {
      tick: function (t, dt) {
        if (!st.view) return;
        st.s += (st.target - st.s) * Math.min(1, 0.09 * dt);
        st.smx += (st.mx - st.smx) * Math.min(1, 0.18 * dt);
        st.smy += (st.my - st.smy) * Math.min(1, 0.18 * dt);
        cv.classList.toggle('is-on', st.s > 0.02);
        if (st.s < 0.005 && st.target === 0) return;
        gl.uniform2f(U.m, st.smx, st.smy);
        gl.uniform1f(U.s, st.s);
        gl.uniform1f(U.time, t / 1000);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      }
    };
  })();

  /* ---------- WebGL: tekuté barevné pole v hero ---------- */

  var heroGl = (function () {
    var cv = $('[data-hero-gl]');
    if (!cv) return null;
    var gl = cv.getContext('webgl', { antialias: false, alpha: false });
    if (!gl) { cv.remove(); return null; }
    var vs = 'attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
    var fs = [
      'precision highp float;varying vec2 uv;uniform float time,asp,scroll;uniform vec2 m;',
      'vec3 A=vec3(1.,.357,.208);vec3 B=vec3(1.,.824,.247);vec3 C=vec3(1.,.678,.776);',
      'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
      'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
      ' return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}',
      'float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}',
      'void main(){',
      ' vec2 p=uv; p.x*=asp; float t=time*.035;',
      ' vec2 mm=m; mm.x*=asp; float md=length(p-mm);',
      ' vec2 q=vec2(fbm(p*.55+t),fbm(p*.55-t+4.1));',
      ' q+=.5*exp(-md*md*2.2)*(p-mm);',
      ' float f=fbm(p*.7+1.6*q+vec2(1.7,9.2)+scroll*.4);',
      ' float g=fbm(p*.6+1.3*q.yx+vec2(8.3,2.8)-t*.7);',
      ' vec3 c=mix(A,B,smoothstep(.56,.72,f));',
      ' c=mix(c,C,smoothstep(.58,.72,g)*.9);',
      ' c=mix(c,A,smoothstep(.2,.0,uv.y)*.5);',
      ' c+= (h(uv*vec2(1920.,1080.)+time)-.5)*.035;',
      ' gl_FragColor=vec4(c,1.);}'
    ].join('\n');
    function sh(type, src) { var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s); return s; }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { cv.remove(); return null; }
    gl.useProgram(pr);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var U = { time: gl.getUniformLocation(pr, 'time'), asp: gl.getUniformLocation(pr, 'asp'), m: gl.getUniformLocation(pr, 'm'), scroll: gl.getUniformLocation(pr, 'scroll') };
    var st = { visible: true, mx: 0.7, my: 0.4, smx: 0.7, smy: 0.4, drawn: false };
    function size() {
      var r = cv.getBoundingClientRect();
      var scale = 0.5; // pole je měkké — poloviční rozlišení stačí a šetří GPU
      cv.width = Math.max(2, Math.round(r.width * scale));
      cv.height = Math.max(2, Math.round(r.height * scale));
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform1f(U.asp, r.width / r.height);
      st.drawn = false;
    }
    if (io) new IntersectionObserver(function (es) { st.visible = es[0].isIntersecting; }).observe(cv);
    return {
      size: size,
      tick: function (t, dt, y) {
        if (!st.visible || (reduced && st.drawn)) return;
        if (pointer.on) {
          var r = cv.getBoundingClientRect();
          st.mx = (pointer.x - r.left) / r.width; st.my = 1 - (pointer.y - r.top) / r.height;
        }
        st.smx += (st.mx - st.smx) * Math.min(1, 0.04 * dt);
        st.smy += (st.my - st.smy) * Math.min(1, 0.04 * dt);
        gl.uniform1f(U.time, reduced ? 20 : t / 1000);
        gl.uniform2f(U.m, st.smx, st.smy);
        gl.uniform1f(U.scroll, y / vh);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        st.drawn = true;
      }
    };
  })();

  /* ---------- Kinetika písma ---------- */

  var vel = 0;      // vyhlazená rychlost scrollu
  var phase = 0;
  var kinFrame = 0;
  function kinTick(t, dt, y) {
    // šířky písmen se mění, takže polohy se průběžně přeměřují (jen viditelné)
    if (++kinFrame % 20 === 0) kins.forEach(function (k) { if (k.visible) measureKin(k); });
    var amp = clamp(Math.abs(vel) / 26, 0, 1);
    phase += (0.05 + amp * 0.2) * dt;
    var px = pointer.x, py = pointer.y + y;
    // vliv kurzoru jen během pohybu; po zastavení do ~0,4 s odezní
    var idleMs = pointer.on ? performance.now() - (pointer.t || 0) : 1e9;
    var pinf = 1 - smooth(100, 320, idleMs);
    kins.forEach(function (k) {
      if (!k.visible) return;
      var R = k.hero ? vw * 0.16 : vw * 0.09;
      var active = false;
      k.letters.forEach(function (l, i) {
        var g = 0;
        if (pointer.on) {
          var dx = px - l.cx, dy = (py - l.cy) * 1.6;
          g = pinf * Math.exp(-(dx * dx + dy * dy) / (R * R));
        }
        var wave = Math.sin(i * 0.55 - phase * 0.08);
        var twd, twg;
        if (k.hero) {
          // klid: lehké dýchání osy šířky; kurzor písmena nafoukne, okolí se stáhne
          twd = 96 + 29 * g + 14 * amp * wave;
          twg = 280 + 260 * g + 60 * amp;
        } else {
          twd = 100 + 22 * g + 24 * amp * wave;
          twg = k.baseWg + 180 * g + 90 * amp * Math.max(0, wave);
        }
        // pružina: tuhost 0.16, tlumení 0.66 — dosedne do ~0,5 s
        l.vwd = (l.vwd + (twd - l.wd) * 0.16 * dt) * Math.pow(0.66, dt);
        l.vwg = (l.vwg + (twg - l.wg) * 0.16 * dt) * Math.pow(0.66, dt);
        l.wd += l.vwd; l.wg += l.vwg;
        // dosednutí: blízko cíle a bez rychlosti → přesně na klidové hodnoty
        if (Math.abs(twd - l.wd) < 0.25 && Math.abs(l.vwd) < 0.05) { l.wd = twd; l.vwd = 0; }
        if (Math.abs(twg - l.wg) < 0.8 && Math.abs(l.vwg) < 0.2) { l.wg = twg; l.vwg = 0; }
        var wd = clamp(l.wd, 62, 125), wg = clamp(l.wg, 100, 900);
        if (Math.abs(wd - (l.lwd || 0)) > 0.15 || Math.abs(wg - (l.lwg || 0)) > 0.8) {
          l.el.style.setProperty('--wd', wd.toFixed(1));
          l.el.style.setProperty('--wg', wg.toFixed(0));
          l.lwd = wd; l.lwg = wg;
          active = true;
        }
      });
      k.settled = !active;
    });
  }

  /* ---------- Hlavní smyčka ---------- */

  var header = $('[data-header]');
  var photo = $('[data-photo]');
  var photoImg = photo && $('img', photo);
  var lastY = window.scrollY, lastT = 0, headerY = window.scrollY;

  function loop(t) {
    var dt = lastT ? clamp((t - lastT) / 16.67, 0.25, 3) : 1;
    lastT = t;
    var y = window.scrollY;
    var v = y - lastY;
    lastY = y;
    vel += (v - vel) * 0.2;

    if (fields.length) flow(y);

    if (header) {
      header.style.setProperty('--hbg', y > 20 ? 1 : 0);
      if (y > headerY + 6 && y > vh * 0.8) header.classList.add('is-hidden');
      else if (y < headerY - 6 || y < vh * 0.8) header.classList.remove('is-hidden');
      if (Math.abs(y - headerY) > 6) headerY = y;
    }

    if (heroGl) heroGl.tick(t, dt, y);

    if (!reduced) {
      kinTick(t, dt, y);

      bands.forEach(function (b) {
        if (!b.visible || !b.w) return;
        b.off += b.dir * (0.9 + Math.abs(vel) * 0.9) * dt;
        b.off = ((b.off % b.w) - b.w) % b.w;
        var sk = clamp(-vel * 0.35, -14, 14) * b.dir;
        b.skew += (sk - b.skew) * 0.12 * dt;
        b.track.style.transform = 'translate3d(' + b.off.toFixed(1) + 'px,0,0) skewX(' + b.skew.toFixed(2) + 'deg)';
      });

      var stack = stacked.matches;
      cards.forEach(function (c, i) {
        var r = c.el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 1.5) return;
        // skládání: další plakát přijíždí → tenhle couvne do hloubky
        var next = cards[i + 1];
        var p = 0;
        if (stack && next) {
          var nr = next.el.getBoundingClientRect();
          p = clamp(1 - nr.top / vh, 0, 1);
        }
        c.inner.style.transform = p > 0 ? 'translate3d(0,' + (-p * 4).toFixed(2) + 'vh,0) scale(' + (1 - p * 0.08).toFixed(4) + ')' : '';
        c.inner.style.opacity = p > 0 ? (1 - p * 0.55).toFixed(3) : '';
        // náklon okna za kurzorem + jemné vznášení
        var idle = c.hover ? 0 : 1;
        var trx = c.tx + idle * Math.sin(t / 2100 + i) * 1.6;
        var try_ = c.ty + idle * Math.cos(t / 2600 + i) * 2.4;
        c.vx = (c.vx + (trx - c.rx) * 0.08 * dt) * Math.pow(0.78, dt);
        c.vy = (c.vy + (try_ - c.ry) * 0.08 * dt) * Math.pow(0.78, dt);
        c.rx += c.vx; c.ry += c.vy;
        var par = clamp(r.top / vh, -1, 1) * -40;
        c.win.style.setProperty('--rx', c.rx.toFixed(2) + 'deg');
        c.win.style.setProperty('--ry', c.ry.toFixed(2) + 'deg');
        c.win.style.setProperty('--py', (stack ? par : 0).toFixed(1) + 'px');
      });

      if (photoImg) {
        var pr = photo.getBoundingClientRect();
        if (pr.bottom > 0 && pr.top < vh) {
          var q = clamp((vh - pr.top) / (vh + pr.height), 0, 1);
          photoImg.style.transform = 'translate3d(0,' + (-14 + q * 14).toFixed(2) + '%,0)';
        }
      }
    }

    if (ripple) ripple.tick(t, dt);
    requestAnimationFrame(loop);
  }

  /* ---------- E-mail: mailto + kopie ---------- */

  var email = $('[data-email]');
  if (email) {
    var label = $('[data-email-text]', email);
    var original = label.textContent;
    var swap = function (text) {
      email.classList.add('is-swapping');
      setTimeout(function () { label.textContent = text; email.classList.remove('is-swapping'); }, reduced ? 0 : 220);
    };
    email.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !navigator.clipboard) return;
      try {
        navigator.clipboard.writeText(original).then(function () {
          swap(email.getAttribute('data-email-copied') || original);
          setTimeout(function () { swap(original); }, 1900);
        }, function () {});
      } catch (_) { /* schránka nedostupná */ }
    });
  }

  /* ---------- Měření ---------- */

  function measure() {
    vw = window.innerWidth; vh = window.innerHeight;
    measureLetters();
    measureFields();
    setupBands();
    if (heroGl) heroGl.size();
  }
  var rq = 0;
  window.addEventListener('resize', function () { cancelAnimationFrame(rq); rq = requestAnimationFrame(measure); });
  if ('ResizeObserver' in window) new ResizeObserver(function () { cancelAnimationFrame(rq); rq = requestAnimationFrame(measure); }).observe(document.body);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  measure();
  requestAnimationFrame(loop);
})();
