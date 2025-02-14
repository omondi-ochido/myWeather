async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '9e88b71aa1066f983af4e05fb64481b5'; // Your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    const button = document.getElementById('get-weather-btn');
    const spinner = document.getElementById('loading-spinner');
    button.disabled = true;
    spinner.style.display = 'block';

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherResult = document.getElementById('weather-result');
            weatherResult.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${data.main.temp}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            weatherResult.classList.add('fade-in');
        } else {
            alert('City not found. Please try again.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data. Please try again later.');
    } finally {
        button.disabled = false;
        spinner.style.display = 'none';
    }
}
