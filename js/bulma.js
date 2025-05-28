import { weatherData } from "../data/lab_weather_data.js";
import { renderCityCard } from "./components/city-list.js";

document.addEventListener("DOMContentLoaded", () => {
  const dashboard = document.getElementById("dashboard");

  if (dashboard) {
    const cities = Object.keys(weatherData);

    cities.forEach((cityKey) => {
      const cityElement = renderCityCard(cityKey, weatherData[cityKey]);
      dashboard.appendChild(cityElement);
    });
  }
});