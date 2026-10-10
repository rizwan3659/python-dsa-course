"""bigo-count-pairs · Optimize: Count Pairs With Difference k
Topic 2: Big-O Complexity · medium · Hashing · optimize

Count pairs of positions i < j with `abs(nums[i] - nums[j]) == k` (k ≥ 1).
The starter checks every pair. Make it O(n).

`count_diff_pairs([1, 5, 3, 4, 2], 2)` → `3` ((1, 3), (5, 3) and (4, 2))

Examples:
    count_diff_pairs([1, 5, 3, 4, 2], 2)  ->  3
    count_diff_pairs([1, 1, 3], 2)  ->  2
    count_diff_pairs([], 1)  ->  0

(1 more hidden test run when you check your work.)

Target complexity: O(n) time, O(n) space

Check your work:   python dsa.py test bigo-count-pairs
Stuck?             python dsa.py hint bigo-count-pairs
"""


def count_diff_pairs(nums, k):
    count = 0
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if abs(nums[i] - nums[j]) == k:
                count += 1
    return count
