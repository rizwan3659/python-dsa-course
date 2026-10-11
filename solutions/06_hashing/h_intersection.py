"""Reference solution · h-intersection · Intersection of Two Arrays

Complexity: O(n + m) plus sorting the result

Approach: set(a) & set(b), then sort.

Common mistakes:
- Returning duplicates.
- Forgetting to sort the result.

Follow-up challenge: Both lists are sorted: solve it with two pointers and
O(1) extra space.
"""


def intersection(a, b):
    return sorted(set(a) & set(b))
