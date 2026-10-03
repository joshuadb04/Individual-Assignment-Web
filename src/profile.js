import { mediaUrl } from "./variables.js";
import { getUser, updateUser, uploadAvatar } from "./models/user-model.js";
import { loadRestaurants } from "./controllers/restaurant-controller.js";

const profileForm = document.querySelector("#profile-form");
const usernameInput = document.querySelector("#profile-username");
const emailInput = document.querySelector("#profile-email");
const passwordInput = document.querySelector("#profile-password");
const confirmPasswordInput = document.querySelector("#profile-confirm-password");
const profileMessage = document.querySelector("#profile-message");
const avatarInput = document.querySelector("#profile-avatar");
const avatarImage = document.querySelector("#profile-avatar-image");
const favouriteRestaurant = document.querySelector("#profile-favourite-restaurant");
const displayUsername = document.querySelector("#profile-display-username");

// Get current user
const loadUser = async () => {
  try {
    const result = await getUser();
    const restaurants = await loadRestaurants();
    const favourite = restaurants.find((restaurant) => restaurant._id === result.favouriteRestaurant);

    favouriteRestaurant.textContent = favourite
      ? `Favorite restaurant: ${favourite.name}`
      : "Favorite restaurant: None";

    usernameInput.value = result.username;
    emailInput.value = result.email;

    displayUsername.textContent = result.username;

    console.log(result.avatar);

    if (result.avatar) {
      avatarImage.src = `${mediaUrl}/${result.avatar}`;
    }
  } catch (error) {
    console.error("Get user error:", error);
    profileMessage.textContent = error.message;
  }
};

// Update user
profileForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  if (passwordInput.value !== confirmPasswordInput.value) {
    profileMessage.textContent = "Passwords do not match.";
    return;
  }

  try {
    const result = await updateUser(usernameInput.value, passwordInput.value, emailInput.value);

    profileMessage.textContent = result.message;
    passwordInput.value = "";
    confirmPasswordInput.value = "";
  } catch (error) {
    console.error("Profile update error:", error);
    profileMessage.textContent = error.message;
  }
});

// Upload avatar
avatarInput.addEventListener("change", async () => {
  const file = avatarInput.files[0];

  if (!file) {
    return;
  }

  try {
    const result = await uploadAvatar(file);

    profileMessage.textContent = result.message;

    if (result.data?.avatar) {
      avatarImage.src = `${mediaUrl}/${result.data.avatar}`;
    }
  } catch (error) {
    console.error("Avatar upload error:", error);
    profileMessage.textContent = error.message;
  }
});

loadUser();
