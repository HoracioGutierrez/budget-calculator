"use client"
import { frontendServices, backendServices, integrationsServices, customFeaturesServices } from "@/features/services/lib/utils";
import ServiceCard from "@/features/services/components/service-card";
import { TabCardProps } from "@/features/services/types";
import Cart from "@/features/cart/components/cart";

const TabCards = ({ service }: TabCardProps) => {

    const servicesMap = {
        frontend: frontendServices,
        backend: backendServices,
        integrations: integrationsServices,
        custom: customFeaturesServices
    }

    const services = servicesMap[service]

    return (
        <>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-4 max-w-screen-lg mx-auto">
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
            <Cart />
        </>
    );
}

export default TabCards;