document.addEventListener('DOMContentLoaded', () => {
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
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (data.success) {
        
          localStorage.setItem('user_id', data.user_id);

          
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
