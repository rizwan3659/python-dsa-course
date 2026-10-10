"""Reference solution · th-leap-year · Leap Year

Complexity: O(1) time, O(1) space

Approach: Test the rules from most specific to least specific so each
exception overrides the general rule.

Common mistakes:
- Checking % 4 first and returning True for 1900.
- Forgetting that 2000 is a leap year.

Follow-up challenge: Write it as one boolean expression, then decide which
version is easier to read.
"""


def is_leap(year):
    if year % 400 == 0:
        return True
    if year % 100 == 0:
        return False
    return year % 4 == 0
