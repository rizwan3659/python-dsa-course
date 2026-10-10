# Pattern guide

Read the problem, underline the signal words, and look them up here. Each pattern has a lesson in the course (topic number in brackets) and practice problems in the [Top 100](top-100.md).

## Quick lookup

| If the problem says… | Think… | Typical cost |
|---|---|---|
| sorted array; pair or triplet with a target; in place | Two pointers (4, 23) | O(n) |
| contiguous subarray or substring; longest / shortest / at most k | Sliding window (4, 5) | O(n) |
| sum of a range; many queries; subarray sum equals k | Prefix sums (+ hash map) (4, 22) | O(n) |
| seen before; count; group; complement | Hashing (6) | O(n) |
| next greater / smaller; span; histogram | Monotonic stack (7) | O(n) |
| sliding maximum; shortest subarray with negatives | Monotonic deque (8, 23) | O(n) |
| linked list middle / cycle / k-th from end | Fast and slow pointers (9) | O(n), O(1) space |
| sorted; O(log n); "minimum value that works" | Binary search, on index or on answer (11) | O(log n) or O(n log range) |
| k largest / most frequent; merge k lists; running median | Heap (15) | O(n log k) |
| prefixes of words; autocomplete | Trie (16) | O(length) |
| fewest steps; nearest; spreading; levels | BFS (17) | O(V + E) |
| all paths; connected regions; tree recursion | DFS (13, 17) | O(V + E) |
| order with prerequisites | Topological sort (18) | O(V + E) |
| groups that merge; "are these connected" online | Union-find (18) | ≈ O(1) per operation |
| weighted shortest path | Dijkstra / Bellman-Ford (18) | O(E log V) / O(V · E) |
| all combinations / permutations / subsets; constraints | Backtracking (10) | exponential, pruned |
| intervals; meetings; overlapping ranges | Sort + sweep or greedy (19) | O(n log n) |
| locally best choice can be proven safe | Greedy (19) | O(n log n) |
| number of ways; min / max cost; overlapping choices | Dynamic programming (20) | states × choices |
| appears once; subsets of n ≤ 20; XOR | Bit manipulation (21) | O(n) or O(2ⁿ) |
| range queries with updates | Fenwick / segment tree (22) | O(log n) per operation |

## Use the constraints

| n up to | Usually means |
|---|---|
| 10–20 | exponential search (backtracking, bitmasks) |
| 100–500 | O(n³) |
| 1,000–5,000 | O(n²) |
| 10⁵–10⁶ | O(n log n) or O(n) |
| 10⁹ and more | O(log n) or a formula |

## Templates

**Two pointers (opposite ends)**

```python
left, right = 0, len(a) - 1
while left < right:
    if good(a[left], a[right]):
        ...
    elif need_bigger:
        left += 1
    else:
        right -= 1
```

**Sliding window (variable size)**

```python
left = 0
for right, x in enumerate(a):
    add(x)
    while window_invalid():
        remove(a[left])
        left += 1
    best = max(best, right - left + 1)
```

**Binary search on the answer**

```python
lo, hi = smallest_possible, largest_possible
while lo < hi:
    mid = (lo + hi) // 2
    if works(mid):
        hi = mid          # mid works: maybe something smaller does too
    else:
        lo = mid + 1
return lo
```

**BFS**

```python
from collections import deque
seen, queue = {start}, deque([(start, 0)])
while queue:
    node, dist = queue.popleft()
    for nxt in neighbours(node):
        if nxt not in seen:
            seen.add(nxt)
            queue.append((nxt, dist + 1))
```

**Backtracking**

```python
def go(start, path):
    record(path[:])
    for i in range(start, len(choices)):
        if cannot_lead_anywhere(i):
            break                     # prune
        path.append(choices[i])
        go(i + 1, path)
        path.pop()                    # undo
```

**DP recipe:** state (what does `dp[i]` mean?) → base cases → transition (think about the last decision) → fill order → answer location → optimise space.

## When nothing matches

1. Write the brute force and state its complexity.
2. Find the work it repeats.
3. Ask which data structure remembers that work (set, dict, heap, prefix array, table).
4. Check whether sorting the input makes the problem easier.
