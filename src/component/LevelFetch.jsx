import React, { useState, useEffect } from 'react';
import axios from 'axios';

const LevelFetch = ({ selectedDam }) => {
  const [levelData, setLevelData] = useState({
    levelInFt: 0,
    storageInMcft: 0,
    inflowInCatchment: 0,
    outflowInCatchment: 0,
    rainfall: 0
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (selectedDam) {
      // Reset the form when a new dam is selected
      setLevelData({
        levelInFt: 0,
        storageInMcft: 0,
        inflowInCatchment: 0,
        outflowInCatchment: 0,
        rainfall: 0
      });
      setMessage(''); // Reset message when a new dam is selected
    }
  }, [selectedDam]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLevelData({
      ...levelData,
      [name]: parseFloat(value) || 0 // Ensure value is a number, default to 0 if NaN
    });
  };

  const handleSubmit = async (e) => {
    console.log(levelData,selectedDam.id);
    e.preventDefault();

    if (!selectedDam) {
      setMessage("Please select a dam first.");
      return;
    }

    try {
      const response = await axios.post('http://localhost:3100/api', {
        damId: selectedDam.id,
        damName: selectedDam.name,
        levelInFt: levelData.levelInFt,
        storageInMcft: levelData.storageInMcft,
        inflowInCatchment: levelData.inflowInCatchment,
        outflowInCatchment: levelData.outflowInCatchment,
        rainfall: levelData.rainfall
      });

      setMessage(`Data sent successfully! Status: ${response.status}`);
    } catch (error) {
      setMessage(`Error sending data: ${error.response ? error.response.data.message : error.message}`);
    }
  };

  return (
    <div>
      <h2>Water Level Monitoring for {selectedDam ? selectedDam.name : 'Select a Dam'}</h2>
      {selectedDam ? (
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Level (in ft):
              <input
                type="number"
                name="levelInFt"
                value={levelData.levelInFt}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Storage (in mcft):
              <input
                type="number"
                name="storageInMcft"
                value={levelData.storageInMcft}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Inflow in Catchment (in cft):
              <input
                type="number"
                name="inflowInCatchment"
                value={levelData.inflowInCatchment}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Outflow in Catchment (in cft):
              <input
                type="number"
                name="outflowInCatchment"
                value={levelData.outflowInCatchment}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Rainfall (in mm):
              <input
                type="number"
                name="rainfall"
                value={levelData.rainfall}
                onChange={handleChange}
              />
            </label>
          </div>
          <button type="submit">Send Data</button>
        </form>
      ) : (
        <p>Please select a dam to enter data.</p>
      )}

      {message && <p>{message}</p>}
    </div>
  );
};

export default LevelFetch;
