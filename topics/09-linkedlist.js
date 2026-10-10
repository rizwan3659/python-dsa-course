/* Topic 9 · Linked lists. */
COURSE.topic({id:'linkedlist',
goal:'Think in nodes and pointers: traverse, insert, delete and reverse safely, and use dummy nodes and fast/slow pointers.',
learn:[
{title:'Nodes and pointers',short:'Nodes',mins:8,lead:'A linked list is a chain of nodes. Each node holds a value and a reference to the next node; the last points to None. There is no indexing: you start at the head and follow pointers.',does:['predict','concept','choose'],blocks:[
 {t:'diagram',text:`
  HEAD
   ↓
  [10|•] → [20|•] → [30|•] → None
   val next`,aria:'Three nodes linked from head, the last pointing to None'},
 {t:'code',title:'The node class',code:`class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

head = ListNode(10, ListNode(20, ListNode(30)))
cur = head
while cur:                 # the standard traversal
    print(cur.val)
    cur = cur.next`},
 {t:'callout',html:'In the exercises, <code>ListNode</code>, <code>build([1, 2, 3])</code> (makes a list and returns its head) and <code>to_list(head)</code> are provided for you.'},
 {t:'q',ids:['ll-p1','ll-p2','ll-p5','ll-p10']},
 {t:'q',ids:['ll-m1','ll-ch2','ll-c2']}]},

{title:'Insert, delete, search',short:'Operations',mins:10,lead:'Changing a linked list means changing pointers, in the right order. Inserting at the head is O(1); everything that must first find a position is O(n).',does:['visualize','predict','complexity','debug'],blocks:[
 {t:'viz',fn:'linked-list',title:'Watch the pointers',intro:'Insert at the head, then at the tail: which one walks the list? Delete the first node and a middle node.'},
 {t:'q',ids:['ll-p3','ll-p4','ll-p6']},
 {t:'q',ids:['ll-c1','ll-c3','ll-c4','ll-c6']},
 {t:'q',title:'Find the bug',ids:['ll-d2']},
 {t:'q',title:'Code it',ids:['ll-length','ll-kth']}]},

{title:'The dummy node',short:'Dummy node',mins:8,lead:'Deleting or inserting at the head is a special case… unless you put a fake node before it. Then every node has a predecessor, and you return dummy.next at the end.',does:['concept','complete','debug','code'],blocks:[
 {t:'diagram',text:`
  dummy → [1] → [2] → [3] → None
    ↑
   prev        (to delete 1: prev.next = prev.next.next)`,aria:'A dummy node placed before the head'},
 {t:'q',ids:['ll-m2','ll-b3','ll-d3']},
 {t:'q',title:'Code it',ids:['ll-remove-elements','ll-merge']},
 {t:'q',title:'Find the bug',ids:['ll-d5']}]},

{title:'Reversing a linked list',short:'Reverse',mins:10,lead:'The most important linked-list skill: three pointers (prev, cur, nxt) and four lines, in exactly the right order.',does:['visualize','dry run','complete','debug','code'],blocks:[
 {t:'viz',fn:'linked-list',title:'Reverse it',intro:'Press Reverse and step slowly. Before each step, say which pointer will change.'},
 {t:'q',ids:['ll-p8','ll-m5','ll-dr1','ll-b1']},
 {t:'q',title:'Find the bug',ids:['ll-d1']},
 {t:'q',title:'Code it',ids:['ll-reverse','ll-reverse-between']}]},

{title:'Fast and slow pointers',short:'Fast/slow',mins:10,lead:'Two pointers moving at different speeds find the middle in one pass, detect cycles in O(1) space, and locate positions from the end.',does:['visualize','dry run','complete','debug','code'],blocks:[
 {t:'viz',fn:'fast-slow',title:'Middle and cycles'},
 {t:'q',ids:['ll-p9','ll-dr2','ll-b2','ll-p7','ll-m3','ll-d4']},
 {t:'q',title:'Code it',ids:['ll-middle','ll-has-cycle','ll-remove-nth']}]},

{title:'Doubly linked lists',short:'Doubly linked',mins:8,lead:'Add a prev pointer and you can walk backwards and remove any node in O(1) once you hold it. Sentinel head and tail nodes remove every edge case.',does:['concept','choose','build'],blocks:[
 {t:'diagram',text:`
  [head] ⇄ [10] ⇄ [20] ⇄ [30] ⇄ [tail]      head and tail are sentinels (no values)`,aria:'Doubly linked list with sentinel nodes'},
 {t:'q',ids:['ll-m4','ll-ch1']},
 {t:'q',title:'Build it',ids:['build-dll']}]}],

challenge:[
 {t:'b2o',title:'Palindrome List: copy to an array → reverse half in place',qid:'ll-palindrome',problem:'<p>Return True if a linked list’s values read the same both ways.</p>',
  brute:{note:'Copy the values out, then compare with the reverse.',code:`def is_palindrome(head):
    vals = []
    while head:
        vals.append(head.val)
        head = head.next
    return vals == vals[::-1]`,cx:'O(n)',why:'Time is already O(n). The cost here is <b>space</b>: an O(n) copy.'},
  slow:{q:'The time is fine. What could still be improved?',opts:['Nothing','Extra space: the copy uses O(n) memory','The comparison is O(n²)','Python lists are slow'],a:1,why:'Interviewers often ask for O(1) extra space here.'},
  better:{q:'How can you compare the halves without a copy?',opts:['Sort the list','Find the middle with fast/slow pointers, reverse the second half in place, then compare','Use a stack of all values','Recursion over every pair'],a:1,why:'Reversal is O(1) space, and fast/slow finds the middle in one pass.'},
  optimal:{code:`def is_palindrome(head):
    slow = fast = head
    while fast and fast.next:
        slow, fast = slow.next, fast.next.next
    prev = None
    while slow:
        slow.next, prev, slow = prev, slow, slow.next
    while prev:
        if head.val != prev.val:
            return False
        head, prev = head.next, prev.next
    return True`,cx:'O(n)',why:'Still O(n) time, but only O(1) extra space.'},
  takeaway:'<p>Optimizing is not only about time: two classic linked-list moves (fast/slow, in-place reverse) remove the extra memory.</p>'}],

review:[
 {t:'flash',items:[['Access the i-th node?','O(i): walk from head.'],['Insert at head?','O(1).'],['Why a dummy node?','No special case for the head; return dummy.next.'],['Reverse in 4 lines?','nxt = cur.next; cur.next = prev; prev = cur; cur = nxt.'],['Middle in one pass?','slow +1, fast +2; stop when fast or fast.next is None.'],['Cycle in O(1) space?',"Floyd: fast and slow meet iff there is a cycle."],['Nth from end?','Give one pointer an n-step head start.'],['Doubly linked bonus?','O(1) delete given the node; walk backwards.']]}]
});
