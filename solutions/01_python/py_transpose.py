"""Reference solution · py-transpose · Transpose a Matrix

Complexity: O(rows × cols) time

Approach: Nested comprehension, or zip(*m).
"""


def transpose(m):
    return [list(col) for col in zip(*m)]
