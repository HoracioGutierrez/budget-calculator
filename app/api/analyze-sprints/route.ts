import { type NextRequest, NextResponse } from "next/server";
import { streamObject } from "ai";
import { google } from "@ai-sdk/google";
import { z } from "zod";
import { SprintAIResponse } from "../../../lib/utils";

export async function POST(req: NextRequest) {
  const { features, phases, language } = await req.json();

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    return NextResponse.json({ error: "Falta la variable GOOGLE_GENERATIVE_AI_API_KEY en el entorno del servidor." }, { status: 500 });
  }

  try {
    const prompt =
      language === "en"
        ? `You are a project manager. Given the following selected features for a web project:

${features.map((f: string) => `- ${f}`).join("\n")}

Divide these features into ${phases} logical sprints, each with a name, description, list of features, and estimated hours (sum of the features in the sprint). The number of sprints should match the number of phases. Also, provide a brief reasoning for the sprint distribution.

Respond ONLY with a JSON in this exact format:
{
  "sprints": [
    {
      "number": 1,
      "name": "Sprint Name",
      "description": "What is the focus of this sprint?",
      "features": ["feature 1", "feature 2"],
      "estimatedHours": 40
    },
    ...
  ],
  "reasoning": "[brief explanation]"
}`
        : `Eres un project manager. Dadas las siguientes funcionalidades seleccionadas para un proyecto web:

${features.map((f: string) => `- ${f}`).join("\n")}

Divide estas funcionalidades en ${phases} sprints lógicos, cada uno con un nombre, descripción, lista de funcionalidades y horas estimadas (suma de las funcionalidades en el sprint). El número de sprints debe coincidir con el número de fases. Además, proporciona una breve justificación de la distribución de los sprints.

Responde SOLO con un JSON en este formato exacto:
{
  "sprints": [
    {
      "number": 1,
      "name": "Nombre del Sprint",
      "description": "¿Cuál es el enfoque de este sprint?",
      "features": ["funcionalidad 1", "funcionalidad 2"],
      "estimatedHours": 40
    },
    ...
  ],
  "reasoning": "[breve explicación]"
}`;

    const result = await streamObject({
      model: google("models/gemini-1.5-flash"),
      prompt,
      schema: z.object({
        sprints: z.array(
          z.object({
            number: z.number(),
            name: z.string(),
            description: z.string(),
            features: z.array(z.string()),
            estimatedHours: z.number(),
          })
        ),
        reasoning: z.string(),
      }),
    });

    return result.toTextStreamResponse();
  } catch (e) {
    console.error("AI error:", e);
    return NextResponse.json({ error: "No se pudo generar la distribución de sprints con IA." }, { status: 500 });
  }
} 