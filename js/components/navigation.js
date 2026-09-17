/**
 * Navigation
 * ----------
 * Sticky header state, the mobile drawer (with a focus trap), scroll-spy for
 * the active link, and the reveal of the persistent WhatsApp button.
 */
(function (RealClub) {
  'use strict';

  var FOCUSABLE = 'a[href], button:not([disabled])';

  RealClub.initNavigation = function () {
    var header = document.getElementById('site-header');
    var drawer = document.getElementById('drawer');
    var openBtn = document.getElementById('nav-toggle');
    var closeBtn = document.getElementById('drawer-close');

    if (header) initStickyHeader(header);
    if (drawer && openBtn && closeBtn) initDrawer(drawer, openBtn, closeBtn);
    initScrollSpy();
    initFloatingCta();
  };

  /* ---- Sticky header ---------------------------------------------------- */

  function initStickyHeader(header) {
    var ticking = false;

    function update() {
      header.classList.toggle('is-stuck', window.scrollY > 24);
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(update);
    }, { passive: true });

    update();
  }

  /* ---- Mobile drawer ---------------------------------------------------- */

  function initDrawer(drawer, openBtn, closeBtn) {
    var isOpen = false;

    function setOpen(next) {
      if (next === isOpen) return;
      isOpen = next;

      drawer.classList.toggle('is-open', isOpen);
      drawer.setAttribute('aria-hidden', String(!isOpen));
      openBtn.setAttribute('aria-expanded', String(isOpen));

      if (isOpen) {
        // Compensate for the scrollbar so locking the body doesn't shift layout.
        var gap = window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden';
        if (gap > 0) document.body.style.paddingInlineEnd = gap + 'px';
        closeBtn.focus();
      } else {
        document.body.style.overflow = '';
        document.body.style.paddingInlineEnd = '';
        openBtn.focus();
      }
    }

    openBtn.addEventListener('click', function () { setOpen(true); });
    closeBtn.addEventListener('click', function () { setOpen(false); });

    // Closing on link click lets the browser's own anchor scroll take over
    // with the body already unlocked.
    drawer.addEventListener('click', function (event) {
      if (event.target.closest('a[href]')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
      if (!isOpen) return;

      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }

      if (event.key !== 'Tab') return;

      var items = Array.prototype.filter.call(
        drawer.querySelectorAll(FOCUSABLE),
        function (el) { return el.offsetParent !== null; }
      );
      if (!items.length) return;

      var first = items[0];
      var last = items[items.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    });

    // A resize past the breakpoint leaves a hidden drawer holding the scroll lock.
    window.addEventListener('resize', function () {
      if (isOpen && window.innerWidth > 1180) setOpen(false);
    });
  }

  /* ---- Scroll spy -------------------------------------------------------- */

  function initScrollSpy() {
    var links = Array.prototype.slice.call(
      document.querySelectorAll('.nav__link[href^="#"], .drawer__link[href^="#"]')
    );
    if (!links.length || !('IntersectionObserver' in window)) return;

    var sections = links
      .map(function (link) { return document.querySelector(link.getAttribute('href')); })
      .filter(function (section, index, all) {
        return section && all.indexOf(section) === index;
      });

    var visible = new Set();

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) visible.add(entry.target.id);
        else visible.delete(entry.target.id);
      });

      // With several sections in view, the topmost one wins.
      var current = sections
        .filter(function (section) { return visible.has(section.id); })
        .map(function (section) { return section.id; })[0];

      links.forEach(function (link) {
        link.classList.toggle('is-active', link.getAttribute('href') === '#' + current);
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });

    sections.forEach(function (section) { observer.observe(section); });
  }

  /* ---- Floating CTA ------------------------------------------------------ */

  function initFloatingCta() {
    var float = document.getElementById('whatsapp-float');
    var heroCta = document.getElementById('hero-cta');
    if (!float) return;

    // No observer support, or no hero button to hide behind: just show it.
    if (!heroCta || !('IntersectionObserver' in window)) {
      float.classList.add('is-visible');
      return;
    }

    new IntersectionObserver(function (entries) {
      float.classList.toggle('is-visible', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(heroCta);
  }
})((window.RealClub = window.RealClub || {}));
