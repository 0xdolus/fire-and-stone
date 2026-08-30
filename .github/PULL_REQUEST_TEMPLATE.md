<!--
Fire & Stone PR template. Fill in every section — see
docs/architecture/Repository-GitHub-Setup-V1.md §6 and CLAUDE.md
"PR conventions" for what each section is expected to contain.
-->

## Related issue(s)

Closes #

## Summary

<!-- What changed and why, in a few sentences. -->

## Acceptance criteria

<!-- Copy the checklist from the originating issue/task packet and check
     off what this PR satisfies. If an item is not satisfied, say so
     explicitly rather than omitting it. -->

- [ ] AC-1
- [ ] AC-2

## Tests run

<!-- What was actually executed, and where (local / CI). Do not claim a
     check passed unless it was observed passing. -->

- [ ] `npm run lint --workspaces`
- [ ] `npm run typecheck --workspaces`
- [ ] `npm run test --workspaces`
- [ ] Firestore/Storage rules tests (emulator) — if `firestore.rules` /
      `storage.rules` changed
- [ ] Manual verification (describe below)

## Assumptions

<!-- Any assumption made that isn't confirmed by a frozen document or the
     task packet. File a corresponding entry under docs/assumptions/ if the
     assumption is non-trivial or blocking. -->

## Risk classification

<!-- Must match the classification on the originating issue. -->

- [ ] Trivial
- [ ] Low
- [ ] Medium
- [ ] High
- [ ] Architectural

## Paths touched

<!-- List top-level paths changed. Confirm none fall outside the allowed
     paths stated in the originating task packet. -->

## Architecture references

<!-- Which frozen document(s)/section(s) this PR implements or relies on. -->

- Freeze: impl-v4 / arch-v1 / workflow-v1
- Sections:

## Security notes

<!-- Confirm: no secrets, credentials, or production data included. Note
     any change to rules, auth, or roles explicitly. -->
