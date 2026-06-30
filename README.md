# Diego Gómez — Portfolio Web 

[![Angular](https://img.shields.io/badge/Angular-20.3-DD0031.svg?logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![NestJS](https://img.shields.io/badge/NestJS-Compatible-E0234E.svg?logo=nestjs)](https://nestjs.com/)

Este repositorio contiene la aplicación frontend del portafolio web personal de **Diego Gómez**.

El portafolio sirve no solo como carta de presentación, sino también como demostración interactiva de habilidades frontend avanzadas (animaciones sutiles, canvas interactivos, gestión de estados con Signals, soporte bilingüe e integración fluida de temas) y para conseguir clientes potenciales, mediante formularios y comunicación directa.

---

## Índice

1. [Características Clave](#características-clave)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Estructura del Proyecto](#estructura-del-proyecto)
4. [Configuración y Desarrollo](#configuración-y-desarrollo)
5. [Arquitectura y Flujo de Datos](#arquitectura-y-flujo-de-datos)


## Características Clave

### 1. Sistema de Temas y Colores Dinámico
Permite alternar entre **Modo Claro** y **Modo Oscuro**, además de seleccionar entre 4 acentos de color integrados (*Carmín*, *Índigo*, *Pino*, *Ciruela*) o elegir un **color personalizado** libre mediante un selector nativo (`<input type="color">`). Los valores se aplican a través de variables CSS y se persisten en `localStorage`.

### 2. Canvas Reactivo (Dot Grid)
La sección del Hero incluye un fondo de rejilla de puntos en Canvas HTML5. Los puntos reaccionan dinámicamente al movimiento del cursor: crecen en radio, se tiñen gradualmente con el color de acento y se desplazan físicamente simulando una fuerza de repulsión.
> [!NOTE]
> Este canvas se deshabilita automáticamente y muestra un fallback de rejilla estática si se detecta que el usuario prefiere movimiento reducido (`prefers-reduced-motion: reduce`) para optimizar el rendimiento y la accesibilidad.

### 3. Internacionalización (i18n) Bilingüe
Soporte nativo para cambio de idioma instantáneo entre **Español (ES)** y **Inglés (EN)**. Gestionado por signals reactivas y un Pipe impuro para evitar parpadeos de contenido (FOUC).

### 4. Navegación e Intercepción del Scroll (Desktop)
En pantallas grandes, el scroll vertical del sitio se bloquea/intercepta parcialmente para proveer una navegación fluida por secciones ("Chapters") tipo presentación, con transiciones suaves basadas en un `IntersectionObserver` y control de teclado (flechas / PageDown / PageUp).

### 5. Micro-interacciones Avanzadas (Directivas Custom)
*   **Tilt 3D (`appTilt`):** Inclinación interactiva de las tarjetas Bento al pasar el cursor.
*   **Efecto Magnético (`appMagnetic`):** Los botones principales se desplazan sutilmente persiguiendo el cursor dentro de su rango.
*   **Revelado Progresivo (`appReveal`):** Entrada escalonada (staggered animation) de elementos cuando entran al viewport mediante `IntersectionObserver`.
*   **Cursor Personalizado (`appCursorRing`):** Un anillo sutil que sigue con un retraso orgánico al puntero del mouse en pantallas de escritorio.

---

## Stack Tecnológico

El proyecto está construido sobre:
*   **Framework:** [Angular v20](https://angular.dev/) (Standalone Components, Signals, dynamic effects).
*   **Estilos:** [SCSS / SASS](https://sass-lang.com/) con tokens CSS flexibles y funciones de color modernas como `color-mix()` de la especificación CSS.
*   **Gestión de Estados Asíncronos:** [@tanstack/angular-query-experimental](https://tanstack.com/query/latest/docs/framework/angular/overview) para queries, caché y optimizaciones en la comunicación asíncrona.
*   **API Client:** `HttpClient` nativo estructurado para el envío de formularios.
*   **Calidad de Código:** ESLint configurado bajo las directivas de `@angular-eslint`.

---

## Estructura del Proyecto

Arquitectura de directorios del proyecto:

```bash
portfolio-web/
├── public/                     # Recursos y assets estáticos públicos (logos, iconos)
├── src/
│   ├── app/
│   │   ├── core/               # Lógica global del sistema (Core)
│   │   │   ├── guards/         # Guardas de seguridad y navegación
│   │   │   ├── i18n/           # Diccionario bilingüe (translations.ts)
│   │   │   ├── interceptors/   # Interceptores HTTP
│   │   │   └── services/       # Servicios singleton (Theme, Locale, Navigation, Contact)
│   │   │
│   │   ├── features/           # Componentes de sección y páginas (Features)
│   │   │   ├── contact/        # Sección y formulario de contacto
│   │   │   ├── demos/          # Sección "Work" con las demos de proyectos
│   │   │   ├── hero/           # Hero principal y rejilla interactiva de arquitectura
│   │   │   └── services-section/# Tarjetas Bento detallando los servicios ofrecidos
│   │   │
│   │   ├── shared/             # Componentes, directivas y utilidades compartidas
│   │   │   ├── components/     # Componentes compartidos (ThemeControl, DotGrid)
│   │   │   ├── directives/     # Directivas de micro-interacciones (Magnetic, Tilt, Reveal, Parallax)
│   │   │   └── pipes/          # Pipe de traducción instantánea (TranslatePipe)
│   │   │
│   │   ├── app.component.ts    # Shell principal de la app y orquestador del scroll por secciones
│   │   ├── app.config.ts       # Proveedores globales de Angular, Router y Angular Query
│   │   └── app.routes.ts       # Definición de rutas del sistema
│   │
│   ├── assets/                 # Recursos locales del build
│   ├── environments/           # Variables de entorno (Desarrollo / Producción)
│   ├── index.html              # Template base, metas SEO y JSON-LD estructurado
│   ├── main.ts                 # Punto de entrada de la aplicación Angular
│   └── styles.scss             # Hoja de estilos global, diseño de tokens y utilidades
├── angular.json                # Configuración del compilador Angular CLI
├── Dockerfile.dev              # Entorno de desarrollo contenerizado
├── vercel.json                 # Configuración de redirecciones para despliegue en Vercel
└── package.json                # Scripts y dependencias de npm
```
---

## Configuración y Desarrollo

### Prerrequisitos
*   [Node.js](https://nodejs.org/) v20.x o superior.
*   NPM v10.x o superior.

### Instalación Local

1. Clonar el repositorio y acceder a la carpeta:
   ```bash
   git clone <url-del-repositorio>
   cd portfolio-web
   ```

2. Instalar las dependencias de NPM:
   ```bash
   npm install
   ```

### Servidor de Desarrollo

Inicia un servidor local de desarrollo con recarga rápida automática:
```bash
npm start
```
Abre tu navegador en `http://localhost:4200` para ver los resultados.

### Servidor de Desarrollo en Docker

Si prefieres usar un entorno contenerizado aislado para desarrollo:
```bash
# Construir la imagen de desarrollo
docker build -f Dockerfile.dev -t portfolio-web-dev .

# Ejecutar el contenedor mapeando el puerto 4200 y montando el volumen
docker run -p 4200:4200 -v ${PWD}:/app portfolio-web-dev
```

### Compilación y Producción

Genera el paquete optimizado y listo para desplegar:
```bash
npm run build:prod
```
La salida se compila en el directorio `dist/portfolio-web`.

### Verificación y Linter

Para correr las pruebas de análisis estático (linter):
```bash
npm run lint
```

Para correr las pruebas unitarias con Karma y Jasmine:
```bash
npm run test
```

---

## Arquitectura y Flujo de Datos

El sitio se conecta a un backend dedicado para procesar y enviar el formulario de contacto.
*   **Endpoint de Desarrollo:** `http://localhost:3000/contact` (configurado en `environment.ts`).
Al rellenar el formulario de contacto, los inputs se validan de forma reactiva (mínimo de caracteres, formato de correo) y se envían asíncronamente con un estado visual de carga (`idle` -> `submitting` -> `success` / `error`).

---
