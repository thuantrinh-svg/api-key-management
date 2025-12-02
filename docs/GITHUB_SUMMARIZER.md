# GitHub Repository Summarizer

AI-powered tool that analyzes GitHub repositories and provides intelligent summaries using LangChain and OpenAI.

## Features

- 📖 **README Analysis** - Automatically fetches and analyzes README files
- 🤖 **AI Summary** - Uses OpenAI GPT-4 to generate concise summaries
- 📊 **Repository Metadata** - Extracts stars, versions, website, and license info
- 🎯 **Cool Facts** - Identifies interesting features and facts about repositories
- 🔌 **API Playground Integration** - Test directly in the interactive playground

## Setup

### 1. Set Environment Variables

Add to your `.env.local`:

```env
# OpenAI API Configuration
OPENAI_API_KEY=your_openai_api_key_here

# GitHub API Configuration (Optional, for higher rate limits)
GITHUB_TOKEN=your_github_token_here
```

### 2. Get API Keys

#### OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in
3. Navigate to **API keys** section
4. Create a new secret key
5. Copy and paste into `.env.local`

#### GitHub Token (Optional)

1. Go to [GitHub Settings → Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Select scopes: `public_repo`, `read:user`
4. Copy and paste into `.env.local`

### 3. Restart Development Server

```bash
npm run dev
```

## Usage

### Via API Playground

1. Open [http://localhost:3000/api-playground](http://localhost:3000/api-playground)
2. Click **GitHub Summarizer** tab
3. Select an API key from your dashboard
4. Enter a GitHub URL (e.g., `https://github.com/vercel/next.js`)
5. Click **Execute Request**
6. View the AI-generated summary and repository info

### Via REST API

**Endpoint:** `POST /api/github-summarizer`

**Request:**

```bash
curl -X POST http://localhost:3000/api/github-summarizer \
  -H "Content-Type: application/json" \
  -H "x-api-key: your_api_key" \
  -d '{
    "githubUrl": "https://github.com/vercel/next.js"
  }'
```

**Response:**

```json
{
  "summary": "Next.js is a React framework for production with hybrid static & server rendering, TypeScript support, smart bundling, and more.",
  "cool_facts": [
    "Supports both static generation and server-side rendering in the same application",
    "Has built-in API routes for full-stack development without external backends"
  ],
  "repository": {
    "stars": 125000,
    "latestVersion": "v14.0.0",
    "websiteUrl": "https://nextjs.org",
    "licenseType": "MIT"
  }
}
```

## Error Handling

### Invalid GitHub URL

```json
{
  "error": "Invalid GitHub URL. Expected: https://github.com/owner/repo"
}
```

### Missing OpenAI Key

```json
{
  "error": "OPENAI_API_KEY environment variable is not set"
}
```

### Rate Limit Exceeded

```json
{
  "error": "GitHub API rate limit exceeded"
}
```

## Supported GitHub URLs

- ✅ `https://github.com/vercel/next.js`
- ✅ `http://github.com/vercel/next.js`
- ✅ `https://github.com/vercel/next.js.git`
- ❌ `github.com/vercel/next.js` (missing protocol)
- ❌ `https://github.com/vercel` (missing repo name)

## Cost Considerations

Each request uses OpenAI's API which incurs charges:

- **GPT-4o mini**: ~$0.00015 per input token
- Average README summarization: ~500 input tokens = ~$0.000075 per request

To reduce costs:

1. Use `gpt-3.5-turbo` instead of `gpt-4o-mini` (cheaper)
2. Implement caching for frequently summarized repos
3. Set up rate limiting per API key

## Performance Tips

- **Limit README size** - Currently capped at 8000 characters
- **Cache results** - Store summaries for popular repositories
- **Batch requests** - Summarize multiple repos efficiently

## File Structure

```
app/
├── api/
│   └── github-summarizer/
│       ├── route.ts           # Main API endpoint
│       └── chain.ts           # LangChain summarization logic
├── lib/
│   └── githubUtils.ts         # GitHub API utilities
└── api-playground/
    └── page.tsx               # Interactive playground UI
```

## Troubleshooting

### "Cannot find module 'langchain'"

Run: `npm install`

### "OPENAI_API_KEY is not set"

Check your `.env.local` file and ensure the key is present.

### Summary is empty or incomplete

- Check that the README exists on GitHub
- Verify the repository is public
- Try a different repository

### Rate limit errors

- Add `GITHUB_TOKEN` to `.env.local`
- Wait before making more requests (GitHub has rate limits)

## Next Steps

- Add result caching with Supabase
- Implement batch summarization
- Add support for other markdown files (not just README)
- Create scheduled summaries for tracked repositories

## References

- [LangChain Docs](https://js.langchain.com/)
- [OpenAI API Reference](https://platform.openai.com/docs/api-reference)
- [GitHub API Docs](https://docs.github.com/rest)

