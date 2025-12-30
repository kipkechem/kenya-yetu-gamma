
import type { ConstitutionData } from '../types/index';

interface SearchChunk {
    id: string;
    title: string;
    content: string;
    type: 'Preamble' | 'Article' | 'Schedule';
    keywords: string;
}

let globalChunkCache: Record<string, SearchChunk[]> = {};

async function getConstitutionChunks(language: 'en' | 'sw'): Promise<SearchChunk[]> {
    if (globalChunkCache[language]) return globalChunkCache[language];

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

    // Preamble
    chunks.push({
        id: 'Preamble',
        title: data.preamble.title,
        content: data.preamble.content,
        type: 'Preamble',
        keywords: `${data.preamble.title} introduction mwanzo start basic principles foundation heritage mashujaa diversity`
    });

    // Articles
    data.chapters.forEach(chapter => {
        chapter.parts.forEach(part => {
            part.articles.forEach(article => {
                chunks.push({
                    id: `${article.number}`,
                    title: article.title,
                    content: article.content,
                    type: 'Article',
                    keywords: `${chapter.title} ${article.title} article kifungu kif ${article.number} ${part.title} law provision rule section rights duties power`
                });
            });
        });
    });

    // Schedules
    data.schedules.forEach(schedule => {
         chunks.push({
            id: schedule.id,
            title: schedule.title,
            content: schedule.content,
            type: 'Schedule',
            keywords: `${schedule.title} schedule jedwali list table appendix transitional oath flag symbols`
        });
    });

    globalChunkCache[language] = chunks;
    return chunks;
}

export async function retrieveRelevantContext(query: string, language: 'en' | 'sw' = 'en'): Promise<string> {
    const chunks = await getConstitutionChunks(language);
    const cleanQuery = query.toLowerCase();
    
    // Prioritize direct Article matches if user types "Article 43" or "Kifungu 43"
    const articleMatch = cleanQuery.match(/(?:article|kifungu|kif)\s+(\d+)/i);
    const specificArticleNum = articleMatch ? articleMatch[1] : null;

    const tokens = cleanQuery
        .replace(/[^\w\s]/g, '')
        .split(/\s+/)
        .filter(t => t.length > 2);

    if (tokens.length === 0 && !specificArticleNum) return '';

    const scored = chunks.map(chunk => {
        let score = 0;
        
        // 1. Exact article match boost (Highest priority)
        if (specificArticleNum && chunk.type === 'Article' && chunk.id === specificArticleNum) {
            score += 5000; 
        }

        const fullText = (chunk.title + ' ' + chunk.content + ' ' + chunk.keywords).toLowerCase();
        
        tokens.forEach(token => {
            // 2. Keyword in ID match
            if (chunk.id === token) score += 200; 
            
            // 3. Title match boost
            if (chunk.title.toLowerCase().includes(token)) score += 150;
            
            // 4. Frequency match in content
            const occurrences = (fullText.split(token).length - 1);
            score += occurrences * 15;

            // 5. Semantic weighting for key themes
            const themes: Record<string, string[]> = {
                'rights': ['human', 'freedom', 'bill', 'haki', 'uhuru', 'equality', 'justice'],
                'land': ['property', 'ardhi', 'environment', 'malingira', 'soil', 'water'],
                'devolution': ['county', 'devolved', 'ugatuzi', 'kaunti', 'governor', 'ward'],
                'executive': ['president', 'cabinet', 'rais', 'baraza', 'minister'],
                'parliament': ['senate', 'legislature', 'bunge', 'national assembly', 'speaker'],
                'judiciary': ['court', 'judge', 'mahakama', 'jaji', 'justice', 'magistrate']
            };

            for (const [theme, synonyms] of Object.entries(themes)) {
                if (token === theme || synonyms.includes(token)) {
                    if (fullText.includes(theme) || synonyms.some(s => fullText.includes(s))) {
                        score += 100;
                    }
                }
            }
        });

        return { chunk, score };
    });

    // Sort by score and take top relevant chunks
    const topResults = scored
        .filter(s => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8) 
        .map(s => s.chunk);

    if (topResults.length === 0) return '';

    return topResults.map(c => 
        `[SOURCE: ${c.type} ${c.id === 'Preamble' ? '' : c.id} - ${c.title}]\n${c.content}`
    ).join('\n\n---\n\n');
}
