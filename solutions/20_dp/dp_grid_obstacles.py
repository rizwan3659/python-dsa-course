"""Reference solution · dp-grid-obstacles · Unique Paths with Obstacles

Complexity: O(rows · cols) time, O(cols) space

Approach: Grid DP with a single rolling row.

Common mistakes:
- Setting the whole first row/column to 1 even after an obstacle.
- Forgetting that the start or the end itself may be blocked.

Follow-up challenge: Return the path count modulo 10⁹ + 7 for a 1000 × 1000
grid.
"""


def paths_with_obstacles(grid):
    cols = len(grid[0])
    dp = [0] * cols                    # one row of the table at a time
    dp[0] = 1
    for row in grid:
        for c in range(cols):
            if row[c] == 1:
                dp[c] = 0              # blocked: no path ends here
            elif c > 0:
                dp[c] += dp[c - 1]     # from above (old dp[c]) + from the left
    return dp[-1]
