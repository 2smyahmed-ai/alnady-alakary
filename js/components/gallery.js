/**
 * Project gallery
 * ---------------
 * The track is a real overflow-scroll element with CSS scroll snapping, so
 * touch and trackpad gestures work with no JavaScript at all. This adds the
 * arrows, keyboard paging, and the progress rail.
 *
 * Positions come from element geometry and movement goes through
 * scrollIntoView, so none of it depends on the sign of scrollLeft in RTL.
 */
(function (RealClub) {
  'use strict';

  RealClub.initGallery = function () {
    Array.prototype.forEach.call(document.querySelectorAll('[data-gallery]'), setup);
  };

  function setup(root) {
    var viewport = root.querySelector('[data-gallery-viewport]');
    var prevBtn = root.querySelector('[data-gallery-prev]');
    var nextBtn = root.querySelector('[data-gallery-next]');
    var railFill = root.querySelector('[data-gallery-rail] span');
    if (!viewport) return;

    var track = viewport.firstElementChild;
    var slides = Array.prototype.slice.call(viewport.querySelectorAll('.project'));
    if (slides.length < 2) return;

    var active = 0;

    function goTo(index) {
      slides[clamp(index, 0, slides.length - 1)]
        .scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }

    function perPage() {
      var w = slides[0].getBoundingClientRect().width;
      return w ? Math.max(1, Math.round(viewport.clientWidth / w)) : 1;
    }

    function page(direction) {
      goTo(active + direction * Math.max(1, perPage() - 1));
    }

    function sync() {
      var bounds = viewport.getBoundingClientRect();
      var first = -1;
      var last = -1;

      slides.forEach(function (slide, index) {
        var r = slide.getBoundingClientRect();
        // on screen once most of the slide is inside the viewport
        var overlap = Math.min(r.right, bounds.right) - Math.max(r.left, bounds.left);
        if (overlap > r.width * 0.6) {
          if (first === -1) first = index;
          last = index;
        }
      });

      if (first === -1) return;
      active = first;

      if (prevBtn) prevBtn.disabled = first === 0;
      if (nextBtn) nextBtn.disabled = last === slides.length - 1;

      if (railFill && track) {
        var total = track.scrollWidth;
        var visible = viewport.clientWidth;
        var maxScroll = Math.max(0, total - visible);
        // RTL-safe: the track's trailing edge pulls away from the viewport's
        // as you scroll, whichever sign scrollLeft happens to use.
        var scrolled = clamp(track.getBoundingClientRect().right - bounds.right, 0, maxScroll);
        var width = Math.min(100, (visible / total) * 100);
        railFill.style.width = width + '%';
        railFill.style.insetInlineStart =
          (maxScroll ? (scrolled / maxScroll) * (100 - width) : 0) + '%';
      }
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { page(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { page(1); });

    viewport.addEventListener('keydown', function (event) {
      // In RTL the left arrow moves toward later projects.
      if (event.key === 'ArrowLeft') { event.preventDefault(); page(1); }
      else if (event.key === 'ArrowRight') { event.preventDefault(); page(-1); }
      else if (event.key === 'Home') { event.preventDefault(); goTo(0); }
      else if (event.key === 'End') { event.preventDefault(); goTo(slides.length - 1); }
    });

    viewport.addEventListener('scroll', onFrame(sync), { passive: true });
    window.addEventListener('resize', onFrame(sync), { passive: true });

    root.classList.add('is-ready');
    sync();
  }

  function clamp(v, min, max) { return Math.min(Math.max(v, min), max); }

  function onFrame(fn) {
    var queued = false;
    return function () {
      if (queued) return;
      queued = true;
      window.requestAnimationFrame(function () { queued = false; fn(); });
    };
  }
})((window.RealClub = window.RealClub || {}));
