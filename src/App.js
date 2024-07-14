import "./App.css";
import { ThemeProvider } from "styled-components";
import TicTacToc from "./TicTacToc";
import themes from "./themes";
import { useState } from "react";
function App() {
  const defaultTheme = Object.keys(themes)[0];
  const [selectTheme, setTheme] = useState(defaultTheme);
  return (
    <ThemeProvider theme={themes[selectTheme]}>
      <TicTacToc />
    </ThemeProvider>
  );
}

export default App;
