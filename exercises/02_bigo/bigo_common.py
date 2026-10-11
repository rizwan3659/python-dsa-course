"""bigo-common · Optimize: Common Elements
Topic 2: Big-O Complexity · medium · Hashing · optimize

Return the elements of `a` (in order) that also appear in `b`. The starter
is O(n · m): too slow for 50,000 items each. Make it O(n + m).

Examples:
    common([1, 2, 3, 4], [4, 2])  ->  [2, 4]
    common([], [1])  ->  []
    50,000 × 50,000 (must be fast)

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ len(a), len(b) ≤ 10^5
- must run in O(n + m)

Target complexity: O(n + m) time

Check your work:   python dsa.py test bigo-common
Stuck?             python dsa.py hint bigo-common
"""


def common(a, b):
    return [x for x in a if x in b]
