
import React, { useState, memo } from 'react';
import Highlight from './Highlight';
import type { SelectedItem } from '../types/index';
import { CopyIcon, CheckIcon } from './icons';

interface ContentRendererProps {
  text: string;
  highlight: string;
  onSelectItem: (item: SelectedItem) => void;
  articleToChapterMap: Map<string, number>;
  language: 'en' | 'sw';
}

const enWordToNumber: { [key: string]: number } = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
};

const swWordToNumber: { [key: string]: number } = {
    kwanza: 1, pili: 2, tatu: 3, nne: 4, tano: 5, sita: 6, saba: 7, nane: 8, tisa: 9, kumi: 10,
    'kumi na moja': 11, 'kumi na mbili': 12, 'kumi na tatu': 13, 'kumi na nne': 14, 'kumi na tano': 15, 'kumi na sita': 16, 'kumi na saba': 17, 'kumi na nane': 18,
};

const scheduleNameToId: { [key: string]: string } = {
  first: 'first-schedule',
  second: 'second-schedule',
  third: 'third-schedule',
  fourth: 'fourth-schedule',
  fifth: 'fifth-schedule',
  sixth: 'sixth-schedule',
};

const swahiliScheduleNameToId: { [key: string]: string } = {
    kwanza: 'first-schedule',
    pili: 'second-schedule',
    tatu: 'third-schedule',
    nne: 'fourth-schedule',
    tano: 'fifth-schedule',
    sita: 'sixth-schedule',
};

const enLinkRegex = /((?:Article(?:s)?)\s+(\d+)(?:(?:\s*\([a-zA-Z0-9]+\))*))|((?:Part\s+([a-zA-Z0-9]+)\s+of\s+)?Chapter\s+([a-zA-Z0-9]+))|((First|Second|Third|Fourth|Fifth|Sixth)\s+Schedule)/gi;
const swLinkRegex = /((?:Kifungu|Vifungu)\s+(\d+)(?:(?:\s*\([a-zA-Z0-9]+\))*))|((?:Sehemu\s+ya\s+([a-zA-Z0-9\s]+)\s+ya\s+)?Sura\s+ya\s+([a-zA-Z0-9\s]+))|((Jedwali\s+la\s+(Kwanza|Pili|Tatu|Nne|Tano|Sita)))/gi;

const ContentRenderer: React.FC<ContentRendererProps> = memo(({ text, highlight, onSelectItem, articleToChapterMap, language }) => {
  const [copiedArticle, setCopiedArticle] = useState<string | null>(null);
  
  if (!text) {
    return null;
  }
  
  const handleCopyLink = (e: React.MouseEvent, articleNum: string) => {
    e.stopPropagation();
    e.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#article-${articleNum}`;
    navigator.clipboard.writeText(url).then(() => {
      setCopiedArticle(articleNum);
      setTimeout(() => {
        setCopiedArticle(null);
      }, 2000);
    }).catch(err => {
      console.error("Could not copy URL: ", err);
    });
  };

  const renderArticleLink = (articleNum: string, linkText: string) => {
    const chapterId = articleToChapterMap.get(articleNum);
    
    // If we can't find the chapter, just highlight the text
    if (!chapterId) {
      return <Highlight text={linkText} highlight={highlight} />;
    }

    const titleText = language === 'sw' ? `Nakili kiungo cha Kifungu ${articleNum}` : `Copy link to Article ${articleNum}`;
    
    return (
      <span className="inline-flex items-center align-baseline">
        <a
          href={`#article-${articleNum}`}
          onClick={(e) => {
            e.preventDefault();
            onSelectItem({ type: 'chapter', id: chapterId, article: articleNum });
          }}
          className="text-primary dark:text-dark-primary hover:underline font-semibold transition-colors"
        >
          <Highlight text={linkText} highlight={highlight} />
        </a>
        <button
          onClick={(e) => handleCopyLink(e, articleNum)}
          className="ml-1 p-0.5 rounded text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-primary transition-colors opacity-50 hover:opacity-100"
          title={titleText}
          aria-label={titleText}
        >
          {copiedArticle === articleNum ? (
            <CheckIcon className="h-3 w-3 text-primary dark:text-dark-primary" />
          ) : (
            <CopyIcon className="h-3 w-3" />
          )}
        </button>
      </span>
    );
  };

  const linkRegex = language === 'sw' ? swLinkRegex : enLinkRegex;
  const nextArticleRegex = language === 'sw'
    ? /^\s*(?:,|na|au|hadi)\s*(\d+)(?:\s*\([a-zA-Z0-9]+\))?/
    : /^\s*(?:,|and|or|to)\s*(\d+)(?:\s*\([a-zA-Z0-9]+\))?/;
  
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  linkRegex.lastIndex = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
        elements.push(<Highlight key={`text-${lastIndex}`} text={text.substring(lastIndex, match.index)} highlight={highlight} />);
    }

    const matchedText = match[0];
    let link: React.ReactNode | null = null;
    
    const [
        , // full match[0]
        articleBlock, articleNum,
        chapterBlock, partIdentifier, chapterIdentifier,
        scheduleBlock, scheduleName
    ] = match;

    if (articleBlock && articleNum) {
        elements.push(<React.Fragment key={`match-${match.index}`}>{renderArticleLink(articleNum, matchedText)}</React.Fragment>);

        let localIndex = linkRegex.lastIndex;
        let inArticleList = true;

        while(inArticleList) {
          const remainingText = text.substring(localIndex);
          const nextNumMatch = remainingText.match(nextArticleRegex);

          if (nextNumMatch) {
            const separatorWithWhitespace = nextNumMatch[0].substring(0, nextNumMatch[0].indexOf(nextNumMatch[1]));
            const nextArticleNum = nextNumMatch[1];
            const fullNextMatchText = nextNumMatch[0].trim().replace(/^,/, '').replace(/^and/, '').replace(/^or/, '').replace(/^to/, '').replace(/^na/, '').replace(/^au/, '').replace(/^hadi/, '').trim();
            
            elements.push(<Highlight key={`sep-${localIndex}`} text={separatorWithWhitespace} highlight={highlight} />);
            elements.push(<React.Fragment key={`submatch-${localIndex}`}>{renderArticleLink(nextArticleNum, fullNextMatchText)}</React.Fragment>);
            
            localIndex += nextNumMatch[0].length;
          } else {
            inArticleList = false;
          }
        }
        linkRegex.lastIndex = localIndex;

    } else if (chapterBlock && chapterIdentifier) {
        let chapterId: number | undefined;
        let partNum: number | undefined;
        const currentWordMap = language === 'sw' ? swWordToNumber : enWordToNumber;

        if (partIdentifier) {
            const partIdTrimmed = partIdentifier.trim().toLowerCase();
            if (/^\d+$/.test(partIdTrimmed)) {
                partNum = parseInt(partIdTrimmed, 10);
            } else if (currentWordMap[partIdTrimmed]) {
                partNum = currentWordMap[partIdTrimmed];
            }
        }

        const chapterIdTrimmed = chapterIdentifier.trim().toLowerCase();
        if (/^\d+$/.test(chapterIdTrimmed)) {
            chapterId = parseInt(chapterIdTrimmed, 10);
        } else if (currentWordMap[chapterIdTrimmed]) {
            chapterId = currentWordMap[chapterIdTrimmed];
        }

        if (chapterId && chapterId > 0 && chapterId <= 18) {
            link = (
                <a
                  href={partNum ? `#chapter-${chapterId}-part-${partNum}` : `#chapter-${chapterId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    const item: SelectedItem = { type: 'chapter', id: chapterId };
                    if (partNum) {
                        item.part = partNum;
                    }
                    onSelectItem(item);
                  }}
                  className="text-primary dark:text-dark-primary hover:underline font-semibold transition-colors"
                >
                  <Highlight text={matchedText} highlight={highlight} />
                </a>
            );
        }
    } else if (scheduleBlock && scheduleName) {
        const currentScheduleMap = language === 'sw' ? swahiliScheduleNameToId : scheduleNameToId;
        const scheduleId = currentScheduleMap[scheduleName.toLowerCase()];
        if (scheduleId) {
            link = (
                <a
                  href={`#schedule-${scheduleId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectItem({ type: 'schedule', id: scheduleId });
                  }}
                  className="text-primary dark:text-dark-primary hover:underline font-semibold transition-colors"
                >
                  <Highlight text={matchedText} highlight={highlight} />
                </a>
            );
        }
    }

    if (link) {
      elements.push(<React.Fragment key={`match-${match.index}`}>{link}</React.Fragment>);
    } else if (!articleBlock) { 
      // If we matched something but didn't create a link (e.g. invalid chapter number), render as text
      elements.push(<Highlight key={`text-match-${match.index}`} text={matchedText} highlight={highlight} />);
    }

    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
     elements.push(<Highlight key={`text-end`} text={text.substring(lastIndex)} highlight={highlight} />);
  }

  return <>{elements}</>;
});

export default ContentRenderer;
