"""Reference solution · gr-two-city · Two City Scheduling

Complexity: O(n log n) time

Approach: Sort by a − b and send the first half to A, the rest to B.

Common mistakes:
- Sending each person to their cheaper city, which ignores the half-and-half
  rule.
- Sorting by a alone.

Follow-up challenge: What if city A takes exactly k people instead of half?
"""


def two_city(costs):
    order = sorted(costs, key=lambda c: c[0] - c[1])   # biggest saving by choosing A first
    n = len(costs) // 2
    return sum(a for a, _ in order[:n]) + sum(b for _, b in order[n:])
