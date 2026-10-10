"""Reference solution · ll-add-two · Add Two Numbers

Complexity: O(max(n, m))

Approach: Grade-school addition with a dummy head.
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


def add_two_numbers(a, b):
    dummy = tail = ListNode()
    carry = 0
    while a or b or carry:
        s = carry + (a.val if a else 0) + (b.val if b else 0)
        carry, digit = divmod(s, 10)
        tail.next = ListNode(digit)
        tail = tail.next
        a = a.next if a else None
        b = b.next if b else None
    return dummy.next
