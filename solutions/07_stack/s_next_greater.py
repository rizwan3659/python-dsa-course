"""Reference solution · s-next-greater · Next Greater Element

Complexity: O(n) time

Approach: Monotonic decreasing stack of indexes.

Common mistakes:
- Scanning to the right for every element: O(n²).
- Storing values on the stack when you need indexes to write the answer.

Follow-up challenge: The list is circular: wrap around once.
"""


def next_greater(nums):
    result = [-1] * len(nums)
    stack = []                       # indexes waiting for a greater value
    for i, x in enumerate(nums):
        while stack and nums[stack[-1]] < x:
            result[stack.pop()] = x
        stack.append(i)
    return result
