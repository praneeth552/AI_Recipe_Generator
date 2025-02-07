import React from "react";
import Recipe from "./components/Recipe";

function App() {
  return (
    <div className="App">
      <div className="container d-flex justify-content-center text-3xl font-bold my-6"><p>AI Recipe App</p></div>
      <Recipe />
    </div>
  );
}

export default App;