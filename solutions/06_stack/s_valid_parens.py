"""Reference solution · s-valid-parens · Valid Parentheses

Complexity: O(n) time, O(n) space

Approach: Stack of open brackets; map each closer to its opener.
"""


def is_valid(s):
    pairs = {")": "(", "]": "[", "}": "{"}
    stack = []
    for ch in s:
        if ch in "([{":
            stack.append(ch)
        elif not stack or stack.pop() != pairs[ch]:
            return False
    return not stack
