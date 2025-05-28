document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const currentCity = urlParams.get('city');
  const cityElement = document.getElementById("city");

  if (cityElement && currentCity) {
    const formattedCity = currentCity.charAt(0).toUpperCase() + currentCity.slice(1);
    cityElement.textContent = formattedCity;

    const dailyData = weatherData[currentCity + "_daily"].daily;
    const hourlyData = weatherData[currentCity + "_hourly"].hourly;

    const now = dayjs();
    const currentHour = now.hour();
    const hourKey = `TodayT${currentHour}:00`;
    const hourIndex = hourlyData.time.indexOf(hourKey);
    const currentTemp = hourlyData.temperature_2m[hourIndex];
    const windSpeed = dailyData.wind_speed_10m_max[0];
    const maxTemp = dailyData.temperature_2m_max[0];

    document.getElementById("current-temp").textContent = `${currentTemp} °C`;
    document.getElementById("current-wind").textContent = `${windSpeed} km/h`;
    document.getElementById("max-temp").textContent = `${maxTemp} °C`;
    document.getElementById("max-wind").textContent = `${windSpeed} km/h`;

    const forecastContainer = document.getElementById("forecast-cards");
    let html = "";
    for (let i = 0; i < 7; i++) {
      const dayLabel = i === 0 ? "Today" : now.add(i, 'day').format("ddd");
      const min = dailyData.temperature_2m_min[i];
      const max = dailyData.temperature_2m_max[i];
      html += `
        <div class="card">
          <p class="title is-6">${dayLabel}</p>
          <img class="weather-icon" src="/images/sun.png" alt="Weather" />
          <p>${min}°C - ${max}°C</p>
        </div>`;
    }
    forecastContainer.innerHTML = html;
  } else {
    cityElement.textContent = "Unknown";
  }
});
