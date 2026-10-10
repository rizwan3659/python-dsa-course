"""h-d1 · Unhashable key
Topic 6: Hash Tables · easy · Hashing · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    count_points([[1, 2], [1, 2], [0, 0]])  ->  {(1, 2): 2, (0, 0): 1}

Check your work:   python dsa.py test h-d1
Stuck?             python dsa.py hint h-d1
"""


def count_points(points):
    counts = {}
    for p in points:            # p is a list like [x, y]
        counts[p] = counts.get(p, 0) + 1
    return counts
