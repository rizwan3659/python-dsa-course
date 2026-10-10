"""st-d2 · Strict palindrome
Topic 5: Strings · easy · Two Pointers · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    is_palindrome_sentence("Race car")  ->  True
    is_palindrome_sentence("A man, a plan, a canal: Panama")  ->  True
    is_palindrome_sentence("abc")  ->  False

Check your work:   python dsa.py test st-d2
Stuck?             python dsa.py hint st-d2
"""


def is_palindrome_sentence(s):
    return s == s[::-1]
