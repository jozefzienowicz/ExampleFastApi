import './App.css';
import React, { useState, useEffect } from 'react';
import {
  createFavouriteZipCode,
  fetchWeatherData,
  deleteFavouriteZipCode,
  fetchFavouriteZipCodes
} from "./utils/requests";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

function App() {
  const [data, setData] = useState({});
  const [dataError, setDataError] = useState(true);
  const [favouriteZipCodes, setFavouriteZipCodes] = useState([]);
  const [zipCode, setZipCode] = useState('')

  function getUserCookie() {
    let user_cookie = localStorage.getItem("user_cookie")
    if (!user_cookie) {
      user_cookie = Math.floor(Math.random() * 1000000) + 1
      localStorage.setItem("user_cookie", user_cookie.toString());
    }
    return user_cookie
  }


  const fetchFavouriteZipCodesData = async () => {
    let user_cookie = getUserCookie()
    const response = await fetchFavouriteZipCodes(user_cookie)
    setFavouriteZipCodes(response)
  };

  useEffect( () => {
    fetchFavouriteZipCodesData();
  });

  function changeZipCode(event, value) {
    setZipCode(value)
  }

  function getValueOrNull(field) {
    return field || field === 0 ? field : '-'
  }

  const fetchData = async (zip_code) => {
    const weather_data = await fetchWeatherData(zip_code);
    weather_data['zip_code'] = zip_code
    setData(weather_data)
    if (weather_data.cod !== 200) {
      setDataError(true)
    }
    else {
      setDataError(false)
    }
  };

  async function fetchWeather(event) {
    event.preventDefault();
    await fetchData(zipCode);
  }

  async function fetchFavouriteZipCode(zip_code) {
    setZipCode(zip_code)
    await fetchData(zip_code);
  }

  async function removeFavouriteZipCode(event, id) {
    event.stopPropagation()
    const zip_codes_list = favouriteZipCodes.filter(favourite_zip_codes =>
      favourite_zip_codes.id !== id
    )
    setFavouriteZipCodes(zip_codes_list)
    await deleteFavouriteZipCode(id)
  }

  async function saveFavouriteZipCode(name, code) {
    let user_cookie = getUserCookie()
    await createFavouriteZipCode({
        name,
        code,
        user_cookie,
    })
    await fetchFavouriteZipCodesData()
  }

  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active"></li>
            <li className="nav-item"></li>
            <li className="nav-item"></li>
          </ul>
          <form
            className="form-inline my-2 my-lg-0"
            _lpchecked="1"
            onSubmit={fetchWeather}
          >
            <Autocomplete
              id="free-solo-demo"
              autoSelect
              freeSolo
              options={favouriteZipCodes.map((zip_code) => zip_code.code)}
              onChange={changeZipCode}
              renderInput={(params) => {
                return <TextField
                  {...params}
                  inputProps={{...params.inputProps, maxLength: 5}}
                  label="Zip Code"
                />
              }}
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
      <footer className="footer">
        <ul className="list-group" key={Object.keys(favouriteZipCodes).length} data-testid="favourite_zip_codes">
          {favouriteZipCodes.length ? favouriteZipCodes.map((zip_code, index) =>
            <li
              className="list-group-item"
              key={`${zip_code.name}-${zip_code.code}-${index}`}
              onClick={() => fetchFavouriteZipCode(zip_code.code)}
            >
              {zip_code.name}
              <button
                type="button"
                className="btn btn-default delete_button"
                onClick={(event) => removeFavouriteZipCode(event, zip_code.id)}
              >
                X
              </button>
            </li>
          ) : null }
        </ul>

        {!dataError && Object.keys(data).length &&
          <div contentEditable="true" spellcheckker="false">
            <div className="card" style={{'marginTop': '30px'}}>
              <div className="card mt0">
                <div className="card-body mt0">
                  <h4 className="card-title">
                    <b>{getValueOrNull(data?.name)}</b>
                  </h4>
                  <div className="row">
                    <div className="col-sm-4">
                      <h1>
                        {getValueOrNull(data?.main?.temp)}°C
                      </h1>
                      {data?.weather?.length && data.weather.map((weather, index) =>
                        <h6 key={index}>{getValueOrNull(weather?.main)}</h6>
                      )}
                    </div>
                    <div className="col-sm-4">
                      <h5>Pressure {getValueOrNull(data?.main?.pressure)} hPa</h5>
                      <h5>Humidity {getValueOrNull(data?.main?.humidity)}%</h5>
                      <h5>Wind {getValueOrNull(data?.wind?.speed)} m/s</h5>
                      <div className="row">
                        <div className="col-sm-4"></div>
                        <div className="col-sm-4 col-5"></div>
                        <div className="col-sm-4"></div>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => saveFavouriteZipCode(data?.name, data?.zip_code)}
                  >
                    Add to favorites
                  </button>
                </div>
              </div>
            </div>
            <p contentEditable="true" spellcheckker="false">
              © Firstly NodeJS 2021
            </p>
          </div>
        }
      </footer>
    </div>
  );
}

export default App;
