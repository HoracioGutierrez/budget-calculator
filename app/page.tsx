import { Button } from "@/features/ui/components/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/ui/components/tabs";
import { Textarea } from "@/features/ui/components/textarea";
import { ChevronDownCircle, Sparkles } from "lucide-react";
import Image from "next/image";
import TabCards from "@/features/services/components/tab-cards";
import ServiceAiTextarea from "@/features/services/components/service-ai-textarea";

const LandingPage = () => {
    return (
        <>
            <section className="relative min-h-dvh w-full flex items-center justify-center py-20">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/20 to-primary z-10" />
                <Image
                    fill
                    src="/hero-image.jpg"
                    alt="Landing Page"
                    className="object-cover grayscale-75 blur-xs"
                />
                <div className="relative z-20 flex flex-col gap-12 px-4 ">
                    <h2 className="text-4xl md:text-6xl xl:text-8xl font-black text-white flex flex-col justify-center items-center text-center text-shadow-lg">
                        <span className="text-accent">
                            Website
                        </span>
                        Budget Calculator
                    </h2>
                    <p className="text-white/50 text-center text-base md:text-lg xl:text-xl max-w-2xl hover:text-white transition-all mx-auto">
                        The easiest way to calculate your project budget by yourself based on your client's requirements. Just describe your project and get the result in seconds!
                    </p>
                    <ServiceAiTextarea />
                </div>
                <Button variant="secondary" className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 rounded-full p-0 animate-bounce opacity-50 hover:opacity-100 transition-all hover:scale-125 hover:bg-accent hover:cursor-pointer" size="icon">
                    <ChevronDownCircle className="w-10 h-10" />
                </Button>
            </section>
            <section className="py-20">
                <h2 className="text-4xl font-bold text-center mb-20">Services</h2>
                <div className="px-4">
                    <Tabs defaultValue="frontend" className="w-full">
                        <TabsList className="grid w-full grid-cols-5 max-w-2xl mx-auto">
                            <TabsTrigger value="frontend" className="cursor-pointer">
                                <span className="md:hidden">Front</span>
                                <span className="hover:text-accent hidden md:block">Frontend</span>
                            </TabsTrigger>
                            <TabsTrigger value="backend" className="cursor-pointer">
                                <span className="md:hidden">Back</span>
                                <span className="hover:text-accent hidden md:block">Backend</span>
                            </TabsTrigger>
                            <TabsTrigger value="integrations" className="cursor-pointer">
                                <span className="md:hidden">Integ</span>
                                <span className="hover:text-accent hidden md:block">Integrations</span>
                            </TabsTrigger>
                            <TabsTrigger value="custom" className="cursor-pointer flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                <span className="md:hidden">AI</span>
                                <span className="hover:text-accent hidden md:block">
                                    AI Features
                                </span>
                            </TabsTrigger>
                            <TabsTrigger value="sprints" className="cursor-pointer flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                <span className="md:hidden">AI</span>
                                <span className="hover:text-accent hidden md:block">
                                    AI Sprints
                                </span>
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="frontend" className="mt-6">
                            <TabCards service="frontend" />
                        </TabsContent>
                        <TabsContent value="backend" className="mt-6">
                            <TabCards service="backend" />
                        </TabsContent>
                        <TabsContent value="integrations" className="mt-6">
                            <TabCards service="integrations" />
                        </TabsContent>
                        <TabsContent value="custom" className="mt-6">
                            <TabCards service="custom" />
                        </TabsContent>
                        <TabsContent value="sprints" className="mt-6">
                            <TabCards service="sprints" />
                        </TabsContent>
                    </Tabs>
                </div>
            </section>
        </>
    );
}

export default LandingPage;