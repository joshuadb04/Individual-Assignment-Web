import { restaurantRow, restaurantModal, dailyMenu, weeklyMenu } from "./components.js";
import { getDailyMenu, getWeeklyMenu } from "./models/restaurant-model.js";
import { loadRestaurants, filterCompanies } from "./controllers/restaurant-controller.js";
import * as L from "https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js";

const restaurantTable = document.querySelector("#restaurant-table");
const restaurantDialog = document.querySelector("#restaurant-dialog");
const allButton = document.querySelector("#all");
const sodexoButton = document.querySelector("#sodexo");
const compassButton = document.querySelector("#compass");
const cityFilter = document.querySelector("#city-filter");

const showRestaurants = async (restaurants) => {
  try {
    for (const restaurant of restaurants) {
      const tr = restaurantRow(restaurant);

      tr.addEventListener("click", async () => {
        document.querySelectorAll(".highlight").forEach((element) => {
          element.classList.remove("highlight");
        });

        tr.classList.add("highlight");

        try {
          const menu = await getDailyMenu(restaurant._id);

          restaurantDialog.innerHTML = restaurantModal(restaurant);
          restaurantDialog.querySelector("#menu-content").innerHTML = dailyMenu(menu);
          restaurantDialog.show();

          restaurantDialog.querySelector("#daily-menu").addEventListener("click", async () => {
            const daily = await getDailyMenu(restaurant._id);
            restaurantDialog.querySelector("#menu-content").innerHTML = dailyMenu(daily);
          });

          restaurantDialog.querySelector("#weekly-menu").addEventListener("click", async () => {
            const weekly = await getWeeklyMenu(restaurant._id);
            restaurantDialog.querySelector("#menu-content").innerHTML = weeklyMenu(weekly);
          });

          restaurantDialog.querySelector("#close-dialog").addEventListener("click", () => {
            restaurantDialog.close();
          });
        } catch (error) {
          console.error(error);
        }
      });

      restaurantTable.append(tr);
    }
  } catch (error) {
    console.error(error);
  }
};

// Load restaurants
const restaurants = await loadRestaurants();

// Part of city filter
const cities = [];

for (const restaurant of restaurants) {
  if (!cities.includes(restaurant.city)) {
    cities.push(restaurant.city);
  }
}

cities.sort();

for (const city of cities) {
  cityFilter.innerHTML += `<option>${city}</option>`;
}

// Display restaurants
showRestaurants(restaurants);

// Company filters
sodexoButton.addEventListener("click", () => {
  const filteredRestaurants = filterCompanies("Sodexo");

  restaurantTable.innerHTML = "";

  showRestaurants(filteredRestaurants);
});

compassButton.addEventListener("click", () => {
  const filteredRestaurants = filterCompanies("Compass Group");

  restaurantTable.innerHTML = "";

  showRestaurants(filteredRestaurants);
});

allButton.addEventListener("click", () => {
  restaurantTable.innerHTML = "";

  showRestaurants(restaurants);
});

// City filter
cityFilter.addEventListener("change", () => {
  const selectedCity = cityFilter.value;

  if (selectedCity === "all") {
    restaurantTable.innerHTML = "";

    showRestaurants(restaurants);
  } else {
    const filteredRestaurants = restaurants.filter((restaurant) => restaurant.city === selectedCity);

    restaurantTable.innerHTML = "";

    showRestaurants(filteredRestaurants);
  }
});
