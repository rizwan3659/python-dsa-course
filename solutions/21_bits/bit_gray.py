"""Reference solution · bit-gray · Gray Code

Complexity: O(2ⁿ) time and space (the output size)

Approach: Formula i ^ (i >> 1) for i in 0 .. 2ⁿ − 1.

Common mistakes:
- Generating by trial and error, which may not match the standard order.

Follow-up challenge: Build the sequence by reflection: Gray(n) = Gray(n − 1)
followed by its reverse with the top bit set.
"""


def gray_code(n):
    return [i ^ (i >> 1) for i in range(1 << n)]
