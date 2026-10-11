"""Reference solution · g-islands · Number of Islands

Complexity: O(rows × cols)

Approach: Flood fill from each new land cell.

Common mistakes:
- Counting land cells instead of islands.
- Including diagonal neighbours.

Follow-up challenge: Count islands with distinct shapes.
"""


from collections import deque

def num_islands(grid):
    if not grid:
        return 0
    rows, cols = len(grid), len(grid[0])
    seen, count = set(), 0
    for r in range(rows):
        for c in range(cols):
            if grid[r][c] != "1" or (r, c) in seen:
                continue
            count += 1
            seen.add((r, c))
            queue = deque([(r, c)])
            while queue:
                y, x = queue.popleft()
                for ny, nx in ((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)):
                    if 0 <= ny < rows and 0 <= nx < cols and grid[ny][nx] == "1" and (ny, nx) not in seen:
                        seen.add((ny, nx))
                        queue.append((ny, nx))
    return count
