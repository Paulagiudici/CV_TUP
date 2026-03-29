/* ───────────────────────────────
   1. Botón "Volver al inicio"
──────────────────────────────── */
var btnTop = document.getElementById("btn-top");

btnTop.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", function () {
  if (window.scrollY > 400) {
    btnTop.classList.add("visible");
  } else {
    btnTop.classList.remove("visible");
  }
});

/* ───────────────────────────────
   2. Fade-in al hacer scroll
──────────────────────────────── */
var fadeEls = document.querySelectorAll(".fade-in");

var fadeObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry, i) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add("visible");
        }, i * 70);
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

fadeEls.forEach(function (el) {
  fadeObserver.observe(el);
});

/* ───────────────────────────────
   3. Animación barras de skills
──────────────────────────────── */
var skillCards = document.querySelectorAll(".skill-card");

var barObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var fill = entry.target.querySelector(".skill-fill");
        if (fill) {
          fill.style.width = fill.getAttribute("data-width");
        }
        barObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

skillCards.forEach(function (card) {
  barObserver.observe(card);
});

/* ───────────────────────────────
   4. Formulario de contacto
──────────────────────────────── */
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault();

  var nombre = document.getElementById("nombre").value.trim();
  var email = document.getElementById("email").value.trim();
  var mensaje = document.getElementById("mensaje").value.trim();

  if (nombre === "" || email === "" || mensaje === "") {
    alert("Por favor completá todos los campos.");
    return;
  }

  document.getElementById("form-success").style.display = "block";

  setTimeout(() => {
    document.getElementById("form-success").style.display = "none";
    e.target.reset();
  }, 2500);
});