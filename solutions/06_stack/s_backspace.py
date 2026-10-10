"""Reference solution · s-backspace · Backspace String Compare

Complexity: O(n + m) time

Approach: Build each final string with a stack and compare.
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
