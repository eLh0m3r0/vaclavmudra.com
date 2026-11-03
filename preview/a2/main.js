/* vaclavmudra.com — varianta A2 (Polární záře) — varianta A „Tmavá, filmová"
   Bez knihoven: WebGL světelné pole (fragment shader), připnutá horizontální
   galerie s 3D náklonem, marquee reagující na rychlost scrollu, světelné kužely.
   Všechno má cestu pro prefers-reduced-motion a funguje i bez JS (obsah). */
(function () {
  'use strict';

  var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
  var reduced = mq.matches;
  var fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };
  var clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };

  var vw = innerWidth, vh = innerHeight;
  var mouse = { x: 0.62, y: 0.4, tx: 0.62, ty: 0.4, px: vw / 2, py: vh / 2 };

  /* ---------- Světelné pole (WebGL) ---------- */

  var canvas = $('[data-field]');
  var gl = null, prog = null, U = {}, fieldScale = 0.5, fieldIntensity = 1, fieldTarget = 1;

  var VERT = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  var FRAG = [
    'precision highp float;',
    'uniform vec2 r;uniform float t;uniform vec2 m;uniform float k;uniform vec4 z[8];',
    'float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}',
    'float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);',
    ' return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}',
    'float fbm(vec2 p){float v=0.,a=.5;mat2 R=mat2(.8,.6,-.6,.8);for(int i=0;i<5;i++){v+=a*n(p);p=R*p*2.02;a*=.5;}return v;}',
    'void main(){',
    ' vec2 uv=gl_FragCoord.xy/r;float as=r.x/r.y;',
    ' vec3 bg=vec3(.027,.039,.071);',
    ' vec3 deep=vec3(.06,.11,.27);',
    ' vec3 cool=vec3(.52,.7,1.);',
    ' vec3 warm=vec3(1.,.64,.38);',
    ' vec2 p=vec2(uv.x*as,uv.y);vec2 mp=vec2(m.x*as,m.y);',
    ' float tt=t*.05;',
    ' vec3 c=bg+deep*.25*smoothstep(.0,1.,uv.y);',
    ' vec3 teal=vec3(.35,.95,.85);',
    ' for(int i=0;i<4;i++){float fi=float(i);',
    '  float x=p.x*(.75+fi*.22)+fi*1.9;',
    '  float y0=.42+fi*.07+.13*sin(x*1.15+tt*(1.+fi*.35))+.16*(fbm(vec2(x*.7,tt*.8+fi*3.1))-.5);',
    '  float dx=p.x-mp.x;y0+=(mp.y-y0)*.28*exp(-dx*dx*6.);',
    '  float dy=p.y-y0;',
    '  float body=smoothstep(-.015,.01,dy)*exp(-max(dy,0.)*(2.6+fi*.8));',
    '  float edge=exp(-dy*dy*900.);',
    '  float rays=.45+.55*fbm(vec2(x*9.,tt*1.6+fi*7.));',
    '  vec3 col=i==1?warm:mix(cool,teal,.35+.3*sin(fi*1.7+tt));',
    '  c+=col*(body*.42+edge*.5)*rays*(1.-fi*.13);}',
    ' float d=length(p-mp);c+=mix(warm,cool,.5)*exp(-d*d*5.)*.12;',
    ' c*=(.38+.62*smoothstep(.02,.62,uv.y))*(.5+.5*smoothstep(1.,.84,uv.y));',
    ' float v=smoothstep(1.4,.2,length((uv-vec2(.55,.62))*vec2(1.,1.2)));',
    ' c=mix(bg,c,v*k*k);',
    ' float calm=0.;',                                    // klidné zóny pod textem
    ' for(int i=0;i<8;i++){vec4 b=z[i];if(b.z<=b.x)continue;',
    '  vec2 px=gl_FragCoord.xy;vec2 q2=max(max(b.xy-px,px-b.zw),0.);',
    '  calm=max(calm,1.-smoothstep(.02*r.y,.14*r.y,length(q2)));}',
    ' c=mix(c,bg+(c-bg)*.07,calm);',
    ' c+=(h(gl_FragCoord.xy+t)-.5)/255.*2.;',
    ' gl_FragColor=vec4(c,1.);',
    '}'
  ].join('\n');

  function initField() {
    if (!canvas) return false;
    try { gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' }); } catch (_) { gl = null; }
    if (!gl) return false;
    function sh(type, src) {
      var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
      return s;
    }
    try {
      prog = gl.createProgram();
      gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error('link');
    } catch (e) { gl = null; return false; }
    gl.useProgram(prog);
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    ['r', 't', 'm', 'k', 'z'].forEach(function (u) { U[u] = gl.getUniformLocation(prog, u); });
    sizeField();
    canvas.classList.add('is-on');
    return true;
  }
  function sizeField() {
    if (!gl) return;
    // pole je měkké — stačí poloviční rozlišení, prohlížeč ho roztáhne
    var s = Math.min(window.devicePixelRatio || 1, 1.5) * fieldScale;
    var w = Math.max(2, Math.round(vw * s)), h = Math.max(2, Math.round(vh * s));
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
  }
  // obdélníky textových bloků v pixelech plátna (počátek vlevo dole), s okrajem
  var calmEls = null, calmBuf = new Float32Array(32);
  function calmRects() {
    if (!calmEls) calmEls = $$('[data-calm]').slice(0, 8);
    var s = canvas.width / vw, H = canvas.height, pad = 18;
    calmBuf.fill(0);
    calmEls.forEach(function (el, i) {
      var r = el.getBoundingClientRect();
      if (r.bottom < -100 || r.top > vh + 100 || !r.width) return;
      calmBuf[i * 4] = (r.left - pad) * s;
      calmBuf[i * 4 + 1] = H - (r.bottom + pad) * s;
      calmBuf[i * 4 + 2] = (r.right + pad) * s;
      calmBuf[i * 4 + 3] = H - (r.top - pad) * s;
    });
    return calmBuf;
  }
  function drawField(t) {
    if (!gl) return;
    gl.uniform2f(U.r, canvas.width, canvas.height);
    gl.uniform1f(U.t, t / 1000);
    gl.uniform2f(U.m, mouse.x, 1 - mouse.y);
    gl.uniform1f(U.k, fieldIntensity);
    gl.uniform4fv(U.z, calmRects());
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  /* ---------- Odhalování ---------- */

  var io = 'IntersectionObserver' in window;
  var reveals = $$('[data-reveal]');
  if (io && !reduced) {
    var watched = [];
    var rio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        watched.forEach(function (w) { if (w.t === e.target) w.el.classList.add('is-in'); });
        rio.unobserve(e.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(function (el) {
      // maskovaný nadpis má clip-path na nulu, IO ho nevidí — sleduje se rodič
      var t = el.getAttribute('data-reveal') === 'mask' ? el.parentElement : el;
      watched.push({ el: el, t: t });
      rio.observe(t);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Navigace ---------- */

  var header = $('[data-header]');
  var navLinks = $$('.nav__list a');
  if (io) {
    var sio = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle('is-current', a.getAttribute('href') === '#' + e.target.id); });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(function (s) { sio.observe(s); });
  }

  /* ---------- Světelné kužely pod kurzorem ---------- */

  if (fine) {
    $$('[data-spot]').forEach(function (el) {
      el.addEventListener('pointermove', function (e) {
        var r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
      el.addEventListener('pointerleave', function () {
        el.style.setProperty('--mx', '-999px');
        el.style.setProperty('--my', '-999px');
      });
    });
  }

  /* ---------- Pásy ---------- */

  var bands = $$('[data-band]').map(function (row) {
    var track = row.firstElementChild, seq = track.firstElementChild;
    return { row: row, track: track, seq: seq, dir: +row.getAttribute('data-band') || -1, off: 0, w: 0 };
  });
  function setupBands() {
    bands.forEach(function (b) {
      b.w = b.seq.offsetWidth;
      if (!b.w) return;
      while (b.track.children.length < 6 && b.track.offsetWidth < vw + 2 * b.w) b.track.appendChild(b.seq.cloneNode(true));
    });
  }

  /* ---------- Projekty: připnutá galerie ---------- */

  var work = $('[data-work]');
  var track = work && $('[data-track]', work);
  var cards = $$('[data-card]').map(function (el) {
    return { el: el, tilt: $('[data-tilt]', el), img: $('img', el), view: $('.window__view', el),
      name: $('.card__name', el).textContent.trim(), rx: 0, ry: 0, prx: 0, pry: 0, hover: false };
  });
  var countEl = $('[data-count]'), barEl = $('[data-bar]'), nameNow = $('[data-name-now]');
  var pinned = false, workTop = 0, workH = 0, travel = 0, lastIdx = -1;

  function canPin() { return !reduced && fine && vw >= 900 && vh >= 560; }
  function setupWork() {
    if (!work || !track) return;
    pinned = canPin();
    work.classList.toggle('is-pinned', pinned);
    if (!pinned) { work.style.height = ''; track.style.transform = ''; return; }
    travel = Math.max(0, track.scrollWidth - vw);
    work.style.height = (travel + vh) + 'px';
    workTop = work.getBoundingClientRect().top + scrollY;
    workH = travel + vh;
  }

  cards.forEach(function (c) {
    if (!fine) return;
    c.el.addEventListener('pointermove', function (e) {
      var r = c.tilt.getBoundingClientRect();
      c.pry = ((e.clientX - r.left) / r.width - 0.5) * 10;
      c.prx = -((e.clientY - r.top) / r.height - 0.5) * 8;
      c.hover = true;
    });
    c.el.addEventListener('pointerleave', function () { c.prx = 0; c.pry = 0; c.hover = false; });
  });

  // klávesnice: karta s fokusem se v připnuté galerii vždy dostane do středu
  cards.forEach(function (c) {
    c.el.addEventListener('focusin', function () {
      if (!pinned) return;
      // prohlížeč by jinak posunul scrollLeft připnutého kontejneru
      var pin = track.parentElement; pin.scrollLeft = 0;
      requestAnimationFrame(function () { pin.scrollLeft = 0; });
      var x = c.el.offsetLeft + c.el.offsetWidth / 2 - vw / 2;
      var p = clamp(x / Math.max(1, travel), 0, 1);
      scrollTo({ top: workTop + p * (workH - vh), behavior: reduced ? 'auto' : 'smooth' });
    });
  });

  function updateWork(y) {
    if (!work) return;
    if (pinned) {
      var p = clamp((y - workTop) / Math.max(1, workH - vh), 0, 1);
      track.style.transform = 'translate3d(' + (-p * travel).toFixed(1) + 'px,0,0)';
      if (barEl) barEl.style.setProperty('--p', p.toFixed(4));
    }
    // hloubka: karty mimo střed se natáčejí k divákovi, obrázek se posouvá proti pohybu
    var cx = vw / 2, best = 0, bestD = 1e9;
    cards.forEach(function (c, i) {
      var r = c.el.getBoundingClientRect();
      if (r.right < -200 || r.left > vw + 200) return;
      var off = clamp(((r.left + r.width / 2) - cx) / vw, -1, 1);
      if (Math.abs(off) < bestD) { bestD = Math.abs(off); best = i; }
      var sry = pinned ? -off * 16 : 0;
      c.ry = lerp(c.ry, sry + c.pry, 0.12);
      c.rx = lerp(c.rx, c.prx, 0.12);
      c.tilt.style.transform = 'rotateY(' + c.ry.toFixed(2) + 'deg) rotateX(' + c.rx.toFixed(2) + 'deg)';
      c.view.style.setProperty('--px', (off * -34 + c.pry * -1.6).toFixed(1) + 'px');
      c.view.style.setProperty('--py', (c.prx * 1.6).toFixed(1) + 'px');
      c.view.style.setProperty('--sheen', (-30 + (off + 1) * 50 + c.pry * 4).toFixed(1) + '%');
    });
    if (best !== lastIdx && pinned) {
      lastIdx = best;
      if (countEl) countEl.textContent = String(best + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
      if (nameNow) nameNow.textContent = cards[best].name;
    }
  }

  /* ---------- Hero, historie, fotka ---------- */

  var nameEl = $('[data-name]');
  var hero = $('.hero');
  var hist = $('[data-history]');
  var histLine = hist && $('.history__line', hist);
  var photo = $('[data-parallax]');
  var photoImg = photo && $('img', photo);
  var contact = $('.section--contact');

  /* ---------- Jedna smyčka ---------- */

  var lastY = scrollY, smoothV = 0, running = false, lastT = 0;

  function frame(t) {
    running = false;
    var y = scrollY;
    var v = y - lastY; lastY = y;
    smoothV = lerp(smoothV, v, 0.1);
    var dt = lastT ? Math.min((t - lastT) / 16.67, 3) : 1; lastT = t;

    mouse.x = lerp(mouse.x, mouse.tx, 0.05);
    mouse.y = lerp(mouse.y, mouse.ty, 0.05);

    if (header) {
      header.classList.toggle('is-scrolled', y > 10);
      if (v > 3 && y > vh * 0.7) header.classList.add('is-hidden');
      else if (v < -3 || y < vh * 0.7) header.classList.remove('is-hidden');
    }

    // hero: jméno se při odjezdu zúží a pole ztmavne
    var hh = hero ? hero.offsetHeight : vh;
    var hp = clamp(y / hh, 0, 1);
    if (nameEl && hp < 1) {
      nameEl.style.setProperty('--wdth', (115 - hp * 45).toFixed(1) + '%');
      nameEl.style.transform = 'translate3d(0,' + (hp * -60).toFixed(1) + 'px,0)';
      nameEl.style.opacity = (1 - hp * 0.9).toFixed(3);
    }
    var cr = contact ? contact.getBoundingClientRect() : null;
    var cp = cr ? clamp((vh - cr.top) / vh, 0, 1) : 0;
    fieldTarget = Math.max(1 - hp * 0.86, 0.14 + cp * 0.62);
    fieldIntensity = lerp(fieldIntensity, fieldTarget, 0.08);

    bands.forEach(function (b) {
      if (!b.w) return;
      b.off += b.dir * (0.6 + Math.abs(smoothV) * 0.9) * dt;
      var o = b.off % b.w; if (o > 0) o -= b.w; b.off = o;
      b.track.style.transform = 'translate3d(' + o.toFixed(1) + 'px,0,0)';
    });

    updateWork(y);

    if (histLine) {
      var r = hist.getBoundingClientRect();
      histLine.style.setProperty('--p', clamp((vh * 0.75 - r.top) / r.height, 0, 1).toFixed(4));
    }
    if (photoImg) {
      var pr = photo.getBoundingClientRect();
      if (pr.bottom > 0 && pr.top < vh) {
        var q = clamp((vh - pr.top) / (vh + pr.height), 0, 1);
        photoImg.style.transform = 'translate3d(0,' + (-14 + q * 14).toFixed(2) + '%,0) scale(1.02)';
      }
    }

    drawField(t);
    if (!document.hidden) schedule();
  }
  function schedule() { if (!running) { running = true; requestAnimationFrame(frame); } }

  /* ---------- Vstupy ---------- */

  if (fine) {
    addEventListener('pointermove', function (e) {
      mouse.tx = e.clientX / vw; mouse.ty = e.clientY / vh;
    }, { passive: true });
  }
  document.addEventListener('visibilitychange', function () { if (!document.hidden && !reduced) schedule(); });

  var email = $('[data-email]');
  if (email) {
    var label = $('[data-email-text]', email), original = label.textContent;
    var swap = function (text) {
      email.classList.add('is-swapping');
      setTimeout(function () { label.textContent = text; email.classList.remove('is-swapping'); }, reduced ? 0 : 220);
    };
    email.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || !navigator.clipboard) return;
      try {
        navigator.clipboard.writeText(original.trim()).then(function () {
          swap(email.getAttribute('data-email-copied') || original);
          setTimeout(function () { swap(original); }, 1900);
        }, function () {});
      } catch (_) {}
    });
  }

  function measure() {
    vw = innerWidth; vh = innerHeight;
    sizeField();
    setupBands();
    setupWork();
    if (reduced) { drawField(4000); updateWork(scrollY); }
  }
  var rq = 0;
  addEventListener('resize', function () { cancelAnimationFrame(rq); rq = requestAnimationFrame(measure); });
  addEventListener('load', measure);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);

  initField();
  measure();
  if (reduced) {
    // statická stránka: jeden snímek pole, žádná smyčka; při scrollu jen hlavička
    // pole jen za hero, jako statický obraz
    if (canvas) { canvas.style.position = 'absolute'; canvas.style.height = (hero ? hero.offsetHeight : vh) + 'px'; }
    fieldIntensity = 1; sizeField(); drawField(4000);
    addEventListener('scroll', function () { if (header) header.classList.toggle('is-scrolled', scrollY > 10); }, { passive: true });
  } else {
    schedule();
  }
})();
