"""Reference solution · s-decode · Decode String

Complexity: O(output length)

Approach: Stack of (prefix, count) pairs for each open bracket.
"""


def decode_string(s):
    stack = []                  # (text before the bracket, repeat count)
    cur, num = "", 0
    for ch in s:
        if ch.isdigit():
            num = num * 10 + int(ch)
        elif ch == "[":
            stack.append((cur, num))
            cur, num = "", 0
        elif ch == "]":
            prev, k = stack.pop()
            cur = prev + cur * k
        else:
            cur += ch
    return cur
