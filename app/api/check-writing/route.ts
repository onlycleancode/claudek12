import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { info, error, warn, getSessionLogs, getSessionInfo } from "@/lib/logger";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Helper to describe what each letter requires
function getLetterRequirements(letter: string): string {
  const requirements: { [key: string]: string } = {
    "A": "two diagonal lines meeting at top + horizontal crossbar in middle",
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
              text: `You are a kindergarten handwriting teacher evaluating a young child's attempt to write the uppercase letter "${letter}".

The image shows:
- A grid background
- There may or may not be a light gray dotted guide showing the letter shape
- Orange/coral colored strokes representing the child's writing attempt

IMPORTANT: This is a KINDERGARTENER (age 5-6). Be ENCOURAGING and LENIENT.

To PASS, the attempt needs to:
1. Be roughly recognizable as the letter "${letter}" (doesn't need to be perfect!)
2. Show the basic shape/structure (${getLetterRequirements(letter)})
3. Show intentional effort (not pure random scribbles)

PASS generously if:
- The letter is wobbly but recognizable
- Proportions are off but the shape is there
- Lines don't connect perfectly
- The letter is messy but you can tell what they were trying to write

Only FAIL if:
- It's completely random scribbles with no letter structure
- They clearly drew a different letter
- There's almost nothing drawn

When in doubt, PASS. We want to encourage the child!

Respond with ONLY valid JSON (no markdown, no code blocks):
{"passed": <true or false>}`,
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
