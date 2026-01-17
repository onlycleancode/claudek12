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
  return NextResponse.json({
    status: "ok",
    method: "POST",
    hasApiKey: !!process.env.ANTHROPIC_API_KEY,
  });
}
