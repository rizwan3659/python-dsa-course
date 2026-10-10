/* Topic 2 · Big-O. Cards, rules, cost table and growth lab come from the original session 2. */
COURSE.topic({id:'bigo',
goal:'Predict how running time and memory grow with input size, and know the cost of everyday Python operations.',
learn:[
{title:'Big-O in plain words',short:'Big-O',mins:8,lead:'Big-O describes how the work grows as the input size n grows. We ignore constants and keep only the fastest-growing part.',does:['concept','complexity'],blocks:[
 {t:'cards',items:[
  {tag:'O(1)',title:'Constant',sub:'Same work for any n',body:'<pre><code>def first(items):\n    return items[0]</code></pre><p>Index a list, look up a dict key, append to a list.</p>'},
  {tag:'O(log n)',title:'Logarithmic',sub:'Halve the problem each step',body:'<pre><code>while n &gt; 1:\n    n //= 2</code></pre><p>Binary search: 1 million items in about 20 steps.</p>'},
  {tag:'O(n)',title:'Linear',sub:'Look at each item once',body:'<pre><code>total = 0\nfor x in items:\n    total += x</code></pre><p>One loop over the input.</p>'},
  {tag:'O(n log n)',title:'Linearithmic',sub:'Good sorting',body:'<p><code>sorted(items)</code>, merge sort. Usually the best you can do if you must sort.</p>'},
  {tag:'O(n²)',title:'Quadratic',sub:'A loop inside a loop',body:'<pre><code>for i in range(n):\n    for j in range(n):\n        ...</code></pre><p>Compare every pair. 10,000 items → 100 million steps.</p>'},
  {tag:'O(2ⁿ)',title:'Exponential',sub:'Try every subset',body:'<p>Naive recursive Fibonacci, all subsets. Unusable beyond n ≈ 30–40.</p>'}]},
 {t:'grid',title:'Three rules',items:[
  {title:'Drop constants',body:'3n + 5 → O(n). Two separate loops over n is still O(n).'},
  {title:'Keep the biggest term',body:'n² + n → O(n²). For large n the smaller terms do not matter.'},
  {title:'Nested multiplies, sequential adds',body:'A loop inside a loop: n × n. One loop after another: n + n.'}]},
 {t:'q',ids:['bigo-m6','bigo-m1','bigo-m2','bigo-c1']}]},

{title:'Count the steps',short:'Counting',mins:8,lead:'You do not need maths to find a Big-O: count how many times the innermost line runs, and watch what happens when n doubles.',does:['visualize','predict','dry run'],blocks:[
 {t:'viz',fn:'stepcount',title:'Predict, then measure',intro:'Pick each loop shape. Answer first; the step table appears after.'},
 {t:'q',ids:['bigo-p1','bigo-p2','bigo-dr1','bigo-p3']}]},

{title:'Spot the complexity',short:'Spotting',mins:10,lead:'Train your eye: loop shapes, halving, hidden loops inside built-in calls, and recursion.',does:['complexity'],blocks:[
 {t:'q',title:'Loop shapes',ids:['bigo-c2','bigo-c3','bigo-c4','bigo-c5','bigo-c8','bigo-c14','bigo-c17']},
 {t:'q',title:'Combinations',ids:['bigo-c9','bigo-c10','bigo-c15','bigo-c16']},
 {t:'q',title:'Recursion',ids:['bigo-c11','bigo-c12','bigo-c13']}]},

{title:'How fast does it grow?',short:'Growth lab',mins:7,lead:'Move the slider and compare how many steps each complexity needs, and roughly how long Python would take at about 10 million simple steps per second.',does:['visualize','concept'],blocks:[
 {t:'viz',fn:'growth',title:'Growth table',intro:'Set n to 1 million. Which complexities finish in under a second?'},
 {t:'viz',fn:'curves',title:'Growth curves'},
 {t:'q',ids:['bigo-m3','bigo-m5']},
 {t:'teacher',items:['Set n to 1 million. Ask: which of these finish in under a second? Only O(1) to O(n log n). That is why interviewers push for better than O(n²).']}]},

{title:'What Python operations cost',short:'Python costs',mins:9,lead:'Many one-liners hide a loop. Knowing these costs is how you spot an accidental O(n²).',does:['complexity','debug'],blocks:[
 {t:'table',head:['Operation','Average cost','Why'],rows:[
  ['<code>lst[i]</code>, <code>lst[i] = x</code>','O(1)','Lists are arrays: jump straight to position i'],
  ['<code>lst.append(x)</code>, <code>lst.pop()</code>','O(1)','Work at the end only (append is O(1) amortised: Python keeps spare room)'],
  ['<code>lst.insert(0, x)</code>, <code>lst.pop(0)</code>','O(n)','Every other item shifts one place'],
  ['<code>x in lst</code>, <code>lst.index(x)</code>','O(n)','Scans from the start'],
  ['<code>lst[a:b]</code>','O(b − a)','Copies the slice'],
  ['<code>sorted(lst)</code>, <code>lst.sort()</code>','O(n log n)','Timsort'],
  ['<code>d[key]</code>, <code>key in d</code>, <code>d[key] = v</code>','O(1)','Hash table: jump straight to the slot for that key'],
  ['<code>x in s</code>, <code>s.add(x)</code>','O(1)','Hash table'],
  ['<code>deque.appendleft</code>, <code>popleft</code>','O(1)','Built for fast work at both ends'],
  ['<code>s1 + s2</code> on strings','O(len)','Strings cannot change, so a new one is built'],
  ['<code>"".join(parts)</code>','O(total length)','The right way to build a long string'],
  ['<code>min(lst)</code>, <code>sum(lst)</code>','O(n)','Look at every item']]},
 {t:'code',title:'See it: list vs set lookup',code:`import time

n = 20000
items = list(range(n))
lookup = set(items)

start = time.perf_counter()
hits = sum(1 for x in range(n) if x in items)      # O(n) each → O(n²)
t_list = time.perf_counter() - start

start = time.perf_counter()
hits = sum(1 for x in range(n) if x in lookup)     # O(1) each → O(n)
t_set = time.perf_counter() - start

print(f"list: {t_list:.3f} s   set: {t_set:.4f} s   ~{t_list / max(t_set, 1e-9):.0f}x faster")`,note:'Timings vary by machine; the gap is what matters.'},
 {t:'q',ids:['bigo-c6','bigo-c7','bigo-m4','bigo-c18','bigo-c19','bigo-c20','bigo-c21']},
 {t:'q',title:'Find the slow line',ids:['bigo-d1']}]},

{title:'Space complexity',short:'Space',mins:5,lead:'Memory grows with n too. Count the extra lists, dicts and sets you build, and the depth of the call stack.',does:['complexity'],blocks:[
 {t:'q',ids:['bigo-s1','bigo-s2','bigo-s3']}]},

{title:'From O(n²) to O(n)',short:'Speed it up',mins:12,lead:'Each problem has an obvious O(n²) answer with two loops. Aim for O(n) using a set or dict.',does:['code','optimize'],blocks:[
 {t:'q',ids:['bigo-m7']},
 {t:'q',title:'Code it',ids:['bigo-has-duplicate','bigo-has-pair','bigo-first-repeat']},
 {t:'teacher',items:['After the pair exercise, ask: what is the space cost? O(n) for the set. We traded memory for time, a trade-off that comes up constantly.']}]}],

challenge:[
 {t:'b2o',title:'Contains Duplicate: all pairs → set',qid:'bigo-has-duplicate',problem:'<p>Return True if any value appears at least twice.</p>',
  brute:{code:`def has_duplicate(nums):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] == nums[j]:
                return True
    return False`,cx:'O(n²)',why:'Every pair is compared once.'},
  slow:{q:'What does the inner loop really do?',opts:['It sorts the list','It searches the rest of the list for the value nums[i]','It counts all values','Nothing useful'],a:1,why:'It is a search for one specific value, repeated n times.'},
  better:{q:'Which tool answers “have I seen this value?” in O(1)?',opts:['A list','A set','A tuple','A string'],a:1,why:'Hash-based membership is O(1) on average.'},
  optimal:{code:`def has_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False`,cx:'O(n)',why:'One pass with O(1) work per element; O(n) extra space.'},
  takeaway:'<p>Same trick as Two Sum: an inner search becomes a set lookup.</p>'}],

review:[
 {t:'flash',items:[['O(n²) to O(n) trick?','Replace an inner search with a set or dict lookup.'],['Cost of lst.insert(0, x)?','O(n): everything shifts.'],['Cost of x in set?','O(1) on average.'],['Two loops one after another?','O(n): add, then drop constants.'],['Binary search?','O(log n).'],['Space complexity?','Extra memory used, as a function of n.'],['String += in a loop?','Can be O(n²): use "".join.'],['Recursion space?','O(depth) for the call stack.']]},
 {t:'task',title:'Homework',items:['For each exercise in topics 1–2, write its time and space complexity as a comment.']}]
});
