# T1 machine facts (fourth run, step 2 only)

Scope: only step 2 of volumes-spike-probe, as requested by the coordinator.

## Skill
- skill volumes-spike-probe loaded: yes

## Machine
- uname -a: Linux vm 6.18.44-fc-v338 #1 SMP @0 x86_64 x86_64 x86_64 GNU/Linux
- nproc: 4
- free -g: Mem total 15, used 0, free 15, shared 0, buff/cache 0, available 15; Swap 0
- git remote -v: origin https://github.com/codelia-studios/volumes-spike (fetch and push)
- git branch --show-current (at session start): claude/project-thread-yezne8
- BASH_MAX_TIMEOUT_MS: empty (unset)

## GitHub (extra, asked by coordinator)
- gh api GET repos/codelia-studios/volumes-spike --jq .full_name: codelia-studios/volumes-spike (exit 0)
- gh api PUT repos/.../contents/spike/results/gh-write-probe-d.txt on this branch: refused, HTTP 403
  "Write access to this GitHub API path is not permitted through this proxy." (exit 1)
- git push over HTTPS to spike/* branch: ok
