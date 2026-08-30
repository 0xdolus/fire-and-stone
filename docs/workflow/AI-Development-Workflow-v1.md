# Fire & Stone — AI Development Workflow V1

**Status:** Frozen operating baseline

## 1. Agents

### ChatGPT — Director / Coordinator
Owns product interpretation, architecture coordination, task decomposition, acceptance criteria, research synthesis and implementation review.

### Grok — Research / Challenge
Owns external research, source-backed comparisons, challenge, risk analysis and high-risk adversarial reviews when requested.

### Claude — Implementation
Owns code, tests, PR-sized changes, local verification and completion reporting within approved task packets.

### Human — Product Owner
Owns final decisions, production access, secrets, legal/business decisions, architecture approval and merge approval during Workflow V1.

## 2. Authority

Human-approved artifacts in git are authoritative. Chat transcripts are never authoritative.

## 3. Core loop

```text
Question → Research → Decision → Specification → Task → Implementation → CI → AI Review → Human Approval → Merge
```

## 4. Research artifacts

Grok returns versioned research packets with:

- Goal
- Constraints
- Questions
- Findings (facts)
- Options
- Recommendation
- Uncertainty
- Failure modes
- Sources
- Decisions required

Research does not automatically become architecture.

## 5. Claude task packets

Each implementation task contains:

- Goal / Non-goals
- Acceptance criteria
- Allowed paths
- Forbidden paths
- Dependencies
- Architecture/design references
- Test plan
- Security notes
- Out-of-scope list

Claude must stop rather than invent requirements when an unresolved decision is encountered.

## 6. Review

CI provides automated verification.
ChatGPT reviews intent and acceptance criteria.
Grok is invoked for high-risk work such as auth, security rules, money, payment webhooks and sensitive backend operations.
Human approval is required for merge in Workflow V1.

## 7. Security boundaries

No AI receives production secrets, production payment credentials, production database exports or live customer PII. Synthetic data and emulator environments are the default.

## 8. Architecture changes

Architecture changes require an ADR/decision and human approval before implementation continues.

## 9. Task states

```text
DRAFT → READY → IN PROGRESS → IMPLEMENTED → CI PASSED → AI REVIEW → HUMAN APPROVAL → MERGED
```

Any state may become BLOCKED. Architecture changes leave the normal path and enter ADR/re-specification.

## 10. Cost principle

Use AI selectively. Use local emulators and automated CI in preference to unnecessary cloud execution or repeated context transmission.
