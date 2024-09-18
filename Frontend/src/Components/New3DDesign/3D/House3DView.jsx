import React, { useContext } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Box, Plane } from "@react-three/drei";
import { ShapeContext } from "../ShapeContext";

const House3DView = () => {
  const { shapes } = useContext(ShapeContext);

  const create3DWall = (points, height) => {
    const x1 = points[0] / 100;
    const y1 = points[1] / 100;
    const x2 = points[2] / 100;
    const y2 = points[3] / 100;

    const wallLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;
    const angle = Math.atan2(y2 - y1, x2 - x1);

    return (
      <Box
        position={[midX, height / 2, midY]}
        args={[wallLength, height, 0.1]} // Wall dimensions
        rotation={[0, -angle, 0]} // Wall orientation
      >
        <meshStandardMaterial color="gray" />
      </Box>
    );
  };

  return (
    <Canvas camera={{ position: [0, 10, 15], fov: 50 }}>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <OrbitControls />

      {/* Floor */}
      <Plane
        args={[10, 10]}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.01, 0]}
      >
        <meshStandardMaterial color="lightgrey" />
      </Plane>

      {/* Grid Helper */}
      <gridHelper args={[10, 10, "black", "gray"]} />

      {/* Render 3D walls */}
      {shapes
        .filter((shape) => shape.type === "line")
        .map((shape) => create3DWall(shape.points, shape.wallHeight || 2.5))}
    </Canvas>
  );
};

export default House3DView;
