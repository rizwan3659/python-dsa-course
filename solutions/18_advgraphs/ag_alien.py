"""Reference solution · ag-alien · Alien Dictionary

Complexity: O(total characters)

Approach: Build edges from adjacent words, then topological sort (heap for
the smallest order).

Common mistakes:
- Comparing letters beyond the first difference.
- Missing the invalid case where a word comes before its own prefix.

Follow-up challenge: Count how many valid alphabets are consistent with the
words.
"""


import heapq

def alien_order(words):
    letters = sorted({c for w in words for c in w})
    graph = {c: set() for c in letters}
    indeg = {c: 0 for c in letters}
    for a, b in zip(words, words[1:]):
        for x, y in zip(a, b):
            if x != y:
                if y not in graph[x]:
                    graph[x].add(y)
                    indeg[y] += 1
                break
        else:
            if len(a) > len(b):
                return ""                  # "abc" before "ab" is impossible
    heap = [c for c in letters if indeg[c] == 0]
    heapq.heapify(heap)                    # smallest available letter first
    order = []
    while heap:
        c = heapq.heappop(heap)
        order.append(c)
        for d in graph[c]:
            indeg[d] -= 1
            if indeg[d] == 0:
                heapq.heappush(heap, d)
    return "".join(order) if len(order) == len(letters) else ""
