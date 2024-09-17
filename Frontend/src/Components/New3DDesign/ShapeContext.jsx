import React, { createContext, useState } from "react";

export const ShapeContext = createContext();

export const ShapeProvider = ({ children }) => {
  const [shapes, setShapes] = useState([]);
  const [history, setHistory] = useState([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const addShape = (newShape) => {
    const updatedShape = { ...newShape, elevation: 2 }; // Default elevation is 2 units
    const newShapes = [...shapes, updatedShape];
    setShapes(newShapes);
    updateHistory(newShapes);
  };

  const updateShape = (id, updatedShape) => {
    const newShapes = shapes.map((shape) =>
      shape.id === id ? { ...shape, ...updatedShape } : shape
    );
    setShapes(newShapes);
    updateHistory(newShapes);
  };

  const updateHistory = (newShapes) => {
    const newHistory = [...history.slice(0, historyIndex + 1), newShapes];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const undo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setShapes(history[historyIndex - 1]);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setShapes(history[historyIndex + 1]);
    }
  };

  return (
    <ShapeContext.Provider
      value={{ shapes, addShape, updateShape, undo, redo }}
    >
      {children}
    </ShapeContext.Provider>
  );
};
