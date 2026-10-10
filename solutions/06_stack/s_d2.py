"""Reference solution · s-d2 · Crash on a closing bracket
"""


def is_valid(s):
    pairs = {")": "("}
    stack = []
    for ch in s:
        if ch == "(":
            stack.append(ch)
        elif not stack or stack.pop() != pairs[ch]:
            return False
    return not stack
