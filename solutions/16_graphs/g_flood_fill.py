"""Reference solution · g-flood-fill · Flood Fill

Complexity: O(rows × cols)

Approach: DFS/BFS over same-colored cells.
"""


def flood_fill(image, sr, sc, color):
    old = image[sr][sc]
    if old == color:
        return image
    stack = [(sr, sc)]
    while stack:
        r, c = stack.pop()
        if 0 <= r < len(image) and 0 <= c < len(image[0]) and image[r][c] == old:
            image[r][c] = color
            stack.extend([(r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)])
    return image
