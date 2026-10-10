"""Reference solution · rq-car-pooling · Car Pooling

Complexity: O(n + K) time where K = 1001 kilometres

Approach: Difference array over kilometres (a sweep line).

Common mistakes:
- Subtracting at end + 1: passengers leave AT km end.
- Checking only the starting points of trips.

Follow-up challenge: If kilometres go up to 10⁹, sort the 2n events instead
of using an array.
"""


def car_pooling(trips, capacity):
    change = [0] * 1001
    for people, start, end in trips:
        change[start] += people     # get in
        change[end] -= people       # get out (seat free again at km end)
    load = 0
    for c in change:
        load += c
        if load > capacity:
            return False
    return True
