"""Reference solution · dp-house-robber · House Robber

Complexity: O(n) time, O(1) space

Approach: 1D DP; only the previous two values are needed, so use two
variables.

Dry run:
    nums 2 7 9 3 1
    best 2 7 11 11 12   (11 = 2 + 9, 12 = 11 + 1)

Common mistakes:
- Taking every other house (even or odd positions): [2, 1, 1, 2] needs
  houses 0 and 3.
- Mishandling an empty list or a single house.

Follow-up challenge: House Robber II: the houses are in a circle
(dp-robber-circle).
"""


def rob(nums):
    skip, take = 0, 0          # best so far if the previous house was skipped / allowed
    for x in nums:
        skip, take = take, max(take, skip + x)
    return take
