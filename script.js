/* ── 1. Botón volver al inicio ── */
var btnTop = document.getElementById('btn-top');

window.addEventListener('scroll', function () {
  btnTop.classList.toggle('visible', window.scrollY > 400);
});

btnTop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── 2. Fade-in al hacer scroll ── */
/* Observer para animaciones de entrada cuando elementos entran en viewport */
var fadeEls = document.querySelectorAll('.fade-in');

var fadeObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry, i) {
    if (entry.isIntersecting) {
      setTimeout(function () {
        entry.target.classList.add('visible');
      }, i * 80);
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(function (el) { fadeObserver.observe(el); });

/* ── 3. Animación barras de habilidades ── */
var skillCards = document.querySelectorAll('.skill-card');

var barObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      var progress = entry.target.querySelector('.skill-progress');
      if (progress) progress.value = progress.getAttribute('data-value');
      barObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillCards.forEach(function (card) { barObserver.observe(card); });

/* ── 4. Formulario de contacto ── */
/* Validación básica del formulario y simulación de envío */
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  var fullName   = document.getElementById('name').value.trim();
  var email      = document.getElementById('email').value.trim();
  var messageTxt = document.getElementById('message').value.trim();

  if (!fullName || !email || !messageTxt) {
    alert('Todos los campos son obligatorios.');
    return;
  }

  var msg = document.getElementById('form-success');
  msg.style.display = 'block';

  setTimeout(function () {
    msg.style.display = 'none';
    document.getElementById('contact-form').reset();
  }, 2500);
});

/* ── 5. Exportar a PDF ── */
document.getElementById('btn-pdf').addEventListener('click', function () {
  // Hacer visibles todos los elementos fade-in antes de imprimir
  document.querySelectorAll('.fade-in').forEach(function (el) {
    el.classList.add('visible');
  });

  // Forzar barras de habilidades al ancho correcto
  document.querySelectorAll('.skill-progress').forEach(function (progress) {
    progress.value = progress.getAttribute('data-value');
  });

  // Pequeña pausa para que los estilos se apliquen, luego imprimir
  setTimeout(function () {
    window.print();
  }, 150);
});

/* ── 6. Modo oscuro ── */
document.getElementById('theme-toggle').addEventListener('click', function () {
  document.body.classList.toggle('dark-mode');
  var icon = this.textContent;
  this.textContent = icon === '🌙' ? '☀️' : '🌙';
});
