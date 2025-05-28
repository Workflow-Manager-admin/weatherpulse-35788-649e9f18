import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * Main container for WeatherPulse app.
 * Features: Location search, current weather, hourly forecast, weekly forecast, and weather alerts.
 * Uses mock data and returns a styled, modern weather dashboard.
 */
function WeatherPulseContainer() {
  // ----------- Mock Weather Data -----------
  const mockLocations = [
    { name: "San Francisco", lat: 37.77, lon: -122.42 },
    { name: "New York", lat: 40.71, lon: -74.01 },
    { name: "Seattle", lat: 47.61, lon: -122.33 }
  ];

  const weatherMock = {
    "San Francisco": {
      current: {
        temp: 67,
        condition: "Cloudy",
        icon: "⛅", // Unicode for cloudy
        humidity: 65,
        wind: 7
      },
      hourly: Array.from({ length: 12 }, (_, i) => ({
        hour: `${(9 + i) % 24}:00`,
        temp: 64 + Math.round(Math.sin(i / 3) * 3),
        icon: (i % 4 < 2 ? "⛅" : "☀️"),
        precipitation: i % 5 === 0 ? 15 : 0
      })),
      weekly: [
        { day: "Mon", icon: "🌧️", high: 68, low: 56 },
        { day: "Tue", icon: "⛅", high: 70, low: 57 },
        { day: "Wed", icon: "☀️", high: 74, low: 59 },
        { day: "Thu", icon: "☀️", high: 75, low: 60 },
        { day: "Fri", icon: "🌦️", high: 70, low: 58 },
        { day: "Sat", icon: "☀️", high: 72, low: 60 },
        { day: "Sun", icon: "⛅", high: 71, low: 59 },
      ],
      alerts: [
        {
          title: "Gusty Winds Advisory",
          description: "Strong gusts up to 35mph expected til 6PM.",
          severity: "warning"
        }
      ]
    },
    "New York": {
      current: {
        temp: 81,
        condition: "Sunny",
        icon: "☀️",
        humidity: 57,
        wind: 12
      },
      hourly: Array.from({ length: 12 }, (_, i) => ({
        hour: `${(9 + i) % 24}:00`,
        temp: 80 + Math.round(Math.sin(i / 4) * 3),
        icon: (i % 3 === 0 ? "🌤️" : "☀️"),
        precipitation: i === 4 ? 30 : 0
      })),
      weekly: [
        { day: "Mon", icon: "☀️", high: 83, low: 70 },
        { day: "Tue", icon: "☀️", high: 86, low: 73 },
        { day: "Wed", icon: "🌤️", high: 82, low: 69 },
        { day: "Thu", icon: "⛈️", high: 77, low: 65 },
        { day: "Fri", icon: "⛅", high: 80, low: 68 },
        { day: "Sat", icon: "☀️", high: 85, low: 72 },
        { day: "Sun", icon: "☀️", high: 87, low: 73 },
      ],
      alerts: []
    },
    "Seattle": {
      current: {
        temp: 58,
        condition: "Rainy",
        icon: "🌧️",
        humidity: 89,
        wind: 6
      },
      hourly: Array.from({ length: 12 }, (_, i) => ({
        hour: `${(9 + i) % 24}:00`,
        temp: 58 + Math.round(Math.sin(i / 2) * 2),
        icon: "🌧️",
        precipitation: 80
      })),
      weekly: [
        { day: "Mon", icon: "🌧️", high: 60, low: 54 },
        { day: "Tue", icon: "🌧️", high: 62, low: 55 },
        { day: "Wed", icon: "⛅", high: 66, low: 58 },
        { day: "Thu", icon: "☀️", high: 70, low: 59 },
        { day: "Fri", icon: "🌦️", high: 67, low: 57 },
        { day: "Sat", icon: "☀️", high: 69, low: 59 },
        { day: "Sun", icon: "⛅", high: 68, low: 58 },
      ],
      alerts: [
        {
          title: "Flood Watch",
          description: "Heavy rain; possible flooding in low-lying areas.",
          severity: "danger"
        }
      ]
    }
  };

  // ----------- State (location/user selection) -----------
  const [selected, setSelected] = useState("San Francisco");
  const [searchInput, setSearchInput] = useState("");
  const locationNames = mockLocations.map(loc => loc.name);
  const currentData = weatherMock[selected];

  // ----------- Color Palette for Inline Styles -----------
  const colors = {
    primary: "#2196F3",    // blue
    secondary: "#FFFFFF",  // white
    accent: "#FFC107",     // amber
    alertWarning: "#FFC107",
    alertDanger: "#F44336"
  };

  // ----------- Utility: Alert Style -----------
  const getAlertColor = (severity) => (
    severity === "danger" ? colors.alertDanger : colors.alertWarning
  );

  // ----------- Event Handlers -----------
  // PUBLIC_INTERFACE
  function handleSearchInput(e) {
    setSearchInput(e.target.value);
  }
  // PUBLIC_INTERFACE
  function handleSearchSubmit(e) {
    e.preventDefault();
    const loc = locationNames.find(n =>
      n.toLowerCase() === searchInput.trim().toLowerCase()
    );
    if (loc) {
      setSelected(loc);
      setSearchInput("");
    }
  }
  // PUBLIC_INTERFACE
  function handleSelectSuggestion(n) {
    setSelected(n); setSearchInput("");
  }

  // ----------- Render -----------
  return (
    <div className="weatherpulse-root" style={{
      minHeight: "100vh",
      background: colors.secondary,
      color: "#222",
      fontFamily: "'Inter','Roboto','Helvetica','Arial',sans-serif",
    }}>
      {/* Location Search Bar */}
      <div style={{
        background: colors.primary,
        padding: "32px 0 18px 0",
        boxShadow: "0 2px 12px #2196f322",
        textAlign: "center"
      }}>
        <form
          autoComplete="off"
          spellCheck="false"
          onSubmit={handleSearchSubmit}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            background: colors.secondary,
            borderRadius: 30,
            boxShadow: "0 2px 8px #2196F344",
            padding: "8px 20px",
            border: `2px solid ${colors.primary}`,
            minWidth: 260
          }}
        >
          <input
            aria-label="Location Search"
            type="text"
            value={searchInput}
            placeholder="Search city..."
            style={{
              border: "none",
              outline: "none",
              fontSize: "1.05rem",
              flex: 1,
              background: "transparent"
            }}
            onChange={handleSearchInput}
            list="locations"
          />
          <button
            type="submit"
            style={{
              background: colors.accent,
              color: colors.primary,
              border: "none",
              borderRadius: 20,
              padding: "6px 16px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "1rem"
            }}
          >
            Search
          </button>
          <datalist id="locations">
            {locationNames.map(loc => (
              <option key={loc} value={loc} />
            ))}
          </datalist>
        </form>
        {/* Suggestions */}
        {searchInput.length > 0 && (
          <div style={{
            background: "#fff",
            border: `1px solid ${colors.primary}44`,
            boxShadow: "0 4px 8px #2222",
            position: "absolute",
            left: 0,
            right: 0,
            margin: "20px auto 0 auto",
            width: 240,
            zIndex: 12,
            borderRadius: "0 0 12px 12px"
          }}>
            {locationNames.filter(n =>
              n.toLowerCase().startsWith(searchInput.trim().toLowerCase())
              && n !== selected
            ).map(n => (
              <div
                key={n}
                style={{
                  padding: "8px 18px",
                  cursor: "pointer",
                  background: "#fff"
                }}
                onClick={() => handleSelectSuggestion(n)}
              >{n}</div>
            ))}
          </div>
        )}
      </div>

      {/* Weather Alerts Banner */}
      {(currentData.alerts && currentData.alerts.length > 0) && currentData.alerts.map((alert, i) => (
        <div
          key={i}
          style={{
            background: getAlertColor(alert.severity),
            color: alert.severity === "danger" ? "#fff" : "#222",
            padding: "12px 0",
            textAlign: "center",
            fontWeight: 600,
            fontSize: "1.10rem",
            letterSpacing: 0.2,
            boxShadow: "0 2px 12px #0001",
            marginBottom: 8
          }}
          role="alert"
        >
          <span style={{
            marginRight: 10,
            fontWeight: 800,
            fontSize: "1.25rem",
            verticalAlign: "middle"
          }}>
            {(alert.severity === "danger") ? "⚠️" : "⚡"}
          </span>
          <strong>{alert.title}: </strong> {alert.description}
        </div>
      ))}

      <div
        style={{
          maxWidth: 620,
          margin: "44px auto 0 auto",
          background: "#FFF",
          borderRadius: "20px",
          boxShadow: `0 6px 30px #2196F346`,
          padding: "34px 26px 42px 26px",
        }}
      >
        {/* Current Weather Section */}
        <section style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          borderBottom: `1px solid #2196F322`,
          paddingBottom: 16,
          marginBottom: 18
        }}>
          <div style={{
            background: colors.primary,
            color: "#FFF",
            borderRadius: "14px",
            width: 80,
            height: 80,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "2.7rem",
            fontWeight: "bold",
            marginRight: 20
          }}>
            <span style={{ fontSize: "2.3rem", lineHeight: 1 }}>{currentData.current.icon}</span>
            <span style={{ fontSize: "1.0rem", marginTop: 3 }}>{currentData.current.condition}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: "2.7rem", fontWeight: 700, marginBottom: 3, color: colors.primary }}>
              {currentData.current.temp}&deg;F
            </div>
            <div style={{ color: "#888", fontWeight: 500 }}>
              Humidity: <span style={{ color: "#333" }}>{currentData.current.humidity}%</span>
              &nbsp;|&nbsp;
              Wind: <span style={{ color: "#333" }}>{currentData.current.wind} mph</span>
            </div>
            <div style={{ fontSize: "1.14rem", color: "#888", marginTop: 4 }}>{selected}</div>
          </div>
        </section>

        {/* Hourly Forecast */}
        <section style={{
          marginBottom: 28,
          padding: 0
        }}>
          <div style={{ fontWeight: 600, color: colors.primary, fontSize: "1.10rem", marginBottom: 8 }}>Next 12 Hours</div>
          <div style={{
            display: "flex",
            overflowX: "auto",
            gap: 16,
            padding: "0 3px"
          }}>
            {currentData.hourly.map((h, idx) => (
              <div
                key={idx}
                style={{
                  background: "#F4F8FB",
                  borderRadius: 12,
                  minWidth: 57,
                  textAlign: "center",
                  padding: "9px 0 8px 0",
                  boxShadow: idx === 0 ? `0 1px 6px #2196F322` : "none",
                }}
              >
                <div style={{ fontSize: "1.18rem", marginBottom: 2 }}>{h.icon}</div>
                <div style={{ fontWeight: 700 }}>{h.temp}&deg;</div>
                <div style={{ fontSize: "0.93rem", color: "#666", margin: "0 0 2px 0" }}>{h.hour}</div>
                {h.precipitation > 0 && (
                  <div style={{
                    fontSize: "0.85rem",
                    color: colors.primary,
                    fontWeight: 500
                  }}>
                    {h.precipitation}% 💧
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Weekly Forecast */}
        <section>
          <div style={{ fontWeight: 600, color: colors.primary, fontSize: "1.10rem", marginBottom: 6 }}>
            7-Day Forecast
          </div>
          <div>
            {currentData.weekly.map((day, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "8px 0",
                  borderBottom: idx === currentData.weekly.length - 1 ? "none" : "1px solid #e0ecff"
                }}
              >
                <span style={{
                  fontWeight: 500,
                  minWidth: 55,
                  color: "#444"
                }}>{day.day}</span>
                <span style={{ fontSize: "1.25rem", marginRight: 15 }}>{day.icon}</span>
                <span style={{
                  color: "#222",
                  fontWeight: 600,
                  fontSize: "1.1rem"
                }}>{day.high}&deg; <span style={{
                  color: "#888",
                  fontWeight: 400,
                  fontSize: "0.98rem"
                }}>/ {day.low}&deg;</span></span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default WeatherPulseContainer;
