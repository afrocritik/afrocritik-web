# Deployment Guide (Frontend)

This document describes how the Afrocritik Institute web app is deployed to
Vercel, the variables it needs, and how it connects to the API.

## Platform

- Host: Vercel
- Framework: Next.js 14 (App Router), detected automatically by Vercel
- Runtime: Node 20

Vercel runs `npm install` then `npm run build` and serves the result. No special
build configuration is required.

## One time setup

1. Import the GitHub repository (`afrocritik/afrocritik-web`) into Vercel.
2. Keep the default Next.js build settings.
3. Set the environment variables listed below.
4. Deploy.

## Environment variables

Set these in the Vercel project settings for the Production environment (and
Preview if you use preview deployments):

- `NEXT_PUBLIC_API_URL` the public URL of the API, for example
  `https://afrocritik-api-production.up.railway.app`. This value is inlined into
  the client bundle at build time, so any change to it requires a redeploy to
  take effect.
- `NEXTAUTH_URL` the public URL of this app, for example
  `https://afrocritik.vercel.app`. NextAuth requires it in production.
- `NEXTAUTH_SECRET` a long random string. Generate one with
  `openssl rand -base64 32`.
- `REVALIDATE_SECRET` a random string that must byte match the value set on the
  API. The API uses it to authenticate its on demand revalidation ping to
  `/api/revalidate`.

## Connecting the two services

The web app and the API are deployed independently and reference each other by
URL:

- The web app calls the API at `NEXT_PUBLIC_API_URL`.
- The API allows the web app origin through CORS and CSRF, and sends
  revalidation pings, using its own `FRONTEND_URL` variable. After the web app
  is live, set `FRONTEND_URL` on the API service to this app's Vercel domain.
- `REVALIDATE_SECRET` must be identical on both sides for on demand
  revalidation to work.

## Deploys

Vercel redeploys on every push to `main`. Because `NEXT_PUBLIC_API_URL` is
inlined at build time, changing the API URL means triggering a fresh deploy, not
just restarting.

## Related

The API deployment is documented in the `afrocritik-api` repository under
`DEPLOYMENT.md`.
