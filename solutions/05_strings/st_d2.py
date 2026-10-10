"""Reference solution · st-d2 · Strict palindrome
"""


def is_palindrome_sentence(s):
    clean = [ch.lower() for ch in s if ch.isalnum()]
    return clean == clean[::-1]
