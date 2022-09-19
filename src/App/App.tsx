import { Box } from "@mui/material";
import MenuComponent from "./MenuComponent";
import ContentComponent from "./ContentComponent";
import FooterComponent from "./FooterComponent";

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
      <MenuComponent />
      <ContentComponent />
      <FooterComponent />
    </Box>
  );
}
