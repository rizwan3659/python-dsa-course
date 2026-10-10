"""th-d1 · Perfect squares are "prime"
Topic 3: Algorithmic Thinking · easy · Math · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    is_prime(9)  ->  False
    is_prime(25)  ->  False
    is_prime(7)  ->  True
    is_prime(2)  ->  True

Check your work:   python dsa.py test th-d1
Stuck?             python dsa.py hint th-d1
"""


def is_prime(n):
    if n < 2:
        return False
    for d in range(2, int(n ** 0.5)):
        if n % d == 0:
            return False
    return True
