import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Extra, PizzaSize } from '@/types';
import { DELIVERY_FEE, FREE_DELIVERY_THRESHOLD } from '@/constants';

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: () => number;
  deliveryFee: () => number;
  total: () => number;
  itemCount: () => number;
}

function makeLineId(productId: string, size: PizzaSize, extras: Extra[]): string {
  const extraKey = extras
    .map((e) => e.id)
    .sort()
    .join('-');
  return `${productId}-${size}-${extraKey || 'plain'}`;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const id = makeLineId(item.productId, item.size, item.extras);
        const existing = get().items.find((i) => i.id === id);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity + item.quantity } : i
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, id }] });
        }
      },

      removeItem: (id) => {
        set({ items: get().items.filter((i) => i.id !== id) });
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeItem(id);
          return;
        }
        set({
          items: get().items.map((i) => (i.id === id ? { ...i, quantity } : i)),
        });
      },

      clearCart: () => set({ items: [] }),

      subtotal: () =>
        get().items.reduce((sum, i) => {
          const extrasTotal = i.extras.reduce((s, e) => s + e.price, 0);
          return sum + (i.unitPrice + extrasTotal) * i.quantity;
        }, 0),

      deliveryFee: () => {
        const sub = get().subtotal();
        return sub >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
      },

      total: () => get().subtotal() + get().deliveryFee(),

      itemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    {
      name: 'fire-and-stone-cart',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ items: state.items }),
    }
  )
);
