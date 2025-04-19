import { formatTime, timeLeft, intervals, currentInterval } from "./script.js";

const pipBtn = document.getElementById("pip-btn");
const pipVideo = document.getElementById("pip-video");
console.log(pipVideo);
console.log(pipVideo.srcObject);

const pipCanvas = document.createElement("canvas");
const pipCtx = pipCanvas.getContext("2d");

let isPip = false;
console.log(isPip);

// Configurar dimensiones del canvas
pipCanvas.width = 250;
pipCanvas.height = 150;

if (isPip) {
  renderTimerOnCanvas();
}

// Función para renderizar el temporizador en el canvas
function renderTimerOnCanvas() {
  pipCtx.clearRect(0, 0, pipCanvas.width, pipCanvas.height);

  // Fondo del temporizador
  pipCtx.fillStyle = "#007BFF";
  pipCtx.fillRect(0, 0, pipCanvas.width, pipCanvas.height);

  // Texto del temporizador
  pipCtx.fillStyle = "white";
  pipCtx.font = "bold 36px Arial";
  pipCtx.textAlign = "center";
  pipCtx.textBaseline = "middle";
  pipCtx.fillText(
    formatTime(timeLeft),
    pipCanvas.width / 2,
    pipCanvas.height / 2
  );

  // Dibujar el estado actual (Estudio/Descanso)
  pipCtx.font = "bold 18px Arial";
  pipCtx.fillText(
    `Bloque: ${intervals[currentInterval].type}`,
    pipCanvas.width / 2,
    pipCanvas.height - 30
  );

  // Llamar a la función en el próximo frame
  requestAnimationFrame(renderTimerOnCanvas);
}

// Sincronizar el canvas con el vídeo
setInterval(() => {
  if (document.pictureInPictureElement) {
    pipVideo.srcObject = pipCanvas.captureStream(); // Reinicia el stream cada 1s
    console.log("Render");
  }
}, 750);

// Activar Imagen sobre Imagen
pipBtn.addEventListener("click", async () => {
  isPip = true;

  if (!pipVideo.srcObject) {
    pipVideo.srcObject = pipCanvas.captureStream(); // Captura el stream del canvas
  }

  // Esperar a que los metadatos del video estén listos
  pipVideo.addEventListener("loadedmetadata", async () => {
    try {
      await pipVideo.play(); // Asegúrate de que el video se esté reproduciendo
      await pipVideo.requestPictureInPicture(); // Activa PiP
    } catch (err) {
      console.error("Error al activar PiP:", err);
    }
  });

  // Si ya está listo, actívalo directamente
  if (pipVideo.readyState >= 1) {
    try {
      await pipVideo.play();
      await pipVideo.requestPictureInPicture();
    } catch (err) {
      console.error("Error al activar PiP:", err);
    }
  } else {
    pipVideo.load(); // Fuerza la carga del video
  }
});

// Iniciar la renderización del temporizador
renderTimerOnCanvas();
