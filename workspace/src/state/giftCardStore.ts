import "react-native-get-random-values";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";

export interface GiftCardOrder {
  id: string;
  amount: number;
  recipientName: string;
  recipientEmail: string;
  message?: string;
  deliveryDateISO?: string | null;
  status: "scheduled" | "sent";
  createdAtISO: string;
}

interface GiftCardState {
  orders: GiftCardOrder[];
  createGiftCard: (input: Omit<GiftCardOrder, "id" | "status" | "createdAtISO">) => GiftCardOrder;
  markSent: (id: string) => void;
}

export const useGiftCardStore = create<GiftCardState>()(
  persist(
    (set, get) => ({
      orders: [],
      createGiftCard: (input) => {
        const order: GiftCardOrder = {
          id: uuidv4(),
          amount: input.amount,
          recipientName: input.recipientName,
          recipientEmail: input.recipientEmail,
          message: input.message,
          deliveryDateISO: input.deliveryDateISO ?? null,
          status: input.deliveryDateISO ? "scheduled" : "sent",
          createdAtISO: new Date().toISOString(),
        };
        set({ orders: [order, ...get().orders] });
        return order;
      },
      markSent: (id) => set({
        orders: get().orders.map(o => (o.id === id ? { ...o, status: "sent" } : o))
      }),
    }),
    {
      name: "mothership-giftcards",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ orders: state.orders }),
    }
  )
);
