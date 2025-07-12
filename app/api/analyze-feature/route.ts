import { type NextRequest, NextResponse } from "next/server"
import { streamObject } from "ai"
import { google } from "@ai-sdk/google"
import { z } from "zod"

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

Respond ONLY with a JSON in this exact format:
{
  "estimatedPrice": [number in USD],
  "estimatedHours": [number of hours],
  "reasoning": "[brief 1-2 line explanation]"
}`
        : `Analiza esta funcionalidad para desarrollo web y estima el precio y tiempo de desarrollo:

"${description}"

Responde SOLO con un JSON en este formato exacto:
{
  "estimatedPrice": [número en USD],
  "estimatedHours": [número de horas],
  "reasoning": "[breve explicación de 1-2 líneas]"
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
