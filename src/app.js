// get and set the current time
function currentTime(timestamp) {
  let now = new Date(timestamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  let min = now.getMinutes();

  if (min < 10) {
    min = `0${min}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${day} ${hour}:${min}`;
}
// get weather API based on city name
function findCityForecast(city) {
  let apiKey = "1fbd79b534o41dc6a309ft90c9e19e98";
  let url = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(url).then(showWeather);
}

function submitForm(event) {
  event.preventDefault();
  let cityName = document.querySelector("#city-input");
  city = cityName.value;
  findCityForecast(city);
}

// set the weather elements based on the findCityForecast responses
function showWeather(response) {
  let cityName = document.querySelector("#city-name");
  let degreeNumber = document.querySelector("#degree-number");
  let weatherImg = document.querySelector("#weather-img");
  let descrition = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  celsiusTempreture = response.data.temperature.current;
  let temperature = Math.round(celsiusTempreture);

  dateElement.innerHTML = currentTime(response.data.time * 1000);
  let roundWind = Math.round(response.data.wind.speed);
  wind.innerHTML = ` ${roundWind} km/s`;
  humidity.innerHTML = ` ${response.data.temperature.humidity} %`;
  descrition.innerHTML = response.data.condition.description;
  cityName.innerHTML = response.data.city;
  degreeNumber.innerHTML = temperature;
  weatherImg.src = response.data.condition.icon_url;
}

//convert celisous to farenhait
function changeTempUnitToFar(event) {
  event.preventDefault();
  let degreeNumber = document.querySelector("#degree-number");
  let temperature = Math.round((celsiusTempreture * 9) / 5 + 32);
  degreeNumber.innerHTML = temperature;
  celisous.classList.remove("active");
  farenhaitElement.classList.add("active");
  celisous.classList.add("passive");
  farenhaitElement.classList.remove("passive");
}
//convert farenhait to celisous
function changeTempUnitToCel(event) {
  event.preventDefault();
  let degreeNumber = document.querySelector("#degree-number");
  degreeNumber.innerHTML = Math.round(celsiusTempreture);
  farenhaitElement.classList.remove("active");
  farenhaitElement.classList.add("passive");

  celisous.classList.remove("passive");
  celisous.classList.add("active");
}
//
let celsiusTempreture = null;
let searchForm = document.querySelector("#search-form");
let farenhaitElement = document.querySelector("#farenhait");
let celisous = document.querySelector("#celisous");
celisous.addEventListener("click", changeTempUnitToCel);
farenhaitElement.addEventListener("click", changeTempUnitToFar);

searchForm.addEventListener("submit", submitForm);
findCityForecast("Stockholm");
currentTime();
