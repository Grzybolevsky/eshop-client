import { Box } from "@mui/material";
import MenuComponent from "../Base/MenuComponent";
import ContentComponent from "../Base/ContentComponent";
import FooterComponent from "../Base/FooterComponent";
import { useState } from "react";
import { apiCall } from "../axiosConfig";

export default function App() {
  const [logged, setLogged] = useState(false);
  apiCall.get("/user/logged").then((response) => {
    setLogged(response.data);
  });
  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignContent: "space-around",
      }}>
      <MenuComponent logged={logged} />
      <ContentComponent />
      <FooterComponent />
    </Box>
  );
}
