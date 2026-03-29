// Botón volver arriba
const btnTop = document.getElementById("btn-top");

window.addEventListener("scroll", () => {
  btnTop.classList.toggle("visible", window.scrollY > 400);
});

btnTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Fade-in
const fadeEls = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add("visible"), i * 80);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeEls.forEach(el => fadeObserver.observe(el));

// Animación barras
const skillCards = document.querySelectorAll(".skill-card");

const barObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector(".skill-fill");
        if (fill) fill.style.width = fill.dataset.width;
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

skillCards.forEach(card => barObserver.observe(card));

// Formulario
document.getElementById("contact-form").addEventListener("submit", e => {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensaje = document.getElementById("mensaje").value.trim();

  if (!nombre || !email || !mensaje) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  const msg = document.getElementById("form-success");
  msg.style.display = "block";

  setTimeout(() => {
    msg.style.display = "none";
    e.target.reset();
  }, 2500);
});