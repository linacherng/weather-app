document.getElementById('weatherForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const location = document.getElementById('locationInput').value.trim();
    const resultDiv = document.getElementById('result');
    resultDiv.textContent = 'Loading...';

    try {
        // Get coordinates from Open-Meteo Geocoding API
        const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(location)}&count=1`);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            resultDiv.textContent = 'Location not found.';
            return;
        }

        const { latitude, longitude, name, country } = geoData.results[0];

        // Get current weather
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
        const weatherData = await weatherRes.json();

        if (!weatherData.current_weather) {
            resultDiv.textContent = 'Weather data unavailable.';
            return;
        }

        const temp = weatherData.current_weather.temperature;
        resultDiv.textContent = `The current temperature in ${name}, ${country} is ${temp}°C.`;

    } catch (err) {
        console.error(err);
        resultDiv.textContent = 'An error occurred while fetching weather data.';
    }
});
