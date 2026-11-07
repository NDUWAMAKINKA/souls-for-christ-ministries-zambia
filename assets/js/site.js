/* Souls for Christ Ministries Zambia — site interactions */
(function () {
  'use strict';

  var CHURCH_WHATSAPP = '260979918138';
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function onReady(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  onReady(function () {
    var body = document.body;
    var header = document.querySelector('.site-header');
    var menu = document.querySelector('.mobile-menu');
    var menuToggles = document.querySelectorAll('[data-menu-toggle]');
    var menuCloses = document.querySelectorAll('[data-menu-close]');

    /* Header elevation -------------------------------------------------- */
    function syncHeader() {
      if (!header) return;
      header.classList.toggle('is-scrolled', window.scrollY > 24);
    }
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });

    /* Mobile menu ------------------------------------------------------- */
    function setMenu(open) {
      if (!menu) return;
      body.classList.toggle('menu-open', open);
      menu.setAttribute('aria-hidden', String(!open));
      menuToggles.forEach(function (button) {
        button.setAttribute('aria-expanded', String(open));
        button.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      });
      if (open) {
        var firstLink = menu.querySelector('a, button');
        if (firstLink) window.setTimeout(function () { firstLink.focus(); }, 220);
      }
    }

    menuToggles.forEach(function (button) {
      button.addEventListener('click', function () {
        setMenu(!body.classList.contains('menu-open'));
      });
    });

    menuCloses.forEach(function (button) {
      button.addEventListener('click', function () { setMenu(false); });
    });

    if (menu) {
      menu.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () { setMenu(false); });
      });
    }

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && body.classList.contains('menu-open')) {
        setMenu(false);
      }
    });

    /* Footer year ------------------------------------------------------- */
    document.querySelectorAll('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });

    /* Reveal animations ------------------------------------------------- */
    if (window.AOS && !reduceMotion) {
      AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 70
      });
    }

    /* Lightbox ---------------------------------------------------------- */
    if (window.GLightbox) {
      GLightbox({
        selector: '.glightbox',
        touchNavigation: true,
        loop: true,
        openEffect: 'fade',
        closeEffect: 'fade'
      });
    }

    /* WhatsApp forms ---------------------------------------------------- */
    document.querySelectorAll('[data-whatsapp-form]').forEach(function (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();
        if (!form.reportValidity()) return;

        var data = new FormData(form);
        var subject = form.getAttribute('data-subject') || 'Website enquiry';
        var lines = ['Hello Souls for Christ Ministries Zambia,', '', subject, ''];

        data.forEach(function (value, key) {
          if (!value) return;
          var label = key.replace(/_/g, ' ').replace(/\b\w/g, function (c) {
            return c.toUpperCase();
          });
          lines.push(label + ': ' + value);
        });

        var status = form.querySelector('.form-status');
        if (status) status.textContent = 'Opening WhatsApp with your message ready to send…';

        window.open('https://wa.me/' + CHURCH_WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n')), '_blank', 'noopener');
      });
    });

    /* Gallery filters --------------------------------------------------- */
    var galleryFilters = document.querySelectorAll('[data-gallery-filter]');
    var galleryItems = document.querySelectorAll('[data-gallery-item]');
    var galleryCount = document.querySelector('[data-gallery-count]');

    function filterGallery(value) {
      var shown = 0;
      galleryItems.forEach(function (item) {
        var categories = (item.getAttribute('data-category') || '').split(/\s+/);
        var show = value === 'all' || categories.indexOf(value) !== -1;
        item.classList.toggle('is-hidden', !show);
        if (show) shown += 1;
      });
      if (galleryCount) {
        galleryCount.textContent = shown + (shown === 1 ? ' moment' : ' moments');
      }
    }

    galleryFilters.forEach(function (button) {
      button.addEventListener('click', function () {
        galleryFilters.forEach(function (item) {
          var active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        filterGallery(button.getAttribute('data-gallery-filter'));
      });
    });

    /* Sermon filters and search ---------------------------------------- */
    var sermonFilters = document.querySelectorAll('[data-sermon-filter]');
    var sermonCards = document.querySelectorAll('[data-sermon-card]');
    var sermonSearch = document.querySelector('[data-sermon-search]');
    var sermonCount = document.querySelector('[data-sermon-count]');
    var activeSermonFilter = 'all';

    function filterSermons() {
      var query = sermonSearch ? sermonSearch.value.trim().toLowerCase() : '';
      var shown = 0;
      sermonCards.forEach(function (card) {
        var category = card.getAttribute('data-category') || '';
        var title = (card.getAttribute('data-title') || '').toLowerCase();
        var categoryMatch = activeSermonFilter === 'all' || category === activeSermonFilter;
        var searchMatch = !query || title.indexOf(query) !== -1 || category.indexOf(query) !== -1;
        var show = categoryMatch && searchMatch;
        card.classList.toggle('is-hidden', !show);
        if (show) shown += 1;
      });
      if (sermonCount) {
        sermonCount.textContent = shown + (shown === 1 ? ' message' : ' messages');
      }
    }

    sermonFilters.forEach(function (button) {
      button.addEventListener('click', function () {
        activeSermonFilter = button.getAttribute('data-sermon-filter');
        sermonFilters.forEach(function (item) {
          var active = item === button;
          item.classList.toggle('is-active', active);
          item.setAttribute('aria-pressed', String(active));
        });
        filterSermons();
      });
    });

    if (sermonSearch) {
      sermonSearch.addEventListener('input', filterSermons);
    }

    /* Observe linked cards for keyboard focus --------------------------- */
    document.querySelectorAll('.service-row, .sermon-row, .ministry-card').forEach(function (card) {
      card.addEventListener('focusin', function () {
        card.classList.add('is-focused');
      });
      card.addEventListener('focusout', function () {
        card.classList.remove('is-focused');
      });
    });

    /* Set active nav link based on path -------------------------------- */
    var path = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.main-nav a, .mobile-menu nav a').forEach(function (link) {
      var href = link.getAttribute('href') || '';
      if (href === path) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  });
})();
