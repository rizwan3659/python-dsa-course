"""pt-ipo · IPO (maximise capital)
Topic 23: Problem-Solving Patterns · hard · Heap / Top-K

You start with capital `w` and may finish at most `k` projects. Project i
needs `capital[i]` to start and adds `profits[i]` to your capital when done.
Return the largest final capital.

Examples:
    find_max_capital(2, 0, [1, 2, 3], [0, 1, 1])  ->  4
    find_max_capital(3, 0, [1, 2, 3], [0, 1, 2])  ->  6
    find_max_capital(1, 0, [1], [1])  ->  0

(3 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ k ≤ 10^5, 0 ≤ w ≤ 10^9
- 1 ≤ n ≤ 10^5, 0 ≤ profits[i] ≤ 10^4, 0 ≤ capital[i] ≤ 10^9

Before this: hp-meeting-rooms, gr-activity

Target complexity: O(n log n + k log n) time

Check your work:   python dsa.py test pt-ipo
Stuck?             python dsa.py hint pt-ipo
"""


def find_max_capital(k, w, profits, capital):
    # your code here
    pass
