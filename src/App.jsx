import React from "react";
import Home from "./Component/Home";
import SparklingCursor from "./Component/SparklingCursor";

const App = () => {
  return (
    <div className="min-h-dvh bg-gray-50">
      <SparklingCursor />
      <Home />
    </div>
  );
};

export default App;

