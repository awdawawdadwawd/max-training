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

  /* ---------- Videos de la galería ----------
     Solo se descargan y reproducen cuando entran en pantalla, para no
     gastar datos de quien nunca baja hasta ahí. */
  var videos = document.querySelectorAll('.galeria video');

  function conControles(v) { v.controls = true; v.preload = 'metadata'; }

  if (videos.length) {
    if (reducedMotion || !('IntersectionObserver' in window)) {
      videos.forEach(conControles);
    } else {
      var obsVid = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (entrada) {
          var v = entrada.target;
          if (!entrada.isIntersecting) { v.pause(); return; }
          var intento = v.play();
          // Si el navegador bloquea la reproducción automática, dejamos los controles
          if (intento && intento.catch) intento.catch(function () { conControles(v); });
        });
      }, { threshold: 0.35 });

      videos.forEach(function (v) { obsVid.observe(v); });
    }
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
