/* Souls for Christ Ministries Zambia — editorial interactions. */
(function () {
  'use strict';

  var CHURCH_WHATSAPP = '260979918138';

  /* Mobile menu state and keyboard support */
  var menuButton = document.querySelector('.souls-burger');
  if (menuButton) {
    var syncMenu = function () {
      var open = document.body.classList.contains('offcanvas-menu');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    new MutationObserver(syncMenu).observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    syncMenu();

    document.querySelectorAll('.js-menu-toggle').forEach(function (control) {
      if (control.tagName === 'A' || control.tagName === 'BUTTON') return;
      control.addEventListener('keydown', function (event) {
        if (event.key !== 'Enter' && event.key !== ' ') return;
        event.preventDefault();
        control.click();
      });
    });

    document.addEventListener('keydown', function (event) {
      if (event.key !== 'Escape' || !document.body.classList.contains('offcanvas-menu')) return;
      document.body.classList.remove('offcanvas-menu');
      document.querySelectorAll('.js-menu-toggle').forEach(function (control) {
        control.classList.remove('active');
      });
      syncMenu();
      menuButton.focus();
    });
  }

  /* Header elevation */
  var header = document.querySelector('.ed-header');
  if (header) {
    var syncHeader = function () {
      header.classList.toggle('is-scrolled', window.scrollY > 20);
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  /* Footer year */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* WhatsApp forms */
  document.querySelectorAll('[data-whatsapp-form]').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      if (!form.reportValidity()) return;

      var data = new FormData(form);
      var subject = form.getAttribute('data-subject') || 'Website enquiry';
      var lines = ['Hello Souls for Christ Ministries Zambia,', '', subject, ''];

      data.forEach(function (value, key) {
        if (!value) return;
        var label = key.replace(/_/g, ' ').replace(/\b\w/g, function (c) { return c.toUpperCase(); });
        lines.push(label + ': ' + value);
      });

      var status = form.querySelector('.ed-form-status');
      if (status) status.textContent = 'Opening WhatsApp with your message ready to send…';

      window.open('https://wa.me/' + CHURCH_WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
    });
  });

  /* Lightbox for sermon and gallery tiles */
  if (window.GLightbox) {
    GLightbox({ selector: '.glightbox', touchNavigation: true, loop: true });
  }
})();
