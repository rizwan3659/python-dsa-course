# Project 1: Student Leaderboard

**Concepts:** dictionaries, sorting with custom keys · **Topics:** 1, 6, 12 · **Time:** 1–2 hours

A coding club runs weekly contests. Build the leaderboard that keeps every student's best score and answers "who is on top?" and "where do I stand?".

## Requirements

`Leaderboard()` with:

| Method | Behaviour |
|---|---|
| `add_score(name, score)` | Record a contest result. A student's leaderboard score is their **best** score so far. |
| `best(name)` | The student's best score, or `None` if they have no scores. |
| `remove(name)` | Delete a student. Return `True` if they existed. |
| `top(k)` | The `k` best students as `(name, score)` pairs, highest score first; ties broken alphabetically. |
| `rank(name)` | 1-based position in the ordering used by `top`; `None` for unknown students. |
| `average(name)` | Mean of **all** the student's scores, or `None`. |
| `most_improved()` | The student with the largest (latest score − first score); ties alphabetically; `None` if nobody has two scores. |

## Milestones

1. **Best scores:** `add_score`, `best`, `remove` (`TestMilestone1`).
2. **Ordering:** `top`, `rank` (`TestMilestone2`).
3. **History:** `average`, `most_improved` (`TestMilestone3`).

```bash
python -m pytest projects/01_leaderboard -k Milestone1
```

## Think about it

- Which data structure gives O(1) lookups of a student's best score?
- What sort key puts higher scores first but names in alphabetical order?
- What extra data do you need to keep for milestone 3?

## Extensions

- Make `top(k)` O(n log k) with `heapq.nsmallest(k, ..., key=...)`.
- Keep a sorted list of `(-score, name)` with `bisect.insort` so `rank` becomes a binary search.
- Add `between(low, high)`: every student whose best score is in a range.
