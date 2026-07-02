# Afrocritik Institute Web

The frontend for the Afrocritik Institute, a Pan-African cultural intelligence
platform. It is a living archive and criticism site for African film, music,
literature, and ideas. The app consumes the Afrocritik Institute API and renders
the public site, the authenticated dashboard, and an admin area.

## Stack

- Next.js 14 with the App Router
- Tailwind CSS with shadcn/ui primitives
- React Query for data fetching and caching
- Axios API client
- NextAuth v4 for credential and OAuth sessions
- Recharts for dashboard charts
- DM Sans for body text and Playfair Display for display type

## Getting started

Prerequisites: Node 20 and npm. The API should be running and reachable (locally
on `http://localhost:3001`).

```bash
npm install
npm run dev
```

The app runs on `http://localhost:3000`.

## Environment

Create `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
REVALIDATE_SECRET=must-match-the-api
```

- `NEXT_PUBLIC_API_URL` base URL of the API. It is inlined into the client bundle
  at build time, so a change requires a rebuild.
- `NEXTAUTH_URL` public URL of this app. Required by NextAuth in production.
- `NEXTAUTH_SECRET` secret used to sign session tokens. Generate one with
  `openssl rand -base64 32`.
- `REVALIDATE_SECRET` shared secret for on demand revalidation. It must match the
  value configured in the API exactly.

OAuth (Google and Facebook) is handled entirely by the API through Passport. The
frontend only links to `${NEXT_PUBLIC_API_URL}/api/auth/{google,facebook}` and
exchanges the returned token through NextAuth, so no provider keys live here.

## Structure

```
app/
  (main)/         public pages with navbar and footer: home, explore, detail pages
  (auth)/         sign in, sign up, profile setup, oauth callback
  (dashboard)/    authenticated user dashboard
  (admin)/        admin area, gated to admin role
  api/auth/       NextAuth route handler
  api/revalidate/ on demand ISR endpoint pinged by the API
components/
  layout/         Navbar, Footer, Logo, AuthLayout
  ui/             shadcn primitives
  common/         shared cards and section headings
  features/       page specific components grouped by domain
lib/              api.ts (axios client), auth.ts, activity.ts, hooks, utils
middleware.ts     route protection, role gating, and onboarding redirects
types/            shared TypeScript interfaces and NextAuth type augmentation
```

## Route protection

`middleware.ts` decodes the NextAuth JWT and enforces access:

- Public paths: home, sign in, sign up, oauth callback, and explore.
- The admin area requires the `admin` role. Signed in non admins are sent to
  their dashboard.
- Signed in users who have not finished onboarding are redirected to the
  interests step. Admins and editors are exempt.

## Scripts

- `npm run dev` start the dev server
- `npm run build` production build
- `npm run start` run the production server
- `npm run lint` lint with ESLint

## Deployment

This app is deployed on Vercel. See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full
procedure and the required variables.
