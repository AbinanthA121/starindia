const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealTargets = [...document.querySelectorAll('main > section, main > header, footer')];

document.documentElement.classList.add('js-scroll-effects');

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
