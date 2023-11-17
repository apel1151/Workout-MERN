import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { WorkoutContextProvider } from "./context/WorkoutContext";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <WorkoutContextProvider>
      <App />
    </WorkoutContextProvider>
  </React.StrictMode>
);
