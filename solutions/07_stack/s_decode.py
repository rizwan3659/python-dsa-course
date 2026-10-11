"""Reference solution · s-decode · Decode String

Complexity: O(output length)

Approach: Stack of (prefix, count) pairs for each open bracket.

Common mistakes:
- Reading only one-digit counts ("10[x]").
- Using one stack and losing the text before the bracket.

Follow-up challenge: Write the encoder that produces the shortest encoding.
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
