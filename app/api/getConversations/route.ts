import { memory } from "@/utils/vector";
import { NextResponse } from "next/server";

// type conversationsProps = {
//     id: number,
//     question: string,
//     answer: string
// }

// const conversations1: ConversationItem[] = [
//     {
//         "id": 1,
//         "question": "What are the fundamental differences between machine learning and traditional programming?",
//         "answer": "In traditional programming, developers explicitly define rules and logic to process inputs and produce outputs. Machine learning, on the other hand, relies on algorithms that learn patterns from data. Instead of hardcoding rules, ML models infer relationships by training on large datasets, enabling them to generalize and make predictions on unseen data."
//     },
//     {
//         "id": 2,
//         "question": "How does encryption ensure secure communication over the internet?",
//         "answer": "Encryption transforms readable data (plaintext) into an unreadable format (ciphertext) using mathematical algorithms and keys. Only authorized parties with the correct decryption key can revert ciphertext back to plaintext. This ensures confidentiality, integrity, and authenticity of communication, protecting against eavesdropping, tampering, and impersonation."
//     },
//     {
//         "id": 3,
//         "question": "Why is scalability important in backend system design?",
//         "answer": "Scalability ensures that a system can handle increasing workloads without performance degradation. As user demand grows, scalable systems can expand horizontally (adding more servers) or vertically (upgrading hardware) to maintain responsiveness. Without scalability, systems risk downtime, slow performance, and poor user experience under heavy load."
//     },
//     {
//         "id": 4,
//         "question": "What role does data preprocessing play in building accurate machine learning models?",
//         "answer": "Data preprocessing involves cleaning, transforming, and organizing raw data before feeding it into machine learning algorithms. This includes handling missing values, normalizing numerical features, encoding categorical variables, and removing noise. Proper preprocessing improves model accuracy, reduces bias, and ensures that the algorithm learns meaningful patterns rather than artifacts."
//     },
//     {
//         "id": 5,
//         "question": "How do modern web applications achieve real-time communication?",
//         "answer": "Modern web applications use technologies like WebSockets, Server-Sent Events (SSE), and HTTP/2 to enable real-time communication. WebSockets establish a persistent, bidirectional connection between client and server, allowing instant data exchange. This is crucial for chat apps, collaborative tools, and live dashboards where updates must be delivered without delay."
//     },
//     {
//         "id": 6,
//         "question": "How do modern web applications achieve real-time communication?",
//         "answer": "Modern web applications use technologies like WebSockets, Server-Sent Events (SSE), and HTTP/2 to enable real-time communication. WebSockets establish a persistent, bidirectional connection between client and server, allowing instant data exchange. This is crucial for chat apps, collaborative tools, and live dashboards where updates must be delivered without delay."
//     },
//     {
//         "id": 7,
//         "question": "How do modern web applications achieve real-time communication?",
//         "answer": "Modern web applications use technologies like WebSockets, Server-Sent Events (SSE), and HTTP/2 to enable real-time communication. WebSockets establish a persistent, bidirectional connection between client and server, allowing instant data exchange. This is crucial for chat apps, collaborative tools, and live dashboards where updates must be delivered without delay."
//     }
// ];

export async function GET(req: Request) {

    try {

        // let conversations: conversationsProps[] = [];
        // if (typeof window !== "undefined") {
        //     const item = localStorage.getItem("conversations");
        //     conversations = item ? JSON.parse(item) as conversationsProps[] : [];
        // }
        // console.log(conversations);

        // console.log(memory);

        return NextResponse.json({ ok: true, conversations: memory });

    } catch (err) {
        return NextResponse.json({ ok: false, message: err }, { status: 500 });
    }
}
