"use client"
import { useCart } from "@/features/providers/components/cart-prodiver";
import { Badge } from "@/features/ui/components/badge";
import { Button } from "@/features/ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/features/ui/components/card";
import { Sparkles } from "lucide-react";
import { calculateSprints } from "../actions/calculateSprints";
import { useState } from "react";
const SprintCalculator = () => {

    const [sprints, setSprints] = useState<Sprint[]>([])
    const { cart } = useCart()

    const handleGeneratePlan = async () => {
        const data = await calculateSprints(cart.map((item) => item.id), 3, "en")
        console.log("🚀 ~ handleGeneratePlan ~ data:", data)
        setSprints(data.sprints)
    }

    return (
        <Card className="w-full border-muted-foreground/20 min-h-70 flex flex-col">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    Sprint Calculator
                    <Badge variant="default">
                        NEW!
                    </Badge>
                </CardTitle>
                <CardDescription>
                    Click the button below to generate a sprint plan.
                </CardDescription>
            </CardHeader>
            <CardContent className="grow">
                <p className="max-w-4xl text-balance mb-4">
                    Select the services you want to include in your project, then click the button below to generate a sprint plan. Our AI Assistant will help you plan your project based on the configuration you have selected.
                    <span className="text-red-400">This feature is currently in beta!</span>
                </p>
                {cart.length === 0 && (
                    <p className="text-red-400 text-center p-6 border-2 rounded-md border-red-400/20">
                        Please add some services to your cart before generating a sprint plan!
                    </p>
                )}
                {sprints.length > 0 && (
                    <div className="flex flex-col gap-4">
                        <p className="text-muted-foreground">Sprint Plan</p>
                        <div className="flex flex-col gap-2">
                            {sprints.map((sprint) => (
                                <Card key={sprint.number} className="border-muted-foreground/20">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-bold">Sprint {sprint.number}: {sprint.name}</CardTitle>
                                        <CardDescription>{sprint.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        {/* <p>{sprint.features.map((feature: string) => feature).join(", ")}</p> */}
                                        <ul className="list-disc list-inside">
                                            {sprint.features.map((feature: string) => (
                                                <li key={feature}>{feature}</li>
                                            ))}
                                        </ul>
                                        <p>{sprint.estimatedHours} hours</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}
            </CardContent>
            <CardFooter className="flex justify-center">
                <Button disabled={cart.length === 0} onClick={handleGeneratePlan}>
                    <Sparkles className="w-4 h-4" />
                    Generate Plan
                </Button>
            </CardFooter>
        </Card>
    );
}

export default SprintCalculator;