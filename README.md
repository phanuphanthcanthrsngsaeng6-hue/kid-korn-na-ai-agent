<a href="https://chatbot.ai-sdk.dev/demo">
  <img alt="AI Builder" src="app/(chat)/opengraph-image.png">
  <h1 align="center">AI Builder</h1>
</a>

<p align="center">
    AI Builder is a focused workspace for turning ideas into polished, editable web experiences with AI-assisted generation, live preview, and production-ready code.
</p>

<p align="center">
  <a href="https://chatbot.ai-sdk.dev/docs"><strong>Read Docs</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-providers"><strong>Model Providers</strong></a> ·
  <a href="#deploy-your-own"><strong>Deploy Your Own</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a>
</p>
<br/>

## AI Builder workspace

The main workspace turns the starter chatbot shell into an AI Builder canvas. Describe a change in natural language, switch between a live preview and generated code, compare desktop/tablet/mobile breakpoints, choose a starter template, and tune the site title, primary color, typeface, and corner style from the inspector.

The current builder ships with three ready-to-edit starting points: Launchpad for SaaS pages, Atelier for creative portfolios, and Goodfolk for boutique storefronts. The prompt composer provides a lightweight generation loop with visible build status, change count, code copy, and `.tsx` download actions. It is intentionally dependency-free and uses the existing Next.js, Tailwind CSS, and Lucide setup.

## Features

- [Next.js](https://nextjs.org) App Router
  - Advanced routing for seamless navigation and performance
  - React Server Components (RSCs) and Server Actions for server-side rendering and increased performance
- [AI SDK](https://ai-sdk.dev/docs/introduction)
  - Unified API for generating text, structured objects, and tool calls with LLMs
  - Hooks for building dynamic chat and generative user interfaces
  - Supports OpenAI, Anthropic, Google, xAI, and other model providers via AI Gateway
- [shadcn/ui](https://ui.shadcn.com)
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Component primitives from [Radix UI](https://radix-ui.com) for accessibility and flexibility
- Data Persistence
  - [Neon Serverless Postgres](https://vercel.com/marketplace/neon) for saving chat history and user data
  - [Vercel Blob](https://vercel.com/storage/blob) for efficient file storage
- [Auth.js](https://authjs.dev)
  - Simple and secure authentication

## Model Providers

This template uses the [Vercel AI Gateway](https://vercel.com/docs/ai-gateway) to access multiple AI models through a unified interface. Models are configured in `lib/ai/models.ts` with per-model provider routing. Included models: Mistral, Moonshot, DeepSeek, OpenAI, and xAI.

### AI Gateway Authentication

**For Vercel deployments**: Authentication is handled automatically via OIDC tokens.

**For non-Vercel deployments**: You need to provide an AI Gateway API key by setting the `AI_GATEWAY_API_KEY` environment variable in your `.env.local` file.

With the [AI SDK](https://ai-sdk.dev/docs/introduction), you can also switch to direct LLM providers like [OpenAI](https://openai.com), [Anthropic](https://anthropic.com), [Cohere](https://cohere.com/), and [many more](https://ai-sdk.dev/providers/ai-sdk-providers) with just a few lines of code.

## Deploy Your Own

You can deploy your own version of Chatbot to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/templates/next.js/chatbot)

## Running locally

You will need to use the environment variables [defined in `.env.example`](.env.example) to run AI Builder. It's recommended you use [Vercel Environment Variables](https://vercel.com/docs/projects/environment-variables) for this, but a `.env` file is all that is necessary.

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various AI and authentication provider accounts.

1. Install Vercel CLI: `npm i -g vercel`
2. Link local instance with Vercel and GitHub accounts (creates `.vercel` directory): `vercel link`
3. Download your environment variables: `vercel env pull`

```bash
pnpm install
pnpm db:migrate # Setup database or apply latest database changes
pnpm dev
```

Your app template should now be running on [localhost:3000](http://localhost:3000).

## Bring your own key และผู้ให้บริการหลายราย

ระบบรองรับผู้ให้บริการที่ใช้ **OpenAI-compatible Chat Completions API** โดยคีย์ทั้งหมดถูกอ่านเฉพาะฝั่งเซิร์ฟเวอร์และไม่ถูกส่งไปยัง browser ผู้ใช้สามารถใช้ `OPENAI_API_KEY` ร่วมกับ `OPENAI_BASE_URL` สำหรับ endpoint เดียว หรือกำหนดหลายรายผ่าน `AI_PROVIDER_CONFIG_JSON` ได้ เช่น `groq`, `openrouter` หรือ gateway ภายในองค์กร

โมเดลแต่ละรายการใช้รูปแบบ `provider/model-name` เช่น `openai/gpt-4o-mini` หรือ `groq/llama-3.3-70b-versatile` รายการโมเดลที่ปรากฏในตัวเลือกจะอ่านจาก `AI_MODELS_JSON` และโมเดลรายการแรกจะเป็นค่าเริ่มต้น ส่วน `AI_TITLE_MODEL` ใช้กำหนดโมเดลสำหรับตั้งชื่อแชตอัตโนมัติ

> ห้ามใส่ API key ในโค้ดฝั่ง client, ค่า `NEXT_PUBLIC_*`, git หรือไฟล์ที่อัปโหลดสู่ repository ให้เก็บ secrets ใน environment variables ของ deployment เท่านั้น

```env
OPENAI_API_KEY=sk-your-key
OPENAI_BASE_URL=https://api.openai.com/v1
AI_PROVIDER_CONFIG_JSON={"groq":{"apiKey":"gsk-your-key","baseURL":"https://api.groq.com/openai/v1"}}
AI_MODELS_JSON=[{"id":"openai/gpt-4o-mini","name":"GPT-4o mini","provider":"openai","description":"Fast general-purpose model"},{"id":"groq/llama-3.3-70b-versatile","name":"Llama 3.3 70B","provider":"groq","description":"Fast open model"}]
```

ความสามารถเด่นของเวอร์ชันนี้คือ **Bring-your-own-key แบบไม่ผูก vendor**, **model catalog ที่ปรับเปลี่ยนได้โดยไม่แก้ UI**, และ **provider-aware routing** ซึ่งช่วยให้ทีมสลับ endpoint หรือเพิ่มผู้ให้บริการใหม่ได้โดยแก้เฉพาะ environment configuration
