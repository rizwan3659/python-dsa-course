"""Reference solution · bs-matrix · Search a 2D Matrix

Complexity: O(log(rows · cols))

Approach: Binary search over flattened indexes.
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
