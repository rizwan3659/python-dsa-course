"""g-d4 · Python’s negative indexes strike
Topic 17: Graphs · medium · Matrix / Grid · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    land_neighbours([[1, 0], [0, 0], [1, 1]], 0, 0)  ->  0

Check your work:   python dsa.py test g-d4
Stuck?             python dsa.py hint g-d4
"""


def land_neighbours(grid, r, c):
    count = 0
    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nr, nc = r + dr, c + dc
        if nr < len(grid) and nc < len(grid[0]) and grid[nr][nc] == 1:
            count += 1
    return count
