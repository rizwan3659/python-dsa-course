/* Topic 4 · Arrays / Python lists — the reference module: every lesson is short text followed by things to DO. */
COURSE.topic({id:'arrays',
goal:'Use Python lists as arrays: know what each operation costs, trace loops by hand, and solve problems with two pointers, prefix sums, sliding windows and Kadane’s algorithm.',
learn:[
{title:'Arrays and indexing',short:'Indexing',mins:8,lead:'A Python list is a dynamic array: its elements sit side by side in memory, so any position can be reached in one jump.',does:['predict','choose'],blocks:[
 {t:'diagram',text:`
 index:      0      1      2      3      4
          ┌──────┬──────┬──────┬──────┬──────┐
  nums =  │  10  │  20  │  30  │  40  │  50  │
          └──────┴──────┴──────┴──────┴──────┘
 index:     -5     -4     -3     -2     -1`,aria:'A list of five numbers with positive indexes 0 to 4 and negative indexes -5 to -1',note:'Address of nums[i] = start + i × (size of one slot). That is why reading or writing nums[i] is O(1).'},
 {t:'grid',items:[
  {title:'Positive index',body:'<code>nums[0]</code> is the first item, <code>nums[len(nums) - 1]</code> the last.'},
  {title:'Negative index',body:'<code>nums[-1]</code> is the last item, <code>nums[-2]</code> the one before it.'},
  {title:'Out of range',body:'<code>nums[5]</code> on a 5-item list raises <code>IndexError</code>. Slices like <code>nums[2:99]</code> never raise.'}]},
 {t:'code',title:'Try it',code:`nums = [10, 20, 30, 40, 50]
print(nums[0], nums[-1])       # 10 50
print(nums[1:4])               # [20, 30, 40]
nums[2] = 99                   # O(1) update
print(nums, len(nums))`},
 {t:'q',ids:['arr-p2','arr-p12','arr-p13','arr-m1']}]},

{title:'Traversal: visiting every element',short:'Traversal',mins:10,lead:'Most array algorithms are a loop plus a little state: a total, a best-so-far, a count. Learn to trace that state by hand.',does:['dry run','predict','complete','code'],blocks:[
 {t:'code',title:'Four ways to loop',code:`nums = [4, 7, 2]
for x in nums:                  # values only
    print(x)
for i in range(len(nums)):      # indexes (needed to modify nums[i])
    nums[i] *= 10
for i, x in enumerate(nums):    # index and value
    print(i, x)
for x in reversed(nums):        # backwards, no copy
    print(x)`},
 {t:'callout',html:'<b>Tracing rule:</b> write one table row per iteration, with the value of every variable <i>after</i> that iteration. You will do this a lot.'},
 {t:'q',ids:['arr-dr1','arr-dr2']},
 {t:'q',ids:['arr-p1','arr-p3','arr-p11']},
 {t:'q',ids:['arr-b1','arr-b4']},
 {t:'q',title:'Code it',ids:['arr-find-max']}]},

{title:'Insert, delete, search, update',short:'Operations',mins:10,lead:'Updating or reading by index is instant. Inserting or deleting in the middle is not: every element after the gap has to shift.',does:['visualize','predict','complexity','debug'],blocks:[
 {t:'viz',fn:'array-ops',title:'Watch the shifts',intro:'Insert 99 at index 0, then at the end. Count the shifts. Then delete index 1 and search for a value that is not there.'},
 {t:'table',head:['Operation','Python','Cost','Why'],rows:[
  ['Read / update by index','<code>a[i]</code>, <code>a[i] = x</code>','O(1)','direct address'],
  ['Add / remove at the end','<code>a.append(x)</code>, <code>a.pop()</code>','O(1)*','no shifting (*amortized)'],
  ['Insert / delete at i','<code>a.insert(i, x)</code>, <code>del a[i]</code>, <code>a.pop(i)</code>','O(n)','n − i elements shift'],
  ['Search by value','<code>x in a</code>, <code>a.index(x)</code>, <code>a.remove(x)</code>','O(n)','scans from the start'],
  ['Copy a slice','<code>a[i:j]</code>','O(j − i)','builds a new list']]},
 {t:'q',ids:['arr-p4','arr-p5','arr-p6','arr-p7']},
 {t:'q',ids:['arr-c1','arr-c3','arr-c6']},
 {t:'q',title:'Find the bug',ids:['arr-d4','arr-d3']}]},

{title:'Dynamic arrays and amortized cost',short:'Dynamic arrays',mins:7,lead:'A list keeps spare capacity. When it fills up, Python allocates a bigger block and copies everything over. That copy is O(n), but it is rare.',does:['visualize','concept','predict','choose'],blocks:[
 {t:'diagram',text:`
 capacity 4, full:    [10][20][30][40]
 append(50):          allocate 8 slots, copy 4 elements, then write 50
                      [10][20][30][40][50][  ][  ][  ]
 next 3 appends:      no copying at all`,aria:'Dynamic array growth from capacity 4 to 8'},
 {t:'callout',html:'Because capacity grows by a constant factor, n appends cost about 2n element copies in total. Spread over n appends that is O(1) each: <b>amortized O(1)</b>.'},
 {t:'viz',fn:'array-ops',title:'Fill it up',intro:'Press “Append v” until the array is full, then once more, and watch the copy.'},
 {t:'q',ids:['arr-m2','arr-c4','arr-p8','arr-p9']},
 {t:'q',title:'Choose the structure',ids:['arr-ch1','arr-ch2','arr-ch3']}]},

{title:'Two pointers',short:'Two pointers',mins:10,lead:'Two indexes that walk the array together. Opposite ends moving inward (reverse, pair sum in sorted data) or a slow writer chasing a fast reader (remove duplicates, move zeroes).',does:['visualize','dry run','complete','code'],blocks:[
 {t:'grid',cols:2,items:[
  {tag:'Opposite ends',title:'left → … ← right',body:'<pre><code>left, right = 0, len(a) - 1\nwhile left &lt; right:\n    ...\n    left += 1  # and/or\n    right -= 1</code></pre><p>Reverse, palindrome check, pair sum in a sorted array, container with most water.</p>'},
  {tag:'Same direction',title:'write chases read',body:'<pre><code>write = 0\nfor read in range(len(a)):\n    if keep(a[read]):\n        a[write] = a[read]\n        write += 1</code></pre><p>Remove duplicates, move zeroes, filter in place with O(1) extra space.</p>'}]},
 {t:'viz',fn:'two-pointers',title:'Step through it',intro:'Try every mode. In “Pair sum”, predict which pointer moves before pressing Next.'},
 {t:'q',ids:['arr-dr3','arr-b2','arr-m3']},
 {t:'q',title:'Trace and debug',ids:['arr-dr7','arr-d7','arr-d5']},
 {t:'q',title:'Code it',ids:['arr-reverse','arr-move-zeroes']}]},

{title:'Prefix sums',short:'Prefix sums',mins:8,lead:'Spend O(n) once to store running totals. After that, the sum of any range is one subtraction.',does:['visualize','predict','dry run','complete','code'],blocks:[
 {t:'diagram',text:`
 nums    =     [ 3,  1,  4,  1,  5 ]
 prefix  = [ 0,  3,  4,  8,  9, 14 ]      prefix[i] = sum of the first i numbers

 sum(nums[1..3]) = prefix[4] - prefix[1] = 9 - 3 = 6     (1 + 4 + 1)`,aria:'Prefix sum array example'},
 {t:'viz',fn:'prefix-sum',title:'Build it, then query it',intro:'Change l and r and press Load. Notice the query never loops.'},
 {t:'q',ids:['arr-p16','arr-dr4','arr-b3']},
 {t:'q',ids:['arr-ch4','arr-c10']},
 {t:'q',title:'Code it',ids:['arr-running-sum','arr-pivot']}]},

{title:'Sliding window',short:'Sliding window',mins:10,lead:'For questions about contiguous ranges (“subarray”, “substring”, “k in a row”), keep a window and update it as it moves instead of recomputing it.',does:['visualize','dry run','complete','complexity','code'],blocks:[
 {t:'grid',cols:2,items:[
  {tag:'Fixed size k',title:'Add one, drop one',body:'<pre><code>window = sum(a[:k])\nfor right in range(k, len(a)):\n    window += a[right] - a[right - k]</code></pre>'},
  {tag:'Variable size',title:'Grow right, shrink left',body:'<pre><code>left = 0\nfor right in range(len(a)):\n    add(a[right])\n    while window_is_invalid():\n        remove(a[left])\n        left += 1\n    record(right - left + 1)</code></pre>'}]},
 {t:'viz',fn:'sliding-window',title:'Slide it',intro:'Fixed window first, then the two variable-size modes. Watch left and right: neither ever moves backwards, which is why it is O(n).'},
 {t:'q',ids:['arr-dr6','arr-b5','arr-c9','arr-m4']},
 {t:'q',title:'Code it',ids:['arr-max-sum-k','arr-min-len']}]},

{title:"Kadane's algorithm",short:'Kadane',mins:8,lead:'Maximum subarray sum in one pass. At each number ask one question: extend the run that ends just before it, or start fresh here?',does:['visualize','dry run','complete','code'],blocks:[
 {t:'code',title:'The whole algorithm',code:`def max_subarray(nums):
    cur = best = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)     # extend or restart
        best = max(best, cur)     # remember the best run
    return best

print(max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4]))   # 6`},
 {t:'viz',fn:'kadane',title:'Watch cur and best',intro:'Before each Next, decide: extend or restart?'},
 {t:'q',ids:['arr-dr5','arr-b6']},
 {t:'q',title:'Code it',ids:['arr-max-subarray','arr-stock']}]}],

challenge:[
 {t:'b2o',title:'Two Sum: nested loops → hash map',qid:'arr-two-sum',problem:'<p>Return the indices of the two numbers in <code>nums</code> that add up to <code>target</code>.</p><p><code>two_sum([2, 7, 11, 15], 9)</code> → <code>[0, 1]</code></p>',
  brute:{note:'Check every pair.',code:`def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]`,cx:'O(n²)',why:'About n²/2 pairs. For 100,000 numbers that is 5 billion checks.'},
  slow:{q:'What work is repeated?',opts:['Adding nums[i] + nums[j]','For each i, scanning the rest of the list looking for one specific value: target − nums[i]','Returning the answer','Creating the range objects'],a:1,why:'The inner loop is a <b>search</b> for a known value. Searching a list is O(n); we do it n times.'},
  better:{q:'Which tool makes “have I seen value v?” instant?',opts:['A sorted list','A hash map (dict) from value to index','A stack','A second nested loop'],a:1,why:'A dict lookup is O(1) on average. Store each number as you pass it.'},
  optimal:{note:'One pass: before storing x, check whether its partner was already seen.',code:`def two_sum(nums, target):
    seen = {}                      # value -> index
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:
            return [seen[need], i]
        seen[x] = i`,cx:'O(n)',why:'One loop with O(1) work per element. Space is O(n) for the dict: we traded memory for time.'},
  takeaway:'<p>When an inner loop is <b>searching for a specific value</b>, replace it with a set or dict lookup. This one idea turns dozens of O(n²) problems into O(n).</p>'},
 {t:'b2o',title:'Maximum Subarray: all ranges → Kadane',qid:'arr-max-subarray',problem:'<p>Return the largest sum of any non-empty contiguous subarray.</p>',
  brute:{note:'Try every start and every end, keeping a running total.',code:`def max_subarray(nums):
    best = nums[0]
    for i in range(len(nums)):
        total = 0
        for j in range(i, len(nums)):
            total += nums[j]
            best = max(best, total)
    return best`,cx:'O(n²)',why:'n starts × up to n ends.'},
  slow:{q:'Look at the runs ending at index j. What is wasted?',opts:['We compute runs ending at j separately for every start i, although only the best one ending at j matters','Adding numbers is slow','The max() call','Nothing is wasted'],a:0,why:'For a fixed end j we only need the best sum of a run ending there, and that can be built from the best run ending at j − 1.'},
  better:{q:'If cur is the best sum ending at j − 1, what is the best sum ending at j?',opts:['cur + nums[j], always','max(nums[j], cur + nums[j])','max(cur, nums[j])','nums[j]'],a:1,why:'Either extend the previous run or start fresh at nums[j]: whichever is larger.'},
  optimal:{code:`def max_subarray(nums):
    cur = best = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best`,cx:'O(n)',why:'One pass, O(1) work per element, O(1) space.'},
  takeaway:'<p>Ask “what is the best answer <b>ending here</b>?” and build it from the previous one. That is the seed of dynamic programming.</p>'},
 {t:'b2o',title:'Container With Most Water: all pairs → two pointers',qid:'arr-container',problem:'<p>Pick two walls; the water they hold is <code>min(height) × distance</code>. Return the maximum.</p>',
  brute:{code:`def max_area(height):
    best = 0
    for i in range(len(height)):
        for j in range(i + 1, len(height)):
            best = max(best, min(height[i], height[j]) * (j - i))
    return best`,cx:'O(n²)',why:'Every pair of walls.'},
  slow:{q:'Start with the widest pair (both ends). The left wall is shorter. Which pairs can we rule out?',opts:['None','Every pair that uses the short left wall with any other right wall: they are narrower and still capped by the short wall','Every pair using the right wall','Half of all pairs at random'],a:1,why:'Pairing the short wall with anything closer can only lose width without gaining height. So the short wall is done.'},
  better:{q:'So which pattern fits?',opts:['Hash map','Two pointers from both ends, moving the shorter wall','Sorting','Prefix sums'],a:1,why:'Each step discards one wall for good: n steps total.'},
  optimal:{code:`def max_area(height):
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        best = max(best, min(height[left], height[right]) * (right - left))
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return best`,cx:'O(n)',why:'Each iteration moves one pointer; they meet after n − 1 moves.'},
  takeaway:'<p>Two pointers work when each comparison lets you <b>throw away</b> one candidate for good.</p>'}],

review:[
 {t:'flash',title:'Flashcards',items:[
  ['Cost of nums[i]?','O(1): direct address.'],['Cost of insert(0, x)?','O(n): every element shifts right.'],['Why is append O(1)?','Amortized: capacity doubles, so copies are rare.'],
  ['x in list vs x in set?','O(n) scan vs O(1) average hash lookup.'],['Two pointers: when?','Sorted data (pair sums), reversing, in-place filtering with read/write indexes.'],
  ['Prefix sum range formula?','sum(l..r) = prefix[r + 1] − prefix[l].'],['Sliding window: when?','Contiguous subarray/substring questions where the window can be updated incrementally.'],
  ["Kadane's update?",'cur = max(x, cur + x); best = max(best, cur).'],['[[0] * 3] * 2 problem?','Both rows are the same list. Use a comprehension.']]}]
});
