"""Reference solution · dp-target-sum · Target Sum

Complexity: O(n · S) time and space where S = sum(nums)

Approach: DP over the set of reachable running sums (counting).

Common mistakes:
- Forgetting that 0 can take both signs (two ways).
- Using a list indexed by sum without an offset for negative sums.

Follow-up challenge: Turn it into subset sum: the positive part P satisfies
P = (sum + target) / 2.
"""


def find_target_sum_ways(nums, target):
    ways = {0: 1}                      # running sum -> number of ways to reach it
    for x in nums:
        nxt = {}
        for s, count in ways.items():
            nxt[s + x] = nxt.get(s + x, 0) + count
            nxt[s - x] = nxt.get(s - x, 0) + count
        ways = nxt
    return ways.get(target, 0)
