"""Reference solution · h-four-sum-count · 4Sum Count

Complexity: O(n²) time and space

Approach: Meet in the middle with a Counter of pair sums.
"""


from collections import Counter

def four_sum_count(a, b, c, d):
    ab = Counter(x + y for x in a for y in b)
    return sum(ab[-(x + y)] for x in c for y in d)
