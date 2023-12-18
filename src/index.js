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
  currentWindElement.innerHTML = response.data.wind.speed;
  weatherIconElement.innerHTML = `<img src=${response.data.condition.icon_url}" class="current-weather-temp" />`;
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
