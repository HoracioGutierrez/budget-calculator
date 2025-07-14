"use client"
import { Button } from "@/features/ui/components/button";
import { ChevronDownCircle } from "lucide-react";

const ScrollDownButton = () => {

    const handleScrollDown = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: "smooth"
        })
        console.log("🚀 ~ handleScrollDown ~ window.innerHeight:", window.innerHeight)
    }

    return (
        <Button
            variant="secondary"
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 rounded-full p-0 animate-bounce opacity-50 hover:opacity-100 transition-all hover:scale-125 hover:bg-accent hover:cursor-pointer"
            size="icon"
            onClick={handleScrollDown}
        >
            <ChevronDownCircle className="w-10 h-10" />
        </Button>
    );
}

export default ScrollDownButton;