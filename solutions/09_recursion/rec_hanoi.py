"""Reference solution · rec-hanoi · Towers of Hanoi

Complexity: O(2ⁿ) moves

Approach: Move n − 1 out of the way, move the biggest, move n − 1 back on
top.
"""


def hanoi(n, src="A", dst="C", via="B"):
    if n == 0:
        return []
    return (hanoi(n - 1, src, via, dst)      # park n - 1 disks on via
            + [(src, dst)]                   # move the biggest disk
            + hanoi(n - 1, via, dst, src))   # bring the n - 1 disks over
