# tanstack-ai

A Next.js demo app integrating TanStack UI patterns, a chatbot/agent prototype, and a small Kanban UI. This repo includes frontend components, server tools, and a Prisma-backed database for local development.

## Features

- Next.js app using the App Router
- Chatbot and tool-runner components under `src/components/chatbot`
- Kanban board and task management in `src/components/kanban`
- Prisma ORM with migrations in `prisma/migrations`

## Requirements

- Node.js 18+ (or compatible)
- A Postgres-compatible database for local development (see `DATABASE_URL`)

## Quickstart

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from the example and set `DATABASE_URL`:

```env
# .env
DATABASE_URL="postgresql://user:pass@localhost:5432/dbname"
```

3. Run Prisma migrations (development only):

```bash
npx prisma migrate dev
```

4. Start the dev server:

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Useful Scripts

- `npm run dev` — Start development server
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npx prisma migrate dev` — Run Prisma migrations

## Important Files

- App entry: `app/`
- Chatbot UI: `src/components/chatbot`
- Kanban UI: `src/components/kanban`
- Prompts and data: `src/data/prompts.txt`
- Prisma client: `src/lib/prisma.ts`

## Contributing

Open an issue or submit a PR. For database changes, add a migration under `prisma/migrations`.

## License

This repository does not include a license by default — add one if you plan to publish.
