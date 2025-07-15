import { ServiceItem } from "@/features/services/types";

export type CartContextType = {
    cart: ServiceItem[]
    totals: Totals
    contractType: ContractType
    phases: number
    setContractType: (contractType: ContractType) => void
    setPhases: (phases: number) => void
    addToCart: (service: ServiceItem) => void
    removeFromCart: (id: string) => void
    updateQuantity: (id: string, quantity: number) => void
    clearCart: () => void
    setTotals: (totals: Totals) => void
}

export type ContractType = "freelance" | "module" | "project"

export type Totals = {
    baseTotal: number
    totalHours: number
    finalPrice: number
}