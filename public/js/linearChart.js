import * as d3 from "https://cdn.jsdelivr.net/npm/d3@7/+esm";
import * as confetti from "https://cdn.jsdelivr.net/npm/canvas-confetti@1.4.0";

// Configuración de la barra
const width = 400;
const height = 30;
let totalTasks = 10;   // Número total de tareas
let completedTasks = 0; // Inicialmente, 0 tareas completadas

// Crear el SVG dentro del div .progress-container
const svg = d3.select(".progress-container")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

// FONDO de la barra
svg.append("rect")
    .attr("x", 0)
    .attr("y", 0)
    .attr("width", width)
    .attr("height", height)
    .attr("rx", height / 2)  // Bordes redondeados (100%)
    .attr("ry", height / 2)
    .attr("fill", "#000"); // Color de fondo (negro)

// BARRA que se llena
const progressBar = svg.append("rect")
    .attr("x", width)
    .attr("y", 0)
    .attr("width", 0) // Empieza vacía
    .attr("height", height)
    .attr("rx", height / 2)  // Bordes redondeados (100%)
    .attr("ry", height / 2)
    .attr("fill", "#4CAF50"); // Verde (puedes cambiarlo)

// FUNCIÓN para actualizar la barra con nuevas tareas completadas
function updateProgress(completed) {
    completedTasks = Math.min(completed, totalTasks); // Evita que pase del 100%
    const percentage = completedTasks / totalTasks;
    const newWidth = width * percentage;

    // Transición animada
    progressBar.transition()
        .duration(500)
        .attr("x", width - newWidth) // Se llena de derecha a izquierda
        .attr("width", newWidth)
        .on("end", () => launchConfetti()); // Lanza confetti al terminar

}

// FUNCIÓN para lanzar confetti
function launchConfetti() {
    confetti({
        particleCount: 50,  // Cantidad de partículas
        spread: 70,        // Distribución
        origin: { x: 0.9, y: 0.3 } // Posición de salida del confetti
    });
}

// Simulación de completar tareas cada 2 segundos
let interval = setInterval(() => {
    if (completedTasks >= totalTasks) {
        clearInterval(interval);
    } else {
        updateProgress(completedTasks + 1);
    }
}, 2000);