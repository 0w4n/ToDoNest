import { select } from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import canvasConfetti from "https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/+esm";

// Configuración de la barra de progreso
const width = 300;
const height = 15;
const checkboxes = document.querySelectorAll(".inputs input[type='checkbox']");
const totalTasks = checkboxes.length;

// Crear el SVG dentro del div .progress-container
const svg = select(".progress-container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

// FONDO de la barra (negro)
svg
  .append("rect")
  .attr("x", 0)
  .attr("y", 0)
  .attr("width", width)
  .attr("height", height)
  .attr("rx", height / 2)
  .attr("ry", height / 2)
  .attr("fill", "#fff");

// BARRA de progreso (inicialmente vacía)
const progressBar = svg
  .append("rect")
  .attr("x", width) // Inicia desde el extremo derecho
  .attr("y", 0)
  .attr("width", 0) // Empieza vacía
  .attr("height", height)
  .attr("rx", height / 2)
  .attr("ry", height / 2)
  .attr("fill", "#4CAF50");

// FUNCIÓN para actualizar la barra en base a los checkboxes marcados
function updateProgress() {
  const completedTasks = document.querySelectorAll(
    ".inputs input[type='checkbox']:checked"
  ).length;

  let percentage = completedTasks / totalTasks;
  percentage = Math.max(0, Math.min(1, percentage)); // Asegura que el valor esté entre 0 y 1

  const newWidth = width * percentage;

  progressBar
    .transition()
    .duration(500)
    .attr("x", width - newWidth) // Mueve la barra desde la derecha
    .attr("width", newWidth) // Ajusta el ancho
    .on("end", () => {
      if (completedTasks > 0) {
        launchConfetti();
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
    canvasConfetti({
      particleCount: 50,
      spread: 60,
      startVelocity: 30,
      scalar: 0.8,
      origin: { x: Math.random(), y: Math.random() * 0.3 + 0.5 },
    });
  }, 200);
}
