#!/usr/bin/env node
/**
 * Fire & Stone — repo structure validator.
 *
 * Checks that the required top-level bootstrap structure from
 * docs/architecture/Repository-GitHub-Setup-V1.md §1 exists. This is a
 * structural presence check only — it does not validate file *content*
 * (JSON/YAML syntax is validated separately; see the bootstrap report for
 * what was checked and how).
 */

const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");

const REQUIRED_PATHS = [
  "apps/mobile",
  "apps/admin",
  "packages/shared",
  "functions",
  "docs/architecture",
  "docs/implementation",
  "docs/workflow",
  "docs/research",
  "docs/proposals",
  "docs/proposals/rejected",
  "docs/decisions",
  "docs/assumptions",
  "tasks",
  "environment",
  ".github/workflows",
  ".github/ISSUE_TEMPLATE",
  ".github/PULL_REQUEST_TEMPLATE.md",
  ".github/CODEOWNERS",
  "CLAUDE.md",
  "README.md",
  "package.json",
  "firebase.json",
  "firestore.rules",
  "firestore.indexes.json",
  "storage.rules",
  ".gitignore",
  "environment/.env.example",
  "environment/README.md",
];

let missing = [];

for (const rel of REQUIRED_PATHS) {
  const full = path.join(ROOT, rel);
  if (!fs.existsSync(full)) {
    missing.push(rel);
  }
}

if (missing.length > 0) {
  console.error("Missing required bootstrap paths:");
  for (const m of missing) {
    console.error(`  - ${m}`);
  }
  process.exit(1);
}

console.log(`All ${REQUIRED_PATHS.length} required bootstrap paths are present.`);
process.exit(0);
