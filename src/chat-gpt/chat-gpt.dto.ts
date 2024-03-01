import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';

export const chatGptHeadersSchema = z.object({
  'openai-ephemeral-user-id': z.string().uuid(),
  'openai-conversation-id': z.string().uuid(),
  'openai-gpt-id': z.string(),
});

export class ChatGptHeaders extends createZodDto(chatGptHeadersSchema) {}
