"""Reference solution · s-simplify-path · Simplify Unix Path

Complexity: O(n) time

Approach: Stack of folder names.

Common mistakes:
- Treating ".." at the root as an error.
- Keeping empty parts from "//".

Follow-up challenge: Support relative paths given a current directory.
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
