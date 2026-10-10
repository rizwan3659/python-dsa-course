/* Build it from scratch: 12 data structures. Requirements → starter → implement → run tests → debug → hints → reference. */
(function(){
const RAISES=`def _raises(f):
    try:
        f()
    except IndexError:
        return "IndexError"
    except Exception as e:
        return type(e).__name__
    return "no error"
`;
const B=(topic,q)=>COURSE.qs(topic,[Object.assign({type:'code',build:true,p:'design'},q)]);

B('stack',{id:'build-stack',d:1,title:'Build a Stack',prompt:'<p>Implement a stack (last in, first out) on top of a Python list.</p>',
req:['<code>push(x)</code> adds x on top','<code>pop()</code> removes and returns the top; raises <code>IndexError</code> if empty','<code>peek()</code> returns the top without removing it; raises <code>IndexError</code> if empty','<code>is_empty()</code> and <code>len(stack)</code>','Every operation must be O(1)'],
starter:`class Stack:
    def __init__(self):
        self.items = []

    def push(self, x):
        pass

    def pop(self):
        pass

    def peek(self):
        pass

    def is_empty(self):
        pass

    def __len__(self):
        pass`,
solution:`class Stack:
    def __init__(self):
        self.items = []

    def push(self, x):
        self.items.append(x)          # the end of the list is the top

    def pop(self):
        if not self.items:
            raise IndexError("pop from empty stack")
        return self.items.pop()

    def peek(self):
        if not self.items:
            raise IndexError("peek at empty stack")
        return self.items[-1]

    def is_empty(self):
        return not self.items

    def __len__(self):
        return len(self.items)`,
post:RAISES+`def _t1():
    s = Stack()
    for x in (1, 2, 3):
        s.push(x)
    return (s.pop(), s.peek(), len(s))
def _t2():
    return _raises(lambda: Stack().pop())
def _t3():
    return _raises(lambda: Stack().peek())
def _t4():
    s = Stack()
    a = s.is_empty()
    s.push("x")
    return (a, s.is_empty())
def _t5():
    s = Stack()
    for i in range(200000):
        s.push(i)
    while len(s) > 1:
        s.pop()
    return s.peek()`,
tests:[['_t1()','(3, 2, 2)','','push 1, 2, 3 → pop() is 3, peek() is 2, len is 2'],['_t2()','"IndexError"','','pop() on an empty stack raises IndexError'],['_t3()','"IndexError"','','peek() on an empty stack raises IndexError'],['_t4()','(True, False)','','is_empty() before and after a push'],['_t5()','0','','200,000 pushes and pops (must be fast)']],
hints:['Which end of a Python list is cheap to add to and remove from?','Use append() and pop() on the end. Check for empty before popping.'],approach:'The end of the list is the top: append and pop are both O(1).',cx:'O(1) per operation'});

B('queue',{id:'build-queue',d:1,title:'Build a Queue',prompt:'<p>Implement a FIFO queue. <b>Do not use <code>list.pop(0)</code></b> (it is O(n)). Use two lists (an inbox and an outbox) or <code>collections.deque</code>.</p>',
req:['<code>enqueue(x)</code> adds at the back','<code>dequeue()</code> removes and returns the front; raises <code>IndexError</code> if empty','<code>peek()</code> returns the front; raises <code>IndexError</code> if empty','<code>len(q)</code> and <code>is_empty()</code>','Amortized O(1) per operation'],
starter:`class Queue:
    def __init__(self):
        self.inbox = []
        self.outbox = []

    def enqueue(self, x):
        pass

    def dequeue(self):
        pass

    def peek(self):
        pass

    def is_empty(self):
        pass

    def __len__(self):
        pass`,
solution:`class Queue:
    def __init__(self):
        self.inbox = []      # new items arrive here
        self.outbox = []     # items leave from here (reversed order)

    def enqueue(self, x):
        self.inbox.append(x)

    def _shift(self):
        if not self.outbox:
            while self.inbox:            # reverse once: oldest ends on top
                self.outbox.append(self.inbox.pop())

    def dequeue(self):
        self._shift()
        if not self.outbox:
            raise IndexError("dequeue from empty queue")
        return self.outbox.pop()

    def peek(self):
        self._shift()
        if not self.outbox:
            raise IndexError("peek at empty queue")
        return self.outbox[-1]

    def is_empty(self):
        return not self.inbox and not self.outbox

    def __len__(self):
        return len(self.inbox) + len(self.outbox)`,
post:RAISES+`def _t1():
    q = Queue()
    for x in (1, 2, 3):
        q.enqueue(x)
    a = q.dequeue()
    q.enqueue(4)
    return (a, q.dequeue(), q.peek(), len(q))
def _t2():
    return _raises(lambda: Queue().dequeue())
def _t3():
    q = Queue()
    q.enqueue(1)
    q.dequeue()
    return (q.is_empty(), _raises(q.peek))
def _t4():
    q = Queue()
    for i in range(100000):
        q.enqueue(i)
    total = 0
    while not q.is_empty():
        total += q.dequeue()
    return total`,
tests:[['_t1()','(1, 2, 3, 2)','','enqueue 1, 2, 3; dequeue → 1; enqueue 4; dequeue → 2; peek → 3; len 2'],['_t2()','"IndexError"','','dequeue() on an empty queue raises IndexError'],['_t3()','(True, "IndexError")','','empty again after one in, one out'],['_t4()','4999950000','','100,000 items in and out (must be fast)']],
hints:['A stack reverses order. Two reversals restore it.','Push onto inbox. When outbox is empty, move everything from inbox to outbox, then pop from outbox.'],approach:'Two stacks: each element is moved from inbox to outbox at most once, so the cost is amortized O(1).',cx:'Amortized O(1) per operation'});

B('queue',{id:'build-circular-queue',d:2,title:'Build a Circular Queue',prompt:'<p>Implement a fixed-capacity queue in a list of size k that wraps around: when the back reaches the end of the list, it continues at index 0.</p>',
req:['<code>CircularQueue(k)</code> allocates <code>[None] * k</code> once','<code>enqueue(x)</code> → True, or False if full','<code>dequeue()</code> → True, or False if empty','<code>front()</code> and <code>rear()</code> → the value, or -1 if empty','<code>is_empty()</code>, <code>is_full()</code>','Never shift elements: use a head index and a count with % k'],
starter:`class CircularQueue:
    def __init__(self, k):
        self.data = [None] * k
        self.head = 0      # index of the front element
        self.count = 0

    def enqueue(self, x):
        pass

    def dequeue(self):
        pass

    def front(self):
        pass

    def rear(self):
        pass

    def is_empty(self):
        pass

    def is_full(self):
        pass`,
solution:`class CircularQueue:
    def __init__(self, k):
        self.data = [None] * k
        self.head = 0
        self.count = 0

    def enqueue(self, x):
        if self.is_full():
            return False
        tail = (self.head + self.count) % len(self.data)
        self.data[tail] = x
        self.count += 1
        return True

    def dequeue(self):
        if self.is_empty():
            return False
        self.head = (self.head + 1) % len(self.data)
        self.count -= 1
        return True

    def front(self):
        return -1 if self.is_empty() else self.data[self.head]

    def rear(self):
        if self.is_empty():
            return -1
        return self.data[(self.head + self.count - 1) % len(self.data)]

    def is_empty(self):
        return self.count == 0

    def is_full(self):
        return self.count == len(self.data)`,
post:`def _t1():
    q = CircularQueue(3)
    return [q.enqueue(1), q.enqueue(2), q.enqueue(3), q.enqueue(4), q.rear(), q.is_full(), q.dequeue(), q.enqueue(4), q.rear(), q.front()]
def _t2():
    q = CircularQueue(2)
    return [q.front(), q.rear(), q.dequeue(), q.is_empty()]
def _t3():
    q = CircularQueue(2)
    out = []
    for i in range(5):
        q.enqueue(i)
        out.append(q.front())
        q.dequeue()
    return (out, q.is_empty(), len(q.data))`,
tests:[['_t1()','[True, True, True, False, 3, True, True, True, 4, 2]','','k = 3: fill, overflow, wrap around'],['_t2()','[-1, -1, False, True]','','empty queue behaviour'],['_t3()','([0, 1, 2, 3, 4], True, 2)','','wraps many times without growing the list']],
hints:['The back position is (head + count) % k.','dequeue only moves head forward (with % k); it never shifts elements.'],approach:'Head index + count; positions wrap with modulo.',cx:'O(1) per operation, O(k) space'});

B('linkedlist',{id:'build-linked-list',d:2,title:'Build a Singly Linked List',prompt:'<p>Implement a singly linked list with a <code>head</code> pointer and a size counter.</p>',
req:['<code>push_front(x)</code> and <code>push_back(x)</code>','<code>pop_front()</code> returns the first value; raises <code>IndexError</code> if empty','<code>find(x)</code> → True/False','<code>remove(x)</code> deletes the first node holding x → True, or False if absent','<code>reverse()</code> in place (no new nodes)','<code>to_list()</code> and <code>len(ll)</code>'],
starter:`class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    def push_front(self, x):
        pass

    def push_back(self, x):
        pass

    def pop_front(self):
        pass

    def find(self, x):
        pass

    def remove(self, x):
        pass

    def reverse(self):
        pass

    def to_list(self):
        pass

    def __len__(self):
        return self.size`,
solution:`class Node:
    def __init__(self, val, next=None):
        self.val = val
        self.next = next


class LinkedList:
    def __init__(self):
        self.head = None
        self.size = 0

    def push_front(self, x):
        self.head = Node(x, self.head)
        self.size += 1

    def push_back(self, x):
        node = Node(x)
        if self.head is None:
            self.head = node
        else:
            cur = self.head
            while cur.next:
                cur = cur.next
            cur.next = node
        self.size += 1

    def pop_front(self):
        if self.head is None:
            raise IndexError("pop from empty list")
        val = self.head.val
        self.head = self.head.next
        self.size -= 1
        return val

    def find(self, x):
        cur = self.head
        while cur:
            if cur.val == x:
                return True
            cur = cur.next
        return False

    def remove(self, x):
        dummy = Node(None, self.head)     # dummy node: no special case for the head
        prev = dummy
        while prev.next:
            if prev.next.val == x:
                prev.next = prev.next.next
                self.head = dummy.next
                self.size -= 1
                return True
            prev = prev.next
        return False

    def reverse(self):
        prev, cur = None, self.head
        while cur:
            nxt = cur.next
            cur.next = prev
            prev, cur = cur, nxt
        self.head = prev

    def to_list(self):
        out, cur = [], self.head
        while cur:
            out.append(cur.val)
            cur = cur.next
        return out

    def __len__(self):
        return self.size`,
post:RAISES+`def _t1():
    ll = LinkedList()
    ll.push_back(2)
    ll.push_front(1)
    ll.push_back(3)
    return (ll.to_list(), len(ll))
def _t2():
    ll = LinkedList()
    for x in (1, 2, 3, 2):
        ll.push_back(x)
    return (ll.remove(2), ll.to_list(), ll.remove(9), ll.remove(1), ll.to_list(), len(ll))
def _t3():
    ll = LinkedList()
    for x in (1, 2, 3, 4):
        ll.push_back(x)
    ll.reverse()
    return (ll.to_list(), ll.pop_front(), ll.find(1), ll.find(4))
def _t4():
    ll = LinkedList()
    ll.reverse()
    return (ll.to_list(), _raises(ll.pop_front))`,
tests:[['_t1()','([1, 2, 3], 3)','','push_back 2, push_front 1, push_back 3'],['_t2()','(True, [1, 3, 2], False, True, [3, 2], 2)','','remove first match, missing value, the head'],['_t3()','([4, 3, 2, 1], 4, True, False)','','reverse, then pop_front and find'],['_t4()','([], "IndexError")','','empty list edge cases']],
hints:['push_front is one line: the new node points at the old head.','remove: a dummy node before the head means you never special-case deleting the first node. reverse: keep prev, cur, next.'],approach:'Pointer manipulation with a dummy node for deletion and three pointers for reversal.',cx:'push_front/pop_front O(1); push_back, find, remove O(n)'});

B('linkedlist',{id:'build-dll',d:2,title:'Build a Doubly Linked List',prompt:'<p>Implement a doubly linked list with <b>sentinel</b> head and tail nodes, so every insert and delete looks the same.</p>',
req:['<code>push_front(x)</code>, <code>push_back(x)</code> in O(1)','<code>pop_front()</code>, <code>pop_back()</code> in O(1); raise <code>IndexError</code> if empty','<code>to_list()</code> walks next pointers; <code>to_list_reversed()</code> walks prev pointers','<code>len(dll)</code>'],
starter:`class Node:
    def __init__(self, val=None):
        self.val = val
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = Node()      # sentinel before the first real node
        self.tail = Node()      # sentinel after the last real node
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    def _insert_between(self, node, before, after):
        pass

    def _unlink(self, node):
        pass

    def push_front(self, x):
        pass

    def push_back(self, x):
        pass

    def pop_front(self):
        pass

    def pop_back(self):
        pass

    def to_list(self):
        pass

    def to_list_reversed(self):
        pass

    def __len__(self):
        return self.size`,
solution:`class Node:
    def __init__(self, val=None):
        self.val = val
        self.prev = None
        self.next = None


class DoublyLinkedList:
    def __init__(self):
        self.head = Node()
        self.tail = Node()
        self.head.next = self.tail
        self.tail.prev = self.head
        self.size = 0

    def _insert_between(self, node, before, after):
        node.prev, node.next = before, after
        before.next = node
        after.prev = node
        self.size += 1

    def _unlink(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev
        self.size -= 1
        return node.val

    def push_front(self, x):
        self._insert_between(Node(x), self.head, self.head.next)

    def push_back(self, x):
        self._insert_between(Node(x), self.tail.prev, self.tail)

    def pop_front(self):
        if self.size == 0:
            raise IndexError("pop from empty list")
        return self._unlink(self.head.next)

    def pop_back(self):
        if self.size == 0:
            raise IndexError("pop from empty list")
        return self._unlink(self.tail.prev)

    def to_list(self):
        out, cur = [], self.head.next
        while cur is not self.tail:
            out.append(cur.val)
            cur = cur.next
        return out

    def to_list_reversed(self):
        out, cur = [], self.tail.prev
        while cur is not self.head:
            out.append(cur.val)
            cur = cur.prev
        return out

    def __len__(self):
        return self.size`,
post:RAISES+`def _t1():
    d = DoublyLinkedList()
    d.push_back(2)
    d.push_front(1)
    d.push_back(3)
    return (d.to_list(), d.to_list_reversed(), len(d))
def _t2():
    d = DoublyLinkedList()
    for x in (1, 2, 3, 4):
        d.push_back(x)
    return (d.pop_front(), d.pop_back(), d.to_list(), d.to_list_reversed())
def _t3():
    d = DoublyLinkedList()
    d.push_back(1)
    d.pop_back()
    return (d.to_list(), d.to_list_reversed(), _raises(d.pop_front), _raises(d.pop_back))`,
tests:[['_t1()','([1, 2, 3], [3, 2, 1], 3)','','both directions agree'],['_t2()','(1, 4, [2, 3], [3, 2])','','pop from both ends'],['_t3()','([], [], "IndexError", "IndexError")','','back to empty']],
hints:['Write _insert_between and _unlink first; every public method is one call to them.','Inserting touches four pointers: node.prev, node.next, before.next, after.prev.'],approach:'Sentinel nodes remove all the “is the list empty / is this the head?” special cases.',cx:'O(1) for all end operations'});

B('hashing',{id:'build-hashmap',d:2,title:'Build a HashMap',prompt:'<p>Implement a hash map with <b>separate chaining</b>, without using Python’s dict or set. Each bucket is a list of <code>[key, value]</code> pairs.</p>',
req:['<code>put(key, value)</code> inserts or overwrites','<code>get(key)</code> → value, or -1 if missing','<code>remove(key)</code> deletes if present','Bucket = <code>hash(key) % len(self.buckets)</code>','When <code>size / len(buckets) &gt; 0.75</code>, double the buckets and re-insert everything','Do not use dict or set'],
starter:`class MyHashMap:
    def __init__(self):
        self.buckets = [[] for _ in range(8)]
        self.size = 0

    def _bucket(self, key):
        return self.buckets[hash(key) % len(self.buckets)]

    def put(self, key, value):
        pass

    def get(self, key):
        pass

    def remove(self, key):
        pass

    def _resize(self):
        pass`,
solution:`class MyHashMap:
    def __init__(self):
        self.buckets = [[] for _ in range(8)]
        self.size = 0

    def _bucket(self, key):
        return self.buckets[hash(key) % len(self.buckets)]

    def put(self, key, value):
        bucket = self._bucket(key)
        for pair in bucket:
            if pair[0] == key:          # existing key: overwrite
                pair[1] = value
                return
        bucket.append([key, value])     # new key (maybe a collision: chain it)
        self.size += 1
        if self.size / len(self.buckets) > 0.75:
            self._resize()

    def get(self, key):
        for k, v in self._bucket(key):
            if k == key:
                return v
        return -1

    def remove(self, key):
        bucket = self._bucket(key)
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket.pop(i)
                self.size -= 1
                return

    def _resize(self):
        old = self.buckets
        self.buckets = [[] for _ in range(len(old) * 2)]
        for bucket in old:
            for k, v in bucket:
                self._bucket(k).append([k, v])`,
post:`def _t1():
    m = MyHashMap()
    m.put(1, 1)
    m.put(2, 2)
    a = (m.get(1), m.get(3))
    m.put(2, 1)
    b = m.get(2)
    m.remove(2)
    return (a, b, m.get(2))
def _t2():
    m = MyHashMap()
    for i in range(2000):
        m.put("k" + str(i), i)
    ok = all(m.get("k" + str(i)) == i for i in range(2000))
    return (ok, m.size, len(m.buckets) >= 2000 / 0.75)
def _t3():
    m = MyHashMap()
    m.put(3, "a")
    m.put(11, "b")         # 3 and 11 collide in 8 buckets
    m.remove(3)
    return (m.get(3), m.get(11), m.size)`,
tests:[['_t1()','((1, -1), 1, -1)','','put, get, overwrite, remove'],['_t2()','(True, 2000, True)','','2,000 keys: all found, and the table grew'],['_t3()','(-1, "b", 1)','','colliding keys share a bucket safely']],
hints:['put: scan the bucket for the key; overwrite if found, otherwise append and grow size.','resize: new bucket list twice as long, then re-insert every pair (their buckets change because the modulus changed).'],approach:'Array of buckets; each bucket is a short list scanned linearly. Resizing keeps chains short.',cx:'O(1) average per operation'});

B('bst',{id:'build-bst',d:2,title:'Build a Binary Search Tree',prompt:'<p>Implement a BST of distinct numbers. Smaller values go left, larger values go right.</p>',
req:['<code>insert(x)</code> (ignore duplicates)','<code>contains(x)</code> → bool','<code>inorder()</code> → sorted list','<code>minimum()</code>, <code>maximum()</code> → value or None','<code>delete(x)</code> handles leaves, one child and two children','<code>height()</code>: number of levels (empty = 0)'],
starter:`class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


class BST:
    def __init__(self):
        self.root = None

    def insert(self, x):
        pass

    def contains(self, x):
        pass

    def inorder(self):
        pass

    def minimum(self):
        pass

    def maximum(self):
        pass

    def delete(self, x):
        pass

    def height(self):
        pass`,
solution:`class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None


class BST:
    def __init__(self):
        self.root = None

    def insert(self, x):
        def go(node):
            if node is None:
                return Node(x)
            if x < node.val:
                node.left = go(node.left)
            elif x > node.val:
                node.right = go(node.right)
            return node
        self.root = go(self.root)

    def contains(self, x):
        node = self.root
        while node:
            if x == node.val:
                return True
            node = node.left if x < node.val else node.right
        return False

    def inorder(self):
        out = []
        def go(node):
            if node:
                go(node.left)
                out.append(node.val)
                go(node.right)
        go(self.root)
        return out

    def minimum(self):
        node = self.root
        while node and node.left:
            node = node.left
        return node.val if node else None

    def maximum(self):
        node = self.root
        while node and node.right:
            node = node.right
        return node.val if node else None

    def delete(self, x):
        def go(node, x):
            if node is None:
                return None
            if x < node.val:
                node.left = go(node.left, x)
            elif x > node.val:
                node.right = go(node.right, x)
            else:
                if node.left is None:
                    return node.right
                if node.right is None:
                    return node.left
                succ = node.right               # two children: use the in-order successor
                while succ.left:
                    succ = succ.left
                node.val = succ.val
                node.right = go(node.right, succ.val)
            return node
        self.root = go(self.root, x)

    def height(self):
        def h(node):
            return 0 if node is None else 1 + max(h(node.left), h(node.right))
        return h(self.root)`,
post:`def _make(vals):
    t = BST()
    for v in vals:
        t.insert(v)
    return t
def _t1():
    t = _make([8, 4, 12, 2, 6, 10, 14, 6])
    return (t.inorder(), t.contains(10), t.contains(5), t.minimum(), t.maximum(), t.height())
def _t2():
    t = _make([8, 4, 12, 2, 6, 10, 14])
    t.delete(2)          # leaf
    t.delete(12)         # two children
    t.delete(4)          # one child
    return (t.inorder(), t.root.val, t.contains(12))
def _t3():
    t = BST()
    a = (t.inorder(), t.minimum(), t.height())
    t.insert(5)
    t.delete(5)
    return (a, t.root)
def _t4():
    t = _make([8, 4, 12])
    t.delete(8)          # delete the root with two children
    return (t.inorder(), t.root.val)`,
tests:[['_t1()','([2, 4, 6, 8, 10, 12, 14], True, False, 2, 14, 3)','','insert (with a duplicate), search, min, max, height'],['_t2()','([6, 8, 10, 14], 8, False)','','delete a leaf, a node with two children, a node with one child'],['_t3()','(([], None, 0), None)','','empty tree'],['_t4()','([4, 12], 12)','','delete the root']],
hints:['Recursive insert returns the (possibly new) subtree root: node.left = insert(node.left, x).','Delete with two children: copy the smallest value of the right subtree into the node, then delete that value from the right subtree.'],approach:'Each operation follows one root-to-leaf path, guided by comparisons.',cx:'O(h) per operation: O(log n) balanced, O(n) worst case'});

B('heap',{id:'build-heap',d:2,title:'Build a Min-Heap',prompt:'<p>Implement a binary min-heap stored in a list: the children of index i are at 2i + 1 and 2i + 2, its parent at (i − 1) // 2. Do not use heapq.</p>',
req:['<code>push(x)</code>: append, then bubble up','<code>pop()</code>: remove and return the minimum (move the last item to the root, then bubble down); raise <code>IndexError</code> if empty','<code>peek()</code> → minimum; <code>IndexError</code> if empty','<code>len(h)</code>','push and pop in O(log n)'],
starter:`class MinHeap:
    def __init__(self):
        self.data = []

    def push(self, x):
        pass

    def pop(self):
        pass

    def peek(self):
        pass

    def __len__(self):
        return len(self.data)

    def _up(self, i):
        pass

    def _down(self, i):
        pass`,
solution:`class MinHeap:
    def __init__(self):
        self.data = []

    def push(self, x):
        self.data.append(x)
        self._up(len(self.data) - 1)

    def pop(self):
        if not self.data:
            raise IndexError("pop from empty heap")
        top = self.data[0]
        last = self.data.pop()
        if self.data:
            self.data[0] = last
            self._down(0)
        return top

    def peek(self):
        if not self.data:
            raise IndexError("peek at empty heap")
        return self.data[0]

    def __len__(self):
        return len(self.data)

    def _up(self, i):
        while i > 0:
            parent = (i - 1) // 2
            if self.data[i] >= self.data[parent]:
                break
            self.data[i], self.data[parent] = self.data[parent], self.data[i]
            i = parent

    def _down(self, i):
        n = len(self.data)
        while True:
            smallest = i
            for c in (2 * i + 1, 2 * i + 2):
                if c < n and self.data[c] < self.data[smallest]:
                    smallest = c
            if smallest == i:
                return
            self.data[i], self.data[smallest] = self.data[smallest], self.data[i]
            i = smallest`,
post:RAISES+`def _t1():
    h = MinHeap()
    for x in [5, 3, 8, 1, 9, 2]:
        h.push(x)
    first = (h.peek(), len(h))
    return (first, [h.pop() for _ in range(6)])
def _t2():
    h = MinHeap()
    return (_raises(h.pop), _raises(h.peek))
def _t3():
    import random
    rnd = random.Random(7)
    vals = [rnd.randint(-1000, 1000) for _ in range(3000)]
    h = MinHeap()
    for v in vals:
        h.push(v)
    return [h.pop() for _ in range(len(vals))] == sorted(vals)
def _t4():
    h = MinHeap()
    for x in [4, 4, 1, 4]:
        h.push(x)
    return [h.pop() for _ in range(4)]`,
tests:[['_t1()','((1, 6), [1, 2, 3, 5, 8, 9])','','push six numbers, pop them in order'],['_t2()','("IndexError", "IndexError")','','empty heap'],['_t3()','True','','3,000 random numbers come out sorted'],['_t4()','[1, 4, 4, 4]','','duplicates']],
hints:['Bubble up: while the item is smaller than its parent, swap with the parent.','Bubble down: swap with the SMALLER child while that child is smaller than the item.'],approach:'Complete binary tree in a list; each fix walks one root-to-leaf path.',cx:'O(log n) push/pop, O(1) peek'});

B('trie',{id:'build-trie',d:2,title:'Build a Trie',prompt:'<p>Implement a prefix tree for lowercase words. Each node has a dict of children and an end-of-word flag.</p>',
req:['<code>insert(word)</code>','<code>search(word)</code> → True only for whole inserted words','<code>starts_with(prefix)</code> → True if any word has this prefix','<code>words_with_prefix(prefix)</code> → all inserted words with this prefix, sorted (autocomplete)'],
starter:`class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        pass

    def _walk(self, prefix):
        """Return the node reached by following prefix, or None."""
        pass

    def search(self, word):
        pass

    def starts_with(self, prefix):
        pass

    def words_with_prefix(self, prefix):
        pass`,
solution:`class TrieNode:
    def __init__(self):
        self.children = {}
        self.end = False


class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word):
        node = self.root
        for ch in word:
            node = node.children.setdefault(ch, TrieNode())
        node.end = True

    def _walk(self, prefix):
        node = self.root
        for ch in prefix:
            node = node.children.get(ch)
            if node is None:
                return None
        return node

    def search(self, word):
        node = self._walk(word)
        return node is not None and node.end

    def starts_with(self, prefix):
        return self._walk(prefix) is not None

    def words_with_prefix(self, prefix):
        out = []
        def dfs(node, path):
            if node.end:
                out.append(path)
            for ch in sorted(node.children):
                dfs(node.children[ch], path + ch)
        start = self._walk(prefix)
        if start:
            dfs(start, prefix)
        return out`,
post:`def _make():
    t = Trie()
    for w in ["cat", "car", "care", "dog"]:
        t.insert(w)
    return t
def _t1():
    t = _make()
    return (t.search("car"), t.search("ca"), t.search("care"), t.search("cars"))
def _t2():
    t = _make()
    return (t.starts_with("ca"), t.starts_with("do"), t.starts_with("x"), t.starts_with(""))
def _t3():
    t = _make()
    return (t.words_with_prefix("car"), t.words_with_prefix("c"), t.words_with_prefix("z"))`,
tests:[['_t1()','(True, False, True, False)','','search finds whole words only'],['_t2()','(True, True, False, True)','','starts_with'],['_t3()','(["car", "care"], ["car", "care", "cat"], [])','','autocomplete']],
hints:['insert: walk character by character, creating missing children; mark the last node as end.','search and starts_with both walk the prefix; search also requires node.end.'],approach:'One node per character; shared prefixes share nodes.',cx:'O(L) per insert/search for a word of length L'});

B('graphs',{id:'build-graph',d:2,title:'Build a Graph (adjacency list)',prompt:'<p>Implement an undirected graph stored as an adjacency list (dict of sets).</p>',
req:['<code>add_edge(u, v)</code> (adds both nodes if new)','<code>neighbors(u)</code> → sorted list','<code>has_edge(u, v)</code>','<code>bfs(start)</code> and <code>dfs(start)</code> → visit order, exploring neighbors in sorted order (dfs is recursive preorder)','<code>has_path(u, v)</code>'],
starter:`from collections import deque


class Graph:
    def __init__(self):
        self.adj = {}

    def add_edge(self, u, v):
        pass

    def neighbors(self, u):
        pass

    def has_edge(self, u, v):
        pass

    def bfs(self, start):
        pass

    def dfs(self, start):
        pass

    def has_path(self, u, v):
        pass`,
solution:`from collections import deque


class Graph:
    def __init__(self):
        self.adj = {}

    def add_edge(self, u, v):
        self.adj.setdefault(u, set()).add(v)
        self.adj.setdefault(v, set()).add(u)

    def neighbors(self, u):
        return sorted(self.adj.get(u, ()))

    def has_edge(self, u, v):
        return v in self.adj.get(u, ())

    def bfs(self, start):
        order, seen = [], {start}
        queue = deque([start])
        while queue:
            u = queue.popleft()
            order.append(u)
            for v in self.neighbors(u):
                if v not in seen:
                    seen.add(v)          # mark when queued, not when visited
                    queue.append(v)
        return order

    def dfs(self, start):
        order, seen = [], set()
        def go(u):
            seen.add(u)
            order.append(u)
            for v in self.neighbors(u):
                if v not in seen:
                    go(v)
        go(start)
        return order

    def has_path(self, u, v):
        if u not in self.adj or v not in self.adj:
            return u == v
        return v in self.bfs(u)`,
post:`def _make():
    g = Graph()
    for u, v in [(1, 2), (1, 3), (2, 4), (3, 4), (4, 5), (6, 7)]:
        g.add_edge(u, v)
    return g
def _t1():
    g = _make()
    return (g.neighbors(4), g.has_edge(2, 1), g.has_edge(1, 4))
def _t2():
    return _make().bfs(1)
def _t3():
    return _make().dfs(1)
def _t4():
    g = _make()
    return (g.has_path(1, 5), g.has_path(1, 7), g.has_path(6, 7))`,
tests:[['_t1()','([2, 3, 5], True, False)','','neighbors and edges (undirected)'],['_t2()','[1, 2, 3, 4, 5]','','bfs from 1'],['_t3()','[1, 2, 4, 3, 5]','','dfs from 1'],['_t4()','(True, False, True)','','paths across components']],
hints:['Undirected: add v to u’s set AND u to v’s set.','BFS: a deque plus a seen set; mark nodes when you enqueue them. DFS: recursion plus a seen set.'],approach:'Dict of neighbor sets; BFS with a queue, DFS with recursion.',cx:'O(V + E) for traversals'});

B('advgraphs',{id:'build-union-find',d:2,title:'Build Union-Find (Disjoint Set Union)',prompt:'<p>Track which of n elements (0..n − 1) are connected as you merge groups.</p>',
req:['<code>UnionFind(n)</code>: every element starts in its own group','<code>find(x)</code> → the representative (root) of x’s group, with path compression','<code>union(a, b)</code> → True if two groups were merged, False if already together; union by size','<code>connected(a, b)</code>','<code>self.count</code>: number of groups'],
starter:`class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.count = n

    def find(self, x):
        pass

    def union(self, a, b):
        pass

    def connected(self, a, b):
        pass`,
solution:`class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.size = [1] * n
        self.count = n

    def find(self, x):
        root = x
        while self.parent[root] != root:
            root = self.parent[root]
        while self.parent[x] != root:          # path compression
            self.parent[x], x = root, self.parent[x]
        return root

    def union(self, a, b):
        ra, rb = self.find(a), self.find(b)
        if ra == rb:
            return False
        if self.size[ra] < self.size[rb]:      # attach the smaller tree under the larger
            ra, rb = rb, ra
        self.parent[rb] = ra
        self.size[ra] += self.size[rb]
        self.count -= 1
        return True

    def connected(self, a, b):
        return self.find(a) == self.find(b)`,
post:`def _t1():
    uf = UnionFind(5)
    return (uf.union(0, 1), uf.union(1, 2), uf.union(0, 2), uf.connected(0, 2), uf.connected(0, 3), uf.count)
def _t2():
    uf = UnionFind(4)
    uf.union(0, 1)
    uf.union(2, 3)
    uf.union(1, 3)
    return (uf.count, len({uf.find(i) for i in range(4)}))
def _t3():
    n = 100000
    uf = UnionFind(n)
    for i in range(n - 1):
        uf.union(i, i + 1)
    return (uf.count, uf.connected(0, n - 1))`,
tests:[['_t1()','(True, True, False, True, False, 3)','','union, re-union, connected, count'],['_t2()','(1, 1)','','everything merged into one group'],['_t3()','(1, True)','','a 100,000-element chain (must be fast)']],
hints:['find: follow parent pointers until a node is its own parent.','Path compression: after finding the root, point every node on the path directly at it. Union by size keeps trees shallow.'],approach:'Parent array forest; path compression + union by size give near-constant time.',cx:'O(α(n)) amortized per operation (practically constant)'});

B('linkedlist',{id:'build-lru',d:3,title:'Build an LRU Cache',prompt:'<p>A cache with a fixed capacity that evicts the <b>least recently used</b> key when full. Both <code>get</code> and <code>put</code> must be O(1).</p>',
req:['<code>LRUCache(capacity)</code>','<code>get(key)</code> → value or -1; a successful get makes the key most recently used','<code>put(key, value)</code> inserts or updates (and marks as most recent); if over capacity, evict the least recently used key','O(1) per operation: a dict for lookup + a doubly linked list for recency (or OrderedDict, if you can explain how it works)'],
starter:`class Node:
    def __init__(self, key=None, val=None):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.map = {}                       # key -> Node
        self.head, self.tail = Node(), Node()   # sentinels: head side = most recent
        self.head.next, self.tail.prev = self.tail, self.head

    def get(self, key):
        pass

    def put(self, key, value):
        pass`,
solution:`class Node:
    def __init__(self, key=None, val=None):
        self.key = key
        self.val = val
        self.prev = None
        self.next = None


class LRUCache:
    def __init__(self, capacity):
        self.cap = capacity
        self.map = {}
        self.head, self.tail = Node(), Node()
        self.head.next, self.tail.prev = self.tail, self.head

    def _unlink(self, node):
        node.prev.next = node.next
        node.next.prev = node.prev

    def _push_front(self, node):
        node.prev, node.next = self.head, self.head.next
        self.head.next.prev = node
        self.head.next = node

    def get(self, key):
        node = self.map.get(key)
        if node is None:
            return -1
        self._unlink(node)
        self._push_front(node)            # now the most recently used
        return node.val

    def put(self, key, value):
        if key in self.map:
            node = self.map[key]
            node.val = value
            self._unlink(node)
            self._push_front(node)
            return
        node = Node(key, value)
        self.map[key] = node
        self._push_front(node)
        if len(self.map) > self.cap:
            lru = self.tail.prev           # least recently used sits at the tail
            self._unlink(lru)
            del self.map[lru.key]`,
post:`def _t1():
    c = LRUCache(2)
    c.put(1, 1)
    c.put(2, 2)
    a = c.get(1)        # 1 is now most recent
    c.put(3, 3)         # evicts 2
    b = c.get(2)
    c.put(4, 4)         # evicts 1
    return [a, b, c.get(1), c.get(3), c.get(4)]
def _t2():
    c = LRUCache(2)
    c.put(1, 1)
    c.put(2, 2)
    c.put(1, 10)        # update makes 1 most recent
    c.put(3, 3)         # evicts 2
    return [c.get(1), c.get(2), c.get(3)]
def _t3():
    c = LRUCache(1)
    c.put(1, 1)
    c.put(2, 2)
    return [c.get(1), c.get(2)]
def _t4():
    c = LRUCache(1000)
    for i in range(100000):
        c.put(i, i)
        c.get(i // 2)
    return (c.get(99999), c.get(0))`,
tests:[['_t1()','[1, -1, -1, 3, 4]','','the classic sequence'],['_t2()','[10, -1, 3]','','put on an existing key refreshes it'],['_t3()','[-1, 2]','','capacity 1'],['_t4()','(99999, -1)','','100,000 operations (must be O(1) each)']],
hints:['A dict gives O(1) lookup, but how do you find the least recently used key in O(1)?','Keep nodes in a doubly linked list ordered by recency. On every access, move the node to the front; evict from the back.'],approach:'Hash map key → node, plus a doubly linked list with sentinels ordered by recency.',cx:'O(1) per get/put'});
})();
