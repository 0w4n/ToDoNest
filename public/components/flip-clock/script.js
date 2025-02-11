// Queda exportarla

function updateFlipClock() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");

  updateUnit("hours", hours);
  updateUnit("minutes", minutes);
  updateUnit("seconds", seconds);

  const nextSecond = 1000 - now.getMilliseconds();
  setTimeout(updateFlipClock, nextSecond);
}

function updateUnit(unit, newValue) {
  const flipElement = document.getElementById(unit);
  const top = flipElement.querySelector(".top");
  const bottom = flipElement.querySelector(".bottom");
  const digit = flipElement.parentElement.querySelector(".digit");

  if (digit.textContent !== newValue) {
    const previousValue = digit.textContent;
    digit.textContent = newValue;

    bottom.textContent = previousValue;
    top.textContent = newValue;

    setTimeout(() => {
      top.classList.add("active");
    }, 500);
    bottom.classList.add("active");

    setTimeout(() => {
      flipElement.classList.remove("active");
    }, 500);
  }
}

// Iniciar el reloj
updateFlipClock();
