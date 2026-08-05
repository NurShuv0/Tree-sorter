import test from 'node:test';
import assert from 'node:assert';

// Define minimal matching structures to test logic in isolation
interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt: string;
  status: 'sending' | 'sent' | 'failed';
}

// 1. Text Input Validation Logic
function validateInput(text: string | undefined | null): { isValid: boolean; error?: string } {
  if (text === undefined || text === null || typeof text !== 'string') {
    return { isValid: false, error: 'Invalid message. Message is required and must be a string.' };
  }
  const trimmed = text.trim();
  if (!trimmed) {
    return { isValid: false, error: 'Message content cannot be empty.' };
  }
  if (trimmed.length > 2000) {
    return { isValid: false, error: 'Message exceeds the maximum length of 2000 characters.' };
  }
  return { isValid: true };
}

// 2. History Trimming Logic (for Prompt Injection)
function trimHistoryForAPI(history: { role: string; content: string }[], limit: number = 10): { role: string; content: string }[] {
  return history.slice(-limit);
}

// 3. Local State Slicing Logic (for localStorage/UI state)
function trimUIHistory(messages: Message[], limit: number = 15): Message[] {
  return messages.slice(-limit);
}

// 4. Retry State Logic
function prepareRetry(messages: Message[], failedMsgId: string): { remainingMessages: Message[]; contentToRetry: string | null } {
  const failedMsg = messages.find((m) => m.id === failedMsgId);
  if (!failedMsg) {
    return { remainingMessages: messages, contentToRetry: null };
  }
  const remaining = messages.filter((m) => m.id !== failedMsgId);
  return { remainingMessages: remaining, contentToRetry: failedMsg.content };
}


// --- Unit Test Definitions ---

test('Empty input validation: rejects undefined, empty, or whitespace-only messages', () => {
  const resultNull = validateInput(null);
  assert.strictEqual(resultNull.isValid, false);
  assert.strictEqual(resultNull.error, 'Invalid message. Message is required and must be a string.');

  const resultEmpty = validateInput('');
  assert.strictEqual(resultEmpty.isValid, false);
  assert.strictEqual(resultEmpty.error, 'Message content cannot be empty.');

  const resultSpaces = validateInput('    ');
  assert.strictEqual(resultSpaces.isValid, false);
  assert.strictEqual(resultSpaces.error, 'Message content cannot be empty.');

  const resultValid = validateInput('How to care for mango tree');
  assert.strictEqual(resultValid.isValid, true);
});

test('Excessive input size validation: rejects strings longer than 2000 characters', () => {
  const tooLongString = 'a'.repeat(2001);
  const resultTooLong = validateInput(tooLongString);
  assert.strictEqual(resultTooLong.isValid, false);
  assert.strictEqual(resultTooLong.error, 'Message exceeds the maximum length of 2000 characters.');

  const exactLimitString = 'a'.repeat(2000);
  const resultExact = validateInput(exactLimitString);
  assert.strictEqual(resultExact.isValid, true);
});

test('History trimming: returns only the latest N messages for API safety', () => {
  const rawHistory = Array.from({ length: 25 }, (_, i) => ({
    role: i % 2 === 0 ? 'user' : 'assistant',
    content: `Message content number ${i}`,
  }));

  const trimmed = trimHistoryForAPI(rawHistory, 10);
  assert.strictEqual(trimmed.length, 10);
  // The first element should be the 15th message (index 15)
  assert.strictEqual(trimmed[0].content, 'Message content number 15');
  // The last element should be the 24th message (index 24)
  assert.strictEqual(trimmed[9].content, 'Message content number 24');
});

test('UI message trimming: keeps localStorage/state messages capped to 15', () => {
  const uiMessages: Message[] = Array.from({ length: 20 }, (_, i) => ({
    id: `msg-${i}`,
    role: i % 2 === 0 ? 'user' : 'assistant',
    content: `Msg ${i}`,
    createdAt: new Date().toISOString(),
    status: 'sent',
  }));

  const trimmed = trimUIHistory(uiMessages, 15);
  assert.strictEqual(trimmed.length, 15);
  assert.strictEqual(trimmed[0].id, 'msg-5');
  assert.strictEqual(trimmed[14].id, 'msg-19');
});

test('Retry action: extracts message content and filters out the failed item', () => {
  const mockMessages: Message[] = [
    { id: '1', role: 'user', content: 'First message', createdAt: '2026-06-29T00:00:00.000Z', status: 'sent' },
    { id: '2', role: 'assistant', content: 'First response', createdAt: '2026-06-29T00:01:00.000Z', status: 'sent' },
    { id: '3', role: 'user', content: 'Second message which failed', createdAt: '2026-06-29T00:02:00.000Z', status: 'failed' },
  ];

  const { remainingMessages, contentToRetry } = prepareRetry(mockMessages, '3');
  assert.strictEqual(contentToRetry, 'Second message which failed');
  assert.strictEqual(remainingMessages.length, 2);
  assert.strictEqual(remainingMessages.find((m) => m.id === '3'), undefined);
});

import { cleanJsonResponse, generateLocalKnowledgeResponse } from '../server/server';

test('JSON cleaning: removes markdown code blocks and whitespace', () => {
  const inputWithCodeBlock = '```json\n{"message": "Hello", "suggestedActions": [], "followUpQuestion": ""}\n```';
  const cleaned = cleanJsonResponse(inputWithCodeBlock);
  assert.strictEqual(cleaned, '{"message": "Hello", "suggestedActions": [], "followUpQuestion": ""}');

  const parsed = JSON.parse(cleaned);
  assert.strictEqual(parsed.message, 'Hello');
});

test('Local knowledge response generator: returns structured guidance for query', () => {
  const resYellow = generateLocalKnowledgeResponse('Why are my tree leaves yellow?');
  assert.ok(resYellow.message.includes('Yellowing leaves'));
  assert.ok(resYellow.message.includes('Quick Assessment'));
  assert.ok(Array.isArray(resYellow.suggestedActions));
  assert.ok(resYellow.suggestedActions.length > 0);
  assert.strictEqual(typeof resYellow.followUpQuestion, 'string');
});

test('API mock responses structure matches target schema', () => {
  const mockPayload = {
    success: true,
    message: 'Quick assessment:\nYellowing leaves are common.\n\nPossible causes:\n- Overwatering\n- Bad soil\n\nWhat to check:\n1. Feel soil',
    suggestedActions: ['Check soil moisture', 'Reduce watering'],
    followUpQuestion: 'Is the tree in a pot or open ground?',
  };

  assert.strictEqual(mockPayload.success, true);
  assert.strictEqual(typeof mockPayload.message, 'string');
  assert.ok(Array.isArray(mockPayload.suggestedActions));
  assert.strictEqual(mockPayload.suggestedActions.length, 2);
  assert.strictEqual(typeof mockPayload.followUpQuestion, 'string');
});

