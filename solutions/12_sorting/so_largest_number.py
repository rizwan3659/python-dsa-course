"""Reference solution · so-largest-number · Largest Number

Complexity: O(n log n · L)

Approach: Custom comparator sort.
"""


from functools import cmp_to_key

def largest_number(nums):
    s = [str(x) for x in nums]
    s.sort(key=cmp_to_key(lambda a, b: (b + a > a + b) - (b + a < a + b)))
    result = "".join(s)
    return "0" if result[0] == "0" else result
