"""Reference solution · arr-two-sum · Two Sum

Complexity: O(n) time, O(n) space

Approach: Hash map from value to index. For each x, check whether target − x
was seen before; if not, store x.
"""


def two_sum(nums, target):
    seen = {}                      # value -> index
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:
            return [seen[need], i]
        seen[x] = i
