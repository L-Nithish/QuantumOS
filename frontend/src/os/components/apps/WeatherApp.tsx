interface ForecastDay {
  day: string;
  icon: string;
  temp: number;
}

const FORECAST_DATA: ForecastDay[] = [
  { day: 'Mon', icon: 'wb_sunny', temp: 22 },
  { day: 'Tue', icon: 'cloud', temp: 19 },
  { day: 'Wed', icon: 'grain', temp: 16 },
  { day: 'Thu', icon: 'wb_cloudy', temp: 18 },
  { day: 'Fri', icon: 'wb_sunny', temp: 24 },
];

export function WeatherApp() {
  return (
    <div className="weather-container">
      <div style={{ fontSize: '13px', color: 'var(--text-muted)', letterSpacing: '1px' }}>
        QUABTOM CITY
      </div>
      <div className="weather-icon">
        <span className="material-icons-outlined" style={{ fontSize: 'inherit' }}>
          wb_sunny
        </span>
      </div>
      <div className="weather-temp">21°C</div>
      <div className="weather-desc">Partly Cloudy</div>
      <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '4px' }}>
        Feels like 19°C
      </div>

      <div className="weather-details">
        <div className="weather-detail">
          <div className="weather-detail-val">62%</div>
          <div className="weather-detail-label">Humidity</div>
        </div>
        <div className="weather-detail">
          <div className="weather-detail-val">14 km/h</div>
          <div className="weather-detail-label">Wind Speed</div>
        </div>
        <div className="weather-detail">
          <div className="weather-detail-val">1013 hPa</div>
          <div className="weather-detail-label">Pressure</div>
        </div>
      </div>

      <div
        style={{
          textAlign: 'left',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--text-muted)',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          marginTop: '20px',
          marginBottom: '8px'
        }}
      >
        5-Day Forecast
      </div>
      <div className="weather-forecast">
        {FORECAST_DATA.map((f, idx) => (
          <div key={`fc-${idx}`} className="forecast-day">
            <div className="forecast-name">{f.day}</div>
            <div className="forecast-icon">
              <span className="material-icons-outlined" style={{ fontSize: 'inherit' }}>
                {f.icon}
              </span>
            </div>
            <div className="forecast-temp">{f.temp}°</div>
          </div>
        ))}
      </div>
    </div>
  );
}
