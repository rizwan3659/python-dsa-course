"""Reference solution · py-dedupe · Remove Duplicates, Keep Order

Complexity: O(n) time, O(n) space

Approach: Set for O(1) “seen?” checks, list for the ordered output.

Common mistakes:
- Using list(set(items)), which loses the original order.
- Checking `x in result` on a list, which makes the solution O(n²).

Follow-up challenge: Do it in one line with dict.fromkeys(items).
"""


def dedupe(items):
    seen = set()
    result = []
    for x in items:
        if x not in seen:
            seen.add(x)
            result.append(x)
    return result
