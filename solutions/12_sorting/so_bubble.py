"""Reference solution · so-bubble · Bubble Sort

Complexity: O(n²) worst, O(n) best

Approach: Repeated neighbour swaps with an early exit.
"""


def bubble_sort(a):
    n = len(a)
    for i in range(n):
        swapped = False
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a
