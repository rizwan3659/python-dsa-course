"""Reference solution · so-people · Sort People

Complexity: O(n log n)

Approach: sorted with a tuple key.

Common mistakes:
- Sorting twice in the wrong order (sort by name first, then by age, relies
  on stability).
- Sorting by name descending.

Follow-up challenge: Sort by age descending but names ascending.
"""


def sort_people(people):
    return sorted(people, key=lambda p: (p[1], p[0]))
