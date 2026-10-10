"""Reference solution · gr-candy · Candy

Complexity: O(n) time, O(n) space

Approach: Two greedy passes: left-to-right for left neighbours,
right-to-left for right neighbours, keeping the maximum.

Dry run:
    ratings     1  3  4  5  2
    left pass   1  2  3  4  1
    right pass  1  2  3  4  1   (only index 3 checks 5 > 2: max(4, 2) = 4)
    sum = 11

Common mistakes:
- A single pass, which cannot see a later lower neighbour.
- Overwriting the left-pass value instead of taking the max.
- Giving more candy for an equal rating (not required).

Follow-up challenge: Solve it in O(1) extra space by counting the lengths of
rising and falling runs.
"""


def candy(ratings):
    n = len(ratings)
    give = [1] * n
    for i in range(1, n):                  # left neighbour rule
        if ratings[i] > ratings[i - 1]:
            give[i] = give[i - 1] + 1
    for i in range(n - 2, -1, -1):         # right neighbour rule, keep the left result
        if ratings[i] > ratings[i + 1]:
            give[i] = max(give[i], give[i + 1] + 1)
    return sum(give)
