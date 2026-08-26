/* ═══════════════════════════════════════════════════════════
   cursor.js  –  Refined "Corporate Zen" Smooth Custom Cursor
   (Tiny precision dot + soft translucent trailing ring)
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;
  let isHovered = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    // Instant dot movement
    dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

    if (dot.style.opacity === '0' || dot.style.opacity === '') {
      dot.style.opacity = '1';
      ring.style.opacity = '1';
    }
  }, { passive: true });

  // Smooth trailing ring loop
  function animate() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;

    ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);

  // Soft hover state
  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (target.closest('a, button, [role="button"], input, select, textarea, .service-card, .article-card, .tilt-card')) {
      if (!isHovered) {
        isHovered = true;
        ring.classList.add('cursor-hover');
      }
    } else {
      if (isHovered) {
        isHovered = false;
        ring.classList.remove('cursor-hover');
      }
    }
  }, { passive: true });

})();