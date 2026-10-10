"""arr-range-sum · Optimize: Many Range Sums
Topic 3: Arrays / Python Lists · medium · Prefix Sum · optimize

`range_sums(nums, queries)` answers each query `(l, r)` with
`sum(nums[l..r])` (inclusive). The starter is correct but O(n · q): with
20,000 numbers and 20,000 queries it is far too slow. Make it O(n + q).

Examples:
    range_sums([1, 2, 3, 4, 5], [(0, 2), (1, 4), (3, 3)])  ->  [6, 14, 4]
    range_sums([5, -2], [(0, 1)])  ->  [3]
    20,000 queries on 20,000 numbers (must be fast)

Target complexity: O(n + q) time

Check your work:   python dsa.py test arr-range-sum
Stuck?             python dsa.py hint arr-range-sum
"""


def range_sums(nums, queries):
    answers = []
    for l, r in queries:
        answers.append(sum(nums[l:r + 1]))   # O(n) per query
    return answers
