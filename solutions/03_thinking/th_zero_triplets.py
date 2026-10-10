"""Reference solution · th-zero-triplets · Count Zero-Sum Triplets

Complexity: O(n³) time, O(1) space

Approach: Enumerate every triple once with i < j < k. The constraints make
O(n³) acceptable.

Common mistakes:
- Starting inner loops at 0 and counting the same triple six times.
- Assuming the values are distinct.

Follow-up challenge: Count the triples in O(n²) by sorting and using two
pointers, or with a dictionary of pair sums.
"""


def zero_triplets(nums):
    n = len(nums)
    count = 0
    for i in range(n):
        for j in range(i + 1, n):
            for k in range(j + 1, n):
                if nums[i] + nums[j] + nums[k] == 0:
                    count += 1
    return count
