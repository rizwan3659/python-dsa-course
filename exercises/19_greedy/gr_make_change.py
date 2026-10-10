"""gr-make-change · Make Change (canonical coins)
Topic 19: Greedy Algorithms · easy · Greedy

The coin system is canonical (like 1, 5, 10, 25), so taking the largest coin
that fits is optimal. Return the coins used, largest first. The coins may be
given in any order and always include 1.

Examples:
    make_change(63, [1, 5, 10, 25])  ->  [25, 25, 10, 1, 1, 1]
    make_change(0, [1, 5])  ->  []
    make_change(30, [1, 5, 10, 25])  ->  [25, 5]

(2 more hidden tests run when you check your work.)

Constraints:
- 0 ≤ amount ≤ 10^4
- 1 ≤ len(coins) ≤ 10, 1 is always present

Target complexity: O(k log k + number of coins used) time

Check your work:   python dsa.py test gr-make-change
Stuck?             python dsa.py hint gr-make-change
"""


def make_change(amount, coins):
    # your code here
    pass
