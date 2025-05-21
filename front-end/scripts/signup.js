document.addEventListener('DOMContentLoaded', function () {
  const toggle = document.querySelector('.password-field span');
  const passwordInput = document.querySelector('.password-field input');
  const form = document.querySelector('form');
  const email = document.querySelector('#email');
  const password = document.querySelector('#password');
  const success = document.querySelector('.success-message');
  const error = document.querySelector('.error-message');

  toggle.addEventListener('click', function () {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    toggle.textContent = type === 'password' ? 'show' : 'hide';
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const register = {
      email: email.value,
      password: password.value
    };

    fetch("/api/credentials", {
      method: "POST",
      body: JSON.stringify(register),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === "error") {
        success.style.display = "none";
        error.style.display = "block";
        error.innerText = data.error;
      } else {
        error.style.display = "none";
        success.style.display = "block";
        success.innerText = data.success;
        form.reset();
      }
    });
  });
});
