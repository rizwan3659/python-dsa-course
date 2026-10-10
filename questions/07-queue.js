/* Topic 7 · Queue & deque. */
COURSE.qs('queue',[
{id:'q-p1',type:'predict',d:1,p:'queue',title:'Both ends of a deque',code:`from collections import deque
d = deque([1, 2, 3])
d.append(4)
d.popleft()
d.appendleft(0)
print(list(d))`,a:'[0, 2, 3, 4]',why:'append/pop work on the right, appendleft/popleft on the left, all O(1).'},
{id:'q-p2',type:'predict',d:2,p:'queue',title:'rotate',code:`from collections import deque
d = deque([1, 2, 3, 4])
d.rotate(1)
print(list(d))`,a:'[4, 1, 2, 3]',why:'rotate(1) moves the last item to the front; rotate(−1) moves the first to the back.'},
{id:'q-p3',type:'predict',d:1,p:'queue',title:'A deque with maxlen',code:`from collections import deque
d = deque(maxlen=3)
for i in range(5):
    d.append(i)
print(list(d))`,a:'[2, 3, 4]',why:'When full, appending on the right drops an item from the left: perfect for “the last k events”.'},
{id:'q-p4',type:'predict',d:1,p:'queue',title:'First in, first out',code:`from collections import deque
q = deque()
for x in "abc":
    q.append(x)
print(q.popleft() + q.popleft())`,a:'ab',why:'The first two items added are the first two removed.'},
{id:'q-p5',type:'predict',d:1,p:'queue',title:'A list as a queue',code:`q = [1, 2, 3]
q.append(4)
q.pop(0)
print(q)`,a:'[2, 3, 4]',why:'Correct, but <code>pop(0)</code> shifts every remaining element: O(n).'},
{id:'q-p6',type:'predict',d:2,p:'queue',title:'Hot potato',code:`from collections import deque
q = deque(range(1, 6))
while len(q) > 1:
    q.rotate(-2)
    q.popleft()
print(q[0])`,a:'4',hints:['Trace it: rotate(−2) moves two people from the front to the back, then the front person leaves.'],why:'Removed in order: 3, 1, 5, 2. Person 4 survives (the Josephus problem with k = 3).'},
{id:'q-p7',type:'predict',d:1,p:'queue',title:'Where is the next slot?',code:`k = 5
head = 3
count = 4
print((head + count) % k)`,a:'2',why:'Slots 3, 4, 0, 1 are used; the next free slot wraps around to 2.'},
{id:'q-p8',type:'predict',d:1,p:'queue',title:'Empty deque',code:`from collections import deque
print(deque().popleft())`,opts:['None','IndexError','0','deque([])'],a:1,why:'Check <code>if q:</code> first.'},
{id:'q-c1',type:'complexity',d:1,p:'queue',title:'popleft in a loop',code:`from collections import deque
q = deque(items)
while q:
    process(q.popleft())`,a:'O(n)',why:'O(1) per popleft.'},
{id:'q-c2',type:'complexity',d:2,p:'queue',title:'pop(0) in a loop',code:`q = list(items)
while q:
    process(q.pop(0))`,a:'O(n²)',why:'Each pop(0) shifts the rest: (n − 1) + (n − 2) + … ≈ n²/2.'},
{id:'q-c3',type:'complexity',d:3,p:'queue',title:'Indexing the middle of a deque',code:`middle = d[len(d) // 2]`,a:'O(n)',why:'A deque is a linked structure of blocks: fast at the ends, but reaching the middle walks there. Use a list for random access.'},
{id:'q-c4',type:'complexity',d:2,p:'queue',title:'Sliding window maximum',q:'Monotonic-deque solution for n numbers and window size k. Total time?',code:`for i, x in enumerate(nums):
    while dq and nums[dq[-1]] <= x:
        dq.pop()
    dq.append(i)
    if dq[0] <= i - k:
        dq.popleft()`,opts:['O(n)','O(n · k)','O(n log n)','O(k)'],a:'O(n)',why:'Each index is appended once and removed at most once.'},
{id:'q-c5',type:'complexity',d:2,p:'design',title:'Queue from two stacks',q:'A queue built from two stacks (inbox/outbox). Total cost of n enqueues and n dequeues?',code:`def dequeue(self):
    if not self.outbox:
        while self.inbox:
            self.outbox.append(self.inbox.pop())
    return self.outbox.pop()`,opts:['O(n)','O(n²)','O(n log n)','O(1)'],a:'O(n)',why:'Each element moves inbox → outbox exactly once. O(1) amortized per operation.'},
{id:'q-m1',type:'mcq',d:1,p:'queue',title:'FIFO',q:'FIFO means…',opts:['First in, first out','Fast in, fast out','First index, final output','Fixed input, flexible output'],a:0,why:'Like a line at a shop.'},
{id:'q-m2',type:'mcq',d:1,p:'queue',title:'Why not list.pop(0)?',q:'Why is <code>list.pop(0)</code> a poor way to dequeue?',opts:['It removes the wrong end','Every remaining element shifts one place: O(n)','It raises an error','Lists cannot shrink'],a:1,why:'Use <code>collections.deque.popleft()</code>: O(1).'},
{id:'q-m3',type:'mcq',d:1,p:'bfs',title:'Which traversal uses a queue?',q:'Exploring a graph level by level (closest nodes first) uses…',opts:['A stack','A queue','A heap','A set only'],a:1,why:'Breadth-first search: nodes are processed in the order they were discovered.'},
{id:'q-m4',type:'mcq',d:2,p:'queue',title:'Circular queue: full or empty?',q:'In a circular queue with head and tail indexes only, head == tail could mean full OR empty. The simplest fix?',opts:['Never fill it','Also keep a count of items','Use negative indexes','Restart from 0 each time'],a:1,why:'count == 0 is empty, count == k is full. (Leaving one slot unused also works.)'},
{id:'q-m5',type:'mcq',d:1,p:'queue',title:'deque',q:'What does “deque” stand for?',opts:['Delete queue','Double-ended queue','Dequeue only','Decimal queue'],a:1,why:'O(1) insertion and removal at both ends.'},
{id:'q-ch1',type:'choose',d:1,p:'queue',title:'Print jobs',q:'Print jobs must run in the order they were submitted.',opts:['Stack','Queue','Set','Dict'],a:1,why:'FIFO.'},
{id:'q-ch2',type:'choose',d:1,p:'queue',title:'The last 100 events',q:'Keep only the most recent 100 log lines, dropping older ones automatically.',opts:['list with insert(0, x)','deque(maxlen=100)','set','heap'],a:1,why:'A bounded deque drops from the other end in O(1).'},
{id:'q-ch3',type:'choose',d:2,p:'queue',title:'Both ends, fast',q:'A palindrome checker that repeatedly removes one character from each end.',opts:['list with pop(0)','deque','set','Counter'],a:1,why:'popleft and pop are both O(1) on a deque.'},
{id:'q-dr1',type:'dryrun',d:1,p:'queue',title:'Append, sometimes popleft',code:`from collections import deque
q = deque()
for x in [1, 2, 3, 4]:
    q.append(x)
    if x % 2 == 0:
        q.popleft()`,cols:['x','list(q)'],given:[0],rows:[['1','[1]'],['2','[2]'],['3','[2, 3]'],['4','[3, 4]']],why:'Even x: append, then the oldest item leaves.'},
{id:'q-dr2',type:'dryrun',d:2,p:'queue',title:'Circular queue indexes',code:`k = 3
head = count = 0
for op in ["enq", "enq", "deq", "enq", "enq"]:
    if op == "enq":
        count += 1
    else:
        head = (head + 1) % k
        count -= 1`,cols:['op','head','count','(head + count) % k'],given:[0],rows:[['enq','0','1','1'],['enq','0','2','2'],['deq','1','1','2'],['enq','1','2','0'],['enq','1','3','1']],why:'The next free slot wraps to 0 after the fourth operation: no element ever moves.'},
{id:'q-b1',type:'blanks',d:1,p:'queue',title:'Complete RecentCounter',code:`from collections import deque

class RecentCounter:
    """ping(t) returns how many pings happened in [t - 3000, t]."""
    def __init__(self):
        self.q = deque()

    def ping(self, t):
        self.q.append(t)
        while ______:
            ______
        return len(self.q)`,blanks:[['self.q[0] < t - 3000'],['self.q.popleft()']],post:`def _t():
    r = RecentCounter()
    return [r.ping(t) for t in (1, 100, 3001, 3002)]`,tests:[['_t()','[1, 2, 3, 3]']],why:'Old pings leave from the front; times arrive in increasing order, so the front is always the oldest.'},
{id:'q-b2',type:'blanks',d:2,p:'design',title:'Complete the two-stack queue',code:`class Queue:
    def __init__(self):
        self.inbox, self.outbox = [], []

    def enqueue(self, x):
        self.inbox.append(x)

    def dequeue(self):
        if not self.outbox:
            while ______:
                self.outbox.append(______)
        return self.outbox.pop()`,blanks:[['self.inbox'],['self.inbox.pop()']],post:`def _t():
    q = Queue()
    q.enqueue(1); q.enqueue(2)
    a = q.dequeue()
    q.enqueue(3)
    return [a, q.dequeue(), q.dequeue()]`,tests:[['_t()','[1, 2, 3]']],why:'Only refill the outbox when it is empty, otherwise newer items would jump ahead.'},
{id:'q-d1',type:'debug',d:1,p:'queue',title:'A queue that is a stack',code:`class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, x):
        self.items.append(x)

    def dequeue(self):
        return self.items.pop()`,opts:['append should be insert','pop() removes the NEWEST item: this is LIFO, not FIFO','items should be a tuple','Nothing is wrong'],a:1,why:'Use a deque and popleft (or pop(0) if you accept O(n)).',fix:`from collections import deque

class Queue:
    def __init__(self):
        self.items = deque()

    def enqueue(self, x):
        self.items.append(x)

    def dequeue(self):
        return self.items.popleft()`,post:`def _t():
    q = Queue()
    q.enqueue(1); q.enqueue(2)
    return q.dequeue()`,tests:[['_t()','1']]},
{id:'q-d2',type:'debug',d:2,p:'queue',title:'Rear of a circular queue',code:`class CircularQueue:
    def __init__(self, k):
        self.data = [None] * k
        self.head = self.count = 0

    def enqueue(self, x):
        self.data[(self.head + self.count) % len(self.data)] = x
        self.count += 1

    def rear(self):
        return self.data[(self.head + self.count) % len(self.data)]`,opts:['enqueue writes to the wrong slot','rear() looks one slot past the last item: it should use head + count - 1','head should start at 1','% should be //'],a:1,why:'(head + count) is the NEXT free slot. The last item is one before it.',fix:`class CircularQueue:
    def __init__(self, k):
        self.data = [None] * k
        self.head = self.count = 0

    def enqueue(self, x):
        self.data[(self.head + self.count) % len(self.data)] = x
        self.count += 1

    def rear(self):
        return self.data[(self.head + self.count - 1) % len(self.data)]`,post:`def _t():
    q = CircularQueue(3)
    q.enqueue(7); q.enqueue(8)
    return q.rear()`,tests:[['_t()','8']]},
{id:'q-d3',type:'debug',d:2,p:'design',title:'Two stacks, wrong order',code:`class Queue:
    def __init__(self):
        self.inbox, self.outbox = [], []

    def enqueue(self, x):
        self.inbox.append(x)

    def dequeue(self):
        while self.inbox:
            self.outbox.append(self.inbox.pop())
        return self.outbox.pop()`,opts:['It moves items even when the outbox still has older items, so new items jump the line','pop should be pop(0)','enqueue should use the outbox','It is correct'],a:0,why:'Enqueue 1, 2; dequeue → 1; enqueue 3; dequeue should be 2 but returns 3. Only refill when the outbox is empty.',fix:`class Queue:
    def __init__(self):
        self.inbox, self.outbox = [], []

    def enqueue(self, x):
        self.inbox.append(x)

    def dequeue(self):
        if not self.outbox:
            while self.inbox:
                self.outbox.append(self.inbox.pop())
        return self.outbox.pop()`,post:`def _t():
    q = Queue()
    q.enqueue(1); q.enqueue(2)
    a = q.dequeue()
    q.enqueue(3)
    return [a, q.dequeue()]`,tests:[['_t()','[1, 2]']]},
{id:'q-recent-counter',type:'code',d:1,p:'queue',title:'Number of Recent Calls',prompt:'<p>Write <code>RecentCounter</code> with <code>ping(t)</code> that records a call at time t (ms, strictly increasing) and returns how many calls happened in the last 3000 ms, i.e. in <code>[t - 3000, t]</code>.</p>',starter:`class RecentCounter:
    def __init__(self):
        pass

    def ping(self, t):
        pass`,solution:`from collections import deque

class RecentCounter:
    def __init__(self):
        self.q = deque()

    def ping(self, t):
        self.q.append(t)
        while self.q[0] < t - 3000:
            self.q.popleft()
        return len(self.q)`,post:`def _t():
    r = RecentCounter()
    return [r.ping(t) for t in (1, 100, 3001, 3002, 10000)]`,tests:[['_t()','[1, 2, 3, 3, 1]']],hints:['Old calls leave from the front, new ones join at the back.'],approach:'Deque of timestamps; drop expired ones from the left.',cx:'O(1) amortized per ping'},
{id:'q-moving-avg',type:'code',d:1,p:'queue',title:'Moving Average',prompt:'<p><code>MovingAverage(size)</code>; <code>next(val)</code> returns the average of the last <code>size</code> values (or fewer at the start).</p>',starter:`class MovingAverage:
    def __init__(self, size):
        pass

    def next(self, val):
        pass`,solution:`from collections import deque

class MovingAverage:
    def __init__(self, size):
        self.q = deque()
        self.size = size
        self.total = 0

    def next(self, val):
        self.q.append(val)
        self.total += val
        if len(self.q) > self.size:
            self.total -= self.q.popleft()
        return self.total / len(self.q)`,post:`def _t():
    m = MovingAverage(3)
    return [m.next(v) for v in (1, 10, 3, 5)]`,tests:[['_t()','[1.0, 5.5, 14 / 3, 6.0]']],hints:['Keep a running total so you never re-add the window.'],approach:'Deque window + running sum.',cx:'O(1) per call'},
{id:'q-stack-from-queue',type:'code',d:1,p:'design',title:'Stack Using a Queue',prompt:'<p>Implement a stack (<code>push</code>, <code>pop</code>, <code>top</code>, <code>empty</code>) using only queue operations on a deque: <code>append</code>, <code>popleft</code>, <code>len</code>, <code>q[0]</code>.</p>',starter:`from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x):
        pass

    def pop(self):
        pass

    def top(self):
        pass

    def empty(self):
        pass`,solution:`from collections import deque

class MyStack:
    def __init__(self):
        self.q = deque()

    def push(self, x):
        self.q.append(x)
        for _ in range(len(self.q) - 1):    # rotate so x is at the front
            self.q.append(self.q.popleft())

    def pop(self):
        return self.q.popleft()

    def top(self):
        return self.q[0]

    def empty(self):
        return not self.q`,post:`def _t():
    s = MyStack()
    s.push(1); s.push(2); s.push(3)
    return [s.top(), s.pop(), s.pop(), s.empty(), s.pop(), s.empty()]`,tests:[['_t()','[3, 3, 2, False, 1, True]']],hints:['After each push, move all the older items behind the new one.'],approach:'Rotate on push so the newest item is always at the front.',cx:'push O(n), pop O(1)'},
{id:'q-josephus',type:'code',d:2,p:'queue',title:'Find the Winner of the Circular Game',prompt:'<p>n friends 1..n sit in a circle. Counting k friends clockwise (including the current one), the k-th leaves; counting restarts from the next friend. Return the winner.</p><p><code>find_winner(5, 2)</code> → <code>3</code></p>',starter:`def find_winner(n, k):
    pass`,solution:`from collections import deque

def find_winner(n, k):
    q = deque(range(1, n + 1))
    while len(q) > 1:
        q.rotate(-(k - 1))      # skip k - 1 friends
        q.popleft()             # the k-th leaves
    return q[0]`,tests:[['find_winner(5, 2)','3'],['find_winner(6, 5)','1'],['find_winner(1, 3)','1'],['find_winner(5, 3)','4']],hints:['Simulate the circle with a deque.','Moving k − 1 friends from front to back puts the k-th at the front.'],approach:'Deque simulation with rotate (O(n·k)); a math recurrence gives O(n).',cx:'O(n · k) time'},
{id:'q-tickets',type:'code',d:1,p:'queue',title:'Time Needed to Buy Tickets',prompt:'<p>People queue for tickets; <code>tickets[i]</code> is how many person i wants. Each second the front person buys one and goes to the back (or leaves if done). How many seconds until person k is done?</p>',starter:`def time_required(tickets, k):
    pass`,solution:`def time_required(tickets, k):
    total = 0
    for i, t in enumerate(tickets):
        if i <= k:
            total += min(t, tickets[k])
        else:
            total += min(t, tickets[k] - 1)
    return total`,tests:[['time_required([2, 3, 2], 2)','6'],['time_required([5, 1, 1, 1], 0)','8'],['time_required([1], 0)','1']],hints:['A deque simulation works.','Shortcut: people before k buy at most tickets[k]; people after k buy at most tickets[k] − 1.'],approach:'Simulate with a deque, or count directly in O(n).',cx:'O(n) time (direct count)'},
{id:'q-interleave',type:'code',d:1,p:'queue',title:'Interleave the Two Halves',prompt:'<p>Given an even-length list, return the first and second halves interleaved: <code>[1, 2, 3, 4, 5, 6]</code> → <code>[1, 4, 2, 5, 3, 6]</code>. Use queues.</p>',starter:`def interleave(items):
    pass`,solution:`from collections import deque

def interleave(items):
    half = len(items) // 2
    a, b = deque(items[:half]), deque(items[half:])
    out = []
    while a:
        out.append(a.popleft())
        out.append(b.popleft())
    return out`,tests:[['interleave([1, 2, 3, 4, 5, 6])','[1, 4, 2, 5, 3, 6]'],['interleave([])','[]'],['interleave(["a", "b"])','["a", "b"]']],hints:['Two queues, take from each in turn.'],approach:'Split into two deques and alternate popleft.',cx:'O(n) time'},
{id:'q-reveal-cards',type:'code',d:2,p:'queue',title:'Reveal Cards in Increasing Order',prompt:'<p>Order a deck so that repeatedly “reveal the top card, then move the next top card to the bottom” reveals the cards in increasing order.</p><p><code>[17, 13, 11, 2, 3, 5, 7]</code> → <code>[2, 13, 3, 11, 5, 17, 7]</code></p>',starter:`def deck_revealed_increasing(deck):
    pass`,solution:`from collections import deque

def deck_revealed_increasing(deck):
    n = len(deck)
    positions = deque(range(n))       # simulate the process on indexes
    result = [None] * n
    for card in sorted(deck):
        result[positions.popleft()] = card   # this position is revealed next
        if positions:
            positions.append(positions.popleft())
    return result`,tests:[['deck_revealed_increasing([17, 13, 11, 2, 3, 5, 7])','[2, 13, 3, 11, 5, 17, 7]'],['deck_revealed_increasing([1, 1000])','[1, 1000]'],['deck_revealed_increasing([3])','[3]']],hints:['Simulate the reveal process on POSITIONS 0..n − 1 with a queue.','The k-th position revealed should receive the k-th smallest card.'],approach:'Queue of indexes simulates the order positions are revealed.',cx:'O(n log n) time'},
{id:'q-first-negative',type:'code',d:2,p:'queue',title:'First Negative in Every Window',prompt:'<p>For every window of size k, return its first negative number, or 0 if it has none.</p><p><code>([-8, 2, 3, -6, 10], 2)</code> → <code>[-8, 0, -6, -6]</code></p>',starter:`def first_negatives(nums, k):
    pass`,solution:`from collections import deque

def first_negatives(nums, k):
    negs = deque()                 # indexes of negatives in the window
    out = []
    for i, x in enumerate(nums):
        if x < 0:
            negs.append(i)
        if negs and negs[0] <= i - k:
            negs.popleft()
        if i >= k - 1:
            out.append(nums[negs[0]] if negs else 0)
    return out`,tests:[['first_negatives([-8, 2, 3, -6, 10], 2)','[-8, 0, -6, -6]'],['first_negatives([12, -1, -7, 8, -15, 30, 16, 28], 3)','[-1, -1, -7, -15, -15, 0]'],['first_negatives([1, 2], 1)','[0, 0]']],hints:['Keep the indexes of negatives inside the window in a queue.','Drop the front when it slides out.'],approach:'Deque of negative indexes for the current window.',cx:'O(n) time'},
{id:'q-window-max',type:'code',d:3,p:'queue',title:'Sliding Window Maximum',prompt:'<p>Return the maximum of every window of size k.</p><p><code>([1, 3, -1, -3, 5, 3, 6, 7], 3)</code> → <code>[3, 3, 5, 5, 6, 7]</code></p>',starter:`def max_sliding_window(nums, k):
    pass`,solution:`from collections import deque

def max_sliding_window(nums, k):
    dq, out = deque(), []          # indexes, values decreasing
    for i, x in enumerate(nums):
        while dq and nums[dq[-1]] <= x:
            dq.pop()
        dq.append(i)
        if dq[0] <= i - k:
            dq.popleft()
        if i >= k - 1:
            out.append(nums[dq[0]])
    return out`,brute:{code:`def max_sliding_window(nums, k):
    return [max(nums[i:i + k]) for i in range(len(nums) - k + 1)]`,cx:'O(n · k)'},tests:[['max_sliding_window([1, 3, -1, -3, 5, 3, 6, 7], 3)','[3, 3, 5, 5, 6, 7]'],['max_sliding_window([1], 1)','[1]'],['max_sliding_window([9, 8, 7], 2)','[9, 8]'],['max_sliding_window(list(range(100000)), 50000)','list(range(49999, 100000))','','100,000 numbers, k = 50,000 (must be fast)']],hints:['max() of every window is O(n · k).','A smaller value to the LEFT of a bigger one can never be a window maximum again: throw it away. Keep a deque of indexes with decreasing values.'],approach:'Monotonic decreasing deque of indexes; the front is the max.',cx:'O(n) time, O(k) space'}
]);
