import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import "./App.css";
import HomePage from "./Pages/Homepage";

function App() {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="App">
      <header className="App-header">
        {isAuthenticated ? <HomePage /> : null}
      </header>
    </div>
  );
}

export default App;
