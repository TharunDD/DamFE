import React, { useState } from "react";
import LevelFetch from "./LevelFetch";
import damData from "./data.json"; // Import your JSON data

const Home = () => {
  const [selectedDam, setSelectedDam] = useState(null);
  const [showLevelFetch, setShowLevelFetch] = useState(false); // State to control visibility of LevelFetch

  const handleSelectChange = (event) => {
    const damId = event.target.value;
    const dam = damData.find((dam) => dam.id === parseInt(damId));
    setSelectedDam(dam);
    setShowLevelFetch(false); // Hide LevelFetch if a new dam is selected
  };

  const handleButtonClick = () => {
    setShowLevelFetch(!showLevelFetch); // Toggle LevelFetch visibility
  };

  return (
    <div>
      <h1>Select a Dam</h1>
      <select onChange={handleSelectChange}>
        <option value="">-- Select a Dam --</option>
        {damData.map((dam) => (
          <option key={dam.id} value={dam.id}>
            {dam.name}
          </option>
        ))}
      </select>

      {selectedDam && (
        <div style={{ marginTop: "20px" }}>
          <h2>{selectedDam.name}</h2>
          {/* Adjusted image path */}
          <img
            src={`/dams/${selectedDam.image}`}
            alt={selectedDam.name}
            style={{ width: "300px", height: "auto" }}
          />
          <p>
            <strong>Description:</strong> {selectedDam.description}
          </p>
          <p>
            <strong>Constructed Year:</strong> {selectedDam.constructed_year}
          </p>

          {/* Toggle Button for Insert/Close Water Level Form */}
          <button onClick={handleButtonClick} style={{ marginTop: "20px" }}>
            {showLevelFetch ? "Close Water Level Form" : "Insert Water Level"}
          </button>

          {/* Show LevelFetch based on toggle state */}
          {showLevelFetch && <LevelFetch selectedDam={selectedDam} />}
        </div>
      )}
    </div>
  );
};

export default Home;
