"""ll-d4 · Cycle check crashes
Topic 8: Linked Lists · medium · Fast/Slow Pointers · debug

This code has a bug. The tests below describe what it should do. Run the
tests, find the bug and fix it.

Examples:
    has_cycle(build([1]))  ->  False
    has_cycle(build([1, 2, 3]))  ->  False
    has_cycle(build([]))  ->  False

Check your work:   python dsa.py test ll-d4
Stuck?             python dsa.py hint ll-d4
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def has_cycle(head):
    slow = fast = head
    while fast and fast.next.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False
