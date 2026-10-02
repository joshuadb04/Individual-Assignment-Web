import * as L from "https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js";

const restaurants = await fetch("https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants").then((response) =>
  response.json(),
);

const map = L.map("map").setView([60.188222, 24.829696], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

restaurants.forEach((restaurant) => {
  const coordinates = restaurant.location.coordinates;

  const longitude = coordinates[0];
  const latitude = coordinates[1];

  const marker = L.marker([latitude, longitude]).addTo(map);

  marker.bindPopup(`
    <h3>${restaurant.name}</h3>
    <p>${restaurant.address}</p>
  `);
});
