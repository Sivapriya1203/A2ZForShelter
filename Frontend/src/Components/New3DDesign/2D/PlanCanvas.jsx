import React, { useContext, useState } from "react";
import { Stage, Layer, Line } from "react-konva";
import { ShapeContext } from "../ShapeContext";

const GRID_SIZE = 50;

const PlanCanvas = () => {
  const { shapes, addShape, updateShape } = useContext(ShapeContext);
  const [currentLine, setCurrentLine] = useState(null);
  const [drawing, setDrawing] = useState(false);

  const snapToGrid = (value, gridSize) =>
    Math.round(value / gridSize) * gridSize;

  const handleMouseDown = (e) => {
    if (!drawing) {
      setDrawing(true);
      const snappedX = snapToGrid(e.evt.layerX, GRID_SIZE);
      const snappedY = snapToGrid(e.evt.layerY, GRID_SIZE);
      setCurrentLine({
        id: shapes.length + 1,
        points: [snappedX, snappedY, snappedX, snappedY],
        stroke: "black",
        strokeWidth: 2,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (drawing && currentLine) {
      const snappedX = snapToGrid(e.evt.layerX, GRID_SIZE);
      const snappedY = snapToGrid(e.evt.layerY, GRID_SIZE);
      setCurrentLine({
        ...currentLine,
        points: [
          currentLine.points[0],
          currentLine.points[1],
          snappedX,
          snappedY,
        ],
      });
    }
  };

  const handleMouseUp = () => {
    if (drawing && currentLine) {
      addShape({ ...currentLine, type: "line" });
      setCurrentLine(null);
      setDrawing(false);
    }
  };

  return (
    <Stage
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <Layer>
        {shapes.map(
          (shape) => shape.type === "line" && <Line key={shape.id} {...shape} />
        )}
        {currentLine && (
          <Line
            {...currentLine}
            stroke="blue" // Temporary line color
          />
        )}
      </Layer>
    </Stage>
  );
};

export default PlanCanvas;
