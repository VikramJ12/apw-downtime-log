# Cambriks fix list

Generated from an audit against Anand Precision Works — baseline engineering standard (`apw-baseline-v1@1.0`).

## Scope

Fix only the items listed below. Do not refactor, rename, reformat, upgrade dependencies, or change anything not named here. Each item states a file, a line and the change required. If a fix requires a new function, add it in the module the item names and nothing else.

Work in order. Items are sorted by severity.

### 1. .env:1 — critical

- Control: `APW-DEP-01` — Environment files are never committed
- Problem: .env is present and not in .gitignore, so its values are in source control.
- Change: Remove the file from git, add it to .gitignore, and rotate every value it contained.

### 2. src/config.js:8 — critical

- Control: `APW-SEC-01` — Credentials are never committed to source control
- Problem: A credential is assigned a string literal in source. Control APW-SEC-01 requires all secrets to come from the environment at runtime.
- Change: Read the value from process.env at startup and fail fast if it is unset. Rotate the exposed credential.

### 3. src/config.js:9 — critical

- Control: `APW-SEC-01` — Credentials are never committed to source control
- Problem: A credential is assigned a string literal in source. Control APW-SEC-01 requires all secrets to come from the environment at runtime.
- Change: Read the value from process.env at startup and fail fast if it is unset. Rotate the exposed credential.

### 4. src/config.js:12 — critical

- Control: `APW-SEC-01` — Credentials are never committed to source control
- Problem: slack-webhook-url has detected secret for file src/config.js.
- Change: Read the value from process.env at startup and fail fast if it is unset. Rotate the exposed credential.

### 5. src/config.js:15 — critical

- Control: `APW-SEC-01` — Credentials are never committed to source control
- Problem: aws-access-token has detected secret for file src/config.js.
- Change: Read the value from process.env at startup and fail fast if it is unset. Rotate the exposed credential.

### 6. src/config.js:16 — critical

- Control: `APW-SEC-01` — Credentials are never committed to source control
- Problem: generic-api-key has detected secret for file src/config.js.
- Change: Read the value from process.env at startup and fail fast if it is unset. Rotate the exposed credential.

### 7. src/db.js:28 — critical

- Control: `APW-STD-2.4` — standard-2.4
- Problem: Clause 2.4 — Plaintext password is inserted into the users table, violating the requirement to store only salted hashes.
- Change: Hash the password before inserting, e.g., const hash = bcrypt.hashSync('welcome123', 10); db.prepare(...).run('operator1', hash, 'operator'); and import bcrypt at the top of the file.

### 8. src/db.js:30 — critical

- Control: `APW-STD-2.4` — standard-2.4
- Problem: Clause 2.4 — Plaintext password is inserted into the users table for the supervisor account, violating the hashing requirement.
- Change: Hash the password before inserting, e.g., const hash = bcrypt.hashSync('welcome123', 10); db.prepare(...).run('supervisor', hash, 'supervisor'); and import bcrypt at the top of the file.

### 9. src/db.js:47 — critical

- Control: `APW-SEC-02` — Database queries are parameterised
- Problem: SQL statement built by string concatenation. Control APW-SEC-02 requires parameterised queries for every database call.
- Change: Replace the concatenation with a parameterised query using ? placeholders.

### 10. src/db.js:62 — critical

- Control: `APW-STD-2.4` — standard-2.4
- Problem: Clause 2.4 — Password is compared in plaintext within a SQL WHERE clause, violating the constant‑time hash comparison rule.
- Change: Select the user by username only, then verify the supplied password against the stored hash using bcrypt.compareSync, e.g., const row = db.prepare('SELECT * FROM users WHERE username = ?').get(username); if (row && bcrypt.compareSync(password, row.password)) return row; else return null; and import bcrypt.

### 11. src/middleware/requireAuth.js:11 — critical

- Control: `APW-STD-2.5` — standard-2.5
- Problem: Clause 2.5 — The middleware parses the session token by Base64‑decoding it without verifying any signature, allowing a client to forge or modify the token.
- Change: After Base64‑decoding, split out the payload and signature, recompute the HMAC with the secret, and reject the token if the signatures do not match. Example: const [payload, sig] = decoded.split('|'); const expected = crypto.createHmac('sha256', config.secret).update(payload).digest('hex'); if (sig !== expected) return null;

### 12. src/routes/admin.js:10 — critical

- Control: `APW-SEC-03` — Every non-public route enforces authentication server-side
- Problem: Express route is registered with a handler and no authentication middleware. Control APW-SEC-03 requires every route outside the public allowlist to pass through requireAuth.
- Change: Add requireAuth, and requireSupervisor where the route is administrative, to the route's middleware chain.

### 13. src/routes/admin.js:14 — critical

- Control: `APW-SEC-03` — Every non-public route enforces authentication server-side
- Problem: Express route is registered with a handler and no authentication middleware. Control APW-SEC-03 requires every route outside the public allowlist to pass through requireAuth.
- Change: Add requireAuth, and requireSupervisor where the route is administrative, to the route's middleware chain.

### 14. src/routes/admin.js:19 — critical

- Control: `APW-SEC-03` — Every non-public route enforces authentication server-side
- Problem: Express route is registered with a handler and no authentication middleware. Control APW-SEC-03 requires every route outside the public allowlist to pass through requireAuth.
- Change: Add requireAuth, and requireSupervisor where the route is administrative, to the route's middleware chain.

### 15. src/routes/admin.js:23 — critical

- Control: `APW-SEC-03` — Every non-public route enforces authentication server-side
- Problem: Express route is registered with a handler and no authentication middleware. Control APW-SEC-03 requires every route outside the public allowlist to pass through requireAuth.
- Change: Add requireAuth, and requireSupervisor where the route is administrative, to the route's middleware chain.

### 16. src/routes/auth.js:12 — critical

- Control: `APW-STD-2.5` — standard-2.5
- Problem: Clause 2.5 — The session token is created by simple Base64 encoding of username and role, which provides no cryptographic signature, violating the requirement that tokens be signed.
- Change: Generate the token using an HMAC (or a signing library) with the app secret, e.g., const payload = `${user.username}|${user.role}`; const sig = crypto.createHmac('sha256', config.secret).update(payload).digest('hex'); const token = Buffer.from(`${payload}|${sig}`).toString('base64');

### 17. public/js/app.js:2 — high

- Control: `APW-SEC-05` — Authorisation decisions are not taken from client-controlled state
- Problem: An authorisation decision is made from client-controlled storage. Control APW-SEC-05 requires authorisation to be enforced server-side.
- Change: Remove the client-side check and enforce the role on the server for every request.

### 18. src/db.js:27 — high

- Control: `APW-SEC-07` — Accounts are never seeded with a literal password
- Problem: A user account is seeded with a literal password. Seeded credentials are shared, well known, and usually survive into production.
- Change: Do not seed accounts outside development. Where seeding is needed, store a salted hash and force a password change on first login.

### 19. src/db.js:29 — high

- Control: `APW-SEC-07` — Accounts are never seeded with a literal password
- Problem: A user account is seeded with a literal password. Seeded credentials are shared, well known, and usually survive into production.
- Change: Do not seed accounts outside development. Where seeding is needed, store a salted hash and force a password change on first login.

### 20. src/routes/admin.js:14 — high

- Control: `APW-STD-3.2` — standard-3.2
- Problem: Clause 3.2 — Bulk export endpoint does not record an audit entry.
- Change: Add code to write an audit entry (e.g., insert into audit log) before sending the response, including req.user, operation name, and record count.

### 21. src/routes/admin.js:19 — high

- Control: `APW-STD-3.2` — standard-3.2
- Problem: Clause 3.2 — Admin users list endpoint returns the full user dataset and should be considered a bulk export, but it lacks audit logging.
- Change: Insert audit logging for this endpoint, recording the user, operation, and count of returned records.

### 22. src/routes/admin.js:20 — high

- Control: `APW-STD-3.1` — standard-3.1
- Problem: Clause 3.1 — Route handler directly constructs and executes a SQL query via db.prepare().all() instead of using an exported data‑access function.
- Change: Replace the direct db.prepare(...).all() call with a call to an exported function from db.js (e.g., getAllUsers()) that performs the query.

### 23. src/routes/admin.js:23 — high

- Control: `APW-STD-3.2` — standard-3.2
- Problem: Clause 3.2 — Destructive purge endpoint does not record an audit entry.
- Change: Add audit logging before or after the DELETE, capturing the requesting user, operation, and number of rows deleted.

### 24. src/routes/admin.js:25 — high

- Control: `APW-STD-3.1` — standard-3.1
- Problem: Clause 3.1 — Route handler directly constructs and executes a SQL DELETE via db.prepare().run() instead of using an exported data‑access function.
- Change: Replace the direct db.prepare(...).run() call with a call to an exported function from db.js (e.g., purgeDowntimeBefore(date)) that performs the deletion.

### 25. src/server.js:26 — high

- Control: `APW-DEP-03` — Unhandled errors do not reach the client
- Problem: No Express error-handling middleware. Unhandled errors return a stack trace to the client.
- Change: Add app.use((err, req, res, next) => ...) after the routes; log the error and return a generic message.

### 26. src/server.js:32 — high

- Control: `APW-DEP-05` — Credentials are never written to logs
- Problem: A credential value is written to the log. Anyone with log access has the secret.
- Change: Remove the statement. Never log credential values.

### 27. public/css/admin.css:5 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #f5f5f5 is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 28. public/css/admin.css:6 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #333333 is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 29. public/css/admin.css:10 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #3498db is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 30. public/css/admin.css:17 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #dddddd is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 31. public/css/admin.css:25 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #2ecc71 is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 32. public/css/admin.css:34 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #e74c3c is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 33. public/css/admin.css:42 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #9b59b6 is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 34. public/css/admin.css:43 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #7f8c8d is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 35. public/css/admin.css:44 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #f39c12 is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 36. public/js/app.js:7 — medium

- Control: `APW-SEC-04` — Untrusted data is not written to the DOM as HTML
- Problem: Data is written to innerHTML without escaping. Control APW-SEC-04 requires DOM text to be set with textContent.
- Change: Build the DOM with createElement and set text via textContent instead of assigning innerHTML.

### 37. src/routes/logs.js:11 — medium

- Control: `APW-STD-4.1` — standard-4.1
- Problem: Clause 4.1 — The handler accepts a machine identifier via query parameter but does not validate it against the required XXX‑NN pattern before using it.
- Change: Add validation of req.query.machine (e.g., if (!/^[A-Z]{3}-\d{2}$/.test(req.query.machine)) return res.status(400).json({error: 'Invalid machine identifier'});) before calling findByMachine.

### 38. src/routes/logs.js:15 — medium

- Control: `APW-STD-4.1` — standard-4.1
- Problem: Clause 4.1 — The handler accepts a machine identifier in the request body but does not validate it against the required XXX‑NN pattern before using it.
- Change: Validate req.body.machine (e.g., if (!/^[A-Z]{3}-\d{2}$/.test(req.body.machine)) return res.status(400).json({error: 'Invalid machine identifier'});) before inserting the log entry.

### 39. src/routes/logs.js:15 — medium

- Control: `APW-STD-4.2` — standard-4.2
- Problem: Clause 4.2 — The '/logs' POST handler accepts a 'minutes' field but does not perform a type or range check to ensure it is a positive integer ≤ 480 before writing to the database.
- Change: Add validation for req.body.minutes (e.g., if (!Number.isInteger(minutes) || minutes <= 0 || minutes > 480) return res.status(400).json({error: 'Invalid minutes'});) before calling insertLog.

### 40. src/server.js:11 — medium

- Control: `APW-DEP-02` — Services expose a health endpoint
- Problem: No health or readiness endpoint. Orchestrators and load balancers cannot tell whether this process is serving.
- Change: Add GET /health returning 200 with a dependency check.

### 41. public/css/admin.css:4 — low

- Control: `APW-BRAND-03` — The approved typeface is used throughout
- Problem: Typeface set directly instead of var(--apw-font).
- Change: Use var(--apw-font).

### 42. public/js/app.js:14 — low

- Control: `APW-COR-01` — Promise chains handle rejection
- Problem: A promise chain has no rejection handler. A network or parse failure here is silent.
- Change: Add a .catch() to the chain and surface the failure in the interface.

### 43. public/js/app.js:18 — low

- Control: `APW-COR-01` — Promise chains handle rejection
- Problem: A promise chain has no rejection handler. A network or parse failure here is silent.
- Change: Add a .catch() to the chain and surface the failure in the interface.

### 44. public/js/app.js:28 — low

- Control: `APW-COR-01` — Promise chains handle rejection
- Problem: A promise chain has no rejection handler. A network or parse failure here is silent.
- Change: Add a .catch() to the chain and surface the failure in the interface.

### 45. src/server.js:30 — low

- Control: `APW-DEP-04` — Services shut down gracefully
- Problem: No SIGTERM handler. In-flight requests are dropped on every deploy. Stop accepting connections, drain, then close the database.
- Change: Handle SIGTERM: stop accepting connections, drain in-flight requests, close the database.

### 46. views/admin.html:10 — low

- Control: `APW-BRAND-02` — Colours are not hardcoded in inline styles
- Problem: Colour hardcoded in an inline style.
- Change: Move the declaration into a class in the stylesheet and use a token.

### 47. views/admin.html:11 — low

- Control: `APW-BRAND-02` — Colours are not hardcoded in inline styles
- Problem: Colour hardcoded in an inline style.
- Change: Move the declaration into a class in the stylesheet and use a token.

### 48. views/admin.html:20 — low

- Control: `APW-BRAND-02` — Colours are not hardcoded in inline styles
- Problem: Colour hardcoded in an inline style.
- Change: Move the declaration into a class in the stylesheet and use a token.

### 49. views/admin.html:25 — low

- Control: `APW-BRAND-02` — Colours are not hardcoded in inline styles
- Problem: Colour hardcoded in an inline style.
- Change: Move the declaration into a class in the stylesheet and use a token.

## When finished

Start the application and confirm it still runs. Do not commit if it does not. Then open a pull request; Cambriks will re-scan and report what was fixed, what remains, and anything newly introduced.
