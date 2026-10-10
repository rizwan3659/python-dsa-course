"""Project 3: Customer Service Ticket Queue. See README.md."""
from collections import deque  # noqa: F401  (you will want this)


class TicketQueue:
    def __init__(self):
        pass  # TODO: two deques (VIP, normal)? a dict of tickets by id?

    def open(self, customer, issue, vip=False):
        pass  # TODO: return the new id

    def next(self):
        pass  # TODO

    def peek(self):
        pass  # TODO

    def __len__(self):
        return 0  # TODO

    # ---- Milestone 3 ----
    def cancel(self, ticket_id):
        pass  # TODO: O(1)

    def position(self, ticket_id):
        pass  # TODO

    def waiting_for(self, customer):
        pass  # TODO
