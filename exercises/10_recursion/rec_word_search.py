"""rec-word-search · Word Search
Topic 10: Recursion & Backtracking · medium · Backtracking

Return `True` if `word` can be spelled by moving between horizontally or
vertically adjacent cells of the board, using each cell at most once.

Examples:
    exist([row[:] for row in B], "ABCCED")  ->  True
    exist([row[:] for row in B], "SEE")  ->  True
    exist([row[:] for row in B], "ABCB")  ->  False

(3 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ rows, cols ≤ 6
- 1 ≤ len(word) ≤ 15

Target complexity: O(rows · cols · 3^L)

Check your work:   python dsa.py test rec-word-search
Stuck?             python dsa.py hint rec-word-search
"""


def exist(board, word):
    # your code here
    pass
