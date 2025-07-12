import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

export async function POST(req: NextRequest) {
  const { description, language } = await req.json()

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json({ error: "Falta la variable OPENAI_API_KEY en el entorno del servidor." }, { status: 500 })
  }

  try {
    const prompt =
      language === "en"
        ? `Analyze this web application description and suggest relevant services from the following list:

Available services:
- figma-prototype: UI/UX design in Figma with interactive prototype
- scaffold-project: Complete project setup with deployment pipeline
- responsive-design: Complete adaptation for mobile, tablet and desktop
- extra-pages: 2 additional navigable pages
- email-marketing: Design and layout of responsive emails
- accessibility-seo: Optimization for accessibility and search engines
- nosql-integration: Integration with MongoDB, Firebase or DynamoDB
- sql-integration: Integration with PostgreSQL, MySQL or SQLite
- websockets-realtime: Real-time communication with Socket.io
- dao-mvc-prototype: Data architecture design and prototyping
- cli-application: Custom command-line interface tool
- mercadopago-integration: Complete MercadoPago setup with webhooks
- email-sending: Transactional email sending system
- sms-whatsapp: Integration with messaging services

Application description: "${description}"

Respond ONLY with a JSON array of service IDs that would be relevant for this project:
["service-id-1", "service-id-2", ...]`
        : `Analiza esta descripción de aplicación web y sugiere servicios relevantes de la siguiente lista:

Servicios disponibles:
- figma-prototype: Diseño UI/UX en Figma con prototipo interactivo
- scaffold-project: Setup completo del proyecto con pipeline de deployment
- responsive-design: Adaptación completa para móviles, tablets y desktop
- extra-pages: 2 páginas navegables adicionales
- email-marketing: Diseño y maquetación de emails responsivos
- accessibility-seo: Optimización para accesibilidad y motores de búsqueda
- nosql-integration: Integración con MongoDB, Firebase o DynamoDB
- sql-integration: Integración con PostgreSQL, MySQL o SQLite
- websockets-realtime: Comunicación en tiempo real con Socket.io
- dao-mvc-prototype: Diseño y prototipado de arquitectura de datos
- cli-application: Herramienta de línea de comandos personalizada
- mercadopago-integration: Setup completo de MercadoPago con webhooks
- email-sending: Sistema de envío de emails transaccionales
- sms-whatsapp: Integración con servicios de mensajería

Descripción de la aplicación: "${description}"

Responde SOLO con un array JSON de IDs de servicios que serían relevantes para este proyecto:
["service-id-1", "service-id-2", ...]`

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    const suggestedServiceIds = JSON.parse(text)
    return NextResponse.json({ suggestedServiceIds })
  } catch (e) {
    console.error("AI error:", e)
    return NextResponse.json({ error: "No se pudo analizar la aplicación con IA." }, { status: 500 })
  }
}
