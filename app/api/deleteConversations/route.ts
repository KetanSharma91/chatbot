import { memory } from "@/utils/vector";
import { NextResponse } from "next/server";

export async function POST() {
    try {
        memory.length = 0; // Clear the vector store

        return NextResponse.json({
            ok: true,
            message: "All conversations deleted"
        });
    } catch (err: any) {
        return NextResponse.json({ ok: false, message: err.message }, { status: 500 });
    }
}
