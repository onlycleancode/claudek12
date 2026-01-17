import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { info, error, warn } from "@/lib/logger";

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  
  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      error("check-math-balls", "ANTHROPIC_API_KEY not configured", { requestId });
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      error("check-math-balls", "Failed to parse request body", { requestId, parseError: String(parseError) });
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { image, expectedCount, personName } = body;

    if (!image || expectedCount === undefined || !personName) {
      warn("check-math-balls", "Missing required fields", { 
        requestId, 
        hasImage: !!image, 
        hasExpectedCount: expectedCount !== undefined,
        hasPersonName: !!personName 
      });
      return NextResponse.json(
        { error: "Missing image, expectedCount, or personName" },
        { status: 400 }
      );
    }

    info("check-math-balls", `Calling Claude API`, { 
      requestId, 
      expectedCount, 
      personName,
      imageSize: image.length 
    });

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
              text: `You are a kindergarten teacher evaluating a young child's (age 5-6) attempt to draw balls/circles for a math word problem.

The child was asked to draw ${expectedCount} balls for ${personName}.

The image shows a canvas with coral/orange colored strokes representing the child's drawing attempt.

COUNTING TASK:
Count the number of distinct circular shapes (balls) the child drew.

PASS/FAIL CRITERIA:
- PASS if the child drew approximately ${expectedCount} balls (circles or round shapes)
- Accept wobbly circles, ovals, or roughly round shapes as "balls"
- Each distinct closed or mostly-closed round shape counts as 1 ball
- Small dots or marks that look intentional can count as balls

BE VERY LENIENT - this is a kindergartener! 
- If you count ${expectedCount - 1} to ${expectedCount + 1} balls, PASS them (close enough for a 5-year-old)
- When in doubt about whether something is a ball, count it as one

FAIL only if:
- The count is clearly wrong (off by more than 1)
- There's nothing drawn
- They drew something completely unrelated (like letters or scribbles with no round shapes)

Respond with ONLY valid JSON (no markdown, no code blocks):
{"passed": <true or false>, "countedBalls": <number you counted>}`,
            },
          ],
        },
      ],
    });

    info("check-math-balls", "Claude API response received", { requestId });

    // Parse the response
    const content = response.content[0];
    if (content.type !== "text") {
      error("check-math-balls", "Unexpected response type from Claude", { requestId, type: content.type });
      return NextResponse.json(
        { error: "Unexpected response type" },
        { status: 500 }
      );
    }

    info("check-math-balls", "Raw Claude response", { requestId, raw: content.text });

    let result;
    try {
      result = JSON.parse(content.text);
    } catch (jsonError) {
      error("check-math-balls", "Failed to parse Claude response as JSON", { 
        requestId, 
        raw: content.text, 
        parseError: String(jsonError) 
      });
      return NextResponse.json({ passed: false, countedBalls: 0, error: "Parse error" });
    }

    info("check-math-balls", "Success", { 
      requestId, 
      passed: result.passed, 
      countedBalls: result.countedBalls,
      expectedCount 
    });

    return NextResponse.json({
      passed: result.passed,
      countedBalls: result.countedBalls,
    });
  } catch (err) {
    error("check-math-balls", "Unhandled error", { 
      requestId,
      message: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : "Unknown",
      stack: err instanceof Error ? err.stack : undefined,
    });
    
    return NextResponse.json({ passed: false, error: "Server error" });
  }
}
