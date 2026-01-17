import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { info, error, warn, getSessionLogs, getSessionInfo } from "@/lib/logger";

// Helper to describe what each letter requires
function getLetterRequirements(letter: string): string {
  const requirements: { [key: string]: string } = {
    "A": "a triangle or tent shape (two lines going up and meeting), crossbar optional for kids",
    "B": "one vertical line on left + two bumps on right (top and bottom)",
    "C": "one curved line opening to the right",
    "D": "one vertical line on left + one large curved bump on right",
    "E": "one vertical line + three horizontal lines (top, middle, bottom)",
    "F": "one vertical line + two horizontal lines (top and middle only)",
    "G": "curved C-shape + horizontal line pointing inward from middle right",
    "H": "two vertical lines + horizontal crossbar connecting them",
    "I": "one vertical line (may have top and bottom serifs)",
    "J": "vertical line with curved hook at bottom",
    "K": "vertical line + two diagonal lines meeting at middle",
    "L": "vertical line + horizontal line at bottom",
    "M": "two vertical lines + two diagonal lines forming a peak",
    "N": "two vertical lines + one diagonal connecting top-left to bottom-right",
    "O": "one closed oval/circular shape",
    "P": "vertical line + one bump at top right",
    "Q": "closed oval + small diagonal tail",
    "R": "vertical line + bump at top right + diagonal leg",
    "S": "curved snake-like shape",
    "T": "horizontal line on top + vertical line down from center",
    "U": "curved bottom connecting two vertical sides",
    "V": "two diagonal lines meeting at bottom point",
    "W": "four diagonal lines forming two valleys",
    "X": "two diagonal lines crossing in the middle",
    "Y": "two diagonal lines meeting + vertical line down from junction",
    "Z": "horizontal top + diagonal + horizontal bottom",
  };
  return requirements[letter] || "all standard parts of the letter";
}

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  
  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      error("check-writing", "ANTHROPIC_API_KEY not configured", { requestId });
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      error("check-writing", "Failed to parse request body", { requestId, parseError: String(parseError) });
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { image, letter } = body;

    if (!image || !letter) {
      warn("check-writing", "Missing image or letter", { requestId, hasImage: !!image, hasLetter: !!letter });
      return NextResponse.json(
        { error: "Missing image or letter" },
        { status: 400 }
      );
    }

    info("check-writing", `Calling Claude API`, { requestId, letter, imageSize: image.length });

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
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
              text: `You are evaluating a KINDERGARTENER's (age 5-6) attempt to write the letter "${letter}".

The image shows orange/coral colored strokes drawn on a white canvas. This is the child's freehand drawing attempt.

BE VERY LENIENT - this is a small child learning to write!

For "${letter}", look for: ${getLetterRequirements(letter)}

PASS if you can tell they TRIED to write "${letter}" - even if:
- Very wobbly or messy
- Lines don't connect perfectly
- Missing parts (like crossbar for A)
- Wrong proportions or size
- Looks like a child drew it

ONLY FAIL if:
- Random scribbles with absolutely no letter shape
- Clearly a completely different letter
- Canvas is blank or nearly empty

When in doubt, PASS! We want to encourage the child.

Respond with ONLY this JSON: {"passed": true} or {"passed": false}`,
            },
          ],
        },
      ],
    });

    info("check-writing", "Claude API response received", { requestId });

    // Parse the response
    const content = response.content[0];
    if (content.type !== "text") {
      error("check-writing", "Unexpected response type from Claude", { requestId, type: content.type });
      return NextResponse.json(
        { error: "Unexpected response type" },
        { status: 500 }
      );
    }

    info("check-writing", "Raw Claude response", { requestId, raw: content.text });

    let result;
    try {
      result = JSON.parse(content.text);
    } catch (jsonError) {
      error("check-writing", "Failed to parse Claude response as JSON", { 
        requestId, 
        raw: content.text, 
        parseError: String(jsonError) 
      });
      return NextResponse.json(
        { error: "Failed to parse response" },
        { status: 500 }
      );
    }

    info("check-writing", "Success", { requestId, passed: result.passed });

    return NextResponse.json({
      passed: result.passed,
    });
  } catch (err) {
    error("check-writing", "Unhandled error", { 
      requestId,
      message: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : "Unknown",
      stack: err instanceof Error ? err.stack : undefined,
    });
    
    return NextResponse.json(
      { error: "Failed to check writing", message: err instanceof Error ? err.message : "Unknown error" },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve session logs
export async function GET() {
  const sessionInfo = getSessionInfo();
  const logs = getSessionLogs();
  
  return NextResponse.json({
    session: sessionInfo,
    logs: logs,
    apiKeyConfigured: !!process.env.ANTHROPIC_API_KEY,
    apiKeyPrefix: process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_API_KEY.substring(0, 12) + "..." : null,
  });
}
