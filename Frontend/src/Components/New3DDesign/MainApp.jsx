import React from "react";

import "./styles/app.css";
import { ShapeProvider } from "./ShapeContext";
import PlanCanvas from "./2D/PlanCanvas";
import House3DView from "./3D/House3DView";
import PlanControls from "./2D/PlanControls";
import ShapeControls from "./ShapeControls";

function MainApp() {
  return (
    <ShapeProvider>
      <div className="app-container">
        <PlanControls />
        <div className="plan-canvas">
          <PlanCanvas />
        </div>
        <div className="house-3d-view">
          <House3DView />
        </div>
        <div className="shape-controls">
          <ShapeControls />
        </div>
      </div>
    </ShapeProvider>
  );
}

export default MainApp;
