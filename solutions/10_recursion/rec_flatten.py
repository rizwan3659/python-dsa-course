"""Reference solution · rec-flatten · Flatten a Nested List

Complexity: O(total elements)

Approach: Recurse on sublists.
"""


def flatten(items):
    result = []
    for x in items:
        if isinstance(x, list):
            result.extend(flatten(x))
        else:
            result.append(x)
    return result
