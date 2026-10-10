"""Reference solution · st-compress · String Compression

Complexity: O(n)

Approach: Run-length encoding with a group pointer.
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
