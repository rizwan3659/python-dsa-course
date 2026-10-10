"""Reference solution · dp-min-cost-stairs · Min Cost Climbing Stairs

Complexity: O(n) time, O(n) space (O(1) with two variables)

Approach: 1D DP over stairs; the answer is the cheaper of the last two
stairs.

Common mistakes:
- Returning dp[-1] only: you may also jump to the top from the
  second-to-last stair.
- Adding the cost of the top, which is free.

Follow-up challenge: Reduce the space to O(1).
"""


def min_cost(cost):
    # dp[i] = cheapest way to stand on stair i (including its cost)
    dp = cost[:2]
    for i in range(2, len(cost)):
        dp.append(cost[i] + min(dp[i - 1], dp[i - 2]))
    return min(dp[-1], dp[-2])   # the top is reached from either of the last two stairs
