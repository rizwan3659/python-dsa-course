"""Reference solution · py-e9 · The copy that is not a copy
"""


def with_border(grid):
    new = [row[:] for row in grid]
    for row in new:
        row.insert(0, 0)
    return new
