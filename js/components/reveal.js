/**
 * Scroll reveal
 * -------------
 * Elements are only hidden once this file confirms it can observe them, so a
 * failed script leaves the page fully readable rather than blank.
 */
(function (RealClub) {
  'use strict';

  RealClub.initReveal = function () {
    var targets = document.querySelectorAll('[data-reveal]');
    if (!targets.length) return;

    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !('IntersectionObserver' in window)) return;

    document.documentElement.classList.add('js-reveal');

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-revealed');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    Array.prototype.forEach.call(targets, function (target) {
      observer.observe(target);
    });
  };
})((window.RealClub = window.RealClub || {}));
