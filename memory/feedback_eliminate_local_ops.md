# Feedback: eliminate_local_ops

- type: feedback
- name: eliminate_local_ops
- description: local_ops.scala is a code smell to eliminate when math traits are
  refactored

## Content

`local_ops.scala` exists as a workaround because the math traits use aggressive
`inline` which prevents `Local*` types from picking up operations via subtyping.
The long-term goal is to refactor the math traits (Vec*Base, Vec*ImmutableOps
etc.) to use less `inline` — defining methods as abstract in traits and
implementing them concretely — so that `Local*` types naturally inherit all
operations without needing explicit forwarding in local_ops.scala. Do NOT
refactor this now; tackle it as a separate step.
