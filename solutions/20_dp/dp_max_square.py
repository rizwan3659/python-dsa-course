"""Reference solution · dp-max-square · Largest Square of Ones

Complexity: O(rows · cols) time and space

Approach: 2D DP on bottom-right corners; return the best side squared.

Common mistakes:
- Returning the side instead of the area.
- Taking the max of the three neighbours instead of the min.

Follow-up challenge: Count all squares of ones (of every size) in the grid.
"""


def max_square(grid):
    rows, cols = len(grid), len(grid[0])
    side = [[0] * (cols + 1) for _ in range(rows + 1)]   # side of the best square ending at (r, c)
    best = 0
    for r in range(1, rows + 1):
        for c in range(1, cols + 1):
            if grid[r - 1][c - 1] == 1:
                side[r][c] = 1 + min(side[r - 1][c], side[r][c - 1], side[r - 1][c - 1])
                best = max(best, side[r][c])
    return best * best
