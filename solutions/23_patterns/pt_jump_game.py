"""Reference solution · pt-jump-game · Jump Game

Complexity: O(n)

Approach: Greedy farthest reach.

Common mistakes:
- Trying every jump with recursion (exponential).
- Stopping only when reach is exactly the last index.

Follow-up challenge: Return the minimum number of jumps (pt-jump-game-ii).
"""


def can_jump(nums):
    reach = 0
    for i, jump in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + jump)
    return True
