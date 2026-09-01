/* enhancements.js
   Additive. Does not touch anything in js/script.js (theme toggle, mobile menu,
   footer year). Loaded after it. */
(function () {
  'use strict';

  var root = document.documentElement;
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Signals to CSS that JS is available, so .eh-reveal elements may start hidden.
  if (!reduced && 'IntersectionObserver' in window) {
    root.classList.add('eh-js');
  }

  document.addEventListener('DOMContentLoaded', function () {

    /* --- Reveal on scroll ------------------------------------------------ */
    var reveals = document.querySelectorAll('.eh-reveal');
    if (reveals.length && root.classList.contains('eh-js')) {
      var revealObserver = new IntersectionObserver(function (entries, obs) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        });
      }, { rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

      reveals.forEach(function (el) { revealObserver.observe(el); });
    }

    /* --- Count up the figures band -------------------------------------- */
    var figures = document.querySelectorAll('.eh-figure__value[data-value]');
    if (!figures.length) return;

    function countUp(el) {
      var target = parseFloat(el.getAttribute('data-value'));
      if (isNaN(target)) return;
      var suffix = el.getAttribute('data-suffix') || '';
      var duration = 1100;
      var start = null;

      function frame(now) {
        if (start === null) start = now;
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased).toLocaleString() + suffix;
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    }

    if (reduced || !('IntersectionObserver' in window)) {
      figures.forEach(function (el) {
        var v = parseFloat(el.getAttribute('data-value'));
        if (!isNaN(v)) {
          el.textContent = v.toLocaleString() + (el.getAttribute('data-suffix') || '');
        }
      });
      return;
    }

    var figureObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        countUp(entry.target);
        obs.unobserve(entry.target);
      });
    }, { threshold: 0.4 });

    figures.forEach(function (el) { figureObserver.observe(el); });
  });
})();
