/**
 * VELARI PRIVÉ — MASTER APPLICATION CONTROLLER
 * Smooth interactions, header scroll states, navigation & micro-animations
 */

(function () {
  // HEADER SCROLL STATE
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  // MOBILE MENU TOGGLE
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mobileDrawer = document.getElementById('mobileMenuDrawer');
  const mobileBackdrop = document.getElementById('mobileMenuBackdrop');
  const closeMobileMenu = document.getElementById('closeMobileMenuBtn');

  function openMobileNav() {
    mobileDrawer?.classList.add('active');
    mobileBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileDrawer?.classList.remove('active');
    mobileBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileNav);
  closeMobileMenu?.addEventListener('click', closeMobileNav);
  mobileBackdrop?.addEventListener('click', closeMobileNav);

  // Close mobile nav on link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMobileNav);
  });

  // SMOOTH SCROLL WITH OFFSET
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 90;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // INTERSECTION OBSERVER FOR EDITORIAL REVEALS
  const revealElements = document.querySelectorAll('.editorial-reveal, .bento-card, .active-complex-card, .ritual-step-card, .timeline-card, .object-card');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  // SUBTLE HERO PARALLAX TILT
  const heroStage = document.querySelector('.hero-visual-stage');
  const heroImg = document.querySelector('.hero-product-img');

  if (heroStage && heroImg && window.innerWidth > 1024) {
    heroStage.addEventListener('mousemove', (e) => {
      const rect = heroStage.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      const tiltX = (y / (rect.height / 2)) * -6;
      const tiltY = (x / (rect.width / 2)) * 6;
      heroImg.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    heroStage.addEventListener('mouseleave', () => {
      heroImg.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }
})();
