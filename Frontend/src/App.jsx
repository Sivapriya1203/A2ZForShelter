import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import MainRoutes from "./Routes/MainRoutes";

import "./styles/global.css";
// import MainApp from "./Components/New3DDesign/MainApp";

function App() {
  return (
    <Router>
      <MainRoutes />
      {/* <MainApp /> */}
    </Router>
  );
}

export default App;
