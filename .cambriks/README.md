# .cambriks

Everything Cambriks audits this repository against. It lives here, in the
repository, because it belongs to the team — not to the tool.

    policy.yaml          controls, severities and the gate thresholds
    standard.md          the written engineering standard, as prose
    standard.yaml        that standard compiled into controls, human-approved
    design-tokens.json   the approved colour palette and typeface
    project.yaml         app name, repo, environment and who is accountable

Changing any of these goes through a pull request like any other change, and
the diff shows exactly what moved. Every report stamps the policy pack version
it ran against, so an old report can always be explained.
