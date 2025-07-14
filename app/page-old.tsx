"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/features/ui/components/card"
import { Button } from "@/features/ui/components/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/features/ui/components/tabs"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/features/ui/components/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/ui/components/dialog"
import {
  ShoppingCart,
  Clock,
  DollarSign,
  Zap,
  Plus,
  Trash2,
  Calculator,
  Info,
  Download,
  Moon,
  Sun,
  Globe,
  Sparkles,
} from "lucide-react"
import jsPDF from "jspdf";
import "jspdf-autotable";
import { applyPlugin } from 'jspdf-autotable'

applyPlugin(jsPDF)

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF
  }
}


interface ServiceItem {
  id: string
  nameKey: string
  descriptionKey: string
  basePrice: number
  timeHours: number
  category: "frontend" | "backend" | "integrations"
  details: TaskDetail[]
  deliverables: string[]
}

interface CartItem extends ServiceItem {
  quantity: number
}

interface CustomFeature {
  id: string
  description: string
  estimatedPrice: number
  estimatedHours: number
  reasoning: string
}

interface Sprint {
  name: string;
  estimatedHours: number;
  estimatedPrice: number;
  description: string;
  features?: string[]; // Added for sprint distribution
}

type Language = "es" | "en"
type Theme = "light" | "dark"

const translations = {
  es: {
    title: "Calculadora de Presupuestos Web",
    subtitle: "Estima el costo de tu proyecto de desarrollo web",
    describeApp: "Describe tu aplicación",
    describeAppPlaceholder:
      "Ej: Necesito una tienda online con carrito de compras, pagos con tarjeta, gestión de inventario y panel de administración...",
    analyzeWithAI: "Analizar con IA",
    analyzing: "Analizando...",
    generateBudget: "Generar Presupuesto",
    availableServices: "Servicios Disponibles",
    frontend: "Frontend",
    backend: "Backend",
    integrations: "Integraciones",
    customFeatures: "Funcionalidades Personalizadas",
    customFeaturePlaceholder: "Ej: Sistema de chat en tiempo real con notificaciones push...",
    cart: "Carrito",
    projectConfig: "Configuración del Proyecto",
    contractType: "Tipo de Contratación",
    freelance: "Por Horas (Freelance)",
    modular: "Módulos Escalonados",
    package: "Proyecto Completo",
    phases: "Número de Fases",
    singlePhase: "Proyecto en una sola fase",
    multiplePhases: "Proyecto dividido en",
    budgetSummary: "Resumen del Presupuesto",
    subtotal: "Subtotal:",
    estimatedTime: "Tiempo estimado:",
    contractTypeLabel: "Tipo de contrato:",
    phasesLabel: "Fases",
    finalTotal: "Total Final:",
    workDays: "días laborales",
    exportPDF: "Exportar PDF",
    add: "Agregar",
    noServices: "No hay servicios seleccionados",
    taskBreakdown: "Desglose de Tareas:",
    deliverables: "Entregables:",
    totalHours: "horas total",
    discount: "desc.",
    noDiscount: "Sin desc.",
    surcharge: "Sin recargo",
    suggestedServices: "Servicios Sugeridos por IA",
    addSuggested: "Agregar Sugeridos",
    clearSuggestions: "Limpiar Sugerencias",
    sprints: "Sprints AI",
    generateSprints: "Generar Sprints",
    sprintsGenerated: "Sprints Generados:",
    sprintDescription: "Descripción:",
    sprintPlaceholder: "Descripción para el sprint...",
    sprintHours: "Horas Estimadas:",
    sprintPrice: "Precio Estimado:",
    sprintDescriptionPlaceholder: "Descripción para el precio...",
    sprintHoursPlaceholder: "Horas estimadas para el sprint...",
    sprintPricePlaceholder: "Precio estimado para el sprint...",
    sprintAdd: "Agregar Sprint",
    sprintRemove: "Eliminar Sprint",
    sprintTotal: "Total de Sprints:",
    sprintTotalHours: "Total de Horas de Sprints:",
    sprintTotalPrice: "Total de Precio de Sprints:",
    sprintTotalHoursLabel: "Total de Horas de Sprints:",
    sprintTotalPriceLabel: "Total de Precio de Sprints:",

    // Service names and descriptions
    services: {
      "figma-prototype": {
        name: "Diseño y Prototipo en Figma",
        description: "Diseño UI/UX en Figma con prototipo interactivo",
      },
      "scaffold-project": {
        name: "Proyecto Base Configurado",
        description: "Setup completo del proyecto con pipeline de deployment",
      },
      "responsive-design": {
        name: "Diseño Responsive",
        description: "Adaptación completa para móviles, tablets y desktop",
      },
      "extra-pages": {
        name: "2 Páginas Navegables Extra",
        description: "Páginas adicionales con navegación completa",
      },
      "email-marketing": {
        name: "Email Marketing y Maquetación",
        description: "Diseño y maquetación de emails responsivos",
      },
      "accessibility-seo": {
        name: "Accesibilidad y SEO",
        description: "Optimización para accesibilidad y motores de búsqueda",
      },
      "nosql-integration": {
        name: "Integración Base de Datos NoSQL",
        description: "Integración con MongoDB, Firebase o DynamoDB",
      },
      "sql-integration": {
        name: "Integración Base de Datos Relacional",
        description: "Integración con PostgreSQL, MySQL o SQLite",
      },
      "websockets-realtime": {
        name: "WebSockets y Tiempo Real",
        description: "Comunicación en tiempo real con Socket.io",
      },
      "dao-mvc-prototype": {
        name: "Prototipo Arquitectura DAO/MVC",
        description: "Diseño y prototipado de arquitectura de datos",
      },
      "cli-application": {
        name: "Aplicación CLI",
        description: "Herramienta de línea de comandos personalizada",
      },
      "mercadopago-integration": {
        name: "Integración MercadoPago",
        description: "Setup completo de MercadoPago con webhooks",
      },
      "email-sending": {
        name: "Envío de Emails",
        description: "Sistema de envío de emails transaccionales",
      },
      "sms-whatsapp": {
        name: "Mensajería SMS/WhatsApp",
        description: "Integración con servicios de mensajería",
      },
    },
  },
  en: {
    title: "Web Budget Calculator",
    subtitle: "Estimate the cost of your web development project",
    describeApp: "Describe your application",
    describeAppPlaceholder:
      "Ex: I need an online store with shopping cart, card payments, inventory management and admin panel...",
    analyzeWithAI: "Analyze with AI",
    analyzing: "Analyzing...",
    generateBudget: "Generate Budget",
    availableServices: "Available Services",
    frontend: "Frontend",
    backend: "Backend",
    integrations: "Integrations",
    customFeatures: "Custom Features",
    customFeaturePlaceholder: "Ex: Real-time chat system with push notifications...",
    cart: "Cart",
    projectConfig: "Project Configuration",
    contractType: "Contract Type",
    freelance: "Hourly (Freelance)",
    modular: "Modular Phases",
    package: "Complete Project",
    phases: "Number of Phases",
    singlePhase: "Single phase project",
    multiplePhases: "Project divided into",
    budgetSummary: "Budget Summary",
    subtotal: "Subtotal:",
    estimatedTime: "Estimated time:",
    contractTypeLabel: "Contract type:",
    phasesLabel: "Phases",
    finalTotal: "Final Total:",
    workDays: "work days",
    exportPDF: "Export PDF",
    add: "Add",
    noServices: "No services selected",
    taskBreakdown: "Task Breakdown:",
    deliverables: "Deliverables:",
    totalHours: "total hours",
    discount: "disc.",
    noDiscount: "No disc.",
    surcharge: "No surcharge",
    suggestedServices: "AI Suggested Services",
    addSuggested: "Add Suggested",
    clearSuggestions: "Clear Suggestions",
    sprints: "Sprints AI",
    generateSprints: "Generate Sprints",
    sprintsGenerated: "Sprints Generated:",
    sprintDescription: "Description:",
    sprintPlaceholder: "Description for the sprint...",
    sprintHours: "Estimated Hours:",
    sprintPrice: "Estimated Price:",
    sprintDescriptionPlaceholder: "Description for the price...",
    sprintHoursPlaceholder: "Estimated hours for the sprint...",
    sprintPricePlaceholder: "Estimated price for the sprint...",
    sprintAdd: "Add Sprint",
    sprintRemove: "Remove Sprint",
    sprintTotal: "Total Sprints:",
    sprintTotalHours: "Total Sprint Hours:",
    sprintTotalPrice: "Total Sprint Price:",
    sprintTotalHoursLabel: "Total Sprint Hours:",
    sprintTotalPriceLabel: "Total Sprint Price:",

    // Service names and descriptions
    services: {
      "figma-prototype": {
        name: "Figma Design & Prototype",
        description: "UI/UX design in Figma with interactive prototype",
      },
      "scaffold-project": {
        name: "Scaffold Basic Project",
        description: "Complete project setup with deployment pipeline",
      },
      "responsive-design": {
        name: "Responsive Design",
        description: "Complete adaptation for mobile, tablet and desktop",
      },
      "extra-pages": {
        name: "2 Extra Navigable Pages",
        description: "Additional pages with complete navigation",
      },
      "email-marketing": {
        name: "Email Marketing & Layout",
        description: "Design and layout of responsive emails",
      },
      "accessibility-seo": {
        name: "Accessibility & SEO",
        description: "Optimization for accessibility and search engines",
      },
      "nosql-integration": {
        name: "NoSQL Database Integration",
        description: "Integration with MongoDB, Firebase or DynamoDB",
      },
      "sql-integration": {
        name: "Relational Database Integration",
        description: "Integration with PostgreSQL, MySQL or SQLite",
      },
      "websockets-realtime": {
        name: "WebSockets & Real-time",
        description: "Real-time communication with Socket.io",
      },
      "dao-mvc-prototype": {
        name: "DAO/MVC Architecture Prototype",
        description: "Data architecture design and prototyping",
      },
      "cli-application": {
        name: "CLI Application",
        description: "Custom command-line interface tool",
      },
      "mercadopago-integration": {
        name: "MercadoPago Integration",
        description: "Complete MercadoPago setup with webhooks",
      },
      "email-sending": {
        name: "Email Sending",
        description: "Transactional email sending system",
      },
      "sms-whatsapp": {
        name: "SMS/WhatsApp Messaging",
        description: "Integration with messaging services",
      },
    },
  },
}

const services: ServiceItem[] = [
  // Frontend Services
  {
    id: "figma-prototype",
    nameKey: "figma-prototype",
    descriptionKey: "figma-prototype",
    basePrice: 450,
    timeHours: 12,
    category: "frontend",
    details: [
      { task: "User research and requirements", hours: 2, description: "Analyze user needs and project requirements" },
      { task: "Wireframe creation", hours: 3, description: "Create low-fidelity wireframes" },
      { task: "UI design in Figma", hours: 5, description: "Design high-fidelity mockups" },
      { task: "Interactive prototype", hours: 2, description: "Create clickable prototype" },
    ],
    deliverables: ["Figma design file", "Interactive prototype", "Design specifications", "Asset exports"],
  },
  {
    id: "scaffold-project",
    nameKey: "scaffold-project",
    descriptionKey: "scaffold-project",
    basePrice: 600,
    timeHours: 15,
    category: "frontend",
    details: [
      { task: "Project initialization", hours: 2, description: "Setup Next.js/React project structure" },
      { task: "Git repository setup", hours: 1, description: "Initialize Git and create repository" },
      { task: "Basic landing page", hours: 6, description: "Create responsive landing page template" },
      { task: "Deployment configuration", hours: 3, description: "Setup Vercel/Netlify deployment" },
      { task: "Development environment", hours: 2, description: "Configure dev tools and scripts" },
      { task: "Documentation", hours: 1, description: "Create README and setup instructions" },
    ],
    deliverables: [
      "Complete project structure",
      "Deployed landing page",
      "Git repository",
      "Documentation",
      "CI/CD pipeline",
    ],
  },
  {
    id: "responsive-design",
    nameKey: "responsive-design",
    descriptionKey: "responsive-design",
    basePrice: 200,
    timeHours: 18,
    category: "frontend",
    details: [
      { task: "Mobile-first design", hours: 6, description: "Design optimized for mobile devices" },
      { task: "Tablet adaptation", hours: 4, description: "Adapt design for tablet screens" },
      { task: "Desktop optimization", hours: 4, description: "Optimize for desktop displays" },
      { task: "Cross-browser testing", hours: 3, description: "Test across different browsers" },
      { task: "Performance optimization", hours: 1, description: "Optimize loading and performance" },
    ],
    deliverables: ["Responsive CSS", "Media queries", "Cross-browser compatibility", "Performance report"],
  },
  {
    id: "extra-pages",
    nameKey: "extra-pages",
    descriptionKey: "extra-pages",
    basePrice: 200,
    timeHours: 20,
    category: "frontend",
    details: [
      { task: "Page structure design", hours: 4, description: "Design structure for additional pages" },
      { task: "Content layout", hours: 6, description: "Create layouts for different content types" },
      { task: "Navigation integration", hours: 4, description: "Integrate with main navigation" },
      { task: "SEO optimization", hours: 3, description: "Optimize pages for search engines" },
      { task: "Testing and validation", hours: 3, description: "Test functionality and validate code" },
    ],
    deliverables: ["2 additional pages", "Navigation system", "SEO optimization", "Content management"],
  },
  {
    id: "email-marketing",
    nameKey: "email-marketing",
    descriptionKey: "email-marketing",
    basePrice: 700,
    timeHours: 22,
    category: "frontend",
    details: [
      { task: "Email template design", hours: 8, description: "Design responsive email templates" },
      { task: "HTML email coding", hours: 6, description: "Code emails for maximum compatibility" },
      { task: "Testing across clients", hours: 4, description: "Test in different email clients" },
      { task: "Marketing automation setup", hours: 3, description: "Setup automated email sequences" },
      { task: "Analytics integration", hours: 1, description: "Integrate tracking and analytics" },
    ],
    deliverables: ["Email templates", "HTML email code", "Marketing automation", "Analytics setup"],
  },
  {
    id: "accessibility-seo",
    nameKey: "accessibility-seo",
    descriptionKey: "accessibility-seo",
    basePrice: 550,
    timeHours: 16,
    category: "frontend",
    details: [
      { task: "Accessibility audit", hours: 3, description: "Audit current accessibility compliance" },
      { task: "WCAG implementation", hours: 6, description: "Implement WCAG 2.1 guidelines" },
      { task: "SEO optimization", hours: 4, description: "Optimize for search engines" },
      { task: "Schema markup", hours: 2, description: "Add structured data markup" },
      { task: "Performance optimization", hours: 1, description: "Optimize loading speed" },
    ],
    deliverables: ["Accessibility compliance", "SEO optimization", "Schema markup", "Performance report"],
  },

  // Backend Services
  {
    id: "nosql-integration",
    nameKey: "nosql-integration",
    descriptionKey: "nosql-integration",
    basePrice: 600,
    timeHours: 18,
    category: "backend",
    details: [
      { task: "Database selection", hours: 2, description: "Choose optimal NoSQL solution" },
      { task: "Schema design", hours: 4, description: "Design document structure" },
      { task: "Connection setup", hours: 3, description: "Configure database connection" },
      { task: "CRUD operations", hours: 6, description: "Implement create, read, update, delete" },
      { task: "Indexing optimization", hours: 2, description: "Optimize queries and indexes" },
      { task: "Testing", hours: 1, description: "Test database operations" },
    ],
    deliverables: [
      "Database setup",
      "Schema documentation",
      "CRUD API endpoints",
      "Connection utilities",
      "Performance optimization",
    ],
  },
  {
    id: "sql-integration",
    nameKey: "sql-integration",
    descriptionKey: "sql-integration",
    basePrice: 700,
    timeHours: 20,
    category: "backend",
    details: [
      { task: "Database design", hours: 5, description: "Design relational schema" },
      { task: "Migration scripts", hours: 3, description: "Create database migrations" },
      { task: "ORM setup", hours: 4, description: "Configure Prisma/TypeORM" },
      { task: "Query optimization", hours: 4, description: "Optimize database queries" },
      { task: "Backup strategy", hours: 2, description: "Setup backup and recovery" },
      { task: "Testing", hours: 2, description: "Test database operations" },
    ],
    deliverables: ["Database schema", "Migration files", "ORM configuration", "Query utilities", "Backup system"],
  },
  {
    id: "websockets-realtime",
    nameKey: "websockets-realtime",
    descriptionKey: "websockets-realtime",
    basePrice: 1200,
    timeHours: 30,
    category: "backend",
    details: [
      { task: "WebSocket server setup", hours: 6, description: "Configure WebSocket server" },
      { task: "Real-time events", hours: 8, description: "Implement event handling" },
      { task: "Room management", hours: 6, description: "Create room/channel system" },
      { task: "Client integration", hours: 6, description: "Integrate with frontend" },
      { task: "Scaling considerations", hours: 2, description: "Plan for horizontal scaling" },
      { task: "Testing", hours: 2, description: "Test real-time functionality" },
    ],
    deliverables: ["WebSocket server", "Event system", "Room management", "Client SDK", "Scaling documentation"],
  },
  {
    id: "dao-mvc-prototype",
    nameKey: "dao-mvc-prototype",
    descriptionKey: "dao-mvc-prototype",
    basePrice: 800,
    timeHours: 24,
    category: "backend",
    details: [
      { task: "Architecture planning", hours: 6, description: "Plan DAO/MVC structure" },
      { task: "Data layer prototype", hours: 8, description: "Create data access layer prototype" },
      { task: "Business logic design", hours: 4, description: "Design business logic layer" },
      { task: "Controller structure", hours: 4, description: "Define controller architecture" },
      { task: "Documentation", hours: 2, description: "Document architecture decisions" },
    ],
    deliverables: ["Architecture prototype", "DAO pattern implementation", "MVC structure", "Documentation"],
  },
  {
    id: "cli-application",
    nameKey: "cli-application",
    descriptionKey: "cli-application",
    basePrice: 900,
    timeHours: 25,
    category: "backend",
    details: [
      { task: "CLI framework setup", hours: 4, description: "Setup CLI framework and structure" },
      { task: "Command implementation", hours: 10, description: "Implement core commands" },
      { task: "Configuration system", hours: 4, description: "Create configuration management" },
      { task: "Error handling", hours: 3, description: "Implement comprehensive error handling" },
      { task: "Testing and packaging", hours: 4, description: "Test and package for distribution" },
    ],
    deliverables: ["CLI application", "Command documentation", "Configuration system", "Distribution package"],
  },

  // Integration Services
  {
    id: "mercadopago-integration",
    nameKey: "mercadopago-integration",
    descriptionKey: "mercadopago-integration",
    basePrice: 950,
    timeHours: 24,
    category: "integrations",
    details: [
      { task: "MercadoPago account setup", hours: 2, description: "Configure MercadoPago account" },
      { task: "Payment flow implementation", hours: 8, description: "Implement payment processing" },
      { task: "Webhook handling", hours: 6, description: "Setup webhook endpoints" },
      { task: "Subscription management", hours: 4, description: "Implement subscription handling" },
      { task: "Security implementation", hours: 3, description: "Implement security best practices" },
      { task: "Testing", hours: 1, description: "Test payment flows" },
    ],
    deliverables: [
      "Payment system",
      "Webhook handlers",
      "Subscription management",
      "Security implementation",
      "Test transactions",
    ],
  },
  {
    id: "email-sending",
    nameKey: "email-sending",
    descriptionKey: "email-sending",
    basePrice: 600,
    timeHours: 18,
    category: "integrations",
    details: [
      { task: "Email service setup", hours: 3, description: "Configure email service provider" },
      { task: "Template system", hours: 6, description: "Create email template system" },
      { task: "Sending logic", hours: 4, description: "Implement email sending logic" },
      { task: "Queue management", hours: 3, description: "Setup email queue system" },
      { task: "Analytics tracking", hours: 2, description: "Implement email analytics" },
    ],
    deliverables: ["Email service", "Template system", "Queue management", "Analytics dashboard"],
  },
  {
    id: "sms-whatsapp",
    nameKey: "sms-whatsapp",
    descriptionKey: "sms-whatsapp",
    basePrice: 800,
    timeHours: 22,
    category: "integrations",
    details: [
      { task: "Service provider setup", hours: 3, description: "Configure SMS/WhatsApp providers" },
      { task: "Message templates", hours: 5, description: "Create message templates" },
      { task: "Sending implementation", hours: 6, description: "Implement message sending" },
      { task: "Webhook handling", hours: 4, description: "Handle incoming messages" },
      { task: "Contact management", hours: 3, description: "Implement contact management" },
      { task: "Analytics", hours: 1, description: "Setup message analytics" },
    ],
    deliverables: ["Messaging system", "Template management", "Contact system", "Analytics tracking"],
  },
]

type ContractType = "freelance" | "modular" | "package"

export default function BudgetCalculator() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [phases, setPhases] = useState([50])
  const [contractType, setContractType] = useState<ContractType>("package")
  const [customFeatures, setCustomFeatures] = useState<CustomFeature[]>([])
  const [customInput, setCustomInput] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [theme, setTheme] = useState<Theme>("light")
  const [language, setLanguage] = useState<Language>("es")
  const [appDescription, setAppDescription] = useState("")
  const [suggestedServices, setSuggestedServices] = useState<ServiceItem[]>([])
  const [isAnalyzingApp, setIsAnalyzingApp] = useState(false)
  const [sprints, setSprints] = useState<Sprint[]>([])
  const [sprintDescription, setSprintDescription] = useState<string>("")
  const [isAnalyzingSprints, setIsAnalyzingSprints] = useState(false)

  const t = translations[language]

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  const getServiceName = (service: ServiceItem) => {
    return t.services[service.nameKey as keyof typeof t.services]?.name || service.nameKey
  }

  const getServiceDescription = (service: ServiceItem) => {
    return t.services[service.descriptionKey as keyof typeof t.services]?.description || service.descriptionKey
  }

  const addToCart = (service: ServiceItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === service.id)
      if (existing) {
        return prev.map((item) => (item.id === service.id ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prev, { ...service, quantity: 1 }]
    })
  }

  const removeFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id)
      return
    }
    setCart((prev) => prev.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const analyzeAppDescription = async () => {
    if (!appDescription.trim()) return
    setIsAnalyzingApp(true)
    try {
      const res = await fetch("/api/analyze-app", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: appDescription, language }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        alert(error ?? "Error al analizar la aplicación.")
        return
      }

      const { suggestedServiceIds } = await res.json()
      console.log("🚀 ~ analyzeAppDescription ~ suggestedServiceIds:", suggestedServiceIds)
      const suggested = services.filter((service) => suggestedServiceIds.includes(service.id))
      setSuggestedServices(suggested)
    } catch (error) {
      console.error("Error analyzing app:", error)
      alert("No se pudo conectar con el servicio de IA.")
    } finally {
      setIsAnalyzingApp(false)
    }
  }

  const addSuggestedServices = () => {
    suggestedServices.forEach((service) => {
      addToCart(service)
    })
    setSuggestedServices([])
  }

  const analyzeCustomFeature = async () => {
    if (!customInput.trim()) return
    setIsAnalyzing(true)
    try {
      const res = await fetch("/api/analyze-feature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: customInput, language }),
      })

      if (!res.ok) {
        const { error } = await res.json()
        alert(error ?? "Error al analizar la funcionalidad.")
        return
      }

      const { estimatedPrice, estimatedHours, reasoning } = await res.json()

      const newFeature: CustomFeature = {
        id: Date.now().toString(),
        description: customInput,
        estimatedPrice,
        estimatedHours,
        reasoning,
      }

      setCustomFeatures((prev) => [...prev, newFeature])
      setCustomInput("")
    } catch (error) {
      console.error("Error analyzing feature:", error)
      alert("No se pudo conectar con el servicio de IA.")
    } finally {
      setIsAnalyzing(false)
    }
  }

  const removeCustomFeature = (id: string) => {
    setCustomFeatures((prev) => prev.filter((f) => f.id !== id))
  }

  const calculateTotals = () => {
    const cartTotal = cart.reduce((sum, item) => sum + item.basePrice * item.quantity, 0)
    const cartHours = cart.reduce((sum, item) => sum + item.timeHours * item.quantity, 0)

    const customTotal = customFeatures.reduce((sum, feature) => sum + feature.estimatedPrice, 0)
    const customHours = customFeatures.reduce((sum, feature) => sum + feature.estimatedHours, 0)

    const baseTotal = cartTotal + customTotal
    const totalHours = cartHours + customHours

    let priceMultiplier = 1
    switch (contractType) {
      case "freelance":
        priceMultiplier = 1.1 // más caro
        break
      case "modular":
        priceMultiplier = 1 // medio
        break
      case "package":
        priceMultiplier = 0.9 // más barato
        break
    }

    // Ajuste por fases: solo si > 6 fases
    let phaseMultiplier = 1
    if (phases.length > 6) {
      phaseMultiplier = 1 + (phases.length - 6) * 0.1
    }
    const finalPrice = baseTotal * priceMultiplier * phaseMultiplier

    return {
      baseTotal,
      finalPrice,
      totalHours,
      priceMultiplier,
      phaseMultiplier,
    }
  }

  const exportToPDF = async () => {
    const totals = calculateTotals();
    try {
      const doc = new jsPDF();
      console.log("🚀 ~ exportToPDF ~ doc:", doc)
      const primaryColor = [59, 130, 246] as [number, number, number];
      const secondaryColor = [107, 114, 128] as [number, number, number];
      const accentColor = [16, 185, 129] as [number, number, number];
      const isSpanish = language === "es";
      // Header
      doc.setFillColor(...primaryColor);
      doc.rect(0, 0, 210, 40, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text(isSpanish ? "PRESUPUESTO DE DESARROLLO WEB" : "WEB DEVELOPMENT BUDGET", 20, 25);
      doc.setFontSize(12);
      doc.setFont("helvetica", "normal");
      doc.text(
        `${isSpanish ? "Fecha" : "Date"}: ${new Date().toLocaleDateString(isSpanish ? "es-ES" : "en-US")}`,
        150,
        32,
      );
      // Developer Info
      doc.setFontSize(10);
      doc.text("Horacio Gutierrez", 20, 32);
      doc.text("horacio.estevez@gmail.com", 20, 36);
      doc.setTextColor(0, 0, 0);
      let yPosition = 60;
      // Project Information
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(isSpanish ? "INFORMACIÓN DEL PROYECTO" : "PROJECT INFORMATION", 20, yPosition);
      yPosition += 15;
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      const contractTypeLabels = isSpanish
        ? {
          freelance: "Por Horas (Freelance) - 20% descuento",
          modular: "Módulos Escalonados - 10% descuento",
          package: "Proyecto Completo - Precio estándar",
        }
        : {
          freelance: "Hourly (Freelance) - 20% discount",
          modular: "Modular Phases - 10% discount",
          package: "Complete Project - Standard price",
        };
      doc.text(
        `${isSpanish ? "Tipo de Contratación" : "Contract Type"}: ${contractTypeLabels[contractType as keyof typeof contractTypeLabels]}`,
        20,
        yPosition,
      );
      yPosition += 8;
      doc.text(`${isSpanish ? "Número de Fases" : "Number of Phases"}: ${phases.length}`, 20, yPosition);
      yPosition += 8;
      doc.text(
        `${isSpanish ? "Tiempo Total Estimado" : "Total Estimated Time"}: ${totals.totalHours} ${isSpanish ? "horas" : "hours"} (${Math.ceil(totals.totalHours / 8)} ${isSpanish ? "días laborales" : "work days"})`,
        20,
        yPosition,
      );
      yPosition += 20;
      // Services Table
      if (cart.length > 0) {
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text(isSpanish ? "SERVICIOS SELECCIONADOS" : "SELECTED SERVICES", 20, yPosition);
        yPosition += 10;
        const tableData = cart.map((item) => [
          getServiceName(item),
          item.quantity.toString(),
          `$${item.basePrice.toLocaleString()}`,
          `${item.timeHours}h`,
          `$${(item.basePrice * item.quantity).toLocaleString()}`,
        ]);
        const headers = isSpanish
          ? ["Servicio", "Cant.", "Precio Unit.", "Tiempo", "Subtotal"]
          : ["Service", "Qty.", "Unit Price", "Time", "Subtotal"];
        doc.autoTable({
          startY: yPosition,
          head: [headers],
          body: tableData,
          theme: "grid",
          headStyles: {
            fillColor: primaryColor,
            textColor: [255, 255, 255],
            fontStyle: "bold",
            fontSize: 10,
          },
          bodyStyles: {
            fontSize: 9,
            textColor: [0, 0, 0],
          },
          alternateRowStyles: {
            fillColor: [248, 250, 252],
          },
          columnStyles: {
            0: { cellWidth: 70 },
            1: { cellWidth: 20, halign: "center" },
            2: { cellWidth: 30, halign: "right" },
            3: { cellWidth: 25, halign: "center" },
            4: { cellWidth: 35, halign: "right" },
          },
          margin: { left: 20, right: 20 },
        });
        yPosition = (doc as any).lastAutoTable.finalY + 15;
      }
      // Custom Features Table
      if (customFeatures.length > 0) {
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 30;
        }
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text(isSpanish ? "FUNCIONALIDADES PERSONALIZADAS" : "CUSTOM FEATURES", 20, yPosition);
        yPosition += 10;
        const customTableData = customFeatures.map((feature) => [
          feature.description,
          `${feature.estimatedHours}h`,
          `$${feature.estimatedPrice.toLocaleString()}`,
        ]);
        const customHeaders = isSpanish ? ["Descripción", "Tiempo", "Precio"] : ["Description", "Time", "Price"];
        doc.autoTable({
          startY: yPosition,
          head: [customHeaders],
          body: customTableData,
          theme: "grid",
          headStyles: {
            fillColor: primaryColor,
            textColor: [255, 255, 255],
            fontStyle: "bold",
            fontSize: 10,
          },
          bodyStyles: {
            fontSize: 9,
            textColor: [0, 0, 0],
          },
          alternateRowStyles: {
            fillColor: [248, 250, 252],
          },
          columnStyles: {
            0: { cellWidth: 120 },
            1: { cellWidth: 25, halign: "center" },
            2: { cellWidth: 35, halign: "right" },
          },
          margin: { left: 20, right: 20 },
        });
        yPosition = (doc as any).lastAutoTable.finalY + 15;
      }
      // Sprints Distribution
      if (sprints.length > 0) {
        if (yPosition > 220) {
          doc.addPage();
          yPosition = 30;
        }
        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text(isSpanish ? "DISTRIBUCIÓN DE SPRINTS" : "SPRINT DISTRIBUTION", 20, yPosition);
        yPosition += 10;
        sprints.forEach((sprint, idx) => {
          if (yPosition > 270) {
            doc.addPage();
            yPosition = 30;
          }
          doc.setFontSize(12);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(...primaryColor);
          doc.text(`${isSpanish ? "Sprint" : "Sprint"} ${idx + 1}: ${sprint.name}`, 20, yPosition);
          yPosition += 7;
          doc.setFontSize(10);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(0, 0, 0);
          doc.text(sprint.description, 22, yPosition, { maxWidth: 170 });
          yPosition += 6;
          doc.text(
            `${isSpanish ? "Horas estimadas" : "Estimated hours"}: ${sprint.estimatedHours}`,
            22,
            yPosition,
          );
          yPosition += 6;
          doc.text(
            `${isSpanish ? "Funcionalidades" : "Features"}: ${sprint.features?.join(", ")}`,
            22,
            yPosition,
            { maxWidth: 170 },
          );
          yPosition += 10;
        });
        if (sprintDescription) {
          doc.setFontSize(10);
          doc.setFont("helvetica", "italic");
          doc.setTextColor(...secondaryColor);
          doc.text(
            `${isSpanish ? "Razonamiento de la distribución de sprints" : "Sprint distribution reasoning"}: ${sprintDescription}`,
            20,
            yPosition,
            { maxWidth: 170 },
          );
          yPosition += 10;
        }
      }
      // Cost Summary
      if (yPosition > 220) {
        doc.addPage();
        yPosition = 30;
      }
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(isSpanish ? "RESUMEN DE COSTOS" : "COST SUMMARY", 20, yPosition);
      yPosition += 15;
      const summaryLabels = isSpanish
        ? {
          subtotal: "Subtotal de Servicios",
          contractAdjustment: "Ajuste por Tipo de Contrato",
          phaseAdjustment: "Ajuste por Fases",
          finalTotal: "TOTAL FINAL",
          noDiscount: "Sin descuento",
          noSurcharge: "Sin recargo",
        }
        : {
          subtotal: "Services Subtotal",
          contractAdjustment: "Contract Type Adjustment",
          phaseAdjustment: "Phase Adjustment",
          finalTotal: "FINAL TOTAL",
          noDiscount: "No discount",
          noSurcharge: "No surcharge",
        };
      const summaryData = [
        [summaryLabels.subtotal, `$${totals.baseTotal.toLocaleString()}`],
        [
          summaryLabels.contractAdjustment,
          totals.priceMultiplier < 1 ? `-${((1 - totals.priceMultiplier) * 100).toFixed(0)}%` : summaryLabels.noDiscount,
        ],
        [
          summaryLabels.phaseAdjustment,
          totals.phaseMultiplier > 1 ? `+${((totals.phaseMultiplier - 1) * 100).toFixed(0)}%` : summaryLabels.noSurcharge,
        ],
        ["", ""],
        [summaryLabels.finalTotal, `$${totals.finalPrice.toLocaleString()}`],
      ];
      doc.autoTable({
        startY: yPosition,
        body: summaryData,
        theme: "plain",
        bodyStyles: {
          fontSize: 11,
          textColor: [0, 0, 0],
        },
        columnStyles: {
          0: { cellWidth: 120, fontStyle: "normal" },
          1: { cellWidth: 50, halign: "right", fontStyle: "normal" },
        },
        didParseCell: (data: any) => {
          if (data.row.index === 4) {
            data.cell.styles.fillColor = accentColor;
            data.cell.styles.textColor = [255, 255, 255];
            data.cell.styles.fontStyle = "bold";
            data.cell.styles.fontSize = 14;
          }
          if (data.row.index === 3) {
            data.cell.styles.minCellHeight = 5;
          }
        },
        margin: { left: 20, right: 20 },
      });
      yPosition = (doc as any).lastAutoTable.finalY + 20;
      // Terms and Conditions
      if (yPosition > 220) {
        doc.addPage();
        yPosition = 30;
      }
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(isSpanish ? "TÉRMINOS Y CONDICIONES" : "TERMS AND CONDITIONS", 20, yPosition);
      yPosition += 15;
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...secondaryColor);
      const terms = isSpanish
        ? [
          "• Este presupuesto tiene una validez de 30 días desde la fecha de emisión.",
          "• Los precios están expresados en dólares estadounidenses (USD).",
          "• El tiempo estimado puede variar según la complejidad y cambios en los requerimientos.",
          "• Se requiere un anticipo del 50% para iniciar el proyecto.",
          "• Los pagos se realizarán según las fases acordadas del proyecto.",
          "• Cualquier funcionalidad adicional será cotizada por separado.",
          "• El cliente debe proporcionar todo el contenido necesario (textos, imágenes, etc.).",
          "• Se incluyen 2 rondas de revisiones por cada entregable.",
          "• El mantenimiento y hosting no están incluidos en este presupuesto.",
          "• Los derechos de autor se transfieren al cliente una vez completado el pago.",
          "• El precio solo aumenta si el proyecto se divide en más de 6 fases, debido a la duración extendida.",
        ]
        : [
          "• This budget is valid for 30 days from the date of issue.",
          "• Prices are expressed in US dollars (USD).",
          "• Estimated time may vary based on complexity and requirement changes.",
          "• A 50% advance payment is required to start the project.",
          "• Payments will be made according to the agreed project phases.",
          "• Any additional functionality will be quoted separately.",
          "• The client must provide all necessary content (texts, images, etc.).",
          "• 2 rounds of revisions are included for each deliverable.",
          "• Maintenance and hosting are not included in this budget.",
          "• Copyright is transferred to the client once payment is completed.",
          "• Price increases only if the project is split into more than 6 phases, due to extended duration.",
        ];
      terms.forEach((term, index) => {
        if (yPosition > 270) {
          doc.addPage();
          yPosition = 30;
        }
        doc.text(term, 20, yPosition, { maxWidth: 170 });
        yPosition += 8;
      });
      // Footer
      const pageCount = doc.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(...secondaryColor);
        doc.text(`${isSpanish ? "Página" : "Page"} ${i} ${isSpanish ? "de" : "of"} ${pageCount}`, 20, 285);
        doc.text(
          isSpanish ? "Generado por Calculadora de Presupuestos Web" : "Generated by Web Budget Calculator",
          105,
          285,
          { align: "center" },
        );
        doc.text(new Date().toLocaleString(isSpanish ? "es-ES" : "en-US"), 190, 285, { align: "right" });
      }
      doc.save(`presupuesto-web-${new Date().toISOString().split("T")[0]}.pdf`);
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Error al exportar el PDF");
    }
  };

  const totals = calculateTotals()
  const getCategoryServices = (category: string) => services.filter((service) => service.category === category)

  const renderServiceCard = (service: ServiceItem) => (
    <Card key={service.id} className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg clamp-1">{getServiceName(service)}</CardTitle>
            <CardDescription className="text-sm">{getServiceDescription(service)}</CardDescription>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="ml-2">
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{getServiceName(service)}</DialogTitle>
                <DialogDescription>{getServiceDescription(service)}</DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-3">{t.taskBreakdown}</h4>
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
                  <h4 className="font-semibold mb-3">{t.deliverables}</h4>
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
                      {service.timeHours} {t.totalHours}
                    </span>
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span className="font-semibold">${service.basePrice}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="text-sm">{service.timeHours}h</span>
          </div>
        </div>
        <Button onClick={() => addToCart(service)} className="w-full" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          {t.add}
        </Button>
      </CardContent>
    </Card>
  )

  // Sprint AI generation handler
  const analyzeSprints = async () => {
    setIsAnalyzingSprints(true)
    setSprints([])
    setSprintDescription("")
    try {
      // Features: names of selected services + custom features
      const features = [
        ...cart.map((item) => getServiceName(item)),
        ...customFeatures.map((f) => f.description),
      ]
      const res = await fetch("/api/analyze-sprints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features, phases: phases.length, language }),
      })
      if (!res.ok) {
        const { error } = await res.json()
        alert(error ?? "Error al generar los sprints.")
        return
      }
      const { sprints: aiSprints, reasoning } = await res.json()
      setSprints(aiSprints)
      setSprintDescription(reasoning)
    } catch (error) {
      console.error("Error analyzing sprints:", error)
      alert("No se pudo conectar con el servicio de IA para sprints.")
    } finally {
      setIsAnalyzingSprints(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4 transition-colors">
      <div className="max-w-7xl mx-auto">

        {/* App Description Input */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              {t.describeApp}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              placeholder={t.describeAppPlaceholder}
              value={appDescription}
              onChange={(e) => setAppDescription(e.target.value)}
              className="min-h-[100px]"
            />
            <Button
              onClick={analyzeAppDescription}
              disabled={!appDescription.trim() || isAnalyzingApp}
              className="w-full"
            >
              {isAnalyzingApp ? t.analyzing : t.analyzeWithAI}
            </Button>

            {suggestedServices.length > 0 && (
              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h4 className="font-medium mb-3">{t.suggestedServices}:</h4>
                <div className="space-y-2 mb-4">
                  {suggestedServices.map((service) => (
                    <div
                      key={service.id}
                      className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded"
                    >
                      <span className="text-sm">{getServiceName(service)}</span>
                      <span className="text-sm font-medium">${service.basePrice}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button onClick={addSuggestedServices} className="flex-1">
                    {t.addSuggested}
                  </Button>
                  <Button variant="outline" onClick={() => setSuggestedServices([])} className="flex-1">
                    {t.clearSuggestions}
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Servicios */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 clamp-1">
                  <Zap className="h-5 w-5" />
                  {t.availableServices}
                </CardTitle>
              </CardHeader>
              <CardContent>

                {/* Sprints AI Section */}
                <div className="mt-8">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Sparkles className="h-5 w-5" /> {t.sprints}
                  </h3>
                  <Button onClick={analyzeSprints} disabled={isAnalyzingSprints} className="mb-4">
                    {isAnalyzingSprints ? t.analyzing : t.generateSprints}
                  </Button>
                  {sprints.length > 0 && (
                    <div className="space-y-4">
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        <span className="font-medium">{t.sprintsGenerated}</span>
                        <ul className="list-decimal list-inside mt-2 space-y-2">
                          {sprints.map((sprint, idx) => (
                            <li key={idx} className="bg-blue-50 dark:bg-blue-900/20 rounded p-3">
                              <div className="font-semibold text-blue-700 dark:text-blue-300">{sprint.name}</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">{sprint.description}</div>
                              <div className="text-xs mb-1">
                                <span className="font-medium">{t.sprintHours}</span> {sprint.estimatedHours}
                              </div>
                              <div className="text-xs">
                                <span className="font-medium">Features:</span> {sprint.features?.join(", ")}
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                      {sprintDescription && (
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                          <span className="font-medium">{t.sprintDescription}</span> {sprintDescription}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Carrito y Configuración */}
          <div className="space-y-6">
            {/* Carrito */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  {t.cart} ({cart.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-4">{t.noServices}</p>
                ) : (
                  <div className="space-y-3">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{getServiceName(item)}</h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400">
                            ${item.basePrice} × {item.quantity}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                            className="w-16 h-8"
                          />
                          <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Configuración del Proyecto */}
            <Card>
              <CardHeader>
                <CardTitle>{t.projectConfig}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label>{t.contractType}</Label>
                  <Select value={contractType} onValueChange={(value: ContractType) => setContractType(value)}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="freelance">{t.freelance}</SelectItem>
                      <SelectItem value="modular">{t.modular}</SelectItem>
                      <SelectItem value="package">{t.package}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>
                    {t.phases}: {phases.length}
                  </Label>
                  <Slider
                    value={[phases.length]}
                    onValueChange={(value) =>
                      setPhases(
                        Array(value[0])
                          .fill(0)
                          .map((_, i) => 100 / value[0]),
                      )
                    }
                    max={10}
                    min={1}
                    step={1}
                    className="mt-2"
                  />
                  <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {phases.length === 1 ? t.singlePhase : `${t.multiplePhases} ${phases.length} fases`}
                  </div>
                  <div className="mt-1 text-xs text-blue-600 dark:text-blue-300">
                    {language === "es"
                      ? "Nota: El precio solo aumenta si el proyecto se divide en más de 6 fases, debido a la duración extendida."
                      : "Note: Price increases only if the project is split into more than 6 phases, due to extended duration."}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resumen Final */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  {t.budgetSummary}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>{t.subtotal}</span>
                    <span>${totals.baseTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.estimatedTime}</span>
                    <span>{totals.totalHours}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t.contractTypeLabel}</span>
                    <span>
                      {totals.priceMultiplier < 1
                        ? `${((1 - totals.priceMultiplier) * 100).toFixed(0)}% ${t.discount}`
                        : t.noDiscount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>
                      {t.phasesLabel} ({phases.length}):
                    </span>
                    <span>
                      {totals.phaseMultiplier > 1
                        ? `+${((totals.phaseMultiplier - 1) * 100).toFixed(0)}%`
                        : t.surcharge}
                    </span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between items-center text-lg font-bold">
                  <span>{t.finalTotal}</span>
                  <span className="text-green-600">${totals.finalPrice.toLocaleString()}</span>
                </div>

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  {t.estimatedTime}: {Math.ceil(totals.totalHours / 8)} {t.workDays}
                </div>

                <Button onClick={exportToPDF} className="w-full mt-4 bg-transparent" variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  {t.exportPDF}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
