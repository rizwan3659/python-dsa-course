"""Reference solution · rec-n-queens · N-Queens (count solutions)

Complexity: Exponential, heavily pruned

Approach: Row-by-row backtracking with column and diagonal sets.

Common mistakes:
- Checking only columns, not diagonals.
- Scanning the board to test safety instead of keeping sets.

Follow-up challenge: Return one board layout as strings.
"""


def n_queens(n):
    cols, diag1, diag2 = set(), set(), set()

    def place(row):
        if row == n:
            return 1
        count = 0
        for c in range(n):
            if c in cols or row - c in diag1 or row + c in diag2:
                continue
            cols.add(c); diag1.add(row - c); diag2.add(row + c)
            count += place(row + 1)
            cols.remove(c); diag1.remove(row - c); diag2.remove(row + c)
        return count

    return place(0)
