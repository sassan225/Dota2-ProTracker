# MANUAL TÉCNICO – Dota 2 Pro Tracker

## 1. Introducción Técnica

El presente documento describe la arquitectura interna, tecnologías empleadas, estructura de carpetas y funcionamiento técnico del proyecto **Dota 2 Pro Tracker**, desarrollado como parte del curso de Programación Web I.

El objetivo es dejar registro detallado del funcionamiento del sitio, facilitando su mantenimiento y futuras mejoras, tales como modularización, autenticación real o integración con frameworks modernos.



## 2. Tecnologías Utilizadas

### Frontend
- **HTML5**
- **CSS3** (un solo archivo: `styles.css`)
- **JavaScript Vanilla (ES6)** — sin frameworks, sin librerías externas.

> No se utilizaron frameworks como React, Angular, Vue, ni preprocesadores como Sass.  
> Tampoco se usó Node.js, Webpack ni herramientas de bundling.



###  APIs Integradas
- **OpenDota API**  
  Usada para estadísticas de héroes, meta, rankings y datos generales.

- **Dotabuff API (no oficial / endpoints públicos)**  
  Usada para consultar builds, counters y tendencias del meta.

- **YouTube Data API v3**  
  Usada para cargar videos en la sección Home.

> Se evaluó usar una API informativa de terceros que requería 7 días de aprobación, pero se descartó por limitaciones de tiempo académico.



## 3. Estructura del Proyecto

La estructura final del proyecto se organizó así:

/index.html
/css
└── styles.css

/js
└── script.js

/imagenes
└── imágenes de héroes, fondos, jugadores

/logos
└── logo principal y variantes

/documentación
├── README.md (Manual de Usuario)
├── MANUAL_TECNICO.md (este archivo)
└── /capturas (solo si se requieren screenshots)


### Justificación de la estructura
Se intentó inicialmente utilizar archivos HTML separados y una arquitectura modular con imports en CSS/JS.  
Sin embargo:

- Requería Node.js u otras herramientas para gestionar imports reales.
- Superaba el alcance del curso Programación Web I.
- Complicaba el despliegue y mantenimiento sin un entorno backend.

Por ello se optó por una estructura **simple y totalmente funcional**, con:

- **Un solo HTML**
- **Un solo CSS**
- **Un solo JS**



## 4. Descripción Técnica del Funcionamiento

### 4.1 HTML — `index.html`

El archivo principal contiene **todas las vistas** del sitio mediante `<section>`:

- Home (carrusel, texto dinámico, videos)
- Meta
- Héroes
- Jugadores
- Footer
- Modals de Login / Signup

#### Contiene:
- Carrusel de héroes (horizontal)
- Carrusel de texto animado
- Grilla de videos (YouTube API)
- Tarjetas de héroes dinámicas (API)
- Tabla de meta (API)
- Modals con formularios

### 4.2 CSS — `/css/styles.css`

Archivo único con +1000 líneas.

Incluye estilos para:

- Layout general (wrapper, secciones)
- Barra de navegación superior
- Carrusel de héroes (prev / next)
- Carrusel de texto automático
- Tablas de estadísticas META
- Tarjetas de héroes
- Cards de jugadores
- Ventanas modales de Login / Signup
- Estilos responsive básicos



### 4.3 JavaScript — `/js/script.js`

Es el núcleo funcional de la web.

#### Principales módulos implementados:

### Navegación entre secciones
- Oculta todas las secciones con `.hidden`
- Activa la vista seleccionada por el usuario
- Actualiza la clase `.active` del menú

###  Carrusel de héroes
- Movimiento horizontal
- Botones prev/next
- Animación suave

### Carrusel de texto automático
- Cambia frases cada pocos segundos
- Usa transiciones en CSS y timers JS

###  Manejo de modals (Login / Signup)
- Abrir/cerrar modals
- Transiciones
- Cambio entre login ↔ signup
- Validación básica de campos

###  Búsqueda de héroes
- Filtrado dinámico por nombre
- Resultados renderizados en tarjetas

### Integración con APIs
Fetch a:

- OpenDota → héroes, estadísticas, meta
- Dotabuff → builds, counters (endpoints públicos)
- YouTube → videos relacionados

Estructura general:

```js
fetch(url)
  .then(res => res.json())
  .then(data => renderAlgo(data))
  .catch(err => console.error(err));
<!-- Captura sugerida: funciones JS principales -->
5. Integración con APIs
5.1 OpenDota API
Usada para obtener:

Listado completo de héroes

Winrate

Pickrate

Meta actual

Tendencias del juego

5.2 Dotabuff (no oficial)
Usada para:

Builds recomendadas

Counters

Estadísticas complementarias

5.3 YouTube API
Permite:

Buscar videos relacionados con Dota 2

Mostrar título, miniatura y enlace

6. Limitaciones Técnicas
No se implementó autenticación real (solo simulación en modal).

No se modularizó el JS por falta de un entorno Node.js.

Las APIs externas pueden fallar según disponibilidad o límite diario.

El proyecto no es totalmente responsive.

El diseño está optimizado para navegadores modernos, no para móviles antiguos.

7. Conclusiones Técnicas
El proyecto Dota 2 Pro Tracker demuestra una integración eficaz entre HTML5, CSS3 y JavaScript Vanilla, complementada con consumo de múltiples APIs externas.

Se destaca:

Buen manejo del DOM

Uso apropiado de fetch() y JSON

Navegación dinámica sin recargar páginas

Arquitectura clara y extensible

Separación adecuada de archivos

La estructura del proyecto permite futuras mejoras, como:

Migrar a React/Vue

Implementar autenticación real

Modularización del código JS

Uso de bases de datos

Aplicación responsive completa

