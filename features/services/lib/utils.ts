import { ServiceItem } from "../types";

const frontendServices: ServiceItem[] = [
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
        title: "Figma Design & prototype",
        description: "Create a high-fidelity prototype of your project using Figma. This includes user research, wireframe creation, UI design, and interactive prototyping."
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
        title: "Scaffold Basic project",
        description: "Create a basic landing page for your project using Next.js/React. This includes project setup, basic landing page, and deployment configuration."
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
        title: "Responsive Design",
        description: "Create a responsive design for your project using CSS. This includes mobile-first design, tablet adaptation, desktop optimization, cross-browser testing, and performance optimization."
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
        title: "Extra pages",
        description: "Create additional pages for your project. This includes page structure design, content layout, navigation integration, SEO optimization, and testing and validation."
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
        title: "Email Marketing",
        description: "Create responsive email templates for your project. This includes email template design, HTML email coding, testing across clients, marketing automation setup, and analytics integration."
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
        title: "Accessibility & SEO",
        description: "Create a responsive design for your project using CSS. This includes mobile-first design, tablet adaptation, desktop optimization, cross-browser testing, and performance optimization."
    }
]

const backendServices: ServiceItem[] = [
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
        title: "NoSQL Integration",
        description: "Integrate a NoSQL database for your project. This includes database selection, schema design, connection setup, CRUD operations, indexing optimization, and testing."
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
        title: "SQL Integration",
        description: "Integrate a SQL database for your project. This includes database design, migration scripts, ORM setup, query optimization, backup strategy, and testing."
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
        title: "Websockets & Realtime",
        description: "Integrate a WebSocket server for your project. This includes WebSocket server setup, real-time events, room management, client integration, scaling considerations, and testing."
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
        title: "DAO/MVC Prototype",
        description: "Create a DAO/MVC prototype for your project. This includes architecture planning, data layer prototype, business logic design, controller structure, documentation, and testing."
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
        title: "CLI Application",
        description: "Create a CLI application for your project. This includes CLI framework setup, command implementation, configuration system, error handling, testing and packaging."
    }
]

const integrationsServices: ServiceItem[] = [
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
        title: "MercadoPago Integration",
        description: "Integrate MercadoPago for your project. This includes MercadoPago account setup, payment flow implementation, webhook handling, subscription management, security implementation, and testing."
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
        title: "Email Sending",
        description: "Integrate an email service for your project. This includes email service setup, template system, sending logic, queue management, and analytics tracking."
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
        title: "SMS & WhatsApp",
        description: "Integrate an SMS/WhatsApp service for your project. This includes SMS/WhatsApp service setup, message templates, sending implementation, webhook handling, contact management, and analytics tracking."
    },
    {
        id: "ai",
        nameKey: "ai",
        descriptionKey: "ai",
        basePrice: 1000,
        timeHours: 24,
        category: "integrations",
        details: [
            { task: "OpenAI (or similar) account setup", hours: 2, description: "Configure OpenAI account" },
            { task: "API key configuration", hours: 1, description: "Configure API key" },
            { task: "Integration with project", hours: 1, description: "Integrate OpenAI with your project" },
        ],
        deliverables: ["AI platform account", "API key", "Integration with project"],
        title: "AI Integration",
        description: "Integrate an AI platform for your project. This includes AI platform account setup, API key configuration, and integration with your project."
    }
]

const customFeaturesServices: ServiceItem[] = [

]

export {
    frontendServices,
    backendServices,
    integrationsServices,
    customFeaturesServices
}
