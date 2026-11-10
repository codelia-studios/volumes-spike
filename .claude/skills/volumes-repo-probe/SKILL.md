---
name: volumes-repo-probe
description: Volumes spike T1c. Checks whether a skill, an agent and a hook committed in this repository's .claude folder load in a project thread. Use when asked to run volumes-repo-probe.
---

# Volumes repo probe (T1c)

The Projects docs say a repository's `.claude/skills`, `.claude/agents` and
`.claude/settings.json` hooks don't load in project threads. T1b's thread saw repo
agents and skills anyway. This settles it. Record what happens; fix nothing.
Write notes into `spike/results/T1c-repo.md`.

1. Record "skill volumes-repo-probe loaded: yes", the exact name you invoked it by,
   and the base directory shown for it.
2. Record your working directory, and list every directory under its parent
   (`ls -1 "$(dirname "$PWD")"`). Name every repository cloned there.
3. Record whether a subagent type named `repo-probe` is available. If it is, start
   it with only "Probe README.md" and record its reply verbatim. Its definition in
   `.claude/agents/repo-probe.md` pins Opus.
4. Record whether `.claude/repo-probe/session-start.log` exists, and its contents.
   The SessionStart hook in `.claude/settings.json` writes it.
5. Record which skills and agents you can see that come from **other** repositories'
   `.claude` folders, and which repository each comes from.
6. Commit the notes on a branch `spike/t1c-<today's date>` and push. Open no pull
   request. End with:

```
SPIKE REPORT
test: T1c (repo .claude)
repo skill loaded: yes | no (invoked as <name>)
repo agent available: yes | no
repo agent model: <id or n/a>
repo SessionStart hook ran: yes | no
repositories cloned: <names>
other repos' skills/agents visible: <list or none>
results: spike/results/T1c-repo.md on branch spike/t1c-<date>
```
