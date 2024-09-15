import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { routers } from "./routers.jsx";
import { RouterProvider } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={routers} />
  </StrictMode>
);
