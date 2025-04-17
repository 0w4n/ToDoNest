const timerDisplay = document.getElementById("timer-display");
const toggleBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");
const statusDisplay = document.getElementById("status");
const progressBar = document.getElementById("progress");
const notificationSound = document.getElementById("notification-sound");
const customizeForm = document.getElementById("customize-form");

export let defaultIntervals = [
  { duration: 45, type: "Estudio Intenso", color: "intense" },
  { duration: 5, type: "Descanso Corto", color: "break" },
  { duration: 15, type: "Tarea Ligera", color: "light-task" },
  { duration: 5, type: "Descanso Corto", color: "break" },
  { duration: 45, type: "Estudio Intenso", color: "intense" },
  { duration: 5, type: "Descanso Corto", color: "break" },
  { duration: 15, type: "Tarea Ligera", color: "light-task" },
  { duration: 15, type: "Descanso Final", color: "break" },
];

export let intervals = [...defaultIntervals]; // Variable que indica los distintos intervalos
export let currentInterval = 0; // Variable que indica el bloque en el que nos encontramos
export let timeLeft = intervals[currentInterval].duration * 60; // Variable que indica el tiempo que queda
let timer; // Variable del temporizador
let isRunning = false; // Variable para saber si el temporizador está en marcha
let autoMode = true; // Variable para activar/desactivar el inicio automático

// Formato del tiempo
export function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

// Actualiza el Display
function updateDisplay() {
  timerDisplay.textContent = formatTime(timeLeft);
  statusDisplay.textContent = `Bloque: ${intervals[currentInterval].type}`;
  progressBar.style.width = `${
    100 - (timeLeft / (intervals[currentInterval].duration * 60)) * 100
  }%`;
  document.body.className = intervals[currentInterval].color;
  updateTitle();
  updateProgressBar();
}

// Actualiza la barra de progresos
function updateProgressBar() {
  const totalTime = intervals[currentInterval].duration * 60;
  const progress = ((totalTime - timeLeft) / totalTime) * 100;
  progressBar.style.width = `${progress}%`;
}

// Actualiza el Title
function updateTitle() {
  document.title = `${formatTime(timeLeft)} - Estudio Cíclico`;
}

// Suena la notificación
function playNotification() {
  notificationSound.play();
}

// Se inicia el temporizador
function startTimer() {
  if (isRunning) return;
  isRunning = true;
  timer = setInterval(() => {
    timeLeft--;
    updateDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      playNotification();
      currentInterval = (currentInterval + 1) % intervals.length;
      timeLeft = intervals[currentInterval].duration * 60;
      updateDisplay();
      startTimer();
    }
  }, 1000);

  if (isRunning) {
    document.querySelector("#customize-form").classList.add("hidden");
    focusModeBtn.textContent = document
      .querySelector("#customize-form")
      .classList.contains("hidden")
      ? "Salir de Modo Foco"
      : "Modo Distracción Cero";
    console.log("Está corriendo y por tanto se oculta el form");
  }

  console.log("Se inicia el temporizador");
}

// Se pausa el temporizador
function pauseTimer() {
  isRunning = false;
  clearInterval(timer);

  console.log("Se pausa el temporizador");
}

// Inicia el siguiente bloque
function toggleTimer() {
  isRunning ? pauseTimer() : startTimer();
}

function resetTimer() {
  pauseTimer();
  currentInterval = 0;
  timeLeft = intervals[currentInterval].duration * 60;
  updateDisplay();
  if (autoMode) {
    startTimer(); // Inicia automáticamente si el modo está activado
  }
  console.log("Se reinicia el temporizador");
}

function startNextInterval() {
  currentInterval++;
  if (currentInterval >= intervals.length) {
    currentInterval = 0; // Reinicia al primer intervalo si se completan todos
    alert("¡Has completado todos los bloques! Comenzando de nuevo..");
  }
  resetTimer();
  startTimer(); // Inicia automáticamente el siguiente bloque
}

function customizeTimes(event) {
  event.preventDefault();
  intervals = [
    {
      duration: parseInt(document.getElementById("study-time").value),
      type: "Estudio Intenso",
      color: "intense",
    },
    {
      duration: parseInt(document.getElementById("short-break-time").value),
      type: "Descanso Corto",
      color: "break",
    },
    {
      duration: parseInt(document.getElementById("light-task-time").value),
      type: "Tarea Ligera",
      color: "light-task",
    },
    {
      duration: parseInt(document.getElementById("short-break-time").value),
      type: "Descanso Corto",
      color: "break",
    },
    {
      duration: parseInt(document.getElementById("study-time").value),
      type: "Estudio Intenso",
      color: "intense",
    },
    {
      duration: parseInt(document.getElementById("short-break-time").value),
      type: "Descanso Corto",
      color: "break",
    },
    {
      duration: parseInt(document.getElementById("light-task-time").value),
      type: "Tarea Ligera",
      color: "light-task",
    },
    {
      duration: parseInt(document.getElementById("long-break-time").value),
      type: "Descanso Final",
      color: "break",
    },
  ];
  resetTimer();
}

toggleBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);
customizeForm.addEventListener("submit", customizeTimes);

updateDisplay();

const focusModeBtn = document.getElementById("focus-mode-btn");
const sectionsToHide = [
  "#customize-form",
  "#history",
  "#task-list",
  "#chart-container",
];

focusModeBtn.addEventListener("click", () => {
  sectionsToHide.forEach((selector) => {
    const section = document.querySelector(selector);
    section.classList.toggle("hidden");
  });
  focusModeBtn.textContent = document
    .querySelector("#customize-form")
    .classList.contains("hidden")
    ? "Salir de Modo Foco"
    : "Modo Distracción Cero";
});
