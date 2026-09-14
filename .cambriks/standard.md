# Anand Precision Works — Engineering Standard

Version 2.1 · Approved 2025-11-04 · Owner: Head of Plant Systems

Applies to all internal applications that touch plant data, including
shop-floor tools, dashboards and integrations.

## 2. Security

**2.1** Credentials, API keys and connection secrets are read from the
environment at runtime. They are never written as literals in source, and
never committed in any form.

**2.2** All database queries are parameterised. String concatenation or
interpolation of user-supplied values into SQL is prohibited.

**2.3** Every route enforces authentication on the server. Hiding a control
in the interface is presentation, not authorisation. Only the sign-in,
sign-out and health routes are exempt.

**2.4** Passwords are stored as a salted hash and compared using a
constant-time function. Plaintext passwords must never be written to the
database, included in a query, or compared with an equality operator.

**2.5** Session tokens are cryptographically signed and their integrity is
verified on every request. Encoding is not signing: a token that a client
can decode, edit and re-encode is forgeable and unacceptable.

## 3. Architecture

**3.1** All plant data access goes through the data access module
(`db.js`). Route handlers must call the exported functions and must not
construct or execute queries directly.

**3.2** Any endpoint that performs a bulk export or a destructive operation
records an audit entry naming the requesting user, the operation and the
number of records affected.

## 4. Plant data integrity

**4.1** Machine identifiers follow the pattern `XXX-NN` — three uppercase
letters, a hyphen, two digits. Identifiers are validated on input and
non-conforming values rejected.

**4.2** Downtime is recorded in whole minutes. A value must be a positive
integer no greater than 480, the length of one shift. Values outside that
range are rejected before any write.

## 5. Operations

**5.1** Every service exposes a health endpoint that reports whether it can
serve traffic, including the state of its dependencies.
