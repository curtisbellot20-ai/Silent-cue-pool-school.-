// Silent Cue — Main JS

// Nav scroll state
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Intersection Observer for reveal animations
const revealEls = document.querySelectorAll(
  '.philosophy__grid, .archive__card, .school__discipline, .narrator__container, .enter__tier'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealEls.forEach(el => observer.observe(el));

// Email form
const form = document.getElementById('enterForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('input[type="email"]');
    const btn = form.querySelector('button');
    btn.textContent = 'Access Requested';
    btn.disabled = true;
    input.disabled = true;
    input.value = '';
    input.placeholder = 'You will hear from us.';
  });
}

// Ambient particle effect (chalk dust)
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;opacity:0.4;';
const particlesContainer = document.getElementById('particles');
if (particlesContainer) {
  particlesContainer.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H, particles;

  function resize() {
    W = canvas.width = particlesContainer.offsetWidth;
    H = canvas.height = particlesContainer.offsetHeight;
  }

  function createParticles(n) {
    return Array.from({ length: n }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.5 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -(Math.random() * 0.3 + 0.05),
      alpha: Math.random() * 0.4 + 0.1,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(201,168,76,${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
    });
    requestAnimationFrame(draw);
  }

  resize();
  particles = createParticles(60);
  draw();
  window.addEventListener('resize', () => { resize(); particles = createParticles(60); });
}
