"""py-e9 · The copy that is not a copy
Topic 1: Python for DSA · medium · Python basics · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    (lambda g: (with_border(g), g)[1])([[1, 2]])  ->  [[1, 2]]
    with_border([[1], [2]])  ->  [[0, 1], [0, 2]]

Check your work:   python dsa.py test py-e9
Stuck?             python dsa.py hint py-e9
"""


def with_border(grid):
    new = [row for row in grid]
    for row in new:
        row.insert(0, 0)
    return new
