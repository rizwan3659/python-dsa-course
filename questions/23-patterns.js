/* Topic 23 · Problem-solving patterns: recognition drills + interval and greedy problems.
   (The pattern lessons also reuse problems from every other topic.) */
(function(){
const W=(id,d,p,title,q,opts,a,why)=>({id,type:'choose',d,p,title,q:'<b>Which pattern fits best?</b> '+q,opts,a,why});
COURSE.qs('patterns',[
/* ---------- recognition drills ---------- */
W('pt-r1',1,'two-pointers','Pair in a sorted array','Given a <b>sorted</b> array, find two numbers that add up to a target, using O(1) extra space.',['Sliding window','Two pointers from both ends','Prefix sum','Backtracking'],1,'Sorted input + pair + O(1) space: move left up when the sum is too small, right down when too big.'),
W('pt-r2',1,'sliding-window','Best run of k days','Find the maximum total sales over any <b>7 consecutive days</b>.',['Fixed-size sliding window','Binary search','Heap','DFS'],0,'Consecutive + fixed length: slide the window, adding one day and dropping one.'),
W('pt-r3',1,'hashing','Seen before?','Return the first element that appears twice while reading left to right.',['Hash set','Two pointers','Sorting + binary search','Monotonic stack'],0,'“Have I seen x?” in O(1): a set.'),
W('pt-r4',2,'prefix-sum','Many range sums','An array never changes; answer 100,000 queries “sum of elements i..j”.',['Sliding window','Prefix sums','Heap','Union-find'],1,'Precompute running totals once; each query is one subtraction.'),
W('pt-r5',1,'fast-slow','Middle of a linked list','Return the middle node of a linked list in one pass, without counting first.',['Fast and slow pointers','BFS','Hash map','Binary search'],0,'Fast moves 2, slow moves 1: slow is in the middle when fast reaches the end.'),
W('pt-r6',2,'binary-search','Minimum speed','Find the <b>smallest</b> speed that lets you finish all tasks within h hours (faster always works if slower works).',['Greedy only','Binary search on the answer','DFS','Prefix sum'],1,'A monotonic yes/no condition over candidate answers.'),
W('pt-r7',2,'monotonic-stack','Next warmer day','For each day, how many days until a warmer temperature?',['Monotonic stack','Sliding window','Heap','Two pointers'],0,'“Next greater element” family.'),
W('pt-r8',1,'bfs','Fewest moves','Minimum number of moves for a knight to reach a square on a chessboard.',['DFS','BFS','Backtracking','Greedy'],1,'Every move costs 1: BFS finds the fewest moves.'),
W('pt-r9',2,'dfs','Count connected regions','Count the groups of connected land cells in a grid.',['DFS/BFS flood fill','Binary search','Heap','Prefix sum'],0,'Each unvisited land cell starts a flood fill that marks its whole region.'),
W('pt-r10',2,'backtracking','All combinations','Return <b>every</b> way to choose numbers that add up to a target.',['Greedy','Backtracking','Sliding window','Heap'],1,'“All / every / generate” → explore choices with choose–explore–undo.'),
W('pt-r11',1,'heap-topk','K most frequent','Return the 10 most frequent words in a huge log file.',['Count + heap of size k','Sorting the whole file twice','Stack','Union-find'],0,'Top-K: count, then keep a heap of size k.'),
W('pt-r12',2,'intervals','Overlapping meetings','Combine all overlapping time ranges into one list of busy blocks.',['Sort by start, then merge','Binary search','Hash set','Monotonic stack'],0,'Interval problems almost always start by sorting.'),
W('pt-r13',2,'greedy','Fewest coins? Jump?','You can always reach the end if, scanning left to right, the farthest reachable index never falls behind. Decide whether the end is reachable.',['Greedy','Backtracking','BFS on all paths','Prefix sum'],0,'A local rule (track the farthest reach) is provably enough: greedy.'),
W('pt-r14',2,'sliding-window','Longest without repeats','Longest substring with no repeated characters.',['Variable-size sliding window','Two pointers from both ends','Prefix sum','Heap'],0,'Grow right, shrink left while a character repeats.'),
W('pt-r15',2,'prefix-sum','Subarrays summing to k (with negatives)','Count subarrays whose sum is exactly k; numbers can be negative.',['Sliding window','Prefix sum + hash map','Two pointers','Binary search'],1,'Negatives break the window logic. Count earlier prefix sums equal to (current − k).'),
W('pt-r16',2,'hashing','Grouping words','Group words that are anagrams of each other.',['Hash map with a canonical key','Two pointers','Heap','Monotonic stack'],0,'Key = sorted letters (or letter counts).'),
W('pt-r17',2,'fast-slow','Is there a loop?','Detect whether a sequence defined by x → f(x) eventually repeats, using O(1) memory.',['Fast and slow pointers','Hash map only','Sorting','BFS'],0,'Floyd’s cycle detection works on any “next” function, not only linked lists.'),
W('pt-r18',2,'binary-search','Rotated array','Find a value in a sorted array that was rotated at an unknown point, in O(log n).',['Linear scan','Modified binary search','Heap','Two pointers'],1,'One half around mid is always sorted: decide which half to keep.'),
W('pt-r19',3,'monotonic-stack','Largest rectangle','Largest rectangle in a histogram.',['Two pointers','Monotonic stack','Prefix sum','Greedy'],1,'For each bar you need the nearest smaller bar on each side.'),
W('pt-r20',2,'bfs','Spreading process','All rotten oranges infect neighbours each minute. How many minutes until everything is rotten?',['DFS from one orange','Multi-source BFS','Binary search','Sorting'],1,'Everything spreads simultaneously: start the BFS from all sources at once.'),
W('pt-r21',2,'topo-sort','Build order','Packages depend on other packages. Find an order to install all of them.',['Topological sort','Dijkstra','Kruskal','Two pointers'],0,'Dependencies = a DAG.'),
W('pt-r22',2,'union-find','Merging groups online','Accounts are merged as links arrive; after each link answer “same person?”.',['Union-find','BFS after each link','Sorting','Heap'],0,'Dynamic connectivity.'),
W('pt-r23',2,'shortest-path','Cheapest route','Cheapest travel cost between two cities; ticket prices are positive.',['BFS','Dijkstra','Topological sort','Backtracking'],1,'Weighted, non-negative → Dijkstra.'),
W('pt-r24',2,'heap-topk','Running median','Report the median after each new number in a stream.',['Two heaps','Sort after each insert','Stack','Hash map'],0,'Max-heap for the lower half, min-heap for the upper half.'),
W('pt-r25',2,'backtracking','Place queens','Place n queens on an n × n board so none attack each other; count the solutions.',['Greedy','Backtracking with pruning','BFS','Prefix sum'],1,'Try a position, recurse, undo; prune attacked squares.'),
W('pt-r26',2,'intervals','Minimum rooms','Minimum number of meeting rooms so no meetings clash.',['Sort + min-heap of end times','Binary search','Union-find','Two pointers from both ends'],0,'Process by start time; reuse the room that frees up first.'),
W('pt-r27',2,'greedy','Remove the fewest intervals','Remove the minimum number of intervals so the rest do not overlap.',['Greedy: keep the interval that ends earliest','Backtracking over subsets','DFS','Prefix sum'],0,'Ending early leaves the most room for the rest: a classic greedy choice.'),
W('pt-r28',1,'two-pointers','In-place filter','Remove all occurrences of a value from an array in place and return the new length.',['Read/write pointers','Heap','Hash set','Recursion'],0,'A slow write index chases a fast read index.'),
W('pt-r29',2,'tree','Tree diameter','Longest path between any two nodes of a binary tree.',['DFS returning heights, tracking a global best','BFS by levels','Binary search','Sliding window'],0,'Bottom-up tree recursion.'),
W('pt-r30',2,'bfs','Tree level averages','Average value of each level of a binary tree.',['BFS level by level','Inorder DFS','Two pointers','Prefix sum'],0,'Levels → BFS with len(queue) per round.'),
W('pt-r31',2,'kadane','Best contiguous sum','Maximum sum of a contiguous subarray (values can be negative).',['Kadane (extend or restart)','Sorting','Prefix sum + binary search','Backtracking'],0,'One pass: cur = max(x, cur + x).'),
W('pt-r32',2,'design','O(1) cache eviction','Cache with O(1) get/put that evicts the least recently used key.',['Hash map + doubly linked list','Heap','Sorted list','Two stacks'],0,'The dict finds nodes; the list keeps recency order.'),
W('pt-r33',2,'trie','Autocomplete','As the user types, list stored words that start with the typed prefix.',['Trie','Hash set','Heap','Union-find'],0,'Prefix queries.'),
W('pt-r34',3,'dp','Count the ways','Count the ways to climb n stairs taking 1 or 2 steps (n up to 10,000).',['Plain recursion','Memoization / bottom-up DP','Backtracking listing every way','Greedy'],1,'Overlapping subproblems: cache them.'),
W('pt-r35',2,'sliding-window','Anagram windows','Find every start index where a substring is an anagram of p.',['Fixed-size window with letter counts','Backtracking','Binary search','DFS'],0,'Every candidate has length len(p).'),
W('pt-r36',3,'binary-search','Split into k parts','Split an array into k contiguous parts minimising the largest part sum.',['Binary search on the answer + greedy check','Backtracking over all splits','Heap','Two pointers'],0,'If a limit works, any bigger limit works.'),
W('pt-r37',2,'dfs','All root-to-leaf paths','List every root-to-leaf path of a binary tree.',['DFS carrying the path','BFS by levels','Heap','Sorting'],0,'Depth-first with the current path.'),
W('pt-r38',3,'two-pointers','Trapped rain water','How much rain water is trapped between bars?',['Two pointers with running maxima','Sorting','Union-find','Backtracking'],0,'The lower side can always be settled.'),
W('pt-r39',2,'greedy','Assign cookies','Give each child at most one cookie (size ≥ greed). Maximise content children.',['Sort both, greedy matching','Backtracking','BFS','Hash map'],0,'Satisfy the least greedy child with the smallest cookie that works.'),

/* ---------- intervals ---------- */
{id:'pt-merge-intervals',type:'code',d:2,p:'intervals',title:'Merge Intervals',prompt:'<p>Merge all overlapping intervals and return them sorted by start.</p><p><code>[[1, 3], [2, 6], [8, 10], [15, 18]]</code> → <code>[[1, 6], [8, 10], [15, 18]]</code></p>',starter:`def merge(intervals):
    pass`,solution:`def merge(intervals):
    merged = []
    for start, end in sorted(intervals):
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,tests:[['merge([[1, 3], [2, 6], [8, 10], [15, 18]])','[[1, 6], [8, 10], [15, 18]]'],['merge([[1, 4], [4, 5]])','[[1, 5]]'],['merge([[1, 4], [2, 3]])','[[1, 4]]'],['merge([])','[]']],constraints:['0 ≤ len(intervals) ≤ 10<sup>4</sup>'],mistakes:['Not sorting by start first.','Replacing the end instead of taking the max (an interval can contain another).'],followup:'Merge intervals arriving one by one (keep a sorted structure).',hints:['Sort by start first.','Compare each interval with the LAST merged block only.'],approach:'Sort, then extend or start a new block.',cx:'O(n log n)'},
{id:'pt-insert-interval',type:'code',d:2,p:'intervals',title:'Insert Interval',prompt:'<p><code>intervals</code> is sorted and non-overlapping. Insert <code>new</code>, merging where needed.</p>',starter:`def insert(intervals, new):
    pass`,solution:`def insert(intervals, new):
    out, i, n = [], 0, len(intervals)
    while i < n and intervals[i][1] < new[0]:      # entirely before
        out.append(intervals[i])
        i += 1
    start, end = new
    while i < n and intervals[i][0] <= end:         # overlapping
        start = min(start, intervals[i][0])
        end = max(end, intervals[i][1])
        i += 1
    out.append([start, end])
    out.extend(intervals[i:])                        # entirely after
    return out`,tests:[['insert([[1, 3], [6, 9]], [2, 5])','[[1, 5], [6, 9]]'],['insert([[1, 2], [3, 5], [6, 7], [8, 10], [12, 16]], [4, 8])','[[1, 2], [3, 10], [12, 16]]'],['insert([], [5, 7])','[[5, 7]]'],['insert([[1, 5]], [2, 3])','[[1, 5]]']],constraints:['0 ≤ len(intervals) ≤ 10<sup>4</sup>','intervals is sorted and non-overlapping'],mistakes:['Sorting again (the input is already sorted).','Not merging with several existing intervals.'],followup:'Remove an interval instead of inserting.',hints:['Three phases: intervals before the new one, the ones that overlap it, the ones after.','Three phases: copy intervals that end before new, merge all that overlap new, copy the rest.'],approach:'Linear three-phase scan.',cx:'O(n)'},
{id:'pt-non-overlap',type:'code',d:2,p:'greedy',title:'Non-overlapping Intervals',prompt:'<p>Return the minimum number of intervals to remove so the rest do not overlap (touching at an end point is fine).</p>',starter:`def erase_overlap(intervals):
    pass`,solution:`def erase_overlap(intervals):
    removed, last_end = 0, float("-inf")
    for start, end in sorted(intervals, key=lambda iv: iv[1]):   # earliest end first
        if start >= last_end:
            last_end = end            # keep it
        else:
            removed += 1              # overlaps a kept interval: drop it
    return removed`,tests:[['erase_overlap([[1, 2], [2, 3], [3, 4], [1, 3]])','1'],['erase_overlap([[1, 2], [1, 2], [1, 2]])','2'],['erase_overlap([[1, 2], [2, 3]])','0'],['erase_overlap([[1, 100], [11, 22], [1, 11], [2, 12]])','2']],constraints:['1 ≤ len(intervals) ≤ 10<sup>5</sup>'],mistakes:['Sorting by start and removing greedily (can remove too many).','Treating touching intervals as overlapping.'],followup:'Return the intervals to remove.',hints:['Keeping the interval that ends earliest leaves the most room for the others.','Sort by end time; keep an interval if it starts after the last kept one ends.'],approach:'Greedy by earliest end (activity selection).',cx:'O(n log n)'},
{id:'pt-interval-intersection',type:'code',d:2,p:'two-pointers',title:'Interval List Intersections',prompt:'<p>Two lists of sorted, disjoint closed intervals. Return their intersections.</p>',starter:`def interval_intersection(a, b):
    pass`,solution:`def interval_intersection(a, b):
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        lo = max(a[i][0], b[j][0])
        hi = min(a[i][1], b[j][1])
        if lo <= hi:
            out.append([lo, hi])
        if a[i][1] < b[j][1]:          # the one that ends first is done
            i += 1
        else:
            j += 1
    return out`,tests:[['interval_intersection([[0, 2], [5, 10], [13, 23], [24, 25]], [[1, 5], [8, 12], [15, 24], [25, 26]])','[[1, 2], [5, 5], [8, 10], [15, 23], [24, 24], [25, 25]]'],['interval_intersection([[1, 3], [5, 9]], [])','[]'],['interval_intersection([[1, 5]], [[5, 10]])','[[5, 5]]'],['interval_intersection([[1, 2]], [[3, 4]])','[]']],constraints:['0 ≤ len(a), len(b) ≤ 1000'],mistakes:['Advancing both pointers at once.','Advancing the interval that ends later.'],followup:'Intersect k lists of intervals.',hints:['Two pointers, one per list.','Overlap = [max of starts, min of ends] if non-empty; advance the interval that ends first.'],approach:'Two pointers over both lists.',cx:'O(n + m)'},

/* ---------- greedy ---------- */
{id:'pt-jump-game',type:'code',d:2,p:'greedy',title:'Jump Game',prompt:'<p><code>nums[i]</code> is the maximum jump length from i. Can you reach the last index from index 0?</p>',starter:`def can_jump(nums):
    pass`,solution:`def can_jump(nums):
    reach = 0
    for i, jump in enumerate(nums):
        if i > reach:
            return False
        reach = max(reach, i + jump)
    return True`,tests:[['can_jump([2, 3, 1, 1, 4])','True'],['can_jump([3, 2, 1, 0, 4])','False'],['can_jump([0])','True'],['can_jump([1, 0, 1])','False']],constraints:['1 ≤ len(nums) ≤ 10<sup>4</sup>'],mistakes:['Trying every jump with recursion (exponential).','Stopping only when reach is exactly the last index.'],followup:'Return the minimum number of jumps (pt-jump-game-ii).',hints:['You do not need to know WHICH jumps to take.','Track the farthest index reachable so far.'],approach:'Greedy farthest reach.',cx:'O(n)'},
{id:'pt-jump-game-ii',type:'code',d:2,p:'greedy',title:'Jump Game II',prompt:'<p>The last index is always reachable. Return the minimum number of jumps to reach it.</p>',starter:`def min_jumps(nums):
    pass`,solution:`def min_jumps(nums):
    jumps = end = farthest = 0
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        if i == end:                 # must jump to go further
            jumps += 1
            end = farthest
    return jumps`,tests:[['min_jumps([2, 3, 1, 1, 4])','2'],['min_jumps([2, 3, 0, 1, 4])','2'],['min_jumps([0])','0'],['min_jumps([1, 1, 1, 1])','3']],constraints:['1 ≤ len(nums) ≤ 10<sup>4</sup>','the end is always reachable'],mistakes:['Counting a jump at the last index.','BFS over every index is correct but slower.'],followup:'Return the indexes you jump to.',hints:['Think in BFS levels: all indexes reachable with j jumps form a range.','When you reach the end of the current range, you must take another jump; the new range ends at the farthest reach seen.'],approach:'Greedy BFS-by-ranges.',cx:'O(n)'},
{id:'pt-assign-cookies',type:'code',d:1,p:'greedy',title:'Assign Cookies',prompt:'<p>Child i is content with a cookie of size ≥ <code>greed[i]</code>. Each child gets at most one cookie. Maximise content children.</p>',starter:`def find_content_children(greed, sizes):
    pass`,solution:`def find_content_children(greed, sizes):
    greed, sizes = sorted(greed), sorted(sizes)
    child = 0
    for s in sizes:
        if child < len(greed) and s >= greed[child]:
            child += 1                # smallest cookie that satisfies this child
    return child`,tests:[['find_content_children([1, 2, 3], [1, 1])','1'],['find_content_children([1, 2], [1, 2, 3])','2'],['find_content_children([], [1])','0'],['find_content_children([10, 9, 8, 7], [5, 6, 7, 8])','2']],constraints:['0 ≤ len(greed), len(sizes) ≤ 3 × 10<sup>4</sup>'],mistakes:['Not sorting both lists.','Giving the biggest cookie to the least greedy child.'],followup:'Each cookie can be split once.',hints:['Sort both lists.','Give cookies in increasing size to the least greedy child still waiting.'],approach:'Sort + greedy two pointers.',cx:'O(n log n)'},
{id:'pt-stock-ii',type:'code',d:1,p:'greedy',title:'Best Time to Buy and Sell Stock II',prompt:'<p>You may buy and sell many times (hold at most one share). Return the maximum profit.</p>',starter:`def max_profit(prices):
    pass`,solution:`def max_profit(prices):
    return sum(max(0, prices[i] - prices[i - 1]) for i in range(1, len(prices)))`,tests:[['max_profit([7, 1, 5, 3, 6, 4])','7'],['max_profit([1, 2, 3, 4, 5])','4'],['max_profit([7, 6, 4, 3, 1])','0'],['max_profit([1])','0']],constraints:['1 ≤ len(prices) ≤ 3 × 10<sup>4</sup>'],mistakes:['Looking for the single best buy/sell pair (that is a different problem).'],followup:'At most two transactions.',hints:['A long rise equals the sum of its daily rises.','Collect every positive day-to-day difference.'],approach:'Greedy: take every upward step.',cx:'O(n)'},
{id:'pt-gas-station',type:'code',d:2,p:'greedy',title:'Gas Station',prompt:'<p>Stations in a circle: <code>gas[i]</code> fuel available, <code>cost[i]</code> to reach the next station. Return the start index to complete the circuit, or -1 (the answer is unique if it exists).</p>',starter:`def can_complete_circuit(gas, cost):
    pass`,solution:`def can_complete_circuit(gas, cost):
    if sum(gas) < sum(cost):
        return -1
    start = tank = 0
    for i in range(len(gas)):
        tank += gas[i] - cost[i]
        if tank < 0:                 # cannot get past i from start: try i + 1
            start = i + 1
            tank = 0
    return start`,tests:[['can_complete_circuit([1, 2, 3, 4, 5], [3, 4, 5, 1, 2])','3'],['can_complete_circuit([2, 3, 4], [3, 4, 3])','-1'],['can_complete_circuit([5], [4])','0'],['can_complete_circuit([3, 1, 1], [1, 2, 2])','0']],constraints:['1 ≤ n ≤ 10<sup>5</sup>'],mistakes:['Trying every start: O(n²).','Restarting at i instead of i + 1 after the tank goes negative.'],followup:'Prove why the start after the last failure is correct.',hints:['If total gas < total cost, it is impossible.','If you run out at station i starting from s, no station between s and i works either: restart at i + 1.'],approach:'One-pass greedy restart.',cx:'O(n)'},
{id:'pt-partition-labels',type:'code',d:2,p:'greedy',title:'Partition Labels',prompt:'<p>Split the string into as many parts as possible so each letter appears in at most one part. Return the part sizes.</p><p><code>"ababcbacadefegdehijhklij"</code> → <code>[9, 7, 8]</code></p>',starter:`def partition_labels(s):
    pass`,solution:`def partition_labels(s):
    last = {ch: i for i, ch in enumerate(s)}
    sizes, start, end = [], 0, 0
    for i, ch in enumerate(s):
        end = max(end, last[ch])     # this part must reach ch's last occurrence
        if i == end:
            sizes.append(end - start + 1)
            start = i + 1
    return sizes`,tests:[['partition_labels("ababcbacadefegdehijhklij")','[9, 7, 8]'],['partition_labels("eccbbbbdec")','[10]'],['partition_labels("abc")','[1, 1, 1]'],['partition_labels("a")','[1]']],constraints:['1 ≤ len(s) ≤ 500','lowercase letters'],mistakes:['Closing a part as soon as one letter ends instead of when the furthest last-occurrence is reached.'],followup:'Return the parts themselves.',hints:['Record the last index of every letter.','Extend the current part to the farthest last-index of its letters; cut when you reach it.'],approach:'Greedy extension, like merging intervals.',cx:'O(n)'},

/* ---------- mixed debug + dry run ---------- */
{id:'pt-d1',type:'debug',d:2,p:'intervals',title:'Merging unsorted intervals',code:`def merge(intervals):
    merged = []
    for start, end in intervals:
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,opts:['max should be min','It never sorts, so overlaps between non-neighbouring intervals are missed','<= should be <','It should merge into the first block'],a:1,why:'merge([[8, 10], [1, 9]]) returns two blocks instead of [[1, 10]].',fix:`def merge(intervals):
    merged = []
    for start, end in sorted(intervals):
        if merged and start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged`,tests:[['merge([[8, 10], [1, 9]])','[[1, 10]]']]},
{id:'pt-d2',type:'debug',d:2,p:'greedy',title:'Greedy by the wrong key',code:`def max_meetings(intervals):        # how many non-overlapping meetings fit?
    count, last_end = 0, float("-inf")
    for start, end in sorted(intervals):   # sorted by START
        if start >= last_end:
            count += 1
            last_end = end
    return count`,opts:['The comparison should be >','Sorting by start lets one long early meeting block many short ones; sort by END time instead','count should start at 1','It needs backtracking'],a:1,why:'max_meetings([[1, 10], [2, 3], [4, 5]]) returns 1, but 2 meetings fit.',fix:`def max_meetings(intervals):
    count, last_end = 0, float("-inf")
    for start, end in sorted(intervals, key=lambda iv: iv[1]):
        if start >= last_end:
            count += 1
            last_end = end
    return count`,tests:[['max_meetings([[1, 10], [2, 3], [4, 5]])','2']]},
{id:'pt-dr1',type:'dryrun',d:2,p:'greedy',title:'Tracking the farthest reach',code:`nums = [2, 3, 1, 1, 4]
reach = 0
for i, jump in enumerate(nums):
    reach = max(reach, i + jump)`,cols:['i','reach'],given:[0],rows:[['0','2'],['1','4'],['2','4'],['3','4'],['4','8']],why:'After index 1, the last index (4) is already reachable.'}
]);
})();

/* ---------- mixed-pattern hard problems (added with the v2 curriculum) ---------- */
COURSE.qs('patterns',[
{id:'pt-shortest-subarray-k',type:'code',d:3,p:'monotonic-stack',title:'Shortest Subarray with Sum at Least K',prompt:'<p>Return the length of the shortest non-empty contiguous subarray with sum ≥ k, or −1. The numbers can be negative, so a plain sliding window does not work.</p>',prereq:['q-window-max','arr-max-subarray'],
constraints:['1 ≤ len(nums) ≤ 10<sup>5</sup>','−10<sup>5</sup> ≤ nums[i] ≤ 10<sup>5</sup>, 1 ≤ k ≤ 10<sup>9</sup>'],
starter:`def shortest_subarray(nums, k):
    # your code here
    pass`,solution:`from collections import deque


def shortest_subarray(nums, k):
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    best = len(nums) + 1
    starts = deque()                        # indexes with increasing prefix values
    for j, p in enumerate(prefix):
        while starts and p - prefix[starts[0]] >= k:
            best = min(best, j - starts.popleft())   # shortest for this start: never needed again
        while starts and prefix[starts[-1]] >= p:
            starts.pop()                    # a later, smaller prefix is a better start
        starts.append(j)
    return best if best <= len(nums) else -1`,
tests:[['shortest_subarray([1], 1)','1'],['shortest_subarray([1, 2], 4)','-1'],['shortest_subarray([2, -1, 2], 3)','3'],['shortest_subarray([84, -37, 32, 40, 95], 167)','3'],['shortest_subarray([17, 85, 93, -45, -21], 150)','2'],['shortest_subarray([-28, 81, -20, 28, -29], 89)','3'],['shortest_subarray([1] * 100000, 100000)','100000']],
hints:['Use prefix sums: a subarray i..j−1 has sum prefix[j] − prefix[i]. You want the closest i with prefix[i] ≤ prefix[j] − k.','Keep candidate starts in a deque with increasing prefix values: pop from the front when a start is satisfied, from the back when a new prefix is smaller.'],approach:'Prefix sums + monotonic deque (combines three patterns).',cx:'O(n) time, O(n) space',
mistakes:['A two-pointer window: with negatives, shrinking can make the sum bigger again.','Forgetting that a satisfied start can be popped for good.'],
followup:'Return the subarray itself.'},

{id:'pt-ipo',type:'code',d:3,p:'heap-topk',title:'IPO (maximise capital)',prompt:'<p>You start with capital <code>w</code> and may finish at most <code>k</code> projects. Project i needs <code>capital[i]</code> to start and adds <code>profits[i]</code> to your capital when done. Return the largest final capital.</p>',prereq:['hp-meeting-rooms','gr-activity'],
constraints:['1 ≤ k ≤ 10<sup>5</sup>, 0 ≤ w ≤ 10<sup>9</sup>','1 ≤ n ≤ 10<sup>5</sup>, 0 ≤ profits[i] ≤ 10<sup>4</sup>, 0 ≤ capital[i] ≤ 10<sup>9</sup>'],
starter:`def find_max_capital(k, w, profits, capital):
    # your code here
    pass`,solution:`import heapq


def find_max_capital(k, w, profits, capital):
    projects = sorted(zip(capital, profits))   # cheapest to start first
    available = []                             # max-heap (negated) of affordable profits
    i = 0
    for _ in range(k):
        while i < len(projects) and projects[i][0] <= w:
            heapq.heappush(available, -projects[i][1])
            i += 1
        if not available:
            break                              # nothing affordable any more
        w -= heapq.heappop(available)          # greedy: the most profitable affordable project
    return w`,
tests:[['find_max_capital(2, 0, [1, 2, 3], [0, 1, 1])','4'],['find_max_capital(3, 0, [1, 2, 3], [0, 1, 2])','6'],['find_max_capital(1, 0, [1], [1])','0'],['find_max_capital(10, 0, [1, 2, 3], [0, 1, 2])','6'],['find_max_capital(1, 2, [1, 2, 3], [1, 1, 2])','5'],['find_max_capital(100000, 0, [1] * 100000, list(range(100000)))','100000']],
hints:['Greedy: among the projects you can afford right now, which one should you do?','Sort projects by capital; as w grows, push newly affordable profits into a max-heap and pop the best each round.'],approach:'Sort + max-heap: greedy choice of the best affordable project, k times.',cx:'O(n log n + k log n) time',
mistakes:['Re-scanning all projects every round: O(n · k).','Forgetting to stop when nothing is affordable.'],
followup:'Why is the greedy choice safe? Give an exchange argument.'},
]);
COURSE.qs('greedy',[
{id:'gr-min-refuel',type:'code',d:3,p:'heap-topk',title:'Minimum Refueling Stops',prompt:'<p>A car starts at position 0 with <code>start_fuel</code> litres and uses one litre per kilometre. <code>stations[i] = [position, fuel]</code>, sorted by position. Return the fewest stops needed to reach <code>target</code>, or −1.</p>',prereq:['gr-activity','hp-ropes'],
constraints:['1 ≤ target, start_fuel ≤ 10<sup>9</sup>','0 ≤ len(stations) ≤ 500, 0 &lt; position &lt; target'],
starter:`def min_refuel_stops(target, start_fuel, stations):
    # your code here
    pass`,solution:`import heapq


def min_refuel_stops(target, start_fuel, stations):
    passed = []                         # max-heap (negated) of fuel at stations we drove past
    fuel, stops, i = start_fuel, 0, 0
    while fuel < target:                # fuel = furthest position we can reach
        while i < len(stations) and stations[i][0] <= fuel:
            heapq.heappush(passed, -stations[i][1])
            i += 1
        if not passed:
            return -1
        fuel -= heapq.heappop(passed)   # "we stopped there after all": take the biggest
        stops += 1
    return stops`,
tests:[['min_refuel_stops(1, 1, [])','0'],['min_refuel_stops(100, 1, [[10, 100]])','-1'],['min_refuel_stops(100, 10, [[10, 60], [20, 30], [30, 30], [60, 40]])','2'],['min_refuel_stops(100, 50, [[25, 25], [50, 50]])','1'],['min_refuel_stops(1000, 299, [[13, 21], [26, 115], [100, 47], [225, 99], [299, 141], [444, 198], [608, 190], [636, 157], [647, 255], [841, 123]])','4'],['min_refuel_stops(100, 100, [[50, 1]])','0']],
hints:['Drive as far as you can. Only when you would run out, decide retroactively to have stopped at one of the stations you passed.','Which passed station should that be? The one with the most fuel: keep them in a max-heap.'],approach:'Greedy with a max-heap of passed stations ("refuel retroactively").',cx:'O(n log n) time, O(n) space',
mistakes:['Stopping at every station you reach (not minimal).','A DP over stations and stops works (O(n²)), but misses the greedy insight.'],
followup:'Solve it with DP: dp[s] = furthest reachable with s stops. Compare with the greedy.'},
]);
COURSE.qs('bits',[
{id:'bit-max-xor',type:'code',d:3,p:'bits',title:'Maximum XOR of Two Numbers',prompt:'<p>Return the largest value of <code>nums[i] ^ nums[j]</code> (i may equal j).</p>',prereq:['bit-ops','build-trie'],
constraints:['1 ≤ len(nums) ≤ 2 × 10<sup>5</sup>','0 ≤ nums[i] &lt; 2<sup>31</sup>'],
starter:`def max_xor(nums):
    # your code here
    pass`,solution:`def max_xor(nums):
    best = 0
    for bit in range(30, -1, -1):
        best <<= 1
        candidate = best | 1                   # can this bit of the answer be 1?
        prefixes = {x >> bit for x in nums}
        # a ^ b == candidate  <=>  a ^ candidate == b
        if any(p ^ candidate in prefixes for p in prefixes):
            best = candidate
    return best`,
tests:[['max_xor([3, 10, 5, 25, 2, 8])','28'],['max_xor([14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70])','127'],['max_xor([0])','0'],['max_xor([8, 10, 2])','10'],['max_xor([1, 2])','3'],['max_xor(list(range(2**16)))','2**16 - 1']],
hints:['Build the answer greedily from the highest bit: try to make each bit 1.','For a given candidate prefix c, two numbers whose top bits are a and b give a ^ b == c exactly when a ^ c == b: check with a set. (A binary trie works too.)'],approach:'Greedy bit by bit with a set of prefixes (or a bitwise trie).',cx:'O(31 · n) time, O(n) space',
mistakes:['Trying every pair: O(n²) is too slow for 2 × 10⁵.','Building the answer from the lowest bit, where greedy choices are not safe.'],
followup:'Answer many queries "max x ^ nums[i] for a given x" with a binary trie.'},
]);
