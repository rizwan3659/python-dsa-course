"""Reference solution · g-d4 · Python’s negative indexes strike
"""


def land_neighbours(grid, r, c):
    count = 0
    for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        nr, nc = r + dr, c + dc
        if 0 <= nr < len(grid) and 0 <= nc < len(grid[0]) and grid[nr][nc] == 1:
            count += 1
    return count
