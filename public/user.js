document.addEventListener('DOMContentLoaded', () => {

  const registerForm = document.getElementById('registerForm');
  if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
          e.preventDefault();

          const username = document.getElementById('username').value;
          const email = document.getElementById('email').value;
          const password = document.getElementById('password').value;

          try {
              const response = await fetch('http://localhost:3000/user/register', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ username, email, password }),
              });

              const data = await response.json();

              if (data.success) {
                  window.location.href = 'login.html';
              } else {
                  alert(data.message || 'Registration failed.');
              }
          } catch (error) {
              console.error('Registration error:', error);
              alert('An error occurred while registering.');
          }
      });
  }


  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
          e.preventDefault();

          const email = document.getElementById('loginEmail').value;
          const password = document.getElementById('loginPassword').value;

          try {
              const response = await fetch('http://localhost:3000/user/login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ email, password }),
              });

              const data = await response.json();

              if (data.success) {
                  window.location.href = 'tasks.html';
              } else {
                  alert(data.message || 'Login failed.');
              }
          } catch (error) {
              console.error('Login error:', error);
              alert('An error occurred while logging in.');
          }
      });
  }
});
