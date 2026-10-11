"""Reference solution · bs-matrix · Search a 2D Matrix

Complexity: O(log(rows · cols))

Approach: Binary search over flattened indexes.

Common mistakes:
- Searching every row: O(rows · log cols) is fine, but O(log(rows · cols))
  is possible.
- Mixing up row = mid // cols and col = mid % cols.

Follow-up challenge: Rows and columns are sorted separately (not overall):
start from the top-right corner.
"""


def search_matrix(matrix, target):
    if not matrix or not matrix[0]:
        return False
    rows, cols = len(matrix), len(matrix[0])
    lo, hi = 0, rows * cols - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        val = matrix[mid // cols][mid % cols]   # treat it as one flat list
        if val == target:
            return True
        if val < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return False
