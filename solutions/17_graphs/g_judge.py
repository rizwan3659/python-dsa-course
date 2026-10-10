"""Reference solution · g-judge · Find the Town Judge

Complexity: O(n + E)

Approach: Degree counting.
"""


def find_judge(n, trust):
    score = [0] * (n + 1)          # in-degree minus out-degree
    for a, b in trust:
        score[a] -= 1
        score[b] += 1
    for p in range(1, n + 1):
        if score[p] == n - 1:
            return p
    return -1
