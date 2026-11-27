# InspectPro owner administration guide

1. Sign in with the first owner account created during bootstrap.
2. Open **Administration** in the left navigation.
3. Set workspace name, pass mark, record-retention target and offline preference.
4. Switch feature modules on/off. Disabling a module blocks its matching API route; it does not erase its data.
5. Set AI provider metadata only after the corresponding secure provider adapter has been implemented. In v0.2 AI execution is not yet enabled.
6. Create staff accounts with unique passwords and the minimum role they need.
7. Export workspace data before major changes. Keep Cloudflare D1 backups and R2 retention separately; a JSON export is portable data, not a complete binary-media backup.
8. Review the owner audit log after administrative changes.

Roles: `owner` controls settings, users and audit log; `admin`, `manager` and `supervisor` can manage operational records; `inspector` can submit inspections. Validate exact permissions against your intended workflow before live use.
