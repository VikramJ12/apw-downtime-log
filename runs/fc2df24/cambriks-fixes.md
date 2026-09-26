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

### 4. src/db.js:28 — critical

- Control: `APW-STD-2.4` — standard-2.4
- Problem: Clause 2.4 — Plaintext password is inserted into the users table, violating the requirement to store only salted hashes.
- Change: Hash the password (e.g., using bcrypt) before calling .run, e.g., const hash = await bcrypt.hash('welcome123', saltRounds); then .run('operator1', hash, 'operator');

### 5. src/db.js:30 — critical

- Control: `APW-STD-2.4` — standard-2.4
- Problem: Clause 2.4 — Plaintext password is inserted into the users table for the supervisor account.
- Change: Hash the password before storing, e.g., const hash = await bcrypt.hash('welcome123', saltRounds); then .run('supervisor', hash, 'supervisor');

### 6. src/db.js:47 — critical

- Control: `APW-SEC-02` — Database queries are parameterised
- Problem: SQL statement built by string concatenation. Control APW-SEC-02 requires parameterised queries for every database call.
- Change: Replace the concatenation with a parameterised query using ? placeholders.

### 7. src/db.js:62 — critical

- Control: `APW-STD-2.4` — standard-2.4
- Problem: Clause 2.4 — Password is compared in plaintext via a SQL query, violating the constant‑time hash comparison requirement.
- Change: Retrieve the stored hash for the username and compare using a constant‑time function (e.g., bcrypt.compare(password, storedHash)).

### 8. src/middleware/requireAuth.js:11 — critical

- Control: `APW-STD-2.5` — standard-2.5
- Problem: Clause 2.5 — The session parser only base64‑decodes the cookie and extracts username/role without verifying any signature, allowing tampered tokens to be accepted.
- Change: After decoding, split out the signature, recompute the HMAC with the secret, and reject the token if the signatures do not match.

### 9. src/routes/admin.js:10 — critical

- Control: `APW-SEC-03` — Every non-public route enforces authentication server-side
- Problem: Express route is registered with a handler and no authentication middleware. Control APW-SEC-03 requires every route outside the public allowlist to pass through requireAuth.
- Change: Add requireAuth, and requireSupervisor where the route is administrative, to the route's middleware chain.

### 10. src/routes/admin.js:14 — critical

- Control: `APW-SEC-03` — Every non-public route enforces authentication server-side
- Problem: Express route is registered with a handler and no authentication middleware. Control APW-SEC-03 requires every route outside the public allowlist to pass through requireAuth.
- Change: Add requireAuth, and requireSupervisor where the route is administrative, to the route's middleware chain.

### 11. src/routes/admin.js:19 — critical

- Control: `APW-SEC-03` — Every non-public route enforces authentication server-side
- Problem: Express route is registered with a handler and no authentication middleware. Control APW-SEC-03 requires every route outside the public allowlist to pass through requireAuth.
- Change: Add requireAuth, and requireSupervisor where the route is administrative, to the route's middleware chain.

### 12. src/routes/admin.js:23 — critical

- Control: `APW-SEC-03` — Every non-public route enforces authentication server-side
- Problem: Express route is registered with a handler and no authentication middleware. Control APW-SEC-03 requires every route outside the public allowlist to pass through requireAuth.
- Change: Add requireAuth, and requireSupervisor where the route is administrative, to the route's middleware chain.

### 13. src/routes/auth.js:12 — critical

- Control: `APW-STD-2.5` — standard-2.5
- Problem: Clause 2.5 — The session token is created by simply base64‑encoding username and role, which provides no cryptographic signature and can be forged by a client.
- Change: Generate the token using an HMAC or a signing library, e.g., `const payload = `${user.username}|${user.role}`; const sig = hmac(secret, payload); const token = Buffer.from(`${payload}|${sig}`).toString('base64');`

### 14. public/js/app.js:2 — high

- Control: `APW-SEC-05` — Authorisation decisions are not taken from client-controlled state
- Problem: An authorisation decision is made from client-controlled storage. Control APW-SEC-05 requires authorisation to be enforced server-side.
- Change: Remove the client-side check and enforce the role on the server for every request.

### 15. src/db.js:27 — high

- Control: `APW-SEC-07` — Accounts are never seeded with a literal password
- Problem: A user account is seeded with a literal password. Seeded credentials are shared, well known, and usually survive into production.
- Change: Do not seed accounts outside development. Where seeding is needed, store a salted hash and force a password change on first login.

### 16. src/db.js:29 — high

- Control: `APW-SEC-07` — Accounts are never seeded with a literal password
- Problem: A user account is seeded with a literal password. Seeded credentials are shared, well known, and usually survive into production.
- Change: Do not seed accounts outside development. Where seeding is needed, store a salted hash and force a password change on first login.

### 17. src/routes/admin.js:14 — high

- Control: `APW-STD-3.2` — standard-3.2
- Problem: Clause 3.2 — Bulk export endpoint does not record an audit entry naming the user, operation, and number of records exported.
- Change: Add an audit log call before sending the response, e.g., insertAudit(req.user.username, 'export', listAll().length);

### 18. src/routes/admin.js:19 — high

- Control: `APW-STD-3.2` — standard-3.2
- Problem: Clause 3.2 — Administrative users list endpoint exports all user records but does not record an audit entry.
- Change: Add an audit log before responding, e.g., const users = db.prepare('SELECT ...').all(); insertAudit(req.user.username, 'export_users', users.length);

### 19. src/routes/admin.js:20 — high

- Control: `APW-STD-3.1` — standard-3.1
- Problem: Clause 3.1 — The route handler constructs and executes a SQL query directly via db.prepare().all(), bypassing the data access module.
- Change: Create an exported function in db.js (e.g., listUsers()) that runs this query and replace the line with `res.json(listUsers());`. Remove the direct db import if not needed.

### 20. src/routes/admin.js:23 — high

- Control: `APW-STD-3.2` — standard-3.2
- Problem: Clause 3.2 — Destructive purge endpoint does not record an audit entry naming the user, operation, and number of records deleted.
- Change: After the DELETE run, capture the affected rows count and log it, e.g., const info = db.prepare('DELETE ...').run(before); insertAudit(req.user.username, 'purge', info.changes);

### 21. src/routes/admin.js:25 — high

- Control: `APW-STD-3.1` — standard-3.1
- Problem: Clause 3.1 — The route handler constructs and executes a DELETE query directly via db.prepare().run(), bypassing the data access module.
- Change: Add an exported function in db.js (e.g., purgeDowntime(before)) that performs this deletion and replace the line with `purgeDowntime(before);`.

### 22. src/server.js:26 — high

- Control: `APW-DEP-03` — Unhandled errors do not reach the client
- Problem: No Express error-handling middleware. Unhandled errors return a stack trace to the client.
- Change: Add app.use((err, req, res, next) => ...) after the routes; log the error and return a generic message.

### 23. src/server.js:32 — high

- Control: `APW-DEP-05` — Credentials are never written to logs
- Problem: A credential value is written to the log. Anyone with log access has the secret.
- Change: Remove the statement. Never log credential values.

### 24. public/css/admin.css:5 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #f5f5f5 is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 25. public/css/admin.css:6 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #333333 is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 26. public/css/admin.css:10 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #3498db is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 27. public/css/admin.css:17 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #dddddd is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 28. public/css/admin.css:25 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #2ecc71 is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 29. public/css/admin.css:34 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #e74c3c is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 30. public/css/admin.css:42 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #9b59b6 is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 31. public/css/admin.css:43 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #7f8c8d is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 32. public/css/admin.css:44 — medium

- Control: `APW-BRAND-01` — Colours come from the approved palette
- Problem: #f39c12 is not in the Anand Precision Works palette.
- Change: Replace the literal with the matching var(--apw-*) token.

### 33. public/js/app.js:7 — medium

- Control: `APW-SEC-04` — Untrusted data is not written to the DOM as HTML
- Problem: Data is written to innerHTML without escaping. Control APW-SEC-04 requires DOM text to be set with textContent.
- Change: Build the DOM with createElement and set text via textContent instead of assigning innerHTML.

### 34. src/routes/logs.js:11 — medium

- Control: `APW-STD-4.1` — standard-4.1
- Problem: Clause 4.1 — The handler accepts a machine identifier via query parameter 'machine' but does not validate its format before passing it to findByMachine.
- Change: Add validation of req.query.machine against the pattern /^[A-Z]{3}-\d{2}$/ and return an error (e.g., 400 Bad Request) if it does not match before calling findByMachine.

### 35. src/routes/logs.js:15 — medium

- Control: `APW-STD-4.1` — standard-4.1
- Problem: Clause 4.1 — The handler accepts a machine identifier in the request body but does not validate its format before inserting the log entry.
- Change: Validate req.body.machine against the pattern /^[A-Z]{3}-\d{2}$/ and reject the request with a 400 error if it does not conform before calling insertLog.

### 36. src/routes/logs.js:15 — medium

- Control: `APW-STD-4.2` — standard-4.2
- Problem: Clause 4.2 — The '/logs' POST handler accepts a 'minutes' field but does not perform type or range validation, violating the requirement that downtime minutes be a positive integer up to 480 before any database write.
- Change: Add validation for req.body.minutes (e.g., if (!Number.isInteger(minutes) || minutes <= 0 || minutes > 480) return res.status(400).json({ error: 'Invalid minutes' });) before calling insertLog(entry).

### 37. src/server.js:11 — medium

- Control: `APW-DEP-02` — Services expose a health endpoint
- Problem: No health or readiness endpoint. Orchestrators and load balancers cannot tell whether this process is serving.
- Change: Add GET /health returning 200 with a dependency check.

### 38. public/css/admin.css:4 — low

- Control: `APW-BRAND-03` — The approved typeface is used throughout
- Problem: Typeface set directly instead of var(--apw-font).
- Change: Use var(--apw-font).

### 39. public/js/app.js:14 — low

- Control: `APW-COR-01` — Promise chains handle rejection
- Problem: A promise chain has no rejection handler. A network or parse failure here is silent.
- Change: Add a .catch() to the chain and surface the failure in the interface.

### 40. public/js/app.js:18 — low

- Control: `APW-COR-01` — Promise chains handle rejection
- Problem: A promise chain has no rejection handler. A network or parse failure here is silent.
- Change: Add a .catch() to the chain and surface the failure in the interface.

### 41. public/js/app.js:28 — low

- Control: `APW-COR-01` — Promise chains handle rejection
- Problem: A promise chain has no rejection handler. A network or parse failure here is silent.
- Change: Add a .catch() to the chain and surface the failure in the interface.

### 42. src/server.js:30 — low

- Control: `APW-DEP-04` — Services shut down gracefully
- Problem: No SIGTERM handler. In-flight requests are dropped on every deploy. Stop accepting connections, drain, then close the database.
- Change: Handle SIGTERM: stop accepting connections, drain in-flight requests, close the database.

### 43. views/admin.html:10 — low

- Control: `APW-BRAND-02` — Colours are not hardcoded in inline styles
- Problem: Colour hardcoded in an inline style.
- Change: Move the declaration into a class in the stylesheet and use a token.

### 44. views/admin.html:11 — low

- Control: `APW-BRAND-02` — Colours are not hardcoded in inline styles
- Problem: Colour hardcoded in an inline style.
- Change: Move the declaration into a class in the stylesheet and use a token.

### 45. views/admin.html:20 — low

- Control: `APW-BRAND-02` — Colours are not hardcoded in inline styles
- Problem: Colour hardcoded in an inline style.
- Change: Move the declaration into a class in the stylesheet and use a token.

### 46. views/admin.html:25 — low

- Control: `APW-BRAND-02` — Colours are not hardcoded in inline styles
- Problem: Colour hardcoded in an inline style.
- Change: Move the declaration into a class in the stylesheet and use a token.

## When finished

Start the application and confirm it still runs. Do not commit if it does not. Then open a pull request; Cambriks will re-scan and report what was fixed, what remains, and anything newly introduced.
