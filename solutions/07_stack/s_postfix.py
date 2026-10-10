"""Reference solution · s-postfix · Evaluate Postfix (Reverse Polish)

Complexity: O(n) time

Approach: Operand stack; each operator pops two and pushes the result.
"""


def eval_rpn(tokens):
    stack = []
    for t in tokens:
        if t in ("+", "-", "*", "/"):
            b = stack.pop()
            a = stack.pop()
            if t == "+":
                stack.append(a + b)
            elif t == "-":
                stack.append(a - b)
            elif t == "*":
                stack.append(a * b)
            else:
                stack.append(int(a / b))     # truncate toward zero
        else:
            stack.append(int(t))
    return stack[-1]
