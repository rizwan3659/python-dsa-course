# Project 9: LRU Cache

**Concepts:** hash maps, doubly linked lists · **Topics:** 6, 9 · **Time:** 2–3 hours

A cache keeps recent results in fast memory. When it is full, it throws away the **least recently used** item. Build one where every operation is O(1), without `OrderedDict` or `functools.lru_cache`.

## Requirements

`LRUCache(capacity)` with:

| Method | Behaviour |
|---|---|
| `get(key)` | The value, or `None`. A successful get makes the key the most recently used. |
| `put(key, value)` | Insert or update. Updating also makes the key most recent. If the cache is over capacity, evict the least recently used key. |
| `__len__()`, `__contains__(key)` | Size and membership (`in` does **not** count as a use). |
| `keys()` | Keys from most to least recently used. |
| `stats()` | `{"hits": h, "misses": m, "evictions": e}`. |
| `resize(capacity)` | Change the capacity, evicting least recently used keys if needed. |

Capacity 0 means nothing is ever stored.

## Milestones

1. `get`, `put`, eviction, `len`, `in` (`TestMilestone1`).
2. `keys` and O(1) behaviour on 200,000 operations (`TestMilestone2`).
3. `stats` and `resize` (`TestMilestone3`).

## Think about it

- A dict finds a key in O(1) but does not know the usage order. A linked list knows the order. Combine them: the dict maps key → list node.
- With dummy head and tail nodes, "unlink a node" and "add after head" need no special cases.

## Extensions

- An LFU cache (least *frequently* used).
- A `@memoize(capacity)` decorator built on your cache.
