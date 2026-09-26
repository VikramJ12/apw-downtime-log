# Audit report
`apw-baseline-v1@1.0` · 45 findings · gate **FAIL**
| Critical | High | Medium | Low |
|---|---|---|---|
| 13 | 9 | 14 | 9 |
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

Clause 2.4 — Plaintext password is inserted directly into the users table, violating the requirement to store only salted hashes. Fix: Hash the password before inserting, e.g., const hash = await bcrypt.hash('welcome123', saltRounds); then store `hash` instead of the literal password.

<sub>standard-2.4 — found by cambriks-llm</sub>

**CRITICAL** · `src/db.js:30` · `APW-STD-2.4`

Clause 2.4 — Plaintext password is inserted directly into the users table for the supervisor account. Fix: Hash the password before inserting, e.g., const hash = await bcrypt.hash('welcome123', saltRounds); then store `hash` instead of the literal password.

<sub>standard-2.4 — found by cambriks-llm</sub>

**CRITICAL** · `src/db.js:47` · `APW-SEC-02`

SQL statement built by string concatenation. Control APW-SEC-02 requires parameterised queries for every database call.

<sub>Database queries are parameterised — found by semgrep</sub>

**CRITICAL** · `src/db.js:62` · `APW-STD-2.4`

Clause 2.4 — User lookup compares the supplied password in plaintext against the stored password column, violating the hashed‑password rule. Fix: Select the user by username only, then use a constant‑time hash comparison (e.g., bcrypt.compare) to verify the password.

<sub>standard-2.4 — found by cambriks-llm</sub>

**CRITICAL** · `src/middleware/requireAuth.js:11` · `APW-STD-2.5`

Clause 2.5 — The session token is only base64‑decoded; there is no cryptographic signature verification, violating the requirement that tokens be signed. Fix: Verify an HMAC or other signature included with the token (e.g., split token into payload|signature, recompute HMAC with the app secret, and reject if it does not match).

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

Clause 2.5 — The session token is created by simply base64‑encoding username and role; no cryptographic signature is applied, making the token forgeable. Fix: Generate a signed token, e.g., compute an HMAC of the payload with the app secret and store payload|signature (or use a library like jsonwebtoken).

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

Clause 3.2 — Bulk export endpoint does not record an audit entry naming the user, operation, and number of records exported. Fix: Add an audit log call before sending the response, e.g., auditLog(req.user.username, 'export', listAll().length);

<sub>standard-3.2 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:20` · `APW-STD-3.1`

Clause 3.1 — Route handler directly constructs and executes a SQL query via db.prepare().all() instead of using an exported function from the data access module. Fix: Replace the direct db.prepare call with an exported function from db.js, e.g., getAllUsers(), and use that function to retrieve the data.

<sub>standard-3.1 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:23` · `APW-STD-3.2`

Clause 3.2 — Destructive purge endpoint does not record an audit entry naming the user, operation, and number of records deleted. Fix: Add an audit log call after the delete, capturing affected rows, e.g., const result = db.prepare(...).run(before); auditLog(req.user.username, 'purge', result.changes);

<sub>standard-3.2 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:25` · `APW-STD-3.1`

Clause 3.1 — Route handler directly constructs and executes a SQL DELETE query via db.prepare().run() instead of using an exported function from the data access module. Fix: Replace the direct db.prepare call with an exported function from db.js, e.g., purgeDowntime(before), and call that function here.

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

Clause 4.1 — The handler accepts a machine identifier via query parameter 'machine' but does not validate its format before passing to findByMachine. Fix: Add validation of req.query.machine against /^[A-Z]{3}-\d{2}$/ and return an error (e.g., 400) if it does not match before calling findByMachine.

<sub>standard-4.1 — found by cambriks-llm</sub>

**MEDIUM** · line 15 · `APW-STD-4.1`

Clause 4.1 — The handler accepts a machine identifier in the request body but does not validate its format before inserting the log entry. Fix: Validate req.body.machine against /^[A-Z]{3}-\d{2}$/ and reject with a 400 response if invalid before calling insertLog.

<sub>standard-4.1 — found by cambriks-llm</sub>

**MEDIUM** · line 15 · `APW-STD-4.2`

Clause 4.2 — The handler accepts a 'minutes' field but does not validate that it is a positive integer ≤ 480 before writing to the database. Fix: Add a validation check for req.body.minutes (e.g., if (!Number.isInteger(minutes) || minutes <= 0 || minutes > 480) return res.status(400).json({error: 'Invalid minutes'});) before calling insertLog(entry).

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
