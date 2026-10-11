"""Reference solution · s-remove-adjacent · Remove Adjacent Duplicates

Complexity: O(n) time

Approach: Stack of kept letters; pop on match.

Common mistakes:
- Removing one pair and restarting from the beginning: O(n²).
- Forgetting that removals can create new pairs ("abba").

Follow-up challenge: Remove runs of k equal adjacent letters.
"""


def remove_duplicates(s):
    stack = []
    for ch in s:
        if stack and stack[-1] == ch:
            stack.pop()
        else:
            stack.append(ch)
    return "".join(stack)
