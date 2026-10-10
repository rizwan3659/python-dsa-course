"""rq-d2 · Off the end of the difference array
Topic 22: Range Queries · easy · Prefix Sum · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    apply_updates(3, [(0, 2, 1)])  ->  [1, 1, 1]
    apply_updates(4, [(1, 2, 3)])  ->  [0, 3, 3, 0]
    apply_updates(2, [])  ->  [0, 0]

Check your work:   python dsa.py test rq-d2
Stuck?             python dsa.py hint rq-d2
"""


def apply_updates(n, updates):
    diff = [0] * n
    for l, r, v in updates:
        diff[l] += v
        diff[r + 1] -= v
    out, run = [], 0
    for d in diff:
        run += d
        out.append(run)
    return out
