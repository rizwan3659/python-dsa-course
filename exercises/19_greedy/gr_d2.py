"""gr-d2 · The last passenger is left behind
Topic 19: Greedy Algorithms · medium · Two Pointers · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    num_boats([3, 2, 2, 1], 3)  ->  3
    num_boats([5], 5)  ->  1
    num_boats([1, 2], 3)  ->  1

Check your work:   python dsa.py test gr-d2
Stuck?             python dsa.py hint gr-d2
"""


def num_boats(people, limit):
    people.sort()
    i, j = 0, len(people) - 1
    boats = 0
    while i < j:
        if people[i] + people[j] <= limit:
            i += 1
        j -= 1
        boats += 1
    return boats
