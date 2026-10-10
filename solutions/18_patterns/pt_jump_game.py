"""Reference solution · pt-jump-game · Jump Game

Complexity: O(n)

Approach: Greedy farthest reach.
"""


def can_jump(nums):
    reach = 0
    for i, jump in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + jump)
    return True
