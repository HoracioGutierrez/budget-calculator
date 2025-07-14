"use client"
import { Button } from "@/features/ui/components/button";
import { Textarea } from "@/features/ui/components/textarea";
import { useState } from "react";
import { analyzeAppDescription } from "../actions/analizeAppDescription";
import { ServiceItem } from "../types";
import ServiceCard from "./service-card";
import { useAutoAnimate } from "@formkit/auto-animate/react"
const ServiceAiTextarea = () => {

    const [description, setDescription] = useState("")
    const [suggestedServices, setSuggestedServices] = useState<ServiceItem[]>([])
    const [parent] = useAutoAnimate()
    const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const handleCalculate = async () => {
        const suggestedServices = await analyzeAppDescription(description, "es")
        setSuggestedServices(suggestedServices)
    }

    return (
        <div className="flex flex-col gap-4">

            <Textarea
                rows={1}
                className="resize-none border-none text-white max-w-xl mx-auto"
                placeholder="Describe your project..."
                value={description}
                onChange={handleDescriptionChange}
            />
            <div className="flex items-center justify-center gap-4">
                <Button variant="secondary">
                    Cancel
                </Button>
                <Button onClick={handleCalculate}>
                    Calculate
                </Button>
            </div>
            <div ref={parent} className="gap-4 grid grid-cols-[repeat(auto-fill,minmax(min(300px,100%),1fr))] gap-4">
                {suggestedServices.length > 0 && (
                    suggestedServices.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))
                )}
            </div>
        </div>
    );
}

export default ServiceAiTextarea;