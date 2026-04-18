const weatherApi = "https://api.weather.gov/alerts/active?area=";

const input = document.getElementById('state');
const button = document.getElementById('get-weather');
const alertsContainer = document.getElementById('alerts-display');
const errorDiv = document.getElementById('error-message');

async function fetchWeatherAlerts(state) {
  try {
    const response = await fetch(`${weatherApi}${state}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    displayAlerts(data);
    clearError();

  } catch (error) {
    displayError(error.message);
  }
}

function displayAlerts(data) {
  alertsContainer.innerHTML = '';

  const count = data.features.length;

  const summary = document.createElement('h2');
  summary.textContent = `Weather Alerts: ${count}`;
  alertsContainer.appendChild(summary);

  data.features.forEach(alert => {
    const p = document.createElement('p');
    p.textContent = alert.properties.headline;
    alertsContainer.appendChild(p);
  });
}

function displayError(message) {
  errorDiv.textContent = message;

  errorDiv.classList.remove('hidden');
}

function clearError() {
  errorDiv.textContent = '';

  errorDiv.classList.add('hidden');
}

button.addEventListener('click', () => {
  const state = input.value.trim().toUpperCase();

  if (!state) {
    displayError('Please enter a state abbreviation');
    return;
  }

  fetchWeatherAlerts(state);

  input.value = '';
});