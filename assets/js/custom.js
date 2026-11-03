/* Souls for Christ Ministries Zambia — page motion and gallery. */
(function () {
  'use strict';

  /* --- Scroll animations -------------------------------------------------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      easing: 'slide',
      once: true
    });
  }

  /* --- Preloader ---------------------------------------------------------- */
  var loader = document.querySelector('.loader');
  var overlay = document.getElementById('overlayer');

  if (loader && overlay) {
    window.setTimeout(function () {
      loader.style.transition = 'opacity 350ms ease';
      overlay.style.transition = 'opacity 350ms ease';
      loader.style.opacity = '0';
      overlay.style.opacity = '0';
      window.setTimeout(function () {
        loader.style.display = 'none';
        overlay.style.display = 'none';
      }, 380);
    }, 200);
  }

  /* --- Gallery ------------------------------------------------------------ */
  var gallery = document.querySelector('.rpai-media-gallery');
  var carousel = document.querySelector('.rpai-gallery-carousel');

  if (gallery && carousel) {
    var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var gallerySlider = null;
    var slideshowPlaying = !prefersReducedMotion;
    var lightbox = null;

    var controls = document.querySelector('.rpai-gallery-controls');
    var previousButton = controls ? controls.querySelector('[data-gallery-prev]') : null;
    var nextButton = controls ? controls.querySelector('[data-gallery-next]') : null;
    var toggleButton = controls ? controls.querySelector('[data-gallery-toggle]') : null;
    var viewButton = controls ? controls.querySelector('[data-gallery-view]') : null;
    var optOutButton = document.querySelector('[data-gallery-optout]');

    var galleryOptions = function () {
      return {
        container: '.rpai-media-gallery',
        mode: 'carousel',
        items: 4,
        slideBy: 'page',
        gutter: 24,
        speed: 700,
        loop: true,
        autoplay: slideshowPlaying,
        autoplayTimeout: 4500,
        autoplayHoverPause: false,
        autoplayButtonOutput: false,
        controls: false,
        nav: false,
        responsive: {
          0: { items: 1 },
          576: { items: 2 },
          768: { items: 3 },
          1200: { items: 4 }
        }
      };
    };

    var buildSlider = function () {
      gallerySlider = tns(galleryOptions());
      if (lightbox && typeof lightbox.reload === 'function') {
        lightbox.reload();
      }
    };

    buildSlider();

    if (window.GLightbox) {
      lightbox = GLightbox({ selector: '.glightbox' });
    }

    if (toggleButton) {
      toggleButton.textContent = slideshowPlaying ? 'Pause slideshow' : 'Play slideshow';
      toggleButton.setAttribute('aria-pressed', String(slideshowPlaying));
    }

    if (previousButton) {
      previousButton.addEventListener('click', function () {
        if (gallerySlider) gallerySlider.goTo('prev');
      });
    }

    if (nextButton) {
      nextButton.addEventListener('click', function () {
        if (gallerySlider) gallerySlider.goTo('next');
      });
    }

    if (toggleButton) {
      toggleButton.addEventListener('click', function () {
        slideshowPlaying = !slideshowPlaying;
        if (gallerySlider) {
          if (slideshowPlaying) gallerySlider.play();
          else gallerySlider.pause();
        }
        toggleButton.textContent = slideshowPlaying ? 'Pause slideshow' : 'Play slideshow';
        toggleButton.setAttribute('aria-pressed', String(slideshowPlaying));
      });
    }

    var currentGallery = function () {
      return document.querySelector('.rpai-media-gallery');
    };

    var showAllPictures = function (showingAll) {
      if (showingAll) {
        if (gallerySlider) {
          gallerySlider.pause();
          gallerySlider.destroy();
          gallerySlider = null;
        }
        /* Tiny Slider replaces the container when it is destroyed, so get the
           live node again before marking the grid view. */
        gallery = currentGallery();
        if (gallery) gallery.classList.add('rpai-all-pictures');
      } else {
        gallery = currentGallery();
        if (gallery) gallery.classList.remove('rpai-all-pictures');
        buildSlider();
        gallery = currentGallery();
        if (slideshowPlaying && gallerySlider) gallerySlider.play();
      }

      carousel.classList.toggle('rpai-showing-all', showingAll);

      if (optOutButton && showingAll) {
        optOutButton.scrollIntoView({ block: 'center' });
      }

      [previousButton, nextButton, toggleButton].forEach(function (button) {
        if (button) button.disabled = showingAll;
      });

      if (viewButton) {
        viewButton.textContent = showingAll ? 'Show slideshow' : 'Show all pictures';
        viewButton.setAttribute('aria-pressed', String(showingAll));
      }
    };

    if (viewButton) {
      viewButton.addEventListener('click', function () {
        var liveGallery = currentGallery();
        showAllPictures(!(liveGallery && liveGallery.classList.contains('rpai-all-pictures')));
      });
    }

    if (optOutButton) {
      optOutButton.addEventListener('click', function () {
        showAllPictures(false);
        if (viewButton) viewButton.focus();
      });
    }
  }
})();
