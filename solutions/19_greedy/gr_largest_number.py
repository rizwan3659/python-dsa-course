"""Reference solution · gr-largest-number · Largest Number

Complexity: O(n log n · L) time where L is the number of digits

Approach: Sort the strings with a comparator on a + b versus b + a, then
join; handle all zeros.

Common mistakes:
- Returning "00" for [0, 0].
- Sorting strings in reverse order: "30" would come before "3".

Follow-up challenge: Prove the comparator is transitive (so sorting with it
is valid).
"""


from functools import cmp_to_key


def largest_number(nums):
    def compare(a, b):
        if a + b > b + a:
            return -1      # a goes first
        if a + b < b + a:
            return 1
        return 0

    parts = sorted(map(str, nums), key=cmp_to_key(compare))
    result = "".join(parts)
    return "0" if result[0] == "0" else result
