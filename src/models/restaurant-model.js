import { baseUrl } from "../variables.js";
import { fetchData } from "../utils.js";

const getRestaurants = async () => {
  return await fetchData(`${baseUrl}/restaurants`);
};

const getDailyMenu = async (restaurantId) => {
  return await fetchData(`${baseUrl}/restaurants/daily/${restaurantId}/en`);
};

const getWeeklyMenu = async (restaurantId) => {
  return await fetchData(`${baseUrl}/restaurants/weekly/${restaurantId}/en`);
};

export { getRestaurants, getDailyMenu, getWeeklyMenu };
