import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    hasApiKey: !!process.env.ANTHROPIC_API_KEY,
    apiKeyPrefix: process.env.ANTHROPIC_API_KEY 
      ? process.env.ANTHROPIC_API_KEY.substring(0, 10) + "..." 
      : null,
    timestamp: new Date().toISOString(),
  });
}

export async function POST() {
  try {
    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 50,
      messages: [
        {
          role: "user",
          content: "Say 'hello' in JSON format: {\"message\": \"hello\"}",
        },
      ],
    });

    const content = response.content[0];
    
    return NextResponse.json({
      status: "ok",
      claudeResponse: content.type === "text" ? content.text : "not text",
    });
  } catch (err) {
    return NextResponse.json({
      status: "error",
      error: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : "Unknown",
    }, { status: 500 });
  }
}
