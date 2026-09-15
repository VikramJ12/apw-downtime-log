# Engineering audit summary

**Standard:** Anand Precision Works — baseline engineering standard  
**Gate:** FAIL  
**Open findings:** 46

The gate is closed. Of 46 open findings, 13 critical and 10 high exceed what the standard allows. Security is the weakest area, carrying 16 of the findings including 12 critical. 13 findings came from checking the code against clauses of the written standard that no scanner can express.

| Area | Score | Critical | High | Medium | Low |
|---|---|---|---|---|---|
| Security | 0 | 12 | 3 | 1 | 0 |
| Architecture | 75 | 0 | 5 | 0 | 0 |
| Deployment readiness | 77 | 1 | 2 | 1 | 1 |
| Brand conformance | 77 | 0 | 0 | 9 | 5 |
| Correctness | 91 | 0 | 0 | 3 | 3 |

## What found these

| Detector | Findings |
|---|---|
| Semgrep | 14 |
| Brand agent | 14 |
| Standard agent | 13 |
| Deployment agent | 5 |
