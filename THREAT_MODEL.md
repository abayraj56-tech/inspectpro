# Initial threat model

## Assets
Credentials, inspection records, photographs/evidence, site identifiers, action assignments, audit logs, customer configuration and exports.

## Threat actors
Unauthenticated attackers, compromised users, malicious insiders, lost mobile devices, cross-tenant access, vulnerable dependencies and accidental data exposure.

## Risks and current mitigations
- Credential stuffing: login rate limiting; bcrypt password hashes. Add MFA, breach password checks and lockout/monitoring before production.
- Token theft: 8-hour expiry; no refresh token. Use secure HttpOnly cookies or device-aware tokens, rotation and revocation for production.
- Injection: parameterized SQLite queries; Zod validation; output escaped in UI. Continue review.
- Cross-origin attacks: CORS origin configurable; CSP via Helmet. Verify production origin and CSP.
- Excessive upload: no upload endpoint yet, avoiding current upload risk. When added, enforce type/size, virus scan, private storage, signed URLs and EXIF stripping.
- Unauthorized actions: role checks on sensitive routes. Production needs tenant scoping, least privilege and audit review.
- Offline device exposure: local cache/queue stored in localStorage, plaintext. **Do not use for sensitive data in production**; implement encrypted storage, device controls and purge/remote logout.
- Data loss: SQLite file. Configure automated encrypted backup, restore testing and retention.
- Secrets leakage: `.env.example` only; keep real `.env` out of version control.

## Launch blockers
Tenant isolation, secure bootstrap and password reset, MFA/SSO as required, revocable sessions, comprehensive authorization tests, data protection impact assessment where applicable, encryption in transit and at rest, production logging/monitoring, backups, incident response, independent penetration test and legal review.
