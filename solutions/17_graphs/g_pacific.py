"""Reference solution · g-pacific · Pacific Atlantic Water Flow

Complexity: O(rows × cols)

Approach: Two reverse searches from the borders + intersection.

Common mistakes:
- Running a search from every cell (O((rc)²)).
- Flowing downhill from the oceans instead of uphill.

Follow-up challenge: Return the cells that reach exactly one ocean.
"""


def pacific_atlantic(heights):
    rows, cols = len(heights), len(heights[0])
    def reach(starts):
        seen, stack = set(starts), list(starts)
        while stack:                          # walk UPHILL from the ocean
            r, c = stack.pop()
            for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
                if 0 <= nr < rows and 0 <= nc < cols and (nr, nc) not in seen and heights[nr][nc] >= heights[r][c]:
                    seen.add((nr, nc))
                    stack.append((nr, nc))
        return seen
    pac = reach([(0, c) for c in range(cols)] + [(r, 0) for r in range(rows)])
    atl = reach([(rows - 1, c) for c in range(cols)] + [(r, cols - 1) for r in range(rows)])
    return sorted([list(p) for p in pac & atl])
