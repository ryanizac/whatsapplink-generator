import { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(0);

  const count = () => setCounter((prev) => prev + 1);
  const reset = () => setCounter(0);

  return (
    <div className="app">
      <h1>hello, blip!!!</h1>
      <p onClick={reset}>Count with me 🤩</p>
      <button onClick={count}>
        Click{counter > 1 && "s"} {counter}
      </button>
    </div>
  );
}

export default App;
