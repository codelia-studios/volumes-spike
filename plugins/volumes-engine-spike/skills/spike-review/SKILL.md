---
name: spike-review
description: Volumes Parity Project spike, review side of test T4. Started by a pull request labelled ready-for-review. Gets an independent probe review, posts a review comment, and sets a commit status called review. Use when a scheduled task's prompt says "run spike-review".
---

# Spike review (T4, the reviewer)

You were started by a GitHub event: a pull request was labelled
`ready-for-review`. You are a fresh session with none of the builder's context,
and that is part of what's being tested. Use `gh api` (REST) for everything.

1. Find the pull request. Use the event context if you have it. Otherwise list
   open PRs with the label:
   `gh api "repos/{owner}/{repo}/issues?labels=ready-for-review&state=open" --jq '.[] | select(.pull_request) | .number'`
   and take the newest. Record the number and the head commit sha:
   `gh api repos/{owner}/{repo}/pulls/<n> --jq .head.sha`.
2. Start the `probe-auditor` agent with only "Probe toy/calc.py". Keep its reply line.
3. Count the earlier spike reviews on this PR:
   `gh api repos/{owner}/{repo}/pulls/<n>/reviews --jq '[.[] | select(.body | startswith("SPIKE-REVIEW"))] | length'`.
4. **If there are none (round 1):** post a review comment, then set the status to failure:
   - `gh api -X POST repos/{owner}/{repo}/pulls/<n>/reviews -f event=COMMENT -f body="SPIKE-REVIEW round 1: please add a one-line docstring to multiply. (<the auditor's reply line>)"`
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
auditor reply: <line>
status set: success | failure
```
