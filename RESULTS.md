# Spike results

Fill in one row per test. "Observed" is what actually happened, with times where
the test measures a wake-up. "Choice" is the variant it selects (see RUNBOOK.md).

| Test | Question | Result | Observed | Choice |
|---|---|---|---|---|
| T1a | A plugin reaches project threads | **Fail** (2026-11-10) | No Plugins section in Project settings, although the docs list one. The plugin was added through Customize → Plugins → Add marketplace (`volumes-spike-plugins`) and synced to local Claude Code, but a fresh project thread reported the skill missing. | Fallback 1: account skills |
| T1b | Account skills load in project threads; subagents take a chosen model; git hooks run | **Pass** (2026-11-10) | Skill loaded as `anthropic-skills:volumes-spike-probe` from `/root/.claude/skills/synced/…`, and `${CLAUDE_SKILL_DIR}` was substituted. Subagents ran on `claude-opus-5-5` and `claude-sonnet-5-5` as requested; the main thread ran Sonnet. The git pre-commit hook ran. `gh api` worked; `gh pr` got a 403. VM: 4 vCPU, 15 GB. Surprise: three repos were cloned, and agents and skills from volumes-android's (and, apparently, volumes-ios's) `.claude` were visible, against the docs. | Account skills work. T1c checks whether repo `.claude` works too |
| T1c | A skill, agent and hook committed in the repo's `.claude` load in a project thread | **Partial** (2026-11-10) | Repo skill loaded as `volumes-repo-probe` (no prefix) from `/home/user/volumes-spike/.claude/skills/`. The repo agent `repo-probe` ran on its pinned model, `claude-opus-5-5`. The repo's SessionStart hook did not run: the session starts in `/home/user`, which is not a git repo, with each repo cloned one level down, and settings aren't read from there. With three repos attached, every attached repo's skills and agents were visible; with only volumes-spike, only its own (rerun, branch `spike/t1c-2026-11-10-rerun`). | Repo skills and agents: the pipeline stays in `volumes-android/.claude`. Nothing in its `settings.json` can be relied on (see below) |
| T2 | A thread's report makes the coordinator act without the owner | | | |
| T3 | GitHub Actions can start a project thread through `/fire` | | | |
| T4 | CI and review comments wake the thread that owns the PR; a label starts a fresh reviewer | | | |
| T5 | The coordinator can run shell commands | | | |
| T6 | A Remote Control thread on the Dedibox reaches the emulators (optional) | | | |
| T7 | Cost per merged item at or below today's, with the coordinator at 10% or less (after 3–5 real items) | | | |

**How the plugin got into the project** (exact route the Plugins screen offered):

**What T1c means for volumes-android's `.claude/settings.json`** (inferred: T1c tested only the hook, but a file that isn't read can't apply any of its parts):

| Today, from `settings.json` | In a project thread |
|---|---|
| SessionStart: `.githooks/install.sh` | Already done by the environment's setup script (`cloud-setup.sh` step 3 finds the repo through `/home/user/*/gradlew`). Git hooks run (T1b) |
| SessionStart: `inbox_poller.py` | Not needed: the coordinator replaces the channel |
| PostToolUse: spec lint on `spec/S-*.md` edits | Moves to a pre-commit check; the gate's `50-spec-lint` still catches it |
| Stop, SubagentStop, SessionEnd: `meter.py` | The project's Usage tab replaces it (T7) |
| `env`: `BASH_DEFAULT_TIMEOUT_MS=600000` | An environment variable on the cloud environment |
| `permissions.deny`: no force-push, no push to `main` or `wave/*` | Gone. GitHub rulesets must enforce it (part of the spine) |

**Anything surprising:**

- T1b (2026-11-10): the project cloned volumes-android and volumes-ios as well as
  volumes-spike, probably from the setup suggestions. Both were removed before T1c.
  A thread can add a repository from an owner the project already uses
  (codelia-studios), so the instructions now forbid adding repositories.
- T1c: attaching a repository brings in its `.claude` skills and agents, so attaching volumes-ios to the real
  project would put its `release`, `app-store-copy` and `product-owner` in every thread. The iOS reference
  should arrive as volumes-android's read-only submodule, not as an attached repository.
- T1c rerun: the subagent's reply arrived as a hand-back message, not as the Agent tool's result.
