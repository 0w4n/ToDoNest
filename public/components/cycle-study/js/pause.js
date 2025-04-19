const breakTips = [
  "¡Haz 10 sentadillas!",
  "Camina durante un minuto",
  "Toma un vaso de agua",
  "Respira profundamente durante 30 segundos",
  "Estira los brazos y el cuello",
  "¡Recuerda por qué empezaste a estudiar!",
];

function showBreakTip() {
  if (intervals[currentInterval].type.includes("Descanso")) {
    const randomTip = breakTips[Math.floor(Math.random() * breakTips.length)];
    document.getElementById("break-tip").textContent = randomTip;
  }
}

// Llama a esta función en `logCycle`
function logCycle() {
  completedCycles++;
  const li = document.createElement("li");
  li.textContent = `Ciclo completado: ${new Date().toLocaleTimeString()} - ${
    intervals[currentInterval].type
  }`;
  cycleLog.appendChild(li);
  logStats();
  awardPoints();
  chartData.labels.push(`Ciclo ${completedCycles}`);
  chartData.datasets[0].data.push(completedCycles);
  progressChart.update();
  showBreakTip(); // Muestra el consejo al cambiar de ciclo
}
