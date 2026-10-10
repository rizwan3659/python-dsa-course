"""Reference solution · s-remove-adjacent · Remove Adjacent Duplicates

Complexity: O(n) time

Approach: Stack of kept letters; pop on match.
"""


def remove_duplicates(s):
    stack = []
    for ch in s:
        if stack and stack[-1] == ch:
            stack.pop()
        else:
            stack.append(ch)
    return "".join(stack)
