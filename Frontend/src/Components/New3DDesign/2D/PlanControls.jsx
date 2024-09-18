import React, { useContext } from "react";
import { ShapeContext } from "../ShapeContext";

const PlanControls = () => {
  const { undo, redo } = useContext(ShapeContext);

  return (
    <div className="plan-controls">
      <button onClick={undo} className="control-button">
        Undo
      </button>
      <button onClick={redo} className="control-button">
        Redo
      </button>
    </div>
  );
};

export default PlanControls;
