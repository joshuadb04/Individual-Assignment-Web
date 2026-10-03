const loginLink = document.querySelector("#login-link");
const restaurantsLink = document.querySelector("#restaurants-link");
const profileLink = document.querySelector("#profile-link");

if (localStorage.getItem("token")) {
  loginLink.textContent = "Logout";

  loginLink.addEventListener("click", (event) => {
    event.preventDefault();

    localStorage.removeItem("token");

    window.location.href = "login-register.html";
  });
} else {
  profileLink.style.display = "none";
}
