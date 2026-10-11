"""Reference solution · s-valid-parens · Valid Parentheses

Complexity: O(n) time, O(n) space

Approach: Stack of open brackets; map each closer to its opener.

Common mistakes:
- Returning True without checking the stack is empty at the end ("((").
- Popping from an empty stack on a closing bracket.

Follow-up challenge: Return the index of the first error, or −1.
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
