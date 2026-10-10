"""Reference solution · rq-d2 · Off the end of the difference array
"""


def apply_updates(n, updates):
    diff = [0] * (n + 1)
    for l, r, v in updates:
        diff[l] += v
        diff[r + 1] -= v
    out, run = [], 0
    for d in diff[:n]:
        run += d
        out.append(run)
    return out
