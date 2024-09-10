// import React from "react";
// import { Canvas } from "@react-three/fiber";
// import { OrbitControls } from "@react-three/drei";
// import Room from "./Room";
// import wallTexture from "./3dModels/Bricks092_2K-JPG/Bricks092_2K-JPG_Color.jpg";
// import doorTexture from "./3dModels/Door001_4K-JPG/Door001.png";
// import floorTexture from "./3dModels/Tatami004_2K-JPG/Tatami004_2K-JPG_Displacement.jpg";
// import "./House3D.css"; // Import the CSS file for styling

// const House3D = ({ landWidth, landLength, rooms }) => {
// const roomPositions = {
//   hall: [
//     -landWidth / 2 + rooms.hall.width / 2,
//     rooms.hall.height / 2,
//     -landLength / 2 + rooms.hall.depth / 2,
//   ],
//   bedroom: [
//     landWidth / 2 - rooms.bedroom.width / 2,
//     rooms.bedroom.height / 2,
//     -landLength / 2 + rooms.bedroom.depth / 2,
//   ],
//   bathroom: [
//     landWidth / 2 - rooms.bathroom.width / 2,
//     rooms.bathroom.height / 2,
//     landLength / 2 - rooms.bathroom.depth / 2,
//   ],
//   kitchen: [
//     -landWidth / 2 + rooms.kitchen.width / 2,
//     rooms.kitchen.height / 2,
//     landLength / 2 - rooms.kitchen.depth / 2,
//   ],
//   livingRoom: [0, rooms.livingRoom.height / 2, 0], // Center of the plot
//   diningRoom: [
//     -landWidth / 2 + rooms.diningRoom.width / 2,
//     rooms.diningRoom.height / 2,
//     rooms.diningRoom.depth / 2,
//   ],
//   garage: [
//     landWidth / 2 - rooms.garage.width / 2,
//     rooms.garage.height / 2,
//     landLength / 2 - rooms.garage.depth / 2,
//   ],
// };

// const doorConfigs = {
//   hall: {
//     width: rooms.hall.door.width,
//     height: rooms.hall.door.height,
//     position: [0, rooms.hall.door.height / 2, rooms.hall.depth / 2],
//     rotation: [0, 0, 0],
//   },
//   bedroom: {
//     width: rooms.bedroom.door.width,
//     height: rooms.bedroom.door.height,
//     position: [0, rooms.bedroom.door.height / 2, rooms.bedroom.depth / 2],
//     rotation: [0, 0, 0],
//   },
//   bathroom: {
//     width: rooms.bathroom.door.width,
//     height: rooms.bathroom.door.height,
//     position: [0, rooms.bathroom.door.height / 2, rooms.bathroom.depth / 2],
//     rotation: [0, 0, 0],
//   },
//   kitchen: {
//     width: rooms.kitchen.door.width,
//     height: rooms.kitchen.door.height,
//     position: [0, rooms.kitchen.door.height / 2, rooms.kitchen.depth / 2],
//     rotation: [0, 0, 0],
//   },
//   livingRoom: {
//     width: rooms.livingRoom.door.width,
//     height: rooms.livingRoom.door.height,
//     position: [
//       0,
//       rooms.livingRoom.door.height / 2,
//       rooms.livingRoom.depth / 2,
//     ],
//     rotation: [0, 0, 0],
//   },
//   diningRoom: {
//     width: rooms.diningRoom.door.width,
//     height: rooms.diningRoom.door.height,
//     position: [
//       0,
//       rooms.diningRoom.door.height / 2,
//       rooms.diningRoom.depth / 2,
//     ],
//     rotation: [0, 0, 0],
//   },
//   garage: {
//     width: rooms.garage.door.width,
//     height: rooms.garage.door.height,
//     position: [0, rooms.garage.door.height / 2, rooms.garage.depth / 2],
//     rotation: [0, 0, 0],
//   },
// };

//   const textures = {
//     wall: wallTexture,
//     door: doorTexture,
//     floor: floorTexture,
//   };

//   return (
//     <div className="house3d-container">
//       <Canvas
//         camera={{
//           position: [5, 10, 20], // Adjust camera height and distance for a better view
//           fov: 45, // Narrower Field of View for more focus
//         }}
//       >
//         <ambientLight intensity={0.7} />
//         <directionalLight position={[2, 5, 2]} intensity={0.9} />

//         {/* Land */}
//         <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
//           <planeGeometry args={[landWidth, landLength]} />
//           <meshStandardMaterial color="green" />
//         </mesh>

//         {/* Rooms with Textures */}
//         {Object.keys(rooms).map((room) => (
//           <Room
//             key={room}
//             width={rooms[room].width}
//             height={rooms[room].height}
//             depth={rooms[room].depth}
//             position={roomPositions[room]}
//             doorConfig={doorConfigs[room]}
//             textures={textures}
//           />
//         ))}

//         <OrbitControls />
//       </Canvas>
//     </div>
//   );
// };

// export default House3D;
import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Room from "./Room";
// import wallTexture from "./3dModels/Bricks092_2K-JPG/Bricks092_2K-JPG_Color.jpg";
// import doorTexture from "./3dModels/Door001_4K-JPG/Door001.png";
// import floorTexture from "../3dModels/Tatami004_2K-JPG/Tatami004_2K-JPG_Displacement.jpg";
import "./House3D.css"; // Import the CSS file for styling

const House3D = ({ landWidth, landLength, rooms }) => {
  // Define default lighting settings
  const [ambientLightIntensity, setAmbientLightIntensity] = useState(0.7);
  const [directionalLightIntensity, setDirectionalLightIntensity] =
    useState(0.9);
  const [pointLightIntensity, setPointLightIntensity] = useState(0.5);
  const [spotLightIntensity, setSpotLightIntensity] = useState(0.8);

  // Initial positions of rooms
  const [roomPositions, setRoomPositions] = useState({
    hall: [
      -landWidth / 2 + rooms.hall.width / 2,
      rooms.hall.height / 2,
      -landLength / 2 + rooms.hall.depth / 2,
    ],
    bedroom: [
      landWidth / 2 - rooms.bedroom.width / 2,
      rooms.bedroom.height / 2,
      -landLength / 2 + rooms.bedroom.depth / 2,
    ],
    bathroom: [
      landWidth / 2 - rooms.bathroom.width / 2,
      rooms.bathroom.height / 2,
      landLength / 2 - rooms.bathroom.depth / 2,
    ],
    kitchen: [
      -landWidth / 2 + rooms.kitchen.width / 2,
      rooms.kitchen.height / 2,
      landLength / 2 - rooms.kitchen.depth / 2,
    ],
    livingRoom: [0, rooms.livingRoom.height / 2, 0], // Center of the plot
    diningRoom: [
      -landWidth / 2 + rooms.diningRoom.width / 2,
      rooms.diningRoom.height / 2,
      rooms.diningRoom.depth / 2,
    ],
    garage: [
      landWidth / 2 - rooms.garage.width / 2,
      rooms.garage.height / 2,
      landLength / 2 - rooms.garage.depth / 2,
    ],
  });

  // Function to handle position change
  const handlePositionChange = (room, index, value) => {
    setRoomPositions((prevPositions) => {
      const updatedPosition = [...prevPositions[room]];
      updatedPosition[index] = value;
      return {
        ...prevPositions,
        [room]: updatedPosition,
      };
    });
  };

  const textures = {
    wall: wallTexture,
    door: doorTexture,
    floor: floorTexture,
  };

  const doorConfigs = {
    hall: {
      width: rooms.hall.door.width,
      height: rooms.hall.door.height,
      position: [0, rooms.hall.door.height / 2, rooms.hall.depth / 2],
      rotation: [0, 0, 0],
    },
    bedroom: {
      width: rooms.bedroom.door.width,
      height: rooms.bedroom.door.height,
      position: [0, rooms.bedroom.door.height / 2, rooms.bedroom.depth / 2],
      rotation: [0, 0, 0],
    },
    bathroom: {
      width: rooms.bathroom.door.width,
      height: rooms.bathroom.door.height,
      position: [0, rooms.bathroom.door.height / 2, rooms.bathroom.depth / 2],
      rotation: [0, 0, 0],
    },
    kitchen: {
      width: rooms.kitchen.door.width,
      height: rooms.kitchen.door.height,
      position: [0, rooms.kitchen.door.height / 2, rooms.kitchen.depth / 2],
      rotation: [0, 0, 0],
    },
    livingRoom: {
      width: rooms.livingRoom.door.width,
      height: rooms.livingRoom.door.height,
      position: [
        0,
        rooms.livingRoom.door.height / 2,
        rooms.livingRoom.depth / 2,
      ],
      rotation: [0, 0, 0],
    },
    diningRoom: {
      width: rooms.diningRoom.door.width,
      height: rooms.diningRoom.door.height,
      position: [
        0,
        rooms.diningRoom.door.height / 2,
        rooms.diningRoom.depth / 2,
      ],
      rotation: [0, 0, 0],
    },
    garage: {
      width: rooms.garage.door.width,
      height: rooms.garage.door.height,
      position: [0, rooms.garage.door.height / 2, rooms.garage.depth / 2],
      rotation: [0, 0, 0],
    },
  };

  return (
    <div className="house3d-container">
      <Canvas
        camera={{
          position: [5, 10, 20],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
      >
        <ambientLight intensity={ambientLightIntensity} />
        <directionalLight
          position={[2, 5, 2]}
          intensity={directionalLightIntensity}
        />
        <pointLight
          position={[0, 10, 0]}
          intensity={pointLightIntensity}
          distance={30}
        />
        <spotLight
          position={[10, 20, 10]}
          intensity={spotLightIntensity}
          angle={0.3}
          penumbra={0.5}
        />
        <OrbitControls />

        {/* Render Rooms */}
        {Object.keys(rooms).map((room) => (
          <Room
            key={room}
            width={rooms[room].width}
            height={rooms[room].height}
            depth={rooms[room].depth}
            position={roomPositions[room]}
            doorConfig={doorConfigs[room]}
            textures={textures}
            roomName={room}
          />
        ))}

        {/* Land */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
          <planeGeometry args={[landWidth, landLength]} />
          <meshStandardMaterial color="green" />
        </mesh>
      </Canvas>

      {/* Lighting Control Panel */}
      <div className="lighting-controls">
        <h3>Lighting Controls</h3>
        <label>
          Ambient Light Intensity:
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={ambientLightIntensity}
            onChange={(e) =>
              setAmbientLightIntensity(parseFloat(e.target.value))
            }
          />
        </label>
        <label>
          Directional Light Intensity:
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={directionalLightIntensity}
            onChange={(e) =>
              setDirectionalLightIntensity(parseFloat(e.target.value))
            }
          />
        </label>
        <label>
          Point Light Intensity:
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={pointLightIntensity}
            onChange={(e) => setPointLightIntensity(parseFloat(e.target.value))}
          />
        </label>
        <label>
          Spot Light Intensity:
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={spotLightIntensity}
            onChange={(e) => setSpotLightIntensity(parseFloat(e.target.value))}
          />
        </label>
      </div>

      {/* Position Control Panel */}
      <div className="position-controls">
        {Object.keys(rooms).map((room) => (
          <div key={room}>
            <h4>{room}</h4>
            <label>
              X:
              <input
                type="number"
                value={roomPositions[room][0]}
                onChange={(e) =>
                  handlePositionChange(room, 0, parseFloat(e.target.value))
                }
              />
            </label>
            <label>
              Y:
              <input
                type="number"
                value={roomPositions[room][1]}
                onChange={(e) =>
                  handlePositionChange(room, 1, parseFloat(e.target.value))
                }
              />
            </label>
            <label>
              Z:
              <input
                type="number"
                value={roomPositions[room][2]}
                onChange={(e) =>
                  handlePositionChange(room, 2, parseFloat(e.target.value))
                }
              />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default House3D;
