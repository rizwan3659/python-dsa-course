"""Reference solution · h-d5 · Cleaning zeros out of a dict
"""


def drop_zeros(d):
    for k in list(d):
        if d[k] == 0:
            del d[k]
    return d
