"""Reference solution · h-happy · Happy Number

Complexity: O(log n) per step

Approach: Set of seen numbers detects the cycle (Floyd’s fast/slow pointers
also work).
"""


def is_happy(n):
    seen = set()
    while n != 1 and n not in seen:
        seen.add(n)
        n = sum(int(d) ** 2 for d in str(n))
    return n == 1
