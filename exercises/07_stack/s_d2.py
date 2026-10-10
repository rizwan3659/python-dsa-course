"""s-d2 · Crash on a closing bracket
Topic 7: Stack · easy · Stack · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    is_valid(")(")  ->  False
    is_valid("()")  ->  True

Check your work:   python dsa.py test s-d2
Stuck?             python dsa.py hint s-d2
"""


def is_valid(s):
    pairs = {")": "("}
    stack = []
    for ch in s:
        if ch == "(":
            stack.append(ch)
        elif stack.pop() != pairs[ch]:
            return False
    return not stack
