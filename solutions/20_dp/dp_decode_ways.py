"""Reference solution · dp-decode-ways · Decode Ways

Complexity: O(n) time, O(1) space

Approach: 1D DP like climbing stairs, with validity checks for one-digit and
two-digit steps.

Common mistakes:
- Treating "0" as a letter on its own.
- Allowing two-digit codes like "05" or "27".

Follow-up challenge: Return one valid decoding as letters, or all of them
for short strings.
"""


def num_decodings(s):
    # ways ending one character back (prev1) and two characters back (prev2)
    prev2, prev1 = 1, 1 if s[0] != "0" else 0
    for i in range(1, len(s)):
        cur = 0
        if s[i] != "0":                       # decode s[i] alone
            cur += prev1
        if 10 <= int(s[i - 1:i + 1]) <= 26:   # decode s[i-1:i+1] as one letter
            cur += prev2
        prev2, prev1 = prev1, cur
    return prev1
