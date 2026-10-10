"""Reference solution · pt-shortest-subarray-k · Shortest Subarray with Sum at Least K

Complexity: O(n) time, O(n) space

Approach: Prefix sums + monotonic deque (combines three patterns).

Common mistakes:
- A two-pointer window: with negatives, shrinking can make the sum bigger
  again.
- Forgetting that a satisfied start can be popped for good.

Follow-up challenge: Return the subarray itself.
"""


from collections import deque


def shortest_subarray(nums, k):
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    best = len(nums) + 1
    starts = deque()                        # indexes with increasing prefix values
    for j, p in enumerate(prefix):
        while starts and p - prefix[starts[0]] >= k:
            best = min(best, j - starts.popleft())   # shortest for this start: never needed again
        while starts and prefix[starts[-1]] >= p:
            starts.pop()                    # a later, smaller prefix is a better start
        starts.append(j)
    return best if best <= len(nums) else -1
