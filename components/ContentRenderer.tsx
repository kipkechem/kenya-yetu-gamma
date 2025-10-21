import React, { useState } from 'react';
import Highlight from './Highlight';
import type { SelectedItem } from '../types';
import { CopyIcon, CheckIcon } from './icons';

interface ContentRendererProps {
  text: string;
  highlight: string;
  onSelectItem: (item: SelectedItem) => void;
  articleToChapterMap: Map<string, number>;
  language: 'en' | 'sw';
}

const wordToNumber: { [key: string]: number } = {
  one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10,
  eleven: 11, twelve: 12, thirteen: 13, fourteen: 14, fifteen: 15, sixteen: 16, seventeen: 17, eighteen: 18,
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

const enLinkRegex = /(Article\s+(\d+)(?:(?:\s*\([a-zA-Z0-9]+\))*))|(Chapter\s+([a-zA-Z0-9]+))|((First|Second|Third|Fourth|Fifth|Sixth)\s+Schedule)/gi;
const swLinkRegex = /(Kifungu\s+(\d+)(?:(?:\s*\([a-zA-Z0-9]+\))*))|(Sura\s+ya\s+([a-zA-Z0-9]+))|((Jedwali\s+la\s+(Kwanza|Pili|Tatu|Nne|Tano|Sita)))/gi;

const ContentRenderer: React.FC<ContentRendererProps> = ({ text, highlight, onSelectItem, articleToChapterMap, language }) => {
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

  const linkRegex = language === 'sw' ? swLinkRegex : enLinkRegex;
  
  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  linkRegex.lastIndex = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(
        <Highlight key={`text-${lastIndex}`} text={text.substring(lastIndex, match.index)} highlight={highlight} />
      );
    }

    const matchedText = match[0];
    let link: React.ReactNode | null = null;
    let articleNum: string | undefined;
    let chapterIdentifier: string | undefined;
    let scheduleIdentifier: string | undefined;

    if (language === 'sw') {
        articleNum = match[2];
        chapterIdentifier = match[4];
        scheduleIdentifier = match[6]?.toLowerCase();
    } else {
        articleNum = match[2];
        chapterIdentifier = match[4];
        scheduleIdentifier = match[6]?.toLowerCase();
    }
    
    if (articleNum) {
        const chapterId = articleToChapterMap.get(articleNum);
        if (chapterId) {
            const titleText = language === 'sw' ? `Nakili kiungo cha ${matchedText}` : `Copy link to ${matchedText}`;
            link = (
                <span className="inline-flex items-center">
                  <a
                    href={`#article-${articleNum}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectItem({ type: 'chapter', id: chapterId, article: articleNum });
                    }}
                    className="text-green-700 dark:text-green-400 hover:underline font-semibold"
                  >
                    <Highlight text={matchedText} highlight={highlight} />
                  </a>
                  <button
                    onClick={(e) => handleCopyLink(e, articleNum!)}
                    className="ml-1 p-0.5 rounded text-gray-400 dark:text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-green-500 transition-colors"
                    title={titleText}
                    aria-label={titleText}
                  >
                    {copiedArticle === articleNum ? (
                        <CheckIcon className="h-4 w-4 text-green-600 dark:text-green-400" />
                    ) : (
                        <CopyIcon className="h-4 w-4" />
                    )}
                  </button>
                </span>
            );
        }
    } else if (chapterIdentifier) {
        let chapterId: number | undefined;
        if (/^\d+$/.test(chapterIdentifier)) {
          chapterId = parseInt(chapterIdentifier, 10);
        } else if (wordToNumber[chapterIdentifier.toLowerCase()]) {
          chapterId = wordToNumber[chapterIdentifier.toLowerCase()];
        }
        
        if (chapterId && chapterId > 0 && chapterId <= 18) {
            link = (
                <a
                  href={`#chapter-${chapterId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectItem({ type: 'chapter', id: chapterId as number });
                  }}
                  className="text-green-700 dark:text-green-400 hover:underline font-semibold"
                >
                  <Highlight text={matchedText} highlight={highlight} />
                </a>
            );
        }
    } else if (scheduleIdentifier) {
        const currentScheduleMap = language === 'sw' ? swahiliScheduleNameToId : scheduleNameToId;
        const scheduleId = currentScheduleMap[scheduleIdentifier];
        if (scheduleId) {
            link = (
                <a
                  href={`#schedule-${scheduleId}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectItem({ type: 'schedule', id: scheduleId });
                  }}
                  className="text-green-700 dark:text-green-400 hover:underline font-semibold"
                >
                  <Highlight text={matchedText} highlight={highlight} />
                </a>
            );
        }
    }

    if (link) {
      elements.push(<React.Fragment key={`match-${match.index}`}>{link}</React.Fragment>);
    } else {
      elements.push(<Highlight key={`match-${match.index}`} text={matchedText} highlight={highlight} />);
    }

    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    elements.push(
      <Highlight key={`text-${lastIndex}`} text={text.substring(lastIndex)} highlight={highlight} />
    );
  }

  return <>{elements}</>;
};

export default ContentRenderer;