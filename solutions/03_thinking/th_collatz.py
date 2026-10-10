"""Reference solution · th-collatz · Collatz Steps

Complexity: Unknown in general (an open problem!); fast in practice for these limits. O(1) space

Approach: Direct simulation with a while loop.

Common mistakes:
- Using n / 2, which makes n a float.
- Counting the starting number as a step.

Follow-up challenge: Find the n below 100,000 with the most steps. Cache
results in a dict so each chain reuses earlier answers.
"""


def collatz_steps(n):
    steps = 0
    while n != 1:
        n = n // 2 if n % 2 == 0 else 3 * n + 1
        steps += 1
    return steps
