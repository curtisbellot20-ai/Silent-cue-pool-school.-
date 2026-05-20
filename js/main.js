// Silent Cue — Main JS (Cinematic Edition)

// ---- Intro Overlay ----
const intro = document.getElementById('intro');
const introCta = document.getElementById('introCta');

if (intro) {
  if (!sessionStorage.getItem('sc_intro')) {
    document.body.style.overflow = 'hidden';

    requestAnimationFrame(() => {
      setTimeout(() => intro.classList.add('active'), 80);
    });

    const dismissIntro = (scrollTo) => {
      intro.classList.add('dismissed');
      document.body.style.overflow = '';
      sessionStorage.setItem('sc_intro', '1');
      setTimeout(() => { intro.style.display = 'none'; }, 1700);
      if (scrollTo) {
        setTimeout(() => {
          document.getElementById(scrollTo)?.scrollIntoView({ behavior: 'smooth' });
        }, 900);
      }
    };

    introCta?.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissIntro('archive');
    });

    // Auto-dismiss after 9s as fallback
    setTimeout(() => dismissIntro(null), 9000);
  } else {
    intro.style.display = 'none';
  }
}

// ---- Ambient music player ----
const audio = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let musicPlaying = false;

if (audio && musicBtn) {
  musicBtn.addEventListener('click', () => {
    if (musicPlaying) {
      audio.pause();
      musicPlaying = false;
      musicBtn.classList.remove('playing');
      musicBtn.setAttribute('aria-label', 'Play ambient music');
    } else {
      audio.play().then(() => {
        musicPlaying = true;
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('aria-label', 'Pause ambient music');
      }).catch(() => {});
    }
  });
}

// ---- Nav scroll state ----
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ---- Intersection Observer for reveal animations ----
const directRevealTargets = document.querySelectorAll(
  '.philosophy__grid, .archive__card, .school__discipline, .narrator__container, .enter__tier, .diagrams__item, .technique__container'
);
directRevealTargets.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 70);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });

// Observe both programmatically-added and HTML-class reveal elements
document.querySelectorAll('.reveal, .cine-break').forEach(el => observer.observe(el));

// ---- Email form ----
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

// ---- Ambient particle effect (chalk dust) ----
const canvas = document.createElement('canvas');
canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;opacity:0.38;';
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
      r: Math.random() * 1.6 + 0.2,
      vx: (Math.random() - 0.5) * 0.1,
      vy: -(Math.random() * 0.22 + 0.04),
      alpha: Math.random() * 0.3 + 0.06,
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
      if (p.x < -5) p.x = W + 5;
      if (p.x > W + 5) p.x = -5;
    });
    requestAnimationFrame(draw);
  }

  resize();
  particles = createParticles(75);
  draw();
  window.addEventListener('resize', () => { resize(); particles = createParticles(75); });
}
