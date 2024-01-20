//Searched City and API Links
function searchCity(city) {
  let apiKey = "74a685e33bd3f486faa1o3tac33e021d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function searchInput(event) {
  event.preventDefault();
  let citySearchInput = document.querySelector("#city-search-input");
  searchCity(citySearchInput.value);
}

function getForecast(city) {
  let apiKey = "74a685e33bd3f486faa1o3tac33e021d";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherOutlook);
}

//Searched City Current Weather
function displayWeather(response) {
  let tempElement = document.querySelector("#current-temp");
  let cityElement = document.querySelector("#current-city");
  let currentWeatherConditionElement = document.querySelector(
    "#weather-condition-currently"
  );
  let currentHumidityElement = document.querySelector("#humidity-conditions");
  let currentWindElement = document.querySelector("#wind-conditions");
  let weatherIconElement = document.querySelector("#weather-icon");

  tempElement.innerHTML = Math.round(response.data.temperature.current);
  cityElement.innerHTML = response.data.city;
  currentWeatherConditionElement.innerHTML =
    response.data.condition.description;
  currentHumidityElement.innerHTML = response.data.temperature.humidity;
  currentWindElement.innerHTML = Math.round(response.data.wind.speed);
  weatherIconElement.innerHTML = `<img src=${response.data.condition.icon_url} class="weather-icon" />`;

  getForecast(response.data.city);
}

//Five Day Forecast For Searched City
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return daysOfTheWeek[date.getDay()];
}

function displayWeatherOutlook(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
    <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
          <br />
        <div class="weather-forecast-icon"><img src="${
          day.condition.icon_url
        }" alt="weather icon"/></div>
        <div class="weather-forecast-temps">
            <span class="weather-forecast-temp-max">${Math.round(
              day.temperature.maximum
            )}°C </span>
            <span class="weather-forecast-temp-min">${Math.round(
              day.temperature.minimum
            )}°C</span>
          </div>
    </div>
    `;
    }
  });

  let forecastElement = document.querySelector("#weather-outlook");
  forecastElement.innerHTML = forecastHtml;
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", searchInput);

searchCity("Newcastle Upon Tyne");

//Current Time and Date Info For Searched City
function timeZoneForSearchedCity() {
  let localTime = moment()
    .tz("Europe/London")
    .format("dddd, MMM Do YYYY h:mm:ss A");
  let localTimeElement = document.querySelector("#current-time");
  localTimeElement.innerHTML = localTime;
}

setInterval(timeZoneForSearchedCity, 1000);
