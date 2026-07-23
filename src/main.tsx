import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { TaqueriaSite } from "./TaqueriaSite";
import "./globals.css";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Site root was not found.");
}

createRoot(root).render(
  <StrictMode>
    <TaqueriaSite />
  </StrictMode>,
);
