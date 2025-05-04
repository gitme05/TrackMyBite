document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.password-field span');
    const passwordInput = document.querySelector('.password-field input');
  
    toggle.addEventListener('click', function () {
      const type = passwordInput.getAttribute('type');
      if (type === 'password') {
        passwordInput.setAttribute('type', 'text');
        toggle.textContent = 'hide';
      } else {
        passwordInput.setAttribute('type', 'password');
        toggle.textContent = 'show';
      }
    });
  });
  