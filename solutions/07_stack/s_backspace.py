"""Reference solution · s-backspace · Backspace String Compare

Complexity: O(n + m) time

Approach: Build each final string with a stack and compare.

Common mistakes:
- Popping from an empty stack when # comes first.
- Using str.replace, which cannot handle consecutive #.

Follow-up challenge: Solve it in O(1) extra space by scanning both strings
from the end.
"""


def backspace_compare(s, t):
    def typed(x):
        stack = []
        for ch in x:
            if ch == "#":
                if stack:
                    stack.pop()
            else:
                stack.append(ch)
        return stack
    return typed(s) == typed(t)
