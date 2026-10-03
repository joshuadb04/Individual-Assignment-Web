import { updateFavouriteRestaurant } from "./models/user-model.js";

const restaurantRow = (restaurant, favouriteRestaurant) => {
  const { name, address, city, company } = restaurant;
  const tr = document.createElement("tr");

  tr.innerHTML = `
    <td>${name}</td>
    <td>${address}</td>
    <td>${city}</td>
    <td>${company}</td>
    <td>
      <button class="favorite-button">
        ${restaurant._id === favouriteRestaurant ? "★" : "☆"}
      </button>
    </td>
  `;

  const favoriteButton = tr.querySelector(".favorite-button");

  favoriteButton.addEventListener("click", async (event) => {
    event.stopPropagation();

    if (!localStorage.getItem("token")) {
      alert("Please login first.");
      return;
    }

    try {
      await updateFavouriteRestaurant(restaurant._id);

      document.querySelectorAll(".favorite-button").forEach((button) => {
        button.textContent = "☆";
      });

      favoriteButton.textContent = "★";
    } catch (error) {
      console.error("Favorite error:", error);
    }
  });

  return tr;
};

const restaurantModal = (restaurant) => {
  const { name, address } = restaurant;

  return `
    <h2>${name}</h2>
    <p>Address: ${address}</p>

    <div>
      <button id="daily-menu">Daily Menu</button>
      <button id="weekly-menu">Weekly Menu</button>
    </div>

    <div id="menu-content"></div>

    <button id="close-dialog">Close</button>
  `;
};

const dailyMenu = (menu) => {
  const { courses } = menu;

  const menuHtml = courses
    .map(
      (course) => `
        <div class="meal">
          <strong>${course.name}</strong>

          <p>
            Diets:
            ${!course.diets || course.diets.length === 0 ? "Not available" : course.diets}
          </p>

          <p>
            Price:
            ${course.price === "" ? "Unspecified" : course.price}
          </p>
        </div>
      `,
    )
    .join("");

  return `
    <h3>Daily Menu</h3>

    ${courses.length === 0 ? "<p>Not available.</p>" : menuHtml}
  `;
};

const weeklyMenu = (menu) => {
  if (!menu.days || menu.days.length === 0) {
    return `
      <h3>Weekly Menu</h3>
      <p>Not available.</p>
    `;
  }

  return `
    <h3>Weekly Menu</h3>

    ${menu.days
      .map(
        (day) => `
          <h3>${day.date}</h3>

          ${
            day.courses.length === 0
              ? "<p>Not available.</p>"
              : day.courses
                  .map(
                    (course) => `
                      <div class="meal">
                        <strong>${course.name}</strong>

                        <p>
                          Diets:
                          ${!course.diets || course.diets.length === 0 ? "Not available" : course.diets}
                        </p>

                        <p>
                          Price:
                          ${course.price === "" ? "Unspecified" : course.price}
                        </p>
                      </div>
                    `,
                  )
                  .join("")
          }
        `,
      )
      .join("")}
  `;
};

export { restaurantRow, restaurantModal, dailyMenu, weeklyMenu };
