import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./Routes/MainRoutes";
import "./styles/global.css";

function App() {
  return (
    <Router>
      <MainRoutes />
    </Router>
  );
}

export default App;