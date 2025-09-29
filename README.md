# Portfolio (Vite + React + TypeScript + TailwindCSS)

Single‑page portfolio with hidden admin mode to add projects locally and copy JSON for later commits. Built for simplicity, performance, and easy customization.

## Quick start

- Install deps: `npm install`
- Dev: `npm run dev`
- Build: `npm run build` then `npm run preview`

## Customize content

- Edit text, links, skills, and default projects in `src/content.ts`.
- Replace `public/vite.svg` or add `public/cv.pdf` and update the hero CV link if needed.
- Projects you add in admin mode are saved in `localStorage`.

## Admin mode (hidden)

- Press `Ctrl + Shift + A` then enter PIN from `src/content.ts` (default `2580`).
- You will see Add Project and Copy Projects JSON. These controls are not visible to regular visitors.

## Tailwind

- Tailwind v3 configured in `tailwind.config.js` and `postcss.config.js`.
- Custom classes live in `src/index.css` (`container-responsive`, `btn-*`, `tag`).

## Deploy

- Vercel, Netlify, GitHub Pages all work. For GitHub Pages, build and push `dist/` or configure actions.

## Appwrite integration (production-grade)


### Environment variables (.env)

Create `.env` (or `.env.local`) in project root with:

```
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=portfolio_db
VITE_APPWRITE_COLLECTION_PORTFOLIO=portfolio
VITE_APPWRITE_COLLECTION_PROJECTS=projects
VITE_APPWRITE_ADMIN_USER_ID=your-admin-user-id
```

No secret keys should be exposed in frontend. Authentication for writes must use user sessions.

### Database schema

Create a Database (e.g., `portfolio_db`) with two collections:

- `portfolio` (singleton document id: `singleton`)
  - `title` string
  - `role` string
  - `heroTitle` string
  - `heroSubtitle` string
  - `contactEmail` string
  - `linkedinUrl` string
  - `quickFacts` string[]
  - `contactPhone` string (optional)
  - `skills` string[]
  - `aboutText` string

- `projects`
  - `title` string (required)
  - `description` string
  - `tags` string[]
  - `githubUrl` string (optional)
  - `liveUrl` string (optional)
  - `imageUrl` string (optional)

### Permissions model

- Public read for both collections (optional):
  - **Read**: `role:all`
- Write/update/delete only for the single admin account:
  - **Create/Update/Delete**: `user:{ADMIN_USER_ID}`

### Admin authentication

Minimal modal is included for Admin Sign-in (email/password). Admin tools render only when the logged-in account id matches `VITE_APPWRITE_ADMIN_USER_ID`.

### SDK install

```
npm i appwrite
```

### Where code lives

- Service layer: `src/appwrite/services.js`
- Integration: `src/App.tsx` (hydrates from Appwrite on mount, saves on edits, uploads documents to storage)

### Admin authentication

Use an email/password user as the single admin. Call sign-in to establish a session:

```ts
import { signIn, signOut, getAccount } from './appwrite/services'
```

The service layer enforces single-admin policy using `VITE_APPWRITE_ADMIN_USER_ID` or `VITE_APPWRITE_ADMIN_EMAIL`.

## Testing with TestSprite

- Frontend port: default Vite dev is 5173
- Run tests (example):

```bash
# Ensure dev server is running or provide static build
npm run dev
```

Scenarios covered:
- Hydration from Appwrite: portfolio and projects load without errors
- Admin-only actions blocked when not authenticated
- Sign-in -> edits -> savePortfolio/updateProject succeed
- Document upload stores file in bucket and updates portfolio doc with fileId

## Estimated time

- Scaffolding + Tailwind setup: ~10–15 minutes
- Sections + styling: ~45–60 minutes
- Hidden admin tools + polish: ~30–45 minutes
- Total: ~1.5–2.5 hours (content dependent)
