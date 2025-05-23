document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;

  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', 
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      if (!response.ok) throw new Error('Login failed');
      return response.json();
    })
    .then((data) => {
      if (data.status === 'success') {
        alert('Login successful!');
        window.location.href = '/main';
      } else {
        alert('Login failed: ' + data.error);
      }
    })
    .catch((error) => alert('Error: ' + error.message));
});

const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePassword.textContent = type === 'password' ? 'show' : 'hide';
});
