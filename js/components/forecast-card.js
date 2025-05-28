import { getWeatherIconClass } from '../bulma.js';

export function createForecastCard(day, code, minTemp, maxTemp) {
  const iconClass = getWeatherIconClass(code);

  return `
    <div class="forecast-card">
      <div class="forecast-day">${day}</div>
      <i class="fa ${iconClass} weather-icon"></i>
      <div class="forecast-temp">${minTemp}°C / ${maxTemp}°C</div>
    </div>
  `;
}
