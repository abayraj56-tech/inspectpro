# InspectPro Cloudflare architecture

## Runtime

`src/worker.js` is the single API entrypoint. `/api/*` is routed to the Worker; all other requests are served by the Workers Static Assets binding. The Worker uses D1 prepared statements and R2 object storage. The browser calls a same-origin `/api` path.

## Data model

- `users`: workspace identities and role (`owner`, `admin`, `manager`, `supervisor`, `inspector`).
- `sites`: physical locations.
- `templates`: checklist definitions stored as JSON items.
- `inspections`: immutable submitted snapshots and scores.
- `actions`: corrective action lifecycle.
- `settings`: workspace config and feature switches.
- `audit_log`: actor, event, entity and event detail.
- `media`: metadata for R2 evidence objects.

## Trust boundaries

Passwords are PBKDF2 hashed; bearer tokens are HMAC-signed using `JWT_SECRET`. Owner operations are checked server-side. CORS is controlled by `ALLOWED_ORIGINS`. API responses are not cacheable. Uploads accept JPEG, PNG, WebP and PDF up to 10 MB. R2 keys are generated server-side.

## Feature extension model

Keep business modules behind stable API routes and feature keys. Add a D1 migration for schema changes; do not mutate existing production tables manually. Use additive migrations, deploy to staging, run migration checks, export/backup, then deploy. Feature flags may hide/deny a module but must not be treated as a substitute for role checks or subscription entitlements.

## AI-independent principle

Core inspections, scoring, corrective actions, reports and settings must use deterministic code. AI must be an optional adapter behind a provider interface, with explicit data-sharing controls, cost limits, timeouts, output validation, human approval and a deterministic fallback. Provider secrets belong in Worker secrets, never in D1 settings or browser code. No arbitrary code execution or autonomous destructive operations.

## Offline principle

The service worker caches the application shell only. The current client queue is a prototype based on browser local storage; do not represent it as encrypted, durable or conflict-safe. The production offline upgrade must use IndexedDB, per-record UUID/idempotency keys, schema versioning, attachment queue, conflict detection, retry backoff and explicit sync status. Server remains the source of truth.
