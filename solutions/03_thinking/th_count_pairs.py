"""Reference solution · th-count-pairs · Count Pairs with a Given Sum

Complexity: O(n²) time, O(1) space

Approach: Brute force over all n(n − 1) / 2 pairs.

Common mistakes:
- Starting j at 0, which counts every pair twice.
- Counting the pair (i, i).

Follow-up challenge: Solve it in O(n) with a dictionary of counts seen so
far (see Hash Tables).
"""


def count_pairs(nums, target):
    count = 0
    n = len(nums)
    for i in range(n):
        for j in range(i + 1, n):   # j > i: each pair once, never with itself
            if nums[i] + nums[j] == target:
                count += 1
    return count
