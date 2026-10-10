"""Reference solution · dp-min-path-sum · Minimum Path Sum

Complexity: O(rows · cols) time and space

Approach: Grid DP taking the cheaper of the two incoming neighbours.

Common mistakes:
- Greedily stepping to the smaller neighbour, which can lead into an
  expensive region.
- Treating the first row/column like inner cells (index −1 wraps around in
  Python!).

Follow-up challenge: Print the path itself by walking back from the
bottom-right cell.
"""


def min_path_sum(grid):
    rows, cols = len(grid), len(grid[0])
    dp = [[0] * cols for _ in range(rows)]
    for r in range(rows):
        for c in range(cols):
            if r == 0 and c == 0:
                dp[r][c] = grid[0][0]
            elif r == 0:
                dp[r][c] = dp[r][c - 1] + grid[r][c]
            elif c == 0:
                dp[r][c] = dp[r - 1][c] + grid[r][c]
            else:
                dp[r][c] = min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c]
    return dp[-1][-1]
