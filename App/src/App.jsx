import { useState } from "react";
import "./App.css";
import backgroundImage from "./assets/Designer.jpeg"; // Correct path

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    const apiKey = "29ee10f04e3103478aff16b48e4b2908";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
      setError("");
      const response = await fetch(url);
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setWeather(data);
    } catch (error) {
      setWeather(null);
      setError(error.message);
    }
  };

  return (
    <div
      className="app"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          padding: "10px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "1px solid gray",
          marginRight: "10px",
        }}
      />
      <button
        onClick={fetchWeather}
        style={{
          padding: "10px 15px",
          fontSize: "16px",
          borderRadius: "5px",
          border: "none",
          backgroundColor: "blue",
          color: "white",
          cursor: "pointer",
        }}
      >
        Get Weather
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {weather && (
        <div
          style={{
            marginTop: "20px",
            background: "rgba(0, 0, 0, 0.5)",
            padding: "20px",
            borderRadius: "10px",
            display: "inline-block",
            color: "white",
          }}
        >
          <h2>
            {weather.name}, {weather.sys.country}
          </h2>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Day: {new Date().toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
}

export default App;
