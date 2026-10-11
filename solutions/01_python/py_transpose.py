"""Reference solution · py-transpose · Transpose a Matrix

Complexity: O(rows × cols) time

Approach: Nested comprehension, or zip(*m).

Common mistakes:
- Building [[0] * rows] * cols, which shares one inner list.
- Swapping in place, which only works for square matrices.

Follow-up challenge: Do it in one line with zip(*m).
"""


def transpose(m):
    return [list(col) for col in zip(*m)]
