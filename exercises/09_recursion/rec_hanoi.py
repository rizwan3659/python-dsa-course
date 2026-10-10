"""rec-hanoi · Towers of Hanoi
Topic 9: Recursion & Backtracking · medium · Recursion

Return the list of moves `(from, to)` that moves n disks from peg "A" to peg
"C" using "B".

`hanoi(2)` → `[("A", "B"), ("A", "C"), ("B", "C")]`

Examples:
    hanoi(1)  ->  [("A", "C")]
    hanoi(2)  ->  [("A", "B"), ("A", "C"), ("B", "C")]
    len(hanoi(10))  ->  1023

Target complexity: O(2ⁿ) moves

Check your work:   python dsa.py test rec-hanoi
Stuck?             python dsa.py hint rec-hanoi
"""


def hanoi(n, src="A", dst="C", via="B"):
    pass
