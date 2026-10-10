"""h-d5 · Cleaning zeros out of a dict
Topic 6: Hash Tables · medium · Hashing · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    drop_zeros({"a": 0, "b": 1, "c": 0})  ->  {"b": 1}

Check your work:   python dsa.py test h-d5
Stuck?             python dsa.py hint h-d5
"""


def drop_zeros(d):
    for k in d:
        if d[k] == 0:
            del d[k]
    return d
