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
})();
