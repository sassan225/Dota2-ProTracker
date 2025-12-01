const tabs = document.querySelectorAll(".top-menu li");
const sections = document.querySelectorAll("main section");

tabs.forEach((tab, idx) => {
  tab.addEventListener("click", () => {
    // Cambiar pestaña activa en menú
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    // Mostrar sección correspondiente
    sections.forEach(s => s.classList.add("hidden"));
    sections[idx].classList.remove("hidden");
  });
});
