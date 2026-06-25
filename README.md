# Subarvibe Frontend

Subarvibe is an AI-powered website generator frontend built with Next.js, React, and [shadcn/ui](https://ui.shadcn.com/). It serves as the main interface that connects to a backend AI pipeline (RAG and LLM) to dynamically assemble and generate website templates based on user descriptions.

> [!WARNING]
> **Backend runs on a personal computer.**
> The backend services (FastAPI, LLM models, and the RAG pipeline) are currently hosted and run on my personal local machine for development and testing purposes. Because of this, the API endpoints might be offline if the local machine is turned off.

## Want to Try It Out?

If you are interested in exploring or testing this project, please **contact me** directly! I can turn on the backend server on my machine so you can fully experience the AI generation process.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS & [shadcn/ui](https://ui.shadcn.com/)
- **Authentication/API**: Supabase SSR and FastAPI via Ngrok 

## Getting Started

To run the frontend development server locally:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. (Note: The core features require the backend pipeline to be running).
