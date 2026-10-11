"""Reference solution · g-01-matrix · Distance to the Nearest 0

Complexity: O(rows × cols)

Approach: Multi-source BFS from every 0.

Common mistakes:
- Running a BFS from every 1 cell: O((rc)²).
- Not starting with all 0 cells in the queue.

Follow-up challenge: Solve it with two DP passes instead of BFS.
"""


from collections import deque

def update_matrix(mat):
    rows, cols = len(mat), len(mat[0])
    dist = [[-1] * cols for _ in range(rows)]
    queue = deque()
    for r in range(rows):
        for c in range(cols):
            if mat[r][c] == 0:
                dist[r][c] = 0
                queue.append((r, c))          # all zeros are sources
    while queue:
        r, c = queue.popleft()
        for nr, nc in ((r + 1, c), (r - 1, c), (r, c + 1), (r, c - 1)):
            if 0 <= nr < rows and 0 <= nc < cols and dist[nr][nc] == -1:
                dist[nr][nc] = dist[r][c] + 1
                queue.append((nr, nc))
    return dist
