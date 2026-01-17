import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { info, error, warn } from "@/lib/logger";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function POST(request: NextRequest) {
  const requestId = Math.random().toString(36).substring(7);

  try {
    // Check if API key is configured
    if (!process.env.ANTHROPIC_API_KEY) {
      error("check-reading", "ANTHROPIC_API_KEY not configured", { requestId });
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    let body;
    try {
      body = await request.json();
    } catch (parseError) {
      error("check-reading", "Failed to parse request body", {
        requestId,
        parseError: String(parseError),
      });
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const { spokenText, targetWord, needHint } = body;

    if (!spokenText || !targetWord) {
      warn("check-reading", "Missing spokenText or targetWord", {
        requestId,
        hasSpokenText: !!spokenText,
        hasTargetWord: !!targetWord,
      });
      return NextResponse.json(
        { error: "Missing spokenText or targetWord" },
        { status: 400 }
      );
    }

    info("check-reading", `Checking word match`, {
      requestId,
      spokenText,
      targetWord,
      needHint,
    });

    // Clean the target word (remove punctuation)
    const cleanTargetWord = targetWord.replace(/[.,!?]/g, "");

    // Use Claude Haiku for fast, intelligent word matching + optional phonetic hint
    const response = await anthropic.messages.create({
      model: "claude-3-5-haiku-20241022",
      max_tokens: 150,
      messages: [
        {
          role: "user",
          content: `You are helping evaluate if a child (kindergarten age) correctly said a word while reading aloud.

Target word: "${cleanTargetWord}"
What the child said: "${spokenText}"

Did the child say the target word? Consider:
- Stuttering is OK ("th-the" counts as "the")
- Filler words are OK ("um the" counts as "the")  
- Similar sounds are OK ("da" for "the" from young children)
- Must be recognizably the same word or a reasonable attempt

${needHint ? `If NOT matched, also provide a phonetic hint to help the child sound out the word.
The hint should break the word into simple sounds that a kindergartener can understand.
Examples:
- "cat" -> "kuh - aah - tuh" 
- "the" -> "thuh"
- "dog" -> "duh - aww - guh"
- "ball" -> "buh - aww - lll"
- "run" -> "ruh - uhn"
- "see" -> "sss - eee"
Use simple sounds, not IPA symbols. Separate sounds with " - ".` : ""}

Respond with ONLY valid JSON (no markdown, no code blocks):
${needHint ? '{"matched": true/false, "phoneticHint": "hint if not matched or null"}' : '{"matched": true/false}'}`,
        },
      ],
    });

    info("check-reading", "Claude API response received", { requestId });

    // Parse the response
    const content = response.content[0];
    if (content.type !== "text") {
      error("check-reading", "Unexpected response type from Claude", {
        requestId,
        type: content.type,
      });
      return NextResponse.json(
        { error: "Unexpected response type" },
        { status: 500 }
      );
    }

    info("check-reading", "Raw Claude response", {
      requestId,
      raw: content.text,
    });

    let result;
    try {
      result = JSON.parse(content.text);
    } catch (jsonError) {
      error("check-reading", "Failed to parse Claude response as JSON", {
        requestId,
        raw: content.text,
        parseError: String(jsonError),
      });
      // Fallback to simple string matching if Claude response is malformed
      const normalizedSpoken = spokenText.toLowerCase().trim();
      const normalizedTarget = cleanTargetWord.toLowerCase().trim();
      const matched = normalizedSpoken.includes(normalizedTarget);
      return NextResponse.json({ matched });
    }

    info("check-reading", "Success", { requestId, matched: result.matched, phoneticHint: result.phoneticHint });

    return NextResponse.json({
      matched: result.matched,
      phoneticHint: result.phoneticHint || null,
    });
  } catch (err) {
    error("check-reading", "Unhandled error", {
      requestId,
      message: err instanceof Error ? err.message : String(err),
      name: err instanceof Error ? err.name : "Unknown",
      stack: err instanceof Error ? err.stack : undefined,
    });

    // Fallback to simple matching on error
    try {
      const body = await request.clone().json();
      const normalizedSpoken = body.spokenText?.toLowerCase().trim() || "";
      const normalizedTarget =
        body.targetWord
          ?.toLowerCase()
          .replace(/[.,!?]/g, "")
          .trim() || "";
      const matched = normalizedSpoken.includes(normalizedTarget);
      return NextResponse.json({ matched, fallback: true });
    } catch {
      return NextResponse.json(
        {
          error: "Failed to check reading",
          message: err instanceof Error ? err.message : "Unknown error",
        },
        { status: 500 }
      );
    }
  }
}
