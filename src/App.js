import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navigation from "./Navigation";
import "./App.css";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
      </header>
    </div>
  );
}

export default App;
