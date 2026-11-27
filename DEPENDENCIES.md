# Third-party dependency inventory (initial)

The project depends on packages listed in `package.json`; exact versions are resolved in a generated lockfile when `npm install` is run. Review `npm ls --all`, each package's licence, security advisories and transitive dependencies before release. This is not a verified exhaustive licence inventory because install/lockfile generation has not been run in this environment.

Direct dependencies (declared):
- express — MIT
- helmet — MIT
- cors — MIT
- express-rate-limit — MIT
- bcryptjs — BSD-3-Clause (verify exact package version)
- jsonwebtoken — MIT
- zod — MIT
- dotenv — BSD-2-Clause
- better-sqlite3 — MIT

Node.js runtime and OS/container base image have separate terms. Obtain a complete SBOM (e.g., CycloneDX), scan dependencies, preserve required notices and validate all licences before commercial distribution.
