const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const saludos = [
  "Buenas, ",
  "Buenas noches, ",
  "Buenos días, ",
  "Buenas tardes, ",
];
const userName = "Jorge";

function gtoday() {
  const date = new Date();
  const time = date.getHours();
  const day = date.getDate();
  const weekDay = diasSemana[date.getDay()];

  document.querySelector(".num").textContent = day;
  document.querySelector(".day").textContent = weekDay;

  const timePosition = time < 7 ? 1 : time < 14 ? 2 : time < 23 ? 3 : 0;
  document.querySelector(".pwish").textContent = saludos[timePosition] + userName;
}

function logTime() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");

  const clock = document.querySelector(".time");

  clock.textContent = `${hours}:${minutes}:${seconds}`;
}

// Inicializar funciones
setInterval(logTime, 1000);
logTime();
gtoday();
