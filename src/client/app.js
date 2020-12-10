import React from "react";
import Routes from "./routes";
import Nav from "./components/nav";

const App = () => {
  return (
    <div>
      <Nav className="header" />
      <Routes />
    </div>
  );
};

export default App;
