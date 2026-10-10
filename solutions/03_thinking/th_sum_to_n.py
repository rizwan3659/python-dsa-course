"""Reference solution · th-sum-to-n · Sum 1 to n in O(1)

Complexity: O(1) time, O(1) space

Approach: Gauss: n(n + 1) / 2, computed with integer division so the result
stays exact.

Common mistakes:
- Using `/`: `n * (n + 1) / 2` is a float and loses precision for huge n.
- Writing `n * n + 1 // 2`: operator precedence needs the brackets.

Follow-up challenge: Return the sum of the squares 1² + 2² + … + n² in O(1).
(Formula: n(n + 1)(2n + 1) / 6.)
"""


def sum_to_n(n):
    return n * (n + 1) // 2
