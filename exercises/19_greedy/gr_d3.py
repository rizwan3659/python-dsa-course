"""gr-d3 · Spending the wrong change
Topic 19: Greedy Algorithms · medium · Greedy · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    lemonade_change([5, 5, 5, 5, 10, 20, 10])  ->  True
    lemonade_change([5, 5, 10, 10, 20])  ->  False
    lemonade_change([5, 5, 5, 10, 20])  ->  True

Check your work:   python dsa.py test gr-d3
Stuck?             python dsa.py hint gr-d3
"""


def lemonade_change(bills):
    fives = tens = 0
    for b in bills:
        if b == 5:
            fives += 1
        elif b == 10:
            if fives == 0:
                return False
            fives -= 1
            tens += 1
        else:
            if fives >= 3:
                fives -= 3
            elif tens and fives:
                tens -= 1
                fives -= 1
            else:
                return False
    return True
