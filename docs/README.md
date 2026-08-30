# Fire & Stone — `docs/` index

This folder holds the frozen source-of-truth documents and the supporting
research and process artifacts referenced by
[`architecture/Repository-GitHub-Setup-V1.md`](architecture/Repository-GitHub-Setup-V1.md).

## Source-of-truth hierarchy (highest rank wins)

1. Human-approved freezes in git — `architecture/`, `implementation/`,
   `workflow/`, `decisions/DECISION-LOG.md`
2. Accepted GitHub Issues + task packets (for the scope of that work)
3. Code on `main` (for runtime behavior)
4. Open ADRs / proposals in `proposals/` — **not binding** until accepted
5. Research packets in `research/` and `implementation/v4-implementation-research/`
   — advisory until reflected in the Decision Log or an accepted ADR
6. Chat transcripts — **never** authoritative

See `architecture/Repository-GitHub-Setup-V1.md` §2 for the full table.

## Layout

| Path | Contents |
|------|----------|
| `architecture/` | Architecture V1 (frozen baseline) and this repository's own setup specification |
| `implementation/` | V4 Implementation baseline (frozen) and the 12 frozen V4 research packets it summarizes |
| `workflow/` | AI Development Workflow V1 (frozen) |
| `research/` | Supporting/background research packets (architecture-research set). Advisory, not binding |
| `proposals/` | ADRs. `proposals/rejected/` holds ADRs that were considered and declined |
| `decisions/` | `DECISION-LOG.md` — concise, accepted decision reference |
| `assumptions/` | Open assumptions, filed by issue id, pending resolution |

## Rule

Frozen documents in `architecture/`, `implementation/`, and `workflow/` are
**not** silently rewritten, simplified, merged, or reinterpreted. A change to
any of them requires an ADR in `proposals/` and human approval per
`architecture/Repository-GitHub-Setup-V1.md` §3.
