let totalStudyTime = 0;
let totalBreakTime = 0;
let totalSessions = 0;

function updateStats() {
  document.getElementById("total-study").textContent = totalStudyTime;
  document.getElementById("total-breaks").textContent = totalBreakTime;
  document.getElementById("total-sessions").textContent = totalSessions;
}

function logStats() {
  if (intervals[currentInterval].type.includes("Estudio")) {
    totalStudyTime += intervals[currentInterval].duration;
  } else {
    totalBreakTime += intervals[currentInterval].duration;
  }
  totalSessions++;
  updateStats();
}

function logCycle() {
  completedCycles++;
  const li = document.createElement("li");
  li.textContent = `Ciclo completado: ${new Date().toLocaleTimeString()} - ${
    intervals[currentInterval].type
  }`;
  cycleLog.appendChild(li);
  logStats();
  chartData.labels.push(`Ciclo ${completedCycles}`);
  chartData.datasets[0].data.push(completedCycles);
  progressChart.update();
}
