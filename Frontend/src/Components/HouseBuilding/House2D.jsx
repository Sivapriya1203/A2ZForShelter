import React, { useState, useRef, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import Room from "./Room";
import wallTexture from "./3dModels/Bricks092_2K-JPG/Bricks092_2K-JPG_Color.jpg";
import doorTexture from "./3dModels/Door001_4K-JPG/Door001.png";
import floorTexture from "./3dModels/Tatami004_2K-JPG/Tatami004_2K-JPG_Displacement.jpg";
import "./House2D.css";

const House2D = ({ landWidth, landLength, rooms }) => {
  const canvasRef = useRef();  // Reference to the Canvas element

  // Initial positions of rooms (placed on the XZ plane)
  const [roomPositions] = useState({
    hall: [-landWidth / 2 + rooms.hall.width / 2, 0, -landLength / 2 + rooms.hall.depth / 2],
    bedroom: [landWidth / 2 - rooms.bedroom.width / 2, 0, -landLength / 2 + rooms.bedroom.depth / 2],
    bathroom: [landWidth / 2 - rooms.bathroom.width / 2, 0, landLength / 2 - rooms.bathroom.depth / 2],
    kitchen: [-landWidth / 2 + rooms.kitchen.width / 2, 0, landLength / 2 - rooms.kitchen.depth / 2],
    livingRoom: [0, 0, 0],  // Center of the plot
    diningRoom: [-landWidth / 2 + rooms.diningRoom.width / 2, 0, rooms.diningRoom.depth / 2],
    garage: [landWidth / 2 - rooms.garage.width / 2, 0, landLength / 2 - rooms.garage.depth / 2],
  });

  const textures = {
    wall: wallTexture,
    door: doorTexture,
    floor: floorTexture,
  };

  const doorConfigs = {
    hall: { width: rooms.hall.door.width, height: rooms.hall.door.height, position: [0, 0, rooms.hall.depth / 2] },
    bedroom: { width: rooms.bedroom.door.width, height: rooms.bedroom.door.height, position: [0, 0, rooms.bedroom.depth / 2] },
    bathroom: { width: rooms.bathroom.door.width, height: rooms.bathroom.door.height, position: [0, 0, rooms.bathroom.depth / 2] },
    kitchen: { width: rooms.kitchen.door.width, height: rooms.kitchen.door.height, position: [0, 0, rooms.kitchen.depth / 2] },
    livingRoom: { width: rooms.livingRoom.door.width, height: rooms.livingRoom.door.height, position: [0, 0, rooms.livingRoom.depth / 2] },
    diningRoom: { width: rooms.diningRoom.door.width, height: rooms.diningRoom.door.height, position: [0, 0, rooms.diningRoom.depth / 2] },
    garage: { width: rooms.garage.door.width, height: rooms.garage.door.height, position: [0, 0, rooms.garage.depth / 2] },
  };

  const exportToImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "house_2d_layout.png";
        link.click();
      }
    });
  }, [canvasRef]);

  return (
    <div className="house2d-container">
      <Canvas
        orthographic
        ref={canvasRef} // Attach reference to the Canvas element
        camera={{
          zoom: 50, // Adjust zoom to fit the scene
          position: [0, 100, 0], // Position camera above the scene
          near: 0.1,
          far: 1000,
        }}
      >
        <ambientLight intensity={0.5} />
        
        {/* Render Rooms */}
        {Object.keys(rooms).map((room) => (
          <Room
            key={room}
            width={rooms[room].width}
            height={rooms[room].height} // Height is ignored in 2D
            depth={rooms[room].depth}
            position={roomPositions[room]}
            doorConfig={doorConfigs[room]}
            textures={textures}
            roomName={room}
          />
        ))}

        {/* Land */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
          <planeGeometry args={[landWidth, landLength]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </Canvas>

      {/* Export Button */}
      <button className="export-button" onClick={exportToImage}>
        Export 2D Layout
      </button>
    </div>
  );
};

export default House2D;
