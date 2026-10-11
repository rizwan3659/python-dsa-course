"""Reference solution · pt-jump-game-ii · Jump Game II

Complexity: O(n)

Approach: Greedy BFS-by-ranges.

Common mistakes:
- Counting a jump at the last index.
- BFS over every index is correct but slower.

Follow-up challenge: Return the indexes you jump to.
"""


def min_jumps(nums):
    jumps = end = farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == end:                 # must jump to go further
            jumps += 1
            end = farthest
    return jumps
