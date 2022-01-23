require("dotenv").config();
const axios = require("axios");
const start = async(input) => {
    const result = await getCoordinate(input);
    if (!result.error) {
        const { current = {} } = await getWeatherData(
            result.center[0],
            result.center[1]
        );
        return {
            forecast: current.weather_descriptions[0],
            temperature: current.temperature,
            humidity: current.humidity,
            place: input,
            icons: current.weather_icons[0],
            day_or_night: current.is_day
        };
    } else {
        return {
            error: result.error,
        };
    }
};

const getCoordinate = async(place) => {
    try {
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      place
    )}.json?limit=1&country=${process.env.COUNTRY_CODE}&access_token=${
      process.env.ACCESS_TOKEN
    }`;
        const resp = await axios.get(url);
        const data = resp.data;
        if (data.features.length > 0) {
            return data.features[0];
        }
        return { error: "Cannot find any places in the coordinates provided" };
    } catch (err) {
        return { error: err };
    }
};

const getWeatherData = async(longitude, latitude) => {
    console.log(latitude, longitude);
    try {
        const url = `http://api.weatherstack.com/current?access_key=${process.env.WEATHER_ACCESS_TOKEN}&query=${latitude},${longitude}`;
        const resp = await axios.get(url);
        const data = resp.data;
        console.log(data);
        return data;
    } catch (err) {
        console.log(`Cannot get weather data ${err}`);
    }
};

module.exports = { start };