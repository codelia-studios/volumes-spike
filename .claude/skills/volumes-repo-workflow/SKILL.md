---
name: volumes-repo-workflow
description: Volumes spike T1d. Runs the workflow committed in this repository's .claude/workflows and records whether it is found, whether it asks for approval, and whether its agents run as asked. Use when asked to run volumes-repo-workflow.
---

# Volumes repo workflow probe (T1d)

The Volumes port runs each slice through a workflow (`.claude/workflows/port-slice.js`
in volumes-android). This checks whether a project thread can run a workflow committed
in its repository, and whether that workflow's agents behave as port-slice.js needs.
Running the workflow is the task you were given: this skill is your instruction to
call the Workflow tool. Record what happens; fix nothing. Write notes into
`spike/results/T1d-workflow.md`.

1. Record "skill volumes-repo-workflow loaded: yes", the exact name you invoked it by,
   and the base directory shown for it.
2. Record whether a Workflow tool is available to you. If it's listed only as a
   deferred tool, load it first (ToolSearch, query `select:Workflow`) and record that.
   If there is no Workflow tool at all, record that, skip to step 6 and report
   "workflow tool: no".
3. Record whether `repo-probe-flow` appears anywhere you can see named workflows
   (the Workflow tool's description, your skill list, or similar), or nowhere.
4. Note the time (`date -u +%H:%M:%S`). Call the Workflow tool with
   `name: "repo-probe-flow"` and `args: {"marker": "T1D", "date": "<today's date>"}`
   (a JSON object, not a string). Record:
   - whether the name was found, and the exact error if it wasn't;
   - whether a permission or approval prompt appeared, and whether the thread had to
     wait for someone to answer it. If it waited, record how it ended.

   If the name wasn't found, call it again with
   `scriptPath: "<this repository's root>/.claude/workflows/repo-probe-flow.js"`
   (an absolute path; record it) and the same `args`. Record the same two things.
   If that fails too, read the file and pass its whole text as `script`, with the
   same `args`. Record which of the three routes worked: name, scriptPath or script.
5. The workflow runs in the background, and a notification arrives when it finishes.
   Wait for it, without polling. Note the time again. Record:
   - the returned value, verbatim;
   - `args`: did `{"marker": "T1D", ...}` come back unchanged?
   - `a` (repo agent type `repo-probe`, pinned to Opus): its reply. It should be
     `REPO-PROBE-OK model=claude-opus-5-5 lines=21` or close to it;
   - `b` (default agent, `model: haiku`, `effort: low`, schema): the model it reports;
   - `c` (repo agent type combined with a schema): the object, and whether it is
     structured (an object with `model` and `lines`) rather than text;
   - any agent that came back `null`;
   - the minutes from the first call to the notification.
6. Commit the notes on a branch `spike/t1d-<today's date>` and push. Open no pull
   request. End with:

```
SPIKE REPORT
test: T1d (repo workflow)
workflow tool: yes | no | deferred, loaded
found by: name | scriptPath | inline script | not run
approval asked: no | yes, waited <time> | yes, blocked
args arrived: yes | no
a, repo agent type: <reply or null>
b, model override + schema: <model or null>
c, repo agent type + schema: <object or null>
duration: <minutes>
results: spike/results/T1d-workflow.md on branch spike/t1d-<date>
```
