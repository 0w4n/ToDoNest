function shareMsg() {
  const message = `¡He completado ${completedCycles} ciclos de estudio! 
    Tiempo total de estudio: ${totalStudyTime} minutos.
    ¿Tú qué tal?`;
  if (navigator.share) {
    return navigator.share({
      title: "Mi Progreso de Estudio",
      text: message,
      url: window.location.href,
    });
  } else {
    return alert("Tu navegador no soporta la función de compartir");
  }
}
