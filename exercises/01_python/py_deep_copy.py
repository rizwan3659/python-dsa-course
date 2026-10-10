"""py-deep-copy · Deep Copy Nested Lists
Topic 1: Python for DSA · medium · Recursion

Write `deep_copy(x)` for values built from lists and immutable values (ints,
strings, …), without the copy module. Every list in the result must be a new
list.

Examples:
    deep_copy([1, [2, [3]]])  ->  [1, [2, [3]]]
    (lambda a: (lambda b: b == a and b is not a and b[1] is not a[1] and b[1][1] is not a[1][1])(deep_copy(a)))([1, [2, [3]]])  ->  True
    deep_copy(5)  ->  5

(2 more hidden tests run when you check your work.)

Constraints:
- Nesting depth ≤ 100

Before this: py-e2

Target complexity: O(total number of elements)

Check your work:   python dsa.py test py-deep-copy
Stuck?             python dsa.py hint py-deep-copy
"""


def deep_copy(x):
    # your code here
    pass
