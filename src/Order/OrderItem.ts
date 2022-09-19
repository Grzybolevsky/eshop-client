import Product from "../Product/Product";

export default interface OrderItem {
  product: Product;
  quantity: number;
}
