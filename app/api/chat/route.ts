import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const structure = `When answering, choose the response style based on the question:

- If the question needs a detailed, organized explanation, use the structured format below.
- If the question is simple or does not require structure, answer normally in clear, direct sentences.

Structured format (use only when appropriate):

[Intro]
A short, natural introduction (2–3 sentences).

# Main Topic
A clear heading with 2–4 explanatory sentences.

## Key Points
- Bullet point 1
- Bullet point 2
- Bullet point 3

## Steps
1. Step one in a full sentence.
2. Step two in a full sentence.
3. Step three in a full sentence.

## Overall Summary
A short closing summary (1–2 sentences).

Use this structure ONLY when it makes sense for the question.
Do not force it when a normal, simple answer is better.
Do not add extra content outside the chosen style.

`

export async function POST(req: Request) {
    try {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);

        const form = await req.formData();
        const question = form.get("question") as string;
        const file = form.get("file") as File | null;

        if (!question) {
            return NextResponse.json(
                { error: "Question required" },
                { status: 400 }
            );
        }

        // 1️⃣ BUILD PARTS (text + optional file)
        let parts: any[] = [];

        if (file) {
            const buf = Buffer.from(await file.arrayBuffer());
            parts.push({
                inlineData: {
                    data: buf.toString("base64"),
                    mimeType: file.type,
                },
            });
        }

        parts.push({ text: question });

        // 2️⃣ CHAT MODEL (this supports generateContent!!)
        const model = genAI.getGenerativeModel({
            model: "gemini-2.5-flash",
            systemInstruction: `
        You are a friendly chatbot created by Ketan Sharma.
        Always reply politely and clearly.
        ${structure} `,
        });

        const chatRes = await model.generateContent({
            contents: [
                {
                    role: "user",
                    parts,
                },
            ],
        });

        const answer = chatRes.response.text();

        // 3️⃣ EMBEDDING MODEL
        const embedModel = genAI.getGenerativeModel({
            model: "text-embedding-004",
        });

        const embedRes = await embedModel.embedContent(question);
        const embedding = embedRes.embedding.values;

        return NextResponse.json({
            ok: true,
            answer,
            embedding,
            fileIncluded: !!file,
        });
    } catch (err: any) {
        console.error(err);
        return NextResponse.json(
            { ok: false, error: err.message },
            { status: 500 }
        );
    }
}
