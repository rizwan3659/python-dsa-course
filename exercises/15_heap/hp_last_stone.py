"""hp-last-stone · Last Stone Weight
Topic 15: Heap / Priority Queue · easy · Heap / Top-K

Repeatedly smash the two heaviest stones x ≤ y: if equal both vanish,
otherwise a stone of weight y − x remains. Return the last weight, or 0.

Examples:
    last_stone_weight([2, 7, 4, 1, 8, 1])  ->  1
    last_stone_weight([1])  ->  1
    last_stone_weight([2, 2])  ->  0

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ len(stones) ≤ 30

Target complexity: O(n log n)

Check your work:   python dsa.py test hp-last-stone
Stuck?             python dsa.py hint hp-last-stone
"""


import heapq

def last_stone_weight(stones):
    pass
