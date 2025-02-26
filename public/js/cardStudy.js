let currentIndex = 74;
let isTransitioning = false; // Controla el estado de transición
let isDebugging = true;
let time = 2000;

// Crear la tarjeta
const cardContainer = document.getElementById("card-container");

// Función para cargar los datos desde el archivo JSON
function loadData() {
  fetch("http://127.0.0.1:5500/conceptos")
    .then((response) => response.json())
    .then((jsonData) => {
      renderCard(currentIndex, jsonData);
      console.log("✅ JSON - ln:14");
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

  // Icon-tab
  // Bulb
  const bulbIcon = document.createElement("i");
  bulbIcon.classList.add("ti", "ti-bulb", "l");

  // Search
  const searchIcon = document.createElement("i");
  searchIcon.classList.add("ti", "ti-search", "l");
  const iTab = document.createElement("div");

  iTab.classList.add("icon-tab");
  iTab.appendChild(bulbIcon);
  iTab.appendChild(searchIcon);

  // Titulo
  const nameElement = document.createElement("p");
  nameElement.innerHTML = data.concept + ":";

  // Respuesta
  const answerElement = document.createElement("p");
  answerElement.innerHTML = capitalizeFirstLetter(data.answer);

  // Conceptos
  const conceptElement = document.createElement("div");
  conceptElement.classList.add("concep");
  conceptElement.appendChild(nameElement);
  conceptElement.appendChild(answerElement);

  // Añadir ID en la esquina inferior derecha del verso
  const idElement = document.createElement("div");
  idElement.classList.add("id");
  idElement.innerText = `${data.id}`;

  // Agregar los elementos
  card.appendChild(iTab);
  card.appendChild(conceptElement);
  card.appendChild(idElement);

  console.log("✅ Tarjeta - ln:69");
  return card;
}

// Función para mostrar la tarjeta
function renderCard(index, jsonData) {
  console.log("✅ Render - ln:75");

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
      `✅ Renderizando tarjeta: ${index}, ID: ${jsonData[index].id} - ln:89`
    );
  }

  cardContainer.innerText = "";
  const card = createCard(jsonData[index]);
  cardContainer.appendChild(card);

  // Añadir funcionalidad de voltear la tarjeta
  card.addEventListener("click", (e) => {
    console.log("✅ Flip");
    console.log(e.clientY);

    let clickposition = e.clientY > 200 ? 1 : 0;

    switch (clickposition) {
      case 0:
        cardContainer.classList.add("swipe-down");
        setTimeout(() => {
          cardContainer.classList.remove("swipe-down");
          previousCard(jsonData);
          console.log(`${currentIndex}`);
          console.log("Case 0");
        }, time);
        break;

      case 1:
        cardContainer.classList.add("swipe-up");
        setTimeout(() => {
          cardContainer.classList.remove("swipe-up");
          nextCard(jsonData);
          console.log(`${currentIndex}`);
          console.log("Case 1");
        }, time);
        break;

      default:
        console.error();
        break;
    }
  });

  card.addEventListener("touch", (e) => {
    console.log(e.clientY);
  });

  setTimeout(() => {
    isTransitioning = false; // Permitir nuevos gestos una vez terminada la transición
  }, time); // Duración de la transición (en milisegundos)
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
