export type PizzaSize = '10' | '12' | '14';

export interface Extra {
  id: string;
  name: string;
  price: number;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  ingredients: string[];
  allergens: string[];
  image: string;
  heroImage: string;
  basePrice: number; // for 12"
  sizes: { size: PizzaSize; price: number }[];
  extras: Extra[];
  isPopular?: boolean;
  isVegetarian?: boolean;
  isVegan?: boolean;
}

export type ProductCategory =
  | 'Classic Pizza'
  | 'Signature Pizza'
  | 'Vegetarian'
  | 'Vegan'
  | 'Sides'
  | 'Desserts'
  | 'Drinks';

export interface CartItem {
  id: string; // unique line id
  productId: string;
  name: string;
  size: PizzaSize;
  quantity: number;
  unitPrice: number;
  extras: Extra[];
  image: string;
}

export type OrderStatus =
  | 'confirmed'
  | 'preparing'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled';

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  address: string;
  paymentMethod: string;
}

export interface Address {
  id: string;
  label: string;
  street: string;
  city: string;
  isDefault: boolean;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  avatar?: string;
}
