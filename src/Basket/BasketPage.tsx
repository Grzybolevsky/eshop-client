import React, { ChangeEvent, useEffect, useState } from "react";
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import BasketProduct from "./BasketProduct";
import { apiCall } from "../axiosConfig";
import { AddShoppingCart } from "@mui/icons-material";

export default function BasketPage() {
  const [basketProducts, setBasketProducts] = useState<BasketProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    apiCall.get("/basket").then(
      (response) => {
        setBasketProducts(response.data);
        setIsLoading(false);
      },
      (err) => setError(err),
    );
  }, []);

  const removeItemFromCart = (id: number) => {
    apiCall
      .delete("/basket/" + id)
      .then((res) => setBasketProducts(basketProducts.filter((val) => val.id != res.data.id)));
  };

  function clearCart() {
    apiCall.delete("/basket").then(() => setBasketProducts([]));
  }

  function placeOrder() {
    apiCall.post("/orders").then((res) => {
      console.log(res);
      setBasketProducts([]);
    });
  }

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    basketProduct: BasketProduct,
  ) => {
    const { value } = e.target;
    basketProduct.quantity = Number(value);
    setBasketProducts(basketProducts);
  };

  return (
    <>
      <h2>Koszyk</h2>
      <Button onClick={clearCart}>Wyczyść koszyk</Button>
      <Button onClick={placeOrder}>Złóż zamówienie</Button>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Produkt</TableCell>
            <TableCell>Liczba</TableCell>
            <TableCell>Całkowita cena</TableCell>
            <TableCell>Usuń z koszyka</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? "Loading..."
            : !error &&
              basketProducts.map((basketProduct) => (
                <TableRow key={basketProduct.id}>
                  <TableCell>{basketProduct.product.name}</TableCell>
                  <TableCell>
                    <TextField
                      id="standard-basic"
                      label="Cena"
                      variant="standard"
                      name="price"
                      type="number"
                      onChange={(e) => handleChange(e, basketProduct)}
                      value={basketProduct.quantity}
                    />
                  </TableCell>
                  <TableCell>{basketProduct.totalPrice}</TableCell>
                  <TableCell>
                    <Button onClick={() => removeItemFromCart(basketProduct.id)}>
                      <AddShoppingCart />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}
