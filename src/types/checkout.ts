import type {DeliveryAddress} from './address';
import type {PaymentMethod} from './payment';

export interface CheckoutState {
  address: DeliveryAddress | null;
  paymentMethod: PaymentMethod | null;
  subtotal: number;
  tax: number;
  serviceCharge: number;
  total: number;
}