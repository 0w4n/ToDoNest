import * as d3 from "d3";
import confetti from "canvas-confetti";

// Configuración de la barra de progreso
const width = 400;
const height = 30;
const checkboxes = document.querySelectorAll(".inputs input[type='checkbox']");
const totalTasks = checkboxes.length; // Número total de checkboxes

// Crear el SVG dentro del div .progress-container
const svg = d3
  .select(".progress-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// FONDO de la barra
svg
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width)
  .attr("height", height)
  .attr("rx", height / 2) // Bordes redondeados (100%)
  .attr("ry", height / 2)
  .attr("fill", "#000"); // Negro

// BARRA de progreso (inicialmente vacía)
const progressBar = svg
  .append("rect")
  .attr("x", width)
  .attr("y", 0)
  .attr("width", 0)
  .attr("height", height)
  .attr("rx", height / 2)
  .attr("ry", height / 2)
  .attr("fill", "#4CAF50"); // Verde

// FUNCIÓN para actualizar la barra en base a los checkboxes marcados
function updateProgress() {
  const completedTasks = document.querySelectorAll(
    ".inputs input[type='checkbox']:checked"
  ).length;
  const percentage = completedTasks / totalTasks;
  const newWidth = width * percentage;

  progressBar
    .transition()
    .duration(500)
    .attr("x", width - newWidth) // Se llena de derecha a izquierda
    .attr("width", newWidth)
    .on("end", () => {
      if (completedTasks > 0) {
        launchConfetti(); // Lanza confetti en cada tarea completada
      }
    });
}

// ASOCIAR EVENTO a cada checkbox para actualizar la barra
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", updateProgress);
});

// FUNCIÓN para lanzar confetti
function launchConfetti() {
  setTimeout(() => {
    confetti({
      particleCount: 50, // Reducido para evitar spam visual
      spread: 60,
      startVelocity: 30,
      scalar: 0.8,
      origin: { x: Math.random(), y: Math.random() * 0.3 + 0.5 }, // Variabilidad en origen
    });
  }, 200); // Pequeño delay para evitar disparos dobles
}
