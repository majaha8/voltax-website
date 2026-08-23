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
})();
