"use client"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/features/ui/components/card";
import { Button } from "@/features/ui/components/button";
import { Clock, Plus } from "lucide-react";
import { ServiceCardProps } from "../types";
import { useCart } from "@/features/providers/components/cart-prodiver";
import ServiceDetailsPopup from "./service-details-popup";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/features/ui/components/tooltip";

const ServiceCard = ({ service }: ServiceCardProps) => {

    const { addToCart } = useCart()

    const handleAddToCart = () => {
        addToCart(service)
    }

    return (
        <Card
            key={service.id}
            className="border-muted-foreground/20 hover:border-accent hover:scale-105 transition-all h-fit"
        >
            <CardHeader>
                <CardTitle className="text-xl font-bold flex justify-between items-center">
                    {service.title}
                    <ServiceDetailsPopup service={service} />
                </CardTitle>
                <CardDescription className="line-clamp-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger className="line-clamp-2 text-left">
                                {service.description}
                            </TooltipTrigger>
                            <TooltipContent className="max-w-sm">
                                {service.description}
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>  
                </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-between">
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Clock className="size-4" /> {service.timeHours} hs
                </p>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                    USD ${service.basePrice}
                </p>
            </CardContent>
            <CardFooter>
                <Button className="w-full cursor-pointer hover:bg-accent" onClick={handleAddToCart}>
                    <Plus />
                    Add to cart
                </Button>
            </CardFooter>
        </Card>
    );
}

export default ServiceCard;