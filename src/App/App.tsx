import { Box } from "@mui/material";
import MenuComponent from "../Base/MenuComponent";
import ContentComponent from "../Base/ContentComponent";
import FooterComponent from "../Base/FooterComponent";
import LoggedProvider from "../Auth/UserContext";

export default function App() {
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
      <LoggedProvider>
        <MenuComponent />
        <ContentComponent />
        <FooterComponent />
      </LoggedProvider>
    </Box>
  );
}
