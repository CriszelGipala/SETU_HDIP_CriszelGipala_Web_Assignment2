import { createForecastCard } from './components/forecast-card.js';

function renderForecast(data, container) {
  const daily = data.daily;
  let html = '';

  for (let i = 0; i < daily.time.length; i++) {
    html += createForecastCard(
      daily.time[i],
      daily.weather_code[i],
      daily.temperature_2m_min[i],
      daily.temperature_2m_max[i]
    );
  }

  container.innerHTML = html;
}
