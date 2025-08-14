function toggleForms() {
  document.getElementById('loginForm').classList.toggle('hidden');
  document.getElementById('registerForm').classList.toggle('hidden');
}

function sanitizeUsername() {
  const usernameInput = document.getElementById('regUsername');
  const usernameWarning = document.getElementById('usernameWarning');
  let username = usernameInput.value;

  username = username.replace(/\s+/g, '-');
  usernameInput.value = username;

  if (!username || username.replace(/-/g, "") === "") {
    usernameWarning.textContent = "Username cannot be empty or only dashes.";
  } else {
    usernameWarning.textContent = "";
  }
}

function checkEmail() {
  const email = document.getElementById('regEmail').value;
  const emailWarning = document.getElementById('emailWarning');

  if (email && !email.endsWith("@gmail.com")) {
    emailWarning.textContent = "Email must end with @gmail.com";
  } else {
    emailWarning.textContent = "";
  }
}

function validateRegister() {
  const username = document.getElementById('regUsername').value.trim();
  const email = document.getElementById('regEmail').value;
  const pass = document.getElementById('regPassword').value;
  const confirmPass = document.getElementById('confirmPassword').value;
  const termsChecked = document.getElementById('terms').checked;

  const usernameWarning = document.getElementById('usernameWarning');
  const emailWarning = document.getElementById('emailWarning');

  if (!username || username.replace(/-/g, "") === "") {
    usernameWarning.textContent = "Username cannot be empty.";
    return false;
  } else {
    usernameWarning.textContent = "";
  }

  if (!email.endsWith("@gmail.com")) {
    emailWarning.textContent = "Email must end with @gmail.com";
    return false;
  } else {
    emailWarning.textContent = "";
  }

  if (pass !== confirmPass) {
    alert("Passwords do not match!");
    return false;
  }

  if (!termsChecked) {
    alert("You must agree to the terms & conditions!");
    return false;
  }

  // Save user to localStorage
  localStorage.setItem("registeredUsername", username);
  localStorage.setItem("registeredPassword", pass);
  alert("Registration successful! Now login.");
  toggleForms(); // Show login form
}

function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const storedUsername = localStorage.getItem("registeredUsername");
  const storedPassword = localStorage.getItem("registeredPassword");

  if (username === storedUsername && password === storedPassword) {
    alert("Login successful!");
    window.location.href = "/index.html"; // redirect to index/home page
  } else {
    alert("Invalid username or password.");
  }
}




function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  const storedUsername = localStorage.getItem("registeredUsername");
  const storedPassword = localStorage.getItem("registeredPassword");

  if (username === storedUsername && password === storedPassword) {
    alert("Login successful!");

    // Mark as logged in
    localStorage.setItem("isLoggedIn", "true");

    // Go to home page
    window.location.href = "/index.html"; // redirect to index/home page
  } else {
    alert("Invalid username or password.");
  }
}
