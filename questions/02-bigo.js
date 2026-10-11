/* Topic 2 · Big-O. Includes the quizzes and exercises from the original session 2. */
COURSE.qs('bigo',[
/* ---------- what is the complexity? ---------- */
{id:'bigo-c1',type:'complexity',d:1,p:'big-o',title:'One loop over n',code:`for i in range(n):
    print(i)`,opts:['O(1)','O(log n)','O(n)','O(n²)'],a:'O(n)',why:'The body runs n times; each run is constant work.'},
{id:'bigo-c2',type:'complexity',d:1,p:'big-o',title:'First element',code:`def first(items):
    return items[0]`,a:'O(1)',why:'One index lookup, no matter how long the list is.'},
{id:'bigo-c3',type:'complexity',d:1,p:'big-o',title:'Doubling i',code:`i = 1
while i < n:
    i *= 2`,a:'O(log n)',why:'i takes the values 1, 2, 4, 8, … so it reaches n after about log₂ n steps.'},
{id:'bigo-c4',type:'complexity',d:1,p:'big-o',title:'Loop inside a loop',code:`for i in range(n):
    for j in range(n):
        print(i, j)`,a:'O(n²)',why:'n × n iterations: nested loops multiply.'},
{id:'bigo-c5',type:'complexity',d:1,p:'big-o',title:'Two loops in a row',code:`for i in range(n):
    print(i)
for j in range(n):
    print(j)`,a:'O(n)',why:'Sequential loops add: n + n = 2n → O(n). Drop the constant.'},
{id:'bigo-c6',type:'complexity',d:2,p:'big-o',title:'in on a list, inside a loop',code:`for x in nums:
    if x in nums:
        pass`,a:'O(n²)',why:'<code>x in list</code> is itself a loop, so it is a loop inside a loop.'},
{id:'bigo-c7',type:'complexity',d:1,p:'big-o',title:'in on a set, inside a loop',code:`s = set(nums)
for x in nums:
    if x in s:
        pass`,a:'O(n)',why:'Building the set is O(n); each lookup is O(1) on average.'},
{id:'bigo-c8',type:'complexity',d:1,p:'big-o',title:'Inner loop of fixed size',code:`for i in range(n):
    for j in range(10):
        print(i * j)`,a:'O(n)',why:'The inner loop always runs 10 times: 10n → O(n). Only loops that grow with n matter.'},
{id:'bigo-c9',type:'complexity',d:2,p:'big-o',title:'Loop times halving',code:`for i in range(n):
    j = n
    while j > 1:
        j //= 2`,a:'O(n log n)',why:'n outer iterations, each doing about log n halvings.'},
{id:'bigo-c10',type:'complexity',d:1,p:'big-o',title:'Sort, then scan',code:`nums = sorted(nums)
for i in range(1, len(nums)):
    print(nums[i] - nums[i - 1])`,a:'O(n log n)',why:'Sorting is O(n log n), the scan O(n). Keep the biggest term.'},
{id:'bigo-c11',type:'complexity',d:2,p:'big-o',title:'Naive Fibonacci',code:`def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`,a:'O(2ⁿ)',why:'Each call makes two more calls: the call tree roughly doubles every level.'},
{id:'bigo-c12',type:'complexity',d:2,p:'big-o',title:'Recursion that halves',code:`def f(n):
    if n <= 1:
        return 0
    return 1 + f(n // 2)`,a:'O(log n)',why:'One call per halving: log n calls deep.'},
{id:'bigo-c13',type:'complexity',d:1,p:'big-o',title:'Recursion that shrinks by one',code:`def count_down(n):
    if n == 0:
        return
    count_down(n - 1)`,a:'O(n)',why:'n calls, each O(1).'},
{id:'bigo-c14',type:'complexity',d:2,p:'big-o',title:'Triangle loop',code:`for i in range(n):
    for j in range(i):
        print(i, j)`,a:'O(n²)',why:'0 + 1 + 2 + … + (n − 1) = n(n − 1)/2: still quadratic.'},
{id:'bigo-c15',type:'complexity',d:1,p:'big-o',title:'Three nested loops',code:`for i in range(n):
    for j in range(n):
        for k in range(n):
            pass`,opts:['O(n)','O(n²)','O(n³)','O(3n)'],a:'O(n³)',why:'n × n × n.'},
{id:'bigo-c16',type:'complexity',d:2,p:'big-o',title:'Two different inputs',code:`for a in names:        # n names
    for b in cities:   # m cities
        print(a, b)`,opts:['O(n)','O(n²)','O(n · m)','O(n + m)'],a:'O(n · m)',why:'When two independent sizes are involved, keep both: n × m.'},
{id:'bigo-c17',type:'complexity',d:1,p:'big-o',title:'Every second element',code:`for i in range(0, n, 2):
    print(i)`,a:'O(n)',why:'n/2 iterations. Halving is a constant factor: still O(n).'},
{id:'bigo-c18',type:'complexity',d:2,p:'big-o',title:'Draining a list from the front',code:`while queue:            # queue is a list of n items
    item = queue.pop(0)`,a:'O(n²)',hints:['What does pop(0) cost on a list?'],why:'Each <code>pop(0)</code> shifts every remaining element: O(n) per pop, n pops. Use <code>collections.deque</code> and <code>popleft()</code>.'},
{id:'bigo-c19',type:'complexity',d:1,p:'big-o',title:'Draining a deque',code:`from collections import deque
queue = deque(items)
while queue:
    item = queue.popleft()`,a:'O(n)',why:'<code>popleft</code> is O(1) on a deque.'},
{id:'bigo-c20',type:'complexity',d:2,p:'big-o',title:'Building a string backwards',code:`result = ""
for ch in s:
    result = ch + result`,a:'O(n²)',why:'Strings are immutable: each concatenation copies the whole string so far. Collect pieces in a list and <code>"".join</code> them (or slice <code>s[::-1]</code>).'},
{id:'bigo-c21',type:'complexity',d:1,p:'big-o',title:'Counting with a dict',code:`counts = {}
for w in words:
    counts[w] = counts.get(w, 0) + 1`,a:'O(n)',why:'Each dict read and write is O(1) on average.'},
{id:'bigo-c22',type:'complexity',d:2,p:'binary-search',title:'Binary search loop',code:`lo, hi = 0, len(nums) - 1
while lo <= hi:
    mid = (lo + hi) // 2
    if nums[mid] < target:
        lo = mid + 1
    else:
        hi = mid - 1`,a:'O(log n)',why:'The range halves every iteration.'},
{id:'bigo-s1',type:'complexity',d:1,p:'big-o',title:'Space: a new list',q:'What is the <b>extra space</b> used?',code:`doubled = [x * 2 for x in nums]`,a:'O(n)',why:'It builds a new list of n items.'},
{id:'bigo-s2',type:'complexity',d:1,p:'big-o',title:'Space: a couple of variables',q:'What is the <b>extra space</b> used?',code:`best = nums[0]
for x in nums:
    best = max(best, x)`,a:'O(1)',why:'Only one extra variable, whatever n is.'},
{id:'bigo-s3',type:'complexity',d:2,p:'recursion',title:'Space: recursion depth',q:'What is the <b>extra space</b> used (think about the call stack)?',code:`def total(nums, i=0):
    if i == len(nums):
        return 0
    return nums[i] + total(nums, i + 1)`,a:'O(n)',why:'n calls are waiting on the call stack at the deepest point.'},

/* ---------- rules and costs ---------- */
{id:'bigo-m1',type:'mcq',d:1,p:'big-o',title:'Drop the constants',q:'A function does <code>3n + 5</code> steps. Its Big-O is…',opts:['O(3n + 5)','O(3n)','O(n)','O(1)'],a:2,why:'Constants and constant factors are dropped.'},
{id:'bigo-m2',type:'mcq',d:1,p:'big-o',title:'Keep the biggest term',q:'A function does <code>n² + n</code> steps. Its Big-O is…',opts:['O(n² + n)','O(n²)','O(n)','O(2n)'],a:1,why:'For large n the n² term dominates.'},
{id:'bigo-m3',type:'mcq',d:2,p:'big-o',title:'Which is faster for large n?',q:'Algorithm A takes <code>100n</code> steps, algorithm B takes <code>n² / 100</code>. For very large n…',opts:['A is faster','B is faster','They are the same','It depends on the computer'],a:0,why:'Past n = 10,000, n²/100 overtakes 100n and keeps growing faster. Big-O is about the trend for large n.'},
{id:'bigo-m4',type:'mcq',d:1,p:'big-o',title:'Cost of insert(0, x)',q:'What does <code>lst.insert(0, x)</code> cost on a list of n items?',opts:['O(1)','O(log n)','O(n)'],a:2,why:'Every existing element shifts one place right.'},
{id:'bigo-m5',type:'mcq',d:1,p:'binary-search',title:'Binary search on a million',q:'About how many steps does binary search need for 1,000,000 sorted items?',opts:['About 20','About 1,000','About 500,000','About 1,000,000'],a:0,why:'2²⁰ ≈ 1,000,000, so about 20 halvings.'},
{id:'bigo-m6',type:'mcq',d:1,p:'big-o',title:'What Big-O describes',q:'Big-O notation describes…',opts:['The exact running time in seconds','How the work grows as the input size grows','How much code there is','The best case only'],a:1,why:'It is a growth rate, independent of the machine.'},
{id:'bigo-m7',type:'mcq',d:2,p:'big-o',title:'The O(n²) → O(n) trick',q:'Most O(n²) solutions that search inside a loop can become O(n) by…',opts:['Using a faster computer','Replacing the inner search with a set or dict lookup','Adding a break statement','Using recursion'],a:1,why:'A hash lookup is O(1) on average instead of an O(n) scan.'},

/* ---------- predict + dry run: count the steps ---------- */
{id:'bigo-p1',type:'predict',d:1,p:'big-o',title:'Count the inner steps',code:`count = 0
for i in range(4):
    for j in range(i):
        count += 1
print(count)`,a:'6',hints:['For i = 0, 1, 2, 3 the inner loop runs i times.'],why:'0 + 1 + 2 + 3 = 6 = 4·3/2. The triangle pattern is n(n − 1)/2.'},
{id:'bigo-p2',type:'predict',d:1,p:'big-o',title:'Count the halvings',code:`n = 64
count = 0
while n > 1:
    n //= 2
    count += 1
print(count)`,a:'6',why:'64 = 2⁶, so six halvings reach 1: log₂ 64 = 6.'},
{id:'bigo-p3',type:'predict',d:2,p:'big-o',title:'Steps when n doubles',code:`def steps(n):
    return sum(1 for i in range(n) for j in range(n))

print(steps(10), steps(20))`,a:'100 400',why:'Doubling n multiplies an O(n²) step count by 4.'},
{id:'bigo-dr1',type:'dryrun',d:1,p:'big-o',title:'Counting nested steps',code:`count = 0
for i in range(3):
    for j in range(3):
        count += 1`,cols:['i','count'],given:[0],rows:[['0','3'],['1','6'],['2','9']],why:'Each outer iteration adds 3 inner steps: 3 × 3 = 9 = n².'},

/* ---------- debug: hidden quadratic ---------- */
{id:'bigo-d1',type:'debug',d:2,p:'big-o',title:'Why is this slow?',code:`def common(a, b):
    out = []
    for x in a:
        if x in b:          # a and b are lists
            out.append(x)
    return out`,q:'This is correct but takes minutes for two lists of 100,000 items. Why?',opts:['append is slow','x in b scans the whole list b for every x: O(n · m)','The for loop should use range','Lists cannot hold 100,000 items'],a:1,why:'Turn b into a set first: <code>bset = set(b)</code>, then <code>x in bset</code> is O(1). Total O(n + m).',fix:`def common(a, b):
    bset = set(b)
    return [x for x in a if x in bset]`},

/* ---------- code: from O(n²) to O(n) (exercises from the original session 2) ---------- */
{id:'bigo-has-duplicate',type:'code',d:1,p:'hashing',title:'Contains Duplicate (O(n))',prompt:'<p><code>has_duplicate(nums)</code> returns <code>True</code> if any value appears at least twice. Aim for O(n).</p>',starter:`def has_duplicate(nums):
    # your code here
    pass`,solution:`def has_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False`,tests:[['has_duplicate([1, 2, 3, 1])','True'],['has_duplicate([1, 2, 3])','False'],['has_duplicate([])','False'],['has_duplicate(list(range(100000)) + [5])','True','','100,001 numbers (must be fast)']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>','must run in O(n)'],mistakes:['Comparing every pair: O(n²).','Sorting first: correct, but O(n log n).'],followup:'Return the first value that repeats, not just True or False.',hints:['Comparing every pair is O(n²).','Keep a set of values seen so far. Or compare <code>len(set(nums))</code> with <code>len(nums)</code>.'],approach:'A set of seen values turns each “seen before?” check into O(1).',cx:'O(n) time, O(n) space'},
{id:'bigo-has-pair',type:'code',d:1,p:'hashing',title:'Pair With Target Sum (O(n))',prompt:'<p><code>has_pair(nums, target)</code> returns <code>True</code> if two <b>different positions</b> add up to <code>target</code>. Aim for O(n).</p><p><code>has_pair([3, 5, 8], 13)</code> → True · <code>has_pair([4], 8)</code> → False</p>',starter:`def has_pair(nums, target):
    # your code here
    pass`,solution:`def has_pair(nums, target):
    seen = set()
    for x in nums:
        if target - x in seen:
            return True
        seen.add(x)
    return False`,tests:[['has_pair([3, 5, 8], 13)','True'],['has_pair([4], 8)','False'],['has_pair([4, 4], 8)','True'],['has_pair([], 0)','False'],['has_pair([-2, 7, 1], -1)','True']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>','must run in O(n)'],mistakes:['Adding nums[i] to the set before checking, so 4 + 4 = 8 matches with a single 4.','Nested loops: O(n²).'],followup:'Return the pair of positions, not just True.',hints:['For each x, the partner you need is <code>target - x</code>.','Have you seen it already? A set answers that in O(1).'],approach:'Set of seen values; check for target − x before adding x.',cx:'O(n) time, O(n) space'},
{id:'bigo-first-repeat',type:'code',d:1,p:'hashing',title:'First Repeating Character',prompt:'<p><code>first_repeat(s)</code> returns the first character that appears for the second time while reading left to right, or <code>None</code>.</p><p><code>first_repeat("abcbad")</code> → <code>"b"</code></p>',starter:`def first_repeat(s):
    # your code here
    pass`,solution:`def first_repeat(s):
    seen = set()
    for ch in s:
        if ch in seen:
            return ch
        seen.add(ch)
    return None`,tests:[['first_repeat("abcbad")','"b"'],['first_repeat("abc")','None'],['first_repeat("aa")','"a"'],['first_repeat("")','None']],constraints:['0 ≤ len(s) ≤ 10<sup>5</sup>'],mistakes:['Returning the first character that appears twice anywhere ("abcbad" gives "a" instead of "b").','Using s.count() for every character: O(n²).'],followup:'Return the first character that never repeats.',hints:['Read left to right and remember what you have read.','Remember the characters you have already seen in a set; the first one you see again is the answer.'],approach:'Set of seen characters; return the first one already present.',cx:'O(n) time'},
{id:'bigo-common',type:'code',kind:'optimize',d:2,p:'hashing',title:'Optimize: Common Elements',prompt:'<p>Return the elements of <code>a</code> (in order) that also appear in <code>b</code>. The starter is O(n · m): too slow for 50,000 items each. Make it O(n + m).</p>',starter:`def common(a, b):
    return [x for x in a if x in b]`,solution:`def common(a, b):
    bset = set(b)
    return [x for x in a if x in bset]`,tests:[['common([1, 2, 3, 4], [4, 2])','[2, 4]'],['common([], [1])','[]'],['common(list(range(50000)), list(range(25000, 75000)))','list(range(25000, 50000))','','50,000 × 50,000 (must be fast)'],['common([3, 3, 1], [3])','[3, 3]']],constraints:['0 ≤ len(a), len(b) ≤ 10<sup>5</sup>','must run in O(n + m)'],mistakes:['Keeping <code>x in b</code> with b as a list inside the loop.','Converting a to a set, which loses its order.'],followup:'Keep duplicates only as many times as they appear in b.',hints:['Which line is the hidden inner loop?','Make the lookups O(1).'],approach:'Convert b to a set once.',cx:'O(n + m) time'},
{id:'bigo-count-pairs',type:'code',kind:'optimize',d:2,p:'hashing',title:'Optimize: Count Pairs With Difference k',prompt:'<p>Count pairs of positions i &lt; j with <code>abs(nums[i] - nums[j]) == k</code> (k ≥ 1). The starter checks every pair. Make it O(n).</p><p><code>count_diff_pairs([1, 5, 3, 4, 2], 2)</code> → <code>3</code> ((1, 3), (5, 3) and (4, 2))</p>',starter:`def count_diff_pairs(nums, k):
    count = 0
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if abs(nums[i] - nums[j]) == k:
                count += 1
    return count`,solution:`def count_diff_pairs(nums, k):
    seen = {}
    count = 0
    for x in nums:
        count += seen.get(x - k, 0) + seen.get(x + k, 0)
        seen[x] = seen.get(x, 0) + 1
    return count`,tests:[['count_diff_pairs([1, 5, 3, 4, 2], 2)','3'],['count_diff_pairs([1, 1, 3], 2)','2'],['count_diff_pairs([], 1)','0'],['count_diff_pairs(list(range(30000)), 1)','29999','','30,000 numbers (must be fast)']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>','1 ≤ k'],mistakes:['Counting each pair twice by checking both x + k and x − k for every x.','Ignoring duplicate values (count them with a Counter).'],followup:'What changes if k can be 0?',hints:['For each x, which partner values would make a valid pair with something earlier?','Count earlier occurrences of x − k and x + k with a dict.'],approach:'Hash map of counts of values seen so far.',cx:'O(n) time, O(n) space'}
]);
