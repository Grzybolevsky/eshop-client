import { Container } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import ProductsPage from "../Product/ProductsPage";
import OrdersPage from "../Order/OrdersPage";
import BasketPage from "../Basket/BasketPage";
import LoginPage from "../Auth/LoginPage";

export default function ContentComponent() {
  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", flexGrow: 1, overflow: "auto", p: 2 }}>
      <Routes>
        <Route path={"/"} element={<MainPage />}></Route>
        <Route path={"/products"} element={<ProductsPage />}></Route>
        <Route path={"/orders"} element={<OrdersPage />}></Route>
        <Route path={"/basket"} element={<BasketPage />}></Route>
        <Route path={"/login"} element={<LoginPage />}></Route>
      </Routes>
    </Container>
  );
}
