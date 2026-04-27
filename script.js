// EtherWare — interactions
(function () {
  const nav = document.getElementById('nav');
  const heroTitle = document.getElementById('heroTitle');
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');

  // Navbar background on scroll + brand-name reveal once hero title scrolls under nav
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 20);

    if (heroTitle) {
      const rect = heroTitle.getBoundingClientRect();
      // Reveal when title's bottom passes above the nav
      const passed = rect.bottom < 60;
      nav.classList.toggle('title-in', passed);
    } else {
      nav.classList.add('title-in');
    }
  }
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile menu
  if (toggle) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => links.classList.remove('open'))
    );
  }

  // Reveal on scroll
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add('in');
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

  // Parallax orb
  const orb = document.querySelector('.hero-orb');
  if (orb) {
    document.addEventListener('scroll', () => {
      const y = window.scrollY;
      orb.style.transform = `translate(-50%, ${y * 0.25}px) scale(${1 + Math.min(y / 4000, 0.15)})`;
    }, { passive: true });
  }

  // Feature card mouse-light
  document.querySelectorAll('.feature').forEach((card) => {
    card.addEventListener('mousemove', (ev) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((ev.clientX - r.left) / r.width) * 100 + '%');
      card.style.setProperty('--my', ((ev.clientY - r.top) / r.height) * 100 + '%');
    });
  });
})();
