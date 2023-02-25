import { useEffect } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Toast from "./components/Toast";
import Drive from "./Pages/Drive";
import { clearAllEvents } from "./utils/pubsub";

const APP_THEME = createTheme();

const BOX_STYLE = {
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
  backgroundColor: (theme) => theme.palette.grey[100],
};

function App() {
  useEffect(() => {
    return () => clearAllEvents();
  }, []);

  return (
    <ThemeProvider theme={APP_THEME}>
      <CssBaseline />
      <Box sx={BOX_STYLE}>
        <Drive />
      </Box>
      <Toast />
    </ThemeProvider>
  );
}

export default App;
