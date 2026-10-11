"""t-serialize · Serialize and Deserialize
Topic 13: Trees · hard · Design / Build

Write `serialize(root)` → string and `deserialize(s)` → tree, so that
deserialize(serialize(t)) rebuilds t exactly.

Examples:
    _round([1, 2, 3, None, None, 4, 5])  ->  [1, 2, 3, None, None, 4, 5]
    _round([])  ->  []
    _round([-1, 0, None, 7])  ->  [-1, 0, None, 7]

(1 more hidden test run when you check your work.)

Constraints:
- 0 ≤ number of nodes ≤ 10^4

Target complexity: O(n)

Check your work:   python dsa.py test t-serialize
Stuck?             python dsa.py hint t-serialize
"""

from dsa_course.preludes.tree import TreeNode, build_tree, deque, tree_to_list  # noqa: F401


def serialize(root):
    pass

def deserialize(s):
    pass
