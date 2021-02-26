import React, { useState } from "react";
import Routes from "./routes";
import Nav from "./components/nav";
import { ThemeProvider } from "@material-ui/styles";
import theme from "./components/theme";

const App = () => {
  const [value, setValue] = useState(0);

  return (
    <ThemeProvider theme={theme}>
      <Nav value={value} setValue={setValue} className="header" />
      <Routes className="stomach" />
    </ThemeProvider>
  );
};

export default App;
