import { useEffect, useState } from "react";
import Order from "./Order";
import axios from "axios";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/orders`).then(
      (response) => {
        setOrders(response.data);
        setIsLoading(false);
      },
      (err) => setError(err),
    );
  }, []);
  return (
    <>
      <h2>Zamówienia</h2>
        {isLoading
          ? "Loading..."
          : !error && (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id zamówienia</TableCell>
                <TableCell>Data zamówienia</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.createdAt.toString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
    </>
  );
}
