import { AppBar, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Home, LocalShipping, Login, Logout, ShoppingBasket, Store } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState } from "react";

export default function MenuComponent() {
  const [cookies] = useCookies(["user_session"]);
  const [selected, setSelected] = useState(1);
  return (
    <AppBar position={"sticky"}>
      <Toolbar
        sx={{
          "& .Mui-selected": {
            backgroundColor: "rgb(0,0,0,0.2)",
          },
        }}>
        <ListItemButton
          selected={selected === 1}
          onClick={() => setSelected(1)}
          component={Link}
          to={"/"}>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary={"Główna"} />
        </ListItemButton>
        <ListItemButton
          selected={selected === 3}
          onClick={() => setSelected(3)}
          component={Link}
          to={"/products"}>
          <ListItemIcon>
            <Store />
          </ListItemIcon>
          <ListItemText primary={"Sklep"} />
        </ListItemButton>
        <ListItemButton
          selected={selected === 2}
          onClick={() => setSelected(2)}
          component={Link}
          disabled={!cookies.user_session}
          to={"/basket"}>
          <ListItemIcon>
            <ShoppingBasket />
          </ListItemIcon>
          <ListItemText primary={"Koszyk"} />
        </ListItemButton>
        <ListItemButton
          selected={selected === 4}
          onClick={() => setSelected(4)}
          disabled={!cookies.user_session}
          component={Link}
          to={"/orders"}>
          <ListItemIcon>
            <LocalShipping />
          </ListItemIcon>
          <ListItemText primary={"Zamówienia"} />
        </ListItemButton>
        {cookies.user_session ? (
          <ListItemButton
            selected={selected === 5}
            onClick={() => setSelected(5)}
            component={Link}
            to={"/logout"}>
            <ListItemIcon>
              <Logout />
            </ListItemIcon>
            <ListItemText primary={"Wyloguj"} />
          </ListItemButton>
        ) : (
          <ListItemButton
            selected={selected === 5}
            onClick={() => setSelected(5)}
            component={Link}
            to={"/login"}>
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
