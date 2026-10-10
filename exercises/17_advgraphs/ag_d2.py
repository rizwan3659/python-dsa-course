"""ag-d2 · Union without find
Topic 17: Advanced Graphs · medium · Union-Find · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    count_groups(3, [(0, 1), (2, 1)])  ->  1

Check your work:   python dsa.py test ag-d2
Stuck?             python dsa.py hint ag-d2
"""


def count_groups(n, pairs):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            x = parent[x]
        return x
    for a, b in pairs:
        parent[b] = a
    return len({find(i) for i in range(n)})
