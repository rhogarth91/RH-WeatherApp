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
}

//Searched City Name
function searchInput(event) {
  event.preventDefault();

  let citySearchInput = document.querySelector("#city-search-input");
  let userCityInput = citySearchInput.value;
  let apiKey = "74a685e33bd3f486faa1o3tac33e021d";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${userCityInput}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

let form = document.querySelector("#city-search-form");
form.addEventListener("submit", searchInput);

//Five Day Forecast
function displayWeatherOutlook() {
  let days = ["Tues", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="weather-forecast-day">
        <div class="weather-forecast-date">${day}</div>
          <br />
        <div class="weather-forecast-icon"><img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
            alt=""
            width="50"
          /></div>
        <div class="weather-forecast-temps">
            <span class="weather-forecast-temp-max">9°C </span>
            <span class="weather-forecast-temp-min">7°C </span>
          </div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#weather-outlook");
  forecastElement.innerHTML = forecastHtml;
}

displayWeatherOutlook();

//Current Time and Date Info
let timeAndDateNow = new Date();

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let currentDay = daysOfWeek[timeAndDateNow.getDay()];

let currentDate = timeAndDateNow.getDate();

let monthsInYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];
let currentMonth = monthsInYear[timeAndDateNow.getMonth()];

let currentYear = timeAndDateNow.getFullYear();

let hour = timeAndDateNow.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let mintues = timeAndDateNow.getMinutes();
if (mintues < 10) {
  mintues = `0${mintues}`;
}

let uptodateDateAndTime = document.querySelector("#current-time");
uptodateDateAndTime.innerHTML = `${currentDay} ${currentDate} ${currentMonth} ${currentYear}, ${hour}:${mintues}`;
