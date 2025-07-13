import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/features/ui/components/card";
import { frontendServices, backendServices, integrationsServices, customFeaturesServices } from "@/features/services/lib/utils";
import { TabCardProps } from "@/features/services/types";
import { Button } from "@/features/ui/components/button";
import { Plus } from "lucide-react";

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
                <Card key={service.id}>
                    <CardHeader>
                        <CardTitle>{service.title}</CardTitle>
                        <CardDescription className="line-clamp-2">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>

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