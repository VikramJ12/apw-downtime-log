# Audit report
`apw-baseline-v1@1.0` · 49 findings · gate **FAIL**
| Critical | High | Medium | Low |
|---|---|---|---|
| 16 | 9 | 14 | 9 |
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

Clause 2.4 — Plaintext password is inserted into the database during seeding, violating the requirement to store only salted hashes. Fix: Hash the password before inserting, e.g., const hash = await bcrypt.hash('welcome123', 10); then use .run('operator1', hash, 'operator');

<sub>standard-2.4 — found by cambriks-llm</sub>

**CRITICAL** · `src/db.js:30` · `APW-STD-2.4`

Clause 2.4 — Plaintext password is inserted into the database during seeding for the supervisor user. Fix: Hash the password before inserting, e.g., const hash = await bcrypt.hash('welcome123', 10); then use .run('supervisor', hash, 'supervisor');

<sub>standard-2.4 — found by cambriks-llm</sub>

**CRITICAL** · `src/db.js:47` · `APW-SEC-02`

SQL statement built by string concatenation. Control APW-SEC-02 requires parameterised queries for every database call.

<sub>Database queries are parameterised — found by semgrep</sub>

**CRITICAL** · `src/db.js:62` · `APW-STD-2.4`

Clause 2.4 — User lookup compares the supplied password directly against the stored plaintext password in a SQL WHERE clause, violating the hashed‑password requirement. Fix: Retrieve the user by username only, then verify the password with a constant‑time hash comparison (e.g., bcrypt.compare(password, user.password)).

<sub>standard-2.4 — found by cambriks-llm</sub>

**CRITICAL** · `src/middleware/requireAuth.js:11` · `APW-STD-2.5`

Clause 2.5 — The middleware decodes the Base64‑encoded session cookie without verifying any signature, allowing a client to modify the token arbitrarily. Fix: Verify the token’s signature before decoding, e.g., split the token into signature and payload, recompute the HMAC with the secret and compare, then decode the payload only if the signature matches.

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

Clause 2.5 — The session token is created by simple Base64 encoding of user data, which provides no cryptographic signature and can be forged by a client. Fix: Generate the token using a HMAC (or a signed JWT) that includes the username and role, e.g., `const payload = `${user.username}|${user.role}`; const token = crypto.createHmac('sha256', config.secret).update(payload).digest('hex') + '.' + Buffer.from(payload).toString('base64');` and set that as the cookie.

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

Clause 3.2 — The bulk export endpoint does not record an audit entry naming the user, operation, and number of records exported. Fix: Add an audit log call before sending the response, e.g., `auditLog(req.user.username, 'export', listAll().length);`

<sub>standard-3.2 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:20` · `APW-STD-3.1`

Clause 3.1 — Route handler constructs and executes a SQL query directly via db.prepare().all(), bypassing the data access module. Fix: Replace the direct db.prepare call with an exported function from db.js (e.g., getAllUsers()) and use that function here.

<sub>standard-3.1 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:23` · `APW-STD-3.2`

Clause 3.2 — The destructive purge endpoint does not record an audit entry naming the user, operation, and number of records deleted. Fix: After the DELETE run, capture `result.changes` and log it, e.g., `const result = db.prepare(...).run(before); auditLog(req.user.username, 'purge', result.changes);`

<sub>standard-3.2 — found by cambriks-llm</sub>

**HIGH** · `src/routes/admin.js:25` · `APW-STD-3.1`

Clause 3.1 — Route handler constructs and executes a SQL DELETE query directly via db.prepare().run(), bypassing the data access module. Fix: Replace the direct db.prepare call with an exported function from db.js (e.g., purgeDowntime(before)) and use that function here.

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

Clause 4.1 — The handler accepts a machine identifier via query parameter 'machine' but does not validate it against the required XXX-NN pattern before use. Fix: Add validation of req.query.machine against /^[A-Z]{3}-\d{2}$/ and return an error (e.g., 400) if it does not match before calling findByMachine.

<sub>standard-4.1 — found by cambriks-llm</sub>

**MEDIUM** · line 15 · `APW-STD-4.1`

Clause 4.1 — The handler accepts a machine identifier in the request body but does not validate it against the required XXX-NN pattern before inserting the log. Fix: Validate req.body.machine against /^[A-Z]{3}-\d{2}$/ and reject the request (e.g., 400) if it does not match before calling insertLog.

<sub>standard-4.1 — found by cambriks-llm</sub>

**MEDIUM** · line 15 · `APW-STD-4.2`

Clause 4.2 — The '/logs' POST handler accepts a 'minutes' field but does not validate that it is a positive integer ≤ 480 before writing to the database. Fix: Add a validation check for req.body.minutes (e.g., if (!Number.isInteger(minutes) || minutes <= 0 || minutes > 480) return res.status(400).json({ error: 'Invalid minutes' })); before calling insertLog.

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

### `src/routes/admin.js`
**INFO** · line 19 · `APW-STD-3.2`

Clause 3.2 — The admin users listing endpoint returns the full user dataset, which is a bulk export and should record an audit entry. Fix: Add an audit log before responding, e.g., `const users = db.prepare(...).all(); auditLog(req.user.username, 'list_users', users.length); res.json(users);`

<sub>standard-3.2 — found by cambriks-llm</sub>

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
