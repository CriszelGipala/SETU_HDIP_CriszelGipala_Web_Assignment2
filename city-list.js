// it renders all cities on the dashboard

export function renderDashboard(weatherData) {
  const dashboard = document.getElementById("dashboard");
  dashboard.innerHTML = ""; // clear existing content

  // only take the first 6 city keys
  const cityKeys = Object.keys(weatherData).filter(k => k.endsWith("_daily")).slice(0, 6);

  cityKeys.forEach((cityKey) => {
    const cityData = weatherData[cityKey];
    if (cityData) {
      const card = renderCityCard(cityKey, cityData);
      dashboard.appendChild(card);
    }
  });
}

function renderCityCard(cityKey, cityData) {
  const weatherCode = cityData.daily.weather_code?.[0];
  const temp = Math.round(cityData.daily.temperature_2m_max?.[0]);

  const iconClass = mapWeatherCodeToIcon(weatherCode);

  const card = document.createElement("div");
  card.className = "city-card";

  card.innerHTML = `
   <a href="/cityFocus/?city=${cityKey.replace('_daily', '')}" class="city-link">
      <div class="weather-icon"><img src="${iconClass}" alt="Weather Icon"></div>
      <div class="city-name">${capitalize(cityKey.replace('_daily', ''))}</div>
      <div class="temp">${temp}&deg;C</div>
    </a>
  `;

  return card;
}


function mapWeatherCodeToIcon(code) {
  const iconMap = {
    0: "clear_sky.png",         // sunny
    1: "partly_cloudy.png",     // partly cloudy
    2: "cloudy.png",            // cloudy
    3: "very_cloudy.png",       // very cloudy or overcast
    61: "rain.png",             // rain
    80: "heavy_rain.png",       // heavy rain
    95: "thunderstorm.png",     // storm
  };

  const fileName = iconMap[code] || "default.png"; // fallback if code doesn't match
  return `/images/${fileName}`; // path to your icon folder
}


function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
