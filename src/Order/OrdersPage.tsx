import { useEffect, useState } from "react";
import Order from "./Order";
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { apiCall } from "../axiosConfig";
import { Payment } from "@mui/icons-material";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    setIsLoading(true);
    apiCall.get("/orders").then(
      (response) => {
        setOrders(response.data);
        setIsLoading(false);
      },
      (err) => {
        setError(err);
        setIsLoading(false);
      },
    );
  }, []);
  return (
    <>
      <h2>Zamówienia</h2>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id zamówienia</TableCell>
            <TableCell>Data zamówienia</TableCell>
            <TableCell>Opłać</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {" "}
          {isLoading
            ? "Loading..."
            : !error &&
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>{order.id}</TableCell>
                  <TableCell>{order.createdAt.toString()}</TableCell>
                  <TableCell>
                    <Button disabled={order.isPaid}>
                      <Payment />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </>
  );
}
