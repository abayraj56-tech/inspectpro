# InspectPro — Cloudflare deployment package

**Version:** 0.2.0 · **Product:** mobile-first inspection, audit, evidence and corrective-action platform · **Deployment target:** Cloudflare Workers + Workers Static Assets + D1 + R2.

InspectPro is being built as a modular product. The owner Administration panel controls workspace settings, feature flags, user accounts, AI configuration metadata and data export. Core inspection and corrective-action workflows do not require an AI provider. The web shell is a PWA and is cached for offline launch; queued inspection submission is best-effort browser storage and syncs when connectivity returns.

## Cloudflare resources

- **Workers**: application/API runtime (`src/worker.js`).
- **Workers Static Assets**: serves `public/` from the same Worker origin.
- **D1**: relational workspace data (`migrations/0001_initial.sql`).
- **R2**: optional evidence file storage (`MEDIA` binding; up to 10 MB per upload).

## Deploy

You need a Cloudflare account, a domain (optional initially), and Node.js 20+ with npm.

1. Install Wrangler: `npm install` then `npx wrangler login`.
2. Create a D1 database: `npx wrangler d1 create inspectpro-db`. Copy the returned database ID into `wrangler.toml` in place of `REPLACE_WITH_CLOUDFLARE_D1_DATABASE_ID`.
3. Create the R2 bucket: `npx wrangler r2 bucket create inspectpro-media`.
4. Apply the schema: `npx wrangler d1 migrations apply inspectpro-db --remote`.
5. Set strong secrets (do not put secrets in source control):
   - `npx wrangler secret put JWT_SECRET` (use a cryptographically random value of at least 32 bytes)
   - `npx wrangler secret put BOOTSTRAP_SECRET` (a separate one-time setup secret)
6. Set `ALLOWED_ORIGINS` in `wrangler.toml` to your exact production origin once known, e.g. `https://app.example.com` (no wildcard for production).
7. Deploy: `npx wrangler deploy`.
8. Bootstrap the first owner exactly once. Replace the URL and values; send the setup secret in the header, not the JSON body:

```bash
curl -X POST 'https://YOUR-WORKER.workers.dev/api/setup' \
  -H 'Content-Type: application/json' \
  -H 'X-Setup-Key: YOUR_BOOTSTRAP_SECRET' \
  -d '{"name":"Workspace Owner","email":"you@example.com","password":"Use-A-Unique-Password-12+"}'
```

9. Sign in at the deployed URL. Remove/rotate the bootstrap secret after setup (`npx wrangler secret delete BOOTSTRAP_SECRET`). Create a non-owner test user and verify role restrictions before inviting staff.

The first setup endpoint is permanently disabled once a user exists. Never share your secrets or owner password with anyone.

## Current implemented features

- Cloudflare Worker API and static asset hosting on one origin.
- D1 schema and migrations for users, sites, templates, inspections, actions, settings, audit events and media metadata.
- Password hashing with PBKDF2-SHA-256 (210,000 iterations), signed 12-hour bearer tokens, role checks and owner-only settings/user/audit controls.
- First-owner bootstrap protected by a one-time secret.
- Dashboard metrics, checklist templates, inspection scoring, automatic corrective actions for failed items, action status management, sites, user creation, module feature switches and JSON data export.
- R2 evidence upload API with content-type allowlist and 10 MB limit.
- Security headers, no-store API responses, explicit CORS allowlist support and server-side input checks.
- PWA shell caching and a best-effort offline submission queue in the browser.

## Important production boundaries

This package is a deployable functional MVP, **not yet a fully audited commercial SaaS release**. Before real customer or sensitive operational data is used, the following work remains: independent penetration test; automated API/integration/browser tests; tenant isolation and organisation provisioning; MFA and password reset; invitation flow; immutable evidence access/download authorisation; reliable encrypted offline queue with conflict resolution; attachment association to checklist items; scheduled backup/restore drills; billing/subscription enforcement; email notifications; AI inference adapters and provider secret handling; PDF reports; rate limiting/WAF policy; data-subject request workflows; monitoring/alerting; and accessibility review. AI settings in this version are configuration metadata only; no AI inference endpoint is exposed yet. Feature flags govern module access but do not constitute billing enforcement.

The legacy Express/SQLite files are retained for local reference and tests; Cloudflare deployment uses `src/worker.js`, D1 and R2.

## Local checks

```bash
node --check src/worker.js
node --check public/app.js
npm test
```

## Legal / ownership

The package includes draft copyright, privacy, terms, DPA/security, acceptable-use and contractor IP templates. They are not legal advice. Trademark availability for “InspectPro” has not been cleared. Review all legal templates and third-party licences with a UK solicitor before commercial launch. Your ownership of original deliverables does not transfer third-party dependency rights.
