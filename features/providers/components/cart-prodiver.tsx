"use client"
import { ServiceItem } from "@/features/services/types";
import { createContext, useContext, useEffect, useState } from "react";
import { CartContextType, ContractType, Totals } from "../types";
import { toast } from "sonner";

const CartContext = createContext<CartContextType>({
    cart: [],
    totals: {
        baseTotal: 0,
        totalHours: 0,
        finalPrice: 0,
    },
    contractType: "freelance",
    phases: 0,
    setContractType: (contractType: ContractType) => { },
    setPhases: (phases: number) => { },
    addToCart: (service: ServiceItem) => { },
    removeFromCart: (id: string) => { },
    updateQuantity: (id: string, quantity: number) => { },
    clearCart: () => { },
    setTotals: (totals: Totals) => { },
})

export const useCart = () => {
    const context = useContext(CartContext)
    if (!context) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}

const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = useState<ServiceItem[]>([])
    const [totals, setTotals] = useState<Totals>({
        baseTotal: 0,
        totalHours: 0,
        finalPrice: 0,
    })
    const [contractType, setContractType] = useState<ContractType>("freelance")
    const [phases, setPhases] = useState<number>(0)

    // Calcula el precio base según el cart y contractType
    const calculateBaseFinalPrice = () => {
        return cart.reduce((acc, service) => {
            const quantity = service.quantity ?? 1;
            const multiplier = contractType === "freelance" ? 1.15 : contractType === "module" ? 1.10 : 1;
            return acc + service.basePrice * quantity * multiplier;
        }, 0);
    };

    useEffect(() => {
        const baseTotal = cart.reduce((acc, service) => acc + service.basePrice * (service.quantity ?? 1), 0);
        const totalHours = cart.reduce((acc, service) => acc + service.timeHours * (service.quantity ?? 1), 0);
        let finalPrice = calculateBaseFinalPrice();
        if (phases > 6) {
            finalPrice = finalPrice * (1 + (phases - 6) * 0.05);
        }
        setTotals({
            baseTotal,
            totalHours,
            finalPrice,
        });
    }, [cart, contractType, phases]);

    const addToCart = (service: ServiceItem) => {
        // check if the service is already in the cart
        const existing = cart.find((item) => item.id === service.id)
        if (existing) {
            toast.error("Service already in cart")
        } else {
            setCart((prev) => [...prev, service])
            toast.success("Service added to cart")
        }
    }

    const removeFromCart = (id: string) => {
        const serviceToRemove = cart.find((item) => item.id === id)
        if (serviceToRemove) {
            setCart((prev) => prev.filter((item) => item.id !== id))
            toast.success("Service removed from cart")
        }
    }

    const updateQuantity = (id: string, quantity: number) => {
        const serviceToUpdate = cart.find((item) => item.id === id)
        if (serviceToUpdate) {
            setCart((prev) => prev.map((item) =>
                item.id === id ? { ...item, quantity } : item
            ))
            toast.success("Service quantity updated")
        }
    }

    const clearCart = () => {
        setCart([])
    }


    return (
        <CartContext.Provider value={{ cart, totals, contractType, phases, addToCart, removeFromCart, updateQuantity, clearCart, setContractType, setPhases, setTotals }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;