import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Represents a single sprint in the project plan.
 */
export type Sprint = {
  number: number;
  name: string;
  description: string;
  features: string[];
  estimatedHours: number;
};

/**
 * Represents the AI response for sprint generation.
 */
export type SprintAIResponse = {
  sprints: Sprint[];
  reasoning: string;
};
