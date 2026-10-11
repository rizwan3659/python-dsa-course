/* Topic 9 · Linked lists. Coding questions get ListNode, build(values) and to_list(head) for free (prelude 'list'). */
(function(){
const H='<p class="small muted"><code>build([1, 2, 3])</code> makes 1 → 2 → 3 and returns its head; <code>to_list(head)</code> turns a list back into a Python list.</p>';
const CYC=`def make_cycle(values, pos):
    """build(values), then point the last node back at index pos (-1 = no cycle)."""
    head = build(values)
    if pos < 0 or head is None:
        return head
    nodes, cur = [], head
    while cur:
        nodes.append(cur)
        cur = cur.next
    nodes[-1].next = nodes[pos]
    return head
`;
COURSE.qs('linkedlist',[
{id:'ll-p1',type:'predict',d:1,p:'linked-list',title:'Following pointers',code:`class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next

c = Node(3)
b = Node(2, c)
a = Node(1, b)
print(a.next.next.val)`,a:'3',why:'a → b → c. Two hops from a reaches c.'},
{id:'ll-p2',type:'predict',d:1,p:'linked-list',prelude:'list',title:'Move the head',q:'What does this print?'+H,code:`head = build([1, 2, 3])
head = head.next
print(to_list(head))`,a:'[2, 3]',why:'head now refers to the second node. The first node is unreachable.'},
{id:'ll-p3',type:'predict',d:1,p:'linked-list',prelude:'list',title:'Skip a node',q:'What does this print?'+H,code:`head = build([1, 2, 3])
head.next = head.next.next
print(to_list(head))`,a:'[1, 3]',why:'Node 1 now points past node 2, which is effectively deleted: that is how deletion works.'},
{id:'ll-p4',type:'predict',d:1,p:'linked-list',prelude:'list',title:'Insert at the head',q:'What does this print?'+H,code:`head = build([2, 3])
head = ListNode(1, head)
print(to_list(head))`,a:'[1, 2, 3]',why:'The new node points at the old head, then becomes the head: O(1).'},
{id:'ll-p5',type:'predict',d:1,p:'linked-list',prelude:'list',title:'Count the nodes',q:'What does this print?'+H,code:`head = build([5, 6, 7, 8])
n = 0
cur = head
while cur:
    n += 1
    cur = cur.next
print(n)`,a:'4',why:'The standard traversal: walk until cur is None.'},
{id:'ll-p6',type:'predict',d:1,p:'linked-list',prelude:'list',title:'Walking with head itself',q:'What does this print?'+H,code:`head = build([1, 2, 3])
while head:
    head = head.next
print(head)`,opts:['3','None','[1, 2, 3]','Error'],a:1,why:'After the loop head is None, and the list can no longer be reached through it. Traverse with a separate variable (cur) when you still need head.'},
{id:'ll-p7',type:'predict',d:2,p:'fast-slow',prelude:'list',title:'A node pointing at itself',q:'What does this print?'+H,code:`a = ListNode(1)
a.next = a
print(a.next.next.next.val)`,a:'1',why:'A one-node cycle: following next forever stays on the same node. Traversing it with while cur: would never end.'},
{id:'ll-p8',type:'predict',d:2,p:'linked-list',prelude:'list',title:'One step of reversal',q:'What does this print?'+H,code:`prev = None
cur = build([1, 2, 3])
nxt = cur.next
cur.next = prev
print(cur.val, cur.next, nxt.val)`,a:'1 None 2',why:'nxt was saved before the link was cut. Without it, the rest of the list (2 → 3) would be lost.'},
{id:'ll-p9',type:'predict',d:2,p:'fast-slow',prelude:'list',title:'Fast and slow',q:'What does this print?'+H,code:`slow = fast = build([1, 2, 3, 4])
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
print(slow.val)`,a:'3',why:'For an even length, slow stops at the second of the two middle nodes.'},
{id:'ll-p10',type:'predict',d:1,p:'linked-list',prelude:'list',title:'Two names, one node',q:'What does this print?'+H,code:`a = build([1, 2])
b = a
b.val = 9
print(a.val)`,a:'9',why:'a and b refer to the same node object.'},
{id:'ll-c1',type:'complexity',d:1,p:'linked-list',title:'Insert at the head',code:`head = ListNode(x, head)`,a:'O(1)',why:'One new node and one pointer change, whatever the length.'},
{id:'ll-c2',type:'complexity',d:1,p:'linked-list',title:'Get the i-th node',code:`cur = head
for _ in range(i):
    cur = cur.next`,a:'O(n)',why:'No indexing: you must walk i steps. Arrays win here with O(1).'},
{id:'ll-c3',type:'complexity',d:1,p:'linked-list',title:'Append without a tail pointer',code:`cur = head
while cur.next:
    cur = cur.next
cur.next = ListNode(x)`,a:'O(n)',why:'You must walk to the end first. Keeping a tail pointer makes it O(1).'},
{id:'ll-c4',type:'complexity',d:2,p:'linked-list',title:'Building by appending',q:'Build a list of n values by calling the append-without-tail code above for each value. Total time?',code:`head = ListNode(values[0])
for x in values[1:]:
    cur = head
    while cur.next:
        cur = cur.next
    cur.next = ListNode(x)`,a:'O(n²)',why:'1 + 2 + … + n steps. Keep a tail variable (or a dummy node and a moving tail) for O(n).'},
{id:'ll-c5',type:'complexity',d:1,p:'linked-list',title:'Reverse',code:`prev, cur = None, head
while cur:
    cur.next, prev, cur = prev, cur, cur.next`,a:'O(n)',why:'Each node is visited once; only three extra variables: O(1) space.'},
{id:'ll-c6',type:'complexity',d:2,p:'linked-list',title:'Delete after a known node',code:`prev.next = prev.next.next`,a:'O(1)',why:'If you already hold the previous node, deletion is one pointer change. Finding it is what costs O(n).'},
{id:'ll-m1',type:'mcq',d:1,p:'linked-list',title:'Array vs linked list',q:'Which is true?',opts:['Linked lists give O(1) access to the i-th element','Arrays give O(1) access by index; linked lists give O(1) insert/delete once you hold the node','Both are identical in cost','Linked lists use less memory per element'],a:1,why:'Linked lists also use MORE memory: every node stores a pointer.'},
{id:'ll-m2',type:'mcq',d:1,p:'linked-list',title:'Why a dummy node?',q:'Why put a dummy node before the head?',opts:['It makes the list faster','Deleting or inserting at the head then works exactly like anywhere else: no special case','Python requires it','It stores the length'],a:1,why:'Return dummy.next at the end: it is the (possibly new) head.'},
{id:'ll-m3',type:'mcq',d:2,p:'fast-slow',title:'Why do they meet?',q:'In a cycle, why must the fast pointer (2 steps) eventually land on the slow pointer (1 step)?',opts:['They start at the same node','Each step, fast gains exactly one node on slow, so the gap shrinks by 1 until it is 0','fast checks every node','Python detects the cycle'],a:1,why:'It can never jump over slow, because the gap closes one at a time.'},
{id:'ll-m4',type:'mcq',d:1,p:'linked-list',title:'Doubly linked',q:'What does a doubly linked list add?',opts:['A second value per node','A prev pointer, so you can walk backwards and delete a node in O(1) given only that node','Random access','Sorting'],a:1,why:'Costs one more pointer per node.'},
{id:'ll-m5',type:'mcq',d:1,p:'linked-list',title:'Save next first',q:'When reversing, why do we save <code>nxt = cur.next</code> before <code>cur.next = prev</code>?',opts:['For speed','Because after changing cur.next we would lose the only reference to the rest of the list','To count nodes','It is optional'],a:1,why:'Overwrite a pointer only after you have saved what it pointed to.'},
{id:'ll-ch1',type:'choose',d:2,p:'design',title:'LRU cache',q:'You need O(1) lookup by key AND O(1) “move this item to the front” and “remove the oldest”.',opts:['A list','A dict + a doubly linked list','A heap','A sorted list'],a:1,why:'The dict finds the node; the doubly linked list moves and removes it in O(1).'},
{id:'ll-ch2',type:'choose',d:1,p:'linked-list',title:'Access by position',q:'You frequently need the element at position i.',opts:['Python list','Linked list','Stack','Queue'],a:0,why:'O(1) by index versus O(n) walking.'},
{id:'ll-dr1',type:'dryrun',d:2,p:'linked-list',prelude:'list',title:'Reversal, step by step',code:`head = build([1, 2, 3])
prev, cur = None, head
while cur:
    nxt = cur.next
    cur.next = prev
    prev = cur
    cur = nxt`,cols:['to_list(prev)','to_list(cur)'],rows:[['[1]','[2, 3]'],['[2, 1]','[3]'],['[3, 2, 1]','[]']],why:'prev is the reversed part so far; cur is the part still to process.'},
{id:'ll-dr2',type:'dryrun',d:1,p:'fast-slow',prelude:'list',title:'Fast and slow on five nodes',code:`slow = fast = build([1, 2, 3, 4, 5])
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next`,cols:['slow.val','fast.val'],rows:[['2','3'],['3','5']],why:'fast reaches the last node, so slow sits at the middle (3).'},
{id:'ll-dr3',type:'dryrun',d:1,p:'linked-list',prelude:'list',title:'Sum the list',code:`cur = build([4, 1, 7])
total = 0
while cur:
    total += cur.val
    cur = cur.next`,cols:['total','to_list(cur)'],rows:[['4','[1, 7]'],['5','[7]'],['12','[]']],why:'Add, then step to the next node until cur is None.'},
{id:'ll-b1',type:'blanks',d:1,p:'linked-list',prelude:'list',title:'Complete reverse_list',code:`def reverse_list(head):
    prev, cur = None, head
    while cur:
        nxt = ______
        cur.next = ______
        prev = cur
        cur = ______
    return prev`,blanks:[['cur.next'],['prev'],['nxt']],tests:[['to_list(reverse_list(build([1, 2, 3])))','[3, 2, 1]'],['to_list(reverse_list(build([])))','[]']],why:'Save next, point back, advance both.'},
{id:'ll-b2',type:'blanks',d:1,p:'fast-slow',prelude:'list',title:'Complete middle_node',code:`def middle_node(head):
    slow = fast = head
    while ______:
        slow = slow.next
        fast = ______
    return slow`,blanks:[['fast and fast.next','fast is not None and fast.next is not None'],['fast.next.next']],tests:[['middle_node(build([1, 2, 3, 4, 5])).val','3'],['middle_node(build([1, 2, 3, 4])).val','3'],['middle_node(build([7])).val','7']],why:'Stop when fast cannot take two steps.'},
{id:'ll-b3',type:'blanks',d:2,p:'linked-list',prelude:'list',title:'Complete delete with a dummy node',code:`def delete_value(head, x):
    dummy = ______
    prev = dummy
    while prev.next:
        if prev.next.val == x:
            prev.next = ______
            break
        prev = prev.next
    return ______`,blanks:[['ListNode(0, head)'],['prev.next.next'],['dummy.next']],tests:[['to_list(delete_value(build([1, 2, 3]), 1))','[2, 3]'],['to_list(delete_value(build([1, 2, 3]), 3))','[1, 2]'],['to_list(delete_value(build([]), 3))','[]']],why:'The dummy node lets the head be deleted like any other node.'},
{id:'ll-d1',type:'debug',d:1,p:'linked-list',prelude:'list',title:'Reversal loses the rest',code:`def reverse_list(head):
    prev, cur = None, head
    while cur:
        cur.next = prev
        prev = cur
        cur = cur.next
    return prev`,opts:['prev should start at head','cur.next was overwritten before it was saved, so cur = cur.next jumps to prev (None) and the rest is lost','The loop should be while cur.next','return should be cur'],a:1,why:'reverse_list(build([1, 2, 3])) returns just [1]. Save <code>nxt = cur.next</code> first.',fix:`def reverse_list(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev`,tests:[['to_list(reverse_list(build([1, 2, 3])))','[3, 2, 1]']]},
{id:'ll-d2',type:'debug',d:1,p:'linked-list',prelude:'list',title:'The last node is ignored',code:`def total(head):
    s = 0
    cur = head
    while cur.next:
        s += cur.val
        cur = cur.next
    return s`,opts:['s should start at 1','while cur.next stops before adding the last node (and crashes on an empty list)','cur should be head.next','It should be recursive'],a:1,why:'Loop with <code>while cur:</code> to visit every node.',fix:`def total(head):
    s = 0
    cur = head
    while cur:
        s += cur.val
        cur = cur.next
    return s`,tests:[['total(build([1, 2, 3]))','6'],['total(build([]))','0']]},
{id:'ll-d3',type:'debug',d:2,p:'linked-list',prelude:'list',title:'Cannot delete the head',code:`def delete_value(head, x):
    cur = head
    while cur.next:
        if cur.next.val == x:
            cur.next = cur.next.next
            return head
        cur = cur.next
    return head`,opts:['It deletes every occurrence','It only ever checks cur.next, so the head itself is never deleted (and an empty list crashes)','return head should be return cur','It needs a while True'],a:1,why:'Start from a dummy node pointing at head.',fix:`def delete_value(head, x):
    dummy = ListNode(0, head)
    cur = dummy
    while cur.next:
        if cur.next.val == x:
            cur.next = cur.next.next
            break
        cur = cur.next
    return dummy.next`,tests:[['to_list(delete_value(build([5, 6]), 5))','[6]'],['to_list(delete_value(build([]), 5))','[]'],['to_list(delete_value(build([5, 6]), 6))','[5]']]},
{id:'ll-d4',type:'debug',d:2,p:'fast-slow',prelude:'list',title:'Cycle check crashes',code:`def has_cycle(head):
    slow = fast = head
    while fast and fast.next.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,opts:['slow should move two steps','When fast.next is None, fast.next.next raises AttributeError','It should compare with ==','The return values are swapped'],a:1,why:'Check <code>fast and fast.next</code>: every pointer you dereference must be checked first.',fix:`def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,tests:[['has_cycle(build([1]))','False'],['has_cycle(build([1, 2, 3]))','False'],['has_cycle(build([]))','False']]},
{id:'ll-d5',type:'debug',d:1,p:'linked-list',prelude:'list',title:'Merge drops the tail',code:`def merge(a, b):
    dummy = tail = ListNode()
    while a and b:
        if a.val <= b.val:
            tail.next, a = a, a.next
        else:
            tail.next, b = b, b.next
        tail = tail.next
    return dummy.next`,opts:['<= should be <','When one list runs out, the rest of the other is never attached','dummy should be None','tail should not move'],a:1,why:'Add <code>tail.next = a or b</code> after the loop.',fix:`def merge(a, b):
    dummy = tail = ListNode()
    while a and b:
        if a.val <= b.val:
            tail.next, a = a, a.next
        else:
            tail.next, b = b, b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next`,tests:[['to_list(merge(build([1, 4]), build([2, 3, 9])))','[1, 2, 3, 4, 9]']]},

/* ---------- code ---------- */
{id:'ll-length',type:'code',d:1,p:'linked-list',prelude:'list',title:'Length of a Linked List',prompt:'<p>Return the number of nodes.</p>',starter:`def length(head):
    pass`,solution:`def length(head):
    n = 0
    while head:
        n += 1
        head = head.next
    return n`,tests:[['length(build([1, 2, 3]))','3'],['length(build([]))','0'],['length(build([7]))','1'],['length(build(list(range(1000))))','1000']],constraints:['0 ≤ number of nodes ≤ 10<sup>4</sup>'],mistakes:['Starting the count at 1 and returning 1 for an empty list.','Moving head itself is fine in Python, but losing it matters if you need it later.'],followup:'Write it recursively. What happens for 10,000 nodes?',hints:['Walk until None, counting.','Walk with cur = cur.next until cur is None, counting the nodes.'],approach:'Traversal.',cx:'O(n)'},
{id:'ll-kth',type:'code',d:1,p:'linked-list',prelude:'list',title:'Value at Index k',prompt:'<p>Return the value of the node at index k (0-based), or None if the list is too short.</p>',starter:`def get_kth(head, k):
    pass`,solution:`def get_kth(head, k):
    cur = head
    for _ in range(k):
        if cur is None:
            return None
        cur = cur.next
    return cur.val if cur else None`,tests:[['get_kth(build([5, 6, 7]), 0)','5'],['get_kth(build([5, 6, 7]), 2)','7'],['get_kth(build([5, 6, 7]), 3)','None'],['get_kth(build([]), 0)','None']],constraints:['0 ≤ number of nodes ≤ 10<sup>4</sup>','0 ≤ k'],mistakes:['Following .next past the end and crashing on None.','Off-by-one: index 0 is the head itself.'],followup:'Return the k-th node from the end in one pass.',hints:['Walk k steps, checking for None.','Step k times, stopping early if you reach None.'],approach:'Walk k steps.',cx:'O(k)'},
{id:'ll-reverse',type:'code',d:1,p:'linked-list',prelude:'list',title:'Reverse Linked List',prompt:'<p>Reverse the list and return the new head. Use O(1) extra space.</p>',starter:`def reverse_list(head):
    pass`,solution:`def reverse_list(head):
    prev, cur = None, head
    while cur:
        nxt = cur.next
        cur.next = prev
        prev = cur
        cur = nxt
    return prev`,tests:[['to_list(reverse_list(build([1, 2, 3, 4, 5])))','[5, 4, 3, 2, 1]'],['to_list(reverse_list(build([1, 2])))','[2, 1]'],['to_list(reverse_list(build([])))','[]'],['to_list(reverse_list(build([9])))','[9]']],constraints:['0 ≤ number of nodes ≤ 5000'],mistakes:['Overwriting cur.next before saving it, which loses the rest of the list.','Returning the old head instead of prev.'],followup:'Write it recursively, then reverse only positions left..right (ll-reverse-between).',hints:['Three variables: prev, cur, and the saved next.','Point cur back at prev, then move both forward.'],approach:'Iterative pointer reversal.',cx:'O(n) time, O(1) space'},
{id:'ll-middle',type:'code',d:1,p:'fast-slow',prelude:'list',title:'Middle of the Linked List',prompt:'<p>Return the middle node (the second middle for even lengths), in one pass.</p>',starter:`def middle_node(head):
    pass`,solution:`def middle_node(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    return slow`,tests:[['to_list(middle_node(build([1, 2, 3, 4, 5])))','[3, 4, 5]'],['to_list(middle_node(build([1, 2, 3, 4, 5, 6])))','[4, 5, 6]'],['to_list(middle_node(build([1])))','[1]'],['to_list(middle_node(build([1, 2])))','[2]']],constraints:['1 ≤ number of nodes ≤ 100'],mistakes:['Counting first and walking again: correct but two passes.','Returning the first middle for even lengths.'],followup:'Delete the middle node instead of returning it.',hints:['Counting then walking half takes two passes.','One pass: fast moves 2, slow moves 1.'],approach:'Fast/slow pointers.',cx:'O(n) time, O(1) space'},
{id:'ll-has-cycle',type:'code',d:1,p:'fast-slow',prelude:'list',post:CYC,title:'Linked List Cycle',prompt:'<p>Return True if the list has a cycle. Aim for O(1) extra space.</p>',starter:`def has_cycle(head):
    pass`,solution:`def has_cycle(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            return True
    return False`,tests:[['has_cycle(make_cycle([3, 2, 0, -4], 1))','True','','3 → 2 → 0 → −4 → back to 2'],['has_cycle(make_cycle([1, 2], 0))','True','','1 → 2 → back to 1'],['has_cycle(make_cycle([1], -1))','False','','single node, no cycle'],['has_cycle(make_cycle([], -1))','False','','empty list']],constraints:['0 ≤ number of nodes ≤ 10<sup>4</sup>'],mistakes:['Comparing values instead of nodes (two nodes can hold equal values).','Not checking fast.next before moving two steps.'],followup:'Return the length of the cycle.',hints:['A set of visited nodes works, with O(n) space.','O(1) space: two pointers at different speeds meet if and only if there is a cycle.'],approach:"Floyd's tortoise and hare.",cx:'O(n) time, O(1) space'},
{id:'ll-merge',type:'code',d:1,p:'linked-list',prelude:'list',title:'Merge Two Sorted Lists',prompt:'<p>Merge two sorted linked lists into one sorted list by relinking the nodes. Return its head.</p>',starter:`def merge_two(a, b):
    pass`,solution:`def merge_two(a, b):
    dummy = tail = ListNode()
    while a and b:
        if a.val <= b.val:
            tail.next, a = a, a.next
        else:
            tail.next, b = b, b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next`,tests:[['to_list(merge_two(build([1, 2, 4]), build([1, 3, 4])))','[1, 1, 2, 3, 4, 4]'],['to_list(merge_two(build([]), build([0])))','[0]'],['to_list(merge_two(build([]), build([])))','[]'],['to_list(merge_two(build([5]), build([1, 2, 3])))','[1, 2, 3, 5]']],constraints:['0 ≤ nodes in each list ≤ 50'],mistakes:['Forgetting to attach the leftover nodes of the longer list.','Creating new nodes instead of relinking existing ones.'],followup:'Merge k sorted lists (hp-merge-k).',hints:['A dummy node avoids special-casing the first node of the result.','Attach the smaller front node to the tail; at the end, attach whatever remains.'],approach:'Dummy head + tail pointer.',cx:'O(n + m) time, O(1) space'},
{id:'ll-remove-elements',type:'code',d:1,p:'linked-list',prelude:'list',title:'Remove All Occurrences',prompt:'<p>Remove every node whose value equals <code>x</code>; return the new head.</p>',starter:`def remove_elements(head, x):
    pass`,solution:`def remove_elements(head, x):
    dummy = ListNode(0, head)
    cur = dummy
    while cur.next:
        if cur.next.val == x:
            cur.next = cur.next.next        # do not advance: check the new next
        else:
            cur = cur.next
    return dummy.next`,tests:[['to_list(remove_elements(build([1, 2, 6, 3, 4, 5, 6]), 6))','[1, 2, 3, 4, 5]'],['to_list(remove_elements(build([7, 7, 7, 7]), 7))','[]'],['to_list(remove_elements(build([]), 1))','[]'],['to_list(remove_elements(build([1, 2, 3]), 4))','[1, 2, 3]']],constraints:['0 ≤ number of nodes ≤ 10<sup>4</sup>'],mistakes:['Special-casing the head and forgetting runs of matches at the start.','Advancing prev after a deletion, which skips the next node.'],followup:'Remove every node whose value appears more than once (keep none of them).',hints:['Use a dummy node.','After removing, stay put: the new cur.next might also match.'],approach:'Dummy node; only advance when you keep the next node.',cx:'O(n)'},
{id:'ll-dedupe-sorted',type:'code',d:1,p:'linked-list',prelude:'list',title:'Remove Duplicates from Sorted List',prompt:'<p>The list is sorted. Delete duplicates so each value appears once.</p>',starter:`def delete_duplicates(head):
    pass`,solution:`def delete_duplicates(head):
    cur = head
    while cur and cur.next:
        if cur.next.val == cur.val:
            cur.next = cur.next.next
        else:
            cur = cur.next
    return head`,tests:[['to_list(delete_duplicates(build([1, 1, 2, 3, 3])))','[1, 2, 3]'],['to_list(delete_duplicates(build([1, 1, 1])))','[1]'],['to_list(delete_duplicates(build([])))','[]'],['to_list(delete_duplicates(build([1, 2, 3])))','[1, 2, 3]']],constraints:['0 ≤ number of nodes ≤ 300','the list is sorted'],mistakes:['Advancing cur after removing a duplicate, which misses a third copy.','Using a set: correct, but ignores that the list is sorted.'],followup:'The list is not sorted: remove duplicates with a set in one pass.',hints:['Duplicates are neighbours.','While cur.next has the same value as cur, skip it with cur.next = cur.next.next.'],approach:'Skip next nodes equal to the current one.',cx:'O(n)'},
{id:'ll-palindrome',type:'code',d:2,p:'fast-slow',prelude:'list',title:'Palindrome Linked List',prompt:'<p>Return True if the values read the same forwards and backwards. Bonus: O(1) extra space.</p>',starter:`def is_palindrome(head):
    pass`,solution:`def is_palindrome(head):
    slow = fast = head
    while fast and fast.next:            # find the middle
        slow = slow.next
        fast = fast.next.next
    prev = None
    while slow:                          # reverse the second half
        slow.next, prev, slow = prev, slow, slow.next
    left, right = head, prev
    while right:                         # compare the halves
        if left.val != right.val:
            return False
        left, right = left.next, right.next
    return True`,tests:[['is_palindrome(build([1, 2, 2, 1]))','True'],['is_palindrome(build([1, 2]))','False'],['is_palindrome(build([]))','True'],['is_palindrome(build([1, 2, 3, 2, 1]))','True'],['is_palindrome(build([1, 2, 3, 1]))','False']],constraints:['0 ≤ number of nodes ≤ 10<sup>5</sup>'],mistakes:['Reversing the whole list and comparing it with itself (they are the same nodes).','Not restoring the list after reversing its second half.'],followup:'Restore the list to its original order before returning.',hints:['Easy version: copy the values to a Python list and compare with its reverse (O(n) space).','O(1) space: find the middle with fast/slow, reverse the second half, compare.'],approach:'Middle (fast/slow) + reverse second half + compare.',cx:'O(n) time, O(1) space'},
{id:'ll-intersection',type:'code',d:1,p:'two-pointers',prelude:'list',title:'Intersection of Two Linked Lists',prompt:'<p>Two lists may merge into a shared tail. Return the first shared <b>node</b> (compare nodes with <code>is</code>, not values), or None.</p>',starter:`def get_intersection(a, b):
    pass`,solution:`def get_intersection(a, b):
    p, q = a, b
    while p is not q:
        p = p.next if p else b      # after finishing a, walk b
        q = q.next if q else a      # after finishing b, walk a
    return p`,post:`def _inter(a, b, common):
    c = build(common)
    def attach(h):
        if h is None:
            return c
        cur = h
        while cur.next:
            cur = cur.next
        cur.next = c
        return h
    return get_intersection(attach(build(a)), attach(build(b))) is c`,tests:[['_inter([4, 1], [5, 6, 1], [8, 4, 5])','True','','4 → 1 ↘ and 5 → 6 → 1 ↘ meet at 8 → 4 → 5'],['_inter([1, 9, 1], [3], [2, 4])','True','','different lengths'],['_inter([2, 6, 4], [1, 5], [])','True','','no intersection → None'],['_inter([], [], [7])','True','','both lists are just the shared part']],constraints:['0 ≤ nodes in each list ≤ 3 × 10<sup>4</sup>'],mistakes:['Comparing values instead of node identity.','Assuming the lists have the same length.'],followup:'Find it in O(1) extra space by switching heads when a pointer reaches the end.',hints:['A set of nodes from list a works in O(n) space.','O(1) space: two pointers; when one reaches the end, restart it on the OTHER list. Both travel len(a) + len(b) and meet at the junction.'],approach:'Two pointers that switch lists equalise the path lengths.',cx:'O(n + m) time, O(1) space'},
{id:'ll-remove-nth',type:'code',d:2,p:'two-pointers',prelude:'list',title:'Remove Nth Node From End',prompt:'<p>Remove the n-th node from the end (n ≥ 1, always valid) in one pass.</p>',starter:`def remove_nth_from_end(head, n):
    pass`,solution:`def remove_nth_from_end(head, n):
    dummy = ListNode(0, head)
    fast = slow = dummy
    for _ in range(n):           # fast leads by n nodes
        fast = fast.next
    while fast.next:
        fast = fast.next
        slow = slow.next
    slow.next = slow.next.next   # slow is just before the target
    return dummy.next`,tests:[['to_list(remove_nth_from_end(build([1, 2, 3, 4, 5]), 2))','[1, 2, 3, 5]'],['to_list(remove_nth_from_end(build([1]), 1))','[]'],['to_list(remove_nth_from_end(build([1, 2]), 1))','[1]'],['to_list(remove_nth_from_end(build([1, 2]), 2))','[2]']],constraints:['1 ≤ n ≤ number of nodes ≤ 30'],mistakes:['Failing when the head itself is removed (use a dummy node).','Starting the gap between the pointers at n − 1 or n + 1.'],followup:'Remove the n-th node from the end of a doubly linked list.',hints:['Two passes: count, then walk to length − n.','One pass: give one pointer an n-node head start; when it hits the end, the other is just before the target. Use a dummy node.'],approach:'Gap of n between two pointers, starting from a dummy.',cx:'O(n) time, O(1) space'},
{id:'ll-cycle-start',type:'code',d:2,p:'fast-slow',prelude:'list',post:CYC,title:'Linked List Cycle II (start of the cycle)',prompt:'<p>Return the node where the cycle begins, or None. O(1) extra space.</p>',starter:`def cycle_start(head):
    pass`,solution:`def cycle_start(head):
    slow = fast = head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow is fast:
            p = head                     # restart one pointer from head
            while p is not slow:
                p = p.next
                slow = slow.next
            return p
    return None`,tests:[['cycle_start(make_cycle([3, 2, 0, -4], 1)).val','2'],['cycle_start(make_cycle([1, 2], 0)).val','1'],['cycle_start(make_cycle([1], -1))','None'],['cycle_start(make_cycle([1, 2, 3, 4, 5, 6], 3)).val','4']],constraints:['0 ≤ number of nodes ≤ 10<sup>4</sup>'],mistakes:['Restarting both pointers from the head after they meet (only one should restart).','Returning the meeting point, which is not the cycle start in general.'],followup:'Prove why the second phase lands on the cycle start.',hints:['First detect the meeting point with fast/slow.','Then move one pointer back to head; advance both one step at a time. They meet at the cycle start.'],approach:"Floyd's algorithm, phase two: distance from head to the start equals distance from the meeting point to the start (mod cycle length).",cx:'O(n) time, O(1) space'},
{id:'ll-odd-even',type:'code',d:2,p:'linked-list',prelude:'list',title:'Odd Even Linked List',prompt:'<p>Group nodes at odd positions (1st, 3rd, …) followed by those at even positions, keeping relative order. O(1) extra space.</p>',starter:`def odd_even(head):
    pass`,solution:`def odd_even(head):
    if not head:
        return head
    odd, even = head, head.next
    even_head = even
    while even and even.next:
        odd.next = even.next
        odd = odd.next
        even.next = odd.next
        even = even.next
    odd.next = even_head
    return head`,tests:[['to_list(odd_even(build([1, 2, 3, 4, 5])))','[1, 3, 5, 2, 4]'],['to_list(odd_even(build([2, 1, 3, 5, 6, 4, 7])))','[2, 3, 6, 7, 1, 5, 4]'],['to_list(odd_even(build([])))','[]'],['to_list(odd_even(build([1, 2])))','[1, 2]']],constraints:['0 ≤ number of nodes ≤ 10<sup>4</sup>','O(1) extra space'],mistakes:['Grouping by odd or even values instead of positions.','Not ending the even list, which creates a cycle.'],followup:'Split the list into k groups by position modulo k.',hints:['Weave two chains (odd and even) in one pass, then connect odd’s end to even’s start.','Keep two chains (odd and even positions) and link the end of the odd chain to the start of the even chain.'],approach:'Two interleaved pointers.',cx:'O(n) time, O(1) space'},
{id:'ll-add-two',type:'code',d:2,p:'linked-list',prelude:'list',title:'Add Two Numbers',prompt:'<p>Two numbers are stored as digit lists in <b>reverse</b> order (2 → 4 → 3 is 342). Return their sum the same way.</p>',starter:`def add_two_numbers(a, b):
    pass`,solution:`def add_two_numbers(a, b):
    dummy = tail = ListNode()
    carry = 0
    while a or b or carry:
        s = carry + (a.val if a else 0) + (b.val if b else 0)
        carry, digit = divmod(s, 10)
        tail.next = ListNode(digit)
        tail = tail.next
        a = a.next if a else None
        b = b.next if b else None
    return dummy.next`,tests:[['to_list(add_two_numbers(build([2, 4, 3]), build([5, 6, 4])))','[7, 0, 8]'],['to_list(add_two_numbers(build([0]), build([0])))','[0]'],['to_list(add_two_numbers(build([9, 9, 9, 9, 9, 9, 9]), build([9, 9, 9, 9])))','[8, 9, 9, 9, 0, 0, 0, 1]'],['to_list(add_two_numbers(build([5]), build([5])))','[0, 1]']],constraints:['1 ≤ nodes in each list ≤ 100','no leading zeros except 0 itself'],mistakes:['Forgetting the final carry ([9, 9] + [1] needs a new node).','Stopping when one list ends.'],followup:'The digits are stored most significant first: add them without reversing the lists.',hints:['Add digit by digit like on paper, keeping a carry.','Keep going while either list has digits OR there is a carry.'],approach:'Grade-school addition with a dummy head.',cx:'O(max(n, m))'},
{id:'ll-reorder',type:'code',d:2,p:'fast-slow',prelude:'list',title:'Reorder List',prompt:'<p>Reorder L0 → L1 → … → Ln into L0 → Ln → L1 → Ln−1 → …, in place (return nothing).</p>',starter:`def reorder_list(head):
    pass`,solution:`def reorder_list(head):
    if not head:
        return
    slow = fast = head
    while fast.next and fast.next.next:      # middle (first of two)
        slow = slow.next
        fast = fast.next.next
    prev, cur = None, slow.next               # reverse the second half
    slow.next = None
    while cur:
        cur.next, prev, cur = prev, cur, cur.next
    a, b = head, prev                         # weave
    while b:
        a_next, b_next = a.next, b.next
        a.next, b.next = b, a_next
        a, b = a_next, b_next`,post:`def _check(vals):
    h = build(vals)
    reorder_list(h)
    return to_list(h)`,tests:[['_check([1, 2, 3, 4])','[1, 4, 2, 3]'],['_check([1, 2, 3, 4, 5])','[1, 5, 2, 4, 3]'],['_check([1])','[1]'],['_check([])','[]']],constraints:['0 ≤ number of nodes ≤ 5 × 10<sup>4</sup>','in place'],mistakes:['Not cutting the list in the middle, which creates a cycle.','Copying values into a Python list (not the intended O(1) space).'],followup:'Do it with O(1) extra space and no recursion.',hints:['Three known steps: find the middle, reverse the second half, merge alternately.','Three steps: find the middle, reverse the second half, then merge the two halves alternately.'],approach:'Fast/slow + reverse + weave.',cx:'O(n) time, O(1) space'},
{id:'ll-rotate',type:'code',d:2,p:'linked-list',prelude:'list',title:'Rotate List',prompt:'<p>Rotate the list to the right by k places.</p><p><code>[1, 2, 3, 4, 5], k = 2</code> → <code>[4, 5, 1, 2, 3]</code></p>',starter:`def rotate_right(head, k):
    pass`,solution:`def rotate_right(head, k):
    if not head:
        return head
    n, tail = 1, head
    while tail.next:
        tail = tail.next
        n += 1
    k %= n
    if k == 0:
        return head
    tail.next = head                 # close the ring
    new_tail = head
    for _ in range(n - k - 1):
        new_tail = new_tail.next
    new_head = new_tail.next
    new_tail.next = None             # cut it open again
    return new_head`,tests:[['to_list(rotate_right(build([1, 2, 3, 4, 5]), 2))','[4, 5, 1, 2, 3]'],['to_list(rotate_right(build([0, 1, 2]), 4))','[2, 0, 1]'],['to_list(rotate_right(build([]), 1))','[]'],['to_list(rotate_right(build([1, 2]), 2))','[1, 2]']],constraints:['0 ≤ number of nodes ≤ 500','0 ≤ k ≤ 2 × 10<sup>9</sup>'],mistakes:['Forgetting k %= length, which is very slow for large k.','Leaving the old tail linked to the old head (a cycle).'],followup:'Rotate to the left instead.',hints:['Find the length and the tail; reduce k with % n.','Join tail to head to form a ring, then cut it n − k nodes from the start.'],approach:'Make a ring, then break it at the right place.',cx:'O(n)'},
{id:'ll-swap-pairs',type:'code',d:2,p:'linked-list',prelude:'list',title:'Swap Nodes in Pairs',prompt:'<p>Swap every two adjacent nodes (by relinking, not by swapping values).</p>',starter:`def swap_pairs(head):
    pass`,solution:`def swap_pairs(head):
    dummy = prev = ListNode(0, head)
    while prev.next and prev.next.next:
        a, b = prev.next, prev.next.next
        prev.next, a.next, b.next = b, b.next, a
        prev = a
    return dummy.next`,tests:[['to_list(swap_pairs(build([1, 2, 3, 4])))','[2, 1, 4, 3]'],['to_list(swap_pairs(build([])))','[]'],['to_list(swap_pairs(build([1])))','[1]'],['to_list(swap_pairs(build([1, 2, 3])))','[2, 1, 3]']],constraints:['0 ≤ number of nodes ≤ 100'],mistakes:['Swapping values instead of nodes.','Losing the link from the previous pair to the swapped pair.'],followup:'Swap in groups of k (ll-reverse-k).',hints:['With prev → a → b → rest, you want prev → b → a → rest.','A dummy node makes the first pair like every other pair.'],approach:'Dummy node; rewire three pointers per pair.',cx:'O(n)'},
{id:'ll-partition',type:'code',d:2,p:'linked-list',prelude:'list',title:'Partition List',prompt:'<p>Put all nodes with value &lt; x before the nodes ≥ x, keeping the relative order inside each group.</p>',starter:`def partition(head, x):
    pass`,solution:`def partition(head, x):
    small = s_tail = ListNode()
    big = b_tail = ListNode()
    while head:
        if head.val < x:
            s_tail.next = head
            s_tail = head
        else:
            b_tail.next = head
            b_tail = head
        head = head.next
    b_tail.next = None
    s_tail.next = big.next
    return small.next`,tests:[['to_list(partition(build([1, 4, 3, 2, 5, 2]), 3))','[1, 2, 2, 4, 3, 5]'],['to_list(partition(build([2, 1]), 2))','[1, 2]'],['to_list(partition(build([]), 0))','[]'],['to_list(partition(build([3, 1, 2]), 2))','[1, 3, 2]']],constraints:['0 ≤ number of nodes ≤ 200'],mistakes:['Not ending the second list, which leaves a cycle.','Changing the relative order inside a group.'],followup:'Partition into three groups: < x, == x and > x.',hints:['Build two separate lists with two dummy heads, then join them.','Remember to end the big list with None.'],approach:'Two dummy-headed chains, then concatenate.',cx:'O(n)'},
{id:'ll-reverse-between',type:'code',d:2,p:'linked-list',prelude:'list',title:'Reverse Between Positions',prompt:'<p>Reverse the nodes from position <code>left</code> to <code>right</code> (1-indexed, inclusive).</p><p><code>[1, 2, 3, 4, 5], 2, 4</code> → <code>[1, 4, 3, 2, 5]</code></p>',starter:`def reverse_between(head, left, right):
    pass`,solution:`def reverse_between(head, left, right):
    dummy = ListNode(0, head)
    before = dummy
    for _ in range(left - 1):
        before = before.next
    cur = before.next
    for _ in range(right - left):    # move cur.next to the front of the section
        moved = cur.next
        cur.next = moved.next
        moved.next = before.next
        before.next = moved
    return dummy.next`,tests:[['to_list(reverse_between(build([1, 2, 3, 4, 5]), 2, 4))','[1, 4, 3, 2, 5]'],['to_list(reverse_between(build([5]), 1, 1))','[5]'],['to_list(reverse_between(build([3, 5]), 1, 2))','[5, 3]'],['to_list(reverse_between(build([1, 2, 3, 4]), 1, 4))','[4, 3, 2, 1]']],constraints:['1 ≤ left ≤ right ≤ number of nodes ≤ 500'],mistakes:['Failing when left is 1 (use a dummy node).','Losing the node after position right.'],followup:'Do it in one pass.',hints:['Walk to the node just BEFORE the section (a dummy helps when left = 1).','Repeatedly take the node after cur and move it to the front of the section.'],approach:'Front-insertion inside the section.',cx:'O(n)'},
{id:'ll-sort',type:'code',d:3,p:'divide-conquer',prelude:'list',title:'Sort a Linked List',prompt:'<p>Sort the list in O(n log n) time (do not copy the values into a Python list).</p>',starter:`def sort_list(head):
    pass`,solution:`def sort_list(head):
    if not head or not head.next:
        return head
    slow, fast = head, head.next              # split in half
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    second = slow.next
    slow.next = None
    a, b = sort_list(head), sort_list(second)
    dummy = tail = ListNode()                 # merge
    while a and b:
        if a.val <= b.val:
            tail.next, a = a, a.next
        else:
            tail.next, b = b, b.next
        tail = tail.next
    tail.next = a or b
    return dummy.next`,tests:[['to_list(sort_list(build([4, 2, 1, 3])))','[1, 2, 3, 4]'],['to_list(sort_list(build([-1, 5, 3, 4, 0])))','[-1, 0, 3, 4, 5]'],['to_list(sort_list(build([])))','[]'],['to_list(sort_list(build(list(range(2000, 0, -1)))))','list(range(1, 2001))','','2,000 nodes']],constraints:['0 ≤ number of nodes ≤ 5 × 10<sup>4</sup>'],mistakes:['Not cutting the list in half, so recursion never ends.','Copying into a Python list and calling sorted().'],followup:'Sort with O(1) extra space using bottom-up merge sort.',hints:['Merge sort suits linked lists: splitting and merging need no random access.','Split with fast/slow, sort each half recursively, merge.'],approach:'Merge sort on the list.',cx:'O(n log n) time, O(log n) recursion'},
{id:'ll-reverse-k',type:'code',d:3,p:'linked-list',prelude:'list',title:'Reverse Nodes in k-Group',prompt:'<p>Reverse every consecutive group of k nodes. A final group shorter than k stays as it is.</p><p><code>[1, 2, 3, 4, 5], k = 2</code> → <code>[2, 1, 4, 3, 5]</code></p>',starter:`def reverse_k_group(head, k):
    pass`,solution:`def reverse_k_group(head, k):
    dummy = ListNode(0, head)
    before = dummy
    while True:
        check = before                     # are there k nodes left?
        for _ in range(k):
            check = check.next
            if check is None:
                return dummy.next
        first = before.next
        prev, cur = None, first
        for _ in range(k):                 # reverse k nodes
            cur.next, prev, cur = prev, cur, cur.next
        before.next = prev                 # prev is the new group head
        first.next = cur                   # old first is now the group tail
        before = first`,tests:[['to_list(reverse_k_group(build([1, 2, 3, 4, 5]), 2))','[2, 1, 4, 3, 5]'],['to_list(reverse_k_group(build([1, 2, 3, 4, 5]), 3))','[3, 2, 1, 4, 5]'],['to_list(reverse_k_group(build([1, 2]), 1))','[1, 2]'],['to_list(reverse_k_group(build([]), 2))','[]']],constraints:['1 ≤ k ≤ number of nodes ≤ 5000'],mistakes:['Reversing the last group even when it is shorter than k.','Not reconnecting the reversed group to the rest.'],followup:'Also reverse the last group when it is shorter than k.',hints:['Before reversing a group, check that k nodes exist.','Reverse exactly k nodes, then reconnect: the node before the group → new group head; old group head → the rest.'],approach:'Group-by-group reversal with careful reconnection.',cx:'O(n) time, O(1) space'}
]);
})();
