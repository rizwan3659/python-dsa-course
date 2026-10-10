"""Reference solution · dp-robber-circle · House Robber II (circle)

Complexity: O(n) time, O(1) extra space besides the slices

Approach: Reduce the circle to two line problems and take the better one.

Common mistakes:
- Forgetting the single-house case (both slices are empty).
- Subtracting something instead of splitting into two cases.

Follow-up challenge: What if the houses form a binary tree and you cannot
rob a parent and child together?
"""


def rob_line(nums):
    skip, take = 0, 0
    for x in nums:
        skip, take = take, max(take, skip + x)
    return take


def rob_circle(nums):
    if len(nums) == 1:
        return nums[0]
    # either the first house is not robbed, or the last one is not
    return max(rob_line(nums[1:]), rob_line(nums[:-1]))
