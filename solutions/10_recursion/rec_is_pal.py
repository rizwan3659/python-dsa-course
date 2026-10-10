"""Reference solution · rec-is-pal · Recursive Palindrome

Complexity: O(n²) with slicing (O(n) with indexes)

Approach: Compare ends, recurse inward.
"""


def is_pal(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_pal(s[1:-1])
