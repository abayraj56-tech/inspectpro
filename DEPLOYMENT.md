# Deployment checklist

## Prototype
1. Install Node 20+, native SQLite prerequisites.
2. Copy `.env.example` to `.env`.
3. Generate a random secret (e.g. `openssl rand -base64 48`) and set `JWT_SECRET`.
4. For the local demo, leave `DEMO_MODE=true`; use demo credentials. For any non-demo deployment set false and create the first owner via reviewed secure database bootstrap.
5. `npm install`; `npm start`; verify `/api/health`.

## Docker
1. Configure `.env` and secret; demo seed only for sandbox.
2. `docker compose up --build -d`.
3. Configure TLS reverse proxy, domain, restrictive CORS origin, firewall, persistent volume, backups and monitoring.
4. Do not expose port 3000 directly to public internet without TLS/proxy controls.

## Before production
- [ ] Implement multi-tenant schema and tenant-bound access controls.
- [ ] Replace demo bootstrap; secure invite and password reset.
- [ ] Add MFA, token/session revocation, rate-limit tuning and anomaly monitoring.
- [ ] Encrypted backups and test restores.
- [ ] Add private evidence upload with validation, malware scanning, signed URLs and retention.
- [ ] Add privacy notices, data subject request handling, retention deletion, processor contracts and DPIA where necessary.
- [ ] Run dependency scanning, SAST, DAST, penetration test, accessibility audit and load tests.
- [ ] Review CSP/CORS, secrets and environment separation.
- [ ] Add email notifications, scheduled audits and integrations with retries/idempotency.
- [ ] Create production incident response and support process.
- [ ] Review legal templates and name/trademark clearance.
