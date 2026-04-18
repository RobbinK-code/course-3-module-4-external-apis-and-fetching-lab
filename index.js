// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const input = document.getElementById('state');
const button = document.getElementById('fetch-button');
const alertsContainer = document.getElementById('alerts-display');
const errorDiv = document.getElementById('error-message');

async function fetchWeatherAlerts(state) {
  try {
    const response = await fetch(`${weatherApi}${state}`);

    if (!response.ok) {
      throw new Error('Unable to fetch weather alerts');
    }

    const data = await response.json();

    displayAlerts(data);
    clearError();

  } catch (error) {
    displayError(error.message);
  }
}

function displayAlerts(data) {
  if (!alertsContainer) return;

  alertsContainer.innerHTML = '';

  const count = data.features.length;

  const summary = document.createElement('h2');
  summary.textContent = `Weather Alerts: ${count}`;
  alertsContainer.appendChild(summary);

  const ul = document.createElement('ul');

  data.features.forEach(alert => {
    const li = document.createElement('li');
    li.textContent = alert.properties.headline;
    ul.appendChild(li);
  });

  alertsContainer.appendChild(ul);
}

function displayError(message) {
  if (!errorDiv) return;

  errorDiv.textContent = message;
  errorDiv.classList.remove('hidden');
}

function clearError() {
  if (!errorDiv) return;

  errorDiv.textContent = '';
  errorDiv.classList.add('hidden');
}

if (button && input) {
  button.addEventListener('click', () => {
    const state = input.value.trim().toUpperCase();

    if (!state) {
      displayError('Please enter a state abbreviation');
      return;
    }

    fetchWeatherAlerts(state);

    input.value = '';
  });
}