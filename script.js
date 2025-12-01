// --- Pestañas del menú ---
const tabs = document.querySelectorAll(".top-menu li");
const sections = document.querySelectorAll("main section");

tabs.forEach((tab, idx) => {
  tab.addEventListener("click", () => {
    // Cambiar pestaña activa
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // Mostrar sección correspondiente
    sections.forEach(s => s.classList.add("hidden"));
    sections[idx].classList.remove("hidden");
  });
});

// --- Carrusel de Home ---
const carouselTrack = document.querySelector(".carousel-track");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
let index = 0;

function moveCarousel() {
  const slides = carouselTrack.children;
  if(!slides.length) return;
  const width = slides[0].offsetWidth + 10; // ancho + margen
  carouselTrack.style.transform = `translateX(-${index * width}px)`;
}

// Botones
nextBtn.addEventListener("click", () => {
  const slides = carouselTrack.children;
  index = (index + 1) % slides.length;
  moveCarousel();
});

prevBtn.addEventListener("click", () => {
  const slides = carouselTrack.children;
  index = (index - 1 + slides.length) % slides.length;
  moveCarousel();
});

// Auto-slide cada 3 segundos
setInterval(() => {
  const slides = carouselTrack.children;
  index = (index + 1) % slides.length;
  moveCarousel();
}, 3000);
