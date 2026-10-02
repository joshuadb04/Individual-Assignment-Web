import { getRestaurants } from "../models/restaurant-model.js";

let restaurants = [];

const loadRestaurants = async () => {
  restaurants = await getRestaurants();

  restaurants.sort((a, b) => a.name.localeCompare(b.name));

  return restaurants;
};

const searchRestaurants = (searchTerm) => {
  const term = searchTerm.toLowerCase();

  return restaurants.filter((restaurant) => restaurant.name.toLowerCase().includes(term));
};

const filterCompanies = (company) => {
  return restaurants.filter((restaurant) => restaurant.company === company);
};

export { loadRestaurants, searchRestaurants, filterCompanies };
