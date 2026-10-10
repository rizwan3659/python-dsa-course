"""dp-coin-change · Coin Change (fewest coins)
Topic 20: Dynamic Programming · medium · Memoization / DP

Return the fewest coins that add up to `amount`, using any number of each
coin. Return −1 if it is impossible.

Examples:
    coin_change([1, 2, 5], 11)  ->  3
    coin_change([2], 3)  ->  -1
    coin_change([1], 0)  ->  0

(3 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ len(coins) ≤ 12
- 1 ≤ coins[i] ≤ 2^31 − 1
- 0 ≤ amount ≤ 10^4

Before this: gr-make-change

Target complexity: O(amount · k) time, O(amount) space

Check your work:   python dsa.py test dp-coin-change
Stuck?             python dsa.py hint dp-coin-change
"""


def coin_change(coins, amount):
    # your code here
    pass
