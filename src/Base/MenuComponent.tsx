import { AppBar, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Home, LocalShipping, Login, Logout, ShoppingBasket, Store } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useLogged } from "../Auth/UserContext";

export default function MenuComponent() {
  const logged = useLogged();
  return (
    <AppBar position={"sticky"}>
      <Toolbar>
        <ListItemButton component={Link} to={"/"}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary={"Główna"} />
        </ListItemButton>
        <ListItemButton component={Link} to={"/products"}>
          <ListItemIcon>
            <Store />
          </ListItemIcon>
          <ListItemText primary={"Sklep"} />
        </ListItemButton>
        <ListItemButton component={Link} disabled={!logged} to={"/basket"}>
          <ListItemIcon>
            <ShoppingBasket />
          </ListItemIcon>
          <ListItemText primary={"Koszyk"} />
        </ListItemButton>
        <ListItemButton disabled={!logged} component={Link} to={"/orders"}>
          <ListItemIcon>
            <LocalShipping />
          </ListItemIcon>
          <ListItemText primary={"Zamówienia"} />
        </ListItemButton>
        {logged ? (
          <ListItemButton href={`${process.env.REACT_APP_API_URL}/auth/logout`}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={"Wyloguj"} />
          </ListItemButton>
        ) : (
          <ListItemButton component={Link} to={"/login"}>
            <ListItemIcon>
              <Login />
            </ListItemIcon>
            <ListItemText primary={"Zaloguj"} />
          </ListItemButton>
        )}
      </Toolbar>
    </AppBar>
  );
}
