/**
 * Entry point — النادي العقاري
 *
 * Components live in js/components/ and register themselves on window.RealClub.
 * Every script is loaded with `defer`, so the DOM is parsed by the time this
 * runs and the page needs no build step to open straight from disk.
 */
(function (RealClub) {
  'use strict';

  /**
   * The partner marquee loops by translating a full group width, which needs a
   * second identical group trailing the first. It is cloned here rather than
   * duplicated in the markup so the logo list stays authored once.
   */
  function initMarquee() {
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-marquee]'),
      function (marquee) {
        var group = marquee.querySelector('[data-marquee-group]');
        if (!group) return;

        var clone = group.cloneNode(true);
        clone.setAttribute('aria-hidden', 'true');
        // The duplicate is decorative; keep it out of the tab order.
        Array.prototype.forEach.call(clone.querySelectorAll('img'), function (img) {
          img.setAttribute('alt', '');
        });
        marquee.appendChild(clone);
      }
    );
  }

  function start() {
    RealClub.initNavigation();
    RealClub.initGallery();
    RealClub.initProjectDialog();
    RealClub.initReveal();
    initMarquee();
  }

  start();
})((window.RealClub = window.RealClub || {}));
