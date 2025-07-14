import { toast } from "sonner"

export const createCustomFeature = async (feature: string) => {
    try {
        toast.loading("Analyzing feature...")
        const response = await fetch("/api/analyze-feature", {
            method: "POST",
            body: JSON.stringify({ description: feature, language: "en" }),
        })

        const data = await response.json()
        toast.dismiss()
        toast.success("Feature analyzed successfully!")
        return data
    } catch (error) {
        toast.dismiss()
        toast.error("Failed to analyze feature")
        return { error: "Failed to analyze feature" }
    }
}

