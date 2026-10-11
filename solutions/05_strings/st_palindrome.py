"""Reference solution · st-palindrome · Valid Palindrome

Complexity: O(n) time, O(1) space

Approach: Two pointers with skipping.

Common mistakes:
- Forgetting to lower-case before comparing.
- Building a cleaned copy is fine, but comparing before skipping
  non-alphanumeric characters is not.

Follow-up challenge: Allow one deletion (st-palindrome-ii).
"""


def is_palindrome(s):
    left, right = 0, len(s) - 1
    while left < right:
        if not s[left].isalnum():
            left += 1
        elif not s[right].isalnum():
            right -= 1
        elif s[left].lower() != s[right].lower():
            return False
        else:
            left += 1
            right -= 1
    return True
