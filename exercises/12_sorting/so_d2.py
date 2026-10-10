"""so-d2 · Merge sort loses numbers
Topic 12: Sorting · medium · Divide & Conquer · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    merge_sort([2, 1])  ->  [1, 2]
    merge_sort([5, 3, 8, 1])  ->  [1, 3, 5, 8]

Check your work:   python dsa.py test so-d2
Stuck?             python dsa.py hint so-d2
"""


def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out
