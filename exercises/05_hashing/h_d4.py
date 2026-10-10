"""h-d4 · Anagram check with sets
Topic 5: Hash Tables · easy · Hashing · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    is_anagram("aab", "abb")  ->  False
    is_anagram("listen", "silent")  ->  True

Check your work:   python dsa.py test h-d4
Stuck?             python dsa.py hint h-d4
"""


def is_anagram(a, b):
    return set(a) == set(b)
