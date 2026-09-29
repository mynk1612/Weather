const API_KEY = "ed1f0a3eb6704421ad892942262809";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");

const weatherCard = document.getElementById("weatherCard");
const errorMessage = document.getElementById("errorMessage");

const cityName = document.getElementById("cityName");
const countryName = document.getElementById("countryName");

const weatherIcon = document.getElementById("weatherIcon");

const temperature = document.getElementById("temperature");
const condition = document.getElementById("condition");

const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

const lastUpdated = document.getElementById("lastUpdated");


async function getWeather() {

    const location = locationInput.value.trim();

    // Don't search if input is empty
    if (!location) {
        showError("Please enter a location.");
        return;
    }

    try {

        // Clear previous error
        errorMessage.textContent = "";

        // Show loading state
        searchButton.textContent = "Loading...";
        searchButton.disabled = true;

        const url =
            `https://api.weatherapi.com/v1/current.json` +
            `?key=${API_KEY}` +
            `&q=${encodeURIComponent(location)}` +
            `&aqi=yes`;

        const response = await fetch(url);

        const data = await response.json();

        // WeatherAPI returns an error object for invalid locations
        if (!response.ok) {
            throw new Error(
                data.error?.message || "Unable to get weather data."
            );
        }

        displayWeather(data);

    } catch (error) {

        weatherCard.classList.add("hidden");

        showError(error.message);

    } finally {

        searchButton.textContent = "Search";
        searchButton.disabled = false;
    }
}


function displayWeather(data) {

    // Location
    cityName.textContent = data.location.name;

    countryName.textContent =
        `${data.location.region}, ${data.location.country}`;

    // Temperature
    temperature.textContent = data.current.temp_c;

    // Weather condition
    condition.textContent = data.current.condition.text;

    // Weather icon
    weatherIcon.src =
        "https:" + data.current.condition.icon;

    weatherIcon.alt =
        data.current.condition.text;

    // Additional information
    feelsLike.textContent =
        `${data.current.feelslike_c}°C`;

    humidity.textContent =
        `${data.current.humidity}%`;

    wind.textContent =
        `${data.current.wind_kph} km/h`;

    // Last updated
    lastUpdated.textContent =
        data.current.last_updated;

    // Show card
    weatherCard.classList.remove("hidden");
}


function showError(message) {
    errorMessage.textContent = message;
}


// Search button
searchButton.addEventListener("click", getWeather);


// Allow pressing Enter
locationInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        getWeather();
    }

});
