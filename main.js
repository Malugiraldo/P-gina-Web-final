// Mobile nav toggle
(function () {
  var btn = document.querySelector('.nav-toggle');
  var nav = document.getElementById('site-nav');
  if (btn && nav) {
    btn.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }
})();

// Year in footer
(function () {
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();

// Simple search & filter for recipe cards (ahora en español y con etiquetas nuevas)
(function () {
  var search = document.getElementById('search');
  var clearBtn = document.getElementById('clearSearch');
  var checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
  var pills = document.querySelectorAll('.pill');
  var cards = Array.prototype.slice.call(document.querySelectorAll('#recipes .card, #featured .card'));

  function cardMatches(card, query, requiredTags) {
    var tags = (card.getAttribute('data-tags') || '').toLowerCase();
    var text = (card.textContent || '').toLowerCase();
    var okQuery = !query || text.indexOf(query) !== -1 || tags.indexOf(query) !== -1;
    var okTags = true;
    for (var i = 0; i < requiredTags.length; i++) {
      if (tags.indexOf(requiredTags[i]) === -1) { okTags = false; break; }
    }
    return okQuery && okTags;
  }

  function applyFilters() {
    var q = (search && search.value ? search.value.trim().toLowerCase() : '');
    var requiredTags = [];
    checkboxes.forEach(function (cb) { if (cb.checked) requiredTags.push(cb.value.toLowerCase()); });
    cards.forEach(function (card) {
      var visible = cardMatches(card, q, requiredTags);
      card.style.display = visible ? '' : 'none';
    });
  }

  // Search interactions
  if (search) search.addEventListener('input', applyFilters);
  if (clearBtn) clearBtn.addEventListener('click', function () {
    if (search) search.value = '';
    applyFilters();
    search && search.focus();
  });

  // Checkbox filters
  checkboxes.forEach(function (cb) { cb.addEventListener('change', applyFilters); });

  // Tag pills (quick filter)
  pills.forEach(function (pill) {
    pill.addEventListener('click', function () {
      var tag = pill.getAttribute('data-filter') || '';
      // Toggle checkbox state to reflect pill
      checkboxes.forEach(function (cb) { if (cb.value === tag) cb.checked = !cb.checked; });
      applyFilters();
    });
  });
})();

// Newsletter form (mensajes en español)
(function () {
  var form = document.getElementById('newsletterForm');
  var msg = document.getElementById('formMsg');
  if (!form || !msg) return;

  function setMsg(text, color) {
    msg.textContent = text;
    msg.style.color = color;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var emailEl = document.getElementById('email');
    var email = (emailEl || {}).value || '';

    if (!email || email.indexOf('@') === -1) {
      setMsg('Por favor ingresa un email válido.', '#ffdddd');
      if (emailEl) emailEl.focus();
      return;
    }

    // Simulación de éxito
    setMsg('¡Listo! Revisa tu bandeja para confirmar la suscripción.', '#c7f9cc');
    form.reset();
  });
})();
