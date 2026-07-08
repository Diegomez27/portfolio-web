const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Directorio de logos
const logosPath = path.join(__dirname, '..', 'public', 'logos');

// Cargar los archivos SVG originales
const angularSvg = fs.readFileSync(path.join(logosPath, 'angular.svg'), 'utf8');
const nestjsSvg = fs.readFileSync(path.join(logosPath, 'nestjs.svg'), 'utf8');
const typescriptSvg = fs.readFileSync(path.join(logosPath, 'typescript.svg'), 'utf8');
const postgresqlSvg = fs.readFileSync(path.join(logosPath, 'postgresql.svg'), 'utf8');
const dockerSvg = fs.readFileSync(path.join(logosPath, 'docker.svg'), 'utf8');

// Función para limpiar e inyectar atributos de posicionamiento en el tag SVG raíz
function cleanAndPositionSvg(svgStr, x, y, size = 28) {
  let clean = svgStr.replace(/<\?xml[^>]*\?>/g, '').trim();
  // Reemplazar el inicio del tag <svg por uno con x, y, width y height
  clean = clean.replace(/<svg\s+/i, `<svg x="${x}" y="${y}" width="${size}" height="${size}" `);
  return clean;
}

// Renombrar IDs de gradientes para Angular para evitar colisiones
let processedAngular = angularSvg
  .replace(/id="a"/g, 'id="angular-grad-a"')
  .replace(/url\(#a\)/g, 'url(#angular-grad-a)')
  .replace(/id="b"/g, 'id="angular-grad-b"')
  .replace(/url\(#b\)/g, 'url(#angular-grad-b)');

// Coordenadas de los logos (centrados en círculos de radio 24 a cy=420)
// cx para cada círculo: 472, 536, 600, 664, 728 (tamaño de logo = 28, por lo que x = cx - 14)
// cy de los círculos = 420 (por lo que y = cy - 14 = 406)
const inlineAngular = cleanAndPositionSvg(processedAngular, 458, 406, 28);
const inlineNestjs = cleanAndPositionSvg(nestjsSvg, 522, 406, 28);
const inlineTypescript = cleanAndPositionSvg(typescriptSvg, 586, 406, 28);
const inlinePostgresql = cleanAndPositionSvg(postgresqlSvg, 650, 406, 28);
const inlineDocker = cleanAndPositionSvg(dockerSvg, 714, 406, 28);

// SVG maestro centrado y limpio
const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Definición del patrón de cuadrícula de puntos -->
  <defs>
    <pattern id="dotGrid" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.2" fill="#E4DEC9" />
    </pattern>
  </defs>

  <!-- Fondo base con color hueso de la marca -->
  <rect width="1200" height="630" fill="#F5F2EB" />
  <rect width="1200" height="630" fill="url(#dotGrid)" />

  <!-- LOGO PRINCIPAL (Centrado arriba: x=570, y=80, tamaño=60) -->
  <g transform="translate(570, 80)">
    <rect width="60" height="60" rx="15" fill="#161013" />
    <rect x="2.25" y="2.25" width="55.5" height="55.5" rx="12.75" fill="none" stroke="#F1EDE3" stroke-opacity="0.16" stroke-width="1.2" />
    <path fill="#F1EDE3" fill-rule="evenodd" d="M13.5 13.5 H28.5 C40.5 13.5 48 21 48 30 C48 39 40.5 46.5 28.5 46.5 H13.5 Z M22.5 22.5 H27 C33 22.5 36.75 25.5 36.75 30 C36.75 34.5 33 37.5 27 37.5 H22.5 Z" />
    <circle cx="51" cy="42.75" r="4.65" fill="#E1432A" />
    <!-- Cicatriz de Luffy -->
    <g stroke="#9A9384" stroke-linecap="round" fill="none" stroke-width="2">
      <path d="M9.75 47.1 Q20.25 51.3 32.25 47.4" />
      <line x1="16.5" y1="50.4" x2="18.6" y2="45.45" />
      <line x1="21" y1="51" x2="23.1" y2="46.05" />
    </g>
  </g>

  <!-- TEXTOS DE IDENTIDAD (Centrados) -->
  <text x="600" y="174" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="28px" fill="#14130F">Diego Gómez</text>
  <text x="600" y="196" text-anchor="middle" font-family="'JetBrains Mono', 'Courier New', Courier, monospace" font-size="11.5px" letter-spacing="2" fill="#6B6657">// DESARROLLADOR FULL-STACK</text>

  <!-- TITULAR Y DESCRIPCIÓN BÁSICA (Centrados, sin copys exagerados) -->
  <text x="600" y="270" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-weight="800" font-size="46px" fill="#14130F" letter-spacing="-1">
    Desarrollo web a la medida<tspan fill="#6E1524">.</tspan>
  </text>

  <text x="600" y="324" text-anchor="middle" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif" font-size="19px" fill="#6B6657">
    Sistemas web, aplicaciones en tiempo real y bases de datos.
  </text>

  <!-- STACK DE TECNOLOGÍAS (Iconos redondeados más pequeños y alineados) -->
  <!-- Círculos de fondo para los iconos -->
  <circle cx="472" cy="420" r="24" fill="#FFFFFF" stroke="rgba(20, 19, 15, 0.08)" stroke-width="1.2" />
  <circle cx="536" cy="420" r="24" fill="#FFFFFF" stroke="rgba(20, 19, 15, 0.08)" stroke-width="1.2" />
  <circle cx="600" cy="420" r="24" fill="#FFFFFF" stroke="rgba(20, 19, 15, 0.08)" stroke-width="1.2" />
  <circle cx="664" cy="420" r="24" fill="#FFFFFF" stroke="rgba(20, 19, 15, 0.08)" stroke-width="1.2" />
  <circle cx="728" cy="420" r="24" fill="#FFFFFF" stroke="rgba(20, 19, 15, 0.08)" stroke-width="1.2" />

  <!-- Inyección de SVGs inline posicionados en cada círculo -->
  ${inlineAngular}
  ${inlineNestjs}
  ${inlineTypescript}
  ${inlinePostgresql}
  ${inlineDocker}

  <!-- URL Y DISPONIBILIDAD (Centrado abajo) -->
  <text x="600" y="530" text-anchor="middle" font-family="'JetBrains Mono', 'Courier New', Courier, monospace" font-size="14px" font-weight="bold" fill="#6B6657">
    diego-gomez-desarrollo-web.com <tspan fill="#2F9E44"> ● </tspan> disponible freelance
  </text>
</svg>
`;

const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');

console.log('Generando og-image.png centrada y con stack simplificado...');
sharp(Buffer.from(svg))
  .png()
  .toFile(outputPath)
  .then(info => {
    console.log(`¡Imagen OG generada exitosamente en: ${outputPath}!`);
    console.log(`Dimensiones: ${info.width}x${info.height}, Peso: ${info.size} bytes.`);
  })
  .catch(err => {
    console.error('Error al generar la imagen OG centrada:', err);
    process.exit(1);
  });
