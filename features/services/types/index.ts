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
}

export type ServiceCategory = "frontend" | "backend" | "integrations" | "custom"

export type TabCardProps = {
    service: ServiceCategory
}

