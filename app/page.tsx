import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDownCircle, Plus } from "lucide-react";
import Image from "next/image";

const LandingPage = () => {
    return (
        <>
            <section className="relative h-dvh w-full flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary z-10" />
                <Image
                    fill
                    src="/hero-image.jpg"
                    alt="Landing Page"
                    className="object-cover grayscale-75 blur-xs"
                />
                <div className="relative z-20 flex flex-col gap-12">
                    <h2 className="text-8xl font-bold text-white flex flex-col justify-center items-center">
                        <span className="text-accent">
                            Website
                        </span>
                        Budget Calculator
                    </h2>
                    <p className="text-white/50 text-center text-xl max-w-2xl hover:text-white transition-all">
                        The easiest way to calculate your project budget by yourself based on your client's requirements. Just describe your project and get the result in seconds!
                    </p>
                    <div className="flex flex-col gap-4">
                        <Textarea
                            rows={1}
                            className="resize-none border-none text-white max-w-xl mx-auto"
                            placeholder="Describe your project..."
                        />
                        <div className="flex items-center justify-center gap-4">
                            <Button variant="secondary">
                                Cancel
                            </Button>
                            <Button>
                                Calculate
                            </Button>
                        </div>
                    </div>
                </div>
                <Button variant="secondary" className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 rounded-full p-0 animate-bounce opacity-50 hover:opacity-100 transition-all hover:scale-125 hover:bg-accent hover:cursor-pointer" size="icon">
                    <ChevronDownCircle className="w-10 h-10" />
                </Button>
            </section>
            <section>
                <h2>
                    Welcome to the Budget Calculator App
                </h2>
            </section>
        </>
    );
}

export default LandingPage;