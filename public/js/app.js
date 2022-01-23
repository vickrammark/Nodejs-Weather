const getWeatherData = async(e) => {
    const weather_icon = document.getElementById("weather_icon");
    e.preventDefault();
    const form = document.getElementById("weather_form");
    const formData = new FormData(form);
    const weather_data = document.getElementById("data");
    weather_data.innerHTML = "Loading....";
    const response = await fetch(`/weather?address=${formData.get("weather")}`);
    const data = await response.json();
    if (data.error) {
        weather_data.innerHTML = `<span>${data.error}</span>`;
    } else {
        weather_data.innerHTML = `<span>It is ${
      data.forecast
    } and the temperature is ${data.temperature} degree with a humidity of ${
      data.humidity
    } percent in ${data.place}</span>. Now it is ${
      data.day_or_night === "yes" ? "Day" : "Night"
    }`;
        weather_icon.src = `${data.icons}`;
        weather_icon.hidden = false;
    }
};