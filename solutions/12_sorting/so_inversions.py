"""Reference solution · so-inversions · Count Inversions

Complexity: O(n log n)

Approach: Merge sort that counts while merging.
"""


def count_inversions(nums):
    def sort(a):
        if len(a) <= 1:
            return a, 0
        mid = len(a) // 2
        left, x = sort(a[:mid])
        right, y = sort(a[mid:])
        out, i, j, inv = [], 0, 0, x + y
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                out.append(left[i]); i += 1
            else:
                out.append(right[j]); j += 1
                inv += len(left) - i         # every remaining left item is bigger
        return out + left[i:] + right[j:], inv
    return sort(nums)[1]
