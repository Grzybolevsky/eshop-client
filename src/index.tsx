import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App/App";
import reportWebVitals from "./reportWebVitals";
import { DevSupport } from "@react-buddy/ide-toolbox";
import { ComponentPreviews, useInitial } from "./dev";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material";
import { CookiesProvider } from "react-cookie";

const theme = createTheme({
  components: {
    MuiListItemButton: {
      styleOverrides: { root: { "&.Mui-selected": { backgroundColor: "rgb(0,0,0,0.2)" } } },
    },
  },
});
const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <DevSupport ComponentPreviews={ComponentPreviews} useInitialHook={useInitial}>
          <ThemeProvider theme={theme}>
            <App />
          </ThemeProvider>
        </DevSupport>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
