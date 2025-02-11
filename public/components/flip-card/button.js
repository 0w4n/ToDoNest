// Tiempo necesario para considerar un "long tap" (en milisegundos)
const LONG_TAP_DURATION = 500; // 500 ms

// Variables para el control del tiempo
let longTapTimeout;

// Exporta una función para crear los botones
export function createBackButtons() {
  // Botón izquierdo
  const trueButton = document.createElement("button");
  trueButton.classList.add("round-button", "left-button");
  trueButton.innerHTML = `<i class="ti ti-check"></i>`;
  trueButton.addEventListener("click", () => saveResponse(true));

  // Botón derecho
  const falseButton = document.createElement("button");
  falseButton.classList.add("round-button", "right-button");
  falseButton.innerHTML = `<i class="ti ti-x"></i>`;
  falseButton.addEventListener("click", () => saveResponse(false));

  return { trueButton, falseButton };
}

// Función de "long tap" para el botón izquierdo
 export function setupLongTap(buttonElement, action) {
  buttonElement.addEventListener("mousedown", () => {
    longTapTimeout = setTimeout(() => {
      action; // Ejecuta la acción si se mantiene presionado suficiente tiempo
    }, LONG_TAP_DURATION);
    console.log("Long tap detectado en el botón izquierdo");
  });

  buttonElement.addEventListener("mouseup", () => {
    clearTimeout(longTapTimeout); // Cancela el "long tap" si se suelta antes de tiempo
  });

  // Soporte para dispositivos táctiles
  buttonElement.addEventListener("touchstart", () => {
    longTapTimeout = setTimeout(() => {
      action;
    }, LONG_TAP_DURATION);
    console.log("Long tap detectado en el botón izquierdo");
  });

  buttonElement.addEventListener("touchend", () => {
    clearTimeout(longTapTimeout);
  });

  return buttonElement, action;
}

function saveResponse(isTrue) {
  const questionId = document.querySelector(".id").innerText;

  // Crear la respuesta con la hora actual
  const response = {
    id: questionId,
    answer: isTrue,
    timestamp: new Date().toISOString(),
  };

  // Obtener las respuestas guardadas previamente (o inicializar una nueva lista)
  const responses = JSON.parse(localStorage.getItem("responses")) || [];
  responses.push(response);

  // Guardar la nueva respuesta en LocalStorage
  localStorage.setItem("responses", JSON.stringify(responses));

  // Generar el archivo response.json y forzar la descarga
  console.log("Respuesta guardada:", { questionId, answer: isTrue });
}
