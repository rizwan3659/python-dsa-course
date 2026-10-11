"""Reference solution · g-judge · Find the Town Judge

Complexity: O(n + E)

Approach: Degree counting.

Common mistakes:
- Only checking that someone is trusted by everyone (they must also trust
  nobody).
- Treating people as 0-based.

Follow-up challenge: Solve it with one array of trust scores (in-degree −
out-degree).
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
