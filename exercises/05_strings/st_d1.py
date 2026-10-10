"""st-d1 · Editing a string in place
Topic 5: Strings · easy · Python basics · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    capitalize_first("hello")  ->  "Hello"
    capitalize_first("")  ->  ""

Check your work:   python dsa.py test st-d1
Stuck?             python dsa.py hint st-d1
"""


def capitalize_first(s):
    s[0] = s[0].upper()
    return s
