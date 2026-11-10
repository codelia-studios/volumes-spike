---
name: volumes-spike-probe
description: Volumes spike test T1 (account-skill route). Records what loads in a project thread, subagent models, git hooks and GitHub access, then commits results. Use when asked to run volumes-spike-probe.
---

# Volumes spike probe (T1, account-skill route)

This is a measurement, not a task to get right. **Run every step, record what
happens, and fix nothing.** A failed step is a result. Write notes as you go into
`spike/results/T1-skills.md`, then commit and push at the end. If any step would
make you wait for a human, write that down and move on.

## 1. This skill and its folder

- Record "skill volumes-spike-probe loaded: yes".
- Record the base directory the skill was loaded from, if your context shows one.
- Record this literal text as you see it: `${CLAUDE_SKILL_DIR}`. If it shows as a
  path, the placeholder is substituted; if it shows as written, it isn't.
- Find this skill's bundled script and record its path:
  `find / -path '*volumes-spike-probe/scripts/pre-commit' -not -path '/proc/*' 2>/dev/null | head -3`

## 2. The machine

Run and record: `uname -a`, `nproc`, `free -g`, `git remote -v`,
`git branch --show-current`, `echo "$BASH_MAX_TIMEOUT_MS"`.

## 3. What else loaded

Record whether any skill or agent named `volumes-engine-spike:*` (the plugin added
to the account) is available to you. List the custom skills you can see.

## 4. Subagents with a chosen model

Agents can't be uploaded as account skills, so the pipeline would start ordinary
subagents with an explicit model and a brief written into the skill. Test that:

- Start a subagent with **model `opus`** and only this prompt:
  "You are a probe. Find the exact model id you run on from your system
  information, read README.md, count its lines, and reply with exactly one line:
  PROBE-OPUS-OK model=<id> lines=<n>". Record the reply verbatim.
- Do the same with **model `sonnet`**, replying `PROBE-SONNET-OK …`.
- Record whether the Agent tool accepted the model you asked for, and the model
  **you** (the main thread) run on.

## 5. Git's own hooks (the formatting fallback)

- Copy the bundled `scripts/pre-commit` (path from step 1) to `.githooks/pre-commit`,
  run `chmod +x .githooks/pre-commit` and `git config core.hooksPath .githooks`.
- Create `spike/results/hook-probe.txt` with any text, and commit it on a branch
  `spike/t1-skills-<today's date>`.
- Record whether `.spike/git-hook.log` now exists, and its contents.

## 6. GitHub access

Run each and record the first three lines and the exit code (fill in
`{owner}/{repo}` from `git remote -v`):

- `gh api repos/{owner}/{repo} --jq .full_name` (REST, which should work)
- `gh pr list --limit 1` (GraphQL, expected to fail with a 403)

## 7. Commit and report

Write everything into `spike/results/T1-skills.md` under the headings Skill,
Machine, Loaded, Subagents, Git hooks, GitHub. Commit it on the same branch and
push. Open no pull request. End your thread with:

```
SPIKE REPORT
test: T1 (account skills)
skill loaded: yes
skill dir placeholder substituted: yes | no
bundled script found: <path or no>
plugin skills visible: yes | no
opus subagent: <reply line or failed>
sonnet subagent: <reply line or failed>
main thread model: <id>
git pre-commit hook ran: yes | no
gh REST: ok | failed
gh GraphQL: ok | 403 | other
results: spike/results/T1-skills.md on branch spike/t1-skills-<date>
```
