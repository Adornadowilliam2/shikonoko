import { useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="card">
        <div className="card-inner">
          <div className="card-front">
            <h2>Description 1</h2>
            <p>This is the front side of the card.</p>
          </div>
          <div className="card-back">
            <h2>Description 2</h2>
            <p>This is the back side of the card.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
