"use client"
import { Badge } from "@/features/ui/components/badge";
import { Button } from "@/features/ui/components/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/features/ui/components/card";
import { Textarea } from "@/features/ui/components/textarea";
import { Sparkles } from "lucide-react";
import { createCustomFeature } from "../actions/createCustomFeature";
import { useState } from "react";

const ServiceAiFeatures = () => {

    const [feature, setFeature] = useState("")
    const [featureData, setFeatureData] = useState<any>(null)

    const handleFeatureChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeature(e.target.value)
    }

    const handleCustomFeature = async () => {
        const data = await createCustomFeature(feature)
        setFeatureData(data)
    }

    return (
        <Card className="w-full border-muted-foreground/20 min-h-70 flex flex-col">
            <CardHeader>
                <CardTitle className="flex justify-between">
                    AI Custom Features
                    <Badge variant="default">
                        NEW!
                    </Badge>
                </CardTitle>
                <CardDescription>
                    Click the button below to generate a custom feature.
                </CardDescription>
            </CardHeader>
            <CardContent className="grow">
                <p className="max-w-4xl text-balance mb-4">
                    Complete the form below to generate a custom feature. Describe the feature you want to generate and click the button below to generate a custom priced feature to add to your project.
                    <span className="text-red-400">This feature is currently in beta!</span>
                </p>
                <Textarea
                    placeholder="I want a feature that allows users to..."
                    className="min-h-40 bg-secondary"
                    value={feature}
                    onChange={handleFeatureChange}
                />

            </CardContent>
            <CardFooter className="flex justify-center flex-col gap-4">
                <Button onClick={handleCustomFeature} className="mb-8">
                    <Sparkles className="w-4 h-4" />
                    Generate Feature
                </Button>
                {featureData && (
                    <Card className="flex flex-col gap-2 border-muted-foreground/20">
                        <CardHeader>
                            <CardTitle>
                                Feature Analysis
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">
                                Estimated Price: ${featureData.estimatedPrice}
                            </p>
                            <p className="text-muted-foreground">
                                Estimated Hours: {featureData.estimatedHours} hours
                            </p>
                            <p className="text-muted-foreground">
                                Reasoning: {featureData.reasoning}
                            </p>
                        </CardContent>
                    </Card>
                )}
            </CardFooter>
        </Card>
    );
}

export default ServiceAiFeatures;