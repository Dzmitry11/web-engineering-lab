# Web Engineering Lab

A multilingual software engineering portfolio and project showcase for Dzmitry Nikalayeu.

**Live site:** https://dzmitry11.github.io/web-engineering-lab/

## Technology stack

- **React 19 and TypeScript** for the interactive user interface and typed application code.
- **TanStack Start and TanStack Router** for file-based routes, typed navigation, route metadata, server functions, and prerendering.
- **Vite 8** for development, bundling, and production builds.
- **Tailwind CSS 4** with CSS custom properties for the visual system; **Radix UI** primitives and **Lucide** icons for interface controls.
- **Supabase** for authentication and PostgreSQL-backed application data. Drizzle Kit is configured for PostgreSQL migrations.
- **Zod** for validating server-function input.
- **AI SDK and the OpenAI provider** for generating a project brief summary on the server.
- **Vitest and Testing Library** for automated tests.
- **Bun** for package installation and project scripts.

## Architecture

The application uses a route-first, component-based structure. Page composition and metadata live in `src/routes`; reusable site elements live in `src/components/site`; shared portfolio content is centralized in `src/content/site.ts`; and the English, Swedish, Polish, and Russian dictionaries are in `src/i18n`.

The public site is static-first. TanStack Start prerenders reachable pages during the build, and GitHub Actions publishes the generated `.output/public` directory. This keeps informational pages fast, cacheable, and inexpensive to host. The Vite base path and router base path are both set to `/web-engineering-lab/` for GitHub project pages.

Supabase and server functions form the backend boundary. The contact questionnaire writes its request to Supabase, while AI summaries, visit tracking, and protected API operations use TanStack Start server functions or server routes. Server-only credentials stay on the server and must not be exposed in the static bundle.

### GitHub Pages runtime limitation

GitHub Pages serves static files only. It does not run TanStack Start server functions or API routes. The prerendered portfolio pages work on Pages, but features that call server functions, such as AI summaries and server-side visit tracking, require a separate TanStack Start-compatible runtime. Browser-to-Supabase operations also require correctly configured Supabase credentials and database policies.

## Development

Install [Bun](https://bun.sh), then run:

```sh
git clone https://github.com/Dzmitry11/web-engineering-lab.git
cd web-engineering-lab
bun install
bun run dev
```

Useful checks:

```sh
bun run test
bun run build
bun run lint
```

## GitHub Pages deployment

The workflow in `.github/workflows/deploy-pages.yml` builds the app and deploys `.output/public` to GitHub Pages. In the repository settings, set **Settings > Pages > Source** to **GitHub Actions**. Pushes to `main` trigger deployment automatically.

If the repository name or custom domain changes, update `SITE_URL` in `src/content/site.ts` and the `vite.base` and `tanstackStart.router.basepath` values in `vite.config.ts`.

## Photo credits

- Site background: Madeline Liu, [Modern black and white office with empty workstations](https://unsplash.com/photos/modern-black-and-white-office-with-empty-workstations-geyu2Vyesrk), Unsplash License.
- Contact background: Deliberate Directions, [Modern office space with glass walls and light decor](https://unsplash.com/photos/modern-office-space-with-glass-walls-and-light-decor-wlHBYkK2y4k), Unsplash License.
