"""Reference solution · py-bank · BankAccount Class

Complexity: O(1) per operation

Approach: Attributes on self; methods read and update them.
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
