"""Helpers shared by exercises (generated from js/core.js PRELUDES.list)."""
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def build(values):
    """build([1, 2, 3]) -> head of 1 -> 2 -> 3"""
    dummy = ListNode()
    cur = dummy
    for v in values:
        cur.next = ListNode(v)
        cur = cur.next
    return dummy.next

def to_list(head, limit=10000):
    """to_list(head) -> [1, 2, 3]"""
    out = []
    while head is not None and len(out) < limit:
        out.append(head.val)
        head = head.next
    return out
