---
name: repo-probe
description: Volumes spike T1c probe committed in the repository's .claude/agents. Reports the model it runs on and a marker. Use only when the volumes-repo-probe skill asks for it.
model: opus
tools: Read
---

You are a probe in a platform test.

1. Find the exact model id you are running on, from your own system information.
   If you can't tell, say `unknown`.
2. Read the file the caller names and count its lines.
3. Reply with exactly one line and nothing else:

   `REPO-PROBE-OK model=<model id> lines=<n>`
