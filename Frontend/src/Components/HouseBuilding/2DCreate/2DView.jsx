import React from "react";
import "./2DView.css";

function Room2D({ rooms, facingDirection }) {
  return (
    <div className={`room2d-container facing-${facingDirection.toLowerCase()}`}>
      {rooms.map((room) => (
        <div
          key={room.id}
          className="room-2d"
          style={{
            width: `${room.width}rem`,
            height: `${room.height}rem`,
            left: ` ${room.left}rem`,
            top: `${room.top}rem`,
            borderWidth: `${room.wallThickness}rem`,
          }}
        >
          <span>{room.name}</span>
        </div>
      ))}
    </div>
  );
}

export default Room2D;
