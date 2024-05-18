import { useState } from "react";

function App() {
  const [first, setfirst] = useState(0);
  return (
    <main>
      <button onClick={() => setfirst((prev) => prev + 1)}>click</button>
      <p>{first}</p>
    </main>
  );
}

export default App;
