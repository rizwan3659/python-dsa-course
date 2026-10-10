"""so-d1 · Index out of range
Topic 12: Sorting · easy · Sorting · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    bubble_sort([3, 1, 2])  ->  [1, 2, 3]

Check your work:   python dsa.py test so-d1
Stuck?             python dsa.py hint so-d1
"""


def bubble_sort(a):
    n = len(a)
    for i in range(n):
        for j in range(n - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
    return a
