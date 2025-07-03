import { useState } from "react";
import SolarSystem from "./components/SolarSystem";

const defaultSpeeds = {
  Mercury: 0.02,
  Venus: 0.015,
  Earth: 0.01,
  Mars: 0.008,
  Jupiter: 0.006,
  Saturn: 0.004,
  Uranus: 0.003,
  Neptune: 0.002,
};

function App() {
  const [speeds, setSpeeds] = useState(defaultSpeeds);
  const [isPaused, setIsPaused] = useState(false);

  const handleSpeedChange = (planet, value) => {
    setSpeeds((prev) => ({
      ...prev,
      [planet]: parseFloat(value),
    }));
  };

  return (
    <>
      <div style={{
        position: "absolute",
        top: 10,
        left: 10,
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.6)",
        color: "white",
        padding: "10px",
        borderRadius: "10px"
      }}>
        {Object.keys(defaultSpeeds).map((planet) => (
          <div key={planet}>
            <label>{planet}</label>
            <input
              type="range"
              min="0.001"
              max="0.05"
              step="0.001"
              value={speeds[planet]}
              onChange={(e) => handleSpeedChange(planet, e.target.value)}
            />
          </div>
        ))}

        <button
          onClick={() => setIsPaused((prev) => !prev)}
          style={{
            marginTop: 10,
            padding: "5px 10px",
            backgroundColor: "white",
            color: "black",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>

      <div style={{ width: "100vw", height: "100vh" }}>
        <SolarSystem speeds={speeds} isPaused={isPaused} />
      </div>
    </>
  );
}

export default App;