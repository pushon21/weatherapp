const api = "19b328af3ac3e0afb70182667a745588";
const apiurl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error p");

// Initially hide the error message
errorMessage.style.display = "none";

async function checkweather(city) {
  try {
    const response = await fetch(`${apiurl}${city}&appid=${api}`);
    const data = await response.json();

    if (data.cod === "404") {
      errorMessage.style.display = "block";
    } else {
      errorMessage.style.display = "none";
      console.log(data);

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°C";
      document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
      document.querySelector(".wind").innerHTML = data.wind.speed + "Km/h";

      switch (data.weather[0].main) {
        case "Clouds":
          weatherIcon.src = "assets/image/clouds.gif";
          break;
        case "Rain":
          weatherIcon.src = "assets/image/rain.gif";
          break;
        case "Clear":
          weatherIcon.src = "assets/image/clear.gif";
          break;
        case "Drizzle":
          weatherIcon.src = "assets/image/drizzle.gif";
          break;
        case "Haze":
          weatherIcon.src = "assets/image/mist.gif";
          break;
        default:
          weatherIcon.src = "assets/image/default.gif";
          break;
      }
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
    errorMessage.style.display = "block";
  }
}

searchBtn.addEventListener("click", function () {
  const city = searchBox.value.trim();
  if (city) {
    checkweather(city);
  } else {
    errorMessage.style.display = "block";
  }
});
