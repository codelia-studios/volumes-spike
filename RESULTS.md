# Spike results

Fill in one row per test. "Observed" is what actually happened, with times where
the test measures a wake-up. "Choice" is the variant it selects (see RUNBOOK.md).

| Test | Question | Result | Observed | Choice |
|---|---|---|---|---|
| T1 | Plugin skills, agents (with pinned models), hooks and workflows load in a cloud thread | Fail: nothing loaded | Plugin added in Project settings → Plugins (04:14Z). Probe thread started 04:19Z after the add: Skill tool returned "Unknown skill" for `volumes-engine-spike:spike-probe`; no plugin skills listed; plugin and skill search for "volumes"/"spike" found nothing; no probe files on disk. Nothing ran, repo unchanged. Agents, hooks and workflow untested because the skill never loaded. | Closest row: plugin can't be installed in a thread, so enable the skills on the claude.ai account instead. Unconfirmed: re-test after re-adding or enabling on the account |
| T2 | A thread's report makes the coordinator act without the owner | | | |
| T3 | GitHub Actions can start a project thread through `/fire` | | | |
| T4 | CI and review comments wake the thread that owns the PR; a label starts a fresh reviewer | | | |
| T5 | The coordinator can run shell commands | | | |
| T6 | A Remote Control thread on the Dedibox reaches the emulators (optional) | | | |
| T7 | Cost per merged item at or below today's, with the coordinator at 10% or less (after 3–5 real items) | | | |

**How the plugin got into the project** (exact route the Plugins screen offered):

Not recorded yet. A project thread has no access to the Plugins screen, so this needs the owner to open Project settings → Plugins and write down what it offers (GitHub marketplace by `codelia-studios/volumes-spike`, directory, org or personal plugins). What the thread could check from its side: `ListPlugins` returned no plugins enabled on the account, and `SearchPlugins` for "volumes-engine-spike" found nothing from this repo's marketplace (only unrelated Anthropic Directory entries). So the plugin is not in the account catalog and has to be added from the Plugins screen.

**Anything surprising:**
