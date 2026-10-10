"""Project 3: Customer Service Ticket Queue (reference implementation)."""
from collections import deque


class TicketQueue:
    def __init__(self):
        self.vip: deque[int] = deque()
        self.normal: deque[int] = deque()
        self.tickets: dict[int, dict] = {}       # waiting tickets only
        self.next_id = 1

    def open(self, customer: str, issue: str, vip: bool = False) -> int:
        ticket_id = self.next_id
        self.next_id += 1
        self.tickets[ticket_id] = {"id": ticket_id, "customer": customer, "issue": issue, "vip": vip}
        (self.vip if vip else self.normal).append(ticket_id)
        return ticket_id

    def _clean(self, lane: deque) -> None:
        # lazy deletion: cancelled ids stay in the deque until they reach the front
        while lane and lane[0] not in self.tickets:
            lane.popleft()

    def _lane(self) -> deque | None:
        self._clean(self.vip)
        if self.vip:
            return self.vip
        self._clean(self.normal)
        return self.normal if self.normal else None

    def next(self) -> dict | None:
        lane = self._lane()
        if lane is None:
            return None
        return self.tickets.pop(lane.popleft())

    def peek(self) -> dict | None:
        lane = self._lane()
        return None if lane is None else self.tickets[lane[0]]

    def __len__(self) -> int:
        return len(self.tickets)

    # ---- Milestone 3 ----
    def cancel(self, ticket_id: int) -> bool:
        return self.tickets.pop(ticket_id, None) is not None   # O(1)

    def _order(self) -> list[int]:
        return [t for t in list(self.vip) + list(self.normal) if t in self.tickets]

    def position(self, ticket_id: int) -> int | None:
        if ticket_id not in self.tickets:
            return None
        return self._order().index(ticket_id)

    def waiting_for(self, customer: str) -> list[int]:
        return sorted(t for t, info in self.tickets.items() if info["customer"] == customer)
