# Architecture

- **Browser client:** HTML/CSS/vanilla JS, responsive layout, dashboard, form workflow and locally queued offline submissions.
- **API:** Node 20 / Express 4; validation via Zod; authentication via JWT; password hashes via bcryptjs; Helmet security headers; rate limiting; CORS configuration.
- **Persistence:** SQLite, WAL mode, foreign keys and indexes. Tables: users, sites, templates, inspections, actions, audit_log.
- **Business rules:** checklist-required items must be answered; score excludes N/A; failed items generate high-priority corrective actions; role checks gate template creation/action management/reporting.
- **Deployment shape:** Docker, persistent SQLite volume, TLS reverse proxy, secrets via host environment/secret manager.

## Design principles

Mobile-first; keyboard focus; accessible form labels; readable contrast; plain-language error messages; configurable checklists; timestamped records; audit events for key mutations; no third-party analytics by default; data minimisation.

## Planned production architecture

Replace SQLite with PostgreSQL when multi-tenant/scale needs require it; use tenant_id in every table and enforce tenant boundaries; blob storage for evidence (private bucket, signed URLs, malware scanning); queue for notifications; identity provider/MFA; policy-based authorization; retention scheduler; database backups/PITR; observability; CI/CD and staged environments; API versioning; signed offline records and conflict resolution.
