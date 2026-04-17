/* ============================================================
   KONING ZOLLAR LLP — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Sticky Nav ──────────────────────────────────────────
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (window.scrollY > 60) {
      nav?.classList.add('scrolled');
    } else {
      nav?.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ── Mobile Menu ──────────────────────────────────────────
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');
  hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav?.classList.toggle('open');
    document.body.style.overflow = mobileNav?.classList.contains('open') ? 'hidden' : '';
  });
  mobileNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger?.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ── Scroll Animations (Intersection Observer) ────────────
  const animateEls = document.querySelectorAll('.animate');
  if (animateEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    animateEls.forEach(el => observer.observe(el));
  }

  // ── Animated Counters ────────────────────────────────────
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(el => counterObserver.observe(el));
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const duration = 1800;
    const start = performance.now();
    const update = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * target);
      el.textContent = prefix + current + suffix;
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  // ── Testimonial Rotation ─────────────────────────────────
  const slides = document.querySelectorAll('.testimonial-slide');
  const dots   = document.querySelectorAll('.testimonial-dot');
  if (slides.length > 1) {
    let current = 0;
    let timer;

    const showSlide = (index) => {
      slides[current].classList.remove('active');
      dots[current]?.classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current]?.classList.add('active');
    };

    const startTimer = () => {
      clearInterval(timer);
      timer = setInterval(() => showSlide(current + 1), 5000);
    };

    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        startTimer();
      });
    });

    startTimer();
  }

  // ── Active Nav Link ──────────────────────────────────────
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ── Smooth Scroll ────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
