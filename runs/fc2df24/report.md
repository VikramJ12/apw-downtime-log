# Audit report
`apw-baseline-v1@1.0` · 46 findings · gate **FAIL**
| Critical | High | Medium | Low |
|---|---|---|---|
| 13 | 10 | 14 | 9 |
## Fix these first
Everything here is critical or high. The gate will not open until they are resolved.
**CRITICAL** · `.env:1` · `APW-DEP-01`

.env is present and not in .gitignore, so its values are in source control. Remove it from git, ignore it, and rotate every value it contains.

<sub>Environment files are never committed — found by cambriks-deployment</sub>

**CRITICAL** · `src/config.js:8` · `APW-SEC-01`

A credential is assigned a string literal in source. Control APW-SEC-01 requires all secrets to come from the environment at runtime.

<sub>Credentials are never committed to source control — found by semgrep</sub>

**CRITICAL** · `src/config.js:9` · `APW-SEC-01`

A credential is assigned a string literal in source. Control APW-SEC-01 requires all secrets to come from the environment at runtime.

<sub>Credentials are never committed to source control — found by semgrep</sub>

**CRITICAL** · `src/db.js:28` · `APW-STD-2.4`

Clause 2.4 — Plaintext password is inserted into the users table, violating the requirement to store only salted hashes. Fix: Hash the password (e.g., using bcrypt) before calling .run, e.g., const hash = await bcrypt.hash('welcome123', saltRounds); then .run('operator1', hash, 'operator');

<sub>standard-2.4 — found by cambriks-llm</sub>

**CRITICAL** · `src/db.js:30` · `APW-STD-2.4`

Clause 2.4 — Plaintext password is inserted into the users table for the supervisor account. Fix: Hash the password before storing, e.g., const hash = await bcrypt.hash('welcome123', saltRounds); then .run('supervisor', hash, 'supervisor');

<sub>standard-2.4 — found by cambriks-llm</sub>

**CRITICAL** · `src/db.js:47` · `APW-SEC-02`

SQL statement built by string concatenation. Control APW-SEC-02 requires parameterised queries for every database call.

<sub>Database queries are parameterised — found by semgrep</sub>

**CRITICAL** · `src/db.js:62` · `APW-STD-2.4`

Clause 2.4 — Password is compared in plaintext via a SQL query, violating the constant‑time hash comparison requirement. Fix: Retrieve the stored hash for the username and compare using a constant‑time function (e.g., bcrypt.compare(password, storedHash)).

<sub>standard-2.4 — found by cambriks-llm</sub>

**CRITICAL** · `src/middleware/requireAuth.js:11` · `APW-STD-2.5`

Clause 2.5 — The session parser only base64‑decodes the cookie and extracts username/role without verifying any signature, allowing tampered tokens to be accepted. Fix: After decoding, split out the signature, recompute the HMAC with the secret, and reject the token if the signatures do not match.

<sub>standard-2.5 — found by cambriks-llm</sub>

**CRITICAL** · `src/routes/admin.js:10` · `APW-SEC-03`

Express route is registered with a handler and no authentication middleware. Control APW-SEC-03 requires every route outside the public allowlist to pass through requireAuth.

<sub>Every non-public route enforces authentication server-side — found by semgrep</sub>

**CRITICAL** · `src/routes/admin.js:14` · `APW-SEC-03`

Express route is registered with a handler and no authentication middleware. Control APW-SEC-03 requires every route outside the public allowlist to pass through requireAuth.

<sub>Every non-public route enforces authentication server-side — found by semgrep</sub>

**CRITICAL** · `src/routes/admin.js:19` · `APW-SEC-03`

Express route is registered with a handler and no authentication middleware. Control APW-SEC-03 requires every route outside the public allowlist to pass through requireAuth.

<sub>Every non-public route enforces authentication server-side — found by semgrep</sub>

**CRITICAL** · `src/routes/admin.js:23` · `APW-SEC-03`

Express route is registered with a handler and no authentication middleware. Control APW-SEC-03 requires every route outside the public allowlist to pass through requireAuth.

<sub>Every non-public route enforces authentication server-side — found by semgrep</sub>

**CRITICAL** · `src/routes/auth.js:12` · `APW-STD-2.5`

Clause 2.5 — The session token is created by simply base64‑encoding username and role, which provides no cryptographic signature and can be forged by a client. Fix: Generate the token using an HMAC or a signing library, e.g., `const payload = `${user.username}|${user.role}`; const sig = hmac(secret, payload); const token = Buffer.from(`${payload}|${sig}`).toString('base64');`

<sub>standard-2.5 — found by cambriks-llm</sub>

**HIGH** · `public/js/app.js:2` · `APW-SEC-05`

An authorisation decision is made from client-controlled storage. Control APW-SEC-05 requires authorisation to be enforced server-side.

<sub>Authorisation decisions are not taken from client-controlled state — found by semgrep</sub>

**HIGH** · `src/db.js:27` · `APW-SEC-07`

A user account is seeded with a literal password. Seeded credentials are shared, well known, and usually survive into production.

<sub>Accounts are never seeded with a literal password — found by semgrep</sub>

**HIGH** · `src/db.js:29` · `APW-SEC-07`

A user account is seeded with a literal password. Seeded credentials are shared, well known, and usually survive into production.

<sub>Accounts are never seeded with a literal password — found by semgrep</sub>

**HIGH** · `src/routes/admin.js:14` · `APW-STD-3.2`

Clause 3.2 — Bulk export endpoint does not record an audit entry naming the user, operation, and number of records exported. Fix: Add an audit log call before sending the response, e.g., insertAudit(req.user.username, 'export', listAll().length);

<sub>standard-3.2 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:19` · `APW-STD-3.2`

Clause 3.2 — Administrative users list endpoint exports all user records but does not record an audit entry. Fix: Add an audit log before responding, e.g., const users = db.prepare('SELECT ...').all(); insertAudit(req.user.username, 'export_users', users.length);

<sub>standard-3.2 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:20` · `APW-STD-3.1`

Clause 3.1 — The route handler constructs and executes a SQL query directly via db.prepare().all(), bypassing the data access module. Fix: Create an exported function in db.js (e.g., listUsers()) that runs this query and replace the line with `res.json(listUsers());`. Remove the direct db import if not needed.

<sub>standard-3.1 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:23` · `APW-STD-3.2`

Clause 3.2 — Destructive purge endpoint does not record an audit entry naming the user, operation, and number of records deleted. Fix: After the DELETE run, capture the affected rows count and log it, e.g., const info = db.prepare('DELETE ...').run(before); insertAudit(req.user.username, 'purge', info.changes);

<sub>standard-3.2 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:25` · `APW-STD-3.1`

Clause 3.1 — The route handler constructs and executes a DELETE query directly via db.prepare().run(), bypassing the data access module. Fix: Add an exported function in db.js (e.g., purgeDowntime(before)) that performs this deletion and replace the line with `purgeDowntime(before);`.

<sub>standard-3.1 — found by cambriks-llm</sub>

**HIGH** · `src/server.js:26` · `APW-DEP-03`

No Express error-handling middleware. Unhandled errors return a stack trace to the client. Add app.use((err, req, res, next) => ...) after the routes.

<sub>Unhandled errors do not reach the client — found by cambriks-deployment</sub>

**HIGH** · `src/server.js:32` · `APW-DEP-05`

A credential value is written to the log. Anyone with log access has the secret. Remove the statement.

<sub>Credentials are never written to logs — found by cambriks-deployment</sub>

## Everything else
### `public/js/app.js`
**MEDIUM** · line 7 · `APW-SEC-04`

Data is written to innerHTML without escaping. Control APW-SEC-04 requires DOM text to be set with textContent.

<sub>Untrusted data is not written to the DOM as HTML — found by semgrep</sub>

### `src/routes/logs.js`
**MEDIUM** · line 11 · `APW-STD-4.1`

Clause 4.1 — The handler accepts a machine identifier via query parameter 'machine' but does not validate its format before passing it to findByMachine. Fix: Add validation of req.query.machine against the pattern /^[A-Z]{3}-\d{2}$/ and return an error (e.g., 400 Bad Request) if it does not match before calling findByMachine.

<sub>standard-4.1 — found by cambriks-llm</sub>

**MEDIUM** · line 15 · `APW-STD-4.1`

Clause 4.1 — The handler accepts a machine identifier in the request body but does not validate its format before inserting the log entry. Fix: Validate req.body.machine against the pattern /^[A-Z]{3}-\d{2}$/ and reject the request with a 400 error if it does not conform before calling insertLog.

<sub>standard-4.1 — found by cambriks-llm</sub>

**MEDIUM** · line 15 · `APW-STD-4.2`

Clause 4.2 — The '/logs' POST handler accepts a 'minutes' field but does not perform type or range validation, violating the requirement that downtime minutes be a positive integer up to 480 before any database write. Fix: Add validation for req.body.minutes (e.g., if (!Number.isInteger(minutes) || minutes <= 0 || minutes > 480) return res.status(400).json({ error: 'Invalid minutes' });) before calling insertLog(entry).

<sub>standard-4.2 — found by cambriks-llm</sub>

### `src/server.js`
**MEDIUM** · line 11 · `APW-DEP-02`

No health or readiness endpoint. Orchestrators and load balancers cannot tell whether this process is serving. Add GET /health.

<sub>Services expose a health endpoint — found by cambriks-deployment</sub>

### `public/js/app.js`
**LOW** · line 14 · `APW-COR-01`

A promise chain has no rejection handler. A network or parse failure here is silent. Add .catch() and surface the failure.

<sub>Promise chains handle rejection — found by semgrep</sub>

**LOW** · line 18 · `APW-COR-01`

A promise chain has no rejection handler. A network or parse failure here is silent. Add .catch() and surface the failure.

<sub>Promise chains handle rejection — found by semgrep</sub>

**LOW** · line 28 · `APW-COR-01`

A promise chain has no rejection handler. A network or parse failure here is silent. Add .catch() and surface the failure.

<sub>Promise chains handle rejection — found by semgrep</sub>

### `src/server.js`
**LOW** · line 30 · `APW-DEP-04`

No SIGTERM handler. In-flight requests are dropped on every deploy. Stop accepting connections, drain, then close the database.

<sub>Services shut down gracefully — found by cambriks-deployment</sub>

## Brand conformance · 14 findings
Mechanical and safe to fix in one pass. None of these block the gate on their own.
| File | Line | Issue |
|---|---|---|
| `public/css/admin.css` | 5 | #f5f5f5 is not in the Anand Precision Works palette |
| `public/css/admin.css` | 6 | #333333 is not in the Anand Precision Works palette |
| `public/css/admin.css` | 10 | #3498db is not in the Anand Precision Works palette |
| `public/css/admin.css` | 17 | #dddddd is not in the Anand Precision Works palette |
| `public/css/admin.css` | 25 | #2ecc71 is not in the Anand Precision Works palette |
| `public/css/admin.css` | 34 | #e74c3c is not in the Anand Precision Works palette |
| `public/css/admin.css` | 42 | #9b59b6 is not in the Anand Precision Works palette |
| `public/css/admin.css` | 43 | #7f8c8d is not in the Anand Precision Works palette |
| `public/css/admin.css` | 44 | #f39c12 is not in the Anand Precision Works palette |
| `public/css/admin.css` | 4 | Typeface set directly instead of var(--apw-font). |
| `views/admin.html` | 10 | Colour hardcoded in an inline style |
| `views/admin.html` | 11 | Colour hardcoded in an inline style |
| `views/admin.html` | 20 | Colour hardcoded in an inline style |
| `views/admin.html` | 25 | Colour hardcoded in an inline style |

---
Detected by gitleaks, semgrep, cambriks-deployment, cambriks-brand, cambriks-llm. Severity is set by the control in Anand Precision Works — baseline engineering standard, not by the tool that found it.
