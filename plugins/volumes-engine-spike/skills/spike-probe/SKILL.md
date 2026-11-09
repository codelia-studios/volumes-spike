---
name: spike-probe
description: Volumes Parity Project spike, test T1. Records which parts of this plugin loaded and ran in this thread (skill, agents, hooks, workflow), which models the agents ran on, what the machine is, and how GitHub access behaves. Commits a results file and reports. Use when a task says "run spike-probe".
---

# Spike probe (T1)

This is a measurement, not a task to get right. **Run every step, record what
happens, and fix nothing.** A failed step is a result. Write your notes as you go
into `spike/results/T1-probe.md` in the repository, then commit and push at the
end. If any step would make you wait for a human, write that down and move on.

## 1. This skill

Write: "skill spike-probe loaded: yes" (you are reading it). Also record the
plugin root this skill sees: `${CLAUDE_PLUGIN_ROOT}`. Then run
`ls "${CLAUDE_PLUGIN_ROOT}"/scripts` and record the output.

## 2. The machine

Run and record: `uname -a`, `nproc`, `free -g`, `git remote -v`,
`git branch --show-current`, `echo "$BASH_MAX_TIMEOUT_MS"`.

## 3. Agents and models

- Record whether the subagent types `volumes-engine-spike:probe-auditor` and
  `volumes-engine-spike:probe-builder` (or `probe-auditor` and `probe-builder`) are
  in your list of available agents.
- Start `probe-auditor` with only this prompt: "Probe README.md". Record its
  reply verbatim. The reply names the model it ran on. Its frontmatter pins Opus.
- Start `probe-builder` with only this prompt: "Probe README.md". Record its
  reply verbatim. Its frontmatter pins Sonnet.
- Record the model **you** (the main thread) are running on.

## 4. Hooks

- Record whether `.spike/session-start.log` exists, and its contents. The
  plugin's SessionStart hook writes it.
- Use the Write tool to create `.spike/hook-check.txt` with the text `hook probe`.
- Then record whether `.spike/hook-fired.log` exists, and its contents. The
  plugin's PostToolUse hook writes it after Write or Edit.

## 5. GitHub access

Run each and record the first three lines of output and the exit code:

- `gh api repos/{owner}/{repo} --jq .full_name` (REST, which should work)
- `gh pr list --limit 1` (GraphQL, expected to fail with a 403)
- `gh api repos/{owner}/{repo}/pulls --jq 'length'` (REST)

Fill in `{owner}/{repo}` from `git remote -v`.

## 6. Commit what you have

Write `spike/results/T1-probe.md` with everything so far, under the headings
Skill, Machine, Agents and models, Hooks, GitHub. Commit it on a branch
`spike/t1-<today's date>` and push. Open no pull request.

## 7. Workflow (last, because it may stop for approval)

Try to start the plugin workflow `probe-flow` (it may appear as
`volumes-engine-spike:probe-flow`). Record exactly one of:

- it ran: paste its result;
- it asked for approval: say so, and say who was asked;
- it isn't available: say what you saw.

Append this to the results file, commit and push again.

## 8. Report

End your thread with this block, filled in:

```
SPIKE REPORT
test: T1
skill loaded: yes
agents visible: yes | no
auditor model: <id or unknown>
builder model: <id or unknown>
main thread model: <id>
session-start hook ran: yes | no
post-edit hook ran: yes | no
workflow: ran | needs approval | unavailable
gh REST: ok | failed
gh GraphQL: ok | 403 | other
results: spike/results/T1-probe.md on branch spike/t1-<date>
```
