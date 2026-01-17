import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { info, error, warn } from "@/lib/logger";

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);
  
  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      error("check-science", "ANTHROPIC_API_KEY not configured", { requestId });
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      error("check-science", "Failed to parse request body", { requestId, parseError: String(parseError) });
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { image, question, expectedAnswer, questionType } = body;

    if (!image || !question) {
      warn("check-science", "Missing required fields", { 
        requestId, 
        hasImage: !!image, 
        hasQuestion: !!question
      });
      return NextResponse.json(
        { error: "Missing image or question" },
        { status: 400 }
      );
    }

    info("check-science", `Calling Claude API`, { 
      requestId, 
      question,
      questionType,
      imageSize: image.length 
    });

    // Build question-specific grading criteria
    let gradingCriteria = "";
    
    if (questionType === "fish") {
      gradingCriteria = `For "where does a fish live?":
- PASS if the drawing shows ANY of these: water, ocean, sea, waves, blue color suggesting water, a pond, lake, river, fish tank, aquarium, or anything that could reasonably represent a water environment
- Be VERY lenient - if there's significant blue coloring, wavy lines, or anything that could be water, PASS
- Even simple blue scribbles are acceptable as "water"

FAIL only if:
- The drawing clearly shows something completely wrong (like a desert, fire, sky with no water)
- The canvas is mostly empty/blank
- The drawing has no blue or water-like elements at all`;
    } else if (questionType === "mountain") {
      gradingCriteria = `For "what does a mountain look like?":
- PASS if the drawing shows ANY of these: a triangle shape, a pointy peak, something tall and pointed, hills, rocky terrain, snow-capped peak, brown/gray/green coloring for land
- Be VERY lenient - if there's a triangular or peaked shape, even wobbly, PASS
- Even simple triangles or pointed scribbles are acceptable as "mountains"
- Green bumps, brown triangles, or any landform shapes should PASS

FAIL only if:
- The drawing clearly shows something completely unrelated (like only water, only sky, a house with no mountain)
- The canvas is mostly empty/blank
- The drawing has no triangular, peaked, or hill-like shapes at all`;
    } else {
      gradingCriteria = `Evaluate if the drawing reasonably answers the question. Be VERY lenient for a kindergartener.`;
    }

    const anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });

    const response = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 300,
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
              text: `You are a kindergarten teacher evaluating a young child's (age 5-6) drawing for a science question.

QUESTION: "${question}"
EXPECTED ANSWER CONCEPTS: ${expectedAnswer}

The child drew something on a canvas to answer this question. Evaluate if their drawing shows the correct answer.

${gradingCriteria}

If you fail them, provide a SHORT, encouraging hint (1 sentence, simple words for a 5-year-old).

Respond with ONLY valid JSON (no markdown, no code blocks):
{"passed": <true or false>, "feedback": "<short hint if failed, or empty string if passed>"}`,
            },
          ],
        },
      ],
    });

    info("check-science", "Claude API response received", { requestId });

    // Parse the response
    const content = response.content[0];
    if (content.type !== "text") {
      error("check-science", "Unexpected response type from Claude", { requestId, type: content.type });
      return NextResponse.json(
        { error: "Unexpected response type" },
        { status: 500 }
      );
    }

    info("check-science", "Raw Claude response", { requestId, raw: content.text });

    let result;
    try {
      result = JSON.parse(content.text);
    } catch (jsonError) {
      error("check-science", "Failed to parse Claude response as JSON", { 
        requestId, 
        raw: content.text, 
        parseError: String(jsonError) 
      });
      return NextResponse.json({ passed: false, feedback: "Try again!" });
    }

    info("check-science", "Success", { 
      requestId, 
      passed: result.passed,
      feedback: result.feedback
    });

    return NextResponse.json({
      passed: result.passed,
      feedback: result.feedback || "",
    });
  } catch (err) {
    error("check-science", "Unhandled error", { 
      requestId,
      message: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : "Unknown",
      stack: err instanceof Error ? err.stack : undefined,
    });
    
    return NextResponse.json({ passed: false, feedback: "Something went wrong, try again!" });
  }
}
