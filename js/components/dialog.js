/**
 * Project detail dialog
 * ---------------------
 * Built on the native <dialog>: the focus trap, Escape to close, the backdrop
 * and inert background content all come for free, so this file only moves the
 * right content in and out.
 *
 * Each project keeps its detail markup in a <template> beside the card, so the
 * copy lives in the HTML where it can be read and edited, not in a JS object.
 */
(function (RealClub) {
  'use strict';

  RealClub.initProjectDialog = function () {
    var dialog = document.getElementById('project-dialog');
    var triggers = document.querySelectorAll('[data-project-open]');
    if (!dialog || !triggers.length) return;

    // No native dialog support: leave the cards static rather than wiring up
    // a trigger that would open nothing.
    if (typeof dialog.showModal !== 'function') return;

    var body = dialog.querySelector('[data-dialog-body]');
    var closeBtn = dialog.querySelector('[data-dialog-close]');
    var lastTrigger = null;

    Array.prototype.forEach.call(triggers, function (trigger) {
      trigger.addEventListener('click', function () {
        var host = trigger.closest('[data-project]');
        var template = host && host.querySelector('template');
        if (!template) return;

        body.replaceChildren(template.content.cloneNode(true));
        lastTrigger = trigger;
        dialog.showModal();
        // Focus the dialog itself rather than letting showModal land on the
        // close button, which opens every project under a focus ring.
        dialog.focus();
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', function () { dialog.close(); });
    }

    // The dialog box is padding-free, so a click that lands on the element
    // itself came from the backdrop.
    dialog.addEventListener('click', function (event) {
      if (event.target === dialog) dialog.close();
    });

    dialog.addEventListener('close', function () {
      body.replaceChildren();
      document.body.style.overflow = '';
      if (lastTrigger) lastTrigger.focus();
    });

    // Mark the galleries as dialog-capable so the triggers become visible.
    Array.prototype.forEach.call(
      document.querySelectorAll('[data-gallery], [data-feature]'),
      function (el) { el.classList.add('has-dialog'); }
    );
  };
})((window.RealClub = window.RealClub || {}));
