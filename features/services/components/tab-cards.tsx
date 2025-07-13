import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/features/ui/components/card";
import { frontendServices, backendServices, integrationsServices, customFeaturesServices } from "@/features/services/lib/utils";
import { TabCardProps } from "@/features/services/types";
import { Button } from "@/features/ui/components/button";
import { CircleDollarSign, Clock, DollarSign, Plus } from "lucide-react";

const TabCards = ({ service }: TabCardProps) => {

    const servicesMap = {
        frontend: frontendServices,
        backend: backendServices,
        integrations: integrationsServices,
        custom: customFeaturesServices
    }

    const services = servicesMap[service]

    return (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-4 max-w-screen-lg mx-auto">
            {services.map((service) => (
                <Card key={service.id} className="border-muted-foreground/20 hover:border-accent hover:scale-105 transition-all">
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">{service.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex justify-between">
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            <Clock className="size-4"/> {service.timeHours} hs
                        </p>
                        <p className="text-sm text-muted-foreground flex items-center gap-2">
                            USD ${service.basePrice}
                        </p>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full cursor-pointer hover:bg-accent">
                            <Plus />
                            Add to cart
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}

export default TabCards;