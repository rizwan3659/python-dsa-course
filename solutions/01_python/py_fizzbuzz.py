"""Reference solution · py-fizzbuzz · FizzBuzz

Complexity: O(n) time

Approach: Loop 1..n with if/elif in the right order.

Common mistakes:
- Checking % 3 before % 15, so 15 becomes "Fizz".
- Returning numbers instead of strings.

Follow-up challenge: Make the rules data-driven: a list of (divisor, word)
pairs so that adding "Bazz" for 7 needs no new if.
"""


def fizzbuzz(n):
    out = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            out.append("FizzBuzz")
        elif i % 3 == 0:
            out.append("Fizz")
        elif i % 5 == 0:
            out.append("Buzz")
        else:
            out.append(str(i))
    return out
