import { ChatOpenAI } from "@langchain/openai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence } from "@langchain/core/runnables";
import { z } from "zod";

const responseSchema = z.object({
  summary: z.string().describe("A concise summary of the GitHub repository"),
  cool_facts: z
    .array(z.string())
    .describe("A list of 2-3 interesting facts about the repository"),
});

export async function summarizeReadme(readmeContent: string) {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error("OPENAI_API_KEY environment variable is not set");
  }

  const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    temperature: 0,
    model: "gpt-4o-mini",
  }).withStructuredOutput(responseSchema);

  const prompt = ChatPromptTemplate.fromTemplate(`
Summarize this GitHub repository from its README file content.

Provide:
1. A concise summary (2-3 sentences)
2. 2-3 cool/interesting facts about the repository

README Content:
{readmeContent}

Respond in a clear, technical manner suitable for developers.
`);

  const chain = RunnableSequence.from([prompt, model]);

  const result = await chain.invoke({ readmeContent });
  return result;
}

