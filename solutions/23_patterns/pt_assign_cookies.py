"""Reference solution · pt-assign-cookies · Assign Cookies

Complexity: O(n log n)

Approach: Sort + greedy two pointers.

Common mistakes:
- Not sorting both lists.
- Giving the biggest cookie to the least greedy child.

Follow-up challenge: Each cookie can be split once.
"""


def find_content_children(greed, sizes):
    greed, sizes = sorted(greed), sorted(sizes)
    child = 0
    for s in sizes:
        if child < len(greed) and s >= greed[child]:
            child += 1                # smallest cookie that satisfies this child
    return child
