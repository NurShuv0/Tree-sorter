import React from 'react';
import { Bot, Leaf, RefreshCcw, Sparkles, User, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Message } from './types';

// Supported prompt chips in EmptyState
export const SUGGESTED_PROMPT_CHIPS = [
  'Why are my leaves turning yellow?',
  'How often should I water this tree?',
  'What disease might affect this tree?',
  'How can I improve soil quality?',
  'What tree is best for my garden?',
];

// Helper to format ISO strings into localized time (e.g., "12:34 PM")
export function formatTime(isoString: string): string {
  try {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return '';
  }
}

// Lightweight parser to render simple Markdown (bold, headers, bullet/ordered lists, spacing)
export function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: { type: 'ul' | 'ol'; items: React.ReactNode[] } | null = null;

  const flushList = (key: string) => {
    if (currentList) {
      if (currentList.type === 'ul') {
        elements.push(
          <ul key={`ul-${key}`} className="my-2 space-y-1 pl-5 list-disc text-sm text-muted-foreground">
            {currentList.items}
          </ul>
        );
      } else {
        elements.push(
          <ol key={`ol-${key}`} className="my-2 space-y-1 pl-5 list-decimal text-sm text-muted-foreground">
            {currentList.items}
          </ol>
        );
      }
      currentList = null;
    }
  };

  lines.forEach((line, index) => {
    // Trim but preserve formatting check
    const trimmed = line.trim();

    // Bold formatting parser
    let content: React.ReactNode = line;
    const boldRegex = /\*\*(.*?)\*\*/g;
    if (line.includes('**')) {
      const parts = line.split(boldRegex);
      content = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="font-semibold text-foreground">{part}</strong>;
        }
        return part;
      });
    }

    // 1. Unordered lists: starting with "* " or "- "
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const cleanText = line.replace(/^[\s*-]+/, '').trim();
      const boldCleanText = cleanText.includes('**') ? (
        cleanText.split(boldRegex).map((part, pIdx) => {
          if (pIdx % 2 === 1) return <strong key={pIdx} className="font-semibold text-foreground">{part}</strong>;
          return part;
        })
      ) : cleanText;

      if (!currentList || currentList.type !== 'ul') {
        flushList(`flush-${index}`);
        currentList = { type: 'ul', items: [] };
      }
      currentList.items.push(
        <li key={`li-${index}`} className="leading-relaxed">
          {boldCleanText}
        </li>
      );
      return;
    }

    // 2. Ordered lists: starting with digits "1. ", "2. ", etc.
    const orderedListRegex = /^(\d+)\.\s(.*)/;
    const orderedMatch = line.match(orderedListRegex);
    if (orderedMatch) {
      const listText = orderedMatch[2].trim();
      const boldListText = listText.includes('**') ? (
        listText.split(boldRegex).map((part, pIdx) => {
          if (pIdx % 2 === 1) return <strong key={pIdx} className="font-semibold text-foreground">{part}</strong>;
          return part;
        })
      ) : listText;

      if (!currentList || currentList.type !== 'ol') {
        flushList(`flush-${index}`);
        currentList = { type: 'ol', items: [] };
      }
      currentList.items.push(
        <li key={`li-${index}`} className="leading-relaxed">
          {boldListText}
        </li>
      );
      return;
    }

    // Not a list item, so flush any active list first
    flushList(`flush-nonlist-${index}`);

    // 3. Headers: starting with ### or ## or #
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h4 key={index} className="text-sm font-semibold text-foreground mt-3 mb-1">
          {trimmed.substring(4)}
        </h4>
      );
    } else if (trimmed.startsWith('## ')) {
      elements.push(
        <h3 key={index} className="text-base font-semibold text-foreground mt-4 mb-1.5">
          {trimmed.substring(3)}
        </h3>
      );
    } else if (trimmed.startsWith('# ')) {
      elements.push(
        <h2 key={index} className="text-lg font-bold text-foreground mt-4 mb-2">
          {trimmed.substring(2)}
        </h2>
      );
    } else if (trimmed === '') {
      // 4. Empty spacer
      elements.push(<div key={index} className="h-2" />);
    } else {
      // 5. Normal paragraphs
      elements.push(
        <p key={index} className="text-sm leading-relaxed text-foreground my-1">
          {content}
        </p>
      );
    }
  });

  // Flush any trailing list
  if (currentList) {
    flushList('final');
  }

  return <div className="space-y-1">{elements}</div>;
}

// 1. EmptyState Component
interface EmptyStateProps {
  onChipClick: (question: string) => void;
  disabled: boolean;
}

export function EmptyState({ onChipClick, disabled }: EmptyStateProps) {
  return (
    <div className="flex min-h-[430px] flex-col items-center justify-center px-2 text-center sm:px-10">
      <div className="relative mb-5 flex size-20 items-center justify-center rounded-[2.2rem] border border-primary/20 bg-primary/10 text-primary shadow-sm">
        <Leaf className="size-9" />
        <div className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full border border-primary/20 bg-card text-primary shadow-md">
          <Bot className="size-4" />
        </div>
      </div>
      <h3 className="text-xl font-semibold text-foreground">How can I help your garden today?</h3>
      <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
        Ask about tree care, leaf symptoms, soil, watering, sunlight, pruning, seasons, or disease prevention.
      </p>
      <div className="mt-6 flex max-w-xl flex-wrap justify-center gap-2">
        {SUGGESTED_PROMPT_CHIPS.map((question) => (
          <Button
            key={question}
            type="button"
            variant="outline"
            size="sm"
            onClick={() => onChipClick(question)}
            disabled={disabled}
            className="h-auto max-w-full whitespace-normal px-3 py-2 text-left text-xs transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
          >
            {question}
          </Button>
        ))}
      </div>
    </div>
  );
}

// 2. MessageItem Component
interface MessageItemProps {
  message: Message;
  onRetry: () => void;
}

export function MessageItem({ message, onRetry }: MessageItemProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
      className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : 'items-start'}`}
    >
      {isAssistant && (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-primary/12 text-primary shadow-sm mt-0.5">
          <Bot className="size-4" />
        </div>
      )}

      <div className={`max-w-[88%] sm:max-w-[78%] flex flex-col ${message.role === 'user' ? 'items-end' : 'items-start'}`}>
        <div
          className={
            message.role === 'user'
              ? 'rounded-2xl rounded-tr-sm bg-primary px-4 py-3 text-sm leading-relaxed text-primary-foreground shadow-sm'
              : 'rounded-2xl rounded-tl-sm border border-border/80 bg-card px-4 py-3 text-sm leading-relaxed text-foreground shadow-sm'
          }
        >
          {isAssistant ? (
            renderMarkdown(message.content)
          ) : (
            <p className="whitespace-pre-wrap">{message.content}</p>
          )}
        </div>

        {/* Message metadata (timestamp, status, retry button) */}
        <div className="mt-1 flex items-center gap-2 px-1 text-[10px] text-muted-foreground">
          <span>{formatTime(message.createdAt)}</span>
          {message.status === 'sending' && (
            <span className="flex items-center gap-1">
              <span className="inline-block size-1.5 animate-ping rounded-full bg-primary" />
              Sending...
            </span>
          )}
          {message.status === 'failed' && (
            <button
              onClick={onRetry}
              className="flex items-center gap-1 font-semibold text-destructive hover:underline focus:outline-none"
              aria-label="Retry failed message"
            >
              <RefreshCcw className="size-3" />
              Retry failed sending
            </button>
          )}
        </div>
      </div>

      {!isAssistant && (
        <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-secondary/15 text-primary shadow-sm mt-0.5">
          <User className="size-4" />
        </div>
      )}
    </motion.div>
  );
}

// 3. TypingIndicator Component
export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      className="flex items-start gap-3"
      aria-live="polite"
    >
      <div className="flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/10 bg-primary/12 text-primary shadow-sm">
        <Bot className="size-4" />
      </div>
      <div className="rounded-2xl rounded-tl-sm border bg-muted/40 px-4 py-3 text-sm text-muted-foreground shadow-sm">
        <div className="flex items-center gap-2">
          <span>Tree Sorter AI is thinking</span>
          <span className="flex items-center gap-1" aria-label="Loading">
            {[0, 1, 2].map((dot) => (
              <motion.span
                key={dot}
                className="size-1.5 rounded-full bg-primary"
                animate={{ y: [0, -3, 0], opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: dot * 0.12 }}
              />
            ))}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// 4. SuggestedActions Component
interface SuggestedActionsProps {
  suggestedActions: string[];
  followUpQuestion?: string;
  onActionClick: (action: string) => void;
  disabled: boolean;
}

export function SuggestedActions({
  suggestedActions,
  followUpQuestion,
  onActionClick,
  disabled,
}: SuggestedActionsProps) {
  if ((!suggestedActions || suggestedActions.length === 0) && !followUpQuestion) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 space-y-3 rounded-2xl border border-primary/10 bg-primary/[0.02] p-4"
    >
      {followUpQuestion && (
        <p className="text-xs font-semibold text-primary/90 flex items-center gap-1.5">
          <Sparkles className="size-3.5" />
          Follow-up: {followUpQuestion}
        </p>
      )}

      {suggestedActions && suggestedActions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {suggestedActions.map((action) => (
            <Button
              key={action}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => onActionClick(action)}
              disabled={disabled}
              className="h-auto max-w-full whitespace-normal border-primary/20 bg-background px-3 py-1.5 text-left text-xs leading-normal text-muted-foreground hover:border-primary/50 hover:bg-primary/5 active:scale-[0.98] transition-all"
            >
              {action}
            </Button>
          ))}
        </div>
      )}
    </motion.div>
  );
}
