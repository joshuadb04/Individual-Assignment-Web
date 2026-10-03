import { baseUrl } from "../variables.js";
import { fetchData } from "../utils.js";

const checkUsername = async (username) => {
  return await fetchData(`${baseUrl}/users/available/${username}`);
};

const createUser = async (username, password, email) => {
  return await fetchData(`${baseUrl}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
      email,
    }),
  });
};

const loginUser = async (username, password) => {
  return await fetchData(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
};

const getUser = async () => {
  return await fetchData(`${baseUrl}/users/token`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const updateUser = async (username, password, email, favouriteRestaurant) => {
  const user = {
    username,
    email,
    favouriteRestaurant,
  };

  if (password) {
    user.password = password;
  }

  return await fetchData(`${baseUrl}/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(user),
  });
};

const uploadAvatar = async (file) => {
  const formData = new FormData();

  formData.append("avatar", file);

  return await fetchData(`${baseUrl}/users/avatar`, {
    method: "POST",
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    body: formData,
  });
};

const updateFavouriteRestaurant = async (favouriteRestaurant) => {
  return await fetchData(`${baseUrl}/users`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({
      favouriteRestaurant,
    }),
  });
};

export { checkUsername, createUser, loginUser, getUser, updateUser, uploadAvatar, updateFavouriteRestaurant };
