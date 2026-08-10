import type {FoodItem} from './food';

export interface CartItem extends FoodItem {
  quantity: number;
}