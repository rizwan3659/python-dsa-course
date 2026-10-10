"""Reference solution · py-safe-divide · Safe Division

Complexity: O(1)

Approach: try the division, catch the two expected exceptions.

Common mistakes:
- A bare except:, which would also hide unrelated bugs.
- Checking b == 0 but forgetting non-numbers.

Follow-up challenge: Return a helpful error message string instead of None,
using the exception object (except ... as e).
"""


def safe_divide(a, b):
    try:
        return a / b
    except (ZeroDivisionError, TypeError):
        return None
