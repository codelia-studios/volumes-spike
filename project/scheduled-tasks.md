# Scheduled tasks for the test project

Create these **from inside the project** (ask the coordinator, or use the project's
Scheduled tasks tab), so they run as threads in the project. Repository for all three:
`codelia-studios/volumes-spike`. Model: Sonnet.

## 1. Spike review (test T4)

- **Trigger:** GitHub event → Pull request → action **labeled**
- **Filters:** Labels contains `ready-for-review` · Base branch equals `main`
- **Prompt:**
  > Run the spike-review skill from the volumes-engine-spike plugin for the pull
  > request whose label event started this run.

## 2. Spike fire (test T3)

- **Trigger:** API. Copy the URL and token from the dialog into the repository's
  secrets `SPIKE_FIRE_URL` and `SPIKE_FIRE_TOKEN` (Settings → Secrets and variables
  → Actions).
- **Prompt** (it must opt in to reading the payload, or the payload is inert):
  > Run the spike-pulse skill from the volumes-engine-spike plugin. Read the text
  > in the routine-fire-payload block and copy it verbatim into your report.

## 3. Spike pulse (tests T2 and T5)

- **Trigger:** Schedule → hourly at minute 7 (`7 * * * *`, UTC)
- **Prompt:**
  > Run the spike-pulse skill from the volumes-engine-spike plugin.
- Turn it **off** once T2 has its answer. Each run uses a little of your plan.
