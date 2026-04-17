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
  summary.textContent = `Current watches, warnings, and advisories: ${count}`;
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
}

function clearError() {
  if (!errorDiv) return;

  errorDiv.textContent = '';
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