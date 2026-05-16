# Afrocritik Institute — Web

The frontend for the **Afrocritik Institute**, a Pan-African cultural
intelligence platform — a living archive and criticism platform for African
film, music, literature, and ideas.

## Stack

- **Next.js 14** (App Router)
- **Tailwind CSS** + **shadcn/ui** primitives
- **React Query** for data fetching
- **Axios** API client
- **NextAuth** for credential + OAuth sessions
- **DM Sans** (body) / **Playfair Display** (display) typography

## Getting started

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000` and expects the API at
`http://localhost:3001` (configurable via `NEXT_PUBLIC_API_URL`).

## Environment

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
```

## Structure

```
app/
  (main)/        Navbar + Footer pages — home, explore, detail pages
  (auth)/        Split-layout auth pages — sign in, sign up, profile setup
  api/auth/      NextAuth route handler
components/
  layout/        Navbar, Footer, Logo, AuthLayout
  ui/            shadcn primitives
  common/        WorkCard, PersonCard, IdeaCard, SectionHeading…
  features/      Page-specific components
lib/             api.ts (axios), auth.ts, utils.ts
types/           Shared TypeScript interfaces
```

## Scripts

| Command         | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the dev server         |
| `npm run build` | Production build             |
| `npm run lint`  | Lint with ESLint             |
