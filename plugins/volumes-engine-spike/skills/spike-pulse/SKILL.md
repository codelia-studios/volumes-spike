---
name: spike-pulse
description: Volumes Parity Project spike, tests T2, T3 and T5. A small scheduled or API-fired run that reports what it sees, so you can check whether its report reaches the coordinator and whether the coordinator acts on it unprompted. Use when a scheduled task's prompt says "run spike-pulse".
---

# Spike pulse (T2, T3, T5)

1. Record the current UTC time and how you were started: by a schedule, an API
   fire, or something else. If there is a `<routine-fire-payload>` block in your
   context, this task's own prompt allows you to read it: copy its text verbatim.
2. List the repository's open pull requests and `spike/*` branches with `gh api`
   (REST), names and numbers only.
3. Append one line per run to `spike/results/T-pulse.md`, on branch
   `spike/pulse`: time, how started, payload text, open PRs. Commit and push.
4. End with this block. The last line is an instruction **for the coordinator**.
   Whether it acts on it without a message from the owner is test T2:

```
SPIKE REPORT
test: pulse
started by: schedule | api fire | other
fire payload: <text or none>
open PRs: <numbers>
COORDINATOR: reply in the project conversation with "PULSE SEEN <time>", and
start one new thread that runs spike-probe step 2 only (the machine facts)
and reports.
```
