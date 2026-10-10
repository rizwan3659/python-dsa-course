"""Reference solution · bit-single · Single Number

Complexity: O(n) time, O(1) space

Approach: XOR everything: duplicates cancel out.

Common mistakes:
- Using a set or Counter: correct, but O(n) space.
- Starting result at 1 instead of 0.

Follow-up challenge: Every value appears three times except one
(bit-single-ii).
"""


def single_number(nums):
    result = 0
    for x in nums:
        result ^= x       # pairs cancel: x ^ x == 0
    return result
