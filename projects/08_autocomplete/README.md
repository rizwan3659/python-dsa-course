# Project 8: Autocomplete Engine

**Concepts:** tries, heaps (top-k), caching · **Topics:** 15, 16 · **Time:** 2–3 hours

Search boxes suggest what you are probably typing. Build an engine that learns from past searches and suggests the most popular completions.

## Requirements

`Autocomplete()` with:

| Method | Behaviour |
|---|---|
| `insert(phrase, count=1)` | Add `count` searches for a phrase (lower-cased). Phrases can contain spaces. |
| `frequency(phrase)` | How many times it was searched (0 if never). |
| `suggest(prefix, k=3)` | The `k` most frequent phrases starting with `prefix`; ties alphabetical. |
| `record(phrase)` | Same as `insert(phrase, 1)`: the user searched for it. |
| `typing(chars)` | Simulates typing `chars` one character at a time and returns the list of `suggest` results after each character (k = 3). |
| `remove(phrase)` | Forget a phrase entirely; `True` if it existed. |

## Milestones

1. Trie with counts: `insert`, `frequency` (`TestMilestone1`).
2. `suggest` using a heap for top-k (`TestMilestone2`).
3. `record`, `typing`, `remove` (`TestMilestone3`).

## Think about it

- `suggest` must look at every phrase below the prefix node. `heapq.nsmallest(k, items, key=lambda x: (-count, phrase))` picks the top k without sorting everything.
- For `typing`, each keystroke moves one node down the trie: do not restart from the root every time.
- Extension idea: cache the top 3 at every node and update the caches on `insert`.

## Extensions

- Cache top-k per node so `suggest` is O(len(prefix)).
- Suggest corrections for a misspelled prefix (edit distance ≤ 1).
