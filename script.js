  const track = document.getElementById('carousel-track');
  const cards = track.querySelectorAll('.card');
  const prevBtn = document.querySelector('.nav.prev');
  const nextBtn = document.querySelector('.nav.next');

  let currentIndex = 0;

  function getCardWidth() {
    return cards[0].offsetWidth + parseInt(getComputedStyle(track).gap || 30);
  }

  function getVisibleCount() {
    return Math.floor(track.parentElement.offsetWidth / getCardWidth());
  }

  function moveSlide(direction) {
    const visibleCount = getVisibleCount();
    const maxIndex = cards.length - visibleCount;

    currentIndex += direction;

    // Limiter l'index dans les bornes
    if (currentIndex < 0) currentIndex = 0;
    if (currentIndex > maxIndex) currentIndex = maxIndex;

    const offset = getCardWidth() * currentIndex;
    track.style.transform = `translateX(-${offset}px)`;

    updateNavButtons(maxIndex);
  }

  function updateNavButtons(maxIndex) {
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;

    prevBtn.style.opacity = prevBtn.disabled ? 0.3 : 1;
    nextBtn.style.opacity = nextBtn.disabled ? 0.3 : 1;
    prevBtn.style.pointerEvents = prevBtn.disabled ? "none" : "auto";
    nextBtn.style.pointerEvents = nextBtn.disabled ? "none" : "auto";
  }

  // Recalculer à chaque redimensionnement
  window.addEventListener('resize', () => {
    moveSlide(0); // repositionne à l'index actuel
  });

  // Init
  window.addEventListener('load', () => {
    moveSlide(0); // force la première mise à jour
  });



