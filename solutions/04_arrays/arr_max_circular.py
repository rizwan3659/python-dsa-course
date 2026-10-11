"""Reference solution · arr-max-circular · Maximum Sum Circular Subarray

Complexity: O(n) time, O(1) space

Approach: Kadane for the max and for the min; answer = max(best_max, total −
best_min), unless everything is negative.

Common mistakes:
- Returning total − min subarray when every number is negative (that empties
  the subarray).
- Doubling the list and running Kadane without limiting the length to n.

Follow-up challenge: Return the indexes of the best circular subarray.
"""


def max_circular(nums):
    cur_max = cur_min = 0
    best_max, best_min = nums[0], nums[0]
    total = 0
    for x in nums:
        cur_max = max(x, cur_max + x)
        best_max = max(best_max, cur_max)
        cur_min = min(x, cur_min + x)
        best_min = min(best_min, cur_min)
        total += x
    if best_max < 0:          # every number is negative
        return best_max
    return max(best_max, total - best_min)
