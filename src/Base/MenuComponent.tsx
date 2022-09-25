import { AppBar, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import { Home, LocalShipping, Login, Logout, ShoppingBasket, Store } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useLogged } from "../Auth/UserContext";

export default function MenuComponent() {
  const logged = useLogged();
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
          disabled={!logged}
          to={"/basket"}>
          <ListItemIcon>
            <ShoppingBasket />
          </ListItemIcon>
          <ListItemText primary={"Koszyk"} />
        </ListItemButton>
        <ListItemButton
          selected={selected === 4}
          onClick={() => setSelected(4)}
          disabled={!logged}
          component={Link}
          to={"/orders"}>
          <ListItemIcon>
            <LocalShipping />
          </ListItemIcon>
          <ListItemText primary={"Zamówienia"} />
        </ListItemButton>
        {logged ? (
          <ListItemButton
            selected={selected === 5}
            onClick={() => setSelected(5)}
            href={`${process.env.REACT_APP_API_URL}/auth/logout`}>
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
