"""Reference solution · rq-flight-bookings · Flight Bookings

Complexity: O(n + b) time, O(n) space

Approach: Difference array with 1-based indexes.

Common mistakes:
- Mixing 0-based and 1-based flight numbers.
- Returning the difference array instead of the running sums.

Follow-up challenge: Answer "how many seats on flight k?" online while
bookings keep arriving (use a Fenwick tree with range-update, point-query).
"""


def flight_bookings(bookings, n):
    diff = [0] * (n + 2)                 # 1-based flights, plus room for last + 1
    for first, last, seats in bookings:
        diff[first] += seats
        diff[last + 1] -= seats
    result, run = [], 0
    for flight in range(1, n + 1):
        run += diff[flight]
        result.append(run)
    return result
