---
name: volumes-spike-review
description: Volumes spike, reviewer side of T4. Started by a PR labelled ready-for-review; gets an independent Opus check, posts a review comment, sets a review status. Use when asked to run volumes-spike-review.
---

# Volumes spike review (T4, the reviewer)

You were started by a GitHub event: a pull request was labelled
`ready-for-review`. You are a fresh session with none of the builder's context,
and that is part of what's being tested. Use `gh api` (REST) for everything.

1. Find the pull request. Use the event context if you have it. Otherwise list
   open PRs with the label:
   `gh api "repos/{owner}/{repo}/issues?labels=ready-for-review&state=open" --jq '.[] | select(.pull_request) | .number'`
   and take the newest. Record the number and the head commit sha:
   `gh api repos/{owner}/{repo}/pulls/<n> --jq .head.sha`.
2. Start a subagent with **model `opus`** and only this prompt: "You are a probe.
   Find the exact model id you run on, read toy/calc.py, count its lines, and
   reply with exactly one line: PROBE-OPUS-OK model=<id> lines=<n>". Keep its reply.
3. Count the earlier spike reviews on this PR:
   `gh api repos/{owner}/{repo}/pulls/<n>/reviews --jq '[.[] | select(.body | startswith("SPIKE-REVIEW"))] | length'`.
4. **If there are none (round 1):** post a review comment, then set the status to failure:
   - `gh api -X POST repos/{owner}/{repo}/pulls/<n>/reviews -f event=COMMENT -f body="SPIKE-REVIEW round 1: please add a one-line docstring to multiply. (<the subagent's reply line>)"`
   - `gh api -X POST repos/{owner}/{repo}/statuses/<sha> -f state=failure -f context=review -f description="spike review round 1: changes requested"`
5. **If there is one or more (round 2):** check that `multiply` now has a docstring.
   If it does, post `SPIKE-REVIEW round 2: done` and set the status to success.
   If it doesn't, post `SPIKE-REVIEW round 2: docstring still missing` and set
   the status to failure.
6. End with:

```
SPIKE REPORT
test: T4 reviewer
PR: #<n>
round: 1 | 2
started by: GitHub label event | other (say what)
opus subagent reply: <line>
status set: success | failure
```
