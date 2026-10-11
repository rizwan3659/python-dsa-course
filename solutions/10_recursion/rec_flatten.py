"""Reference solution · rec-flatten · Flatten a Nested List

Complexity: O(total elements)

Approach: Recurse on sublists.

Common mistakes:
- Only flattening one level.
- Treating strings as lists (they are iterable too).

Follow-up challenge: Write it without recursion, using an explicit stack.
"""


def flatten(items):
    result = []
    for x in items:
        if isinstance(x, list):
            result.extend(flatten(x))
        else:
            result.append(x)
    return result
