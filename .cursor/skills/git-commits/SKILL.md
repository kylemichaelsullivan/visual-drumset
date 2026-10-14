---
name: git-commits
description: >-
  Run lint and build, fix failures in a loop until green, then commit all
  uncommitted changes using documentation/GIT_COMMITS.md. Use when the user
  invokes /git-commits or asks to lint-test-fix-then-commit.
disable-model-invocation: true
---

# Git Commits

Validate the working tree, fix until green, then commit every uncommitted change per project guidelines.

**Authoritative commit rules:** read and follow [`documentation/GIT_COMMITS.md`](../../../documentation/GIT_COMMITS.md) before grouping or committing.

## Workflow Checklist

```
Progress:
- [ ] 1. Inventory uncommitted changes
- [ ] 2. Lint + build gate (loop until green)
- [ ] 3. Group files for commits (no plan files)
- [ ] 4. Create commits
- [ ] 5. Verify clean tree (or only intentional leftovers)
```

## 1. Inventory

Run in parallel:

- `git status`
- `git diff` and `git diff --staged`
- `git log -8 --oneline` (match recent message style)

Do not create plan files or temporary planning documents.

## 2. Lint + Build Gate (loop until green)

Use **bun** only. This repo has no automated test suite yet (see Development Setup); the quality gate is lint + production build (includes `tsc -b`).

### Commands (required)

1. `bun lint`
2. `bun run build`

### Fix Loop

1. Run both commands above.
2. If anything fails:
   - Diagnose from the command output
   - Fix the underlying bugs / lint / format / type errors
   - Re-run the failing command(s), then re-run the full gate
3. Repeat until **both** pass with exit code 0.
4. Do **not** commit while the gate is red.
5. If blocked after repeated honest attempts (flaky infra, missing secrets, unclear product decision), stop and report what failed — do not force a commit.

Auto-fix safe formatting when helpful (`bun format` or `bun run lint:fix`), then re-run the gate.

## 3. Group Files for Commits

Follow the **AI Chat Workflow** in `documentation/GIT_COMMITS.md`:

1. **Include all uncommitted changes** — every modified/untracked file belongs in exactly one commit group.
2. **One commit per file assignment** — a file must not appear in multiple groups; do not split one file across commits.
3. **No staging during organization** — decide groups first; stage only when creating each commit.
4. **Logical groups** — related files that share one purpose go together; prefer clear `TYPE` boundaries (ADD vs UPDATE vs FIX, etc.).
5. **No secrets** — do not commit `.env`, credentials, or similar; warn the user if present.

## 4. Create Commits

### Message Format (required)

```
TYPE: Commit Message in Title Case
```

Valid types: `ADD` | `BRANCH` | `DEPLOY` | `FIX` | `MERGE` | `REFACTOR` | `REMOVE` | `REVERT` | `UPDATE`

Rules:

- Uppercase type, then `: `, then Title Case message
- Concise and specific (aim ≤ 50 characters for the subject)
- Optional body with bullet details for complex changes

### Git Safety

- Never update git config
- Never `--no-verify` / skip hooks unless the user explicitly asks
- Never force-push or destructive git commands unless explicitly asked
- Never push unless explicitly asked
- Do not amend unless the user’s usual amend conditions are met
- If a hook rejects a commit, fix and create a **new** commit (do not amend a failed commit)

### Per-Commit Sequence

For each group, in dependency-friendly order:

1. `git add` **only** that group’s paths
2. Commit with a HEREDOC message:

```bash
git commit -m "$(cat <<'EOF'
TYPE: Commit Message in Title Case

EOF
)"
```

3. Continue until every uncommitted file from the inventory is committed

## 5. Verify

- `git status` — expect a clean working tree (aside from ignored files)
- Briefly summarize commits created (hash + subject)

## Out of Scope

- Pushing, PRs, version bumps, and changelog generation unless the user asks separately
- Leaving ungrouped uncommitted files “for later”
