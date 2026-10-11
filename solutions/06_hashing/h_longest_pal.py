"""Reference solution · h-longest-pal · Longest Palindrome From Letters

Complexity: O(n) time

Approach: Sum the even part of each count, plus 1 if any count is odd.

Common mistakes:
- Adding odd counts in full instead of count − 1.
- Forgetting that one odd letter may sit in the middle.

Follow-up challenge: Build and return one such palindrome.
"""


from collections import Counter

def longest_palindrome(s):
    length = 0
    odd = False
    for n in Counter(s).values():
        length += n // 2 * 2
        if n % 2:
            odd = True
    return length + (1 if odd else 0)
