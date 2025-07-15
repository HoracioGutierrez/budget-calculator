"use client"
import { frontendServices, backendServices, integrationsServices, customFeaturesServices } from "@/features/services/lib/utils";
import ServiceCard from "@/features/services/components/service-card";
import { TabCardProps } from "@/features/services/types";
import Cart from "@/features/cart/components/cart";
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useCart } from "@/features/providers/components/cart-prodiver";
import SprintCalculator from "./sprint-calculator";
import ServiceAiFeatures from "./service-ai-features";

const TabCards = ({ service }: TabCardProps) => {

    const [parent] = useAutoAnimate()
    const { cart } = useCart()

    const servicesMap = {
        frontend: frontendServices,
        backend: backendServices,
        integrations: integrationsServices,
        custom: customFeaturesServices,
        sprints: []
    }

    const services = servicesMap[service]

    return (
        <div ref={parent} className="lg:grid lg:grid-cols-[1fr_max-content] max-w-screen-xl mx-auto gap-4">
            {service === "sprints" && (
                <SprintCalculator />
            )}
            {service === "custom" && (
                <ServiceAiFeatures />
            )}
            {service !== "sprints" && service !== "custom" && services.length > 0 && (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-4 h-fit">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            )}
            {service !== "sprints" && service !== "custom" && services.length === 0 && (
                <div className="flex justify-center items-center h-full border-dashed border-2 rounded-md border-muted-foreground/20 py-12">
                    <p className="text-muted-foreground">No services available</p>
                </div>
            )}
            {cart.length > 0 && <Cart />}
        </div>
    );
}

export default TabCards;