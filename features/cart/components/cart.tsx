"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/features/ui/components/card";
import { useCart } from "@/features/providers/components/cart-prodiver";
import { Button } from "@/features/ui/components/button";
import { Trash2 } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const Cart = () => {

    const { cart } = useCart()
    const [parent] = useAutoAnimate()

    return (
        <Card className="hidden md:block border-muted-foreground/20 min-w-sm">
            <CardHeader>
                <CardTitle>Cart</CardTitle>
            </CardHeader>
            <CardContent ref={parent} className="flex flex-col gap-2">
                {cart.map((item) => (
                    <Card key={item.id} className="border-none bg-secondary">
                        <CardHeader className="flex flex-row justify-between items-center">
                            <div>
                                <CardTitle className="text-base">{item.title}</CardTitle>
                                <CardDescription className="text-sm text-muted-foreground">
                                    ${item.basePrice} x 1
                                </CardDescription>
                            </div>
                            <Button variant="ghost" size="icon" className="cursor-pointer hover:bg-red-400 hover:text-destructive-foreground">
                                <Trash2 />
                            </Button>
                        </CardHeader>
                    </Card>
                ))}
            </CardContent>
        </Card>
    );
}

export default Cart;