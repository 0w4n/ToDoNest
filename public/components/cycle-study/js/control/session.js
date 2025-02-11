function saveSession() {
  const sessionData = {
    currentInterval,
    timeLeft,
    totalStudyTime,
    totalBreakTime,
    completedCycles,
    points,
    level,
  };
  localStorage.setItem("studySession", JSON.stringify(sessionData));
}

function restoreSession() {
  const sessionData = JSON.parse(localStorage.getItem("studySession"));
  if (sessionData) {
    currentInterval = sessionData.currentInterval;
    timeLeft = sessionData.timeLeft;
    totalStudyTime = sessionData.totalStudyTime;
    totalBreakTime = sessionData.totalBreakTime;
    completedCycles = sessionData.completedCycles;
    points = sessionData.points;
    level = sessionData.level;
    updateStats();
    updateGamification();
    updateDisplay();
  }
}

// Guarda la sesión cada vez que cambie el ciclo
setInterval(saveSession, 1000); // Guarda cada segundo
restoreSession(); // Restaura al cargar la página
