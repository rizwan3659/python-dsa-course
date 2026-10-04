COURSE.add({id:'s03',n:3,part:'A',
title:'Recursion',
goal:'Understand how a function that calls itself works, write recursive solutions with clear base cases, and speed them up with memoization.',
outcomes:['Explain the call stack and base cases','Draw a recursion tree and count the calls','Use memoization (lru_cache) to remove repeated work','Write recursive functions on numbers, strings and nested lists'],
modules:[
{title:'Warm-up: recall session 2',tab:'Warm-up',mins:10,out:'Recall quiz',blocks:[
 {t:'mcq',items:[
  {q:'A loop inside a loop over n items is…',opts:['O(n)','O(n²)'],a:1},
  {q:'Halving n until it reaches 1 takes…',opts:['O(log n) steps','O(n) steps'],a:0},
  {q:'<code>lst.pop(0)</code> costs…',opts:['O(1)','O(n)'],a:1}]}]},

{title:'How recursion works',tab:'Call stack',mins:25,out:'Trace a recursive call by hand',lead:'A recursive function solves a problem by solving a smaller copy of the same problem. Every recursive function needs a base case that stops it.',blocks:[
 {t:'cards',items:[
  {tag:'1',title:'Base case',sub:'When to stop',body:'<p>The smallest input, answered directly. Without it the function calls itself forever (RecursionError).</p>'},
  {tag:'2',title:'Recursive case',sub:'Make it smaller',body:'<p>Call the function on a smaller input and use the result. Each call must move toward the base case.</p>'},
  {tag:'3',title:'Trust the call',sub:'Leap of faith',body:'<p>Assume <code>f(n - 1)</code> already works. Only think about how to get <code>f(n)</code> from it.</p>'},
  {tag:'4',title:'The call stack',sub:'Where the waiting happens',body:'<p>Each call waits on the stack until the smaller call returns. Python allows about 1,000 levels by default, so very deep recursion needs a loop instead.</p>'}]},
 {t:'code',title:'Watch the stack grow and unwind',code:`
def factorial(n, depth=0):
    print("  " * depth + f"factorial({n}) called")
    if n <= 1:                         # base case
        print("  " * depth + "base case → 1")
        return 1
    result = n * factorial(n - 1, depth + 1)   # recursive case
    print("  " * depth + f"factorial({n}) returns {result}")
    return result

factorial(4)`},
 {t:'mcq',items:[
  {q:'<pre><code>def f(n):\n    return n + f(n - 1)</code></pre>What happens with f(3)?',opts:['Returns 6','RecursionError: no base case'],a:1},
  {q:'<pre><code>def g(n):\n    if n == 0: return 0\n    return 1 + g(n - 2)</code></pre>g(3)?',opts:['2','RecursionError'],a:1,why:'3 → 1 → −1 → … never hits 0. Base cases must cover every path: use <code>n &lt;= 0</code>.'}]}]},

{title:'Lab: recursion trees and memoization',tab:'Recursion lab',mins:20,out:'Count calls with and without memo',lead:'Naive Fibonacci calls itself twice per call. Draw the tree and count the calls, then turn on memoization.',blocks:[
 {t:'lab',fn:'fibtree'},
 {t:'code',title:'Memoization in one line',code:`
from functools import lru_cache

calls = 0

@lru_cache(maxsize=None)
def fib(n):
    global calls
    calls += 1
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(80), "calls:", calls)    # 81 calls instead of trillions`}]},

{title:'Recursion patterns',tab:'Patterns',mins:20,out:'Recognise 3 patterns',blocks:[
 {t:'grid',items:[
  {tag:'Shrink by one',title:'Process first, recurse on the rest',body:'<pre><code>def total(nums):\n    if not nums:\n        return 0\n    return nums[0] + total(nums[1:])</code></pre><p>Clear, but slicing copies: O(n²) overall. Pass an index instead for O(n).</p>'},
  {tag:'Halve',title:'Divide the problem in two',body:'<pre><code>def power(x, n):\n    if n == 0:\n        return 1\n    half = power(x, n // 2)\n    return half * half * (x if n % 2 else 1)</code></pre><p>O(log n) multiplications.</p>'},
  {tag:'Branch',title:'Several recursive calls',body:'<p>Fibonacci, tree traversal, generating subsets. Watch out for repeated work: memoize it, as in the lab above.</p>'}]},
 {t:'mcq',items:[
  {q:'Calls made by naive <code>fib(n)</code> grow like…',opts:['O(n)','O(2ⁿ)'],a:1},
  {q:'Calls made by memoized <code>fib(n)</code>?',opts:['O(n)','O(2ⁿ)'],a:0},
  {q:'Extra space used by a recursion of depth n?',opts:['O(1)','O(n) for the call stack'],a:1}]}]},

{title:'Coding exercises',tab:'Exercises',mins:35,out:'4 exercises solved',lead:'Solve each one recursively, even if a loop would be easier: the point is to practise the base case and the recursive case.',blocks:[
 {t:'exercise',title:'Exercise 1 · Sum of digits',prompt:'<p><code>sum_digits(n)</code> returns the sum of the digits of a non-negative integer, recursively.</p><p><code>sum_digits(4096)</code> → <code>19</code></p>',
  starter:`
def sum_digits(n):
    # base case?
    # recursive case: last digit is n % 10, the rest is n // 10
    pass`,
  solution:`
def sum_digits(n):
    if n < 10:
        return n
    return n % 10 + sum_digits(n // 10)`,
  tests:[['sum_digits(4096)','19'],['sum_digits(0)','0'],['sum_digits(7)','7'],['sum_digits(999999)','54']]},
 {t:'exercise',title:'Exercise 2 · Fast power',prompt:'<p><code>power(x, n)</code> returns x to the power n (n ≥ 0) using O(log n) multiplications. Do not use <code>**</code> or <code>pow</code>.</p>',
  starter:`
def power(x, n):
    pass`,
  solution:`
def power(x, n):
    if n == 0:
        return 1
    half = power(x, n // 2)
    if n % 2 == 0:
        return half * half
    return half * half * x`,
  tests:[['power(2, 10)','1024'],['power(3, 0)','1'],['power(5, 3)','125'],['power(2, 200)','2 ** 200']],
  hint:'Compute <code>power(x, n // 2)</code> once and square it. If n is odd, multiply by x once more.'},
 {t:'exercise',title:'Exercise 3 · Palindrome',prompt:'<p><code>is_pal(s)</code> returns True if <code>s</code> reads the same backwards, recursively (compare the ends, then recurse on the middle).</p>',
  starter:`
def is_pal(s):
    pass`,
  solution:`
def is_pal(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_pal(s[1:-1])`,
  tests:[['is_pal("racecar")','True'],['is_pal("abca")','False'],['is_pal("")','True'],['is_pal("aa")','True'],['is_pal("ab")','False']]},
 {t:'exercise',title:'Exercise 4 · Flatten a nested list',prompt:'<p><code>flatten(items)</code> takes a list that may contain lists (to any depth) and returns one flat list.</p><p><code>flatten([1, [2, [3, 4]], 5])</code> → <code>[1, 2, 3, 4, 5]</code></p>',
  starter:`
def flatten(items):
    pass`,
  solution:`
def flatten(items):
    result = []
    for x in items:
        if isinstance(x, list):
            result.extend(flatten(x))
        else:
            result.append(x)
    return result`,
  tests:[['flatten([1, [2, [3, 4]], 5])','[1, 2, 3, 4, 5]'],['flatten([])','[]'],['flatten([[[]]])','[]'],['flatten([["a"], "b"])','["a", "b"]']],
  hint:'Loop over the items. If an item is a list, flatten it recursively and extend; otherwise append it.'}]},

{title:'Review',tab:'Review',mins:10,out:'Flashcards + homework',blocks:[
 {t:'flash',items:[['Two parts of every recursive function?','Base case and recursive case.'],['RecursionError means…','No reachable base case, or recursion deeper than ~1,000.'],['Memoization?','Cache results of calls so each input is computed once.'],['Naive fib complexity?','O(2ⁿ) time.'],['Recursion space cost?','O(depth) for the call stack.']]},
 {t:'task',title:'Homework',items:['Write <code>reverse(s)</code> recursively, and <code>count_paths(r, c)</code> = number of ways to move right/down from (0,0) to (r,c). Add memoization to the second.']}]}
],
labs:{
 fibtree(el,api){
  el.innerHTML=`<div class="row"><label style="flex-direction:row;align-items:center;gap:8px">n = <b class="mono" data-nv></b><input type="range" min="1" max="7" value="5" data-n style="width:160px"></label><button class="btn" data-m aria-pressed="false">Memoization off</button></div><div class="svgbox"><svg data-svg role="img" aria-label="Recursion tree of fib(n)"></svg></div><div class="out"><div><b data-c></b><span>function calls</span></div><div><b data-r></b><span>repeated (wasted) calls</span></div></div><div class="verdict" data-v></div>`;
  let memo=false;
  const draw=()=>{const n=+api.$('[data-n]',el).value;api.$('[data-nv]',el).textContent=n;const seen=new Set();let leaves=0,calls=0,rep=0;const counts={};
   const build=(k,d)=>{calls++;counts[k]=(counts[k]||0)+1;const nd={k,d,kids:[],cached:false};if(memo&&seen.has(k)){nd.cached=true}else{if(k>=2){nd.kids=[build(k-1,d+1),build(k-2,d+1)]}if(memo)seen.add(k)}
     if(!nd.kids.length){nd.x=leaves++}else nd.x=(nd.kids[0].x+nd.kids[nd.kids.length-1].x)/2;return nd};
   const root=build(n,0);Object.values(counts).forEach(c=>{if(c>1&&!memo)rep+=c-1});
   const W=Math.max(300,leaves*58+20),depth=n+1,H=depth*64+20,X=x=>30+x*58,Y=d=>30+d*64;let s='';
   const walk=nd=>{nd.kids.forEach(c=>{s+=`<line x1="${X(nd.x)}" y1="${Y(nd.d)}" x2="${X(c.x)}" y2="${Y(c.d)}" stroke="var(--line)" stroke-width="2"/>`;walk(c)})};walk(root);
   const dup=k=>!memo&&counts[k]>1;
   const dot=nd=>{s+=`<g><rect x="${X(nd.x)-26}" y="${Y(nd.d)-15}" width="52" height="30" rx="8" fill="${nd.cached?'var(--good-soft)':dup(nd.k)?'var(--marker-soft)':'var(--card)'}" stroke="${nd.cached?'var(--good)':dup(nd.k)?'var(--marker)':'var(--muted)'}"/><text x="${X(nd.x)}" y="${Y(nd.d)+5}" text-anchor="middle" font-size="13" font-family="var(--f-mono)" fill="var(--ink)">f(${nd.k})</text></g>`;nd.kids.forEach(dot)};dot(root);
   const svg=api.$('[data-svg]',el);svg.setAttribute('viewBox',`0 0 ${W} ${H}`);svg.style.minWidth=Math.min(W,900)+'px';svg.innerHTML=s;
   api.$('[data-c]',el).textContent=calls;api.$('[data-r]',el).textContent=memo?0:rep;api.$('[data-m]',el).textContent=memo?'Memoization on':'Memoization off';api.$('[data-m]',el).setAttribute('aria-pressed',String(memo));
   api.$('[data-v]',el).innerHTML=memo?`With memoization each f(k) is computed once; later calls (green) return the saved answer. ${calls} calls instead of ${[1,1,3,5,9,15,25,41][n]}.`:`Red boxes are computed more than once. f(${n}) makes ${calls} calls; the count roughly doubles each time n grows by 1.`};
  el.addEventListener('input',draw);el.addEventListener('click',e=>{if(e.target.closest('[data-m]')){memo=!memo;draw()}});draw()}
}});
