"""Reference solution · g-max-island · Max Area of Island

Complexity: O(rows × cols)

Approach: Flood fill with a counter.
"""


def max_area(grid):
    rows, cols = len(grid), len(grid[0])
    seen, best = set(), 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != 1 or (r, c) in seen:
                continue
            area, stack = 0, [(r, c)]
            seen.add((r, c))
            while stack:
                y, x = stack.pop()
                area += 1
                for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                    if 0 <= ny < rows and 0 <= nx < cols and grid[ny][nx] == 1 and (ny, nx) not in seen:
                        seen.add((ny, nx))
                        stack.append((ny, nx))
            best = max(best, area)
    return best
