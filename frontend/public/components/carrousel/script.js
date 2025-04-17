const carousel = document.querySelector(".carousel");

const meses = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

let visibleDays = [];
let todayIndex = 0;
let todayElement = null;

// Crear un elemento de fecha
function createDateElement(date, isToday) {
  const mes = meses[date.getMonth()];
  const dia = date.getDate();
  const diaSemana = diasSemana[date.getDay()];

  const dateContainer = document.createElement("div");
  dateContainer.className = "date-container";
  if (isToday) dateContainer.classList.add("today");

  dateContainer.innerHTML = `
        <h3>${mes}</h3>
        <h1>${dia.toString().padStart(2, "0")}</h1>
        <h2>${diaSemana}</h2>
    `;
  return dateContainer;
}

// Inicializar el carrusel
function initializeCarousel() {
  const hoy = new Date();
  const totalDays = 29; // 14 días hacia adelante y hacia atrás

  for (let i = -totalDays; i <= totalDays; i++) {
    const date = new Date();
    date.setDate(hoy.getDate() + i);

    const isToday = i === 0;
    const dateElement = createDateElement(date, isToday);

    carousel.appendChild(dateElement);
    visibleDays.push({ date, element: dateElement });

    if (isToday) {
      todayIndex = visibleDays.length - 1;
      todayElement = dateElement; // Guardar el div del día de hoy
    }
  }

  updateDays();
}

// Agregar y eliminar días dinámicamente
function updateDays() {
  const visibleStart = carousel.scrollLeft;
  const visibleEnd = carousel.scrollLeft + carousel.offsetWidth;

  const totalVisible = 3;
  const firstVisible = visibleDays[totalVisible];
  const lastVisible = visibleDays[visibleDays.length - totalVisible];

  if (
    firstVisible.element.offsetLeft + firstVisible.element.offsetWidth <
    visibleStart
  ) {
    // Eliminar el primer día y agregar uno al final
    const newDate = new Date(lastVisible.date);
    newDate.setDate(lastVisible.date.getDate() + totalVisible);

    const newElement = createDateElement(newDate, false);
    carousel.appendChild(newElement);
    visibleDays.push({ date: newDate, element: newElement });

    firstVisible.element.remove();
    visibleDays.shift();
  }

  if (lastVisible.element.offsetLeft > visibleEnd) {
    // Eliminar el último día y agregar uno al principio
    const newDate = new Date(firstVisible.date);
    newDate.setDate(firstVisible.date.getDate() - totalVisible);

    const newElement = createDateElement(newDate, false);
    carousel.prepend(newElement);
    visibleDays.unshift({ date: newDate, element: newElement });

    lastVisible.element.remove();
    visibleDays.pop();
  }
}

// function centerTodayDate() {

// }

// Inicializar
initializeCarousel();
console.log(updateDays());
