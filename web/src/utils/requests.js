export const fetchWeatherData = async (zip_code) => {
  const response = await fetch(
    `http://api.openweathermap.org/` +
    `data/2.5/weather?zip=${zip_code}` +
    `,us&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`
  );
  return await response.json()
};
