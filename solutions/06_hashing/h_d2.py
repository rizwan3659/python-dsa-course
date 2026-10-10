"""Reference solution · h-d2 · Counting from nothing
"""


def counts(words):
    d = {}
    for w in words:
        d[w] = d.get(w, 0) + 1
    return d
