# Code Review AI

A full-stack code review application with React + Vite frontend and Vercel Serverless backend. Get AI-powered code reviews using Groq's Llama model.

## Features

- Real-time code editing with syntax highlighting
- AI-powered code review with detailed feedback
- Responsive design (mobile, tablet, desktop)
- Scrollable panels for long code/reviews
- Error filtering for unsupported model features

## Monorepo Structure

```
code-review/
├── frontend/          # React + Vite frontend
│   ├── src/
│   ├── api/          # Vercel serverless functions
│   └── package.json
├── Backend/          # Express backend (legacy, local dev only)
├── package.json      # Root monorepo config
└── vercel.json       # Vercel deployment config
```

## Getting Started

### Install Dependencies

```bash
# From root directory
npm run install:all
```

### Development

```bash
# Run both frontend and backend locally
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3000

## Deployment to Vercel

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/code-review)

### Manual Setup

1. Push code to GitHub repository
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Configure project:
   - **Root Directory**: `frontend`
   - **Framework Preset**: React + Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
4. Add Environment Variable:
   - `GROQ_API_KEY` → Your Groq API key from https://console.groq.com/keys
5. Click **Deploy**

After deployment, your app will be live at `https://your-project.vercel.app`.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Groq API key (required for AI reviews) |

Create `.env` locally from `.env.example`:

```bash
cp .env.example .env
# Edit .env and add your GROQ_API_KEY
```

> **Note**: `.env` is gitignored. Never commit API keys.

## Tech Stack

- **Frontend**: React 19, Vite 7, Axios, PrismJS, React-Markdown
- **Backend**: Groq SDK (serverless on Vercel)
- **Styling**: Vanilla CSS with responsive media queries
- **Deployment**: Vercel (frontend + serverless functions)

## License

ISC
