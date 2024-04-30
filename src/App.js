import React from "react";
import Navigation from "./Navigation";
import "./App.css";
import { Analytics } from "@vercel/analytics/react";

function App() {
  // const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        <Navigation />
        <Analytics />
      </header>
    </div>
  );
}

export default App;
