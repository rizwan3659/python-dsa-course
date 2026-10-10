"""gr-job-sequencing · Job Sequencing with Deadlines
Topic 19: Greedy Algorithms · medium · Greedy

Each job `(deadline, profit)` takes one unit of time and must finish by its
deadline (time slots are 1, 2, 3, …). Do at most one job per slot. Return
the largest total profit.

Examples:
    max_profit([(4, 20), (1, 10), (1, 40), (1, 30)])  ->  60
    max_profit([(2, 100), (1, 19), (2, 27), (1, 25), (3, 15)])  ->  142
    max_profit([])  ->  0

(3 more hidden tests run when you check your work.)

Constraints:
- 0 ≤ len(jobs) ≤ 2000
- 1 ≤ deadline ≤ 2000, 1 ≤ profit ≤ 10^4

Target complexity: O(n²) time in the worst case, O(n) space

Check your work:   python dsa.py test gr-job-sequencing
Stuck?             python dsa.py hint gr-job-sequencing
"""


def max_profit(jobs):
    # your code here
    pass
