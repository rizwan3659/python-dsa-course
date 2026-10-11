"""Reference solution · st-caesar · Caesar Cipher

Complexity: O(n)

Approach: ord/chr arithmetic.

Common mistakes:
- Forgetting to wrap with % 26 (z goes past the alphabet).
- Shifting spaces and punctuation too.

Follow-up challenge: Decrypt a message when you do not know k (try all 26
and score by letter frequency).
"""


def caesar(s, k):
    out = []
    for ch in s:
        if "a" <= ch <= "z":
            out.append(chr((ord(ch) - ord("a") + k) % 26 + ord("a")))
        else:
            out.append(ch)
    return "".join(out)
