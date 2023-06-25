import { useEffect, useState } from "react";
import cold from "./assets/blue-sky-and-sun-bgfoto.jpg"
import hot from "./assets/hotBg.jpg"
import Descriptions from "./components/Descriptions";
import { getFormattedWeatherData } from "./weatherService";

function App() {
  const [city, setCity] = useState("Paris");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hot);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      setError(null);
      try {
        const data = await getFormattedWeatherData(city, units);
        setWeather(data);

        const threshold = units === "metric" ? 20 : 68;
        setBg(data.temp <= threshold ? cold : hot);
      } catch (error) {
        setError('City not found');
      }
    };

    fetchWeatherData();
  }, [units, city]);

  const handleUnitsClick = () => {
    setUnits(prevUnit => prevUnit === "metric" ? "imperial" : "metric");
  }

  const enterKeyPressed = (e) => {
    if(e.key === 'Enter'){
      setCity(e.target.value);
    }
  }

  return (
    <div className="app" style={{backgroundImage: `url(${bg})`}}> 
      {error && <div className="error"><p>Error: {error}</p></div>}
      <div className="overlay">
        {
          weather && (
            <div className="container">
              <div className="section section_inputs">
                <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter city...." />
                <button onClick={handleUnitsClick}>°{units === "metric" ? "F" : "C"}</button>
              </div>
              <div className="section section_temperature">
                <div className="icon">
                  <h3>{`${weather.name}, ${weather.country}`}</h3>
                  <img src={weather.iconURL} alt="weatehr icon" />
                  <h1>{weather.description}</h1>
                </div>
                <div className="temperature">
                  <h1>{`${weather.temp.toFixed()}°${units === "metric" ? "C" : "F"}`}</h1>
                </div>
              </div>
              <Descriptions  weather={weather} units={units}/>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default App;
