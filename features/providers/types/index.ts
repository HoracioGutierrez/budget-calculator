import { ServiceItem } from "@/features/services/types";

export type CartContextType = {
    cart: ServiceItem[]
    addToCart: (service: ServiceItem) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
}