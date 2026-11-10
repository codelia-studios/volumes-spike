# What to send the coordinator (account-skill route)

Project settings has no Plugins section in this beta, and the account plugin didn't
reach a project thread. The probes are now four **account skills** uploaded under
Customize → Skills: `volumes-spike-probe`, `volumes-spike-build`,
`volumes-spike-review`, `volumes-spike-pulse`. Paste these one at a time when the
runbook says to.

## M1 · T1 probe

> Start one new thread: run the volumes-spike-probe skill on
> codelia-studios/volumes-spike. If the skill isn't available, report that in your
> first message and stop. Don't do anything else in it.

## M2 · auto-fix and review loop (T4)

> Start one new thread: run the volumes-spike-build skill. It will open a pull
> request with a deliberate mistake and end its turn. Leave it waiting. CI and a
> review task should wake it.

## M3 · T5, can the coordinator run commands?

> Without starting a thread, answer in this conversation: can you run shell
> commands yourself? If you can, run `uname -a && date -u` and paste the output.
> If you can't, say so plainly.

## M4 · T2, after a thread has finished

> (Send nothing. Wait about 10 minutes after the M1 thread finishes, then look at
> the conversation. Did the coordinator post its one-line result on its own,
> without a message from you? That is T2.)

## M6 · T1c, the repository's own `.claude` (send after removing volumes-android and volumes-ios from Project settings > Environment)

> First update the project instructions. Under "Every thread", replace the line that
> begins "Begin with the skill your task names" with:
> "Begin with the skill your task names: an account skill whose name starts with
> volumes-spike-, or, for T1c, volumes-repo-probe in this repository's .claude/skills.
> If the skill isn't available, say so in your first message and stop. That is a result."
> And replace the line "Never touch any repository other than codelia-studios/volumes-spike."
> with: "Never touch any repository other than codelia-studios/volumes-spike, and never
> add a repository to the project or to a thread."
> Tell me whether you could change the instructions yourself.
>
> Then start one new thread: run the volumes-repo-probe skill from this repository's
> .claude/skills on codelia-studios/volumes-spike. If the skill isn't available,
> report that in your first message and stop.

## M7 · T1d, a workflow from the repository's `.claude/workflows`

> First update the project instructions. Under "Every thread", replace the line that
> begins "Begin with the skill your task names" with:
> "Begin with the skill your task names: an account skill whose name starts with
> volumes-spike-, or a skill in this repository's .claude/skills that the task names.
> If the skill isn't available, say so in your first message and stop. That is a result."
> If you can't change the instructions yourself, say so, and start the thread anyway.
>
> Then start one new thread: run the volumes-repo-workflow skill from this
> repository's .claude/skills on codelia-studios/volumes-spike. It runs the
> repo-probe-flow workflow; running that workflow is the task. If the skill isn't
> available, report that in your first message and stop.

## M5 · wrap-up

> List every thread you started in this project, what each reported, and for each
> of T1–T5 whether it passed. Write it as a table.
