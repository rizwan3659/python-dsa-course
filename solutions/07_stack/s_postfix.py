"""Reference solution · s-postfix · Evaluate Postfix (Reverse Polish)

Complexity: O(n) time

Approach: Operand stack; each operator pops two and pushes the result.

Common mistakes:
- Using // for division, which floors instead of truncating toward zero for
  negatives.
- Popping operands in the wrong order for - and /.

Follow-up challenge: Convert an infix expression to postfix (shunting-yard).
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
