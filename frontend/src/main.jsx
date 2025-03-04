// import "@fontsource/open-sans";
import "./index.css";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CampaignsContextProvider } from "./context/CampaignContext";

import App from './App.jsx'

import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Open Sans, sans-serif",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CampaignsContextProvider>
      <ThemeProvider theme={theme}>
      <App />
      </ThemeProvider>
    </CampaignsContextProvider>
  </StrictMode>
);

