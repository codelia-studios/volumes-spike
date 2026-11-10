# Spike results

Fill in one row per test. "Observed" is what actually happened, with times where
the test measures a wake-up. "Choice" is the variant it selects (see RUNBOOK.md).

| Test | Question | Result | Observed | Choice |
|---|---|---|---|---|
| T1a | A plugin reaches project threads | **Fail** (2026-11-10) | No Plugins section in Project settings, although the docs list one. The plugin was added through Customize → Plugins → Add marketplace (`volumes-spike-plugins`) and synced to local Claude Code, but a fresh project thread reported the skill missing. | Fallback 1: account skills |
| T1b | Account skills load in project threads; subagents take a chosen model; git hooks run | **Pass** (2026-11-10) | Skill loaded as `anthropic-skills:volumes-spike-probe` from `/root/.claude/skills/synced/…`, and `${CLAUDE_SKILL_DIR}` was substituted. Subagents ran on `claude-opus-5-5` and `claude-sonnet-5-5` as requested; the main thread ran Sonnet. The git pre-commit hook ran. `gh api` worked; `gh pr` got a 403. VM: 4 vCPU, 15 GB. Surprise: three repos were cloned, and agents and skills from volumes-android's (and, apparently, volumes-ios's) `.claude` were visible, against the docs. | Account skills work. T1c checks whether repo `.claude` works too |
| T1c | A skill, agent and hook committed in the repo's `.claude` load in a project thread | | | |
| T2 | A thread's report makes the coordinator act without the owner | | | |
| T3 | GitHub Actions can start a project thread through `/fire` | | | |
| T4 | CI and review comments wake the thread that owns the PR; a label starts a fresh reviewer | | | |
| T5 | The coordinator can run shell commands | | | |
| T6 | A Remote Control thread on the Dedibox reaches the emulators (optional) | | | |
| T7 | Cost per merged item at or below today's, with the coordinator at 10% or less (after 3–5 real items) | | | |

**How the plugin got into the project** (exact route the Plugins screen offered):

**Anything surprising:**

- T1b (2026-11-10): the project cloned volumes-android and volumes-ios as well as
  volumes-spike, probably from the setup suggestions. Both were removed before T1c.
  A thread can add a repository from an owner the project already uses
  (codelia-studios), so the instructions now forbid adding repositories.
