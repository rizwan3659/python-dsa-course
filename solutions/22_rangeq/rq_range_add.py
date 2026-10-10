"""Reference solution · rq-range-add · Apply Range Additions

Complexity: O(n + u) time, O(n) space

Approach: Difference array plus one prefix-sum pass.

Dry run:
    n = 5, updates (1,3,+2) (2,4,+3) (0,2,−2)
    diff  −2  2  3  −2  −2  −3(ignored)
    run   −2  0  3   5   3

Common mistakes:
- diff of length n: diff[r + 1] fails when r = n − 1.
- Rebuilding with the extra last cell included.

Follow-up challenge: Range additions on a 2D grid: a 2D difference array
with four corner updates.
"""


def apply_updates(n, updates):
    diff = [0] * (n + 1)
    for l, r, v in updates:
        diff[l] += v          # the change starts here
        diff[r + 1] -= v      # and stops after r
    out, run = [], 0
    for i in range(n):
        run += diff[i]
        out.append(run)
    return out
