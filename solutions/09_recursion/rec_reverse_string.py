"""Reference solution · rec-reverse-string · Reverse a String Recursively

Complexity: O(n²) with slicing

Approach: Move the first character to the end of the reversed rest.
"""


def reverse(s):
    if len(s) <= 1:
        return s
    return reverse(s[1:]) + s[0]
