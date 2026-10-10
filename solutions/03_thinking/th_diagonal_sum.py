"""Reference solution · th-diagonal-sum · Matrix Diagonal Sum

Complexity: O(n) time, O(1) space

Approach: One pass over the rows, adding both diagonal cells, then subtract
the centre once if n is odd.

Common mistakes:
- Looping over every cell: O(n²) and easy to get wrong.
- Counting the centre twice for odd n.

Follow-up challenge: Return the sum of each "ring" of the matrix, from the
outside in.
"""


def diagonal_sum(grid):
    n = len(grid)
    total = 0
    for i in range(n):
        total += grid[i][i]            # main diagonal
        total += grid[i][n - 1 - i]    # anti-diagonal
    if n % 2 == 1:
        total -= grid[n // 2][n // 2]  # centre was added twice
    return total
