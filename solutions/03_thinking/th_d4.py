"""Reference solution · th-d4 · The digit sum that stops early
"""


def digit_sum(n):
    total = 0
    while n > 0:
        total += n % 10
        n //= 10
    return total
