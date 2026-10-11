"""Reference solution · so-merge-sort · Merge Sort

Complexity: O(n log n) time, O(n) space

Approach: Divide and conquer.

Common mistakes:
- Merging with list.pop(0), which is O(n) per pop.
- Forgetting to copy what is left of one half.

Follow-up challenge: Make it stable and prove that it is.
"""


def merge_sort(a):
    if len(a) <= 1:
        return a[:]
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1
    return out + left[i:] + right[j:]
