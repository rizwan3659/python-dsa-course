"""Reference solution · s-simplify-path · Simplify Unix Path

Complexity: O(n) time

Approach: Stack of folder names.
"""


def simplify_path(path):
    stack = []
    for part in path.split("/"):
        if part == "..":
            if stack:
                stack.pop()
        elif part and part != ".":
            stack.append(part)
    return "/" + "/".join(stack)
