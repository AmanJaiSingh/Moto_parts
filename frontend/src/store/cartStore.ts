import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  qty: number;
  stockCount: number;
}

interface CartState {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  decrementFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cartItems: [],
      addToCart: (item) => {
        const itemExists = get().cartItems.find((x) => x._id === item._id);
        if (itemExists) {
          set({
            cartItems: get().cartItems.map((x) =>
              x._id === item._id ? { ...x, qty: x.qty + 1 } : x
            ),
          });
        } else {
          set({ cartItems: [...get().cartItems, { ...item, qty: 1 }] });
        }
      },
      removeFromCart: (id) => {
        set({
          cartItems: get().cartItems.filter((x) => x._id !== id),
        });
      },
      decrementFromCart: (id) => {
        const itemExists = get().cartItems.find((x) => x._id === id);
        if (itemExists && itemExists.qty > 1) {
          set({
            cartItems: get().cartItems.map((x) =>
              x._id === id ? { ...x, qty: x.qty - 1 } : x
            ),
          });
        } else {
          set({
            cartItems: get().cartItems.filter((x) => x._id !== id),
          });
        }
      },
      updateQty: (id, qty) => {
        set({
          cartItems: get().cartItems.map((x) =>
            x._id === id ? { ...x, qty: Math.max(1, qty) } : x
          ),
        });
      },
      clearCart: () => set({ cartItems: [] }),
      cartTotal: () => {
        return get().cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
