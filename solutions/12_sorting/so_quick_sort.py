"""Reference solution · so-quick-sort · Quick Sort

Complexity: O(n log n) expected, O(n²) worst

Approach: Partition around a random pivot, recurse.
"""


import random

def quick_sort(a):
    def sort(lo, hi):
        if lo >= hi:
            return
        r = random.randint(lo, hi)          # random pivot avoids the O(n²) trap
        a[r], a[hi] = a[hi], a[r]
        pivot, i = a[hi], lo
        for j in range(lo, hi):
            if a[j] < pivot:
                a[i], a[j] = a[j], a[i]
                i += 1
        a[i], a[hi] = a[hi], a[i]
        sort(lo, i - 1)
        sort(i + 1, hi)
    sort(0, len(a) - 1)
    return a
