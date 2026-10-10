"""dp-knapsack · 0/1 Knapsack
Topic 20: Dynamic Programming · medium · Memoization / DP

Each item has a value and a weight and can be taken at most once. Return the
largest total value with total weight ≤ `capacity`.

Examples:
    knapsack([60, 100, 120], [10, 20, 30], 50)  ->  220
    knapsack([60, 100, 120], [10, 20, 30], 0)  ->  0
    knapsack([10], [5], 4)  ->  0

(3 more hidden tests run when you check your work.)

Constraints:
- 0 ≤ n ≤ 100
- 1 ≤ weights[i] ≤ 1000, 0 ≤ values[i] ≤ 1000
- 0 ≤ capacity ≤ 10^4

Before this: gr-fractional

Target complexity: O(n · capacity) time, O(capacity) space

Check your work:   python dsa.py test dp-knapsack
Stuck?             python dsa.py hint dp-knapsack
"""


def knapsack(values, weights, capacity):
    # your code here
    pass
