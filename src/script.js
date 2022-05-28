function formatDate(date) {
  let currentDate = date.getDate();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let currentMonth = months[date.getMonth()];
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  let dateAndTime = document.querySelector("#date-and-time");
  dateAndTime.innerHTML = `<small>${currentDay}, ${currentMonth} ${currentDate} | ${currentHour}:${currentMinutes}</small>`;
}
function showWeather(response) {
  let searchedCity = document.querySelector("#city-location");
  searchedCity.innerHTML = response.data.name;
  let cityTemp = document.querySelector("#temperature-of-city-location");
  cityTemp.innerHTML = Math.round(response.data.main.temp);

  fahrenheitTemp = response.data.main.temp;

  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed);
  let todaysHighTemp = document.querySelector("#today-high-temp");
  todaysHighTemp.innerHTML = Math.round(response.data.main.temp_max);
  let todaysLowTemp = document.querySelector("#today-low-temp");
  todaysLowTemp.innerHTML = Math.round(response.data.main.temp_min);
  let weatherIcon = document.querySelector("#main-weather-icon");
  let weatherDescription = response.data.weather[0].description;
  weatherIcon.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  weatherIcon.setAttribute("alt", weatherDescription);
}
function getLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ecdc34b15a757eb8ea71f46be9b2f189";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showWeather);
}
function getPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}
function searchCity(city) {
  let apiKey = "ecdc34b15a757eb8ea71f46be9b2f189";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  axios.get(`${apiUrl}`).then(showWeather);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityImput = document.querySelector("#search-bar-input");
  let city = cityImput.value;
  searchCity(city);
}
function changeTempMeasurement(event) {
  event.preventDefault();
  let temp = document.querySelector("#temperature-of-city-location");
  let celsiusTemp = Math.round(((fahrenheitTemp - 32) * 5) / 9);
  if (changeButton.innerHTML === "F°") {
    changeButton.innerHTML = "C°";
    temp.innerHTML = celsiusTemp;
  } else if (changeButton.innerHTML === "C°") {
    changeButton.innerHTML = "F°";
    temp.innerHTML = Math.round(fahrenheitTemp);
  }
}
let now = new Date();
let searchForm = document.querySelector("#search-form");
let currentLocationButton = document.querySelector("#current-location-button");
let changeButton = document.querySelector("#temp-unit-button");
let fahrenheitTemp = null;

currentLocationButton.addEventListener("click", getPosition);
searchForm.addEventListener("submit", handleSubmit);
changeButton.addEventListener("click", changeTempMeasurement);

searchCity("Los Angeles");
formatDate(now);
