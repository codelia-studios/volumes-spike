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

## M5 · wrap-up

> List every thread you started in this project, what each reported, and for each
> of T1–T5 whether it passed. Write it as a table.
