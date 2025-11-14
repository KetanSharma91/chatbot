import { ConversationItem } from "./vector";

export const getResponse = async (question: string, file: File | null) => {
    try {

        const formData = new FormData();
        formData.append("question", question);
        if (file) {
            formData.append("file", file);
        }

        const response = await fetch("/api/chat", {
            method: "POST",
            body: formData,
        });

        const data = await response.json();
        console.log(data);

        return data;

    } catch (error) {
        console.error("Error caused in getResponse", error);
    }
}

export const getConversations = async () => {
    try {
        const response = await fetch("/api/getConversations", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });

        const data = await response.json();
        console.log(data);

        return data.conversations;

    } catch (error) {
        console.error("Error caused in getConversations", error);
    }
}

export const storeResponse = async (conversation: ConversationItem) => {
    try {

        if (!conversation.answer && !conversation.embedding) {
            throw new Error("conversation is incomplete.")
        }

        await fetch("/api/storeConversations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                id: conversation.id,
                question: conversation.question,
                answer: conversation.answer,
                embedding: conversation.embedding
            }),
        });

    } catch (error) {
        console.error("Error caused in getResponse", error);
    }
}

export const deleteAll = async () => {
    try {
        const res = await fetch("/api/deleteConversations", {
            method: "POST"
        });

        const data = await res.json();
        console.log(data);
    } catch (error) {
        console.error("Error caused in getResponse", error);
    }
}
