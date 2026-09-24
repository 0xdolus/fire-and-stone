import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Order, OrderStatus, CartItem } from '@/types';
import { ETA_MINUTES } from '@/constants';

interface OrderState {
  orders: Order[];
  placeOrder: (params: {
    items: CartItem[];
    subtotal: number;
    deliveryFee: number;
    total: number;
    address: string;
    paymentMethod: string;
  }) => Order;
  updateStatus: (orderId: string, status: OrderStatus) => void;
  getOrder: (id: string) => Order | undefined;
}

function generateOrderId(): string {
  return `FS-${Date.now().toString(36).toUpperCase()}`;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      orders: [],

      placeOrder: ({ items, subtotal, deliveryFee, total, address, paymentMethod }) => {
        const now = new Date();
        const eta = new Date(now.getTime() + ETA_MINUTES * 60 * 1000);
        const order: Order = {
          id: generateOrderId(),
          items: [...items],
          subtotal,
          deliveryFee,
          total,
          status: 'confirmed',
          createdAt: now.toISOString(),
          estimatedDelivery: eta.toISOString(),
          address,
          paymentMethod,
        };
        set({ orders: [order, ...get().orders] });
        return order;
      },

      updateStatus: (orderId, status) => {
        set({
          orders: get().orders.map((o) =>
            o.id === orderId ? { ...o, status } : o
          ),
        });
      },

      getOrder: (id) => get().orders.find((o) => o.id === id),
    }),
    {
      name: 'fire-and-stone-orders',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
