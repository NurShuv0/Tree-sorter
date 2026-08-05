import { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams } from 'react-router';
import {
  AlertCircle,
  Bot,
  Paperclip,
  RefreshCcw,
  Send,
  Sparkles,
  Sprout,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ScrollArea } from '../components/ui/scroll-area';
import { Separator } from '../components/ui/separator';
import { Textarea } from '../components/ui/textarea';

// Custom Chat Hooks and Components
import { Message } from '../components/chat/types';
import {
  MessageItem,
  TypingIndicator,
  EmptyState,
  SuggestedActions,
} from '../components/chat/ChatComponents';

export function TreeAssistantPage() {
  const [searchParams] = useSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);
  
  const pendingQuestion = useMemo(() => searchParams.get('question')?.trim() ?? '', [searchParams]);

  // Load chat history from localStorage on initial render
  useEffect(() => {
    try {
      const storedHistory = localStorage.getItem('tree_sorter_chat_history');
      if (storedHistory) {
        setMessages(JSON.parse(storedHistory));
      }
    } catch (err) {
      console.error('Error loading chat history from localStorage:', err);
    }
  }, []);

  // Autofill query from search params if provided
  useEffect(() => {
    if (pendingQuestion) {
      setInput(pendingQuestion);
    }
  }, [pendingQuestion]);

  // Keep scroll focused on the latest messages or typing state
  useEffect(() => {
    // Scroll anchor focus
    const timer = setTimeout(() => {
      scrollAnchorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, 100);
    return () => clearTimeout(timer);
  }, [messages, isThinking]);

  // Save history to localStorage helper
  const saveHistory = (updatedMessages: Message[]) => {
    try {
      localStorage.setItem('tree_sorter_chat_history', JSON.stringify(updatedMessages));
    } catch (err) {
      console.error('Error saving chat history to localStorage:', err);
    }
  };

  // Perform backend API calling
  const performSendMessage = async (textToSend: string) => {
    const text = textToSend.trim();
    if (!text || isThinking) return;

    // Check offline status
    if (!navigator.onLine) {
      toast.error('Offline Mode: Please check your internet connection.');
      const offlineMsgId = `offline-${Date.now()}`;
      const failedMessage: Message = {
        id: offlineMsgId,
        role: 'user',
        content: text,
        createdAt: new Date().toISOString(),
        status: 'failed',
      };
      setMessages((prev) => {
        const updated = [...prev, failedMessage];
        saveHistory(updated);
        return updated;
      });
      return;
    }

    const userMessageId = `user-${Date.now()}`;
    const userMsg: Message = {
      id: userMessageId,
      role: 'user',
      content: text,
      createdAt: new Date().toISOString(),
      status: 'sending',
    };

    setMessages((prev) => {
      const updated = [...prev, userMsg];
      saveHistory(updated);
      return updated;
    });
    setInput('');
    setIsThinking(true);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 300000); // 5-minute timeout

    try {
      // Filter out unsent/failed messages from history to keep it clean
      // Trim to last 10 messages for prompt history trimming
      const cleanHistory = messages
        .filter((m) => m.status === 'sent')
        .slice(-10)
        .map((m) => ({
          role: m.role,
          content: m.content,
        }));

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text,
          history: cleanHistory,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        let serverMsg = `Server returned HTTP ${response.status}`;
        try {
          const errBody = await response.json();
          if (errBody?.message) serverMsg = errBody.message;
        } catch { /* ignore parse errors */ }
        throw new Error(serverMsg);
      }

      const data = await response.json();
      if (!data.success) {
        throw new Error(data.message || 'API responded with success: false');
      }

      setMessages((prev) => {
        // Mark user message as sent
        const updatedUserMsgs = prev.map((m) =>
          m.id === userMessageId ? { ...m, status: 'sent' as const } : m
        );

        // Add assistant response
        const assistantMsg: Message = {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: data.message,
          createdAt: new Date().toISOString(),
          suggestedActions: data.suggestedActions || [],
          followUpQuestion: data.followUpQuestion || '',
          status: 'sent',
        };

        // Keep local message state trimmed to latest 15 messages safely
        const nextMessages = [...updatedUserMsgs, assistantMsg].slice(-15);
        saveHistory(nextMessages);
        return nextMessages;
      });
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error('Error contacting Tree Assistant API:', err);
      toast.error(err?.message || 'Could not reach the assistant. Please try again.');

      setMessages((prev) => {
        const updated = prev.map((m) =>
          m.id === userMessageId ? { ...m, status: 'failed' as const } : m
        );
        saveHistory(updated);
        return updated;
      });
    } finally {
      setIsThinking(false);
    }
  };

  const handleSend = () => {
    performSendMessage(input);
  };

  // Keyboard handlers: Enter to send, Shift+Enter for newline
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleSend();
    }
  };

  // Retry sending a message that previously failed
  const handleRetry = async (failedMsgId: string) => {
    const failedMsg = messages.find((m) => m.id === failedMsgId);
    if (!failedMsg) return;

    // Filter out the failed message and re-trigger send flow
    setMessages((prev) => prev.filter((m) => m.id !== failedMsgId));
    await performSendMessage(failedMsg.content);
  };

  // Safe confirm-before-clear conversation behavior
  const handleClearConversation = () => {
    if (messages.length === 0) {
      toast.info('No message history to clear.');
      return;
    }

    const confirmed = window.confirm('Are you sure you want to clear this conversation? This will delete all history.');
    if (confirmed) {
      setMessages([]);
      localStorage.removeItem('tree_sorter_chat_history');
      setInput('');
      setIsThinking(false);
      toast.success('Conversation reset successfully.');
    }
  };

  // Find the last assistant message to retrieve suggested actions/follow-up questions
  const lastAssistantMessage = useMemo(() => {
    const reversed = [...messages].reverse();
    return reversed.find((m) => m.role === 'assistant');
  }, [messages]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/5 via-background to-background">
      <div className="container mx-auto px-4 py-8 sm:py-12">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-8 max-w-3xl"
        >
          <Badge variant="secondary" className="mb-3 gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20">
            <Sparkles className="size-3.5" />
            AI Tree Assistant
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">AI Tree Guide</h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Ask questions about tree identification, care tips, disease diagnosis, pest control, seasonal guidance, and soil enhancement.
          </p>
        </motion.div>

        {/* Workspace Layout */}
        <div className="grid items-start gap-6 xl:grid-cols-[minmax(280px,0.72fr)_minmax(0,1.55fr)]">
          
          {/* Side Info Panel */}
          <motion.aside
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.05 }}
            className="space-y-5"
          >
            <Card className="overflow-hidden border-primary/15 shadow-sm">
              <CardHeader className="gap-3">
                <div className="flex size-11 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <Sprout className="size-5" />
                </div>
                <div>
                  <CardTitle className="text-xl font-semibold">Your Gardening Assistant</CardTitle>
                  <CardDescription className="mt-2 text-sm leading-6">
                    Get quick, practical guidance for tree care, pest identification, and soil wellness.
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Separator className="mb-5" />
                <p className="mb-3 text-sm font-medium text-foreground">Suggested Topics to Ask</p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs py-1 px-2.5 bg-background">Leaf discoloration</Badge>
                  <Badge variant="outline" className="text-xs py-1 px-2.5 bg-background">Watering & Drainage</Badge>
                  <Badge variant="outline" className="text-xs py-1 px-2.5 bg-background">Pest treatments</Badge>
                  <Badge variant="outline" className="text-xs py-1 px-2.5 bg-background">Seasonal tree care</Badge>
                  <Badge variant="outline" className="text-xs py-1 px-2.5 bg-background">Soil enrichment</Badge>
                  <Badge variant="outline" className="text-xs py-1 px-2.5 bg-background">Arborist consults</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-primary/10 bg-primary/[0.045] shadow-none">
              <CardContent className="pt-6">
                <div className="flex gap-3">
                  <AlertCircle className="mt-0.5 size-4 shrink-0 text-primary" />
                  <p className="text-sm leading-6 text-muted-foreground">
                    Tree Assistant guidance offers recommendations for plant care. Consult a local certified arborist or nursery expert for structural issues or severe outbreaks.
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.aside>

          {/* Main Chat Interface */}
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 }}
          >
            <Card className="min-h-[650px] flex flex-col overflow-hidden border-primary/15 shadow-lg shadow-primary/5">
              
              {/* Chat Title bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b px-5 py-4 sm:px-6 bg-card/50">
                <div className="flex items-center gap-3">
                  <div className="flex size-11 items-center justify-center rounded-full bg-primary/12 text-primary border border-primary/10">
                    <Bot className="size-5" />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-semibold text-foreground">Tree Sorter AI Assistant</h2>
                      <Badge variant="secondary" className="gap-1 border border-primary/15 bg-primary/10 text-primary hover:bg-primary/10">
                        <span className="size-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
                        Online
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-muted-foreground text-left">Grounded plant diagnosis &amp; guidance</p>
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleClearConversation}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  aria-label="Clear conversation history"
                >
                  <RefreshCcw className="size-4" />
                  Clear chat
                </Button>
              </div>

              {/* Message scroll container */}
              <ScrollArea className="flex-1 h-[460px] sm:h-[500px]">
                <div className="min-h-full px-4 py-5 sm:px-6">
                  {messages.length === 0 ? (
                    <EmptyState
                      onChipClick={performSendMessage}
                      disabled={isThinking}
                    />
                  ) : (
                    <div className="space-y-6">
                      <AnimatePresence initial={false}>
                        {messages.map((message) => (
                          <MessageItem
                            key={message.id}
                            message={message}
                            onRetry={() => handleRetry(message.id)}
                          />
                        ))}
                        {isThinking && <TypingIndicator />}
                      </AnimatePresence>

                      {/* Display suggested follow-ups for the latest assistant message only */}
                      {!isThinking &&
                        lastAssistantMessage &&
                        lastAssistantMessage.id === messages[messages.length - 1].id && (
                          <SuggestedActions
                            suggestedActions={lastAssistantMessage.suggestedActions || []}
                            followUpQuestion={lastAssistantMessage.followUpQuestion}
                            onActionClick={performSendMessage}
                            disabled={isThinking}
                          />
                        )}

                      <div ref={scrollAnchorRef} />
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Chat Input form */}
              <div className="border-t bg-card/95 p-4 backdrop-blur sm:p-5 mt-auto">
                <div className="rounded-xl border bg-background p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring/40">
                  <Textarea
                    aria-label="Ask Tree Sorter AI a gardening question"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about leaves turning yellow, watering lemon trees, pests, soils..."
                    rows={2}
                    className="min-h-[56px] border-0 bg-transparent px-2 py-1 shadow-none focus-visible:ring-0 resize-none"
                    disabled={isThinking}
                  />
                  <div className="flex items-center justify-between gap-3 px-1 pb-1 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => toast.info('Photo chat analysis will be available in a future update.')}
                      aria-label="Photo chat analysis coming soon"
                      title="Photo chat analysis coming soon"
                      className="text-muted-foreground"
                    >
                      <Paperclip className="size-4" />
                    </Button>
                    <div className="flex items-center gap-3">
                      <span className="hidden text-xs text-muted-foreground sm:inline">Enter to send · Shift + Enter for newline</span>
                      <Button
                        type="button"
                        size="icon"
                        onClick={handleSend}
                        disabled={!input.trim() || isThinking}
                        aria-label="Send message"
                        className="bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Send className="size-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Grounded in Tree Sorter knowledge. Please verify important actions with local gardening extension offices.
                </p>
              </div>
            </Card>
          </motion.section>
        </div>
      </div>
    </main>
  );
}
