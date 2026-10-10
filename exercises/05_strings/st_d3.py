"""st-d3 · Compression loses the last group
Topic 5: Strings · medium · Two Pointers · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    compress("aab")  ->  "a2b1"
    compress("a")  ->  "a1"

Check your work:   python dsa.py test st-d3
Stuck?             python dsa.py hint st-d3
"""


def compress(s):
    if not s:
        return ""
    out, count = [], 1
    for i in range(1, len(s)):
        if s[i] == s[i - 1]:
            count += 1
        else:
            out.append(s[i - 1] + str(count))
            count = 1
    return "".join(out)
