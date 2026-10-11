"""Reference solution · rec-reverse-string · Reverse a String Recursively

Complexity: O(n²) with slicing

Approach: Move the first character to the end of the reversed rest.

Common mistakes:
- No base case for the empty string.
- Putting the first character first again: s[0] + reverse(s[1:]).

Follow-up challenge: Reverse the words of a sentence recursively.
"""


def reverse(s):
    if len(s) <= 1:
        return s
    return reverse(s[1:]) + s[0]
