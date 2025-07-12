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

    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt,
    })

    const result = JSON.parse(text)
    return NextResponse.json(result)
  } catch (e) {
    console.error("AI error:", e)
    return NextResponse.json({ error: "No se pudo analizar la funcionalidad con IA." }, { status: 500 })
  }
}
