import {
  Table,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import Product from "./Product";
import { ChangeEvent, useEffect, useState } from "react";
import { apiCall } from "../axiosConfig";
import { AddShoppingCart, Home } from "@mui/icons-material";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const emptyItem = {
    category: "",
    description: "",
    imageUrl: "",
    name: "",
    price: 0,
  };
  const [newProduct, setNewProduct] = useState<Product>(emptyItem);

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e: ChangeEvent<never>) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addItem = () => {
    setOpen(false);
    apiCall.post("/products", newProduct).then((res) => setProducts([...products, res.data]));
    console.log(newProduct);
  };

  useEffect(() => {
    setIsLoading(true);
    apiCall.get("/products").then(
      (response) => {
        setProducts(response.data);
        setIsLoading(false);
      },
      (err) => setError(err),
    );
  }, []);

  function addItemToCart(id?: number) {
    apiCall.post("/basket/" + id).then((res) => console.log(res.data));
  }

  return (
    <>
      <h2>Oferta sklepu</h2>
      <Button
        onClick={() => {
          setNewProduct(emptyItem);
          setOpen(true);
        }}>
        <Home />
        Dodaj przedmiot
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Dodaj przedmiot</DialogTitle>
        <TextField
          id="standard-basic"
          label="Nazwa"
          variant="standard"
          name="name"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="Kategoria"
          variant="standard"
          name="category"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="Opis"
          variant="standard"
          name="description"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="Cena"
          variant="standard"
          name="price"
          type="number"
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="Zdjęcie"
          variant="standard"
          name="imageUrl"
          onChange={handleChange}
        />
        <Button variant="outlined" onClick={addItem}>
          Dodaj przedmiot
        </Button>
      </Dialog>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nazwa produktu</TableCell>
            <TableCell>Kategoria</TableCell>
            <TableCell>Opis</TableCell>
            <TableCell>Cena</TableCell>
            <TableCell>Dodaj do koszyka</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading
            ? "Loading..."
            : !error &&
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <Button>{product.name}</Button>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price} PLN</TableCell>
                  <TableCell>
                    <Button onClick={() => addItemToCart(product.id)}>
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
