"""hp-d2 · Sift down ignores a child
Topic 15: Heap / Priority Queue · medium · Heap / Top-K · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    sift_down([9, 4, 1], 0)  ->  [1, 4, 9]
    sift_down([5, 2, 3, 4, 1], 0)  ->  [2, 1, 3, 4, 5]

Check your work:   python dsa.py test hp-d2
Stuck?             python dsa.py hint hp-d2
"""


def sift_down(a, i):
    n = len(a)
    while 2 * i + 1 < n:
        child = 2 * i + 1
        if a[child] >= a[i]:
            break
        a[i], a[child] = a[child], a[i]
        i = child
    return a
