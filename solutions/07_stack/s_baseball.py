"""Reference solution · s-baseball · Baseball Game

Complexity: O(n) time

Approach: Stack of valid scores.

Common mistakes:
- Using int(op) on "+", "D" or "C".
- For "+", popping the two scores instead of reading them.

Follow-up challenge: Add an "U" operation that undoes the last "C".
"""


def cal_points(ops):
    stack = []
    for op in ops:
        if op == "+":
            stack.append(stack[-1] + stack[-2])
        elif op == "D":
            stack.append(2 * stack[-1])
        elif op == "C":
            stack.pop()
        else:
            stack.append(int(op))
    return sum(stack)
