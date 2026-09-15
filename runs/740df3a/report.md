# Audit report
`apw-baseline-v1@1.0` · 49 findings · gate **FAIL**
| Critical | High | Medium | Low |
|---|---|---|---|
| 16 | 10 | 14 | 9 |
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

**CRITICAL** · `src/config.js:12` · `APW-SEC-01`

slack-webhook-url has detected secret for file src/config.js.

<sub>Credentials are never committed to source control — found by gitleaks</sub>

**CRITICAL** · `src/config.js:15` · `APW-SEC-01`

aws-access-token has detected secret for file src/config.js.

<sub>Credentials are never committed to source control — found by gitleaks</sub>

**CRITICAL** · `src/config.js:16` · `APW-SEC-01`

generic-api-key has detected secret for file src/config.js.

<sub>Credentials are never committed to source control — found by gitleaks, semgrep</sub>

**CRITICAL** · `src/db.js:28` · `APW-STD-2.4`

Clause 2.4 — Plaintext password is inserted into the users table, violating the requirement to store only salted hashes. Fix: Hash the password before inserting, e.g., const hash = bcrypt.hashSync('welcome123', 10); db.prepare(...).run('operator1', hash, 'operator'); and import bcrypt at the top of the file.

<sub>standard-2.4 — found by cambriks-llm</sub>

**CRITICAL** · `src/db.js:30` · `APW-STD-2.4`

Clause 2.4 — Plaintext password is inserted into the users table for the supervisor account, violating the hashing requirement. Fix: Hash the password before inserting, e.g., const hash = bcrypt.hashSync('welcome123', 10); db.prepare(...).run('supervisor', hash, 'supervisor'); and import bcrypt at the top of the file.

<sub>standard-2.4 — found by cambriks-llm</sub>

**CRITICAL** · `src/db.js:47` · `APW-SEC-02`

SQL statement built by string concatenation. Control APW-SEC-02 requires parameterised queries for every database call.

<sub>Database queries are parameterised — found by semgrep</sub>

**CRITICAL** · `src/db.js:62` · `APW-STD-2.4`

Clause 2.4 — Password is compared in plaintext within a SQL WHERE clause, violating the constant‑time hash comparison rule. Fix: Select the user by username only, then verify the supplied password against the stored hash using bcrypt.compareSync, e.g., const row = db.prepare('SELECT * FROM users WHERE username = ?').get(username); if (row && bcrypt.compareSync(password, row.password)) return row; else return null; and import bcrypt.

<sub>standard-2.4 — found by cambriks-llm</sub>

**CRITICAL** · `src/middleware/requireAuth.js:11` · `APW-STD-2.5`

Clause 2.5 — The middleware parses the session token by Base64‑decoding it without verifying any signature, allowing a client to forge or modify the token. Fix: After Base64‑decoding, split out the payload and signature, recompute the HMAC with the secret, and reject the token if the signatures do not match. Example: const [payload, sig] = decoded.split('|'); const expected = crypto.createHmac('sha256', config.secret).update(payload).digest('hex'); if (sig !== expected) return null;

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

Clause 2.5 — The session token is created by simple Base64 encoding of username and role, which provides no cryptographic signature, violating the requirement that tokens be signed. Fix: Generate the token using an HMAC (or a signing library) with the app secret, e.g., const payload = `${user.username}|${user.role}`; const sig = crypto.createHmac('sha256', config.secret).update(payload).digest('hex'); const token = Buffer.from(`${payload}|${sig}`).toString('base64');

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

Clause 3.2 — Bulk export endpoint does not record an audit entry. Fix: Add code to write an audit entry (e.g., insert into audit log) before sending the response, including req.user, operation name, and record count.

<sub>standard-3.2 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:19` · `APW-STD-3.2`

Clause 3.2 — Admin users list endpoint returns the full user dataset and should be considered a bulk export, but it lacks audit logging. Fix: Insert audit logging for this endpoint, recording the user, operation, and count of returned records.

<sub>standard-3.2 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:20` · `APW-STD-3.1`

Clause 3.1 — Route handler directly constructs and executes a SQL query via db.prepare().all() instead of using an exported data‑access function. Fix: Replace the direct db.prepare(...).all() call with a call to an exported function from db.js (e.g., getAllUsers()) that performs the query.

<sub>standard-3.1 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:23` · `APW-STD-3.2`

Clause 3.2 — Destructive purge endpoint does not record an audit entry. Fix: Add audit logging before or after the DELETE, capturing the requesting user, operation, and number of rows deleted.

<sub>standard-3.2 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:25` · `APW-STD-3.1`

Clause 3.1 — Route handler directly constructs and executes a SQL DELETE via db.prepare().run() instead of using an exported data‑access function. Fix: Replace the direct db.prepare(...).run() call with a call to an exported function from db.js (e.g., purgeDowntimeBefore(date)) that performs the deletion.

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

Clause 4.1 — The handler accepts a machine identifier via query parameter but does not validate it against the required XXX‑NN pattern before using it. Fix: Add validation of req.query.machine (e.g., if (!/^[A-Z]{3}-\d{2}$/.test(req.query.machine)) return res.status(400).json({error: 'Invalid machine identifier'});) before calling findByMachine.

<sub>standard-4.1 — found by cambriks-llm</sub>

**MEDIUM** · line 15 · `APW-STD-4.1`

Clause 4.1 — The handler accepts a machine identifier in the request body but does not validate it against the required XXX‑NN pattern before using it. Fix: Validate req.body.machine (e.g., if (!/^[A-Z]{3}-\d{2}$/.test(req.body.machine)) return res.status(400).json({error: 'Invalid machine identifier'});) before inserting the log entry.

<sub>standard-4.1 — found by cambriks-llm</sub>

**MEDIUM** · line 15 · `APW-STD-4.2`

Clause 4.2 — The '/logs' POST handler accepts a 'minutes' field but does not perform a type or range check to ensure it is a positive integer ≤ 480 before writing to the database. Fix: Add validation for req.body.minutes (e.g., if (!Number.isInteger(minutes) || minutes <= 0 || minutes > 480) return res.status(400).json({error: 'Invalid minutes'});) before calling insertLog.

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
