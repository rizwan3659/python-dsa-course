"""s-d1 · Unclosed brackets pass
Topic 7: Stack · easy · Stack · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    is_valid("((")  ->  False
    is_valid("([])")  ->  True

Check your work:   python dsa.py test s-d1
Stuck?             python dsa.py hint s-d1
"""


def is_valid(s):
    pairs = {")": "(", "]": "["}
    stack = []
    for ch in s:
        if ch in "([":
            stack.append(ch)
        elif not stack or stack.pop() != pairs[ch]:
            return False
    return True
