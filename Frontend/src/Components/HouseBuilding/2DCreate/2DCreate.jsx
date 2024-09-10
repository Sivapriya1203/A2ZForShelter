import React, { useState, useEffect } from "react";
import Room2D from "./2DView";
// import Room3D from './Room3D';
import "./2Ddesign.css";

function Create2D() {
  const [totalHouseArea, setTotalHouseArea] = useState(1200); // Example value
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "bedroom",
      width: 12.6,
      height: 12,
      left: 0,
      top: 0,
      wallThickness: 0.5,
    },
    {
      id: 2,
      name: "bedroom",
      width: 12.1,
      height: 12,
      left: 12.6,
      top: 0,
      wallThickness: 0.5,
    },
    {
      id: 3,
      name: "hall area",
      width: 12.25,
      height: 12.3,
      left: 0,
      top: 12,
      wallThickness: 0.5,
    },
    {
      id: 4,
      name: "ktn",
      width: 7.6,
      height: 7.6,
      left: 12.25,
      top: 12.3,
      wallThickness: 0.5,
    },
    {
      id: 5,
      name: "toilet",
      width: 7.6,
      height: 7.6,
      left: 19.85,
      top: 12.3,
      wallThickness: 0.5,
    },
    {
      id: 6,
      name: "toilet",
      width: 4.5,
      height: 6,
      left: 0,
      top: 20,
      wallThickness: 0.5,
    },
    {
      id: 7,
      name: "bedroom",
      width: 14,
      height: 12.1,
      left: 12.25,
      top: 19.6,
      wallThickness: 0.5,
    },
    {
      id: 8,
      name: "parking",
      width: 14.4,
      height: 11.5,
      left: 0,
      top: 26,
      wallThickness: 0.5,
    },
  ]);
  const [facingDirection, setFacingDirection] = useState("North");
  const [totalArea, setTotalArea] = useState(0);
  const [remainingArea, setRemainingArea] = useState(0);

  const handleChange = (index, dimension, value) => {
    setRooms((prev) => {
      const newRooms = [...prev];
      newRooms[index] = {
        ...newRooms[index],
        [dimension]: parseFloat(value) || 0,
      };
      return newRooms;
    });
  };

  const handlePositionChange = (index, position, value) => {
    setRooms((prev) => {
      const newRooms = [...prev];
      newRooms[index] = {
        ...newRooms[index],
        [position]: parseFloat(value) || 0,
      };
      return newRooms;
    });
  };

  const handleFacingChange = (event) => {
    setFacingDirection(event.target.value);
  };

  const handleTotalHouseAreaChange = (event) => {
    setTotalHouseArea(parseFloat(event.target.value) || 0);
  };

  const addRoom = (type) => {
    const newRoom = {
      id: rooms.length + 1,
      name: type,
      width: 10,
      height: 8,
      left: 0,
      top: 0,
      wallThickness: 1,
    };
    setRooms([...rooms, newRoom]);
  };

  const removeRoom = (id) => {
    setRooms(rooms.filter((room) => room.id !== id));
  };

  useEffect(() => {
    const calculatedTotalArea = rooms.reduce(
      (total, room) => total + room.width * room.height,
      0
    );
    setTotalArea(calculatedTotalArea);
    setRemainingArea(totalHouseArea - calculatedTotalArea);
  }, [rooms, totalHouseArea]);

  return (
    <div className="assign-container">
      <div className="total-house-area-input">
        <label htmlFor="totalHouseArea">Enter Total House Area (sq ft): </label>
        <input
          type="number"
          id="totalHouseArea"
          value={totalHouseArea}
          onChange={handleTotalHouseAreaChange}
          placeholder="Total House Area"
        />
      </div>

      <div className="facing-direction-selector">
        <label htmlFor="facingDirection">Select House Facing Direction: </label>
        <select
          id="facingDirection"
          value={facingDirection}
          onChange={handleFacingChange}
        >
          <option value="North">North</option>
          <option value="East">East</option>
          <option value="South">South</option>
          <option value="West">West</option>
        </select>
      </div>

      <div className="add-room-buttons">
        <button onClick={() => addRoom("bedroom")}>Add Bedroom</button>
        <button onClick={() => addRoom("bathroom")}>Add Bathroom</button>
      </div>

      <div className="room-selector">
        {rooms.map((room, index) => (
          <div key={room.id} className="room-input">
            <h3>
              {room.name.charAt(0).toUpperCase() + room.name.slice(1)}{" "}
              {index + 1}
            </h3>
            <input
              type="number"
              value={room.width}
              onChange={(e) => handleChange(index, "width", e.target.value)}
              placeholder="Width (rem)"
            />
            <input
              type="number"
              value={room.height}
              onChange={(e) => handleChange(index, "height", e.target.value)}
              placeholder="Height (rem)"
            />
            <input
              type="number"
              value={room.left}
              onChange={(e) =>
                handlePositionChange(index, "left", e.target.value)
              }
              placeholder="Left (rem)"
            />
            <input
              type="number"
              value={room.top}
              onChange={(e) =>
                handlePositionChange(index, "top", e.target.value)
              }
              placeholder="Top (rem)"
            />
            <input
              type="number"
              value={room.wallThickness}
              onChange={(e) =>
                handleChange(index, "wallThickness", e.target.value)
              }
              placeholder="Wall Thickness (rem)"
            />
            <div className="room-area">
              <strong>Area:</strong> {room.width * room.height} sq ft
            </div>
            <button
              className="remove-room-button"
              onClick={() => removeRoom(room.id)}
            >
              Remove Room
            </button>
          </div>
        ))}
      </div>

      <div className="total-area">
        <h3>Total Area of All Rooms: {totalArea} sq ft</h3>
        <h3>Remaining Area: {remainingArea >= 0 ? remainingArea : 0} sq ft</h3>
        {remainingArea < 0 && (
          <div className="error">Total room area exceeds the house area!</div>
        )}
      </div>

      <div className="views-container">
        <div className="view-2d-3d">
          <div className="view-2d">
            <h3>2D View (Facing {facingDirection})</h3>
            <Room2D rooms={rooms} facingDirection={facingDirection} />
          </div>
          <div className="view-3d">
            {/* <h3>3D View (Facing {facingDirection})</h3> */}
            {/* <Room3D rooms={rooms} facingDirection={facingDirection} /> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Create2D;
