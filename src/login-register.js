import { checkUsername, createUser, loginUser } from "./models/user-model.js";

const registerForm = document.querySelector("#register-form");
const usernameInput = document.querySelector("#username");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const registerMessage = document.querySelector("#register-message");

const loginForm = document.querySelector("#login-form");
const loginUsernameInput = document.querySelector("#login-username");
const loginPasswordInput = document.querySelector("#login-password");
const loginMessage = document.querySelector("#login-message");

// Register user
registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const username = usernameInput.value;
    const password = passwordInput.value;

    // Check username
    const usernameResult = await checkUsername(username);

    if (!usernameResult.available) {
      registerMessage.textContent = "Username is already taken.";
      return;
    }

    // Create user
    const result = await createUser(username, password, emailInput.value);

    registerMessage.textContent = result.message;
    registerForm.reset();
  } catch (error) {
    console.error("Registration error:", error);
    registerMessage.textContent = error.message;
  }
});

// Login
loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  try {
    const result = await loginUser(loginUsernameInput.value, loginPasswordInput.value);

    localStorage.setItem("token", result.token);
    loginForm.reset();
    window.location.href = "index.html";
  } catch (error) {
    console.error("Login error:", error);
    loginMessage.textContent = error.message;
  }
});
