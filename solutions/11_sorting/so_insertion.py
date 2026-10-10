"""Reference solution · so-insertion · Insertion Sort

Complexity: O(n²) worst, O(n) best

Approach: Grow a sorted prefix.
"""


def insertion_sort(a):
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a
