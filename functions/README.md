# functions — Firebase Cloud Functions

**Status: bootstrap placeholder.** No product code has been implemented yet.

## Purpose (frozen direction)

Per `docs/architecture/Architecture-V1.md` §3, §6, §10 and
`docs/implementation/v4-implementation-research/05-cloud-functions-backend.md`:

All privileged, server-authoritative business logic: `createOrder`,
`updateOrderStatus`, `cancelOrder`, role assignment, and (future) payment
webhooks. This is where prices, totals, delivery-slot capacity, and order
state transitions are computed and enforced — never trusted from the client.

## What exists right now

- `package.json` — minimal package manifest so the root workspace and CI can
  resolve this package. No dependencies installed yet.
- `tsconfig.json` — extends the shared base config.
- `src/` — empty; awaits the first scoped implementation task.

## Risk classification

Per `docs/architecture/Repository-GitHub-Setup-V1.md` §10, anything in
`functions/` that writes orders or delivery slots is **High/Architectural
risk**: Grok challenge required, human approval required, security-focused
review.

## Do not

- Do not deploy to a real Firebase project from an agent session.
- Do not implement `createOrder`/status transitions without an approved task
  packet — these are exactly the operations the source-of-truth documents
  flag as highest risk.
