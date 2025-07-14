import { Button } from "@/features/ui/components/button";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/features/ui/components/dialog"
import { Info } from "lucide-react";
import { ServiceDetailsPopupProps } from "../types";

const ServiceDetailsPopup = ({ service }: ServiceDetailsPopupProps) => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="ml-2">
                    <Info className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white dark:bg-secondary">
                <DialogHeader>
                    <DialogTitle>{service.title}</DialogTitle>
                    <DialogDescription>{service.description}</DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                    <div>
                        <h4 className="font-semibold mb-3">Task Breakdown</h4>
                        <div className="space-y-2">
                            {service.details.map((detail, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between items-start p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                                >
                                    <div className="flex-1">
                                        <p className="font-medium text-sm">{detail.task}</p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">{detail.description}</p>
                                    </div>
                                    <span className="text-sm font-medium text-blue-600 ml-3">{detail.hours}h</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-3">Deliverables</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            {service.deliverables.map((deliverable, index) => (
                                <li key={index}>{deliverable}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex justify-between items-center pt-4 border-t">
                        <div className="flex items-center gap-4">
                            <span className="text-lg font-bold text-green-600">${service.basePrice}</span>
                            <span className="text-sm text-gray-600 dark:text-gray-400">
                                {service.timeHours} hours
                            </span>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ServiceDetailsPopup;