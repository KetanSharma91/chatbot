// ---------- MEMORY STORE ----------
export type ConversationItem = {
  id: number;
  question: string;
  answer: string;
  embedding: number[];
};

export let memory: ConversationItem[] = [];

// ---------- COSINE SIMILARITY ----------
export function cosineSimilarity(a: number[], b: number[]) {
  const dot = a.reduce((sum, val, i) => sum + val * b[i], 0);
  const magA = Math.sqrt(a.reduce((sum, val) => sum + val * val, 0));
  const magB = Math.sqrt(b.reduce((sum, val) => sum + val * val, 0));
  return dot / (magA * magB);
}

// ---------- VECTOR SEARCH ----------
export function searchMemory(queryEmbedding: number[], limit = 3) {
  return memory
    .map((item) => ({
      ...item,
      score: cosineSimilarity(queryEmbedding, item.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
