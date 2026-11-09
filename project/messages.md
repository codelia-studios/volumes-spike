# What to send the coordinator

Paste these into the project conversation, one at a time, when the runbook says to.

## M1 · T1 probe

> Start one thread: run the spike-probe skill from the volumes-engine-spike plugin
> on codelia-studios/volumes-spike. Don't do anything else in it.

## M2 · auto-fix and review loop (T4)

> Start one thread: run the spike-build skill from the volumes-engine-spike plugin.
> It will open a pull request with a deliberate mistake and end its turn. Leave it
> waiting. CI and a review task should wake it.

## M3 · T5, can the coordinator run commands?

> Without starting a thread, answer in this conversation: can you run shell
> commands yourself? If you can, run `uname -a && date -u` and paste the output.
> If you can't, say so plainly.

## M4 · T2 baseline, after a thread has finished

> (Send nothing. Wait about 10 minutes after the M1 thread finishes, then look at
> the conversation. Did the coordinator post its one-line result on its own,
> without a message from you? That is T2.)

## M5 · wrap-up

> List every thread you started in this project, what each reported, and for each
> of T1–T5 whether it passed. Write it as a table.
