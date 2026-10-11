"""Reference solution · so-bubble · Bubble Sort

Complexity: O(n²) worst, O(n) best

Approach: Repeated neighbour swaps with an early exit.

Common mistakes:
- Comparing a[i] with a[i + 1] up to the very end, causing IndexError.
- Not stopping early when a pass makes no swaps.

Follow-up challenge: Count the number of swaps (it equals the number of
inversions).
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
