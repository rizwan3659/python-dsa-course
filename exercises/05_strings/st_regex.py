"""st-regex · Regular Expression Matching
Topic 5: Strings · hard · Memoization / DP

Return `True` if the pattern matches the whole string. `.` matches any
single character and `x*` matches zero or more copies of the character
before it.

Examples:
    is_match("aa", "a")  ->  False
    is_match("aa", "a*")  ->  True
    is_match("ab", ".*")  ->  True

(5 more hidden tests run when you check your work.)

Constraints:
- 0 ≤ len(s) ≤ 20, 1 ≤ len(p) ≤ 30
- every * follows a letter or a dot

Before this: dp-lcs

Target complexity: O(len(s) · len(p)) time and space

Check your work:   python dsa.py test st-regex
Stuck?             python dsa.py hint st-regex
"""


def is_match(s, p):
    # your code here
    pass
