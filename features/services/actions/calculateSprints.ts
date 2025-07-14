import { toast } from "sonner"

export const calculateSprints = async (features: string[], phases: number, language: string) => {

    try {
        toast.loading("Calculating sprints...")
        const response = await fetch("/api/analyze-sprints", {
            method: "POST",
            body: JSON.stringify({ features, phases, language }),
        })

        const data = await response.json()
        toast.dismiss()
        toast.success("Sprints calculated successfully!")
        return data
    } catch (error) {
        toast.error("Failed to calculate sprints")
        return { error: "Failed to calculate sprints" }
    }
}

