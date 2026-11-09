# Volumes spike sandbox

This repository is a throwaway sandbox for testing how Claude Code Projects behave
before the Volumes Android port moves onto one. Nothing here ships.

- Use the GitHub tools or `gh api` (REST). `gh pr` and `gh issue` use GraphQL, which
  the cloud GitHub proxy refuses.
- Never merge a pull request, never push to `main`, never force-push.
- Never touch any other repository, especially `codelia-studios/volumes-android`
  or `mschinis/volumes-ios`.
- Results go under `spike/results/` on your own `spike/*` branch.
- When a skill from the `volumes-engine-spike` plugin is named, follow it exactly,
  including deliberate mistakes. These are measurements.
