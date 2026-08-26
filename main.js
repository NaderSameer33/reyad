/* ═══════════════════════════════════════════════════════════
   main.js  –  Global init + Task 2 GSAP Animations
   (Hero reveal, counter, 3D tilt cards, scroll-spy navbar)
═══════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Register GSAP plugins ──────────────────────────────── */
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  gsap.defaults({ ease: 'power3.out', duration: 0.8 });
  gsap.ticker.lagSmoothing(500, 33);

  /* ══════════════════════════════════════════════════════════
     NAVBAR
  ══════════════════════════════════════════════════════════ */
  const navbar     = document.getElementById('navbar');
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  /* Scroll: add .scrolled class */
  const navObserver = new IntersectionObserver(
    ([entry]) => navbar.classList.toggle('scrolled', !entry.isIntersecting),
    { rootMargin: '-80px 0px 0px 0px' }
  );
  const heroEl = document.getElementById('hero');
  if (heroEl) navObserver.observe(heroEl);

  /* Hamburger toggle */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileMenu.setAttribute('aria-hidden',  String(!isOpen));
    });

    /* Close menu on link click */
    mobileMenu.querySelectorAll('.mobile-link').forEach((link) => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileMenu.setAttribute('aria-hidden',  'true');
      });
    });
  }

  /* Active nav link on scroll */
  const sections = document.querySelectorAll('section[id]');
  const navLinks  = document.querySelectorAll('.nav-link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });

  sections.forEach((s) => sectionObserver.observe(s));

  /* Navbar entrance */
  gsap.from(navbar, {
    y: -100, opacity: 0, duration: 1,
    ease: 'power3.out', delay: 0.2
  });

  /* ══════════════════════════════════════════════════════════
     HERO SECTION REVEAL
  ══════════════════════════════════════════════════════════ */
  const tl = gsap.timeline({ delay: 0.4 });

  /* 1. Badge */
  tl.to('#hero-badge', {
    opacity: 1, y: 0,
    from: { y: 30 },
    duration: 0.7,
    ease: 'power3.out',
  }, 0);

  /* 2. Headline words – staggered slide-up from clip */
  tl.to('.headline-word', {
    y: 0,
    duration: 1,
    stagger: 0.09,
    ease: 'power4.out',
  }, 0.25);

  /* Separators fade */
  tl.from('.headline-sep', {
    opacity: 0,
    duration: 0.5,
    stagger: 0.07,
  }, 0.7);

  /* 3. Description */
  tl.to('#hero-desc', {
    opacity: 1, y: 0,
    from: { y: 20 },
    duration: 0.8,
    ease: 'power3.out',
  }, 0.85);

  /* 4. CTAs */
  tl.to('#hero-ctas', {
    opacity: 1, y: 0,
    from: { y: 20 },
    duration: 0.7,
    ease: 'power3.out',
  }, 1.05);

  /* 5. Stats block */
  tl.to('#hero-stats', {
    opacity: 1, y: 0,
    from: { y: 20 },
    duration: 0.7,
    ease: 'power3.out',
  }, 1.25);

  /* 6. Scroll indicator */
  tl.to('#scroll-indicator', {
    opacity: 1, duration: 0.6,
  }, 1.6);

  /* ── Animated Counter ─────────────────────────────────── */
  function animateCounters() {
    document.querySelectorAll('.stat-number[data-target]').forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      gsap.to({ val: 0 }, {
        val: target,
        duration: 2.2,
        ease: 'power2.out',
        delay: 1.3,
        onUpdate: function () {
          el.textContent = Math.round(this.targets()[0].val).toLocaleString('ar-EG');
        },
      });
    });
  }
  animateCounters();

  /* ══════════════════════════════════════════════════════════
     SERVICES SECTION  – ScrollTrigger Animations
  ══════════════════════════════════════════════════════════ */

  /* Section tag + title + subtitle */
  gsap.to('#services-tag', {
    opacity: 1, y: 0,
    scrollTrigger: {
      trigger: '#services',
      start: 'top 78%',
    },
    duration: 0.6,
  });
  gsap.from('#services-tag', { y: 25 });

  gsap.to('.section-title', {
    opacity: 1, y: 0,
    scrollTrigger: {
      trigger: '#services',
      start: 'top 74%',
    },
    duration: 0.7, delay: 0.1,
  });
  gsap.from('.section-title', { y: 30 });

  gsap.to('.section-subtitle', {
    opacity: 1, y: 0,
    scrollTrigger: {
      trigger: '#services',
      start: 'top 72%',
    },
    duration: 0.7, delay: 0.2,
  });
  gsap.from('.section-subtitle', { y: 20 });

  /* Cards stagger-in */
  gsap.to('.service-card', {
    opacity: 1,
    y: 0,
    stagger: 0.12,
    duration: 0.75,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '#services-grid',
      start: 'top 80%',
    },
  });
  gsap.set('.service-card', { y: 55 });

  /* CTA bar */
  gsap.to('#services-cta-bar', {
    opacity: 1, y: 0,
    duration: 0.7,
    scrollTrigger: {
      trigger: '#services-cta-bar',
      start: 'top 88%',
    },
  });
  gsap.from('#services-cta-bar', { y: 30 });

  /* ══════════════════════════════════════════════════════════
     3D TILT EFFECT ON SERVICE CARDS
  ══════════════════════════════════════════════════════════ */
  const MAX_TILT    = 12;   // degrees
  const TILT_EASE   = 0.12; // lerp speed
  const SCALE_HOVER = 1.03;

  document.querySelectorAll('.tilt-card').forEach((card) => {
    let targetRX = 0, targetRY = 0;
    let currentRX = 0, currentRY = 0;
    let rafId = null;
    let isHovered = false;

    /* Set 3D perspective on parent */
    card.style.perspective = '900px';

    function lerpTick() {
      if (!isHovered && Math.abs(currentRX) < 0.05 && Math.abs(currentRY) < 0.05) {
        currentRX = 0; currentRY = 0;
        gsap.set(card, { rotationX: 0, rotationY: 0 });
        cancelAnimationFrame(rafId);
        rafId = null;
        return;
      }
      currentRX += (targetRX - currentRX) * TILT_EASE;
      currentRY += (targetRY - currentRY) * TILT_EASE;
      gsap.set(card, { rotationX: currentRX, rotationY: currentRY, transformPerspective: 900 });
      rafId = requestAnimationFrame(lerpTick);
    }

    card.addEventListener('mouseenter', () => {
      isHovered = true;
      gsap.to(card, { scale: SCALE_HOVER, duration: 0.4, ease: 'power2.out', z: 20, transformPerspective: 900 });
      if (!rafId) rafId = requestAnimationFrame(lerpTick);
    });

    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const normX = (e.clientX - cx) / (rect.width  / 2); // -1 to 1
      const normY = (e.clientY - cy) / (rect.height / 2); // -1 to 1

      // RTL: flip X axis
      targetRY =  normX * MAX_TILT;
      targetRX = -normY * MAX_TILT;

      /* Spotlight glow follows mouse */
      const glowEl = card.querySelector('.card-glow');
      if (glowEl) {
        const px = ((e.clientX - rect.left) / rect.width)  * 100;
        const py = ((e.clientY - rect.top)  / rect.height) * 100;
        glowEl.style.background = glowEl.style.background.replace(
          /ellipse at \d+% \d+%/,
          `ellipse at ${px}% ${py}%`
        );
      }
    });

    card.addEventListener('mouseleave', () => {
      isHovered = false;
      targetRX  = 0;
      targetRY  = 0;
      gsap.to(card, { scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.5)', z: 0 });
      if (!rafId) rafId = requestAnimationFrame(lerpTick);
    });
  });

  /* ══════════════════════════════════════════════════════════
     SMOOTH SCROLL FOR ANCHOR LINKS
  ══════════════════════════════════════════════════════════ */
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      gsap.to(window, {
        scrollTo: { y: target, offsetY: 78 },
        duration: 1.2,
        ease: 'power3.inOut',
      });
    });
  });

  /* ══════════════════════════════════════════════════════════
     TASK 3 – INTERSECTION OBSERVER  (io-reveal system)
     Pure Vanilla JS — no GSAP dependency
  ══════════════════════════════════════════════════════════ */

  /**
   * Single shared IntersectionObserver that watches every .io-reveal element.
   * When an element crosses into the viewport (threshold 15%), we add
   * .is-visible which triggers the CSS transition.
   * We then unobserve so the animation runs only once.
   */
  const ioRevealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const el = entry.target;

        /* Fire the reveal */
        el.classList.add('is-visible');

        /* Stop watching — animate only once */
        observer.unobserve(el);
      });
    },
    {
      root:       null,          // viewport
      rootMargin: '0px 0px -10% 0px',  // trigger when 10% above bottom edge
      threshold:  0.12,          // element must be 12% visible
    }
  );

  /* Observe every element that carries the io-reveal class */
  function initIOReveal() {
    document.querySelectorAll('.io-reveal').forEach((el) => {
      ioRevealObserver.observe(el);
    });
  }

  /* ── Article image subtle Ken Burns parallax on scroll ─── */
  function initArticleParallax() {
    const articleImgs = document.querySelectorAll('.article-img');
    if (!articleImgs.length) return;

    const imgObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          /* Once visible, bind scroll to subtle Y shift */
          const img = entry.target;
          const wrapper = img.closest('.article-img-wrap');
          if (!wrapper) return;

          function onScroll() {
            const rect    = wrapper.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;
            if (!visible) return;
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            const shift    = (progress - 0.5) * 20; // ±10px
            img.style.transform = `scale(1.06) translateY(${shift}px)`;
          }

          /* Only attach if not already hovered (hover uses own transform) */
          wrapper.addEventListener('mouseenter', () => {
            window.removeEventListener('scroll', onScroll, { passive: true });
          });
          wrapper.addEventListener('mouseleave', () => {
            window.addEventListener('scroll', onScroll, { passive: true });
          });

          window.addEventListener('scroll', onScroll, { passive: true });
          imgObserver.unobserve(img);
        }
      });
    }, { threshold: 0.1 });

    articleImgs.forEach((img) => imgObserver.observe(img));
  }

  /* ── Numbers in article highlights count up when visible ─ */
  function initArticleCounters() {
    const numberPattern = /\d+/g;

    document.querySelectorAll('.article-highlights li strong').forEach((el) => {
      const text = el.textContent;
      const nums = text.match(numberPattern);
      if (!nums) return;

      const counterObs = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          obs.unobserve(entry.target);

          // Animate each number found
          let animated = text;
          nums.forEach((numStr) => {
            const target = parseInt(numStr, 10);
            const obj    = { val: 0 };
            gsap.to(obj, {
              val: target,
              duration: 1.5,
              ease: 'power2.out',
              delay: 0.3,
              onUpdate() {
                animated = animated.replace(numStr, Math.round(obj.val));
                el.textContent = animated;
              },
            });
          });
        });
      }, { threshold: 0.5 });

      counterObs.observe(el);
    });
  }

  /* ── Init all Task 3 features ─────────────────────────── */
  function initTask3() {
    initIOReveal();
    initArticleParallax();
    initArticleCounters();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTask3);
  } else {
    initTask3();
  }

  /* ══════════════════════════════════════════════════════════
     PAGE LOAD BODY REVEAL
  ══════════════════════════════════════════════════════════ */
  gsap.from(document.body, { opacity: 0, duration: 1, ease: 'power2.inOut' });

})();

