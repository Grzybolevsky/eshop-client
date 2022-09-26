import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import BasketProduct from "./BasketProduct";
import { apiCall } from "../axiosConfig";
import { AddShoppingCart } from "@mui/icons-material";

export default function BasketPage() {
  const [basketProducts, setBasketProducts] = useState<BasketProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    apiCall.get("/basket").then(
      (response) => {
        setBasketProducts(response.data);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      },
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
    apiCall.post("/orders").then(() => {
      setBasketProducts([]);
    });
  }

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    basketProduct: BasketProduct,
  ) => {
    setBasketProducts(
      basketProducts.map((product) => {
        if (product.id == basketProduct.id) {
          product.quantity = Number(e.target.value);
          product.totalPrice = product.quantity * product.product.price;
          apiCall.put("/basket", product).then((res) => res.data);
        }
        return product;
      }),
    );
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <h2>Koszyk</h2>
      <Button disabled={basketProducts.length === 0} onClick={clearCart}>
        Wyczyść koszyk
      </Button>
      <Button disabled={basketProducts.length === 0} onClick={() => setDialogOpen(true)}>
        Złóż zamówienie
      </Button>

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
                      label="Liczba"
                      variant="standard"
                      name="quantity"
                      type="number"
                      InputProps={{ inputProps: { min: 1 } }}
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
      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <h2>Jesteś pewien?</h2>
        <Button onClick={placeOrder}>Złoż zamówienie</Button>
        <Button onClick={handleDialogClose}>Anuluj</Button>
      </Dialog>
    </>
  );
}
