/* ═══════════════════════════════════════════════════════════
   background.js  –  FIXED 3D Mouse-Move Parallax Background
   Reliable cross-browser approach: individual layer transforms
   + Canvas star-field & particles — NO scene-level rotation
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ══════════════════════════════════════════════════════════
     CANVAS STAR-FIELD & PARTICLES
  ══════════════════════════════════════════════════════════ */
  const canvas = document.createElement('canvas');
  canvas.id    = 'starfield-canvas';
  canvas.setAttribute('aria-hidden', 'true');
  Object.assign(canvas.style, {
    position:      'fixed',
    inset:         '0',
    width:         '100%',
    height:        '100%',
    pointerEvents: 'none',
    zIndex:        '1',
    opacity:       '0',
  });

  const parallaxBg = document.getElementById('parallax-bg');
  document.body.insertBefore(canvas, parallaxBg || document.body.firstChild);

  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas, { passive: true });

  /* ── Static twinkling stars ─────────────────────────────── */
  const STAR_COUNT = 200;
  const stars = Array.from({ length: STAR_COUNT }, () => ({
    x:       Math.random(),   // 0–1 of canvas width
    y:       Math.random(),   // 0–1 of canvas height
    r:       0.3 + Math.random() * 1.0,
    opacity: 0.06 + Math.random() * 0.45,
    phase:   Math.random() * Math.PI * 2,
    speed:   0.004 + Math.random() * 0.012,
    depth:   0.01 + Math.random() * 0.06, // parallax depth (far=slow)
  }));



  /* ── 3D Perspective Grid ────────────────────────────────── */
  const GRID = {
    cols:  14,
    rows:  10,
    cellW: 160,
    cellH: 160,
    fov:   520,
    depth: 700,
  };

  function project3D(x3, y3, z3) {
    const s = GRID.fov / (GRID.fov + z3);
    return {
      x: canvas.width  / 2 + x3 * s,
      y: canvas.height / 2 + y3 * s,
      s,
    };
  }

  function drawGrid(mx, my, t) {
    const tiltX  =  my * 18;   // vertical lean
    const tiltY  = -mx * 12;   // horizontal pan
    const scrollZ = (t * 55) % GRID.cellH;
    const W = GRID.cols * GRID.cellW;
    const H = GRID.rows * GRID.cellH;

    ctx.save();
    ctx.strokeStyle = '#0D9488';

    for (let r = 0; r <= GRID.rows; r++) {
      ctx.beginPath();
      let first = true;
      for (let c = 0; c <= GRID.cols; c++) {
        const x3 = -W / 2 + c * GRID.cellW + tiltY;
        const y3 = -H / 2 + r * GRID.cellH + tiltX;
        const z3 = -GRID.depth / 2
                   + ((r / GRID.rows) * GRID.depth + scrollZ) % GRID.depth;
        const p = project3D(x3, y3, z3);
        const alpha = Math.max(0, Math.min(0.07, p.s * 0.06));
        ctx.globalAlpha = alpha;
        ctx.lineWidth   = p.s * 0.6;
        first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        first = false;
      }
      ctx.stroke();
    }

    for (let c = 0; c <= GRID.cols; c++) {
      ctx.beginPath();
      let first = true;
      for (let r = 0; r <= GRID.rows; r++) {
        const x3 = -W / 2 + c * GRID.cellW + tiltY;
        const y3 = -H / 2 + r * GRID.cellH + tiltX;
        const z3 = -GRID.depth / 2
                   + ((r / GRID.rows) * GRID.depth + scrollZ) % GRID.depth;
        const p = project3D(x3, y3, z3);
        const alpha = Math.max(0, Math.min(0.07, p.s * 0.06));
        ctx.globalAlpha = alpha;
        ctx.lineWidth   = p.s * 0.6;
        first ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y);
        first = false;
      }
      ctx.stroke();
    }
    ctx.restore();
  }

  /* ══════════════════════════════════════════════════════════
     MOUSE STATE  (window-level — always fires)
  ══════════════════════════════════════════════════════════ */
  let rawX = 0, rawY = 0;           // raw normalised -1..+1
  let smX  = 0, smY  = 0;           // smoothed for canvas
  let hasMouse = false;
  let driftAngle = 0;

  window.addEventListener('mousemove', (e) => {
    hasMouse = true;
    rawX = (e.clientX / window.innerWidth  - 0.5) * 2;
    rawY = (e.clientY / window.innerHeight - 0.5) * 2;
  }, { passive: true });

  /* ══════════════════════════════════════════════════════════
     CANVAS RENDER LOOP
  ══════════════════════════════════════════════════════════ */
  let lastRaf = 0;

  function render(ts) {
    const t = ts / 1000;

    /* Smooth mouse / idle drift for canvas */
    if (hasMouse) {
      smX += (rawX - smX) * 0.04;
      smY += (rawY - smY) * 0.04;
    } else {
      driftAngle += 0.0015;
      smX += (Math.sin(driftAngle) * 0.2 - smX) * 0.015;
      smY += (Math.cos(driftAngle * 0.7) * 0.15 - smY) * 0.015;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    /* Stars */
    for (const s of stars) {
      const pulse = s.opacity * (0.6 + 0.4 * Math.sin(t * s.speed * 6 + s.phase));
      const sx = (s.x * canvas.width  + smX * s.depth * canvas.width  * 0.5 + canvas.width)  % canvas.width;
      const sy = (s.y * canvas.height + smY * s.depth * canvas.height * 0.5 + canvas.height) % canvas.height;
      ctx.beginPath();
      ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226,232,240,${pulse.toFixed(3)})`;
      ctx.fill();
    }

    /* 3D Grid */
    drawGrid(smX, smY, t);



    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);

  /* ══════════════════════════════════════════════════════════
     GSAP TICKER — orbs & SVG shape parallax (reliable X/Y)
     NO rotationX/Y on fixed elements (browser compat issue)
  ══════════════════════════════════════════════════════════ */

  /* Layer config:  depth sign controls direction
     positive → moves WITH mouse (foreground feel)
     negative → moves AGAINST mouse (depth feel)       */
  const LAYERS = [
    { sel: '#orb1',          dx: -0.030, dy: -0.020 },
    { sel: '#orb2',          dx:  0.018, dy:  0.025 },
    { sel: '#orb3',          dx: -0.042, dy:  0.035 },
    { sel: '#orb4',          dx:  0.055, dy: -0.040 },
    { sel: '#orb5',          dx: -0.028, dy:  0.022 },
    { sel: '#shape-hex',     dx: -0.075, dy: -0.060 },
    { sel: '#shape-tri',     dx:  0.065, dy:  0.050 },
    { sel: '#shape-diamond', dx: -0.048, dy:  0.038 },
    { sel: '#shape-circle',  dx:  0.085, dy:  0     },
    { sel: '#shape-line',    dx:  0,     dy: -0.028 },
    { sel: '#grid-svg',      dx: -0.008, dy: -0.006 },
  ];

  const MAX_PX = 260; // max travel in pixels

  const layers = LAYERS
    .map(cfg => ({ ...cfg, el: document.querySelector(cfg.sel) }))
    .filter(cfg => cfg.el);

  // Smoothed values for GSAP layers (separate from canvas smooth)
  let gsmX = 0, gsmY = 0;
  const G_LERP = 0.06;

  gsap.ticker.add(() => {
    if (hasMouse) {
      gsmX += (rawX - gsmX) * G_LERP;
      gsmY += (rawY - gsmY) * G_LERP;
    } else {
      gsmX += (smX - gsmX) * 0.05;
      gsmY += (smY - gsmY) * 0.05;
    }

    layers.forEach(({ el, dx, dy }) => {
      gsap.set(el, {
        x: gsmX * dx * MAX_PX,
        y: gsmY * dy * MAX_PX,
      });
    });
  });

  /* ══════════════════════════════════════════════════════════
     ENTRANCE ANIMATIONS
  ══════════════════════════════════════════════════════════ */
  function init() {
    /* Canvas fade in */
    gsap.to(canvas, { opacity: 0.7, duration: 2.5, ease: 'power2.inOut' });

    /* Orbs */
    const orbIds = ['#orb1','#orb2','#orb3','#orb4','#orb5'];
    gsap.set(orbIds, { opacity: 0, scale: 0.4 });
    gsap.to(orbIds, { opacity: 1, scale: 1, duration: 3, stagger: 0.3, ease: 'power3.out' });

    /* SVG shape stroke draw-in */
    ['#shape-hex','#shape-tri','#shape-diamond','#shape-circle'].forEach(id => {
      const el = document.querySelector(id);
      if (!el || !el.getTotalLength) return;
      const len = el.getTotalLength();
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len, opacity: 0.1 });
      gsap.to(el, { strokeDashoffset: 0, duration: 2.5, delay: 1, ease: 'power2.inOut' });
    });

    /* Ambient orb pulse */
    [
      { id: '#orb1', dur: 9,  s: 1.09 },
      { id: '#orb2', dur: 11, s: 1.13 },
      { id: '#orb3', dur: 7,  s: 1.07 },
      { id: '#orb4', dur: 13, s: 1.16 },
      { id: '#orb5', dur: 8,  s: 1.10 },
    ].forEach(({ id, dur, s }, i) => {
      const node = document.querySelector(id);
      if (!node) return;
      gsap.to(node, { scale: s, duration: dur, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: i * 1.2 });
    });
  }

  document.readyState === 'loading'
    ? document.addEventListener('DOMContentLoaded', init)
    : init();

})();
