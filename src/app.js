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
  let temperature = Math.round(response.data.temperature.current);
  let weatherImg = document.querySelector("#weather-img");
  let descrition = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let farenhaitElement = document.querySelector("#farenhait");
  farenhaitElement.addEventListener("click", changeTempUnit);

  function changeTempUnit(temperature) {
    let degreeNumber = document.querySelector("#degree-number");
    degreeNumber.innerHTML = temperature * 2;
  }
  dateElement.innerHTML = currentTime(response.data.time * 1000);
  roundWind = Math.round(response.data.wind.speed);
  wind.innerHTML = ` ${roundWind} km/s`;
  humidity.innerHTML = ` ${response.data.temperature.humidity} %`;
  descrition.innerHTML = response.data.condition.description;
  cityName.innerHTML = response.data.city;
  degreeNumber.innerHTML = temperature;
  weatherImg.src = response.data.condition.icon_url;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", submitForm);
findCityForecast("Stockholm");
currentTime();
