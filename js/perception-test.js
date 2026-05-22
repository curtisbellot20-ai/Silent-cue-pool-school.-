// Silent Cue — Perception Test Quiz Logic

(function () {
  const TOTAL_QUESTIONS = 9; // 4 observation + 5 hustler
  let answered = 0;
  let correct = 0;

  const scoreSection = document.getElementById('scoreSection');
  const scoreNum = document.getElementById('scoreNum');
  const scoreDenom = document.getElementById('scoreDenom');
  const scoreRead = document.getElementById('scoreRead');

  // Field note popup (fires after question 1)
  const popup = document.getElementById('fieldNotePopup');
  const popupClose = document.getElementById('fieldNoteClose');
  if (popupClose) {
    popupClose.addEventListener('click', () => { popup.hidden = true; });
  }
  popup?.addEventListener('click', (e) => {
    if (e.target === popup) popup.hidden = true;
  });

  const READINGS = [
    { max: 3, text: 'Keep watching. The room reveals itself slowly. Return to the field notes and study again.' },
    { max: 6, text: 'Developing perception. You are beginning to read the signals. Study the types carefully.' },
    { max: 8, text: 'Sharp eye. Most players never get this far. The table is starting to make sense.' },
    { max: 9, text: 'Exceptional perception. You see what others miss. The Ghost would respect your patience.' },
  ];

  function revealScore() {
    scoreSection.hidden = false;
    scoreNum.textContent = correct;
    scoreDenom.textContent = '/ ' + TOTAL_QUESTIONS;
    const reading = READINGS.find(r => correct <= r.max) || READINGS[READINGS.length - 1];
    scoreRead.textContent = reading.text;
    setTimeout(() => scoreSection.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
  }

  const allCards = document.querySelectorAll('.pt__q');

  allCards.forEach((card, cardIndex) => {
    const correctAnswer = card.dataset.answer;
    const options = card.querySelectorAll('.pt__option');
    const analysis = card.querySelector('.pt__q-analysis');

    options.forEach(btn => {
      btn.addEventListener('click', () => {
        if (card.classList.contains('answered')) return;
        card.classList.add('answered');

        const chosen = btn.dataset.value;
        const isCorrect = chosen === correctAnswer;

        options.forEach(b => {
          b.disabled = true;
          if (b.dataset.value === correctAnswer) {
            b.classList.add('correct');
          } else if (b === btn && !isCorrect) {
            b.classList.add('wrong');
          }
        });

        if (isCorrect) correct++;
        answered++;

        analysis.hidden = false;

        // Show field note popup after question 1 (first card)
        if (cardIndex === 0) {
          setTimeout(() => { popup.hidden = false; }, 700);
        }

        if (answered === TOTAL_QUESTIONS) {
          setTimeout(revealScore, 600);
        }
      });
    });
  });
})();
