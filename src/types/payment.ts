export type PaymentMethod =
  | 'UPI'
  | 'CARD'
  | 'NET_BANKING'
  | 'COD';

export type PaymentStatus =
  | 'PENDING'
  | 'PROCESSING'
  | 'SUCCESS'
  | 'FAILED'
  | 'CANCELLED';

export interface Payment {
  paymentId?: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  createdAt: string;
}