"""Reference solution · dp-partition · Partition Equal Subset Sum

Complexity: O(n · total) time, O(total) space

Approach: Subset-sum DP over sums 0..total/2, iterating sums downwards.

Common mistakes:
- Forgetting the odd-total shortcut.
- Iterating sums upwards, which lets one number be used twice.

Follow-up challenge: Use a Python int as a bitset: reach |= reach << x. Why
does that work?
"""


def can_partition(nums):
    total = sum(nums)
    if total % 2:
        return False
    target = total // 2
    reachable = [True] + [False] * target   # reachable[s]: some subset sums to s
    for x in nums:
        for s in range(target, x - 1, -1):
            if reachable[s - x]:
                reachable[s] = True
    return reachable[target]
