"""Reference solution · st-compress · String Compression

Complexity: O(n)

Approach: Run-length encoding with a group pointer.

Common mistakes:
- Forgetting to write the last run after the loop.
- Building the result with += inside the loop instead of a list + join.

Follow-up challenge: Write the inverse function that decompresses "a2bc5".
"""


def compress(s):
    out, i = [], 0
    while i < len(s):
        j = i
        while j < len(s) and s[j] == s[i]:
            j += 1
        out.append(s[i] + (str(j - i) if j - i > 1 else ""))
        i = j
    result = "".join(out)
    return result if len(result) < len(s) else s
