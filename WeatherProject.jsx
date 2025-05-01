import React, { useState } from "react";

const WeatherProject = () => {
  const [city, setCity] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  async function searchCity() {
    if (!city) return;             //if we can not enter city name then it can't search
    try{
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=7ebfdd692635dda19b4610e9c094c8a3&units=metric`
    );

    let finalRes = await res.json();
    console.log(finalRes);
    if (finalRes.cod !== 200) {
      setError(finalRes.message); // API returns an error message for invalid cities
      setResult(null); // Clear previous result
    } else {
      setResult(finalRes);
      setError(""); // Clear previous error
    }
  } catch (error) {
    setError("Failed to fetch data. Please try again later.");
    setResult(null);
  }

  }
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      searchCity();
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen  p-6"  style={{
        backgroundImage: "url('https://wallpaperbat.com/img/250886-sunny-day-wallpaper.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}>
      <h1 className="text-8xl font-bold -mt-50 mb-20 sm:text-center">Weather Forecast</h1>

     
      <div className="flex gap-4 mb-6 w-full max-w-md">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)}  placeholder="Enter City Name..."  
        onKeyDown={handleKeyPress} 
          className="w-full px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white outline-none focus:ring-2 focus:ring-yellow-400"
        />
        <button
          onClick={searchCity} 
          className="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 hover:cursor-pointer transition rounded-lg font-semibold text-gray-100"
        >
          Search
        </button>
      </div>

      
      {result ? (
        <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg text-center text-gray-100">
          <h2 className="text-2xl font-semibold mb-2">
            {result.name}, {result.sys.country}
          </h2>
          <img
            src={`http://openweathermap.org/img/wn/${result.weather[0].icon}@2x.png`}
            alt="Weather Icon"
            className="w-20 mx-auto"
          />
          <p className="text-lg font-bold capitalize">{result.weather[0].description}</p>

          <div className="mt-4 text-lg">
            <p>🌡️ Temperature: <span className="font-bold">{result.main.temp}°C</span></p>
            <p>💨 Wind Speed: <span className="font-bold">{result.wind.speed} m/s</span></p>
            <p>💧 Humidity: <span className="font-bold">{result.main.humidity}%</span></p>
          </div>
        </div>
      ) : (
        <div className="text-white-400 text-center mt-4 text-bold font-semibold">
  {error ? <p className="text-red-500">❌ {error}</p> : <p>⚠️ Please enter a city name to get the weather details!</p>}
</div>
      )}
    </div>
  );
};

export default WeatherProject;
