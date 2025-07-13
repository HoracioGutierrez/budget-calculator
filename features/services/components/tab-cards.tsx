"use client"
import { frontendServices, backendServices, integrationsServices, customFeaturesServices } from "@/features/services/lib/utils";
import ServiceCard from "@/features/services/components/service-card";
import { TabCardProps } from "@/features/services/types";
import Cart from "@/features/cart/components/cart";
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { useCart } from "@/features/providers/components/cart-prodiver";

const TabCards = ({ service }: TabCardProps) => {

    const [parent] = useAutoAnimate()
    const { cart } = useCart()

    const servicesMap = {
        frontend: frontendServices,
        backend: backendServices,
        integrations: integrationsServices,
        custom: customFeaturesServices
    }

    const services = servicesMap[service]

    return (
        <div ref={parent} className="lg:grid lg:grid-cols-[1fr_max-content] max-w-screen-xl mx-auto gap-4">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-4">
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
            {cart.length > 0 && <Cart />}
        </div>
    );
}

export default TabCards;