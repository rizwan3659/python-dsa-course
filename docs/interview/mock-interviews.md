# Mock interviews

Practise in pairs: one **candidate**, one **interviewer**. Swap roles each session. Each script lists the problem (by course id), the follow-ups to ask, and the hints to give if the candidate is stuck. Interviewers: read the reference solution beforehand (`solutions/` or the browser), but do not show it.

## Format (45 minutes)

| Time | What happens |
|---|---|
| 0–5 | Interviewer reads the problem aloud. Candidate clarifies. |
| 5–12 | Candidate explains a brute force and the planned approach. |
| 12–35 | Candidate codes (shared editor or the course's editor), narrating. |
| 35–40 | Candidate tests; interviewer asks the follow-up. |
| 40–45 | Feedback using the rubric below. |

Give hints only after about 3 minutes of silence or circling, one level at a time.

## Scripts

### Round 1 · Warm-up (beginner)

| Problem | Follow-up | Hints (in order) |
|---|---|---|
| `arr-two-sum` | Return all pairs, not one. What if the list is sorted? | "What would you need to remember about the numbers you have seen?" → "A dict from value to index." |
| `s-valid-parens` | Now there are also `<` `>`. And: return the index of the first error. | "Which bracket must close first?" → "Last opened, first closed: a stack." |
| `ll-reverse` | Do it recursively. Then reverse only positions m..n. | "You need three pointers." → "Save `cur.next` before you overwrite it." |

### Round 2 · Core (intermediate)

| Problem | Follow-up | Hints |
|---|---|---|
| `st-longest-unique` | At most k repeats allowed. | "Contiguous + longest → which pattern?" → "Shrink from the left while a character repeats." |
| `bs-koko` | Each pile has a deadline too. | "Is a speed either too slow or fast enough?" → "Binary search on the speed." |
| `t-lca` | The tree is a BST. Nodes may be missing from the tree. | "What does each subtree report back?" → "Return the node if found; the LCA is where both sides report." |
| `ag-course-order` | Return all valid orders for a small input. | "Courses with no prerequisites can start now." → "Kahn's algorithm with in-degrees." |
| `dp-coin-change` | Count the ways instead. Return the coins used. | "Does greedy work for [1, 3, 4] and 6?" → "dp[a] = fewest coins for amount a." |

### Round 3 · Onsite (advanced)

| Problem | Follow-up | Hints |
|---|---|---|
| `st-min-window` | Return all minimum windows. | "Expand right until valid, then shrink left." → "Track how many required characters are satisfied." |
| `hp-median` | Remove numbers too (sliding window median). | "Two halves." → "A max-heap for the lower half, a min-heap for the upper half, sizes differ by at most one." |
| `g-word-ladder` | Return one shortest sequence. | "Fewest transformations → which search?" → "BFS where neighbours differ in one letter; precompute patterns like h*t." |
| `dp-edit-distance` | Reduce to O(m) space. | "Compare the last characters." → "Three options when they differ: insert, delete, replace." |
| `build-lru` | Thread safety; an LFU variant. | "O(1) lookup and O(1) order updates." → "A dict pointing into a doubly linked list." |

### Design-flavoured rounds

Use a project as a 45-minute exercise: implement milestone 1 of [`projects/05_task_scheduler`](../../projects/05_task_scheduler/) or [`projects/09_lru_cache`](../../projects/09_lru_cache/), then discuss the remaining milestones without coding.

## Rubric (score each 1–4)

| Area | 1 | 2 | 3 | 4 |
|---|---|---|---|---|
| Problem solving | no working idea | brute force only | optimal with hints | optimal alone, compares approaches |
| Coding | does not run | runs with major bugs | small bugs found by tests | clean, idiomatic, correct |
| Complexity | not stated | stated wrongly | correct | correct with justification and trade-offs |
| Communication | silent | explains only when asked | narrates the plan | clear plan, asks good questions, uses hints well |
| Testing | none | only the given example | edge cases when prompted | own edge cases, traces the code |

**Pass guide:** 14+ out of 20 with no 1s is a typical "hire" signal for a medium problem.

## After each mock

Write three lines in your notes: what went well, the one thing to fix next time, and the problem to re-solve from scratch in two days.
