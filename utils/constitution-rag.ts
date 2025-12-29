
import type { ConstitutionData } from '../types';

interface SearchChunk {
    id: string;
    title: string;
    content: string;
    type: 'Preamble' | 'Article' | 'Schedule';
    keywords: string;
}

// In-memory cache for the chunked data to avoid re-processing
let chunkCache: Record<string, SearchChunk[]> = {};

/**
 * Loads the Constitution data dynamically and chunks it into retrieval-ready segments.
 * This effectively "splits" the large data structure into manageable pieces for search.
 */
async function loadAndChunkData(language: 'en' | 'sw'): Promise<SearchChunk[]> {
    if (chunkCache[language]) return chunkCache[language];

    let data: ConstitutionData;
    try {
        if (language === 'en') {
            const m = await import('../data/constitution');
            data = m.constitutionData;
        } else {
            const m = await import('../data/swahili/constitution');
            data = m.swahiliConstitutionData;
        }
    } catch (e) {
        console.error("Failed to load constitution data for RAG", e);
        return [];
    }

    const chunks: SearchChunk[] = [];

    // 1. Chunk Preamble
    chunks.push({
        id: 'Preamble',
        title: data.preamble.title,
        content: data.preamble.content,
        type: 'Preamble',
        keywords: `${data.preamble.title} introduction mwanzo`
    });

    // 2. Chunk Articles
    data.chapters.forEach(chapter => {
        chapter.parts.forEach(part => {
            part.articles.forEach(article => {
                chunks.push({
                    id: `Article ${article.number}`,
                    title: article.title,
                    content: article.content,
                    type: 'Article',
                    keywords: `${chapter.title} ${article.title} article ${article.number}`
                });
            });
        });
    });

    // 3. Chunk Schedules
    data.schedules.forEach(schedule => {
         chunks.push({
            id: schedule.id,
            title: schedule.title,
            content: schedule.content,
            type: 'Schedule',
            keywords: `${schedule.title} schedule`
        });
    });

    chunkCache[language] = chunks;
    return chunks;
}

/**
 * Retrieves the most relevant chunks from the Constitution based on a user query.
 * Uses a weighted keyword matching algorithm optimized for client-side performance.
 */
export async function retrieveRelevantContext(query: string, language: 'en' | 'sw' = 'en'): Promise<string> {
    const chunks = await loadAndChunkData(language);
    
    // Normalize query: lowercase, remove special chars, split into tokens
    const tokens = query.toLowerCase()
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(t => t.length > 3) // Filter out small words like 'the', 'and'
        .filter(t => !['what', 'where', 'when', 'how', 'show', 'tell'].includes(t)); // Remove question words

    if (tokens.length === 0) return '';

    const scoredChunks = chunks.map(chunk => {
        let score = 0;
        const titleLower = chunk.title.toLowerCase();
        const contentLower = chunk.content.toLowerCase();
        const keywordsLower = chunk.keywords.toLowerCase();

        tokens.forEach(token => {
            // Exact ID match (e.g. "Article 43") gets massive boost
            if (chunk.id.toLowerCase().includes(token)) score += 10;
            
            // Title match gets high priority
            if (titleLower.includes(token)) score += 5;
            
            // Content match
            // We count occurrences to weight density
            const regex = new RegExp(token, 'g');
            const contentMatches = (contentLower.match(regex) || []).length;
            score += contentMatches;

            // Keywords match
            if (keywordsLower.includes(token)) score += 2;
        });

        return { chunk, score };
    });

    // Sort by score descending and take top 3
    const topResults = scoredChunks
        .filter(item => item.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .map(item => item.chunk);

    if (topResults.length === 0) return '';

    // Format for LLM Context
    return topResults.map(c => 
        `[Source: Constitution of Kenya, ${c.id}: ${c.title}]\n${c.content}`
    ).join('\n\n---\n\n');
}
