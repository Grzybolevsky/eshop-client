import { Link, Typography } from "@mui/material";

export default function FooterComponent() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/Grzybolevsky/eshop-client">
        e-business final project
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
