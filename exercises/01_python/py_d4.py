"""py-d4 · Nobody is excellent
Topic 1: Python for DSA · easy · Python basics · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    label(95)  ->  "excellent"
    label(60)  ->  "pass"
    label(10)  ->  "fail"

Check your work:   python dsa.py test py-d4
Stuck?             python dsa.py hint py-d4
"""


def label(score):
    if score >= 50:
        return "pass"
    elif score >= 90:
        return "excellent"
    return "fail"
