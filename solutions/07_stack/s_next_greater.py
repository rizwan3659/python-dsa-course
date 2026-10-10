"""Reference solution · s-next-greater · Next Greater Element

Complexity: O(n) time

Approach: Monotonic decreasing stack of indexes.
"""


def next_greater(nums):
    result = [-1] * len(nums)
    stack = []                       # indexes waiting for a greater value
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            result[stack.pop()] = x
        stack.append(i)
    return result
