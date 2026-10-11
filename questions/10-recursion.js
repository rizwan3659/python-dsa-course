/* Topic 10 · Recursion & backtracking. Exercises rec-sum-digits … rec-flatten come from the original session 3. */
COURSE.qs('recursion',[
{id:'r-p1',type:'predict',d:1,p:'recursion',title:'Factorial',code:`def f(n):
    return 1 if n <= 1 else n * f(n - 1)

print(f(5))`,a:'120',why:'5 × 4 × 3 × 2 × 1.'},
{id:'r-p2',type:'predict',d:1,p:'recursion',title:'Print after the call',code:`def f(n):
    if n == 0:
        return
    f(n - 1)
    print(n)

f(3)`,a:'1\n2\n3',why:'Each call prints only after its recursive call returns, so the deepest call prints first: the return path runs in reverse.'},
{id:'r-p3',type:'predict',d:1,p:'recursion',title:'Print before the call',code:`def f(n):
    if n == 0:
        return
    print(n)
    f(n - 1)

f(3)`,a:'3\n2\n1',why:'Printing before the recursive call happens on the way down.'},
{id:'r-p4',type:'predict',d:1,p:'recursion',title:'Recursive sum',code:`def s(a):
    return 0 if not a else a[0] + s(a[1:])

print(s([1, 2, 3, 4]))`,a:'10',why:'1 + (2 + (3 + (4 + 0))).'},
{id:'r-p5',type:'predict',d:2,p:'recursion',title:'Stepping by two',code:`def f(n):
    if n <= 0:
        return 0
    return n + f(n - 2)

print(f(5))`,a:'9',why:'5 + 3 + 1 + f(−1) = 9. The base case n ≤ 0 also catches the negative value.'},
{id:'r-p6',type:'predict',d:1,p:'recursion',title:'Recursive reverse',code:`def r(s):
    return s if len(s) <= 1 else r(s[1:]) + s[0]

print(r("abc"))`,a:'cba',why:'r("abc") = r("bc") + "a" = (r("c") + "b") + "a".'},
{id:'r-p7',type:'predict',d:2,p:'recursion',title:'How many calls?',code:`calls = 0

def fib(n):
    global calls
    calls += 1
    return n if n < 2 else fib(n - 1) + fib(n - 2)

fib(5)
print(calls)`,a:'15',hints:['calls(n) = 1 + calls(n − 1) + calls(n − 2), with calls(0) = calls(1) = 1.'],why:'1, 1, 3, 5, 9, 15: the count grows almost as fast as Fibonacci itself (exponentially).'},
{id:'r-p8',type:'predict',d:2,p:'dp',title:'Calls with a cache',code:`from functools import lru_cache

calls = 0

@lru_cache(maxsize=None)
def fib(n):
    global calls
    calls += 1
    return n if n < 2 else fib(n - 1) + fib(n - 2)

fib(10)
print(calls)`,a:'11',why:'With memoization each fib(k) for k = 0..10 is computed exactly once: 11 calls.'},
{id:'r-p9',type:'predict',d:1,p:'recursion',title:'No base case',code:`def f(n):
    return n + f(n - 1)

print(f(3))`,opts:['6','0','RecursionError'],a:2,why:'Without a base case the calls never stop, until Python’s recursion limit (about 1,000) raises RecursionError.'},
{id:'r-p10',type:'predict',d:2,p:'recursion',title:'A base case that is skipped',code:`def g(n):
    if n == 0:
        return 0
    return 1 + g(n - 2)

print(g(3))`,opts:['2','1','RecursionError'],a:2,why:'3 → 1 → −1 → … never hits 0. Base cases must cover every path: use <code>n &lt;= 0</code>.'},
{id:'r-p11',type:'predict',d:1,p:'recursion',title:'Power by repeated multiplication',code:`def p(x, n):
    return 1 if n == 0 else x * p(x, n - 1)

print(p(2, 5))`,a:'32',why:'2 × 2 × 2 × 2 × 2 × 1.'},
{id:'r-p12',type:'predict',d:2,p:'recursion',title:'Binary digits',code:`def b(n):
    return str(n) if n < 2 else b(n // 2) + str(n % 2)

print(b(6))`,a:'110',why:'b(6) = b(3) + "0" = (b(1) + "1") + "0" = "110".'},
{id:'r-p13',type:'predict',d:2,p:'recursion',title:'Nesting depth',code:`def depth(x):
    if not isinstance(x, list):
        return 0
    return 1 + max((depth(y) for y in x), default=0)

print(depth([1, [2, [3]]]))`,a:'3',why:'Three levels of brackets. Recursion matches nested data naturally.'},
{id:'r-c1',type:'complexity',d:2,p:'recursion',title:'Naive Fibonacci',code:`def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`,a:'O(2ⁿ)',why:'Each call branches into two: the call tree roughly doubles per level.'},
{id:'r-c2',type:'complexity',d:2,p:'dp',title:'Memoized Fibonacci',code:`from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`,a:'O(n)',why:'Each value 0..n is computed once; every other call is an O(1) cache hit.'},
{id:'r-c3',type:'complexity',d:2,p:'recursion',title:'Space of the call stack',q:'What is the <b>extra space</b> used by this recursion?',code:`def count_down(n):
    if n == 0:
        return
    count_down(n - 1)`,a:'O(n)',why:'n frames wait on the call stack at the deepest point.'},
{id:'r-c4',type:'complexity',d:3,p:'recursion',title:'Slicing in recursion',code:`def total(nums):
    if not nums:
        return 0
    return nums[0] + total(nums[1:])`,a:'O(n²)',why:'nums[1:] copies n − 1, then n − 2, … items. Pass an index instead of slicing for O(n).'},
{id:'r-c5',type:'complexity',d:2,p:'divide-conquer',title:'Fast power',code:`def power(x, n):
    if n == 0:
        return 1
    half = power(x, n // 2)
    return half * half * (x if n % 2 else 1)`,a:'O(log n)',why:'n halves on every call, and there is only one recursive call per level.'},
{id:'r-c6',type:'complexity',d:2,p:'backtracking',title:'All subsets',q:'How many subsets does this produce for n numbers (ignore the cost of copying)?',code:`def subsets(nums):
    if not nums:
        return [[]]
    rest = subsets(nums[1:])
    return rest + [[nums[0]] + s for s in rest]`,a:'O(2ⁿ)',why:'Each element doubles the number of subsets. (Counting the copying, it is O(n · 2ⁿ).)'},
{id:'r-c7',type:'complexity',d:3,p:'backtracking',title:'All permutations',q:'Number of results for n distinct items?',code:`from itertools import permutations
result = list(permutations(nums))`,opts:['O(n²)','O(2ⁿ)','O(n!)','O(n log n)'],a:'O(n!)',why:'n choices for the first slot, n − 1 for the second, …: n! orderings.'},
{id:'r-m1',type:'mcq',d:1,p:'recursion',title:'The base case',q:'What is the job of the base case?',opts:['Make the function faster','Answer the smallest input directly, so the recursion stops','Count the calls','Store results'],a:1,why:'Without it, calls continue until RecursionError.'},
{id:'r-m2',type:'mcq',d:1,p:'recursion',title:'The leap of faith',q:'When writing f(n), the best way to think about f(n − 1) is…',opts:['Trace every call by hand','Assume it already works, and only work out how to get f(n) from it','Avoid using it','Replace it with a loop'],a:1,why:'Trust the recursive call; focus on one level: combine and make sure the input shrinks toward the base case.'},
{id:'r-m3',type:'mcq',d:1,p:'dp',title:'Memoization',q:'Memoization means…',opts:['Writing comments','Caching the result of each call so the same input is computed only once','Using less memory','Converting recursion to a loop'],a:1,why:'<code>functools.lru_cache</code> or a dict does it.'},
{id:'r-m4',type:'mcq',d:1,p:'recursion',title:'Recursion limit',q:'What happens if a correct recursive function goes 100,000 calls deep in Python?',opts:['It works, just slowly','RecursionError: Python allows about 1,000 frames by default','It returns None','The computer crashes'],a:1,why:'Very deep recursion needs a loop (or an explicit stack) in Python.'},
{id:'r-m5',type:'mcq',d:2,p:'backtracking',title:'Why un-choose?',q:'In backtracking, why do we <code>path.pop()</code> after exploring?',opts:['To save memory','To undo the choice so the next branch starts from the same state','To sort the path','It is optional'],a:1,why:'Choose → explore → un-choose. One shared path is reused by every branch.'},
{id:'r-dr1',type:'dryrun',d:1,p:'dp',title:'Fibonacci, bottom-up',code:`dp = [0, 1]
for i in range(2, 6):
    dp.append(dp[i - 1] + dp[i - 2])`,cols:['i','dp[-1]'],given:[0],rows:[['2','1'],['3','2'],['4','3'],['5','5']],why:'Filling the table from small to large is the loop version of memoized recursion.'},
{id:'r-dr2',type:'dryrun',d:1,p:'recursion',title:'Building the call stack by hand',code:`n = 4
stack = []
while n > 1:
    stack.append(n)
    n -= 1`,cols:['n','stack'],rows:[['3','[4]'],['2','[4, 3]'],['1','[4, 3, 2]']],why:'This is what factorial(4)’s call stack holds on the way down: frames waiting for smaller answers.'},
{id:'r-b1',type:'blanks',d:1,p:'recursion',title:'Complete factorial',code:`def factorial(n):
    if ______:
        return 1
    return ______`,blanks:[['n <= 1','n < 2','n == 0 or n == 1'],['n * factorial(n - 1)','factorial(n - 1) * n']],tests:[['factorial(5)','120'],['factorial(1)','1'],['factorial(0)','1']],why:'Base case for the smallest inputs; recursive case shrinks n by one.'},
{id:'r-b2',type:'blanks',d:2,p:'backtracking',title:'Complete subsets',code:`def subsets(nums):
    result, path = [], []

    def backtrack(i):
        if i == len(nums):
            result.append(______)
            return
        path.append(nums[i])
        backtrack(i + 1)
        ______
        backtrack(i + 1)

    backtrack(0)
    return result`,blanks:[['path[:]','path.copy()','list(path)'],['path.pop()']],tests:[['subsets([1, 2])','[[1, 2], [1], [2], []]','unordered'],['subsets([])','[[]]']],why:'Record a COPY (path keeps changing), and undo the choice before exploring the other branch.'},
{id:'r-b3',type:'blanks',d:2,p:'dp',title:'Complete the memo',code:`def fib(n, memo={}):
    if n < 2:
        return n
    if ______:
        return memo[n]
    memo[n] = ______
    return memo[n]`,blanks:[['n in memo'],['fib(n - 1, memo) + fib(n - 2, memo)','fib(n - 1) + fib(n - 2)']],tests:[['fib(10)','55'],['fib(80)','23416728348467685']],why:'Check the cache before computing; store the result after. (Here the shared default dict is used on purpose, as a cache.)'},
{id:'r-d1',type:'debug',d:1,p:'recursion',title:'factorial(0) never ends',code:`def factorial(n):
    if n == 1:
        return 1
    return n * factorial(n - 1)`,opts:['It multiplies wrongly','factorial(0) skips the base case: 0 → −1 → −2 … RecursionError','It should return 0','It needs a loop'],a:1,why:'Use <code>if n &lt;= 1</code> so 0 (and anything smaller) stops too.',fix:`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,tests:[['factorial(0)','1'],['factorial(4)','24']]},
{id:'r-d2',type:'debug',d:1,p:'recursion',title:'The answer disappears',code:`def total(nums):
    if not nums:
        return 0
    nums[0] + total(nums[1:])`,opts:['The base case is wrong','The recursive result is computed but never returned, so the function returns None','nums[1:] is wrong','It needs global'],a:1,why:'Every path through a recursive function must return a value.',fix:`def total(nums):
    if not nums:
        return 0
    return nums[0] + total(nums[1:])`,tests:[['total([1, 2, 3])','6'],['total([])','0']]},
{id:'r-d3',type:'debug',d:2,p:'backtracking',title:'All subsets are empty',code:`def subsets(nums):
    result, path = [], []
    def backtrack(i):
        if i == len(nums):
            result.append(path)
            return
        path.append(nums[i])
        backtrack(i + 1)
        path.pop()
        backtrack(i + 1)
    backtrack(0)
    return result`,opts:['backtrack starts at the wrong index','result stores the SAME path list every time; after all the pops it is empty, so every entry is []','path.pop() should be removed','It needs memoization'],a:1,why:'Append a copy: <code>result.append(path[:])</code>.',fix:`def subsets(nums):
    result, path = [], []
    def backtrack(i):
        if i == len(nums):
            result.append(path[:])
            return
        path.append(nums[i])
        backtrack(i + 1)
        path.pop()
        backtrack(i + 1)
    backtrack(0)
    return result`,tests:[['subsets([1, 2])','[[1, 2], [1], [2], []]','unordered']]},
{id:'r-d4',type:'debug',d:1,p:'recursion',title:'The problem never shrinks',code:`def count(n):
    if n == 0:
        return 0
    return 1 + count(n)`,opts:['The base case should return 1','The recursive call uses n again instead of n − 1, so it never reaches the base case','+ should be *','count needs two arguments'],a:1,why:'Every recursive call must move toward the base case.',fix:`def count(n):
    if n == 0:
        return 0
    return 1 + count(n - 1)`,tests:[['count(5)','5']]},

/* ---------- code (first four from the original session 3) ---------- */
{id:'rec-sum-digits',type:'code',d:1,p:'recursion',title:'Sum of Digits',prompt:'<p><code>sum_digits(n)</code> returns the sum of the digits of a non-negative integer, recursively.</p><p><code>sum_digits(4096)</code> → <code>19</code></p>',starter:`def sum_digits(n):
    # base case?
    # recursive case: last digit is n % 10, the rest is n // 10
    pass`,solution:`def sum_digits(n):
    if n < 10:
        return n
    return n % 10 + sum_digits(n // 10)`,tests:[['sum_digits(4096)','19'],['sum_digits(0)','0'],['sum_digits(7)','7'],['sum_digits(999999)','54']],constraints:['0 ≤ n ≤ 10<sup>18</sup>'],mistakes:['A base case of n < 10 that returns 0 instead of n.','Using n / 10, which produces floats.'],followup:'Keep summing until a single digit remains.',hints:['A single digit is its own sum.','Last digit: n % 10. Everything else: n // 10.'],approach:'Peel off the last digit each call.',cx:'O(number of digits)'},
{id:'rec-power',type:'code',d:1,p:'divide-conquer',title:'Fast Power',prompt:'<p><code>power(x, n)</code> returns x to the power n (n ≥ 0) using O(log n) multiplications. Do not use <code>**</code> or <code>pow</code>.</p>',starter:`def power(x, n):
    pass`,solution:`def power(x, n):
    if n == 0:
        return 1
    half = power(x, n // 2)
    if n % 2 == 0:
        return half * half
    return half * half * x`,tests:[['power(2, 10)','1024'],['power(3, 0)','1'],['power(5, 3)','125'],['power(2, 200)','2 ** 200']],constraints:['−100 &lt; x &lt; 100, 0 ≤ n ≤ 10<sup>4</sup>'],mistakes:['Calling power(x, n // 2) twice, which makes it O(n) again.','Forgetting the extra factor of x for odd n.'],followup:'Support negative n (return 1 / power(x, −n)).',hints:['Compute <code>power(x, n // 2)</code> once and square it.','If n is odd, multiply by x once more.'],approach:'Halve n each call.',cx:'O(log n)'},
{id:'rec-is-pal',type:'code',d:1,p:'recursion',title:'Recursive Palindrome',prompt:'<p><code>is_pal(s)</code> returns True if <code>s</code> reads the same backwards, recursively (compare the ends, then recurse on the middle).</p>',starter:`def is_pal(s):
    pass`,solution:`def is_pal(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_pal(s[1:-1])`,tests:[['is_pal("racecar")','True'],['is_pal("abca")','False'],['is_pal("")','True'],['is_pal("aa")','True'],['is_pal("ab")','False']],constraints:['0 ≤ len(s) ≤ 900'],mistakes:['Missing the base case for strings of length 1.','Slicing in every call (O(n²) copying); pass indexes instead.'],followup:'Rewrite it with indexes (is_pal(s, i, j)) so no slices are copied.',hints:['Strings of length 0 or 1 are palindromes.','If the ends match, the answer is the answer for the middle.'],approach:'Compare ends, recurse inward.',cx:'O(n²) with slicing (O(n) with indexes)'},
{id:'rec-flatten',type:'code',d:1,p:'recursion',title:'Flatten a Nested List',prompt:'<p><code>flatten(items)</code> takes a list that may contain lists (to any depth) and returns one flat list.</p><p><code>flatten([1, [2, [3, 4]], 5])</code> → <code>[1, 2, 3, 4, 5]</code></p>',starter:`def flatten(items):
    pass`,solution:`def flatten(items):
    result = []
    for x in items:
        if isinstance(x, list):
            result.extend(flatten(x))
        else:
            result.append(x)
    return result`,tests:[['flatten([1, [2, [3, 4]], 5])','[1, 2, 3, 4, 5]'],['flatten([])','[]'],['flatten([[[]]])','[]'],['flatten([["a"], "b"])','["a", "b"]']],constraints:['nesting depth ≤ 100'],mistakes:['Only flattening one level.','Treating strings as lists (they are iterable too).'],followup:'Write it without recursion, using an explicit stack.',hints:['Loop over the items. If an item is a list, flatten it recursively and extend; otherwise append it.','For each item: if it is a list, extend the result with flatten(item); otherwise append the item.'],approach:'Recurse on sublists.',cx:'O(total elements)'},
{id:'rec-factorial',type:'code',d:1,p:'recursion',title:'Factorial',prompt:'<p>Return n! recursively (0! = 1).</p>',starter:`def factorial(n):
    pass`,solution:`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,tests:[['factorial(0)','1'],['factorial(5)','120'],['factorial(10)','3628800'],['factorial(1)','1'],['factorial(20)','2432902008176640000']],constraints:['0 ≤ n ≤ 500'],mistakes:['A base case of n == 1 only, which recurses forever for n = 0.','Returning n * factorial(n) (no progress).'],followup:'Write it with a loop and compare the stack depth needed.',hints:['Base case: n ≤ 1.','factorial(n) = n × factorial(n − 1), and factorial(0) = 1.'],approach:'n × factorial(n − 1).',cx:'O(n) time, O(n) stack'},
{id:'rec-reverse-string',type:'code',d:1,p:'recursion',title:'Reverse a String Recursively',prompt:'<p>Return the reversed string without slicing with [::-1] or reversed().</p>',starter:`def reverse(s):
    pass`,solution:`def reverse(s):
    if len(s) <= 1:
        return s
    return reverse(s[1:]) + s[0]`,tests:[['reverse("hello")','"olleh"'],['reverse("")','""'],['reverse("a")','"a"'],['reverse("ab")','"ba"'],['reverse("racecar")','"racecar"']],constraints:['0 ≤ len(s) ≤ 900'],mistakes:['No base case for the empty string.','Putting the first character first again: s[0] + reverse(s[1:]).'],followup:'Reverse the words of a sentence recursively.',hints:['The reverse of s is reverse(rest) + first character.','reverse(s) = reverse(s[1:]) + s[0], with "" as the base case.'],approach:'Move the first character to the end of the reversed rest.',cx:'O(n²) with slicing'},
{id:'rec-gcd',type:'code',d:1,p:'math',title:'Greatest Common Divisor',prompt:'<p>Return gcd(a, b) using Euclid’s rule: gcd(a, b) = gcd(b, a % b), and gcd(a, 0) = a.</p>',starter:`def gcd(a, b):
    pass`,solution:`def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)`,tests:[['gcd(48, 18)','6'],['gcd(7, 3)','1'],['gcd(10, 0)','10'],['gcd(0, 5)','5']],constraints:['0 ≤ a, b ≤ 10<sup>18</sup>, not both 0'],mistakes:['Using subtraction instead of %, which takes very long for (10¹⁸, 1).','Base case on a == 0 only.'],followup:'Compute the gcd of a whole list of numbers.',hints:['The rule is already recursive.','gcd(a, b) = gcd(b, a % b) until b is 0; then the answer is a.'],approach:"Euclid's algorithm.",cx:'O(log min(a, b))'},
{id:'rec-fib-memo',type:'code',kind:'optimize',d:1,p:'dp',title:'Fibonacci With Memoization',prompt:'<p>Return fib(n) (fib(0) = 0, fib(1) = 1). The starter is correct but exponential: make it fast for n = 300.</p>',starter:`def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`,solution:`from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`,tests:[['fib(10)','55'],['fib(1)','1'],['fib(300)','222232244629420445529739893461909967206666939096499764990979600','','fib(300) (must be fast)'],['fib(0)','0']],constraints:['0 ≤ n ≤ 300'],mistakes:['Creating a new memo dict inside every call (no sharing).','Using a mutable default without understanding that it persists between calls.'],followup:'Write it bottom-up with two variables.',hints:['The starter recomputes the same values exponentially many times.','Cache each result: functools.lru_cache, or a dict.'],approach:'Memoization turns O(2ⁿ) into O(n).',cx:'O(n) time'},
{id:'rec-climb',type:'code',d:1,p:'dp',title:'Climbing Stairs',prompt:'<p>You climb 1 or 2 steps at a time. In how many distinct ways can you climb n steps?</p><p><code>climb(3)</code> → <code>3</code> (1+1+1, 1+2, 2+1)</p>',starter:`def climb(n):
    pass`,solution:`from functools import lru_cache

@lru_cache(maxsize=None)
def climb(n):
    if n <= 2:
        return n
    return climb(n - 1) + climb(n - 2)`,tests:[['climb(1)','1'],['climb(2)','2'],['climb(3)','3'],['climb(5)','8'],['climb(60)','2504730781961']],constraints:['1 ≤ n ≤ 90'],mistakes:['Base cases that give climb(2) = 1.','No memoization, so climb(60) never finishes.'],followup:'Allow steps of 1, 2 or 3.',hints:['Your last move was either 1 step or 2 steps.','ways(n) = ways(n − 1) + ways(n − 2). Memoize it.'],approach:'Fibonacci-like recurrence with memoization.',cx:'O(n)'},
{id:'rec-count-paths',type:'code',d:2,p:'dp',title:'Count Grid Paths',prompt:'<p>Moving only right or down, how many paths go from (0, 0) to (r, c)?</p><p><code>count_paths(2, 2)</code> → <code>6</code></p>',starter:`def count_paths(r, c):
    pass`,solution:`from functools import lru_cache

@lru_cache(maxsize=None)
def count_paths(r, c):
    if r == 0 or c == 0:
        return 1
    return count_paths(r - 1, c) + count_paths(r, c - 1)`,tests:[['count_paths(2, 2)','6'],['count_paths(0, 5)','1'],['count_paths(3, 7)','120'],['count_paths(16, 16)','601080390','','16 × 16 (must be fast)']],constraints:['0 ≤ r, c ≤ 16'],mistakes:['Recursing without memoization (exponential).','Base case returning 0 on the edges instead of 1.'],followup:'Compute it with the binomial formula C(r + c, r).',hints:['The last step came from above or from the left.','Memoize, or the same cells are recomputed exponentially many times.'],approach:'paths(r, c) = paths(r − 1, c) + paths(r, c − 1), cached.',cx:'O(r × c)'},
{id:'rec-hanoi',type:'code',d:2,p:'recursion',title:'Towers of Hanoi',prompt:'<p>Return the list of moves <code>(from, to)</code> that moves n disks from peg "A" to peg "C" using "B".</p><p><code>hanoi(2)</code> → <code>[("A", "B"), ("A", "C"), ("B", "C")]</code></p>',starter:`def hanoi(n, src="A", dst="C", via="B"):
    pass`,solution:`def hanoi(n, src="A", dst="C", via="B"):
    if n == 0:
        return []
    return (hanoi(n - 1, src, via, dst)      # park n - 1 disks on via
            + [(src, dst)]                   # move the biggest disk
            + hanoi(n - 1, via, dst, src))   # bring the n - 1 disks over`,tests:[['hanoi(1)','[("A", "C")]'],['hanoi(2)','[("A", "B"), ("A", "C"), ("B", "C")]'],['len(hanoi(10))','1023'],['hanoi(0)','[]'],['hanoi(3)[3]','("A", "C")']],constraints:['0 ≤ n ≤ 20'],mistakes:['Swapping the roles of via and dst in the recursive calls.','Returning moves in the wrong order.'],followup:'Prove that 2ⁿ − 1 moves is the minimum.',hints:['To move n disks, the biggest disk must move once, from src to dst. Where must the other n − 1 disks be at that moment?','Move n − 1 disks to via, the largest to dst, then n − 1 disks from via to dst.'],approach:'Move n − 1 out of the way, move the biggest, move n − 1 back on top.',cx:'O(2ⁿ) moves'},
{id:'rec-binary-strings',type:'code',d:2,p:'backtracking',title:'All Binary Strings',prompt:'<p>Return all binary strings of length n in increasing order.</p><p><code>binary_strings(2)</code> → <code>["00", "01", "10", "11"]</code></p>',starter:`def binary_strings(n):
    pass`,solution:`def binary_strings(n):
    if n == 0:
        return [""]
    shorter = binary_strings(n - 1)
    return ["0" + s for s in shorter] + ["1" + s for s in shorter]`,tests:[['binary_strings(2)','["00", "01", "10", "11"]'],['binary_strings(0)','[""]'],['len(binary_strings(10))','1024'],['binary_strings(1)','["0", "1"]'],['binary_strings(3)[5]','"101"']],constraints:['0 ≤ n ≤ 16'],mistakes:['Returning [] for n = 0 (the answer is [""]).','Generating out of order (try "0" before "1").'],followup:'Only strings with no two adjacent 1s.',hints:['A string of length n is "0" or "1" followed by a string of length n − 1.','binary_strings(n) = "0" + each string of length n − 1, then "1" + each.'],approach:'Build from the strings of length n − 1.',cx:'O(n · 2ⁿ)'},
{id:'rec-subsets',type:'code',d:2,p:'backtracking',title:'Subsets',prompt:'<p>Return all subsets of a list of distinct numbers (any order).</p>',starter:`def subsets(nums):
    pass`,solution:`def subsets(nums):
    result, path = [], []

    def backtrack(i):
        if i == len(nums):
            result.append(path[:])
            return
        path.append(nums[i])        # include nums[i]
        backtrack(i + 1)
        path.pop()                  # exclude nums[i]
        backtrack(i + 1)

    backtrack(0)
    return result`,tests:[['subsets([1, 2, 3])','[[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]','unordered'],['subsets([])','[[]]','unordered'],['len(subsets(list(range(10))))','1024'],['subsets([7])','[[7], []]','unordered']],constraints:['0 ≤ len(nums) ≤ 10','values are distinct'],mistakes:['Appending path itself instead of a copy.','Forgetting the empty subset.'],followup:'Subsets with duplicates (rec-subsets-dup).',hints:['Each number is either in or out.','Backtracking: choose, explore, un-choose. Record a copy at the end.'],approach:'Include/exclude decision tree.',cx:'O(n · 2ⁿ)'},
{id:'rec-permutations',type:'code',d:2,p:'backtracking',title:'Permutations',prompt:'<p>Return all orderings of a list of distinct numbers (any order).</p>',starter:`def permutations(nums):
    pass`,solution:`def permutations(nums):
    result, path, used = [], [], [False] * len(nums)

    def backtrack():
        if len(path) == len(nums):
            result.append(path[:])
            return
        for i, x in enumerate(nums):
            if not used[i]:
                used[i] = True
                path.append(x)
                backtrack()
                path.pop()
                used[i] = False

    backtrack()
    return result`,tests:[['permutations([1, 2, 3])','[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]','unordered'],['permutations([1])','[[1]]','unordered'],['len(permutations([1, 2, 3, 4, 5]))','120'],['permutations([1, 2])','[[1, 2], [2, 1]]','unordered']],constraints:['1 ≤ len(nums) ≤ 8','values are distinct'],mistakes:['Not undoing the "used" mark after the recursive call.','Appending path itself instead of a copy.'],followup:'The input may contain duplicates: return unique permutations.',hints:['At each position, try every number not used yet.','Track used numbers; undo both the path and the used flag after exploring.'],approach:'Backtracking over unused elements.',cx:'O(n · n!)'},
{id:'rec-combination-sum',type:'code',d:2,p:'backtracking',title:'Combination Sum',prompt:'<p>Return all unique combinations of <code>candidates</code> (distinct positive numbers, each usable unlimited times) that sum to <code>target</code>. Each combination in non-decreasing order; any order of combinations.</p><p><code>([2, 3, 6, 7], 7)</code> → <code>[[2, 2, 3], [7]]</code></p>',starter:`def combination_sum(candidates, target):
    pass`,solution:`def combination_sum(candidates, target):
    candidates = sorted(candidates)
    result, path = [], []

    def backtrack(start, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        for i in range(start, len(candidates)):
            c = candidates[i]
            if c > remaining:
                break                       # sorted: larger ones fail too
            path.append(c)
            backtrack(i, remaining - c)     # i, not i + 1: reuse allowed
            path.pop()

    backtrack(0, target)
    return result`,tests:[['combination_sum([2, 3, 6, 7], 7)','[[2, 2, 3], [7]]','unordered'],['combination_sum([2, 3, 5], 8)','[[2, 2, 2, 2], [2, 3, 3], [3, 5]]','unordered'],['combination_sum([2], 1)','[]','unordered'],['combination_sum([1], 3)','[[1, 1, 1]]','unordered']],constraints:['1 ≤ len(candidates) ≤ 30','1 ≤ target ≤ 40'],mistakes:['Starting the loop at 0 every time, which produces duplicates like [2, 3, 2].','Not stopping when the remaining target goes negative.'],followup:'Each candidate may be used once (rec-combination-sum-ii).',hints:['To avoid duplicates like [2, 3, 2], only pick candidates at or after the current index.','Pass the remaining target down; stop when it reaches 0 (record) or goes negative (prune).'],approach:'Backtracking with a start index and pruning.',cx:'Exponential in the worst case'},
{id:'rec-parens',type:'code',d:2,p:'backtracking',title:'Generate Parentheses',prompt:'<p>Return all balanced strings of n pairs of parentheses, in sorted order.</p><p><code>generate(3)</code> → <code>["((()))", "(()())", "(())()", "()(())", "()()()"]</code></p>',starter:`def generate(n):
    pass`,solution:`def generate(n):
    result = []

    def backtrack(s, opened, closed):
        if len(s) == 2 * n:
            result.append(s)
            return
        if opened < n:
            backtrack(s + "(", opened + 1, closed)
        if closed < opened:
            backtrack(s + ")", opened, closed + 1)

    backtrack("", 0, 0)
    return sorted(result)`,tests:[['generate(3)','["((()))", "(()())", "(())()", "()(())", "()()()"]'],['generate(1)','["()"]'],['len(generate(6))','132'],['generate(2)','["(())", "()()"]']],constraints:['1 ≤ n ≤ 8'],mistakes:['Generating all 2²ⁿ strings and filtering (very slow).','Allowing more closing than opening brackets at some point.'],followup:'Count them without generating (Catalan numbers).',hints:['You may add "(" while fewer than n are open.','You may add ")" only while closed < opened. Those two rules prune every invalid string.'],approach:'Backtracking with counts of opened/closed brackets.',cx:'O(Catalan(n)) results'},
{id:'rec-letter-combos',type:'code',d:2,p:'backtracking',title:'Phone Letter Combinations',prompt:'<p>Digits 2–9 map to letters as on a phone (2 = abc, …, 9 = wxyz). Return all letter combinations for the digits, in order. Empty input → [].</p>',starter:`def letter_combinations(digits):
    pass`,solution:`def letter_combinations(digits):
    keys = {"2": "abc", "3": "def", "4": "ghi", "5": "jkl",
            "6": "mno", "7": "pqrs", "8": "tuv", "9": "wxyz"}
    if not digits:
        return []
    result = []

    def backtrack(i, path):
        if i == len(digits):
            result.append(path)
            return
        for ch in keys[digits[i]]:
            backtrack(i + 1, path + ch)

    backtrack(0, "")
    return result`,tests:[['letter_combinations("23")','["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]'],['letter_combinations("")','[]'],['letter_combinations("7")','["p", "q", "r", "s"]'],['letter_combinations("79")[:3]','["pw", "px", "py"]']],constraints:['0 ≤ len(digits) ≤ 4','digits are 2–9'],mistakes:['Returning [""] for an empty input instead of [].','Hard-coding loops for a fixed number of digits.'],followup:'Return only combinations that are real words from a given set.',hints:['One level of recursion per digit; branch on that digit’s letters.','Recursively: for each letter of the first digit, prepend it to every combination of the remaining digits.'],approach:'Backtracking over digit positions.',cx:'O(4ⁿ · n)'},
{id:'rec-n-queens',type:'code',d:3,p:'backtracking',title:'N-Queens (count solutions)',prompt:'<p>Count the ways to place n queens on an n × n board so that no two attack each other.</p><p><code>n_queens(4)</code> → <code>2</code> · <code>n_queens(8)</code> → <code>92</code></p>',starter:`def n_queens(n):
    pass`,solution:`def n_queens(n):
    cols, diag1, diag2 = set(), set(), set()

    def place(row):
        if row == n:
            return 1
        count = 0
        for c in range(n):
            if c in cols or row - c in diag1 or row + c in diag2:
                continue
            cols.add(c); diag1.add(row - c); diag2.add(row + c)
            count += place(row + 1)
            cols.remove(c); diag1.remove(row - c); diag2.remove(row + c)
        return count

    return place(0)`,tests:[['n_queens(1)','1'],['n_queens(4)','2'],['n_queens(6)','4'],['n_queens(8)','92']],constraints:['1 ≤ n ≤ 9'],mistakes:['Checking only columns, not diagonals.','Scanning the board to test safety instead of keeping sets.'],followup:'Return one board layout as strings.',hints:['Place one queen per row; for each row try every column.','A square (r, c) is attacked if its column, its r − c diagonal or its r + c diagonal is taken. Keep three sets.'],approach:'Row-by-row backtracking with column and diagonal sets.',cx:'Exponential, heavily pruned'}
]);

/* ---------- pruning and constraint search (added with the v2 curriculum) ---------- */
COURSE.qs('recursion',[
{id:'rec-x-p1',type:'predict',d:2,p:'backtracking',title:'Pruning a sorted search',code:`calls = 0

def search(nums, start, remaining):
    global calls
    calls += 1
    if remaining == 0:
        return 1
    count = 0
    for i in range(start, len(nums)):
        if nums[i] > remaining:
            break                      # sorted: every later number is bigger too
        count += search(nums, i + 1, remaining - nums[i])
    return count

print(search([1, 2, 3, 4, 5, 6, 7, 8], 0, 6), calls)`,a:'4 14',hints:['The subsets of 1..8 that sum to 6 are {6}, {1, 5}, {2, 4} and {1, 2, 3}.','Because the list is sorted, the loop stops as soon as a number is too big.'],why:'Only 14 calls instead of up to 2⁸ = 256: pruning cuts every branch that can no longer reach the target.'},
{id:'rec-x-m1',type:'mcq',d:1,p:'backtracking',title:'What pruning means',q:'In backtracking, "pruning" means…',opts:['Removing duplicates from the output afterwards','Stopping a branch as soon as it cannot lead to a valid answer','Sorting the output','Using a loop instead of recursion'],a:1,why:'The earlier a dead branch is cut, the more of the exponential tree is never visited. Sorting the choices often makes cuts possible.'},
{id:'rec-x-m2',type:'mcq',d:2,p:'backtracking',title:'Skipping duplicate choices',q:'In Combination Sum II the candidates contain duplicates. Why does the loop skip i when i > start and nums[i] == nums[i − 1]?',opts:['To make it faster only','Choosing the second equal value at the same depth would build exactly the same combinations again','Because duplicates are invalid input','To keep the list sorted'],a:1,why:'At one level of the tree, equal values lead to identical subtrees. Use each distinct value once per level (it can still be picked again one level deeper).'},
{id:'rec-x-m3',type:'mcq',d:2,p:'backtracking',title:'Sudoku search order',q:'A Sudoku solver tries digits 1–9 in each empty cell. What helps most?',opts:['Trying cells from the bottom right','Checking row, column and box constraints before recursing, so invalid digits are never explored','Recursing first and validating the full board at the end','Using a while loop'],a:1,why:'Validating at the end explores up to 9⁸¹ boards. Checking each placement immediately prunes almost everything. (Choosing the cell with the fewest options helps even more.)'},
{id:'rec-x-c1',type:'complexity',d:2,p:'backtracking',title:'Word search',code:`for r in range(rows):
    for c in range(cols):
        found = found or dfs(r, c, 0)   # tries 4 directions, then 3 per step`,opts:['O(rows · cols)','O(rows · cols · 3^L) where L = len(word)','O(L)','O(2^(rows · cols))'],a:1,why:'Each of the rows · cols starting cells can explore up to 4 · 3^(L − 1) paths of length L.'},
{id:'rec-x-d1',type:'debug',d:2,p:'backtracking',title:'The shared path',code:`def subsets(nums):
    result = []
    path = []
    def go(i):
        if i == len(nums):
            result.append(path)
            return
        go(i + 1)
        path.append(nums[i])
        go(i + 1)
        path.pop()
    go(0)
    return result`,opts:['go(i + 1) is called twice','result stores the same path list object every time; by the end it is empty. Append a copy: path[:]','path should be a tuple','The base case is wrong'],a:1,why:'Backtracking mutates one list. Snapshot it when you record an answer.',fix:`def subsets(nums):
    result = []
    path = []
    def go(i):
        if i == len(nums):
            result.append(path[:])
            return
        go(i + 1)
        path.append(nums[i])
        go(i + 1)
        path.pop()
    go(0)
    return result`,tests:[['sorted(subsets([1, 2]))','[[], [1], [1, 2], [2]]'],['subsets([])','[[]]']]},
{id:'rec-combination-sum-ii',type:'code',d:2,p:'backtracking',title:'Combination Sum II',prompt:'<p>Return all unique combinations of <code>candidates</code> that sum to <code>target</code>. Each candidate may be used once, but the list may contain duplicate values; the output must not contain duplicate combinations. Each combination should be in non-decreasing order.</p>',prereq:['rec-combination-sum'],
constraints:['1 ≤ len(candidates) ≤ 100','1 ≤ candidates[i] ≤ 50, 1 ≤ target ≤ 30'],
starter:`def combination_sum2(candidates, target):
    # your code here
    pass`,solution:`def combination_sum2(candidates, target):
    nums = sorted(candidates)
    result, path = [], []

    def go(start, remaining):
        if remaining == 0:
            result.append(path[:])
            return
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue                 # same value at the same depth: duplicate subtree
            if nums[i] > remaining:
                break                    # sorted: nothing after this fits either
            path.append(nums[i])
            go(i + 1, remaining - nums[i])
            path.pop()

    go(0, target)
    return result`,
tests:[['combination_sum2([10, 1, 2, 7, 6, 1, 5], 8)','[[1, 1, 6], [1, 2, 5], [1, 7], [2, 6]]','groups'],['combination_sum2([2, 5, 2, 1, 2], 5)','[[1, 2, 2], [5]]','groups'],['combination_sum2([1], 2)','[]','groups'],['combination_sum2([2], 2)','[[2]]','groups'],['len(combination_sum2([1] * 30, 30))','1']],
hints:['Sort first, so equal values sit together and you can stop early.','At each depth, skip a value equal to the previous one at that same depth; recurse with i + 1 because each item is used once.'],approach:'Sorted backtracking with duplicate skipping and early break.',cx:'O(2ⁿ) worst case, heavily pruned',
mistakes:['Generating all combinations and removing duplicates with a set afterwards (slow on [1] * 30).','Skipping duplicates with i > 0 instead of i > start, which also removes valid combinations like [1, 1, 6].'],
followup:'Return only the number of combinations, using DP over sums instead of backtracking.'},
{id:'rec-subsets-dup',type:'code',d:2,p:'backtracking',title:'Subsets II (with duplicates)',prompt:'<p>Return all distinct subsets of a list that may contain duplicates. The order of subsets does not matter; each subset should be sorted.</p>',prereq:['rec-subsets'],
constraints:['0 ≤ len(nums) ≤ 10','−10 ≤ nums[i] ≤ 10'],
starter:`def subsets_with_dup(nums):
    # your code here
    pass`,solution:`def subsets_with_dup(nums):
    nums = sorted(nums)
    result, path = [], []

    def go(start):
        result.append(path[:])           # every node of the tree is a subset
        for i in range(start, len(nums)):
            if i > start and nums[i] == nums[i - 1]:
                continue
            path.append(nums[i])
            go(i + 1)
            path.pop()

    go(0)
    return result`,
tests:[['subsets_with_dup([1, 2, 2])','[[], [1], [1, 2], [1, 2, 2], [2], [2, 2]]','groups'],['subsets_with_dup([0])','[[], [0]]','groups'],['subsets_with_dup([])','[[]]','groups'],['len(subsets_with_dup([2, 2, 2, 2]))','5'],['len(subsets_with_dup([1, 2, 3]))','8']],
hints:['Sort so that duplicates are next to each other.','Use the same skip rule as Combination Sum II: at one depth, take each distinct value once.'],approach:'Backtracking over start indexes with duplicate skipping; record every path.',cx:'O(n · 2ⁿ)',
mistakes:['Using a set of tuples to deduplicate afterwards (works, but wastes the whole duplicate search).','Forgetting to sort first.'],
followup:'Count the distinct subsets with a formula: the product of (count of each value + 1).'},
{id:'rec-word-search',type:'code',d:2,p:'backtracking',title:'Word Search',prompt:'<p>Return <code>True</code> if <code>word</code> can be spelled by moving between horizontally or vertically adjacent cells of the board, using each cell at most once.</p>',
constraints:['1 ≤ rows, cols ≤ 6','1 ≤ len(word) ≤ 15'],
starter:`def exist(board, word):
    # your code here
    pass`,solution:`def exist(board, word):
    rows, cols = len(board), len(board[0])

    def dfs(r, c, k):
        if k == len(word):
            return True
        if not (0 <= r < rows and 0 <= c < cols) or board[r][c] != word[k]:
            return False
        saved, board[r][c] = board[r][c], "#"      # mark as used
        found = any(dfs(r + dr, c + dc, k + 1) for dr, dc in ((1, 0), (-1, 0), (0, 1), (0, -1)))
        board[r][c] = saved                          # undo the choice
        return found

    return any(dfs(r, c, 0) for r in range(rows) for c in range(cols))`,
post:`B = [["A", "B", "C", "E"], ["S", "F", "C", "S"], ["A", "D", "E", "E"]]`,
tests:[['exist([row[:] for row in B], "ABCCED")','True'],['exist([row[:] for row in B], "SEE")','True'],['exist([row[:] for row in B], "ABCB")','False'],['exist([["a"]], "a")','True'],['exist([["a", "b"]], "ba")','True'],['exist([["a", "a"]], "aaa")','False']],
hints:['Start a DFS from every cell; each step must match the next letter.','Mark a cell as used before recursing and restore it afterwards (that is the "backtrack").'],approach:'DFS with in-place marking and undo.',cx:'O(rows · cols · 3^L)',
mistakes:['Forgetting to restore the cell, which breaks other search paths.','Reusing a cell ("ABCB" must be False).'],
followup:'Find all dictionary words on the board at once with a trie (Word Search II).'},
{id:'rec-sudoku',type:'code',d:3,p:'backtracking',title:'Sudoku Solver',prompt:'<p>Fill the 9 × 9 board (0 = empty) so that every row, column and 3 × 3 box contains the digits 1–9 exactly once. Modify the board in place and return it. The puzzle has exactly one solution.</p>',prereq:['rec-n-queens','rec-x-m3'],
constraints:['board is 9 × 9, values 0–9','the puzzle is valid and has a unique solution'],
starter:`def solve_sudoku(board):
    # your code here
    pass`,solution:`def solve_sudoku(board):
    rows = [set() for _ in range(9)]
    cols = [set() for _ in range(9)]
    boxes = [set() for _ in range(9)]
    empty = []
    for r in range(9):
        for c in range(9):
            v = board[r][c]
            if v:
                rows[r].add(v)
                cols[c].add(v)
                boxes[r // 3 * 3 + c // 3].add(v)
            else:
                empty.append((r, c))

    def go(k):
        if k == len(empty):
            return True
        r, c = empty[k]
        b = r // 3 * 3 + c // 3
        for v in range(1, 10):
            if v in rows[r] or v in cols[c] or v in boxes[b]:
                continue                         # prune: breaks a rule already
            board[r][c] = v
            rows[r].add(v); cols[c].add(v); boxes[b].add(v)
            if go(k + 1):
                return True
            rows[r].remove(v); cols[c].remove(v); boxes[b].remove(v)
        board[r][c] = 0
        return False

    go(0)
    return board`,
post:`def _board(s):
    return [[int(ch) if ch != "." else 0 for ch in s[r * 9:(r + 1) * 9]] for r in range(9)]
P1 = "53..7....6..195....98....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79"
S1 = "534678912672195348198342567859761423426853791713924856961537284287419635345286179"
def _valid(b):
    groups = [b[r] for r in range(9)] + [[b[r][c] for r in range(9)] for c in range(9)]
    groups += [[b[r][c] for r in range(br, br + 3) for c in range(bc, bc + 3)] for br in (0, 3, 6) for bc in (0, 3, 6)]
    return all(sorted(g) == list(range(1, 10)) for g in groups)`,
tests:[['solve_sudoku(_board(P1))','_board(S1)','','the classic puzzle'],['solve_sudoku(_board("." + S1[1:]))','_board(S1)','','only one empty cell'],['solve_sudoku(_board(S1))','_board(S1)','','already solved'],['_valid(solve_sudoku(_board(P1)))','True','','every row, column and box holds 1–9'],['solve_sudoku(_board(S1[:40] + "." * 9 + S1[49:]))','_board(S1)','','a fully empty stretch of nine cells']],
hints:['List the empty cells, then fill them one by one; undo when you get stuck.','Keep three lists of sets (rows, columns, boxes) so a digit can be checked in O(1). Box index: r // 3 * 3 + c // 3.'],approach:'Backtracking over empty cells with O(1) constraint checks via sets.',cx:'Exponential in the worst case; fast on real puzzles thanks to pruning',
mistakes:['Validating the whole board after every placement (slow).','Forgetting to reset the cell to 0 and remove the digit from the sets when backtracking.','Wrong box index, e.g. r // 3 + c // 3.'],
followup:'Always fill the empty cell with the fewest possible digits first. How much faster does it get on hard puzzles?'},
]);
