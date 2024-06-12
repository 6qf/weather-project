
document.getElementById('search').addEventListener('click', () => {
    const city = document.getElementById('city').value;
    fetchWeather(city);
});

async function fetchWeather(city) {
    const apiKey = '5350fa14b7aa2c59cfee7d4b2e2a58b9'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            displayWeather(data);
        } else {
            alert(data.message);
        }
    } catch (error) {
        alert('Failed to fetch weather data');
    }
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const weatherDescription = data.weather[0].description;

    // Update weather info display
    document.querySelector('.city-name').textContent = cityName;
    document.querySelector('.temperature').textContent = `Temperature: ${temperature}°C`;
    document.querySelector('.description').textContent = `Weather: ${weatherDescription}`;

    // Update background based on weather description
    const body = document.querySelector('body');
    let weatherBackground = '';

    // Example background changes based on weather description
    if (weatherDescription.includes('clear')) {
        weatherBackground = 'url("clear-sky.jpg")';
    } else if (weatherDescription.includes('clouds')) {
        weatherBackground = 'url("cloudy-sky.jpg")';
    } else if (weatherDescription.includes('rain')) {
        weatherBackground = 'url("rainy-day.jpg")';
    } else {
        // Default background
        weatherBackground = '#00c6ff'; // Default background color
    }

    body.style.transition = 'background 0.5s ease'; // Smooth transition
    body.style.backgroundImage = weatherBackground;
    body.style.backgroundSize = 'cover'; // Ensure the background covers the entire area
    body.style.backgroundRepeat = 'no-repeat'; // Prevent tiling
    body.style.backgroundPosition = 'center center'; // Center the background
}

