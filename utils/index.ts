"use client";
import { ConversationItem } from "./vector";
import { marked } from "marked";
import { useEffect, useState } from "react";

export function markdownToHtml(markdownText: string) {
    return marked.parse(markdownText);
}

export function useTypingEffect(htmlText: string, speed = 40) {
    const [typed, setTyped] = useState("");

    useEffect(() => {
        if (!htmlText) return;

        const temp = document.createElement("div");
        temp.innerHTML = htmlText;
        const text = temp.innerText;

        const words = text.split(" ");
        let index = 0;

        const interval = setInterval(() => {
            setTyped(prev => prev + (index === 0 ? "" : " ") + words[index]);
            index++;
            if (index >= words.length) clearInterval(interval);
        }, speed);

        return () => clearInterval(interval);
    }, [htmlText, speed]);

    return typed;
}


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
