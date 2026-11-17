# Engineering audit summary

**Standard:** Anand Precision Works — baseline engineering standard  
**Gate:** FAIL  
**Open findings:** 48

The gate is closed. Of 48 open findings, 16 critical and 9 high exceed what the standard allows. Security is the weakest area, carrying 19 of the findings including 15 critical. 12 findings came from checking the code against clauses of the written standard that no scanner can express.

| Area | Score | Critical | High | Medium | Low |
|---|---|---|---|---|---|
| Security | 0 | 15 | 3 | 1 | 0 |
| Deployment readiness | 77 | 1 | 2 | 1 | 1 |
| Brand conformance | 77 | 0 | 0 | 9 | 5 |
| Architecture | 80 | 0 | 4 | 0 | 0 |
| Correctness | 91 | 0 | 0 | 3 | 3 |

## What found these

| Detector | Findings |
|---|---|
| Semgrep | 15 |
| Brand agent | 14 |
| Standard agent | 12 |
| Deployment agent | 5 |
| gitleaks | 3 |
