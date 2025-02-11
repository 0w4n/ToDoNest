import puppeteer from 'puppeteer';
import fs from 'fs-extra';
import fetch from 'node-fetch';

// URL del tablero de Pinterest
const BOARD_URL = 'https://pin.it/2SQGAkpH2';

// Carpeta donde se guardarán las imágenes
const IMAGE_DIR = './images';

// Función principal
async function scrapePinterest() {
  console.log('🔧 Iniciando el proceso de scraping de Pinterest...');

  // Crear la carpeta si no existe
  console.log('📁 Verificando la existencia de la carpeta de imágenes...');
  await fs.ensureDir(IMAGE_DIR);
  console.log('✅ Carpeta verificada o creada correctamente.');

  // Lanzar el navegador sin sandbox
  console.log('🚀 Lanzando el navegador en modo headless...');
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--disable-gpu',
      '--no-zygote',
      '--single-process'
    ]
  });
  const page = await browser.newPage();

  console.log(`🌐 Abriendo el tablero de Pinterest: ${BOARD_URL}`);
  await page.goto(BOARD_URL, { waitUntil: 'load', timeout: 0 });
  console.log('✅ Tablero cargado correctamente.');

  // Desplazarse automáticamente para cargar todos los pines
  console.log('⬇️ Comenzando el desplazamiento para cargar todos los pines...');
  await autoScroll(page);
  console.log('✅ Desplazamiento completado. Todos los pines deberían estar cargados.');

  // Extraer URLs de las imágenes
  console.log('🔍 Extrayendo URLs de las imágenes...');
  const imageUrls = await page.evaluate(() => {
    const imgElements = document.querySelectorAll('img[src^="https://i.pinimg.com/originals/"]');
    return Array.from(imgElements).map(img => img.src);
  });

  console.log(`📸 Se encontraron ${imageUrls.length} imágenes para descargar.`);

  // Descargar las imágenes
  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];
    const imagePath = `${IMAGE_DIR}/image_${i + 1}.jpg`;

    console.log(`⬇️ Descargando imagen ${i + 1} de ${imageUrls.length}: ${imageUrl}`);

    try {
      const response = await fetch(imageUrl);
      const buffer = await response.buffer();
      await fs.writeFile(imagePath, buffer);
      console.log(`✅ Imagen ${i + 1} guardada en: ${imagePath}`);
    } catch (error) {
      console.error(`❌ Error descargando la imagen ${i + 1}:`, error);
    }
  }

  // Cerrar el navegador
  console.log('🛑 Cerrando el navegador...');
  await browser.close();
  console.log('✅ Navegador cerrado. Scraping completado exitosamente.');
}

// Función para desplazarse automáticamente por la página
async function autoScroll(page) {
  console.log('🔄 Iniciando desplazamiento automático en la página...');
  await page.evaluate(async () => {
    console.log('1');
    await new Promise((resolve) => {
      console.log('2');
      let totalHeight = 0;
      const distance = 100;
      const scrollDelay = 300;

      const timer = setInterval(() => {
        console.log('4');
        window.scrollBy(0, distance);
        totalHeight += distance;

        // Mostrar progreso en la consola del navegador
        console.log(`Desplazando... Altura actual: ${totalHeight}px`);

        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          console.log('🏁 Desplazamiento completo en la página.');
          resolve();
        }
      }, scrollDelay);
    });
  });
  console.log('🔽 Desplazamiento en la página finalizado.');
}

// Ejecutar el scraper
scrapePinterest();
