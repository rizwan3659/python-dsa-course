"""Reference solution · arr-merge-sorted · Merge Two Sorted Lists

Complexity: O(n + m) time

Approach: One pointer per list; always take the smaller front element.

Common mistakes:
- Forgetting to copy what is left of one list after the other runs out.
- Calling sorted(a + b): O((n + m) log(n + m)).

Follow-up challenge: Merge k sorted lists with a heap.
"""


def merge_sorted(a, b):
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i])
            i += 1
        else:
            out.append(b[j])
            j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out
