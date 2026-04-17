// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const input = document.getElementById('state-input');
const button = document.getElementById('get-alerts');
const alertsContainer = document.getElementById('alerts');
const errorDiv = document.getElementById('error-message');

async function fetchWeatherAlerts(state) {
  try {
    const response = await fetch(`https://api.weather.gov/alerts/active?area=${state}`);

    if (!response.ok) {
      throw new Error('Failed to fetch weather alerts');
    }

    const data = await response.json();

    displayAlerts(data);

    errorDiv.textContent = '';
    errorDiv.style.display = 'none';

  } catch (error) {
    errorDiv.textContent = error.message;
    errorDiv.style.display = 'block';
  }
}

function displayAlerts(data) {
  alertsContainer.innerHTML = '';

  const state = input.value.toUpperCase();
  const summary = document.createElement('h2');
  summary.textContent = `Current watches, warnings, and advisories for ${state}: ${data.features.length}`;
  alertsContainer.appendChild(summary);

  const ul = document.createElement('ul');

  data.features.forEach(alert => {
    const li = document.createElement('li');
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  alertsContainer.appendChild(ul);
}

button.addEventListener('click', () => {
  const state = input.value.trim().toUpperCase();

  if (!state) {
    errorDiv.textContent = 'Please enter a state abbreviation.';
    errorDiv.style.display = 'block';
    return;
  }

  fetchWeatherAlerts(state);

  input.value = '';
});