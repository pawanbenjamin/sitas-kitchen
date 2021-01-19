import React from "react";
import Routes from "./routes";
import Nav from "./components/nav";

const App = () => {
  return (
    <div className="app">
      <Nav className="header" />
      <Routes className="stomach" />
    </div>
  );
};

export default App;
