import { toast } from "sonner"
import { customFeaturesServices, integrationsServices, backendServices, frontendServices } from "../lib/utils"
import { ServiceItem } from "../types"
export const analyzeAppDescription = async (appDescription: string, language: string): Promise<ServiceItem[]> => {

    const services = [
        ...frontendServices,
        ...backendServices,
        ...integrationsServices,
        ...customFeaturesServices
    ]

    if (!appDescription.trim()) return []

    try {
        toast.loading("Analyzing your project...")
        const res = await fetch("/api/analyze-app", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ description: appDescription, language }),
        })

        if (!res.ok) {
            const { error } = await res.json()
            toast.error(error ?? "Error analyzing project.")
            return []
        }

        const { suggestedServiceIds } = await res.json()
        const suggested = services.filter((service) => suggestedServiceIds.includes(service.id))
        toast.dismiss()
        toast.success("Project analyzed successfully!")
        return suggested as ServiceItem[]
    } catch (error) {
        toast.error("Error analyzing project.")
        return []
    }
}