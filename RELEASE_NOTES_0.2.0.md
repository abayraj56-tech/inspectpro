# InspectPro 0.2.0 release notes

## Added
- Cloudflare Workers deployment entrypoint.
- D1 migration for workspace data.
- R2 evidence upload endpoint and media metadata.
- First-owner bootstrap endpoint protected by a one-time secret.
- Owner administration screen for workspace settings, feature switches, users, audit events and JSON export.
- Worker-side role checks and module feature gates.
- PWA shell cache for offline launch.
- Cloudflare-specific deployment and architecture documentation.

## Changed
- Removed automatic switch to a fake local demo when the network/API is unavailable. This prevents a deployed workspace from silently appearing to accept data locally.
- Cloudflare deployment is now the primary deployment path; the original Express/SQLite code is retained for local reference.

## Still required before commercial production
- Tenant isolation, automated end-to-end tests, MFA, password reset, billing enforcement, verified evidence retrieval, durable encrypted offline sync, scheduled backup/restore, AI provider adapters, notifications, PDF generation, rate limiting/WAF configuration, and independent security review.
