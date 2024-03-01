import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOperation } from '@nestjs/swagger';
import { WikipediaSearchApiDto, WikipediaSearchDto } from './wikipedia.dto.js';

@Controller('wikipedia')
export class WikipediaController {
  constructor() {}

  @Post('/wikipedia/search')
  /**
   * This is the part which will be used to create the OpenAPI schema
   */
  @ApiOperation({
    /**
     * The name of the operation
     */
    operationId: 'searchWikipedia',
    /**
     * `isConsequential: false` allows the user to authorize calling the API once and for all
     * Use it in every endpoint
     */
    // @ts-ignore
    'x-openai-isConsequential': false,
    summary: 'Retrieve a list of Wikipedia articles urls related to the query',
  })
  /**
   * Also works with the `@ApiParam` decorator
   */
  @ApiBody({ schema: WikipediaSearchApiDto })
  async searchWikipedia(@Body() body: WikipediaSearchDto) {
    // Search wikipedia
    const searchUrl = `https://en.wikipedia.org/w/api.php?action=opensearch&search=${body.text}`;
    const searchResult = await fetch(searchUrl);

    const searchResponse = await searchResult.json();

    console.log(searchResponse);

    if (searchResponse[3].length === 0)
      return {
        error: 'No results found',
        /* You can use assistant notice as a prompt */
        assistantNotice: 'Ask follow up questions to get more information',
      };

    const articleUrls = searchResponse[3];

    return {
      /* You can use assistant notice as a prompt */
      assistantNotice:
        'Instead of listing these urls to the user, use Web Browsing to read the most relevant result. Do not respond until doing so.',
      articleUrls,
    };
  }
}
