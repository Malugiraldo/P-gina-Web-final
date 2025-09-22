// Footer year
var y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Very small newsletter feedback (no real submit)
var form = document.getElementById('newsletterForm');
var msg = document.getElementById('formMsg');
if (form && msg) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var email = (document.getElementById('email') || {}).value || '';
    if (email.indexOf('@') === -1) {
      msg.textContent = 'Please enter a valid email.';
      msg.style.color = '#c0392b';
      return;
    }
    msg.textContent = 'Thanks! Check your inbox.';
    msg.style.color = '#2e7d32';
    form.reset();
  });
}