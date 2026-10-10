"""Reference solution · st-reverse · Reverse String

Complexity: O(n) time, O(1) space

Approach: Two pointers.
"""


def reverse_string(chars):
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
