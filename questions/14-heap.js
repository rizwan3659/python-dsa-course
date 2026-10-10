/* Topic 14 · Heap / priority queue. */
COURSE.qs('heap',[
{id:'hp-p1',type:'predict',d:1,p:'heap-topk',title:'Push, then pop',code:`import heapq
h = []
for x in [5, 1, 8, 3]:
    heapq.heappush(h, x)
print(heapq.heappop(h), h[0])`,a:'1 3',why:'heapq is a min-heap: pop returns the smallest, and h[0] is always the new smallest.'},
{id:'hp-p2',type:'predict',d:1,p:'heap-topk',title:'heapify',code:`import heapq
a = [5, 3, 8, 1]
heapq.heapify(a)
print(a[0])`,a:'1',why:'heapify rearranges the list in place in O(n) so that a[0] is the minimum.'},
{id:'hp-p3',type:'predict',d:1,p:'heap-topk',title:'nlargest',code:`import heapq
print(heapq.nlargest(2, [4, 1, 7, 3]))`,a:'[7, 4]',why:'nlargest / nsmallest use a heap internally: O(n log k).'},
{id:'hp-p4',type:'predict',d:1,p:'heap-topk',title:'A max-heap with heapq',code:`import heapq
h = []
for x in [4, 9, 2]:
    heapq.heappush(h, -x)
print(-heapq.heappop(h))`,a:'9',why:'Store negatives: the smallest negative is the largest original value.'},
{id:'hp-p5',type:'predict',d:1,p:'heap-topk',title:'Priorities as tuples',code:`import heapq
tasks = []
heapq.heappush(tasks, (2, "write"))
heapq.heappush(tasks, (1, "plan"))
heapq.heappush(tasks, (3, "test"))
print([heapq.heappop(tasks)[1] for _ in range(3)])`,a:"['plan', 'write', 'test']",why:'Tuples compare by their first item: the priority.'},
{id:'hp-p6',type:'predict',d:2,p:'heap-topk',title:'A heap is not sorted',code:`import heapq
a = [3, 1, 2]
heapq.heapify(a)
print(a)`,a:'[1, 3, 2]',why:'Only the heap property holds (parent ≤ children). The list as a whole is not sorted.'},
{id:'hp-p7',type:'predict',d:1,p:'heap-topk',title:'Index arithmetic',code:`i = 5
print((i - 1) // 2, 2 * i + 1, 2 * i + 2)`,a:'2 11 12',why:'Parent and children of index i in a list-based heap.'},
{id:'hp-p8',type:'predict',d:2,p:'heap-topk',title:'heappushpop',code:`import heapq
h = [1, 3, 5]
print(heapq.heappushpop(h, 4), h)`,a:'1 [3, 4, 5]',why:'Push 4, then pop the smallest (1), in one efficient step.'},
{id:'hp-c1',type:'complexity',d:1,p:'heap-topk',title:'heappush',code:`heapq.heappush(h, x)`,a:'O(log n)',why:'Bubble up at most the height of the tree.'},
{id:'hp-c2',type:'complexity',d:1,p:'heap-topk',title:'Peek the minimum',code:`smallest = h[0]`,a:'O(1)',why:'The minimum is always at index 0.'},
{id:'hp-c3',type:'complexity',d:2,p:'heap-topk',title:'heapify',code:`heapq.heapify(nums)`,a:'O(n)',why:'Most nodes are near the bottom and sift down only a little. The sum works out to O(n), better than n pushes (O(n log n)).'},
{id:'hp-c4',type:'complexity',d:2,p:'heap-topk',title:'Top k with a small heap',q:'Keep a min-heap of size k while scanning n numbers. Time?',code:`h = []
for x in nums:
    heapq.heappush(h, x)
    if len(h) > k:
        heapq.heappop(h)`,opts:['O(n)','O(n log k)','O(n log n)','O(k log n)'],a:1,why:'Each step costs O(log k) because the heap never grows past k + 1.'},
{id:'hp-c5',type:'complexity',d:2,p:'heap-topk',title:'Find an arbitrary value',code:`found = target in h      # h is a heap list`,a:'O(n)',why:'A heap only knows where the minimum is. Searching for anything else is a linear scan.'},
{id:'hp-m1',type:'mcq',d:1,p:'heap-topk',title:'The heap property',q:'In a min-heap…',opts:['The list is sorted','Every parent is ≤ its children','Left child < right child','All leaves are equal'],a:1,why:'That is all: siblings are not ordered relative to each other.'},
{id:'hp-m2',type:'mcq',d:1,p:'heap-topk',title:'Why a list works',q:'Why can a heap be stored in a plain list with no pointers?',opts:['It is always small','It is a complete binary tree, so node i’s children are at 2i + 1 and 2i + 2','Python lists are trees','Because it is sorted'],a:1,why:'Levels are filled left to right with no gaps.'},
{id:'hp-m3',type:'mcq',d:1,p:'heap-topk',title:'Max-heap in Python',q:'heapq only provides a min-heap. The usual way to get a max-heap?',opts:['heapq.maxheap()','Push negated values (or (-priority, item) tuples)','Sort after every push','Reverse the list'],a:1,why:'Negate on the way in and on the way out.'},
{id:'hp-m4',type:'mcq',d:2,p:'heap-topk',title:'Heap or sorted list?',q:'You repeatedly insert values and remove the minimum. Why prefer a heap over keeping a sorted list?',opts:['Heaps use less memory','Inserting into a sorted list is O(n) (shifting); a heap does insert and pop-min in O(log n)','Sorted lists cannot find the minimum','There is no difference'],a:1,why:'A heap does just enough ordering to know the minimum.'},
{id:'hp-ch1',type:'choose',d:1,p:'heap-topk',title:'Always the most urgent',q:'An emergency room must always treat the most urgent patient next, while new patients keep arriving.',opts:['Queue','Stack','Priority queue (heap)','Set'],a:2,why:'Priority, not arrival order.'},
{id:'hp-ch2',type:'choose',d:2,p:'heap-topk',title:'Top 10 of a huge stream',q:'Find the 10 largest values in a stream of 100 million numbers, using little memory.',opts:['Sort everything','A min-heap of size 10','A max-heap of all values','A dict'],a:1,why:'The heap’s root is the smallest of the current top 10: anything smaller can be ignored. O(n log 10), O(10) memory.'},
{id:'hp-ch3',type:'choose',d:2,p:'heap-topk',title:'Merging many sorted lists',q:'Merge k sorted lists into one sorted list.',opts:['Concatenate and sort','A heap holding the current front of each list','A stack','Two pointers only'],a:1,why:'Each step pops the smallest front and pushes that list’s next element: O(N log k).'},
{id:'hp-dr1',type:'dryrun',d:2,p:'heap-topk',title:'Pushing into a heap',code:`import heapq
h = []
for x in [5, 3, 8, 1]:
    heapq.heappush(h, x)`,cols:['x','h'],given:[0],rows:[['5','[5]'],['3','[3, 5]'],['8','[3, 5, 8]'],['1','[1, 3, 8, 5]']],why:'1 is appended at index 3, then bubbles up past 5 (index 1) and 3 (index 0).'},
{id:'hp-dr2',type:'dryrun',d:1,p:'heap-topk',title:'Popping everything',code:`import heapq
h = [1, 3, 8, 5]
out = []
while h:
    out.append(heapq.heappop(h))`,cols:['out','h'],rows:[['[1]','[3, 5, 8]'],['[1, 3]','[5, 8]'],['[1, 3, 5]','[8]'],['[1, 3, 5, 8]','[]']],why:'Popping everything returns the values in sorted order: that is heap sort.'},
{id:'hp-b1',type:'blanks',d:2,p:'heap-topk',title:'Complete kth_largest',code:`import heapq

def kth_largest(nums, k):
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k:
            ______
    return ______`,blanks:[['heapq.heappop(h)'],['h[0]']],tests:[['kth_largest([3, 2, 1, 5, 6, 4], 2)','5'],['kth_largest([1], 1)','1']],why:'The heap keeps the k largest values; its root is the smallest of them: the k-th largest.'},
{id:'hp-b2',type:'blanks',d:2,p:'heap-topk',title:'Complete bubble-up',code:`def push(heap, x):
    heap.append(x)
    i = len(heap) - 1
    while i > 0:
        parent = ______
        if heap[i] >= heap[parent]:
            break
        heap[i], heap[parent] = heap[parent], heap[i]
        i = ______
    return heap`,blanks:[['(i - 1) // 2'],['parent']],tests:[['push([2, 5, 4], 1)','[1, 2, 4, 5]'],['push([], 7)','[7]']],why:'Swap with the parent while smaller, then continue from the parent’s position.'},
{id:'hp-b3',type:'blanks',d:1,p:'heap-topk',title:'Complete the max-heap',code:`import heapq

def largest_three(nums):
    h = [______ for x in nums]
    heapq.heapify(h)
    return [______ for _ in range(3)]`,blanks:[['-x'],['-heapq.heappop(h)']],tests:[['largest_three([5, 1, 9, 3, 7])','[9, 7, 5]']],why:'Negate in, negate out.'},
{id:'hp-d1',type:'debug',d:1,p:'heap-topk',title:'The “largest” is the smallest',code:`import heapq

def largest(nums):
    h = list(nums)
    heapq.heapify(h)
    return heapq.heappop(h)`,opts:['heapify must come after pop','heapq is a MIN-heap: this returns the smallest value','list(nums) is wrong','pop needs an index'],a:1,why:'Negate the values, use max(), or heapq.nlargest(1, nums)[0].',fix:`import heapq

def largest(nums):
    h = [-x for x in nums]
    heapq.heapify(h)
    return -heapq.heappop(h)`,tests:[['largest([3, 9, 2])','9']]},
{id:'hp-d2',type:'debug',d:2,p:'heap-topk',title:'Sift down ignores a child',code:`def sift_down(a, i):
    n = len(a)
    while 2 * i + 1 < n:
        child = 2 * i + 1
        if a[child] >= a[i]:
            break
        a[i], a[child] = a[child], a[i]
        i = child
    return a`,opts:['The loop condition is wrong','It only ever looks at the LEFT child; it must swap with the smaller of the two children','It should start at the end','>= should be >'],a:1,why:'sift_down([9, 4, 1], 0) gives [4, 9, 1], and 4 > 1 breaks the heap.',fix:`def sift_down(a, i):
    n = len(a)
    while 2 * i + 1 < n:
        child = 2 * i + 1
        if child + 1 < n and a[child + 1] < a[child]:
            child += 1
        if a[child] >= a[i]:
            break
        a[i], a[child] = a[child], a[i]
        i = child
    return a`,tests:[['sift_down([9, 4, 1], 0)','[1, 4, 9]'],['sift_down([5, 2, 3, 4, 1], 0)','[2, 1, 3, 4, 5]']]},
{id:'hp-d3',type:'debug',d:2,p:'heap-topk',title:'Equal priorities crash',code:`import heapq

def schedule(jobs):
    h = []
    for priority, job in jobs:        # job is a dict
        heapq.heappush(h, (priority, job))
    return [heapq.heappop(h)[1]["name"] for _ in range(len(h))]`,opts:['heappush needs a key argument','When two priorities are equal, Python compares the dicts next, and dicts cannot be ordered: TypeError','The list comprehension is wrong','Priorities must be negative'],a:1,why:'Add a unique tie-breaker: (priority, counter, job).',fix:`import heapq
from itertools import count

def schedule(jobs):
    h, tie = [], count()
    for priority, job in jobs:
        heapq.heappush(h, (priority, next(tie), job))
    return [heapq.heappop(h)[2]["name"] for _ in range(len(h))]`,tests:[['schedule([(1, {"name": "a"}), (1, {"name": "b"}), (0, {"name": "c"})])','["c", "a", "b"]']]},
{id:'hp-kth-largest',type:'code',d:2,p:'heap-topk',title:'Kth Largest Element (heap)',prompt:'<p>Return the k-th largest element using a heap of size k: O(n log k).</p>',starter:`import heapq

def find_kth_largest(nums, k):
    pass`,solution:`import heapq

def find_kth_largest(nums, k):
    h = []
    for x in nums:
        heapq.heappush(h, x)
        if len(h) > k:
            heapq.heappop(h)
    return h[0]`,tests:[['find_kth_largest([3, 2, 1, 5, 6, 4], 2)','5'],['find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)','4'],['find_kth_largest([7], 1)','7']],hints:['Keep only the k largest values seen so far.','A min-heap makes the smallest of those k easy to evict.'],approach:'Min-heap of size k.',cx:'O(n log k)'},
{id:'hp-last-stone',type:'code',d:1,p:'heap-topk',title:'Last Stone Weight',prompt:'<p>Repeatedly smash the two heaviest stones x ≤ y: if equal both vanish, otherwise a stone of weight y − x remains. Return the last weight, or 0.</p>',starter:`import heapq

def last_stone_weight(stones):
    pass`,solution:`import heapq

def last_stone_weight(stones):
    h = [-s for s in stones]
    heapq.heapify(h)
    while len(h) > 1:
        y = -heapq.heappop(h)
        x = -heapq.heappop(h)
        if y != x:
            heapq.heappush(h, -(y - x))
    return -h[0] if h else 0`,tests:[['last_stone_weight([2, 7, 4, 1, 8, 1])','1'],['last_stone_weight([1])','1'],['last_stone_weight([2, 2])','0']],hints:['You need the two largest values again and again: a max-heap.'],approach:'Max-heap via negation.',cx:'O(n log n)'},
{id:'hp-k-closest',type:'code',d:2,p:'heap-topk',title:'K Closest Points to the Origin',prompt:'<p>Return the k points closest to (0, 0), sorted by distance (ties: by x, then y).</p>',starter:`import heapq

def k_closest(points, k):
    pass`,solution:`import heapq

def k_closest(points, k):
    best = heapq.nsmallest(k, points, key=lambda p: (p[0] ** 2 + p[1] ** 2, p[0], p[1]))
    return best`,tests:[['k_closest([[1, 3], [-2, 2]], 1)','[[-2, 2]]'],['k_closest([[3, 3], [5, -1], [-2, 4]], 2)','[[3, 3], [-2, 4]]'],['k_closest([[0, 1], [1, 0]], 2)','[[0, 1], [1, 0]]']],hints:['Compare squared distances (no square root needed).','A max-heap of size k, or heapq.nsmallest with a key.'],approach:'Heap selection by squared distance.',cx:'O(n log k)'},
{id:'hp-ropes',type:'code',d:1,p:'greedy',title:'Minimum Cost to Connect Ropes',prompt:'<p>Joining two ropes of lengths a and b costs a + b and makes one rope of length a + b. Return the minimum total cost to join all ropes.</p>',starter:`import heapq

def connect_ropes(ropes):
    pass`,solution:`import heapq

def connect_ropes(ropes):
    h = list(ropes)
    heapq.heapify(h)
    cost = 0
    while len(h) > 1:
        a = heapq.heappop(h)
        b = heapq.heappop(h)
        cost += a + b
        heapq.heappush(h, a + b)
    return cost`,tests:[['connect_ropes([4, 3, 2, 6])','29'],['connect_ropes([1, 2, 3, 4, 5])','33'],['connect_ropes([5])','0'],['connect_ropes([])','0']],hints:['Long ropes that get joined early are paid for again and again.','Greedy: always join the two shortest.'],approach:'Greedy with a min-heap (Huffman-style).',cx:'O(n log n)'},
{id:'hp-sort-k',type:'code',d:2,p:'heap-topk',title:'Sort a Nearly Sorted List',prompt:'<p>Each element is at most k positions away from its sorted position. Sort in O(n log k).</p>',starter:`import heapq

def sort_k_sorted(nums, k):
    pass`,solution:`import heapq

def sort_k_sorted(nums, k):
    h = nums[:k + 1]
    heapq.heapify(h)
    out = []
    for x in nums[k + 1:]:
        out.append(heapq.heappushpop(h, x))
    while h:
        out.append(heapq.heappop(h))
    return out`,tests:[['sort_k_sorted([6, 5, 3, 2, 8, 10, 9], 3)','[2, 3, 5, 6, 8, 9, 10]'],['sort_k_sorted([2, 1, 4, 3], 1)','[1, 2, 3, 4]'],['sort_k_sorted([], 2)','[]']],hints:['The smallest remaining element must be among the next k + 1 elements.'],approach:'Sliding heap of size k + 1.',cx:'O(n log k)'},
{id:'hp-top-words',type:'code',d:2,p:'heap-topk',title:'Top K Frequent Words',prompt:'<p>Return the k most frequent words, most frequent first; ties alphabetically.</p>',starter:`def top_k_words(words, k):
    pass`,solution:`import heapq
from collections import Counter

def top_k_words(words, k):
    counts = Counter(words)
    return heapq.nsmallest(k, counts, key=lambda w: (-counts[w], w))`,tests:[['top_k_words(["i", "love", "code", "i", "love", "coding"], 2)','["i", "love"]'],['top_k_words(["the", "day", "is", "sunny", "the", "the", "the", "sunny", "is", "is"], 4)','["the", "is", "sunny", "day"]']],hints:['Count first.','Order by (−count, word).'],approach:'Counter + heap selection with a tuple key.',cx:'O(n log k)'},
{id:'hp-meeting-rooms',type:'code',d:2,p:'intervals',title:'Meeting Rooms II',prompt:'<p>Return the minimum number of rooms needed for all meetings [start, end) (a meeting may start when another ends).</p>',starter:`import heapq

def min_rooms(intervals):
    pass`,solution:`import heapq

def min_rooms(intervals):
    ends = []                                  # end times of meetings in progress
    for start, end in sorted(intervals):
        if ends and ends[0] <= start:
            heapq.heapreplace(ends, end)       # reuse the room that frees up first
        else:
            heapq.heappush(ends, end)
    return len(ends)`,tests:[['min_rooms([[0, 30], [5, 10], [15, 20]])','2'],['min_rooms([[7, 10], [2, 4]])','1'],['min_rooms([])','0'],['min_rooms([[1, 5], [2, 6], [3, 7], [5, 8]])','3']],hints:['Process meetings by start time.','Keep the end times of busy rooms in a min-heap: the earliest-ending room is the one to reuse.'],approach:'Sort by start + min-heap of end times.',cx:'O(n log n)'},
{id:'hp-matrix-kth',type:'code',d:2,p:'heap-topk',title:'Kth Smallest in a Sorted Matrix',prompt:'<p>Each row and column is sorted ascending. Return the k-th smallest value.</p>',starter:`import heapq

def kth_smallest(matrix, k):
    pass`,solution:`import heapq

def kth_smallest(matrix, k):
    n = len(matrix)
    h = [(matrix[r][0], r, 0) for r in range(n)]   # front of each row
    heapq.heapify(h)
    for _ in range(k - 1):
        val, r, c = heapq.heappop(h)
        if c + 1 < len(matrix[r]):
            heapq.heappush(h, (matrix[r][c + 1], r, c + 1))
    return h[0][0]`,tests:[['kth_smallest([[1, 5, 9], [10, 11, 13], [12, 13, 15]], 8)','13'],['kth_smallest([[-5]], 1)','-5'],['kth_smallest([[1, 2], [1, 3]], 2)','1']],hints:['Treat each row as a sorted list and merge them with a heap.','Pop k − 1 times; the top is then the answer.'],approach:'k-way merge with a heap.',cx:'O(k log n)'},
{id:'hp-reorganize',type:'code',d:2,p:'greedy',title:'Reorganize String',prompt:'<p>Rearrange the letters so no two adjacent letters are equal. Return any valid arrangement, or "" if impossible.</p>',starter:`import heapq
from collections import Counter

def reorganize(s):
    pass`,solution:`import heapq
from collections import Counter

def reorganize(s):
    h = [(-n, ch) for ch, n in Counter(s).items()]
    heapq.heapify(h)
    out, prev = [], None
    while h:
        n, ch = heapq.heappop(h)          # most frequent letter that is allowed now
        out.append(ch)
        if prev:
            heapq.heappush(h, prev)       # the previous letter is allowed again
        prev = (n + 1, ch) if n + 1 < 0 else None
    return "".join(out) if len(out) == len(s) else ""`,post:`def _ok(s):
    r = reorganize(s)
    return r != "" and sorted(r) == sorted(s) and all(r[i] != r[i + 1] for i in range(len(r) - 1))`,tests:[['_ok("aab")','True','','"aab" → e.g. "aba"'],['reorganize("aaab")','""','','"aaab" is impossible'],['_ok("vvvlo")','True','','"vvvlo" → e.g. "vlvov"'],['_ok("a")','True','','"a"']],hints:['Always place the most frequent letter that is not equal to the previous one.','A max-heap of (count, letter); hold back the letter you just used for one round.'],approach:'Greedy with a max-heap and a one-step cooldown.',cx:'O(n log 26)'},
{id:'hp-merge-k',type:'code',d:3,p:'heap-topk',prelude:'list',title:'Merge K Sorted Linked Lists',prompt:'<p>Merge k sorted linked lists (<code>ListNode</code>, <code>build</code>, <code>to_list</code> are provided) into one sorted list.</p>',starter:`import heapq

def merge_k(lists):
    pass`,solution:`import heapq

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
    return dummy.next`,tests:[['to_list(merge_k([build([1, 4, 5]), build([1, 3, 4]), build([2, 6])]))','[1, 1, 2, 3, 4, 4, 5, 6]'],['to_list(merge_k([]))','[]'],['to_list(merge_k([build([]), build([1])]))','[1]']],hints:['The next output node is the smallest among the k current fronts.','Keep the fronts in a heap; after popping a node, push its successor.'],approach:'Heap of list fronts.',cx:'O(N log k)'},
{id:'hp-median',type:'code',d:3,p:'heap-topk',title:'Find Median From a Data Stream',prompt:'<p>Class <code>MedianFinder</code> with <code>add(num)</code> and <code>median()</code> (a float). Both must be fast for many operations.</p>',starter:`import heapq

class MedianFinder:
    def __init__(self):
        pass

    def add(self, num):
        pass

    def median(self):
        pass`,solution:`import heapq

class MedianFinder:
    def __init__(self):
        self.low = []      # max-heap (negated): the smaller half
        self.high = []     # min-heap: the larger half

    def add(self, num):
        heapq.heappush(self.low, -num)
        heapq.heappush(self.high, -heapq.heappop(self.low))   # move the largest of low up
        if len(self.high) > len(self.low):
            heapq.heappush(self.low, -heapq.heappop(self.high))

    def median(self):
        if len(self.low) > len(self.high):
            return float(-self.low[0])
        return (-self.low[0] + self.high[0]) / 2`,post:`def _t1():
    m = MedianFinder()
    out = []
    for x in [1, 2, 3]:
        m.add(x)
        out.append(m.median())
    return out
def _t2():
    m = MedianFinder()
    for x in [5, 15, 1, 3]:
        m.add(x)
    return m.median()
def _t3():
    m = MedianFinder()
    for x in range(50000, 0, -1):
        m.add(x)
    return m.median()`,tests:[['_t1()','[1.0, 1.5, 2.0]'],['_t2()','4.0'],['_t3()','25000.5','','50,000 adds (must be fast)']],hints:['Sorting after every add is O(n log n) each.','Two heaps: a max-heap for the smaller half and a min-heap for the larger half, kept the same size (± 1).'],approach:'Two balanced heaps; the median sits at their tops.',cx:'O(log n) add, O(1) median'}
]);
