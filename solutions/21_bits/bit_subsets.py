"""Reference solution · bit-subsets · All Subsets (bitmask)

Complexity: O(n · 2ⁿ) time and output size

Approach: Enumerate masks 0 .. 2ⁿ − 1 and decode each.

Common mistakes:
- range(2 * n) instead of range(1 << n).
- Testing mask & i instead of mask >> i & 1.

Follow-up challenge: Enumerate only the subsets of a given mask m: sub = m;
while sub: ...; sub = (sub − 1) & m.
"""


def subsets(items):
    n = len(items)
    result = []
    for mask in range(1 << n):                       # 2^n masks
        result.append([items[i] for i in range(n) if (mask >> i) & 1])
    return result
