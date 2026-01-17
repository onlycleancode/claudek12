import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  try {
    // Try to parse body like check-writing does
    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      return NextResponse.json({
        status: "error",
        step: "parse_body",
        error: String(parseError),
      }, { status: 400 });
    }

    const { image, letter } = body;

    // Check what we received
    const debugInfo = {
      hasImage: !!image,
      hasLetter: !!letter,
      letter: letter,
      imageLength: image ? image.length : 0,
      imagePrefix: image ? image.substring(0, 50) : null,
      imageSuffix: image ? image.substring(image.length - 50) : null,
    };

    // If we have valid data, try calling Claude
    if (image && letter) {
      try {
        const anthropic = new Anthropic({
          apiKey: process.env.ANTHROPIC_API_KEY,
        });

        const response = await anthropic.messages.create({
          model: "claude-sonnet-4-20250514",
          max_tokens: 256,
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image",
                  source: {
                    type: "base64",
                    media_type: "image/png",
                    data: image,
                  },
                },
                {
                  type: "text",
                  text: `What do you see in this image? Is there a letter drawn? Respond briefly.`,
                },
              ],
            },
          ],
        });

        const content = response.content[0];
        
        return NextResponse.json({
          status: "ok",
          step: "claude_success",
          debugInfo,
          claudeResponse: content.type === "text" ? content.text : "not text",
        });
      } catch (claudeErr) {
        return NextResponse.json({
          status: "error",
          step: "claude_call",
          debugInfo,
          error: claudeErr instanceof Error ? claudeErr.message : String(claudeErr),
          name: claudeErr instanceof Error ? claudeErr.name : "Unknown",
        }, { status: 500 });
      }
    }

    return NextResponse.json({
      status: "ok",
      step: "no_image_or_letter",
      debugInfo,
    });
  } catch (err) {
    return NextResponse.json({
      status: "error",
      step: "outer_catch",
      error: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : "Unknown",
    }, { status: 500 });
  }
}
