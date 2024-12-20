import "./App.css";
import UnsignedUser from "./components/unsignedUser";
import React, { useState } from "react";

function App() {
  const [user, setUser] = useState();
  return (
    <div className="App">
      <UnsignedUser setUser={setUser} />
    </div>
  );
}

export default App;
