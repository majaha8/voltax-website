(function () {
  function currentPage() {
    var p = window.location.pathname;
    if (p.length > 1 && p.charAt(p.length - 1) === '/') p = p.slice(0, -1);
    return p || '/';
  }

  var navLinks = document.querySelector('.nav-links');
  var navToggle = document.querySelector('.nav-toggle');

  window.toggleMenu = function () {
    if (!navLinks) return;
    var open = navLinks.classList.toggle('open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', open);
      navToggle.classList.toggle('is-open', open);
      navToggle.textContent = open ? '✕' : '☰';
    }
  };

  document.addEventListener('click', function (e) {
    if (!navLinks || !navLinks.classList.contains('open')) return;
    if (e.target.closest('.nav')) return;
    navLinks.classList.remove('open');
    if (navToggle) {
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.textContent = '☰';
    }
  });

  document.querySelectorAll('.nav-links a').forEach(function (a) {
    if (a.getAttribute('href') === currentPage()) {
      a.classList.add('active');
    }
    a.addEventListener('click', function () {
      navLinks.classList.remove('open');
      if (navToggle) {
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      }
    });
  });

  window.submitForm = function (e) {
    e.preventDefault();
    var form = e.target;
    if (!form.checkValidity()) {
      form.reportValidity();
      return false;
    }
    var success = form.querySelector('.form-success');
    if (success) {
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      setTimeout(function () { success.style.display = 'none'; }, 6000);
    }
    form.reset();
    return false;
  };

  // ---- FAQ accordion ----
  window.toggleFaq = function (btn) {
    var item = btn.closest('.faq-item');
    if (!item) return;
    var answer = item.querySelector('.faq-answer');
    var isOpen = item.classList.contains('open');

    // close any sibling that's open
    var list = item.parentElement;
    if (list) {
      list.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          var a = openItem.querySelector('.faq-answer');
          if (a) a.style.maxHeight = null;
        }
      });
    }

    if (isOpen) {
      item.classList.remove('open');
      answer.style.maxHeight = null;
    } else {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  };

  // ---- Scroll reveal: Why Choose Us cards ----
  // Cards zoom in, fade in and rise slightly when the grid scrolls into view;
  // the grid keeps them side-by-side, so only transform/opacity on each card animates.
  var whyGrid = document.querySelector('.why-grid');
  if (whyGrid && 'IntersectionObserver' in window) {
    if (whyGrid.getBoundingClientRect().top < window.innerHeight) {
      whyGrid.classList.add('is-visible');
    } else {
      var whyObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            whyObserver.disconnect();
          }
        });
      }, { threshold: 0.25 });
      whyObserver.observe(whyGrid);
    }
  } else if (whyGrid) {
    whyGrid.classList.add('is-visible');
  }

  // ---- Scroll reveal: footer columns ----
  // Columns fade in and slide up together, left to right, when the footer
  // scrolls into view; plays once via disconnect().
  var footer = document.querySelector('.footer');
  if (footer && 'IntersectionObserver' in window) {
    if (footer.getBoundingClientRect().top < window.innerHeight) {
      footer.classList.add('footer-visible');
    } else {
      var footerObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('footer-visible');
            footerObserver.disconnect();
          }
        });
      }, { threshold: 0.15 });
      footerObserver.observe(footer);
    }
  } else if (footer) {
    footer.classList.add('footer-visible');
  }

  // ---- Scroll reveal: zoom-in cards, row by row ----
  // Cards are hidden via html.js .reveal, observed, then zoom in together per
  // grid row (offsetTop-based) with a staggered delay; plays once.
  var revealItems = document.querySelectorAll('.reveal');

  if (revealItems.length) {
    if (!('IntersectionObserver' in window)) {
      revealItems.forEach(function (el) { el.classList.add('in-view'); });
    } else {
      var revealObserver = new IntersectionObserver(function (entries) {
        var rowDelay = parseInt(getComputedStyle(document.documentElement)
                         .getPropertyValue('--row-delay'), 10) || 0;

        var visible = entries.filter(function (e) { return e.isIntersecting; });

        // Group visible cards by grid row using offsetTop (transforms don't
        // affect it, so it stays reliable mid-animation).
        var tops = [];
        visible.forEach(function (e) {
          var top = e.target.offsetTop;
          if (!tops.some(function (t) { return Math.abs(t - top) < 5; })) tops.push(top);
        });
        tops.sort(function (a, b) { return a - b; });

        visible.forEach(function (entry) {
          var row = tops.findIndex(function (t) {
            return Math.abs(t - entry.target.offsetTop) < 5;
          });
          entry.target.style.animationDelay = (row * rowDelay) + 'ms';
          entry.target.classList.add('in-view');
          revealObserver.unobserve(entry.target);  // play once
        });
      }, {
        threshold: 0.2,
        rootMargin: '0px 0px -40px 0px'
      });

      revealItems.forEach(function (el) { revealObserver.observe(el); });
    }
  }

  // ---- Auto-sliding card carousels ----
  // Clone each card once so both the marquee ("How It Works") and the step
  // carousel ("What We Do") can loop seamlessly.
  document.querySelectorAll('[data-slider]').forEach(function (slider) {
    var track = slider.querySelector('.card-slider-track');
    if (!track) return;
    var cards = Array.prototype.slice.call(track.children);
    if (!cards.length) return;

    cards.forEach(function (card) {
      var clone = card.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      clone.querySelectorAll('a, button').forEach(function (el) { el.tabIndex = -1; });
      track.appendChild(clone);
    });
  });

  // Marquee ("How It Works"): continuous CSS scroll, ~2s screen time/card.
  document.querySelectorAll('[data-slider]:not([data-step-slider])').forEach(function (slider) {
    var track = slider.querySelector('.card-slider-track');
    if (!track) return;
    var cards = Array.prototype.slice.call(track.children);
    if (!cards.length) return;
    var duration = Math.max(cards.length * 2, 8);
    slider.style.setProperty('--slide-duration', duration + 's');
  });

  // Step carousel ("What We Do"): hold, then slide forward one card every 10s.
  document.querySelectorAll('[data-slider][data-step-slider]').forEach(function (slider) {
    var track = slider.querySelector('.card-slider-track');
    if (!track) return;
    var cards = Array.prototype.slice.call(track.children).filter(function (el) {
      return el.getAttribute('aria-hidden') !== 'true';
    });
    if (!cards.length) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    var index = 0;
    var timer = null;

    function stepWidth() {
      var first = track.children[0];
      if (!first) return 0;
      var gap = parseFloat(getComputedStyle(track).gap) || 0;
      return first.getBoundingClientRect().width + gap;
    }

    function render() {
      track.style.transform = 'translateX(-' + (index * stepWidth()) + 'px)';
    }

    function next() {
      index += 3;
      if (index >= cards.length) {
        index = 0;
        track.style.transition = 'none';
        track.style.transform = 'translateX(0)';
        void track.offsetWidth;
        track.style.transition = '';
      }
      render();
    }

    function pause() { if (timer) { clearInterval(timer); timer = null; } }
    function resume() { if (!timer) timer = setInterval(next, 3000); }

    slider.addEventListener('mouseenter', pause);
    slider.addEventListener('mouseleave', resume);
    slider.addEventListener('focusin', pause);
    slider.addEventListener('focusout', resume);
    window.addEventListener('resize', render);

    resume();
  });
  (function () {
    // Respect users who have reduced motion turned on
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;


    var HERO_SPEED = 0.4;   // 0 = background moves with the page, 1 = background stays still
    var IMG_RANGE  = 0.08;  // how far each photo drifts, as a fraction of its frame height


    var hero   = document.querySelector('.parallax-hero');
    var heroBg = hero ? hero.querySelector('.parallax-hero__bg') : null;
    var images = Array.prototype.slice.call(document.querySelectorAll('.about-img img'));
    var ticking = false;


    function update() {
      ticking = false;
      var vh = window.innerHeight;


      // Hero background: slides down slower than the page scrolls up
      if (heroBg) {
        var heroBottom = hero.getBoundingClientRect().bottom;
        if (heroBottom > 0) {
          heroBg.style.setProperty('--hero-y', (window.scrollY * HERO_SPEED) + 'px');
        }
      }


      // Service photos: drift inside their frames while passing through the viewport
      for (var i = 0; i < images.length; i++) {
        var frame = images[i].parentElement.getBoundingClientRect();
        if (frame.bottom < 0 || frame.top > vh) continue;   // off-screen, skip


        var centre   = frame.top + frame.height / 2;
        var progress = (centre - vh / 2) / (vh / 2 + frame.height / 2);   // -1 .. 1
        progress = Math.max(-1, Math.min(1, progress));


        images[i].style.setProperty('--img-y', (-progress * frame.height * IMG_RANGE) + 'px');
      }
    }


    function onScroll() {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    }


    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    window.addEventListener('load', update);
    // Photo frames are scaled while they zoom in, so re-measure once each zoom finishes
    document.addEventListener('animationend', onScroll);
    update();
  })();
})();
