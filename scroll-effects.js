const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = [...document.querySelectorAll('main > section, main > header, footer')];
const mobileNavToggle = document.querySelector('[data-mobile-nav-toggle]');
const mobileNavPanel = document.querySelector('[data-mobile-nav-panel]');

document.documentElement.classList.add('js-scroll-effects');

if (mobileNavToggle && mobileNavPanel) {
  const openIcon = mobileNavToggle.querySelector('[data-menu-open-icon]');
  const closeIcon = mobileNavToggle.querySelector('[data-menu-close-icon]');
  const mobileNavLinks = mobileNavPanel.querySelectorAll('a');

  const setMobileNavState = (isOpen) => {
    mobileNavToggle.setAttribute('aria-expanded', String(isOpen));
    mobileNavPanel.classList.toggle('hidden', !isOpen);

    if (openIcon) {
      openIcon.classList.toggle('hidden', isOpen);
    }

    if (closeIcon) {
      closeIcon.classList.toggle('hidden', !isOpen);
    }
  };

  setMobileNavState(false);

  mobileNavToggle.addEventListener('click', () => {
    const isOpen = mobileNavToggle.getAttribute('aria-expanded') === 'true';
    setMobileNavState(!isOpen);
  });

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => setMobileNavState(false));
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      setMobileNavState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      setMobileNavState(false);
    }
  });
}

if (prefersReducedMotion || !('IntersectionObserver' in window)) {
  revealTargets.forEach((element) => element.classList.add('scroll-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('scroll-visible');
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: '0px 0px -8% 0px'
    }
  );

  revealTargets.forEach((element, index) => {
    element.classList.add('scroll-reveal');
    element.style.setProperty('--scroll-delay', `${Math.min(index * 60, 180)}ms`);
    observer.observe(element);
  });
}
