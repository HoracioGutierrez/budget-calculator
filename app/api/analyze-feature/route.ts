import { type NextRequest, NextResponse } from "next/server"
import { streamObject } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"
import { frontendServices, backendServices, integrationsServices } from "@/features/services/lib/utils"

const services = [...frontendServices, ...backendServices, ...integrationsServices]

export async function POST(req: NextRequest) {
  const { description, language } = await req.json()

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return NextResponse.json({ error: "Falta la variable GOOGLE_GENERATIVE_AI_API_KEY en el entorno del servidor." }, { status: 500 })
  }

  try {
    const prompt =
      language === "en"
        ? `Analyze this web development feature and estimate price and development time:

"${description}"

The following services are available:
${JSON.stringify(services)} , so the price and time will be based on the services used in the feature.

If the feature is not related to web development, respond with price 0, time 0 and reasoning "This feature is not related to web development or cannot be done with the available services".

Respond ONLY with a JSON in this exact format:
{
  "estimatedPrice": [number in USD],
  "estimatedHours": [number of hours],
  "reasoning": "[explanation of the feature and why the price and time are like that]"
}`
        : `Analiza esta funcionalidad para desarrollo web y estima el precio y tiempo de desarrollo:

"${description}"

Los servicios disponibles son:
${JSON.stringify(services)} , por lo que el precio y el tiempo se basarán en los servicios utilizados en la funcionalidad.

Si la funcionalidad no está relacionada con el desarrollo web, responde con precio 0, tiempo 0 y razón "Esta funcionalidad no está relacionada con el desarrollo web o no puede ser realizada con los servicios disponibles".

Responde SOLO con un JSON en este formato exacto:
{
  "estimatedPrice": [número en USD],
  "estimatedHours": [número de horas],
  "reasoning": "[explanation of the feature and why the price and time are like that]"
}`

    const result = await streamObject({
      model: google("models/gemini-1.5-flash"),
      prompt,
      schema: z.object({
        estimatedPrice: z.number(),
        estimatedHours: z.number(),
        reasoning: z.string(),
      }),
    })

    return result.toTextStreamResponse()
  } catch (e) {
    console.error("AI error:", e)
    return NextResponse.json({ error: "No se pudo analizar la funcionalidad con IA." }, { status: 500 })
  }
}
