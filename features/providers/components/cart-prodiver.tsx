"use client"
import { ServiceItem } from "@/features/services/types";
import { createContext, useContext, useState } from "react";
import { CartContextType, Totals } from "../types";
import { toast } from "sonner";

const CartContext = createContext<CartContextType>({
    cart: [],
    totals: {
        baseTotal: 0,
        totalHours: 0,
        finalPrice: 0,
    },
    addToCart: (service: ServiceItem) => { },
    removeFromCart: (id: string) => { },
    updateQuantity: (id: string, quantity: number) => { },
    clearCart: () => { },
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

    const addToCart = (service: ServiceItem) => {
        // check if the service is already in the cart
        const existing = cart.find((item) => item.id === service.id)
        if (existing) {
            toast.error("Service already in cart")
        } else {
            setCart((prev) => [...prev, service])
            setTotals((prev: Totals) => ({
                ...prev,
                baseTotal: prev.baseTotal + service.basePrice,
                totalHours: prev.totalHours + service.timeHours,
                finalPrice: prev.finalPrice + service.basePrice,
            }))
        }
    }

    const removeFromCart = (id: string) => {
        const serviceToRemove = cart.find((item) => item.id === id)
        if (serviceToRemove) {
            setCart((prev) => prev.filter((item) => item.id !== id))
            setTotals((prev: Totals) => ({
                ...prev,
                baseTotal: prev.baseTotal - serviceToRemove.basePrice,
                totalHours: prev.totalHours - serviceToRemove.timeHours,
                finalPrice: prev.finalPrice - serviceToRemove.basePrice,
            }))
        }
    }

    const updateQuantity = (id: string, quantity: number) => {
        const serviceToUpdate = cart.find((item) => item.id === id)
        if (serviceToUpdate) {
            setCart((prev) => prev.map((item) => 
                item.id === id ? { ...item, quantity } : item
            ))
            setTotals((prev: Totals) => ({
                ...prev,
                baseTotal: prev.baseTotal + (serviceToUpdate.basePrice * (quantity - 1)),
                totalHours: prev.totalHours + (serviceToUpdate.timeHours * (quantity - 1)), 
                finalPrice: prev.finalPrice + (serviceToUpdate.basePrice * (quantity - 1))
            }))
        }
    }

    const clearCart = () => {
        setCart([])
    }


    return (
        <CartContext.Provider value={{ cart, totals, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;