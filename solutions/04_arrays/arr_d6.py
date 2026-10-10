"""Reference solution · arr-d6 · Second largest with duplicates
"""


def second_largest(nums):
    distinct = sorted(set(nums))
    return distinct[-2] if len(distinct) >= 2 else None
