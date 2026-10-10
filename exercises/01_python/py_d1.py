"""py-d1 · Tags that remember
Topic 1: Python for DSA · medium · Python basics · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    add_tag("a")  ->  ["a"]
    add_tag("b")  ->  ["b"]
    add_tag("c", ["x"])  ->  ["x", "c"]

Check your work:   python dsa.py test py-d1
Stuck?             python dsa.py hint py-d1
"""


def add_tag(tag, tags=[]):
    tags.append(tag)
    return tags
