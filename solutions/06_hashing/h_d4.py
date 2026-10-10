"""Reference solution · h-d4 · Anagram check with sets
"""


from collections import Counter

def is_anagram(a, b):
    return Counter(a) == Counter(b)
