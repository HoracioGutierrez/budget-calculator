import { ServiceItem } from "@/features/services/types";

export type CartContextType = {
    cart: ServiceItem[]
    totals: Totals
    addToCart: (service: ServiceItem) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
}

export type Totals = {
    baseTotal: number
    totalHours: number
    finalPrice: number
}