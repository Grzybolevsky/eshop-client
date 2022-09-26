import {
  Button,
  Dialog,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from "@mui/material";
import Product from "./Product";
import { ChangeEvent, useEffect, useState } from "react";
import { apiCall } from "../axiosConfig";
import { AddShoppingCart, Home } from "@mui/icons-material";
import { useLogged } from "../Auth/UserContext";

const emptyItem = {
  category: "",
  description: "",
  imageUrl: "",
  name: "",
  price: 0,
};

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [productDetails, setProductDetails] = useState<Product>(emptyItem);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const logged = useLogged();

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

  const addProduct = () => {
    setOpen(false);
    apiCall.post("/products", newProduct).then((res) => setProducts([...products, res.data]));
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

  const addItemToCart = (id?: number) => {
    apiCall.post("/basket/" + id).then((res) => console.log(res.data));
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  const openDetails = (product: Product) => {
    setProductDetails(product);
    setDetailsOpen(true);
  };

  const deleteProduct = (productId: number | undefined) => {
    apiCall.delete("/products/" + productId).then((res) => {
      setProducts(products.filter((product) => product.id != res.data.id));
      setDetailsOpen(false);
    });
  };

  return (
    <>
      <h2>Oferta sklepu</h2>
      <Button
        onClick={() => {
          setNewProduct(emptyItem);
          setOpen(true);
        }}
        disabled={!logged}>
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
          InputProps={{ inputProps: { min: 0 } }}
          onChange={handleChange}
        />
        <TextField
          id="standard-basic"
          label="Zdjęcie"
          variant="standard"
          name="imageUrl"
          onChange={handleChange}
        />
        <Button variant="outlined" onClick={addProduct}>
          Dodaj przedmiot
        </Button>
      </Dialog>

      <Dialog open={detailsOpen} onClose={handleDetailsClose}>
        <img src={productDetails?.imageUrl} alt={"cannot fetch image"}/>
        <h2>{productDetails?.name}</h2>
        <h3>Kategoria: {productDetails?.category}</h3>
        <a>{productDetails?.description}</a>
        <Button disabled={!logged} onClick={() => deleteProduct(productDetails.id)}>
          Usuń produkt
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
                    <Button onClick={() => openDetails(product)}>{product.name}</Button>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>{product.price} PLN</TableCell>
                  <TableCell>
                    <Button disabled={!logged} onClick={() => addItemToCart(product.id)}>
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
