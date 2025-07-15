"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/features/ui/components/card";
import { useCart } from "@/features/providers/components/cart-prodiver";
import { Button } from "@/features/ui/components/button";
import { Download, Trash2 } from "lucide-react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { Separator } from "@/components/ui/separator";
import { exportToPDF } from "../lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/features/ui/components/select";
import { ContractType } from "@/features/providers/types";
import { Slider } from "@/features/ui/components/slider";

const Cart = () => {

    const { cart, removeFromCart, totals, contractType, phases, setContractType, setPhases, setTotals } = useCart()
    const [parent] = useAutoAnimate()

    const handleRemoveFromCart = (id: string) => {
        removeFromCart(id)
    }

    const handleExportToPDF = () => {
        exportToPDF(totals, "es", cart)
    }

    const handleContractTypeChange = (value: ContractType) => {
        setContractType(value)
        setTotals({
            ...totals,
            finalPrice: totals.baseTotal * (value === "freelance" ? 1.15 : value === "module" ? 1.10 : 1)
        })
    }

    const handlePhasesChange = (value: number[]) => {
        setPhases(value[0])
    }

    return (
        <div className="flex flex-col gap-4 max-w-sm">
            <Card className="hidden md:block border-muted-foreground/20 min-w-sm">
                <CardHeader>
                    <CardTitle>Contract Type</CardTitle>
                </CardHeader>
                <CardContent>
                    <Select value={contractType} onValueChange={handleContractTypeChange}>
                        <SelectTrigger type="button" className="w-full bg-secondary">
                            <SelectValue placeholder="Select Contract Type" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="freelance">Freelance - Hourly</SelectItem>
                            <SelectItem value="module">Module - Fixed Price</SelectItem>
                            <SelectItem value="project">Full Project - Fixed Price</SelectItem>
                        </SelectContent>
                    </Select>
                </CardContent>
            </Card>
            <Card className="hidden md:block border-muted-foreground/20 min-w-sm">
                <CardHeader>
                    <CardTitle>Phases</CardTitle>
                    <CardDescription>
                        Select the number of phases you want to divide your project into.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <p className="text-sm text-muted-foreground">
                        {phases} {phases === 1 ? "Phase" : "Phases"}
                    </p>
                    <Slider value={[phases]} onValueChange={handlePhasesChange} min={1} max={10} step={1} />
                    <p className="text-sm text-accent-1">
                        If the number of phases is greather than 6, the price will be increased by 5% for each additional phase.
                    </p>
                </CardContent>
            </Card>
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
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>${totals.baseTotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Estimated Time</span>
                            <span>{totals.totalHours}h</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Contract Type</span>
                            <span>
                                {contractType === "freelance" && "+15%"}
                                {contractType === "module" && "+10%"}
                                {contractType === "project" && "+0%"}
                            </span>
                        </div>
                        <div className="flex justify-between">
                            <span>
                                Phases
                            </span>
                            <span>
                                {phases > 6
                                    ? `+${((phases - 6) * 0.05 * 100).toFixed(0)}%`
                                    : "No surcharge"}
                            </span>
                        </div>
                    </div>

                    <Separator className="my-2" />

                    <div className="flex justify-between items-center text-lg font-bold">
                        <span>Total Final</span>
                        <span>${totals.finalPrice.toLocaleString()}</span>
                    </div>

                    <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                        Estimated Time: {Math.ceil(totals.totalHours / 8)} work days
                    </div>

                    <Button onClick={handleExportToPDF} className="w-full mt-4 bg-transparent" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}

export default Cart;