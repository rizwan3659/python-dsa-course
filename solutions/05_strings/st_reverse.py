"""Reference solution · st-reverse · Reverse String

Complexity: O(n) time, O(1) space

Approach: Two pointers.

Common mistakes:
- Returning a reversed copy instead of changing the list.
- Swapping all the way to the end, which undoes the reversal.

Follow-up challenge: Reverse each word of a sentence in place, keeping the
word order.
"""


def reverse_string(chars):
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
