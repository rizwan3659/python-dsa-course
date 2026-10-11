"""Reference solution · rec-is-pal · Recursive Palindrome

Complexity: O(n²) with slicing (O(n) with indexes)

Approach: Compare ends, recurse inward.

Common mistakes:
- Missing the base case for strings of length 1.
- Slicing in every call (O(n²) copying); pass indexes instead.

Follow-up challenge: Rewrite it with indexes (is_pal(s, i, j)) so no slices
are copied.
"""


def is_pal(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_pal(s[1:-1])
