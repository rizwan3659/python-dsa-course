"""Reference solution · py-dedupe · Remove Duplicates, Keep Order

Complexity: O(n) time, O(n) space

Approach: Set for O(1) “seen?” checks, list for the ordered output.
"""


def dedupe(items):
    seen = set()
    result = []
    for x in items:
        if x not in seen:
            seen.add(x)
            result.append(x)
    return result
