"""Reference solution · rec-combination-sum · Combination Sum

Complexity: Exponential in the worst case

Approach: Backtracking with a start index and pruning.

Common mistakes:
- Starting the loop at 0 every time, which produces duplicates like [2, 3,
  2].
- Not stopping when the remaining target goes negative.

Follow-up challenge: Each candidate may be used once
(rec-combination-sum-ii).
"""


def combination_sum(candidates, target):
    candidates = sorted(candidates)
    result, path = [], []

    def backtrack(start, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            c = candidates[i]
            if c > remaining:
                break                       # sorted: larger ones fail too
            path.append(c)
            backtrack(i, remaining - c)     # i, not i + 1: reuse allowed
            path.pop()

    backtrack(0, target)
    return result
