# InspectPro — Cloudflare Pages deployment

**Version:** 0.2.1 · **Deployment target:** Cloudflare Pages with Pages Functions, D1 and optional R2.

## Deploy with Cloudflare Pages

This repository is configured for **Cloudflare Pages**, not Workers Builds. The static application is served from `public/`; API requests under `/api/*` are handled by `functions/api/[[path]].js`, which forwards requests to the existing InspectPro API worker code.

### Create the Pages project

1. In Cloudflare, open **Workers & Pages → Create application → Pages → Connect to Git**.
2. Connect GitHub and select `abayraj56-tech/inspectpro`, branch `main`.
3. Set **Framework preset: None**.
4. Set **Build command: leave blank**.
5. Set **Build output directory: public**.
6. Save and deploy.

Do not select Workers, do not use Bun, and do not enter `npx wrangler deploy` as a Pages deploy command.

### Bind the database

The application API requires a Cloudflare D1 database.

1. Create a D1 database named `inspectpro-db` in Cloudflare.
2. Open the Pages project → **Settings → Functions → D1 database bindings**.
3. Add a binding with variable name `DB` and select `inspectpro-db`.
4. Save and trigger a new deployment.

Apply the SQL schema from `migrations/0001_initial.sql` in the D1 database console before using the app.

### Optional evidence storage

If evidence uploads are needed, create an R2 bucket named `inspectpro-media` and add a Pages R2 binding under **Settings → Functions → R2 bucket bindings** with variable name `MEDIA`. Redeploy after changing bindings.

### Required secrets

In Pages project → **Settings → Variables and Secrets**, add:
- `JWT_SECRET`: a long random secret (at least 32 bytes).
- `BOOTSTRAP_SECRET`: a separate one-time setup secret.

Use the same environment (Production or Preview) as the deployment. Do not put secrets in GitHub or in frontend code.

### First owner setup

After the D1 schema and bindings are ready, make a POST request to `/api/setup` with JSON fields `name`, `email`, and a password of at least 12 characters, plus header `X-Setup-Key: YOUR_BOOTSTRAP_SECRET`. The setup endpoint can only create the first owner once. After successful setup, remove the `BOOTSTRAP_SECRET` from Pages secrets.

## Implemented MVP

- Inspection templates, checklists and scoring
- Inspection history and dashboard metrics
- Corrective actions generated from failed checks
- Sites and user administration
- Owner settings and feature switches
- Audit log and JSON export
- Optional R2 evidence uploads
- PWA shell and best-effort offline queue

## Production boundaries

This is a functional MVP, not a fully audited commercial SaaS release. Before storing sensitive operational data, complete independent security testing, tenant isolation, MFA and password reset, robust offline conflict handling, evidence access controls, backups and restore drills, monitoring, rate limiting, billing, notifications, PDF reporting and accessibility review. AI settings are configuration metadata only; no AI inference endpoint is implemented yet.

Legacy Express/SQLite files remain for local reference. Cloudflare Pages deployment uses `public/`, `functions/`, D1 and optional R2.
