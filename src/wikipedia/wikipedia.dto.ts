import { createZodDto, zodToOpenAPI } from 'nestjs-zod';
import { z } from 'zod';

const wikipediaSearchDtoSchema = z.object({
  text: z.string().describe('The text to type'),
});

export class WikipediaSearchDto extends createZodDto(
  wikipediaSearchDtoSchema,
) {}
export const WikipediaSearchApiDto = zodToOpenAPI(
  wikipediaSearchDtoSchema,
) as any;
