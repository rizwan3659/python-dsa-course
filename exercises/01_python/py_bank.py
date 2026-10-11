"""py-bank · BankAccount Class
Topic 1: Python for DSA · easy · Design / Build

Write a class `BankAccount`:

- `BankAccount(owner)` starts with `balance = 0`
- `deposit(amount)` adds to the balance
- `withdraw(amount)` subtracts and returns True, or returns False (and
  changes nothing) if there is not enough money

Examples:
    deposit(50) → balance 50
    withdraw more than the balance → False, balance unchanged
    deposit 40, withdraw 15 → True, balance 25

(1 more hidden test run when you check your work.)

Constraints:
- amounts are positive integers

Target complexity: O(1) per operation

Check your work:   python dsa.py test py-bank
Stuck?             python dsa.py hint py-bank
"""


class BankAccount:
    def __init__(self, owner):
        pass
