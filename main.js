const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('is-open');
  });
}

document.querySelectorAll('[data-confirm]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    const message = form.getAttribute('data-confirm');

    if (message && !window.confirm(message)) {
      event.preventDefault();
    }
  });
});

const passwordForm = document.querySelector('[data-validate-passwords]');

if (passwordForm) {
  passwordForm.addEventListener('submit', (event) => {
    const password = passwordForm.querySelector('input[name="password"]');
    const confirmPassword = passwordForm.querySelector('input[name="confirmPassword"]');
    const error = passwordForm.querySelector('[data-form-error]');

    if (!password || !confirmPassword || !error) {
      return;
    }

    if (password.value !== confirmPassword.value) {
      event.preventDefault();
      error.textContent = 'Passwords do not match.';
      error.style.display = 'block';
    }
  });
}
