import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

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
      `,
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
