import "./App.css";
import SignIn from "./components/signIn";
import Dashboard from "./components/dashboard";
import React, { useState } from "react";

function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
      {user === undefined ? (
        <SignIn setUser={setUser} />
      ) : (
        <Dashboard user={user} />
      )}
    </div>
  );
}

export default App;
