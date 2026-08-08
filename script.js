/* =========================================================
   MAX Training — interacciones
   ========================================================= */
(function () {
  'use strict';

  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Año del footer ---------- */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ---------- Menú móvil ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('nav');

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var abierto = nav.classList.toggle('is-open');
      burger.classList.toggle('is-open', abierto);
      burger.setAttribute('aria-expanded', String(abierto));
      burger.setAttribute('aria-label', abierto ? 'Cerrar menú' : 'Abrir menú');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        nav.classList.remove('is-open');
        burger.classList.remove('is-open');
        burger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Sombra del header al hacer scroll + botón flotante ---------- */
  var header = document.getElementById('header');
  var fab = document.querySelector('.fab');

  function onScroll() {
    var y = window.scrollY;
    if (header) header.classList.toggle('is-scrolled', y > 20);
    if (fab) fab.classList.toggle('is-visible', y > 700);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Animaciones de entrada ---------- */
  var revelables = document.querySelectorAll('.reveal');

  if (reducedMotion || !('IntersectionObserver' in window)) {
    revelables.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var obs = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada, i) {
        if (!entrada.isIntersecting) return;
        var el = entrada.target;
        el.style.transitionDelay = (i * 80) + 'ms';
        el.classList.add('is-visible');
        obs.unobserve(el);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revelables.forEach(function (el) { obs.observe(el); });
  }

  /* ---------- Enlace activo en la navegación ---------- */
  var enlaces = Array.prototype.slice.call(document.querySelectorAll('.nav__list a'));
  var secciones = enlaces
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  if (secciones.length && 'IntersectionObserver' in window) {
    var obsNav = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (entrada) {
        if (!entrada.isIntersecting) return;
        enlaces.forEach(function (a) {
          a.classList.toggle('is-active', a.getAttribute('href') === '#' + entrada.target.id);
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    secciones.forEach(function (s) { obsNav.observe(s); });
  }

  /* ---------- Formulario de contacto ---------- */
  var form = document.getElementById('form');
  var estado = document.getElementById('form-status');

  function mostrarError(campo, mensaje) {
    var span = document.querySelector('[data-error-for="' + campo.id + '"]');
    if (span) span.textContent = mensaje;
    campo.classList.toggle('is-invalid', Boolean(mensaje));
  }

  function validar() {
    var ok = true;
    var nombre = document.getElementById('nombre');
    var email = document.getElementById('email');
    var mensaje = document.getElementById('mensaje');
    var privacidad = document.getElementById('privacidad');

    if (!nombre.value.trim()) { mostrarError(nombre, 'Escribe tu nombre.'); ok = false; }
    else mostrarError(nombre, '');

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.value.trim())) {
      mostrarError(email, 'Introduce un email válido.'); ok = false;
    } else mostrarError(email, '');

    if (mensaje.value.trim().length < 10) {
      mostrarError(mensaje, 'Cuéntame un poco más (mínimo 10 caracteres).'); ok = false;
    } else mostrarError(mensaje, '');

    var errPriv = document.querySelector('[data-error-for="privacidad"]');
    if (!privacidad.checked) {
      if (errPriv) errPriv.textContent = 'Debes aceptar la política de privacidad.';
      ok = false;
    } else if (errPriv) errPriv.textContent = '';

    return ok;
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      estado.className = 'form__status';

      if (!validar()) {
        estado.textContent = 'Revisa los campos marcados.';
        estado.classList.add('is-error');
        return;
      }

      // TODO: conectar con el backend o servicio de formularios (Formspree, EmailJS, etc.)
      estado.textContent = '¡Gracias! He recibido tu mensaje y te respondo en menos de 24 h.';
      estado.classList.add('is-ok');
      form.reset();
    });

    form.addEventListener('input', function (e) {
      if (e.target.classList.contains('is-invalid')) mostrarError(e.target, '');
    });
  }

  /* ---------- Scroll suave compensando el header fijo ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#' || id.length < 2) return;
      var destino = document.querySelector(id);
      if (!destino) return;
      e.preventDefault();
      var offset = header ? header.offsetHeight : 0;
      var top = destino.getBoundingClientRect().top + window.scrollY - offset + 1;
      window.scrollTo({ top: top, behavior: reducedMotion ? 'auto' : 'smooth' });
    });
  });
})();
