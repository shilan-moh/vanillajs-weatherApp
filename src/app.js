// get and set the current time
function currentTime() {
  let now = new Date();
  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  let day = now.getDay();
  let weekDays = document.querySelector("#week-day");
  let hourClock = document.querySelector("#hour");
  let hour = now.getHours();
  let minutes = document.querySelector("#minutes");
  let min = now.getMinutes();

  weekDays.innerHTML = days[day - 1];
  if (minutes < 10) {
    minutes.innerHTML = `0${min}`;
  }
  if (hourClock < 10) {
    hour.innerHTML = `0${hour}`;
  }
  hourClock.innerHTML = hour;
  minutes.innerHTML = min;
}
// get weather API based on city name
function findCityForecast(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  city = cityName.value;

  let apiKey = "1fbd79b534o41dc6a309ft90c9e19e98";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(url).then(showWeather);
}

// set the weather elements based on the findCityForecast responses
function showWeather(response) {
  let cityName = document.querySelector("#city-name");
  let degreeNumber = document.querySelector("#degree-number");
  let degree = Math.round(response.data.temperature.current);
  let weatherImg = document.querySelector("#weather-img");
  let descrition = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let country = document.querySelector("#country");

  country.innerHTML = response.data.country;
  wind.innerHTML = `wind:${response.data.wind.speed}km/s`;
  humidity.innerHTML = `Humidity:${response.data.temperature.humidity}%`;
  descrition.innerHTML = response.data.condition.description;
  cityName.innerHTML = response.data.city;
  degreeNumber.innerHTML = degree;
  weatherImg.src = response.data.condition.icon_url;
}

let searchBtn = document.querySelector("#search-btn");

currentTime();
searchBtn.addEventListener("click", findCityForecast);
