import React from 'react';
import './App.css';
import WeatherPulseContainer from './WeatherPulseContainer';

// PUBLIC_INTERFACE
function App() {
  // Just render the full WeatherPulseContainer as the main app.
  return (
    <div className="app" style={{ background: "#f7fafd", minHeight: "100vh" }}>
      <WeatherPulseContainer />
    </div>
  );
}

export default App;