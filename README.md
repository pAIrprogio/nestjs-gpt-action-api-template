# NestJS GPT Action API Template

![Social Image with alt text](./docs/social.jpg 'Logo for this boilerplate project to quickly launch a NestJS powered API for ChatGPT actions')

## Installation

```bash
git clone https://github.com/pairprog/nestjs-gpt-action-template.git
cd nestjs-gpt-action-template
pnpm install
cp .env.example .env
```

## Configure

- In [package.json](./package.json) `> scripts > tunnel` , change `domain_name` with yours
- In [.env](./.env)
  - Change `BASE_URL` with yours
  - (_Not required_) Set `SENTRY_DSN` to enable Sentry error reporting
- In [main.ts](./src/main.ts)
  - Set the `Title` and `Description` of the API

## Run Locally

```bash
pnpm run tunnel
```

And in another terminal window

```bash
pnpm run start:dev
# or
pnpm run start:debug
```

- The OpenAPI schema's URL will be shown in the terminal window in blue.
  - Copy it
  - In "actions" section of your GPT app:
    - Click "Create New Action"
    - Click on "Import from URL"
    - Paste the URL.
    - Click "Import"

## Add an action

- Look at [wikipedia.controller.ts](./src/wikipedia/wikipedia.controller.ts) and [wikipedia.dto.ts](./src/wikipedia/wikipedia.dto.ts) to see how to add a new action

## Other

### OpenAI specific headers

OpenAI provides identifying information with each query. You can access them in routes using the [ChatGptHeaders](./src/chat-gpt/chat-gpt.dto.ts) decorator

```ts
@Post('/my/path')
function myPath(@ChatGptHeaders() headers: ChatGptHeaders) {
  // ...
}
```
