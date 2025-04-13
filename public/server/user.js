
const registerForm = document.getElementById("registerForm");
if (registerForm) {
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault(); // stop refresh keeps going to black screen

    const user = {
      firstName: registerForm.elements["firstName"].value,
      lastName: registerForm.elements["lastName"].value,
      email: registerForm.elements["email"].value,
      password: registerForm.elements["password"].value,
    };

    console.log(" Registering user:", user);
  });
}


const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const credentials = {
      email: loginForm.elements["email"].value,
      password: loginForm.elements["password"].value,
    };

    console.log(" Logging in with:", credentials);
  });
}

