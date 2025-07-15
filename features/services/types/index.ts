export type TaskDetail = {
    task: string
    hours: number
    description: string
}

export type ServiceItem = {
    id: string
    nameKey: string
    descriptionKey: string
    basePrice: number
    timeHours: number
    category: ServiceCategory
    details: TaskDetail[]
    deliverables: string[]
    title: string
    description: string
    quantity?: number // cantidad opcional para el carrito
}

export type ServiceCategory = "frontend" | "backend" | "integrations" | "custom" | "sprints"

export type TabCardProps = {
    service: ServiceCategory
}

export type ServiceCardProps = {
    service: ServiceItem
}

export type ServiceDetailsPopupProps = {
    service: ServiceItem
}

export type Sprint = {
    name: string
    description: string
    features: string[]
    estimatedHours: number
    estimatedPrice: number
    number: number
}
