/* Souls for Christ Ministries Zambia — site behaviours. */
(function () {
  'use strict';

  var CHURCH_WHATSAPP = '260979918138';

  /* --- Mobile menu -------------------------------------------------------- */
  var menuButton = document.querySelector('.souls-burger') || document.querySelector('.burger') || document.querySelector('.js-menu-toggle');
  if (menuButton) {
    var syncMenuButton = function () {
      var open = document.body.classList.contains('offcanvas-menu');
      menuButton.setAttribute('aria-expanded', String(open));
      menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    };
    new MutationObserver(syncMenuButton).observe(document.body, {
      attributes: true,
      attributeFilter: ['class']
    });
    syncMenuButton();

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
      syncMenuButton();
      menuButton.focus();
    });
  }

  /* --- Sticky header state ------------------------------------------------- */
  var soulsHeader = document.querySelector('.souls-header');
  if (soulsHeader) {
    var syncHeader = function () {
      soulsHeader.classList.toggle('is-scrolled', window.scrollY > 24);
    };
    syncHeader();
    window.addEventListener('scroll', syncHeader, { passive: true });
  }

  /* --- Footer year -------------------------------------------------------- */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* --- Daily verse and date ---------------------------------------------- */
  var verses = [
    { text: '“For the Son of Man came to seek and to save the lost.”', cite: 'Luke 19:10' },
    { text: '“Go into all the world and proclaim the gospel to the whole creation.”', cite: 'Mark 16:15' },
    { text: '“The Spirit of the Lord is upon me, because he has anointed me to proclaim good news to the poor.”', cite: 'Luke 4:18' },
    { text: '“He said to them, ‘Follow me, and I will make you fishers of men.’”', cite: 'Matthew 4:19' },
    { text: '“How beautiful are the feet of those who preach the good news!”', cite: 'Romans 10:15' },
    { text: '“I am not ashamed of the gospel, for it is the power of God for salvation to everyone who believes.”', cite: 'Romans 1:16' },
    { text: '“Let us not grow weary of doing good, for in due season we will reap, if we do not give up.”', cite: 'Galatians 6:9' }
  ];

  var start = new Date(new Date().getFullYear(), 0, 0);
  var dayOfYear = Math.floor((new Date() - start) / 86400000);
  var dailyVerse = verses[dayOfYear % verses.length];

  document.querySelectorAll('[data-daily-verse]').forEach(function (el) {
    el.innerHTML = dailyVerse.text + '<cite>' + dailyVerse.cite + '</cite>';
  });

  document.querySelectorAll('[data-today]').forEach(function (el) {
    el.textContent = new Date().toLocaleDateString('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  });

  /* --- Next Sunday service countdown ------------------------------------- */
  document.querySelectorAll('[data-next-service]').forEach(function (el) {
    var tick = function () {
      var now = new Date();
      var target = new Date(now);
      var daysUntilSunday = (7 - now.getDay()) % 7;
      target.setDate(now.getDate() + daysUntilSunday);
      target.setHours(9, 30, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 7);

      var diff = target - now;
      var days = Math.floor(diff / 86400000);
      var hours = Math.floor((diff % 86400000) / 3600000);
      var minutes = Math.floor((diff % 3600000) / 60000);
      var seconds = Math.floor((diff % 60000) / 1000);

      el.textContent = days + 'd ' + String(hours).padStart(2, '0') + 'h ' +
        String(minutes).padStart(2, '0') + 'm ' + String(seconds).padStart(2, '0') + 's';
    };
    tick();
    window.setInterval(tick, 1000);
  });

  /* --- WhatsApp forms ----------------------------------------------------- */
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

      var status = form.querySelector('.souls-form-status');
      if (status) status.textContent = 'Opening WhatsApp with your message ready to send…';

      var url = 'https://wa.me/' + CHURCH_WHATSAPP + '?text=' + encodeURIComponent(lines.join('\n'));
      window.open(url, '_blank', 'noopener');
    });
  });

  /* --- Gentle image reveal ------------------------------------------------ */
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var images = document.querySelectorAll('.souls-reveal');
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('souls-fade');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    images.forEach(function (image) { observer.observe(image); });
  }

  /* --------------------------------------------------------------------------
     Language switcher
     Translations are stored locally in assets/js/translations.js, so switching
     is instant and works without a third-party widget. The switcher translates
     text nodes and common attributes, keeps proper names untouched, and stores
     the visitor's choice for the next page.
     -------------------------------------------------------------------------- */
  var LANGS = [
    { code: 'en', name: 'English', group: 'Original' },
    { code: 'bem', name: 'Bemba', group: 'Zambian languages' },
    { code: 'ny', name: 'Nyanja', group: 'Zambian languages' },
    { code: 'tum', name: 'Tumbuka', group: 'Zambian languages' }
  ];

  var LANG_KEY = 'souls.lang';
  var TRANSLATIONS = window.SOULS_TRANSLATIONS || {};
  var currentLang = 'en';
  try {
    currentLang = window.localStorage.getItem(LANG_KEY) || 'en';
  } catch (error) {
    currentLang = 'en';
  }
  if (!LANGS.some(function (lang) { return lang.code === currentLang; })) currentLang = 'en';

  var currentLabel = (LANGS.filter(function (lang) { return lang.code === currentLang; })[0] || LANGS[0]).name;
  var originalTitle = document.title;
  var originalAttrs = new WeakMap();

  var normalise = function (value) {
    return String(value).replace(/\s+/g, ' ').trim();
  };

  var isProtected = function (element) {
    if (!element) return false;
    return !!element.closest('.notranslate, [translate="no"], script, style, noscript, code, pre');
  };

  var translateTextNode = function (node, dict, code) {
    if (!node.nodeValue || !node.nodeValue.trim()) return;
    if (isProtected(node.parentElement)) return;

    if (!node.__soulsOriginalText) node.__soulsOriginalText = node.nodeValue;
    var original = node.__soulsOriginalText;

    if (code === 'en') {
      node.nodeValue = original;
      return;
    }

    var translated = dict[normalise(original)];
    if (!translated) return;

    var leading = original.match(/^\s*/)[0];
    var trailing = original.match(/\s*$/)[0];
    node.nodeValue = leading + translated + trailing;
  };

  var translateAttributes = function (dict, code) {
    document.querySelectorAll('[placeholder], [aria-label], [title], [alt]').forEach(function (element) {
      if (isProtected(element)) return;
      var saved = originalAttrs.get(element);
      if (!saved) {
        saved = {};
        originalAttrs.set(element, saved);
      }

      ['placeholder', 'aria-label', 'title', 'alt'].forEach(function (attr) {
        if (!element.hasAttribute(attr)) return;
        if (!(attr in saved)) saved[attr] = element.getAttribute(attr);
        var original = saved[attr];
        if (code === 'en') {
          element.setAttribute(attr, original);
          return;
        }
        var translated = dict[normalise(original)];
        if (translated) element.setAttribute(attr, translated);
      });
    });
  };

  var translatePage = function (code) {
    var dict = TRANSLATIONS[code] || {};

    var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (isProtected(node.parentElement)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });

    var nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach(function (node) { translateTextNode(node, dict, code); });

    translateAttributes(dict, code);

    document.documentElement.lang = code === 'en' ? 'en' : code;
    if (code === 'en') {
      document.title = originalTitle;
    } else {
      document.title = dict[normalise(originalTitle)] || originalTitle;
    }
  };

  window.soulsApplyLanguage = function () {
    translatePage(currentLang);
  };

  var buildLanguageSwitcher = function () {
    var wrap = document.createElement('div');
    wrap.className = 'souls-lang-switcher notranslate';
    wrap.setAttribute('translate', 'no');

    var groups = [];
    LANGS.forEach(function (lang) {
      if (groups.indexOf(lang.group) === -1) groups.push(lang.group);
    });

    var menu = '<div class="souls-lang-menu" id="souls-lang-menu" data-souls-lang-menu role="listbox" aria-label="Select language" hidden>';
    groups.forEach(function (group) {
      menu += '<p class="souls-lang-group" role="presentation">' + group + '</p>';
      LANGS.filter(function (lang) { return lang.group === group; }).forEach(function (lang) {
        menu += '<button type="button" role="option" data-souls-lang-option="' + lang.code + '" aria-selected="' + String(lang.code === currentLang) + '">' + lang.name + '</button>';
      });
    });
    menu += '<p class="souls-lang-note" data-souls-lang-status>Select a language to read the site in your heart language.</p></div>';

    wrap.innerHTML =
      '<button type="button" class="souls-lang-toggle" data-souls-lang-toggle aria-expanded="false" aria-haspopup="listbox" aria-controls="souls-lang-menu">' +
        '<span class="souls-lang-globe" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z"/></svg></span>' +
        '<span class="souls-lang-current" data-souls-lang-current>' + currentLabel + '</span>' +
        '<span class="souls-lang-chevron" aria-hidden="true"></span>' +
      '</button>' + menu;

    document.body.appendChild(wrap);

    var toggle = wrap.querySelector('[data-souls-lang-toggle]');
    var menuEl = wrap.querySelector('[data-souls-lang-menu]');

    var closeMenu = function () {
      wrap.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      menuEl.hidden = true;
    };

    toggle.addEventListener('click', function () {
      var open = wrap.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      menuEl.hidden = !open;
    });

    wrap.querySelectorAll('[data-souls-lang-option]').forEach(function (button) {
      button.addEventListener('click', function () {
        closeMenu();
        currentLang = button.getAttribute('data-souls-lang-option');
        currentLabel = (LANGS.filter(function (lang) { return lang.code === currentLang; })[0] || LANGS[0]).name;
        try {
          window.localStorage.setItem(LANG_KEY, currentLang);
        } catch (error) {
          /* private mode */
        }
        var label = wrap.querySelector('[data-souls-lang-current]');
        if (label) label.textContent = currentLabel;
        wrap.querySelectorAll('[data-souls-lang-option]').forEach(function (option) {
          option.setAttribute('aria-selected', String(option.getAttribute('data-souls-lang-option') === currentLang));
        });
        translatePage(currentLang);
      });
    });

    document.addEventListener('click', function (event) {
      if (!wrap.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && wrap.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  };

  /* Keep proper names and contact details out of machine translation. */
  document.querySelectorAll('.site-logo, .rpai-logo-tagline, .footer-brand, .footer-tagline, .rpai-pastor-name, .souls-heritage strong, a[href^="tel:"], a[href^="mailto:"]').forEach(function (el) {
    el.classList.add('notranslate');
    el.setAttribute('translate', 'no');
  });

  buildLanguageSwitcher();
  if (currentLang !== 'en') translatePage(currentLang);
})();
