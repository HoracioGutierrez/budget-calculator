import { Button } from "@/features/ui/components/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/features/ui/components/card";
import { Calculator, Sparkles } from "lucide-react";

const SprintCalculator = () => {
    return (
        <Card className="w-full max-w-2xl mx-auto border-muted-foreground/20 min-h-70">
            <CardHeader>
                <CardTitle>
                    Sprint Calculator
                </CardTitle>
                <CardDescription>
                    Click the button below to generate a sprint plan for your project based on the services you have selected.
                </CardDescription>
            </CardHeader>
            <CardFooter className="flex justify-center">
                <Button>
                    <Sparkles className="w-4 h-4" />
                    Generate Plan
                </Button>
            </CardFooter>
        </Card>
    );
}

export default SprintCalculator;