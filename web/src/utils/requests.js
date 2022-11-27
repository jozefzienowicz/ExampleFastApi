export const fetchWeatherData = async (zip_code) => {
  const response = await fetch(
    `http://api.openweathermap.org/` +
    `data/2.5/weather?zip=${zip_code}` +
    `,us&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`
  );
  return await response.json()
};

export const fetchFavouriteZipCodes = async (user_cookie) => {
  const response = await fetch(
    `http://localhost:5000/api/favourite_zip_code/${user_cookie}`,
    {
      method: 'get',
      headers: {"Content-Type": "application/json; charset=utf-8"},
    }
  );
  return await response.json()
};

export const createFavouriteZipCode = async (zip_code_data) => {
  const response = await fetch(
    'http://localhost:5000/api/favourite_zip_code/',
    {
      method: 'post',
      body: JSON.stringify(zip_code_data),
      headers: {"Content-Type": "application/json; charset=utf-8"},
    }
  );
  return await response.json()
};

export const deleteFavouriteZipCode = async (zip_code_id) => {
  const response = await fetch(
    `http://localhost:5000/api/favourite_zip_code/${zip_code_id}`,
    {
      method: 'delete',
      headers: {"Content-Type": "application/json; charset=utf-8"},
    }
  );
  return await response.json()
};
