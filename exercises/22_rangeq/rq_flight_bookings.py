"""rq-flight-bookings · Flight Bookings
Topic 22: Range Queries · medium · Prefix Sum

There are n flights numbered 1..n. Booking `[first, last, seats]` reserves
that many seats on every flight from first to last. Return the total seats
reserved on each flight.

Examples:
    flight_bookings([[1, 2, 10], [2, 3, 20], [2, 5, 25]], 5)  ->  [10, 55, 45, 25, 25]
    flight_bookings([[1, 2, 10], [2, 2, 15]], 2)  ->  [10, 25]
    flight_bookings([], 3)  ->  [0, 0, 0]

(2 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ n ≤ 2 × 10^4
- 1 ≤ len(bookings) ≤ 2 × 10^4, 1 ≤ first ≤ last ≤ n

Before this: rq-range-add

Target complexity: O(n + b) time, O(n) space

Check your work:   python dsa.py test rq-flight-bookings
Stuck?             python dsa.py hint rq-flight-bookings
"""


def flight_bookings(bookings, n):
    # your code here
    pass
