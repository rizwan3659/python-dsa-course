"""Reference solution · rec-word-search · Word Search

Complexity: O(rows · cols · 3^L)

Approach: DFS with in-place marking and undo.

Common mistakes:
- Forgetting to restore the cell, which breaks other search paths.
- Reusing a cell ("ABCB" must be False).

Follow-up challenge: Find all dictionary words on the board at once with a
trie (Word Search II).
"""


def exist(board, word):
    rows, cols = len(board), len(board[0])

    def dfs(r, c, k):
        if k == len(word):
            return True
        if not (0 <= r < rows and 0 <= c < cols) or board[r][c] != word[k]:
            return False
        saved, board[r][c] = board[r][c], "#"      # mark as used
        found = any(dfs(r + dr, c + dc, k + 1) for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)))
        board[r][c] = saved                          # undo the choice
        return found

    return any(dfs(r, c, 0) for r in range(rows) for c in range(cols))
