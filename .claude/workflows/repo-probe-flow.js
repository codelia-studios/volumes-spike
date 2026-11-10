export const meta = {
  name: 'repo-probe-flow',
  description: 'Volumes spike T1d: three small probe agents in parallel, using the workflow features port-slice.js relies on (repo agent types, model, effort, schema, args).',
  phases: [{ title: 'Probe', detail: 'three probe agents in parallel' }],
}

// Each agent exercises one thing port-slice.js depends on:
//   a: a repository agent type (.claude/agents/repo-probe.md, pinned to Opus), plain text back
//   b: a model and effort override on the default workflow agent, with a schema
//   c: a repository agent type combined with a schema
// The caller passes args {marker, date}; they come back unchanged, which shows args arrive.

const MODEL_SCHEMA = {
  type: 'object',
  properties: {
    model: { type: 'string', description: 'The exact model id you run on, from your own system information, or "unknown"' },
    marker: { type: 'string' },
  },
  required: ['model', 'marker'],
}

const PROBE_SCHEMA = {
  type: 'object',
  properties: {
    model: { type: 'string', description: 'The exact model id you run on, or "unknown"' },
    lines: { type: 'integer', description: 'The line count of the file you were asked to read' },
  },
  required: ['model', 'lines'],
}

phase('Probe')
log(`T1d probe flow started with args ${JSON.stringify(args ?? null)}`)

const [a, b, c] = await parallel([
  () => agent('Probe README.md', { label: 'a: repo agent', phase: 'Probe', agentType: 'repo-probe' }),
  () => agent('Report the exact model id you are running on, from your own system information, and the marker FLOW-B-OK.',
    { label: 'b: haiku, low effort, schema', phase: 'Probe', model: 'haiku', effort: 'low', schema: MODEL_SCHEMA }),
  () => agent('Probe README.md. Return the model id and the line count as structured output.',
    { label: 'c: repo agent + schema', phase: 'Probe', agentType: 'repo-probe', schema: PROBE_SCHEMA }),
])

log(`T1d probe flow finished: a=${a === null ? 'null' : 'ok'} b=${b === null ? 'null' : 'ok'} c=${c === null ? 'null' : 'ok'}`)

return { args: args ?? null, a, b, c }
