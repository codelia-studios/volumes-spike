# Volumes Parity Project spike: runbook

**Goal:** answer the seven questions the Projects docs don't. Each answer picks
which variant of the Parity Project design gets built. The decision to use
Projects is already made; this only chooses fallbacks.

**Your time:** about 20 minutes of setup, then a few minutes per test. Total
elapsed is about half a day, mostly waiting for threads. T7 runs later, on real work.

**What it costs:** a handful of short Sonnet threads and a few Opus probe calls,
probably a few dollars of plan usage. Turn the hourly pulse off once T2 is answered.

---

## Setup (you, about 20 minutes)

1. **Projects available?** Open claude.ai/code. You should see **Projects** in the
   sidebar, or under **More**. If not, the rollout hasn't reached your account. Stop
   here and join the waitlist.
2. **Create the sandbox repo and push this kit** (from this folder, which is already
   a git repository with one commit):
   ```bash
   gh repo create codelia-studios/volumes-spike --public --source . --push
   ```
   Public keeps the toy CI free on GitHub's runners, and nothing in here is private.
   If you'd rather keep it private, switch `runs-on` in `.github/workflows/ci.yml`
   to a self-hosted label first.
3. **Install the Claude GitHub App** on `codelia-studios/volumes-spike` (github.com/apps/claude).
   Project threads need it, and so does auto-fix.
4. **Create the test project** at claude.ai/code → Projects → New project:
   - Name: `Volumes spike`. Repository: `codelia-studios/volumes-spike`.
   - **Project settings → General:** Coordinator **Opus, low**. Threads **Sonnet, medium**.
   - **Project settings → Memory → Project instructions:** paste `project/instructions.txt`.
   - **Project settings → Plugins:** add `volumes-engine-spike` from the marketplace
     in this repo (`codelia-studios/volumes-spike`). **Write down exactly what the
     Plugins screen offers.** If it can't add a plugin from a GitHub marketplace,
     that is the first half of T1's answer. Try the routes it does offer (the
     directory, claude.ai org or personal plugins). Note that claude.ai refuses
     plugins with a top-level `bin/`; this one has none.
   - Environment: the default is fine for the spike.
5. **Create the three scheduled tasks** in `project/scheduled-tasks.md`, from inside
   the project. Put the API task's URL and token into the repo secrets
   `SPIKE_FIRE_URL` and `SPIKE_FIRE_TOKEN`.

---

## The tests

Record each answer in `RESULTS.md`. Each row says what a pass and a fail decide.

### T1 · Does the plugin load and run in a cloud thread?

- **Do:** send **M1** (`project/messages.md`). Wait for the thread's SPIKE REPORT,
  then read `spike/results/T1-probe.md` on its branch.
- **Pass:** the skill loaded; both agents are visible and report their pinned models
  (Opus and Sonnet); the session-start hook and the post-edit hook ran.
- **Partial results matter:**
  - skills load but not agents;
  - agents load but ignore the pinned `model`;
  - hooks don't run;
  - the workflow asks for approval.
- **Decides:**

  | Result | Build this |
  |---|---|
  | Full pass | Ship the pipeline as the `volumes-engine` plugin |
  | Agents missing | Inline the agent briefs into the skills, and run subagents as generic agents with an explicit model |
  | Hooks missing | Formatting through git's own hooks (`core.hooksPath`, set by the skill's first step) |
  | Workflow needs approval | Don't use workflows in threads |
  | The plugin can't be installed at all | Enable the skills on your claude.ai account instead |

### T2 · Does a thread's report make the coordinator act without you?

- **Do:** after the M1 thread finishes, send nothing for about 10 minutes (**M4**).
  Then look: did the coordinator post its one-line result on its own? For a second
  sample, the hourly pulse's report ends with a COORDINATOR instruction. Did the
  coordinator reply "PULSE SEEN" and start the small thread, unprompted?
- **Pass:** yes, within minutes.
- **Decides:**

  | Result | Build this |
  |---|---|
  | Pass | Phase hand-offs go through the coordinator (minutes each) |
  | Fail | One thread runs tests and build back to back, so an item needs fewer hand-offs. The pulse is the safety net, and an item takes about 1 h longer |

### T3 · Can GitHub Actions start a thread in the project?

- **Do:** in the repo's **Actions** tab, run **fire-project-task** by hand. Watch
  the project.
- **Pass:** a new thread appears in the project. It runs spike-pulse, copies the
  payload text into its report, and the report reaches the coordinator.
- **Also note:** does the thread show inside the project, or only under Scheduled
  tasks or your general session list?
- **Decides:**

  | Result | Build this |
  |---|---|
  | Pass | The drift Action and nightly triage hand work to the project directly through `/fire` |
  | Fail | The Actions open GitHub issues, and the pulse lists them as ready |

### T4 · Do CI and review comments wake the thread that owns the PR?

- **Do:** send **M2**. The thread opens a PR with a deliberate bug and ends its turn.
  Then watch three things:
  1. CI fails, and the thread wakes and fixes the bug (auto-fix).
  2. The thread adds the `ready-for-review` label, and the **Spike review** task starts
     as a fresh session, comments and sets `review` to failure.
  3. The comment wakes the build thread. It adds the docstring and re-labels, and the
     second review sets `review` to success.
- **Pass:** all three wake-ups happen without you. Note each delay; the thread
  records the times.
- **Decides:**

  | Result | Build this |
  |---|---|
  | Pass | Review is a label-triggered task; the build thread hears CI and review through auto-fix |
  | Wake 1 fails | Auto-fix isn't on for thread PRs here. Turn it on per PR, or the build thread watches CI with one long `gh api` poll script |
  | Wake 2 fails | The build thread runs the review skill itself, with reviewer subagents in their own contexts |
  | Wake 3 fails | The reviewer sets the status, and the pulse re-starts stalled builds |

### T5 · Can the coordinator run commands itself?

- **Do:** send **M3**.
- **Decides:**

  | Result | Build this |
  |---|---|
  | Yes | The coordinator runs `engine status` itself, and the pulse becomes a backstop that runs every few hours |
  | No | The pulse thread stays the coordinator's eyes (the design as written) |

### T6 · Can a thread on your Dedibox reach the emulators? (optional)

This needs **Require trusted devices** turned off on your account, which is a
security trade-off and yours to decide. Skip T6 if you'd rather not. CI's device
lane covers every gating need without it.

- **Do, if you choose to:**
  1. On the server, create a separate user (not any `gh-*` runner user) in the `kvm`
     group, with Claude Code ≥ 2.1.280 and a clone of `volumes-spike`.
  2. Run `claude remote-control --spawn worktree` in that clone.
  3. In the project, use **Work locally** and ask: "run `nproc && ls -l /dev/kvm` and
     report."
- **Don't** run anything from `parity/runner/` on the server: `job-started.sh` and
  `records-guard.sh` are destructive outside a runner job.
- **Decides:**

  | Result | Build this |
  |---|---|
  | Pass | Interactive device debugging threads, on request only |
  | Fail or skipped | Device work stays in CI |

### T7 · Is it cheaper per item than today? (later, on real work)

- **Do:** after the first 3–5 real items, read **Project settings → Usage**: tokens
  by thread and model, and the coordinator's share.
- **Pass:** the cost per merged item is at or below today's metered ~$38–51, and
  the coordinator takes 10% or less.
- **Decides:**

  | Result | Build this |
  |---|---|
  | Pass | Keep the settings |
  | Fail | Lower the coordinator's effort, run fewer threads at once, and use Sonnet for the parity reviewer on low-risk items |

---

## When you're done

1. Copy the answers into `RESULTS.md` and push.
2. Turn off the pulse task.
3. Archive the test project (Project settings → General → Archive).
4. Delete the repo when the real plugin exists:
   ```bash
   gh repo delete codelia-studios/volumes-spike
   ```
