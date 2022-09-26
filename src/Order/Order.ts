export default interface Order {
  createdAt: Date;
  isPaid: boolean;
  paymentLink: string;
  id: number;
}
