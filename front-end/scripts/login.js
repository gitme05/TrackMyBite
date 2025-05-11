document.getElementById('loginForm').addEventListener('submit', function (e) {
  e.preventDefault(); 

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;


  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(response => response.json())
  .then(data => {
    if (data.status === 'success') {
      alert('Login successful!');
      window.location.href = '/main'; 
    } else {
      alert('Login failed: ' + data.error);
    }
  })
  .catch(error => alert('Error: ' + error.message));
});


const togglePassword = document.getElementById('toggle-password');
const passwordInput = document.getElementById('password');

togglePassword.addEventListener('click', function () {
 
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePassword.textContent = type === 'password' ? 'show' : 'hide';
});
