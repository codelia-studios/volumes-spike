# Spike results

Fill in one row per test. "Observed" is what actually happened, with times where
the test measures a wake-up. "Choice" is the variant it selects (see RUNBOOK.md).

| Test | Question | Result | Observed | Choice |
|---|---|---|---|---|
| T1a | A plugin reaches project threads | **Fail** (2026-11-10) | No Plugins section in Project settings, although the docs list one. The plugin was added through Customize → Plugins → Add marketplace (`volumes-spike-plugins`) and synced to local Claude Code, but a fresh project thread reported the skill missing. | Fallback 1: account skills |
| T1b | Account skills load in project threads; subagents take a chosen model; git hooks run | **Pass** (2026-11-10) | Skill loaded as `anthropic-skills:volumes-spike-probe` from `/root/.claude/skills/synced/…`, and `${CLAUDE_SKILL_DIR}` was substituted. Subagents ran on `claude-opus-5-5` and `claude-sonnet-5-5` as requested; the main thread ran Sonnet. The git pre-commit hook ran. `gh api` worked; `gh pr` got a 403. VM: 4 vCPU, 15 GB. Surprise: three repos were cloned, and agents and skills from volumes-android's (and, apparently, volumes-ios's) `.claude` were visible, against the docs. | Account skills work. T1c checks whether repo `.claude` works too |
| T1c | A skill, agent and hook committed in the repo's `.claude` load in a project thread | **Partial** (2026-11-10) | Repo skill loaded as `volumes-repo-probe` (no prefix) from `/home/user/volumes-spike/.claude/skills/`. The repo agent `repo-probe` ran on its pinned model, `claude-opus-5-5`. The repo's SessionStart hook did not run: the session starts in `/home/user`, which is not a git repo, with each repo cloned one level down, and settings aren't read from there. With three repos attached, every attached repo's skills and agents were visible; with only volumes-spike, only its own (rerun, branch `spike/t1c-2026-11-10-rerun`). | Repo skills and agents: the pipeline stays in `volumes-android/.claude`. Nothing in its `settings.json` can be relied on (see below) |
| T1d | A workflow committed in the repo's `.claude/workflows` runs in a project thread, unattended, with repo agent types, model, effort and schema | **Pass** (2026-11-10) | The Workflow tool was loaded, not deferred. `repo-probe-flow` was found by name on the first call, although no list showed it beforehand. No approval prompt. It ran in 12 s. `args` came back unchanged. a: the repo agent type ran on its pinned `claude-opus-5-5`. b: the `haiku` + `effort: low` override ran on `claude-haiku-5-5` and returned structured output. c: the repo agent type with a schema returned `{model: claude-opus-5-5, lines: 21}`. No nulls (branch `spike/t1d-2026-11-10`). | port-slice.js can run in a project thread as it does in today's slice sessions: adapt it, don't split it into one thread per phase. Unproven: a multi-hour run, which the first real slice will show |
| T2 | A thread's report makes the coordinator act without the owner | **Sample 1: fail** (2026-11-10); sample 2 (pulse) pending | The T1d thread finished at 08:11 UTC, and its report reached the coordinator at 08:11 (the coordinator confirmed this when asked afterwards, and summarised the report correctly). But the coordinator posted nothing on its own in the 12 minutes after. A report reaches the coordinator; it doesn't make the coordinator speak or act unprompted. | Pending sample 2. Since T1d passed, a whole slice runs in one thread, so only the start and the finish of an item need the coordinator |
| T3 | GitHub Actions can start a project thread through `/fire` | **Fail** (2026-11-10) | Spike fire exists, but the routine has no API token (`api_token_hint` empty), and its page in the project offers no way to make one, so GitHub Actions has nothing to call `/fire` with. Run by hand at 08:51:50 UTC, it did start a proper project thread: project instructions in context, volumes-spike cloned, `anthropic-skills:volumes-spike-pulse` loaded, Sonnet. The thread posted its report to the project conversation and marked its thread resolved, all in 37 s. | The drift Action and nightly triage open GitHub issues, and the pulse lists them as ready |
| T4 | CI and review comments wake the thread that owns the PR; a label starts a fresh reviewer | **Partial** (2026-11-10) | Wake 1 passed: the CI failure woke the build thread about 13 s after the PR opened, and it fixed the bug and got CI green on its own. Wake 2 (a label starts a fresh reviewer) can't be tested: no GitHub event tasks in this beta (see below). Wake 3 (a review comment wakes the thread): not yet tested. | Auto-fix is the feedback loop for CI. Reviews run inside the build thread (port-slice.js's reviewer agents) |
| T5 | The coordinator can run shell commands | **No** (2026-11-10) | In its own words, its tools "only cover messaging, threads and project settings". It couldn't run `uname` or `date`. | The pulse thread stays the coordinator's eyes, as the design has it |
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
- Scheduled tasks (2026-11-10): the coordinator can't create them, but a thread can. A thread's toolset has
  `create_trigger`, `fire_trigger`, `send_later` and `subscribe_pr_activity`, among others; the coordinator's
  has only messaging, threads and project settings. The coordinator handed the job to a thread, which created
  Spike pulse (`trig_01YMTRAV2jYpmXsAkGJgy9md`, `7 * * * *`, first run 09:07 UTC) and Spike fire
  (`trig_01LcVQuU59d19TLd5kGkxsLF`, no API token yet). Both are tied to the project (created from
  the Projects surface, same project channel, tag `config:hearth-routine-run-thread`). Spike review, the GitHub
  event task, couldn't be created: the thread's `create_trigger` has no GitHub event trigger, and the owner couldn't
  create it in the project either. So T4's second wake-up (a label starts a fresh reviewer) can't be tested.
  It isn't needed: since T1d, reviews run inside the build thread as port-slice.js's reviewer agents, which is
  the runbook's fallback for that wake-up. In T4 the owner posts the review comment by hand instead.
- A project routine with no repository or skill of its own gets both from the project at run time: the manual
  Spike fire run cloned volumes-spike and loaded the account skill. Threads report through
  `mcp__hearthbot__post_message` and close themselves with `set_thread_resolved`. The run labelled itself
  "started by: schedule", although it was started by hand.
