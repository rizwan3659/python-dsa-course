"""ll-reverse-k · Reverse Nodes in k-Group
Topic 9: Linked Lists · hard · Pointer Manipulation

Reverse every consecutive group of k nodes. A final group shorter than k
stays as it is.

`[1, 2, 3, 4, 5], k = 2` → `[2, 1, 4, 3, 5]`

Examples:
    to_list(reverse_k_group(build([1, 2, 3, 4, 5]), 2))  ->  [2, 1, 4, 3, 5]
    to_list(reverse_k_group(build([1, 2, 3, 4, 5]), 3))  ->  [3, 2, 1, 4, 5]
    to_list(reverse_k_group(build([1, 2]), 1))  ->  [1, 2]

(1 more hidden test run when you check your work.)

Constraints:
- 1 ≤ k ≤ number of nodes ≤ 5000

Target complexity: O(n) time, O(1) space

Check your work:   python dsa.py test ll-reverse-k
Stuck?             python dsa.py hint ll-reverse-k
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def reverse_k_group(head, k):
    pass
