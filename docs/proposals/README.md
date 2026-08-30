# Proposals (ADRs)

Architecture Decision Records for any change to a frozen document
(`docs/architecture/`, `docs/implementation/`, `docs/workflow/`) or to a
decision recorded in `docs/decisions/DECISION-LOG.md`.

## Process

1. Open an ADR here as `NNNN-short-title.md` (four-digit sequence).
2. State: context, options considered, recommendation, consequences.
3. Human approval required before the ADR is accepted.
4. On acceptance: update the relevant frozen doc(s) and add/bump an entry in
   `docs/decisions/DECISION-LOG.md`. Optionally cut a new freeze tag
   (e.g. `impl-v4.1`) if the underlying packet was consciously re-frozen.
5. On rejection: move the ADR to `rejected/` with a one-line reason and date.

No ADR is binding until explicitly accepted by the human Product Owner
(`docs/workflow/AI-Development-Workflow-v1.md` §8; `docs/architecture/Repository-GitHub-Setup-V1.md` §2–3).

There are no ADRs yet at bootstrap time.
