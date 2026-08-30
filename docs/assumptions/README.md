# Open assumptions

Assumptions made during implementation that are not yet confirmed by a
frozen document, an accepted ADR, or explicit human sign-off, filed one per
GitHub issue.

## Format

Create `ISSUE-<number>.md` with:

```markdown
## Assumption
## Why it was needed
## Risk if wrong
## Status: OPEN | RESOLVED | PROMOTED-TO-ADR
```

An unresolved **blocking** assumption prevents a PR from passing review
(`docs/architecture/Repository-GitHub-Setup-V1.md` §6, "Assumption reporting").

There are no open assumption files yet at bootstrap time. Bootstrap-level
assumptions made by this task are recorded in the bootstrap report, not here,
since they precede any issue number.
