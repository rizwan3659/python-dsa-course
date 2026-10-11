"""Reference solution · st-palindrome-ii · Valid Palindrome II

Complexity: O(n)

Approach: Two pointers with one retry.

Common mistakes:
- Trying every deletion: O(n²).
- Only trying to skip the left character at the first mismatch.

Follow-up challenge: Allow up to k deletions (DP on intervals).
"""


def valid_palindrome(s):
    def is_pal(i, j):
        while i < j:
            if s[i] != s[j]:
                return False
            i += 1
            j -= 1
        return True
    i, j = 0, len(s) - 1
    while i < j:
        if s[i] != s[j]:
            return is_pal(i + 1, j) or is_pal(i, j - 1)   # skip one side
        i += 1
        j -= 1
    return True
