import { restaurantRow, restaurantModal, dailyMenu, weeklyMenu } from "./components.js";

import { getDailyMenu, getWeeklyMenu } from "./models/restaurant-model.js";

import { loadRestaurants } from "./controllers/restaurant-controller.js";

const restaurantTable = document.querySelector("#restaurant-table");
const restaurantDialog = document.querySelector("#restaurant-dialog");

const showRestaurants = async () => {
  try {
    const restaurants = await loadRestaurants();

    for (const restaurant of restaurants) {
      const tr = restaurantRow(restaurant);

      tr.addEventListener("click", async () => {
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

showRestaurants();
