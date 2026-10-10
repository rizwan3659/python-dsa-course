"""rq-car-pooling · Car Pooling
Topic 22: Range Queries · medium · Prefix Sum

Each trip is `[passengers, start, end]`: they get in at km start and out at
km end (so they are not in the car at km end). Can a car with `capacity`
seats do all trips?

Examples:
    car_pooling([[2, 1, 5], [3, 3, 7]], 4)  ->  False
    car_pooling([[2, 1, 5], [3, 3, 7]], 5)  ->  True
    car_pooling([[2, 1, 5], [3, 5, 7]], 3)  ->  True

(2 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ len(trips) ≤ 1000
- 1 ≤ passengers ≤ 100, 0 ≤ start < end ≤ 1000, 1 ≤ capacity ≤ 10^5

Before this: rq-range-add

Target complexity: O(n + K) time where K = 1001 kilometres

Check your work:   python dsa.py test rq-car-pooling
Stuck?             python dsa.py hint rq-car-pooling
"""


def car_pooling(trips, capacity):
    # your code here
    pass
