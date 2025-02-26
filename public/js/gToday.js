const diasSemana = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const saludos = ["Buenas, ", "Buenas noches, ", "Buenos días, ", "Buenas tardes, " ];
const userName = "Jorge";
const date = new Date();

function gtoday() {
  const time = date.getHours();
  const day = date.getDate();
  const weekDay = diasSemana[date.getDay()];

  const wish = document.querySelector(".pwish");
  const numday = document.querySelector(".num");
  const shortday = document.querySelector(".day");

  let timePosition = time > 23 ? 0 : isNaN(time) ? true: time < 7 ? 1 : time < 14 ? 2 : 3;

  numday.innerHTML = day;
  shortday.innerHTML = weekDay;

  switch (timePosition) {
    case 1:
      wish.innerHTML = saludos[1] + userName;
      break;
  
    case 2:
      wish.innerHTML = saludos[2] + userName;
      break;
    
    case 3:
      wish.innerHTML = saludos[3] + userName;
      break;

    case 0:
    default:
      wish.innerHTML = saludos[0] + userName;
      break;
  }

  return numday, shortday;
}

gtoday();