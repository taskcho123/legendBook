import React from "react";
import ReactDOM from "react-dom/client";
import Router from "./pages/Router.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { StudyProvider } from "./contexts/StudyContext.jsx";
import { LocationProvider } from "./contexts/LocationContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <StudyProvider>
        <LocationProvider>
          <Router />
        </LocationProvider>
      </StudyProvider>
    </AuthProvider>
  </React.StrictMode>
);
