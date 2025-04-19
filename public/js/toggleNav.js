document.addEventListener('DOMContentLoaded', () => {
  // Selecciona el botón con el ícono "ti-chevron-left-pipe xl"
  const toggleButton = document.querySelector('button i.ti-chevron-left-pipe.xl')?.parentElement;

  if (!toggleButton) {
      console.error("No se encontró el botón con el ícono 'ti-chevron-left-pipe xl'.");
      return;
  }

  // Estado inicial para alternar
  let isCollapsed = false;

  toggleButton.addEventListener('click', () => {
      // Selecciona todos los elementos que contienen texto, excluyendo <i>
      const navTexts = document.querySelectorAll('.nav *:not(i)');

      navTexts.forEach((element) => {
          // Procesa todos los nodos hijos del elemento
          Array.from(element.childNodes).forEach((child) => {
              if (child.nodeType === Node.TEXT_NODE) { // Asegura que el nodo es un texto
                  if (!isCollapsed) {
                      // Ocultar texto si no está vacío
                      if (child.textContent.trim() !== '') {
                          // Verifica que `dataset` esté disponible y almacena el texto original
                          if (!child.dataset) {
                              child.dataset = {}; // Crea un dataset vacío si no existe
                          }
                          child.dataset.originalText = child.textContent.trim(); // Guarda el texto
                          child.textContent = ''; // Borra el texto
                      }
                  } else {
                      // Restaurar texto si estaba oculto
                      if (child.dataset && child.dataset.originalText) {
                          child.textContent = child.dataset.originalText; // Restaura el texto
                          delete child.dataset.originalText; // Limpia el atributo temporal
                      }
                  }
              }
          });
      });

      // Alternar la clase del ícono
      const icon = toggleButton.querySelector('i');
      if (icon) {
          icon.className = isCollapsed
              ? 'ti ti-chevron-left-pipe xl'
              : 'ti ti-chevron-right-pipe xl';
      }

      // Cambiar el estado
      isCollapsed = !isCollapsed;
  });
});
