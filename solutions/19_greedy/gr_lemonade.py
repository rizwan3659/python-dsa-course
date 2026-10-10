"""Reference solution · gr-lemonade · Lemonade Change

Complexity: O(n) time, O(1) space

Approach: Count bills; for $20 give $10 + $5 when possible because $5 bills
are more useful later.

Common mistakes:
- Spending three $5 bills when a $10 + $5 is available.
- Counting $20 bills as change.

Follow-up challenge: What if lemonade costs $10 and customers can pay with
$10, $20 or $50?
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
        elif tens and fives:       # $15 change: prefer $10 + $5, keep the flexible fives
            tens -= 1
            fives -= 1
        elif fives >= 3:
            fives -= 3
        else:
            return False
    return True
