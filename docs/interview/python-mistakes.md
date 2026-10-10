# Common Python interview mistakes

Each mistake below has a debug exercise in the course; the id in brackets opens it locally with `python dsa.py show <id>`.

## Data and references

| Mistake | Fix |
|---|---|
| `grid = [[0] * m] * n` creates n references to one row | `[[0] * m for _ in range(n)]` |
| `def f(x, seen=[])`: the default list is shared between calls (`py-d1`) | Default to `None` and create the list inside |
| `copy = grid[:]` and then changing `copy[0][0]` (`py-e9`) | Copy rows too: `[row[:] for row in grid]`, or `copy.deepcopy` |
| Appending the backtracking `path` itself to the results (`rec-x-d1`) | Append a snapshot: `path[:]` |
| Modifying a list while iterating over it | Build a new list, or iterate over a copy |

## Complexity traps

| Mistake | Cost | Fix |
|---|---|---|
| `x in some_list` inside a loop | O(n) per check | Use a set or dict |
| `lst.pop(0)` / `lst.insert(0, x)` in a queue | O(n) each | `collections.deque` |
| `s += char` in a loop | can be O(n²) | collect parts in a list, then `"".join(parts)` |
| `sum(nums[l:r + 1])` for every query | O(n) per query | prefix sums |
| Slicing in recursion (`f(nums[1:])`) | O(n) per call, O(n²) total | pass an index |
| Recursion deeper than ~1,000 | `RecursionError` | iterate with an explicit stack or a loop |

## Correctness traps

| Mistake | Fix |
|---|---|
| `best = 0` when all values can be negative (`arr-d2`) | Start from the first element or `float("-inf")` |
| `mid = (lo + hi) / 2` | `//` for an integer index |
| Binary search loops that never end | Make sure `lo` or `hi` moves every iteration (`mid + 1` or `mid - 1`) |
| `1 << i - 1` | Means `1 << (i - 1)`: arithmetic binds tighter than shifts |
| Using `int(x / k)` for negative x | `x // k` floors; `int(x / k)` truncates towards zero |
| Comparing floats with `==` | `abs(a - b) < 1e-9`, or keep integers (fractions, gcd) |
| A bare `except:` hiding bugs (`py-e5`) | Catch the specific exception |
| Off-by-one in `range(n)` vs `range(n + 1)` (`th-d1`) | Trace the first and last iteration by hand |

## Python tools worth knowing by heart

```python
from collections import Counter, defaultdict, deque
import heapq                     # heappush, heappop, nlargest, nsmallest (min-heap: negate for max)
from bisect import bisect_left, insort
from functools import lru_cache, cmp_to_key
from itertools import combinations, permutations, accumulate

sorted(items, key=lambda x: (-x.score, x.name))   # multi-key sort
for i, x in enumerate(a): ...                     # index + value
for a, b in zip(xs, ys): ...                      # parallel iteration
divmod(n, 10)                                     # (n // 10, n % 10)
float("inf")                                      # sentinel for min/max
```
