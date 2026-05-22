import { useEffect, useMemo, useState } from "react";

const API_URL = "http://127.0.0.1:8000/weather/";

const weatherEmoji = (main) => {
  if (!main) return "🌈";
  const weather = main.toLowerCase();
  if (weather.includes("cloud")) return "☁️";
  if (weather.includes("rain") || weather.includes("drizzle")) return "🌧️";
  if (weather.includes("thunder")) return "⛈️";
  if (weather.includes("snow")) return "❄️";
  if (weather.includes("clear")) return "☀️";
  if (weather.includes("mist") || weather.includes("fog") || weather.includes("haze")) return "🌫️";
  return "🌤️";
};

const formatTime = (timestamp, zoneOffset = 0) => {
  if (!timestamp) return "—";
  return new Date((timestamp + zoneOffset) * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

function App() {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const bgMode = useMemo(() => {
    const temp = weather?.weather_response?.main?.temp;
    if (temp == null) return "cool";
    if (temp >= 28) return "hot";
    if (temp >= 18) return "warm";
    if (temp >= 8) return "mild";
    return "cold";
  }, [weather]);

  const backgroundClass = `page page--${bgMode}`;

  const fetchWeather = async (cityName) => {
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ city: cityName }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Unable to load weather");
      }
      setWeather(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather(city);
  }, []);

  const info = weather?.weather_response ?? {};
  const main = info.main || {};
  const wind = info.wind || {};
  const sys = info.sys || {};
  const weatherMain = info.weather?.[0]?.main;
  const description = info.weather?.[0]?.description;

  return (
    <div className={backgroundClass}>
      <div className="scene">
        <div className="glow" />
        <div className="cloud cloud--one" />
        <div className="cloud cloud--two" />
      </div>
      <main className="panel">
        <section className="hero">
          <div>
            <p className="eyebrow">Weather Magic</p>
            <h1>Live weather details in one place</h1>
            <p className="subtitle">
              Search any city and view the latest weather data with a clean, structured interface.
            </p>
          </div>
          <form
            className="search"
            onSubmit={(event) => {
              event.preventDefault();
              fetchWeather(city);
            }}
          >
            <input
              aria-label="City"
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Enter city name"
            />
            <button type="submit">Show forecast</button>
          </form>
        </section>

        <section className="weather-card">
          <div className="weather-card__header">
            <div>
              <p className="location">{info.name || "Unknown city"}, {weather?.country || "—"}</p>
              <p className="condition">{description ? description.toUpperCase() : "Search for a city"}</p>
            </div>
            <div className="weather-icon">{weatherEmoji(weatherMain)}</div>
          </div>

          <div className="weather-card__body">
            <div className="temp-display">
              <span>{loading ? "..." : main.temp != null ? `${Math.round(main.temp)}°C` : "—"}</span>
              <p>{weatherMain || "Clear skies"}</p>
            </div>
            <div className="stats-grid">
              <Stat label="Feels like" value={main.feels_like != null ? `${Math.round(main.feels_like)}°C` : "—"} />
              <Stat label="Humidity" value={main.humidity != null ? `${main.humidity}%` : "—"} />
              <Stat label="Pressure" value={main.pressure != null ? `${main.pressure} hPa` : "—"} />
              <Stat label="Wind" value={wind.speed != null ? `${wind.speed} m/s` : "—"} />
              <Stat label="Sunrise" value={formatTime(sys.sunrise, info.timezone)} />
              <Stat label="Sunset" value={formatTime(sys.sunset, info.timezone)} />
            </div>
          </div>

          <div className="weather-card__footer">
            <button
              className="ghost-button"
              type="button"
              onClick={() => setShowDetails((prev) => !prev)}
            >
              {showDetails ? "Hide details" : "Show more details"}
            </button>
            {error && <p className="feedback feedback--error">{error}</p>}
            {loading && <p className="feedback">Loading latest weather...</p>}
            {showDetails && !loading && (
              <div className="details-grid">
                <Detail label="Country" value={weather?.country || "—"} />
                <Detail label="City" value={info.name || "—"} />
                <Detail label="Condition" value={description ? description : "—"} />
                <Detail label="Clouds" value={info.clouds?.all != null ? `${info.clouds.all}%` : "—"} />
                <Detail label="Visibility" value={info.visibility != null ? `${info.visibility} m` : "—"} />
                <Detail label="Wind speed" value={wind.speed != null ? `${wind.speed} m/s` : "—"} />
                <Detail label="Wind direction" value={wind.deg != null ? `${wind.deg}°` : "—"} />
                <Detail label="Temperature" value={main.temp != null ? `${main.temp}°C` : "—"} />
                <Detail label="Feels like" value={main.feels_like != null ? `${main.feels_like}°C` : "—"} />
                <Detail label="Humidity" value={main.humidity != null ? `${main.humidity}%` : "—"} />
                <Detail label="Pressure" value={main.pressure != null ? `${main.pressure} hPa` : "—"} />
                <Detail label="Sunrise" value={formatTime(sys.sunrise, info.timezone)} />
                <Detail label="Sunset" value={formatTime(sys.sunset, info.timezone)} />
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

function Stat({ label, value }) {
  return (
    <div className="stat-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Detail({ label, value }) {
  return (
    <div className="detail-card">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

export default App;
