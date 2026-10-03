import * as L from "https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js";

// Restaurants
const restaurants = await fetch("https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants").then((response) =>
  response.json(),
);

// Map
const map = L.map("map").setView([60.188222, 24.829696], 13);

L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Distance calculation
const getDistance = (latitude1, longitude1, latitude2, longitude2) => {
  const earthRadius = 6371;

  const latitudeDifference = ((latitude2 - latitude1) * Math.PI) / 180;
  const longitudeDifference = ((longitude2 - longitude1) * Math.PI) / 180;

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos((latitude1 * Math.PI) / 180) *
      Math.cos((latitude2 * Math.PI) / 180) *
      Math.sin(longitudeDifference / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
};

// Restaurant markers
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

// User location
navigator.geolocation.getCurrentPosition((position) => {
  const y1 = position.coords.latitude;
  const x1 = position.coords.longitude;
  console.log("Latitude:", position.coords.latitude);
  console.log("Longitude:", position.coords.longitude);
  console.log("Accuracy:", position.coords.accuracy, "meters");
  console.log("User location:", y1, x1);

  L.circleMarker([y1, x1], {
    color: "#c94f70",
    radius: 8,
  }).addTo(map);

  // Find nearest restaurant
  let nearestRestaurant = null;
  let shortestDistance = Infinity;

  restaurants.forEach((restaurant) => {
    const coordinates = restaurant.location.coordinates;

    const longitude = coordinates[0];
    const latitude = coordinates[1];

    const distance = getDistance(y1, x1, latitude, longitude);

    if (distance < shortestDistance) {
      shortestDistance = distance;
      nearestRestaurant = restaurant;
    }
  });

  document.querySelector("#nearest-name").textContent = nearestRestaurant.name;
  document.querySelector("#nearest-address").textContent = nearestRestaurant.address;

  console.log("Nearest restaurant:", nearestRestaurant.name);
  console.log("Distance:", shortestDistance.toFixed(2), "km");
});
