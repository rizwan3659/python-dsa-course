/* Topic 18 · Problem-solving patterns. Every pattern lesson has the same shape:
   when to use it → how to recognise it → visual example → code template → easy → medium → interview problem. */
(function(){
const L=(o)=>({title:o.title,short:o.short,mins:12,lead:o.lead,does:['recognise','visualize','code'],blocks:[
  {t:'grid',items:[{tag:'When',title:'When to use it',body:o.when},{tag:'Signals',title:'How to recognise it',body:'<ul class="clean">'+o.signals.map(s=>`<li>${s}</li>`).join('')+'</ul>'},{tag:'Cost',title:'Typical complexity',body:o.cost}]},
  {t:'q',title:'Recognise it',ids:o.drill},
  ...(o.viz?[{t:'viz',fn:o.viz,arg:o.arg,title:'Visual example',intro:o.vizIntro||''}]:[]),
  {t:'code',title:'Code template',code:o.template,run:false},
  {t:'q',title:'🟢 Easy problem',ids:[o.easy]},
  {t:'q',title:'🟡 Medium problem',ids:[o.medium]},
  {t:'q',title:'🔴 Interview problem',ids:[o.interview]}]});

COURSE.topic({id:'patterns',
goal:'Recognise which pattern a new problem needs, from the words in its statement, and apply a template you already know.',
learn:[
{title:'How to recognise a pattern',short:'Overview',mins:10,lead:'Most interview problems are one of about a dozen patterns in disguise. Learn the signals, and the first minute of every problem becomes a lookup.',does:['recognise','quiz'],blocks:[
 {t:'table',head:['If the problem says…','Think…'],rows:[
  ['sorted array, pair / triplet, in place','Two pointers'],['contiguous subarray / substring, longest / shortest / k in a row','Sliding window'],
  ['sum of a range, many queries, subarray sum = k','Prefix sum (+ hash map)'],['seen before, count, group, complement','Hashing'],
  ['linked list middle / cycle / k-th from end','Fast and slow pointers'],['sorted, O(log n), minimum value that works','Binary search (on index or answer)'],
  ['next greater / smaller, days until, span','Monotonic stack'],['fewest steps, levels, nearest, spreading','BFS'],
  ['explore everything, connected regions, paths in trees','DFS'],['all combinations / permutations / subsets','Backtracking'],
  ['k largest / most frequent, merge k sorted, running median','Heap'],['meetings, ranges, overlapping','Intervals (sort first)'],
  ['locally best choice is provably globally best','Greedy']]},
 {t:'quiz',topic:'patterns',n:10,types:['choose'],title:'Pattern recognition drill',label:'Which pattern?'}]},

L({title:'Two pointers',short:'Two pointers',lead:'Two indexes walk the data together: from both ends toward the middle, or a slow writer behind a fast reader.',
  when:'Sorted arrays, pairs or triplets with a target, palindromes, and in-place rearranging with O(1) extra space.',signals:['“sorted”','“pair / triplet that sums to”','“in place”, “O(1) extra space”','“palindrome”'],
  cost:'O(n) time (O(n²) for 3Sum), O(1) space.',drill:['pt-r1','pt-r28'],viz:'two-pointers',arg:{mode:'pair'},
  template:`left, right = 0, len(a) - 1
while left < right:
    if condition(a[left], a[right]):
        return answer
    if need_bigger:
        left += 1
    else:
        right -= 1`,easy:'arr-reverse',medium:'arr-container',interview:'arr-three-sum'}),

L({title:'Sliding window',short:'Sliding window',lead:'A window [left, right] slides over the data. Update it incrementally instead of recomputing it.',
  when:'Contiguous subarrays or substrings: maximum/minimum/longest/shortest with some condition.',signals:['“contiguous”, “subarray”, “substring”','“k consecutive”','“longest / shortest such that …”'],
  cost:'O(n): left and right each move at most n times.',drill:['pt-r2','pt-r14','pt-r35'],viz:'sliding-window',arg:{mode:'unique'},
  template:`left = 0
for right, x in enumerate(a):
    add(x)
    while window_is_invalid():
        remove(a[left])
        left += 1
    best = max(best, right - left + 1)`,easy:'arr-max-sum-k',medium:'st-longest-unique',interview:'st-min-window'}),

L({title:'Prefix sum',short:'Prefix sum',lead:'Store running totals once; any range sum becomes a subtraction. Add a hash map of prefix sums to count subarrays with a given sum.',
  when:'Many range-sum queries, or “subarray sums to k” when numbers can be negative.',signals:['“sum of elements from i to j”','“number of subarrays with sum k”','“pivot / balance point”'],
  cost:'O(n) to build, O(1) per query.',drill:['pt-r4','pt-r15'],viz:'prefix-sum',
  template:`prefix = [0]
for x in a:
    prefix.append(prefix[-1] + x)
# sum(a[l..r]) = prefix[r + 1] - prefix[l]

seen, total, count = {0: 1}, 0, 0      # subarrays summing to k
for x in a:
    total += x
    count += seen.get(total - k, 0)
    seen[total] = seen.get(total, 0) + 1`,easy:'arr-running-sum',medium:'arr-pivot',interview:'arr-subarray-sum-k'}),

L({title:'Hashing',short:'Hashing',lead:'Trade memory for time: a set or dict answers “seen it?”, “how many?” and “where?” in O(1).',
  when:'Whenever an inner loop searches for a specific value, or you need counts or groups.',signals:['“duplicate”, “seen”, “unique”','“two numbers that add up to”','“anagram”, “frequency”, “group”'],
  cost:'O(n) time, O(n) space.',drill:['pt-r3','pt-r16'],viz:'two-sum-hash',
  template:`seen = {}
for i, x in enumerate(a):
    need = target - x
    if need in seen:
        return [seen[need], i]
    seen[x] = i`,easy:'arr-two-sum',medium:'h-group-anagrams',interview:'h-longest-consecutive'}),

L({title:'Fast and slow pointers',short:'Fast/slow',lead:'Two pointers at different speeds: find the middle, detect cycles, locate the cycle start, all in O(1) space.',
  when:'Linked lists (middle, cycle, k-th from end) and any “next value” function that might loop.',signals:['“linked list” + “middle” or “cycle”','“without extra space”','“happy number”-style repeating sequences'],
  cost:'O(n) time, O(1) space.',drill:['pt-r5','pt-r17'],viz:'fast-slow',
  template:`slow = fast = head
while fast and fast.next:
    slow = slow.next
    fast = fast.next.next
    if slow is fast:
        return True        # cycle
return False               # (for the middle: return slow)`,easy:'ll-middle',medium:'ll-has-cycle',interview:'ll-cycle-start'}),

L({title:'Binary search',short:'Binary search',lead:'Halve the search space every step. Works on sorted arrays and on any monotonic yes/no question about the answer.',
  when:'Sorted data, O(log n) requirements, and “minimum / maximum value such that …”.',signals:['“sorted” or “rotated sorted”','“O(log n)”','“smallest speed / capacity / time that works”'],
  cost:'O(log n) steps (× the cost of each check).',drill:['pt-r6','pt-r18','pt-r36'],viz:'binary-search',
  template:`lo, hi = low_bound, high_bound
while lo < hi:
    mid = (lo + hi) // 2
    if works(mid):
        hi = mid           # mid might be the answer
    else:
        lo = mid + 1
return lo`,easy:'bs-search',medium:'bs-koko',interview:'bs-rotated'}),

L({title:'Monotonic stack',short:'Monotonic stack',lead:'Keep a stack that is always increasing (or decreasing). When a new element breaks the order, everything it pops has just found its answer.',
  when:'Next/previous greater or smaller element, spans, histograms.',signals:['“next greater”, “next warmer”','“how many days until”','“largest rectangle”'],
  cost:'O(n): each element is pushed and popped at most once.',drill:['pt-r7','pt-r19'],viz:'monotonic-stack',
  template:`result = [-1] * len(a)
stack = []                         # indexes
for i, x in enumerate(a):
    while stack and a[stack[-1]] < x:
        result[stack.pop()] = x
    stack.append(i)`,easy:'s-next-greater',medium:'s-daily-temps',interview:'s-histogram'}),

L({title:'Breadth-first search',short:'BFS',lead:'Explore in rings of distance with a queue. First arrival = fewest steps.',
  when:'Shortest paths in unweighted graphs and grids, level-by-level tree problems, spreading processes.',signals:['“minimum number of steps / moves”','“level”, “nearest”','“every minute it spreads”'],
  cost:'O(V + E) (grids: O(rows × cols)).',drill:['pt-r8','pt-r20','pt-r30'],viz:'grid-islands',
  template:`from collections import deque
queue, seen = deque([start]), {start}
while queue:
    u = queue.popleft()
    for v in neighbours(u):
        if v not in seen:
            seen.add(v)
            queue.append(v)`,easy:'t-level-order',medium:'g-rotting',interview:'g-word-ladder'}),

L({title:'Depth-first search',short:'DFS',lead:'Go deep, then backtrack, with recursion or an explicit stack. The natural fit for trees, connected regions and exhaustive exploration.',
  when:'Trees (heights, paths, validations), connected components, flood fill, reachability.',signals:['“tree” (almost always)','“connected”, “region”, “island”','“all paths”'],
  cost:'O(V + E), recursion depth = height.',drill:['pt-r9','pt-r29','pt-r37'],viz:'tree-traversal',
  template:`def dfs(node):
    if node is None:
        return BASE
    left = dfs(node.left)
    right = dfs(node.right)
    return combine(node, left, right)`,easy:'t-max-depth',medium:'g-islands',interview:'t-max-path'}),

L({title:'Backtracking',short:'Backtracking',lead:'Build candidates step by step; when one cannot lead to a solution, undo the last choice and try another.',
  when:'Generate all combinations, permutations, subsets, or placements under constraints.',signals:['“all”, “every”, “generate”, “list the ways”','small input sizes (n ≤ 20)','constraints like “no two attack”'],
  cost:'Exponential (2ⁿ, n!) but pruned.',drill:['pt-r10','pt-r25'],viz:'backtracking',
  template:`def backtrack(path, start):
    if done(path):
        result.append(path[:])
        return
    for choice in options(start):
        path.append(choice)        # choose
        backtrack(path, next_start)
        path.pop()                 # un-choose`,easy:'rec-subsets',medium:'rec-combination-sum',interview:'rec-n-queens'}),

L({title:'Heap / top-K',short:'Heap',lead:'A heap hands you the smallest (or largest) item in O(log n). Keep a heap of size k for top-K questions.',
  when:'k largest/smallest/most frequent, merging sorted streams, scheduling, running medians.',signals:['“k largest / closest / most frequent”','“merge k sorted”','“median of a stream”'],
  cost:'O(n log k).',drill:['pt-r11','pt-r24'],viz:'heap',
  template:`import heapq
h = []
for x in items:
    heapq.heappush(h, x)
    if len(h) > k:
        heapq.heappop(h)      # drop the smallest
return h[0]                    # k-th largest`,easy:'hp-last-stone',medium:'h-top-k',interview:'hp-median'}),

L({title:'Intervals',short:'Intervals',lead:'Sort by start (or end), then sweep once. Overlap means: next start ≤ current end.',
  when:'Meetings, bookings, ranges, merging or counting overlaps.',signals:['pairs [start, end]','“overlap”, “merge”, “rooms”, “free time”'],
  cost:'O(n log n) for the sort.',drill:['pt-r12','pt-r26'],viz:'intervals',
  template:`merged = []
for start, end in sorted(intervals):
    if merged and start <= merged[-1][1]:
        merged[-1][1] = max(merged[-1][1], end)
    else:
        merged.append([start, end])`,easy:'so-meetings',medium:'pt-merge-intervals',interview:'hp-meeting-rooms'}),

L({title:'Greedy',short:'Greedy',lead:'Make the locally best choice at each step and never undo it. It works only when you can argue that a best choice never hurts later ones.',
  when:'Scheduling by earliest end, reachability, coin-like exchanges with nice denominations, matching sorted lists.',signals:['“minimum number of …” with a simple local rule','“can you reach”','sorting makes the choice obvious'],
  cost:'Often O(n) or O(n log n).',drill:['pt-r13','pt-r27','pt-r39'],viz:'greedy-reach',
  template:`best_so_far = initial
for item in sorted(items, key=priority):
    if can_take(item, best_so_far):
        take(item)                 # never reconsidered`,easy:'pt-stock-ii',medium:'pt-jump-game',interview:'pt-gas-station'})],

challenge:[
 {t:'q',title:'Mixed interview set',intro:'No pattern labels in the problem titles below: decide the pattern yourself before coding.',ids:['pt-insert-interval','pt-non-overlap','pt-partition-labels','pt-jump-game-ii','pt-interval-intersection','pt-assign-cookies']},
 {t:'q',title:'Find the bug',ids:['pt-d1','pt-d2','pt-dr1']}],

review:[
 {t:'quiz',topic:'patterns',n:12,types:['choose'],title:'Pattern recognition drill',label:'Which pattern?'},
 {t:'flash',items:[['Sorted + pair?','Two pointers.'],['Contiguous + longest/shortest?','Sliding window.'],['Subarray sum = k with negatives?','Prefix sum + hash map.'],['Linked list cycle?','Fast/slow.'],['Minimum value that works?','Binary search on the answer.'],['Next greater?','Monotonic stack.'],['Fewest steps?','BFS.'],['All combinations?','Backtracking.'],['Top k?','Heap of size k.'],['Overlapping ranges?','Sort, then merge.']]}]
});
})();
