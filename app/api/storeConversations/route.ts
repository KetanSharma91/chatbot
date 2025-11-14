import { ConversationItem, memory } from "@/utils/vector";
import { NextResponse } from "next/server";

export async function POST(req: Request) {

    try {
        const { id, question, answer, embedding } = await req.json();

        if (!id && !question && !answer) return NextResponse.json({ error: "Question And answer required" }, { status: 400 });

        const item: ConversationItem = {
            id,
            question,
            answer,
            embedding
        };

        memory.push(item);

        return NextResponse.json({ ok: true, message: "Conversation stored" });

    } catch (err) {
        return NextResponse.json({ ok: false, message: err }, { status: 500 });
    }
}
