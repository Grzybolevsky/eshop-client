import Product from "../Product/Product";

export default interface BasketProduct {
  product: Product;
  quantity: number;
  totalPrice: number;
  id: number;
}
