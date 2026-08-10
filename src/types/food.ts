import type {ImageSourcePropType} from 'react-native';

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  category: string;
  image?: ImageSourcePropType;
  imageStyle?: string;
  accentStyle?: string;
}