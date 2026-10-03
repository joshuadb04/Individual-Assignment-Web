import { restaurantRow, restaurantModal, dailyMenu, weeklyMenu } from "./components.js";
import { getDailyMenu, getWeeklyMenu } from "./models/restaurant-model.js";
import { getUser } from "./models/user-model.js";
import { loadRestaurants, filterCompanies } from "./controllers/restaurant-controller.js";

const restaurantTable = document.querySelector("#restaurant-table");
const restaurantDialog = document.querySelector("#restaurant-dialog");
const allButton = document.querySelector("#all");
const sodexoButton = document.querySelector("#sodexo");
const compassButton = document.querySelector("#compass");
const cityFilter = document.querySelector("#city-filter");

const showRestaurants = async (restaurants, user) => {
  try {
    for (const restaurant of restaurants) {
      const favouriteRestaurant = user ? user.favouriteRestaurant : null;

      const tr = restaurantRow(restaurant, favouriteRestaurant);

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

const restaurants = await loadRestaurants();

let user = null;

if (localStorage.getItem("token")) {
  user = await getUser();
}

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

showRestaurants(restaurants, user);

sodexoButton.addEventListener("click", () => {
  const filteredRestaurants = filterCompanies("Sodexo");

  restaurantTable.innerHTML = "";

  showRestaurants(filteredRestaurants, user);
});

compassButton.addEventListener("click", () => {
  const filteredRestaurants = filterCompanies("Compass Group");

  restaurantTable.innerHTML = "";

  showRestaurants(filteredRestaurants, user);
});

allButton.addEventListener("click", () => {
  restaurantTable.innerHTML = "";

  showRestaurants(restaurants, user);
});

cityFilter.addEventListener("change", () => {
  const selectedCity = cityFilter.value;

  restaurantTable.innerHTML = "";

  if (selectedCity === "all") {
    showRestaurants(restaurants, user);
  } else {
    const filteredRestaurants = restaurants.filter((restaurant) => restaurant.city === selectedCity);

    showRestaurants(filteredRestaurants, user);
  }
});
