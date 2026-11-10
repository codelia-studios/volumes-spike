# T1d: repo workflow (repo-probe-flow)

Date: 2026-11-10. Branch: spike/t1d-2026-11-10.

## Steps 1-3
- Skill volumes-repo-workflow loaded: yes.
- Invoked as: `volumes-repo-workflow` (Skill tool, no plugin prefix).
- Base directory: /home/user/volumes-spike/.claude/skills/volumes-repo-workflow
- Workflow tool available: yes, listed directly among my tools (not deferred, no ToolSearch needed).
- `repo-probe-flow` visible by name beforehand: nowhere. It was not in the Workflow tool's description or the skill list; only the skill text and the file in .claude/workflows name it.

## Step 4
- Call started about 08:10:55 UTC, via `name: "repo-probe-flow"`, args `{"marker": "T1D", "date": "2026-11-10"}` (JSON object).
- Name found: yes, first try. No error. The scriptPath and inline script routes were not needed.
- Permission/approval prompt: none. The thread did not wait.
- Launch result: background task wzr1vlg3l, run wf_70ef1c92-20e. The harness copied the script to a session scripts directory.

## Step 5
- Notification arrived about 08:11:06 UTC (workflow-reported duration 12.3 s, about 0.2 minutes from first call).
- Returned value, verbatim:
  `{"args":{"marker":"T1D","date":"2026-11-10"},"a":"REPO-PROBE-OK model=claude-opus-5-5 lines=21","b":{"model":"claude-haiku-5-5","marker":"FLOW-B-OK"},"c":{"model":"claude-opus-5-5","lines":21}}`
- args came back unchanged: yes.
- a (repo agent type repo-probe, Opus): `REPO-PROBE-OK model=claude-opus-5-5 lines=21`. Exactly as expected.
- b (default agent, model haiku, effort low, schema): model `claude-haiku-5-5`, marker FLOW-B-OK. Structured.
- c (repo agent type + schema): `{"model":"claude-opus-5-5","lines":21}`. Structured object with model and lines, not text.
- Agents returning null: none. 3 of 3 done, 0 errors, 0 empty. 4 tool uses, 58,682 subagent tokens.

## Result
Pass. The workflow in .claude/workflows was found by name, ran with no approval, and args, repo agent types, model/effort overrides and schemas all worked.
