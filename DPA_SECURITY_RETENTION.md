# Draft data processing/security/retention schedule — review required

## Processing description
Purpose: digital inspection and corrective action management. Data subjects: employees, contractors, site contacts. Categories: identity/work contact, operational checklist answers, site/work details, evidence photographs, assigned actions and audit logs. Special-category data is not intended.

## Security baseline to implement
- TLS in transit; encryption at rest for database, backups, object storage and devices.
- Least privilege, tenant separation, MFA for admins, session/token revocation.
- Secure secrets management; dependency patching; audit logging and alerting.
- Evidence files private by default, malware scanning, signed access links, metadata minimisation.
- Backup, restore, incident response, access review and vulnerability management.

## Retention matrix (proposed; customer/legal validation required)
- Account data: active subscription + 30 days after termination, except legal obligations.
- Inspection/action records: customer-selected policy (suggested 1–7 years based on sector, not legal advice).
- Uploaded evidence: same as linked inspection unless shorter customer policy.
- Audit/security logs: suggested 12 months, subject to necessity and risk.
- Backups: rolling 30–90 days; deletion occurs as backups expire.

## Processor obligations to contract
Document confidentiality, security measures, subprocessors, assistance with rights requests, breach notification, DPIA support, deletion/return at termination, audit information and international transfer mechanism if relevant.
