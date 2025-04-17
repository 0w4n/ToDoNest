import { createBackButtons, setupLongTap } from "./button.js";
const { trueButton, falseButton } = createBackButtons();

let currentIndex = 0;
let isTransitioning = false; // Controla el estado de transición
let isDebugging = true; //

// Crear la tarjeta
const cardContainer = document.getElementById("card-container");

// Función para cargar los datos desde el archivo JSON
function loadData() {
  fetch("conceptos.json")
    .then((response) => response.json())
    .then((jsonData) => {
      renderCard(currentIndex, jsonData);
    })
    .catch((error) => console.error("Error al cargar los datos:", error));
}

function capitalizeFirstLetter(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// Función para crear las tarjetas
function createCard(data) {
  const card = document.createElement("div");
  card.classList.add("card");

  // Lado frontal
  const front = document.createElement("div");
  front.classList.add("side", "front");
  front.innerText = data.concept;

  // Lado posterior (verso)
  const back = document.createElement("div");
  back.classList.add("side", "back");

  // Añadir botones al verso
  const backText = document.createElement("div");
  backText.classList.add("back-text");
  backText.textContent = capitalizeFirstLetter(data.answer);

  // Colocar los elementos en el verso
  const buttonContainer = document.createElement("div");
  buttonContainer.classList.add("button-container");
  buttonContainer.appendChild(trueButton);
  buttonContainer.appendChild(falseButton);
  back.appendChild(buttonContainer);
  back.appendChild(backText);

  // Añadir ID en la esquina inferior derecha del verso
  const idElement = document.createElement("div");
  idElement.classList.add("id");
  idElement.innerText = `${data.id}`;
  front.appendChild(idElement); // Se coloca el ID en el verso

  // Agregar los lados a la tarjeta
  card.appendChild(front);
  card.appendChild(back);

  // Añadir funcionalidad de voltear la tarjeta
  card.addEventListener("click", () => card.classList.toggle("flipped"));

  return card;
}

// Función para mostrar la tarjeta
function renderCard(index, jsonData) {
  if (isTransitioning) return; // Ignorar gestos adicionales durante la transición
  isTransitioning = true;

  if (index < 0 || index >= jsonData.length) {
    if (isDebugging) {
      console.error("Índice fuera de rango:", index);
    }
    return;
  }

  if (isDebugging) {
    console.log(
      `Renderizando tarjeta con currentIndex: ${index}, ID: ${jsonData[index].id}`
    );
  }

  cardContainer.innerHTML = "";
  const card = createCard(jsonData[index]);
  cardContainer.appendChild(card);

  // Funcionalidad de swipe
  let startY;
  card.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });

  card.addEventListener("touchend", (e) => {
    const endY = e.changedTouches[0].clientY;
    const diff = endY - startY;
    if (isDebugging) {
      console.log(diff);
    }

    if (diff > 100) {
      cardContainer.classList.add("swipe-up");
      setTimeout(() => {
        cardContainer.classList.remove("swipe-up");
        nextCard(jsonData);
        console.log(`${currentIndex}`);
      }, 500);
    } else if (diff < -100) {
      cardContainer.classList.add("swipe-down");
      setTimeout(() => {
        cardContainer.classList.remove("swipe-down");
        previousCard(jsonData);
        console.log(`${currentIndex}`);
      }, 500);
    }
  });

  setTimeout(() => {
    isTransitioning = false; // Permitir nuevos gestos una vez terminada la transición
  }, 500); // Duración de la transición (en milisegundos)
}

// Cambiar a la tarjeta siguiente
function nextCard(jsonData) {
  const previousIndex = currentIndex; // Guarda el índice anterior

  currentIndex = (currentIndex + 1) % jsonData.length;

  if (isDebugging) {
    console.log(
      `Avanzando: previousIndex=${previousIndex}, currentIndex=${currentIndex}`
    );
  }
  renderCard(currentIndex, jsonData);
}

//Cambiar a la tarjeta previa
function previousCard(jsonData) {
  const previousIndex = currentIndex; // Guarda el índice anterior

  currentIndex = (currentIndex - 1 + jsonData.length) % jsonData.length;

  if (isDebugging) {
    console.log(
      `Retrocediendo: previousIndex=${previousIndex}, currentIndex=${currentIndex}`
    );
  }

  renderCard(currentIndex, jsonData);
}

// Inicializar
loadData();
