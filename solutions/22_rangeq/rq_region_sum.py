"""Reference solution · rq-region-sum · 2D Region Sums

Complexity: O(rows · cols) to build, O(1) per query

Approach: 2D prefix sums with an extra zero row and column.

Common mistakes:
- Forgetting to add back P[r1][c1] (subtracted twice).
- Off-by-one between matrix and P indexes.

Follow-up challenge: Support point updates too (2D Fenwick tree).
"""


def region_sums(matrix, queries):
    rows, cols = len(matrix), len(matrix[0])
    # P[r][c] = sum of the rectangle (0, 0) .. (r - 1, c - 1)
    P = [[0] * (cols + 1) for _ in range(rows + 1)]
    for r in range(rows):
        for c in range(cols):
            P[r + 1][c + 1] = matrix[r][c] + P[r][c + 1] + P[r + 1][c] - P[r][c]
    return [P[r2 + 1][c2 + 1] - P[r1][c2 + 1] - P[r2 + 1][c1] + P[r1][c1]
            for r1, c1, r2, c2 in queries]
