import { useEffect, useState } from "react";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import BasketProduct from "./BasketProduct";

export default function BasketPage() {
  const [basketProducts, setBasketProducts] = useState<BasketProduct[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/basket`).then(
      (response) => {
        setBasketProducts(response.data);
        setIsLoading(false);
      },
      (err) => setError(err),
    );
  }, []);
  return (
    <>
      {isLoading
        ? "Loading..."
        : !error && (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Id zamówienia</TableCell>
                  <TableCell>Produkt</TableCell>
                  <TableCell>Liczba</TableCell>
                  <TableCell>Całkowita cena</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {basketProducts.map((basketProduct) => (
                  <TableRow key={basketProduct.id}>
                    <TableCell>{basketProduct.id}</TableCell>
                    <TableCell>{basketProduct.product.toString()}</TableCell>
                    <TableCell>{basketProduct.quantity}</TableCell>
                    <TableCell>{basketProduct.totalPrice}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
    </>
  );
}
