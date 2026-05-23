// Silent Cue — Access Gate
// Protects e-course pages and product downloads with a session password.

(function () {
  const SESSION_KEY = 'sc_access';
  const PASSWORD    = '5mask';

  // ── Build the gate overlay ──────────────────────────────────────────────
  function buildGate(onSuccess) {
    const overlay = document.createElement('div');
    overlay.className = 'gate__overlay';
    overlay.id = 'accessGate';
    overlay.innerHTML = `
      <div class="gate__panel">
        <div class="gate__mark">&#9679;&nbsp; Silent Cue</div>
        <h2 class="gate__title">Members Only</h2>
        <p class="gate__sub">Enter your access code to continue.</p>
        <form class="gate__form" id="gateForm" autocomplete="off">
          <input
            class="gate__input"
            id="gateInput"
            type="password"
            placeholder="Access code"
            aria-label="Access code"
            autofocus
          />
          <button class="gate__btn" type="submit">Enter &rarr;</button>
        </form>
        <p class="gate__error" id="gateError" hidden>Incorrect code. Try again.</p>
      </div>
    `;
    document.body.appendChild(overlay);

    const form  = overlay.querySelector('#gateForm');
    const input = overlay.querySelector('#gateInput');
    const error = overlay.querySelector('#gateError');

    // Small shake animation on wrong attempt
    function shake() {
      input.classList.remove('gate__input--shake');
      void input.offsetWidth; // reflow
      input.classList.add('gate__input--shake');
    }

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value.trim() === PASSWORD) {
        sessionStorage.setItem(SESSION_KEY, '1');
        overlay.classList.add('gate__overlay--out');
        setTimeout(() => {
          overlay.remove();
          if (typeof onSuccess === 'function') onSuccess();
        }, 600);
      } else {
        error.hidden = false;
        input.value = '';
        shake();
        setTimeout(() => { error.hidden = true; }, 2400);
      }
    });

    // Fade in
    requestAnimationFrame(() => {
      setTimeout(() => overlay.classList.add('gate__overlay--in'), 20);
    });

    return overlay;
  }

  // ── Page-level gate (for protected content pages) ──────────────────────
  // Call this from any page that should be fully gated.
  window.requireAccess = function () {
    if (sessionStorage.getItem(SESSION_KEY)) return; // already authenticated
    document.body.style.overflow = 'hidden';
    buildGate(() => {
      document.body.style.overflow = '';
    });
  };

  // ── Link-level gate (for product CTAs on index page) ───────────────────
  // Intercept clicks on elements with [data-gated] attribute.
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-gated]');
    if (!trigger) return;

    if (sessionStorage.getItem(SESSION_KEY)) return; // already authenticated

    e.preventDefault();
    const destination = trigger.getAttribute('href') || trigger.dataset.gated;
    document.body.style.overflow = 'hidden';

    buildGate(() => {
      document.body.style.overflow = '';
      if (destination && destination !== '#') {
        window.location.href = destination;
      }
    });
  });
})();
