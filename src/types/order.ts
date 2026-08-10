import type {CartItem} from './cart';
import type {DeliveryAddress} from './address';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface Order {
  id: string;
  placedAt: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  tax: number;
  serviceCharge: number;
  status: 'Preparing';
  userId: number | string;
  username: string;
  deliveryAddress?: DeliveryAddress;
}