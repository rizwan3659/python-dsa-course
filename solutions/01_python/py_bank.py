"""Reference solution · py-bank · BankAccount Class

Complexity: O(1) per operation

Approach: Attributes on self; methods read and update them.

Common mistakes:
- Allowing the balance to go negative on withdraw.
- Storing the balance in a class variable shared by all accounts.

Follow-up challenge: Add a transaction history and a statement() method that
lists it.
"""


class BankAccount:
    def __init__(self, owner):
        self.owner = owner
        self.balance = 0

    def deposit(self, amount):
        self.balance += amount

    def withdraw(self, amount):
        if amount > self.balance:
            return False
        self.balance -= amount
        return True
