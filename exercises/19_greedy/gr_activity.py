"""gr-activity · Activity Selection
Topic 19: Greedy Algorithms · easy · Intervals

Each activity is `[start, end]`. Two activities are compatible if one starts
at or after the other ends. Return the largest number of compatible
activities.

Examples:
    max_activities([[1, 3], [2, 4], [3, 5], [0, 6], [5, 7], [8, 9], [5, 9]])  ->  4
    max_activities([[1, 10], [2, 3], [4, 5]])  ->  2
    max_activities([])  ->  0

(3 more hidden tests run when you check your work.)

Constraints:
- 0 ≤ len(intervals) ≤ 10^5
- 0 ≤ start < end ≤ 10^9

Target complexity: O(n log n) time, O(n) space for the sorted copy

Check your work:   python dsa.py test gr-activity
Stuck?             python dsa.py hint gr-activity
"""


def max_activities(intervals):
    # your code here
    pass
