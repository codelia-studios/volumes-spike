export const meta = {
  name: 'probe-flow',
  description: 'Volumes spike probe: two small agents in parallel, each returns a marker. Shows whether a plugin workflow can launch in a project thread, and whether it asks for approval first.',
}

const [a, b] = await parallel([
  () => agent('Reply with exactly this line and nothing else: FLOW-A-OK', { label: 'flow-a', model: 'haiku' }),
  () => agent('Reply with exactly this line and nothing else: FLOW-B-OK', { label: 'flow-b', model: 'haiku' }),
])

return { a, b }
