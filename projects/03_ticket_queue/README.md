# Project 3: Customer Service Ticket Queue

**Concepts:** queues (`collections.deque`), lazy deletion, dictionaries · **Topics:** 6, 8 · **Time:** 2 hours

A help desk serves customers in arrival order, except that VIP customers go first. Build the queue that agents pull from.

## Requirements

`TicketQueue()` with:

| Method | Behaviour |
|---|---|
| `open(customer, issue, vip=False)` | Create a ticket and return its id (1, 2, 3, …). |
| `next()` | Remove and return the next ticket as a dict `{"id", "customer", "issue", "vip"}`: the oldest VIP ticket if any, otherwise the oldest normal ticket. `None` if empty. |
| `peek()` | Like `next()` without removing. |
| `cancel(ticket_id)` | Cancel a waiting ticket. `True` if it was waiting. Must be O(1). |
| `__len__()` | Number of waiting tickets. |
| `position(ticket_id)` | How many tickets will be served before this one (0 = next), or `None` if not waiting. |
| `waiting_for(customer)` | Ids of the customer's waiting tickets, oldest first. |

## Milestones

1. FIFO `open`, `next`, `peek`, `len` without VIPs (`TestMilestone1`).
2. VIP lane (`TestMilestone2`).
3. `cancel` in O(1), `position`, `waiting_for` (`TestMilestone3`).

## Think about it

- Why is `list.pop(0)` a bad choice for a queue that holds 100,000 tickets?
- Removing a ticket from the middle of a deque is O(n). How can a set of cancelled ids make `cancel` O(1)? When are cancelled tickets finally thrown away?

## Extensions

- Add `escalate(ticket_id)` that moves a normal ticket to the VIP lane.
- Track the average waiting time (pass a clock value to `open` and `next`).
