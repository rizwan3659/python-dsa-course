"""Reference solution · gr-truck-units · Maximum Units on a Truck

Complexity: O(n log n) time

Approach: Greedy by units per box: since all boxes have the same size, the
best boxes first is optimal.

Common mistakes:
- Sorting by count instead of units per box.
- Not stopping when the truck is full (taking negative amounts).

Follow-up challenge: Why does the same greedy fail if boxes have different
sizes?
"""


def max_units(box_types, truck_size):
    total = 0
    for count, units in sorted(box_types, key=lambda b: -b[1]):
        take = min(count, truck_size)
        total += take * units
        truck_size -= take
        if truck_size == 0:
            break
    return total
