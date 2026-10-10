"""gr-min-refuel · Minimum Refueling Stops
Topic 19: Greedy Algorithms · hard · Heap / Top-K

A car starts at position 0 with `start_fuel` litres and uses one litre per
kilometre. `stations[i] = [position, fuel]`, sorted by position. Return the
fewest stops needed to reach `target`, or −1.

Examples:
    min_refuel_stops(1, 1, [])  ->  0
    min_refuel_stops(100, 1, [[10, 100]])  ->  -1
    min_refuel_stops(100, 10, [[10, 60], [20, 30], [30, 30], [60, 40]])  ->  2

(3 more hidden tests run when you check your work.)

Constraints:
- 1 ≤ target, start_fuel ≤ 10^9
- 0 ≤ len(stations) ≤ 500, 0 < position < target

Before this: gr-activity, hp-ropes

Target complexity: O(n log n) time, O(n) space

Check your work:   python dsa.py test gr-min-refuel
Stuck?             python dsa.py hint gr-min-refuel
"""


def min_refuel_stops(target, start_fuel, stations):
    # your code here
    pass
