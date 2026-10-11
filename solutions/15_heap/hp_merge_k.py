"""Reference solution · hp-merge-k · Merge K Sorted Linked Lists

Complexity: O(N log k)

Approach: Heap of list fronts.

Common mistakes:
- Pushing ListNode objects directly (they cannot be compared); push (val,
  index, node).
- Merging lists one by one: O(k · N).

Follow-up challenge: Merge k sorted Python lists lazily with a generator
(heapq.merge).
"""

from dsa_course.preludes.linked_list import ListNode, build, to_list  # noqa: F401


import heapq

def merge_k(lists):
    h = [(node.val, i, node) for i, node in enumerate(lists) if node]
    heapq.heapify(h)
    dummy = tail = ListNode()
    while h:
        val, i, node = heapq.heappop(h)     # i breaks ties (nodes are not comparable)
        tail.next = node
        tail = node
        if node.next:
            heapq.heappush(h, (node.next.val, i, node.next))
    return dummy.next
