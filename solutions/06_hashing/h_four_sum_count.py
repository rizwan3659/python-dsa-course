"""Reference solution · h-four-sum-count · 4Sum Count

Complexity: O(n²) time and space

Approach: Meet in the middle with a Counter of pair sums.

Common mistakes:
- Four nested loops: O(n⁴).
- Storing pairs instead of counts of pair sums.

Follow-up challenge: Generalise to k lists (meet in the middle).
"""


from collections import Counter

def four_sum_count(a, b, c, d):
    ab = Counter(x + y for x in a for y in b)
    return sum(ab[-(x + y)] for x in c for y in d)
