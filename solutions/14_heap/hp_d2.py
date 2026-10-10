"""Reference solution · hp-d2 · Sift down ignores a child
"""


def sift_down(a, i):
    n = len(a)
    while 2 * i + 1 < n:
        child = 2 * i + 1
        if child + 1 < n and a[child + 1] < a[child]:
            child += 1
        if a[child] >= a[i]:
            break
        a[i], a[child] = a[child], a[i]
        i = child
    return a
