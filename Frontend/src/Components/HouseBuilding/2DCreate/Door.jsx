DoorManager;

import React from "react";

function DoorManager({ doors, onAddDoor, onUpdateDoor }) {
  return (
    <div className="door-manager">
      <h4>Doors</h4>
      <button onClick={onAddDoor}>Add Door</button>
      {doors.map((door, index) => (
        <div key={index} className="door-input">
          <h5>Door {index + 1}</h5>
          <label>Width:</label>
          <input
            type="number"
            value={door.width}
            onChange={(e) => onUpdateDoor(index, "width", e.target.value)}
            placeholder="Width"
          />
          <label>Height:</label>
          <input
            type="number"
            value={door.height}
            onChange={(e) => onUpdateDoor(index, "height", e.target.value)}
            placeholder="Height"
          />
          <label>Position X:</label>
          <input
            type="number"
            value={door.positionX}
            onChange={(e) => onUpdateDoor(index, "positionX", e.target.value)}
            placeholder="Position X"
          />
          <label>Position Y:</label>
          <input
            type="number"
            value={door.positionY}
            onChange={(e) => onUpdateDoor(index, "positionY", e.target.value)}
            placeholder="Position Y"
          />
        </div>
      ))}
    </div>
  );
}

export default DoorManager;
