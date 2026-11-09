# volumes-spike

Throwaway sandbox and plugin marketplace for the Volumes Parity Project spike
(tests T1–T7). It holds:

- `plugins/volumes-engine-spike/`: a small plugin whose skills, agents, hooks and
  workflow are probes.
- `toy/`: a few lines of Python with one deliberately unimplemented function, so
  CI has something real to pass or fail.
- `.github/workflows/`: the `verify` stand-in, and the Action that fires a project
  task through its API trigger.
- `project/`: what to paste into the test project.
- `RUNBOOK.md`: the steps, and what each result decides.
- `spike/results/`: where threads write what they observed.

To install the plugin in a local Claude Code (not needed for the project, which adds
it in Project settings → Plugins):

    /plugin install volumes-engine-spike --marketplace codelia-studios/volumes-spike

Delete the repository and the test project when the spike is done.
