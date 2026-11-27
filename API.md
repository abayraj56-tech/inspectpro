# InspectPro API (v0.1)
All responses are JSON except CSV export. Auth endpoints are rate limited. Bearer JWT required for all endpoints except health and login.

| Method | Path | Purpose | Role |
|---|---|---|---|
| GET | `/api/health` | health check | public |
| POST | `/api/auth/login` | issue 8-hour JWT | public, rate-limited |
| GET | `/api/me` | token identity | any authenticated |
| GET | `/api/sites` | list sites | authenticated |
| GET | `/api/templates` | list templates | authenticated |
| POST | `/api/templates` | create template | owner, manager |
| GET | `/api/inspections` | list last 500 | authenticated |
| POST | `/api/inspections` | submit, score, create actions for fails | authenticated |
| GET | `/api/actions` | list corrective actions | authenticated |
| POST | `/api/actions` | create action | owner, manager, inspector |
| PATCH | `/api/actions/:id` | update action status/priority/assignee/due date/description | owner, manager, inspector |
| GET | `/api/dashboard` | KPIs and recent records | authenticated |
| GET | `/api/reports/inspections.csv` | CSV export | owner, manager, viewer |
| GET | `/api/audit-log` | latest 200 audit events | owner, manager |

## Payload examples

Login: `{"email":"admin@inspectpro.demo","password":"ChangeMe123!"}`

Template: `{"name":"Daily Opening","category":"Retail","description":"Opening checks","items":[{"id":"1","label":"Emergency exit clear","required":true}]}`

Inspection: `{"template_id":"<id>","site_id":"<optional id>","inspector_name":"Alex","answers":[{"item_id":"1","value":"pass","comment":"Clear"}],"notes":"","started_at":"2026-11-27T09:00:00Z"}`

Action: `{"title":"Replace damaged signage","description":"...","priority":"high","assignee":"Facilities","due_date":"2026-12-02"}`

Status values: `open`, `in_progress`, `resolved`, `verified`, `closed`. Priority: `low`, `medium`, `high`, `critical`. Inspection answer values: `pass`, `fail`, `na`.
