"""Reference solution · gr-boats · Boats to Save People

Complexity: O(n log n) time, O(n) space for the sorted copy

Approach: Sort and use two pointers: the heaviest person leaves every round,
taking the lightest along if possible.

Common mistakes:
- while i < j, which forgets the last single person.
- Trying to pair the two heaviest people.

Follow-up challenge: What changes if a boat can carry any number of people
up to the weight limit? (Hint: it becomes bin packing, which is NP-hard.)
"""


def num_boats(people, limit):
    people = sorted(people)
    i, j = 0, len(people) - 1
    boats = 0
    while i <= j:
        if people[i] + people[j] <= limit:   # lightest rides with the heaviest
            i += 1
        j -= 1                               # the heaviest always leaves
        boats += 1
    return boats
