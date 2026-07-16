export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string; // ISO string representing message timestamp
  suggestedActions?: string[]; // Recommended follow-up actions/chips
  followUpQuestion?: string; // Single focused follow-up question
  status: 'sending' | 'sent' | 'failed';
}

export interface ChatState {
  messages: Message[];
  isThinking: boolean;
  error: string | null;
}

export interface ChatAPIResponse {
  success: boolean;
  message: string;
  suggestedActions?: string[];
  followUpQuestion?: string;
}
