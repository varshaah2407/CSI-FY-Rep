import * as React from "react";
import "./App.scss";
import { useState, useEffect } from "react";
import { Box, ThemeProvider } from "@mui/material";
import { darkTheme } from "./theme/theme";
import landingBg from "./assets/landingBg.svg";
import WelcomeBox from "./pages/WelcomeBox/WelcomeBox";
import CompletedBox from "./pages/CompletedBox/CompletedBox";
import StepFormBox from "./pages/StepForm/StepFormBox";

function App() {
  let [theme] = useState(darkTheme);
  const [showWelcome, setShowWelcome] = useState(false);
  const [showClosed, setShowClosed] = useState(false);
  useEffect(() => {
    const check = localStorage.getItem("ModalShown");
    if (check && check === "true") {
      setShowWelcome(false);
    } else {
      setShowWelcome(true);
    }
    if (localStorage.getItem("showClosed")) {
      setShowClosed(true);
    }
    return () => {};
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          padding: { lg: 0, md: 2, sm: 0 },
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundSize: "cover",
          backgroundImage: `url(${landingBg})`,
          overflow: "hidden",
        }}
      >
        <div className="Box">
          <>
            {/* <ClosedBox /> */}
            {showWelcome ? <WelcomeBox /> : <></>}
            <StepFormBox setShowClosed={setShowClosed} />
            {showClosed ? <CompletedBox /> : <></>}
          </>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
