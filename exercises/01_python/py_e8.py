"""py-e8 · One bad value stops everything
Topic 1: Python for DSA · medium · Python basics · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    parse_all(["1", "x", "3"])  ->  [1, 3]
    parse_all(["-4", "5"])  ->  [-4, 5]
    parse_all(["a", "b"])  ->  []

Check your work:   python dsa.py test py-e8
Stuck?             python dsa.py hint py-e8
"""


def parse_all(items):
    out = []
    try:
        for s in items:
            out.append(int(s))
    except ValueError:
        pass
    return out
