"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/features/ui/components/card";
import { useCart } from "@/features/providers/components/cart-prodiver";
import { Button } from "@/features/ui/components/button";
import { Download, Trash2 } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Separator } from "@/components/ui/separator";

const Cart = () => {

    const { cart, removeFromCart } = useCart()
    const [parent] = useAutoAnimate()

    const handleRemoveFromCart = (id: string) => {
        removeFromCart(id)
    }

    const exportToPDF = () => {
        console.log("export to pdf")
    }

    return (
        <div className="flex flex-col gap-4">
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
                                <Button variant="ghost" size="icon" className="cursor-pointer hover:bg-red-400 hover:text-destructive-foreground" onClick={() => handleRemoveFromCart(item.id)}>
                                    <Trash2 />
                                </Button>
                            </CardHeader>
                        </Card>
                    ))}
                </CardContent>
            </Card>
            <Card className="hidden md:block border-muted-foreground/20 min-w-sm">
                <CardHeader>
                    <CardTitle>Resume</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            {/* <span>${totals.baseTotal.toLocaleString()}</span> */}
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Time</span>
                            {/* <span>{totals.totalHours}h</span> */}
                        </div>
                        <div className="flex justify-between">
                            <span>Contract Type</span>
                            <span>
                                {/* {totals.priceMultiplier < 1
                                    ? `${((1 - totals.priceMultiplier) * 100).toFixed(0)}% ${t.discount}`
                                    : t.noDiscount} */}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Phases {/* ({phases.length}) */}:
                            </span>
                            <span>
                                {/* {totals.phaseMultiplier > 1
                                    ? `+${((totals.phaseMultiplier - 1) * 100).toFixed(0)}%`
                                    : t.surcharge} */}
                            </span>
                        </div>
                    </div>

                    <Separator />

                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Final</span>
                        <span className="text-green-600">${/* {totals.finalPrice.toLocaleString()} */}</span>
                    </div>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Estimated Time: {/* {Math.ceil(totals.totalHours / 8)} */} work days
                    </div>

                    <Button onClick={exportToPDF} className="w-full mt-4 bg-transparent" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default Cart;