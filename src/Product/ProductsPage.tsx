import { Table, TableRow, TableHead, TableCell, TableBody } from "@mui/material";
import Product from "./Product";
import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.API_URL}/products`).then(
      (response) => {
        setProducts(response.data);
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
                  <TableCell>Id produktu</TableCell>
                  <TableCell>Nazwa produktu</TableCell>
                  <TableCell>Kategoria</TableCell>
                  <TableCell>Opis</TableCell>
                  <TableCell>Cena</TableCell>
                  <TableCell>Dodaj do koszyka</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>{product.id}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{product.description}</TableCell>
                    <TableCell>{product.price}</TableCell>
                    <TableCell>KLIK</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
    </>
  );
}
