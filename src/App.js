// import icons
import { useState } from "react";
import clearIcon from "./Assets/clear.png";
import cloudIcon from "./Assets/cloud.png";
import drizzleIcon from "./Assets/drizzle.png";
import humidityIcon from "./Assets/humidity.png";
import rainIcon from "./Assets/rain.png";
import searchIcon from "./Assets/search.png";
import snowIcon from "./Assets/snow.png";
import windIcon from "./Assets/wind.png";

let API_KEY = "e48d84a33ce942f787ebc2d9c4a32afb";

function App() {
  // Controlled states
  const [temperature, setTemperature] = useState(21);
  const [inputCity, setInputCity] = useState("");
  const [city, setCity] = useState("Nigeria");
  const [humidity, setHumidity] = useState(74);
  const [wind, setWind] = useState(5.66);
  const [weatherIcon, setWeatherIcon] = useState(cloudIcon);

  // Handle Search
  const handleSearch = async () => {
    let URL = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&units=Metric&appid=${API_KEY}`;
    const data = await fetch(URL)
      .then((response) => {
        if (!response.ok) {
          alert("Please try a valid city name");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        // Handle weather data
        return data;
      })
      .catch((error) => {
        // Handle errors
        alert("Error fetching weather data!");
      });
    if (data) {
      setCity(inputCity);
      setTemperature(Math.floor(data.main.temp));
      setHumidity(Math.floor(data.main.humidity));
      setWind(data.wind.speed);
      let iconId = data.weather[0].icon;
      if (iconId === "01d" || iconId === "01n") {
        setWeatherIcon(clearIcon);
      } else if (iconId === "02d" || iconId === "02n") {
        setWeatherIcon(cloudIcon);
      } else if (
        iconId === "03d" ||
        iconId === "03n" ||
        iconId === "04d" ||
        iconId === "04n"
      ) {
        setWeatherIcon(drizzleIcon);
      } else if (
        iconId === "09d" ||
        iconId === "09n" ||
        iconId === "10d" ||
        iconId === "10n"
      ) {
        setWeatherIcon(rainIcon);
      } else if (iconId === "13d" || iconId === "13n") {
        setWeatherIcon(snowIcon);
      } else {
        setWeatherIcon(clearIcon);
      }
    }
  };

  return (
    <div className="App flex justify-center items-center  h-[100vh]">
      {/* Search bar  */}
      <div className="container box-border text-white rounded-xl bg-custom-gradient mx-auto py-10 w-[90%] max-w-md">
        <div className="flex justify-center items-center space-x-2 max-w-[80%] mx-auto">
          <input
            className="bg-[#EBFDF9] outline-none text-black p-2 pl-6 rounded-[100px] w-[100%]"
            placeholder="Search"
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
          />
          <div
            className="h-10 w-10 p-2 flex justify-center items-center bg-[#EBFDF9] rounded-[50%]"
            onClick={handleSearch}
          >
            <img
              className="h-4 w-4 cursor-pointer"
              src={searchIcon}
              alt="Search Icon"
            />
          </div>
        </div>

        {/* Weather icon  */}
        <img
          className="max-w-[10rem] mx-auto mt-6"
          src={weatherIcon}
          alt="Weather icon"
        />

        {/* Temperature  */}
        <h1 className="text-[5rem] text-center mt-[-.5rem]">
          {temperature}° C
        </h1>
        <h2 className="text-[3rem] text-center mt-[-1.5rem]">{city}</h2>

        {/* Humidity and wind speed  */}
        <div className="flex justify-between max-w-[80%] mx-auto mt-6">
          <div className="flex space-x-2 items-center">
            <img className="w-7 h-7" src={humidityIcon} alt="Humidity Icon" />
            <div>
              <p className="text-center text-xl">{humidity} %</p>
              <p className="text-sm text-center">Humidity</p>
            </div>
          </div>
          <div className="flex space-x-2 items-center">
            <img className="w-7 h-7" src={windIcon} alt="Wind Icon" />
            <div>
              <p className="text-center text-xl">{wind} km/h</p>
              <p className="text-sm text-center">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
