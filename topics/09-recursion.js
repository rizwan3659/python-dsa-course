/* Topic 9 · Recursion & backtracking. Lessons 1, 3 and 4 build on the original session 3. */
COURSE.topic({id:'recursion',
goal:'Understand how a function that calls itself works, write recursive solutions with clear base cases, speed them up with memoization, and generate choices with backtracking.',
learn:[
{title:'How recursion works',short:'Base + recursive case',mins:8,lead:'A recursive function solves a problem by solving a smaller copy of the same problem. Every recursive function needs a base case that stops it.',does:['concept','predict'],blocks:[
 {t:'cards',items:[
  {tag:'1',title:'Base case',sub:'When to stop',body:'<p>The smallest input, answered directly. Without it the function calls itself forever (RecursionError).</p>'},
  {tag:'2',title:'Recursive case',sub:'Make it smaller',body:'<p>Call the function on a smaller input and use the result. Each call must move toward the base case.</p>'},
  {tag:'3',title:'Trust the call',sub:'Leap of faith',body:'<p>Assume <code>f(n - 1)</code> already works. Only think about how to get <code>f(n)</code> from it.</p>'},
  {tag:'4',title:'The call stack',sub:'Where the waiting happens',body:'<p>Each call waits on the stack until the smaller call returns. Python allows about 1,000 levels by default, so very deep recursion needs a loop instead.</p>'}]},
 {t:'q',ids:['r-m1','r-m2','r-p1','r-p9','r-p10']}]},

{title:'The call stack and the return path',short:'Call stack',mins:10,lead:'Calls go down until the base case. Then the answers travel back up, and each waiting call finishes its own work.',does:['visualize','predict','dry run'],blocks:[
 {t:'diagram',text:`
 factorial(4)
 ↓
 4 × factorial(3)
       ↓
     3 × factorial(2)
           ↓
         2 × factorial(1)
               ↓
               1            ← base case
         2 × 1 = 2          ← return path
     3 × 2 = 6
 4 × 6 = 24`,aria:'factorial(4) expanding down to the base case and returning back up'},
 {t:'viz',fn:'call-stack',title:'Step down, then back up',intro:'Use Prev / Next / Play / Reset. Try factorial, total, power and fib: which grows the deepest stack?'},
 {t:'code',title:'Watch the stack grow and unwind',code:`def factorial(n, depth=0):
    print("  " * depth + f"factorial({n}) called")
    if n <= 1:                         # base case
        print("  " * depth + "base case → 1")
        return 1
    result = n * factorial(n - 1, depth + 1)   # recursive case
    print("  " * depth + f"factorial({n}) returns {result}")
    return result

factorial(4)`},
 {t:'q',ids:['r-p2','r-p3','r-dr2','r-c3','r-m4']}]},

{title:'Writing recursive functions',short:'Writing it',mins:10,lead:'Three shapes cover most recursive functions: shrink by one, halve, and branch.',does:['predict','complete','debug','code'],blocks:[
 {t:'grid',items:[
  {tag:'Shrink by one',title:'Process first, recurse on the rest',body:'<pre><code>def total(nums):\n    if not nums:\n        return 0\n    return nums[0] + total(nums[1:])</code></pre><p>Clear, but slicing copies: O(n²) overall. Pass an index instead for O(n).</p>'},
  {tag:'Halve',title:'Divide the problem in two',body:'<pre><code>def power(x, n):\n    if n == 0:\n        return 1\n    half = power(x, n // 2)\n    return half * half * (x if n % 2 else 1)</code></pre><p>O(log n) multiplications.</p>'},
  {tag:'Branch',title:'Several recursive calls',body:'<p>Fibonacci, tree traversal, generating subsets. Watch out for repeated work: memoize it.</p>'}]},
 {t:'q',ids:['r-p4','r-p5','r-p6','r-p11','r-p12','r-p13']},
 {t:'q',ids:['r-b1','r-d1','r-d2','r-d4','r-c4','r-c5']},
 {t:'q',title:'Code it',ids:['rec-sum-digits','rec-power','rec-is-pal','rec-flatten']}]},

{title:'Recursion trees and memoization',short:'Memoization',mins:10,lead:'When a function calls itself more than once, the same inputs come back again and again. Cache them and exponential becomes linear.',does:['visualize','predict','complexity','code'],blocks:[
 {t:'viz',fn:'fibtree',title:'Count the wasted calls',intro:'Set n = 6 and count the red boxes. Then turn memoization on.'},
 {t:'code',title:'Memoization in one line',code:`from functools import lru_cache

calls = 0

@lru_cache(maxsize=None)
def fib(n):
    global calls
    calls += 1
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(80), "calls:", calls)    # 81 calls instead of trillions`},
 {t:'q',ids:['r-p7','r-p8','r-c1','r-c2','r-m3','r-b3','r-dr1']},
 {t:'q',title:'Code it',ids:['rec-fib-memo','rec-climb','rec-count-paths']}]},

{title:'Backtracking',short:'Backtracking',mins:12,lead:'To generate every valid combination, make a choice, explore everything that follows from it, then undo the choice and try the next one.',does:['visualize','complete','debug','code'],blocks:[
 {t:'code',title:'The template',code:`def backtrack(state):
    if is_complete(state):
        record(copy_of(state))
        return
    for choice in choices(state):
        if is_valid(choice, state):
            make(choice, state)        # choose
            backtrack(state)           # explore
            undo(choice, state)        # un-choose`,run:false},
 {t:'viz',fn:'backtracking',title:'Subsets as a decision tree',intro:'Each level decides one number: include it (left) or skip it (right).'},
 {t:'q',ids:['r-m5','r-b2','r-d3','r-c6','r-c7']},
 {t:'q',title:'Code it',ids:['rec-subsets','rec-permutations','rec-parens']}]}],

challenge:[
 {t:'b2o',title:'Climbing Stairs: plain recursion → memoization',qid:'rec-climb',problem:'<p>Taking 1 or 2 steps at a time, how many ways are there to climb n steps?</p>',
  brute:{code:`def climb(n):
    if n <= 2:
        return n
    return climb(n - 1) + climb(n - 2)`,cx:'O(2ⁿ)',why:'Two calls per call: the same tree as naive Fibonacci.'},
  slow:{q:'Where is the repeated work?',opts:['climb(n − 2) is computed inside climb(n − 1) AND again directly by climb(n)','The base case','Adding two numbers','The if statement'],a:0,why:'Smaller subproblems are solved again and again, exponentially many times.'},
  better:{q:'How do we stop recomputing?',opts:['Use a stack','Store each climb(k) after computing it (memoization), or fill a table from 1 up to n','Sort the inputs','Use a set of visited steps'],a:1,why:'There are only n different subproblems.'},
  optimal:{code:`def climb(n):
    a, b = 1, 2                 # ways for 1 and 2 steps
    if n <= 2:
        return n
    for _ in range(3, n + 1):
        a, b = b, a + b
    return b`,cx:'O(n)',why:'Each subproblem once; this bottom-up version even uses O(1) space.'},
  takeaway:'<p>Overlapping subproblems + caching = dynamic programming. You will meet it again in the Patterns topic.</p>'}],

review:[
 {t:'flash',items:[['Two parts of every recursive function?','Base case and recursive case.'],['RecursionError means…','No reachable base case, or recursion deeper than ~1,000.'],['Memoization?','Cache results of calls so each input is computed once.'],['Naive fib complexity?','O(2ⁿ) time.'],['Recursion space cost?','O(depth) for the call stack.'],['Backtracking template?','Choose → explore → un-choose.'],['Record a path in backtracking?','Append a copy: path[:].']]},
 {t:'task',title:'Homework',items:['Write <code>reverse(s)</code> recursively, and <code>count_paths(r, c)</code> = number of ways to move right/down from (0,0) to (r,c). Add memoization to the second.']}]
});
