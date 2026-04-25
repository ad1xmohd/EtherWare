const revealElements = document.querySelectorAll(".reveal-on-scroll");
const yearEl = document.getElementById("year");
const progressEl = document.querySelector(".progress-fill");
const progressValueEl = document.getElementById("progress-value");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.12,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

const animateProgress = () => {
  if (!progressEl || !progressValueEl) return;

  const target = Number(progressEl.dataset.progress || 65);
  let current = 0;
  progressEl.style.width = `${target}%`;

  const tick = () => {
    current += 1;
    progressValueEl.textContent = String(Math.min(current, target));
    if (current < target) {
      requestAnimationFrame(tick);
    }
  };

  tick();
};

const statusObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      animateProgress();
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.4 }
);

const statusSection = document.getElementById("status");
if (statusSection) {
  statusObserver.observe(statusSection);
}
