COURSE.add({id:'s02',n:2,part:'A',
title:'Big-O: measuring how code scales',
goal:'Predict how running time and memory grow with input size, and know the cost of everyday Python operations.',
outcomes:['Count the work a piece of code does','Name the Big-O of common code shapes','Know which Python operations are O(1) and which are O(n)','Turn an O(n²) solution into O(n) with a set or dict'],
modules:[
{title:'Warm-up: recall session 1',tab:'Warm-up',mins:10,out:'Recall quiz',blocks:[
 {t:'mcq',items:[
  {q:'<code>a = [3, 1, 2]; print(a.sort())</code>',opts:['[1, 2, 3]','None'],a:1},
  {q:'Which is fastest for "is x in my collection?"',opts:['list','set'],a:1},
  {q:'First step of UMPIRE?',opts:['Implement','Understand'],a:1}]}]},

{title:'Big-O in plain words',tab:'Big-O',mins:25,out:'Name the Big-O of 6 code shapes',lead:'Big-O describes how the work grows as the input size n grows. We ignore constants and keep only the fastest-growing part.',blocks:[
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
 {t:'mcq',title:'What is the Big-O?',items:[
  {q:'<pre><code>for x in nums:\n    if x in nums: ...</code></pre>',opts:['O(n)','O(n²)'],a:1,why:'<code>x in list</code> is itself a loop, so it is a loop inside a loop.'},
  {q:'<pre><code>s = set(nums)\nfor x in nums:\n    if x in s: ...</code></pre>',opts:['O(n)','O(n²)'],a:0,why:'Building the set is O(n); each lookup is O(1) on average.'},
  {q:'<pre><code>i = 1\nwhile i &lt; n:\n    i *= 2</code></pre>',opts:['O(n)','O(log n)'],a:1},
  {q:'<pre><code>for i in range(n): ...\nfor j in range(n): ...</code></pre>',opts:['O(n)','O(n²)'],a:0,why:'Sequential loops add: 2n → O(n).'},
  {q:'Space used by <code>[x * 2 for x in nums]</code>?',opts:['O(1)','O(n)'],a:1,why:'It builds a new list of n items.'}]}]},

{title:'Lab: how fast does it grow?',tab:'Growth lab',mins:20,out:'Feel the difference between O(n) and O(n²)',lead:'Move the slider and compare how many steps each complexity needs, and roughly how long Python would take at about 10 million simple steps per second.',blocks:[
 {t:'lab',fn:'growth'},
 {t:'teacher',items:['Set n to 1 million. Ask: which of these finish in under a second? Only O(1) to O(n log n). That is why interviewers push for better than O(n²).']}]},

{title:'What Python operations cost',tab:'Python costs',mins:20,out:'Know the cost of 12 operations',blocks:[
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
 {t:'code',title:'See it: list vs set lookup',code:`
import time

n = 20000
items = list(range(n))
lookup = set(items)

start = time.perf_counter()
hits = sum(1 for x in range(n) if x in items)      # O(n) each → O(n²)
t_list = time.perf_counter() - start

start = time.perf_counter()
hits = sum(1 for x in range(n) if x in lookup)     # O(1) each → O(n)
t_set = time.perf_counter() - start

print(f"list: {t_list:.3f} s   set: {t_set:.4f} s   ~{t_list / t_set:.0f}x faster")`,note:'Timings vary by machine; the gap is what matters.'}]},

{title:'Coding exercises: from O(n²) to O(n)',tab:'Exercises',mins:30,out:'3 exercises solved',lead:'Each problem has an obvious O(n²) answer with two loops. Aim for O(n) using a set or dict.',blocks:[
 {t:'exercise',title:'Exercise 1 · Contains duplicate',prompt:'<p><code>has_duplicate(nums)</code> returns <code>True</code> if any value appears at least twice. Aim for O(n).</p>',
  starter:`
def has_duplicate(nums):
    # your code here
    pass`,
  solution:`
def has_duplicate(nums):
    seen = set()
    for x in nums:
        if x in seen:
            return True
        seen.add(x)
    return False`,
  tests:[['has_duplicate([1, 2, 3, 1])','True'],['has_duplicate([1, 2, 3])','False'],['has_duplicate([])','False'],['has_duplicate(list(range(100000)) + [5])','True']],
  hint:'Keep a set of values seen so far. Or compare <code>len(set(nums))</code> with <code>len(nums)</code>.'},
 {t:'exercise',title:'Exercise 2 · Pair with target sum',prompt:'<p><code>has_pair(nums, target)</code> returns <code>True</code> if two <b>different positions</b> add up to <code>target</code>. Aim for O(n).</p><p><code>has_pair([3, 5, 8], 13)</code> → True · <code>has_pair([4], 8)</code> → False</p>',
  starter:`
def has_pair(nums, target):
    # your code here
    pass`,
  solution:`
def has_pair(nums, target):
    seen = set()
    for x in nums:
        if target - x in seen:
            return True
        seen.add(x)
    return False`,
  tests:[['has_pair([3, 5, 8], 13)','True'],['has_pair([4], 8)','False'],['has_pair([4, 4], 8)','True'],['has_pair([], 0)','False'],['has_pair([-2, 7, 1], -1)','True']],
  hint:'For each x, the partner you need is <code>target - x</code>. Have you seen it already?'},
 {t:'exercise',title:'Exercise 3 · First repeating character',prompt:'<p><code>first_repeat(s)</code> returns the first character that appears for the second time while reading left to right, or <code>None</code>.</p><p><code>first_repeat("abcbad")</code> → <code>"b"</code></p>',
  starter:`
def first_repeat(s):
    # your code here
    pass`,
  solution:`
def first_repeat(s):
    seen = set()
    for ch in s:
        if ch in seen:
            return ch
        seen.add(ch)
    return None`,
  tests:[['first_repeat("abcbad")','"b"'],['first_repeat("abc")','None'],['first_repeat("aa")','"a"'],['first_repeat("")','None']]},
 {t:'teacher',items:['After exercise 2, ask: what is the space cost? O(n) for the set. We traded memory for time, a trade-off that comes up constantly.']}]},

{title:'Review',tab:'Review',mins:15,out:'Exit quiz + homework',blocks:[
 {t:'flash',items:[['O(n²) to O(n) trick?','Replace an inner search with a set or dict lookup.'],['Cost of lst.insert(0, x)?','O(n): everything shifts.'],['Cost of x in set?','O(1) on average.'],['Two loops one after another?','O(n): add, then drop constants.'],['Binary search?','O(log n).'],['Space complexity?','Extra memory used, as a function of n.']]},
 {t:'mcq',title:'Exit quiz',items:[
  {q:'Sorting then scanning once is…',opts:['O(n)','O(n log n)','O(n²)'],a:1},
  {q:'Building a string with <code>s += ch</code> in a loop of n characters can be…',opts:['O(n)','O(n²) in the worst case'],a:1,why:'Each += may copy the string. Collect parts in a list and <code>"".join</code> them.'}]},
 {t:'task',title:'Homework',items:['For each exercise in sessions 1–2, write its time and space complexity as a comment.']}]}
],
labs:{
 growth(el,api){
  const F=[['O(1)',n=>1],['O(log n)',n=>Math.max(1,Math.log2(n))],['O(n)',n=>n],['O(n log n)',n=>n*Math.max(1,Math.log2(n))],['O(n²)',n=>n*n],['O(2ⁿ)',n=>Math.pow(2,n)]];
  el.innerHTML=`<label>Input size n: <b class="mono" data-nv></b><input type="range" min="1" max="7" step="0.5" value="3" data-n></label><div class="tbl"><table><thead><tr><th>Complexity</th><th>Steps</th><th>Time at ~10⁷ steps/s</th><th style="width:40%">Relative (log scale)</th></tr></thead><tbody data-t></tbody></table></div><div class="verdict" data-v></div>`;
  const fmtN=v=>!isFinite(v)||v>1e300?'astronomical':v>=1e15?v.toExponential(1):v>=1e6?(v/1e6).toFixed(1)+' million':Math.round(v).toLocaleString();
  const fmtT=s=>!isFinite(s)||s>3e15?'longer than the universe':s<1e-3?'< 1 ms':s<1?(s*1000).toFixed(0)+' ms':s<120?s.toFixed(1)+' s':s<7200?(s/60).toFixed(0)+' min':s<172800?(s/3600).toFixed(0)+' hours':s<6.3e7?(s/86400).toFixed(0)+' days':(s/3.15e7).toExponential(1)+' years';
  const draw=()=>{const n=Math.round(Math.pow(10,+api.$('[data-n]',el).value));api.$('[data-nv]',el).textContent=n.toLocaleString();
   const rows=F.map(([name,f])=>{const v=f(n),s=v/1e7,w=Math.min(100,Math.max(1,Math.log10(Math.max(1,Math.min(v,1e300)))/12*100));return `<tr><td class="mono">${name}</td><td class="mono">${fmtN(v)}</td><td class="mono" style="color:${s>1?'var(--marker)':'var(--good)'}">${fmtT(s)}</td><td><div class="meter"><i style="width:${w}%;background:${s>1?'var(--marker)':'var(--accent)'}"></i></div></td></tr>`});
   api.$('[data-t]',el).innerHTML=rows.join('');
   api.$('[data-v]',el).innerHTML=n>=1e5?`At n = ${n.toLocaleString()}, O(n²) needs ${fmtN(n*n)} steps (${fmtT(n*n/1e7)}). O(n log n) needs ${fmtN(n*Math.log2(n))} (${fmtT(n*Math.log2(n)/1e7)}). This gap is why algorithm choice matters more than a faster computer.`:'For small n everything is fast. Push the slider right to see where O(n²) and O(2ⁿ) fall apart.'};
  el.addEventListener('input',draw);draw()}
}});
