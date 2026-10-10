"""Reference solution · py-e8 · One bad value stops everything
"""


def parse_all(items):
    out = []
    for s in items:
        try:
            out.append(int(s))
        except ValueError:
            pass
    return out
