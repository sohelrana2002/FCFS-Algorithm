import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import FCFS from "./FCFS";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <FCFS />
  </StrictMode>
);
