"""h-d2 · Counting from nothing
Topic 5: Hash Tables · easy · Hashing · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    counts(["a", "b", "a"])  ->  {"a": 2, "b": 1}
    counts([])  ->  {}

Check your work:   python dsa.py test h-d2
Stuck?             python dsa.py hint h-d2
"""


def counts(words):
    d = {}
    for w in words:
        d[w] += 1
    return d
