"""Reference solution · rec-sudoku · Sudoku Solver

Complexity: Exponential in the worst case; fast on real puzzles thanks to pruning

Approach: Backtracking over empty cells with O(1) constraint checks via
sets.

Common mistakes:
- Validating the whole board after every placement (slow).
- Forgetting to reset the cell to 0 and remove the digit from the sets when
  backtracking.
- Wrong box index, e.g. r // 3 + c // 3.

Follow-up challenge: Always fill the empty cell with the fewest possible
digits first. How much faster does it get on hard puzzles?
"""


def solve_sudoku(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    empty = []
    for r in range(9):
        for c in range(9):
            v = board[r][c]
            if v:
                rows[r].add(v)
                cols[c].add(v)
                boxes[r // 3 * 3 + c // 3].add(v)
            else:
                empty.append((r, c))

    def go(k):
        if k == len(empty):
            return True
        r, c = empty[k]
        b = r // 3 * 3 + c // 3
        for v in range(1, 10):
            if v in rows[r] or v in cols[c] or v in boxes[b]:
                continue                         # prune: breaks a rule already
            board[r][c] = v
            rows[r].add(v); cols[c].add(v); boxes[b].add(v)
            if go(k + 1):
                return True
            rows[r].remove(v); cols[c].remove(v); boxes[b].remove(v)
        board[r][c] = 0
        return False

    go(0)
    return board
