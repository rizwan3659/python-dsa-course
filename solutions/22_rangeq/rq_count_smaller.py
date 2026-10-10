"""Reference solution · rq-count-smaller · Count Smaller Numbers After Self

Complexity: O(n log n) time, O(n) space

Approach: Coordinate compression + Fenwick tree of counts, scanning from the
right.

Common mistakes:
- O(n²) double loop: too slow for 10⁵.
- Counting equal values as smaller (query rank − 1, not rank).
- Forgetting to reverse the result.

Follow-up challenge: Count inversions of the whole list (the sum of this
output) with merge sort instead.
"""


def count_smaller(nums):
    ranks = {v: i + 1 for i, v in enumerate(sorted(set(nums)))}   # values -> 1..m
    tree = [0] * (len(ranks) + 1)
    result = []
    for x in reversed(nums):                 # walk from the right
        i, smaller = ranks[x] - 1, 0
        while i > 0:                         # how many seen values have rank < rank(x)
            smaller += tree[i]
            i -= i & -i
        result.append(smaller)
        i = ranks[x]
        while i < len(tree):                 # record x as seen
            tree[i] += 1
            i += i & -i
    return result[::-1]
