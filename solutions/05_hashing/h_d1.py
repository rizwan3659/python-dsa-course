"""Reference solution · h-d1 · Unhashable key
"""


def count_points(points):
    counts = {}
    for p in points:
        key = tuple(p)
        counts[key] = counts.get(key, 0) + 1
    return counts
