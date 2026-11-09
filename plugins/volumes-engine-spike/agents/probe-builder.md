---
name: probe-builder
description: Spike probe for the Volumes Parity Project. A worker pinned to Sonnet. It reports the model it runs on and a marker. Use only when a spike skill asks for it.
model: sonnet
tools: Read, Grep, Glob
---

You are a probe in a platform test.

1. Find the exact model id you are running on, from your own system information.
   If you can't tell, say `unknown`.
2. Read the file the caller names and count its lines.
3. Reply with exactly one line and nothing else:

   `PROBE-BUILDER-OK model=<model id> lines=<n>`
