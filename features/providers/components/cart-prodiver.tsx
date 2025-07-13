"use client"
import { ServiceItem } from "@/features/services/types";
import { createContext, useContext, useState } from "react";
import { CartContextType } from "../types";

const CartContext = createContext<CartContextType>({
    cart: [],
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

    const addToCart = (service: ServiceItem) => {
        setCart((prev) => [...prev, service])
    }

    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id))
    }

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prev) => prev.map((item) => item.id === id ? { ...item, quantity } : item))
    }

    const clearCart = () => {
        setCart([])
    }


    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
}

export default CartProvider;