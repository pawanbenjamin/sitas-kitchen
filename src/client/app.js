import React from "react";
import Routes from "./routes";
import Nav from "./components/nav";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/theme";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="app">
        <Nav className="header" />
        <Routes className="stomach" />
      </div>
    </ThemeProvider>
  );
};

export default App;
