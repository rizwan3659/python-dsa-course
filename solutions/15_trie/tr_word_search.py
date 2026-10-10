"""Reference solution · tr-word-search · Word Search II

Complexity: Exponential in word length, pruned by the trie

Approach: Grid backtracking guided by a trie.
"""


def find_words(board, words):
    root = {}
    for w in words:
        node = root
        for ch in w:
            node = node.setdefault(ch, {})
        node["$"] = w
    rows, cols, found = len(board), len(board[0]), set()

    def dfs(r, c, node):
        ch = board[r][c]
        nxt = node.get(ch)
        if nxt is None:
            return
        if "$" in nxt:
            found.add(nxt["$"])
        board[r][c] = "#"                # mark as used
        for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            nr, nc = r + dr, c + dc
            if 0 <= nr < rows and 0 <= nc < cols and board[nr][nc] != "#":
                dfs(nr, nc, nxt)
        board[r][c] = ch                 # un-mark (backtrack)

    for r in range(rows):
        for c in range(cols):
            dfs(r, c, root)
    return sorted(found)
