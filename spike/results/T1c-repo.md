# T1c: repo .claude folder in a project thread

Date: 2026-11-10

## 1. Skill
- skill volumes-repo-probe loaded: yes
- Invoked as: `volumes-repo-probe`
- Base directory shown: `/home/user/volumes-spike/.claude/skills/volumes-repo-probe`

## 2. Working directory and siblings
- Working directory for the probe (repo root): `/home/user/volumes-spike`
  (the session's primary directory was `/home/user`, not a git repo)
- `ls -1 /home/user`:
  - volumes-android
  - volumes-ios
  - volumes-spike
- Repositories cloned: volumes-android, volumes-ios, volumes-spike (all three project repos)

## 3. Subagent `repo-probe`
- Available: yes (listed among Agent types; defined in `.claude/agents/repo-probe.md`, pins `model: opus`)
- Started with only "Probe README.md". Reply verbatim:
  `REPO-PROBE-OK model=claude-opus-5-5 lines=21`
- Model: claude-opus-5-5

## 4. SessionStart hook log
- `.claude/repo-probe/session-start.log` exists: no
- The `.claude/repo-probe` directory does not exist at all, so the hook in `.claude/settings.json` did not run
  (checked after the session had started, working tree clean on arrival).

## 5. Skills/agents visible from other repositories' `.claude` folders
- volumes-android (`.claude/skills`): android-port, wave-dispatch
- volumes-android (`.claude/agents`): android-architect, android-builder, android-test-porter,
  native-feel-reviewer, parity-spec-writer, parity-verifier, polish-fixer, slice-lead, spec-challenger
- volumes-ios (`.claude/skills`): app-store-copy, highlight-animations, release, review-brief, review-replies
- volumes-ios (`.claude/agents`): product-owner
- Not tested: whether volumes-android/volumes-ios `.claude/workflows` or settings hooks loaded.
- Also listed but from the account, not a repo: anthropic-skills:volumes-spike-* skills.

## Summary
Repo skill and repo agent from volumes-spike loaded. Skills and agents from the two other cloned
repositories were also visible. The repo's SessionStart hook did not run.
