---
name: spike-build
description: Volumes Parity Project spike, auto-fix and review loop (tests T2 and T4). Opens a pull request with a deliberately wrong change, then waits for CI and review comments to wake the thread through auto-fix. Use when a task says "run spike-build".
---

# Spike build (auto-fix and review loop)

This tests whether GitHub events wake **this** thread. Follow the steps exactly,
including the deliberate mistake. Use the GitHub tools or `gh api` (REST);
`gh pr` and `gh issue` are expected to fail in this environment.

## Round 1: a deliberate failure

1. On a branch `spike/build-<today's date>`, change `toy/calc.py` so that
   `multiply(a, b)` returns `a * b + 1`. This is deliberately wrong: the test
   `toy/test_calc.py` expects `a * b`. **Do not run the tests.**
2. Commit, push, and open a pull request into `main` titled
   `spike: multiply (auto-fix probe)`.
3. Write the PR number and the current UTC time into
   `spike/results/T-autofix.md`, then commit and push that file too.
4. **End your turn now.** Say: "Waiting for CI." Don't poll and don't wait.
   The test is whether CI's failure wakes you.

## When CI wakes you

5. Record in `spike/results/T-autofix.md`: the UTC time you were woken, and what
   woke you (the failing check's name, if you can see it).
6. Fix `multiply` to return `a * b`, commit and push.
7. When CI is green, add the label `ready-for-review` to the PR:
   `gh api -X POST repos/{owner}/{repo}/issues/<n>/labels -f "labels[]=ready-for-review"`.
   Record the time. End your turn: "Labelled for review."

## When a review comment wakes you (T4)

8. Record the UTC time you were woken, and the comment text.
9. Do what the comment asks (it will ask for a docstring), commit and push.
10. Remove the label and add it again so the review runs a second time:
    `gh api -X DELETE repos/{owner}/{repo}/issues/<n>/labels/ready-for-review`, then
    add it again as in step 7. End your turn.
11. When the `review` status turns green, record the time, commit
    `spike/results/T-autofix.md`, and end the thread with:

```
SPIKE REPORT
test: auto-fix + T4
PR: #<n>
CI failure woke the thread: yes | no (after <minutes>)
review comment woke the thread: yes | no (after <minutes>)
second review ran after re-label: yes | no
merged: no (never merge in the spike)
results: spike/results/T-autofix.md
```

Never merge the pull request.
