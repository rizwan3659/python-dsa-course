/* Topic 9 · Recursion & backtracking. Exercises rec-sum-digits … rec-flatten come from the original session 3. */
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
    return n % 10 + sum_digits(n // 10)`,tests:[['sum_digits(4096)','19'],['sum_digits(0)','0'],['sum_digits(7)','7'],['sum_digits(999999)','54']],hints:['A single digit is its own sum.','Last digit: n % 10. Everything else: n // 10.'],approach:'Peel off the last digit each call.',cx:'O(number of digits)'},
{id:'rec-power',type:'code',d:1,p:'divide-conquer',title:'Fast Power',prompt:'<p><code>power(x, n)</code> returns x to the power n (n ≥ 0) using O(log n) multiplications. Do not use <code>**</code> or <code>pow</code>.</p>',starter:`def power(x, n):
    pass`,solution:`def power(x, n):
    if n == 0:
        return 1
    half = power(x, n // 2)
    if n % 2 == 0:
        return half * half
    return half * half * x`,tests:[['power(2, 10)','1024'],['power(3, 0)','1'],['power(5, 3)','125'],['power(2, 200)','2 ** 200']],hints:['Compute <code>power(x, n // 2)</code> once and square it.','If n is odd, multiply by x once more.'],approach:'Halve n each call.',cx:'O(log n)'},
{id:'rec-is-pal',type:'code',d:1,p:'recursion',title:'Recursive Palindrome',prompt:'<p><code>is_pal(s)</code> returns True if <code>s</code> reads the same backwards, recursively (compare the ends, then recurse on the middle).</p>',starter:`def is_pal(s):
    pass`,solution:`def is_pal(s):
    if len(s) <= 1:
        return True
    if s[0] != s[-1]:
        return False
    return is_pal(s[1:-1])`,tests:[['is_pal("racecar")','True'],['is_pal("abca")','False'],['is_pal("")','True'],['is_pal("aa")','True'],['is_pal("ab")','False']],hints:['Strings of length 0 or 1 are palindromes.','If the ends match, the answer is the answer for the middle.'],approach:'Compare ends, recurse inward.',cx:'O(n²) with slicing (O(n) with indexes)'},
{id:'rec-flatten',type:'code',d:1,p:'recursion',title:'Flatten a Nested List',prompt:'<p><code>flatten(items)</code> takes a list that may contain lists (to any depth) and returns one flat list.</p><p><code>flatten([1, [2, [3, 4]], 5])</code> → <code>[1, 2, 3, 4, 5]</code></p>',starter:`def flatten(items):
    pass`,solution:`def flatten(items):
    result = []
    for x in items:
        if isinstance(x, list):
            result.extend(flatten(x))
        else:
            result.append(x)
    return result`,tests:[['flatten([1, [2, [3, 4]], 5])','[1, 2, 3, 4, 5]'],['flatten([])','[]'],['flatten([[[]]])','[]'],['flatten([["a"], "b"])','["a", "b"]']],hints:['Loop over the items. If an item is a list, flatten it recursively and extend; otherwise append it.'],approach:'Recurse on sublists.',cx:'O(total elements)'},
{id:'rec-factorial',type:'code',d:1,p:'recursion',title:'Factorial',prompt:'<p>Return n! recursively (0! = 1).</p>',starter:`def factorial(n):
    pass`,solution:`def factorial(n):
    if n <= 1:
        return 1
    return n * factorial(n - 1)`,tests:[['factorial(0)','1'],['factorial(5)','120'],['factorial(10)','3628800']],hints:['Base case: n ≤ 1.'],approach:'n × factorial(n − 1).',cx:'O(n) time, O(n) stack'},
{id:'rec-reverse-string',type:'code',d:1,p:'recursion',title:'Reverse a String Recursively',prompt:'<p>Return the reversed string without slicing with [::-1] or reversed().</p>',starter:`def reverse(s):
    pass`,solution:`def reverse(s):
    if len(s) <= 1:
        return s
    return reverse(s[1:]) + s[0]`,tests:[['reverse("hello")','"olleh"'],['reverse("")','""'],['reverse("a")','"a"']],hints:['The reverse of s is reverse(rest) + first character.'],approach:'Move the first character to the end of the reversed rest.',cx:'O(n²) with slicing'},
{id:'rec-gcd',type:'code',d:1,p:'math',title:'Greatest Common Divisor',prompt:'<p>Return gcd(a, b) using Euclid’s rule: gcd(a, b) = gcd(b, a % b), and gcd(a, 0) = a.</p>',starter:`def gcd(a, b):
    pass`,solution:`def gcd(a, b):
    if b == 0:
        return a
    return gcd(b, a % b)`,tests:[['gcd(48, 18)','6'],['gcd(7, 3)','1'],['gcd(10, 0)','10'],['gcd(0, 5)','5']],hints:['The rule is already recursive.'],approach:"Euclid's algorithm.",cx:'O(log min(a, b))'},
{id:'rec-fib-memo',type:'code',kind:'optimize',d:1,p:'dp',title:'Fibonacci With Memoization',prompt:'<p>Return fib(n) (fib(0) = 0, fib(1) = 1). The starter is correct but exponential: make it fast for n = 300.</p>',starter:`def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`,solution:`from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`,tests:[['fib(10)','55'],['fib(1)','1'],['fib(300)','222232244629420445529739893461909967206666939096499764990979600','','fib(300) (must be fast)']],hints:['The starter recomputes the same values exponentially many times.','Cache each result: functools.lru_cache, or a dict.'],approach:'Memoization turns O(2ⁿ) into O(n).',cx:'O(n) time'},
{id:'rec-climb',type:'code',d:1,p:'dp',title:'Climbing Stairs',prompt:'<p>You climb 1 or 2 steps at a time. In how many distinct ways can you climb n steps?</p><p><code>climb(3)</code> → <code>3</code> (1+1+1, 1+2, 2+1)</p>',starter:`def climb(n):
    pass`,solution:`from functools import lru_cache

@lru_cache(maxsize=None)
def climb(n):
    if n <= 2:
        return n
    return climb(n - 1) + climb(n - 2)`,tests:[['climb(1)','1'],['climb(2)','2'],['climb(3)','3'],['climb(5)','8'],['climb(60)','2504730781961']],hints:['Your last move was either 1 step or 2 steps.','ways(n) = ways(n − 1) + ways(n − 2). Memoize it.'],approach:'Fibonacci-like recurrence with memoization.',cx:'O(n)'},
{id:'rec-count-paths',type:'code',d:2,p:'dp',title:'Count Grid Paths',prompt:'<p>Moving only right or down, how many paths go from (0, 0) to (r, c)?</p><p><code>count_paths(2, 2)</code> → <code>6</code></p>',starter:`def count_paths(r, c):
    pass`,solution:`from functools import lru_cache

@lru_cache(maxsize=None)
def count_paths(r, c):
    if r == 0 or c == 0:
        return 1
    return count_paths(r - 1, c) + count_paths(r, c - 1)`,tests:[['count_paths(2, 2)','6'],['count_paths(0, 5)','1'],['count_paths(3, 7)','120'],['count_paths(16, 16)','601080390','','16 × 16 (must be fast)']],hints:['The last step came from above or from the left.','Memoize, or the same cells are recomputed exponentially many times.'],approach:'paths(r, c) = paths(r − 1, c) + paths(r, c − 1), cached.',cx:'O(r × c)'},
{id:'rec-hanoi',type:'code',d:2,p:'recursion',title:'Towers of Hanoi',prompt:'<p>Return the list of moves <code>(from, to)</code> that moves n disks from peg "A" to peg "C" using "B".</p><p><code>hanoi(2)</code> → <code>[("A", "B"), ("A", "C"), ("B", "C")]</code></p>',starter:`def hanoi(n, src="A", dst="C", via="B"):
    pass`,solution:`def hanoi(n, src="A", dst="C", via="B"):
    if n == 0:
        return []
    return (hanoi(n - 1, src, via, dst)      # park n - 1 disks on via
            + [(src, dst)]                   # move the biggest disk
            + hanoi(n - 1, via, dst, src))   # bring the n - 1 disks over`,tests:[['hanoi(1)','[("A", "C")]'],['hanoi(2)','[("A", "B"), ("A", "C"), ("B", "C")]'],['len(hanoi(10))','1023']],hints:['To move n disks, the biggest disk must move once, from src to dst. Where must the other n − 1 disks be at that moment?'],approach:'Move n − 1 out of the way, move the biggest, move n − 1 back on top.',cx:'O(2ⁿ) moves'},
{id:'rec-binary-strings',type:'code',d:2,p:'backtracking',title:'All Binary Strings',prompt:'<p>Return all binary strings of length n in increasing order.</p><p><code>binary_strings(2)</code> → <code>["00", "01", "10", "11"]</code></p>',starter:`def binary_strings(n):
    pass`,solution:`def binary_strings(n):
    if n == 0:
        return [""]
    shorter = binary_strings(n - 1)
    return ["0" + s for s in shorter] + ["1" + s for s in shorter]`,tests:[['binary_strings(2)','["00", "01", "10", "11"]'],['binary_strings(0)','[""]'],['len(binary_strings(10))','1024']],hints:['A string of length n is "0" or "1" followed by a string of length n − 1.'],approach:'Build from the strings of length n − 1.',cx:'O(n · 2ⁿ)'},
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
    return result`,tests:[['subsets([1, 2, 3])','[[], [1], [2], [3], [1, 2], [1, 3], [2, 3], [1, 2, 3]]','unordered'],['subsets([])','[[]]','unordered'],['len(subsets(list(range(10))))','1024']],hints:['Each number is either in or out.','Backtracking: choose, explore, un-choose. Record a copy at the end.'],approach:'Include/exclude decision tree.',cx:'O(n · 2ⁿ)'},
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
    return result`,tests:[['permutations([1, 2, 3])','[[1, 2, 3], [1, 3, 2], [2, 1, 3], [2, 3, 1], [3, 1, 2], [3, 2, 1]]','unordered'],['permutations([1])','[[1]]','unordered'],['len(permutations([1, 2, 3, 4, 5]))','120']],hints:['At each position, try every number not used yet.','Track used numbers; undo both the path and the used flag after exploring.'],approach:'Backtracking over unused elements.',cx:'O(n · n!)'},
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
    return result`,tests:[['combination_sum([2, 3, 6, 7], 7)','[[2, 2, 3], [7]]','unordered'],['combination_sum([2, 3, 5], 8)','[[2, 2, 2, 2], [2, 3, 3], [3, 5]]','unordered'],['combination_sum([2], 1)','[]','unordered']],hints:['To avoid duplicates like [2, 3, 2], only pick candidates at or after the current index.','Pass the remaining target down; stop when it reaches 0 (record) or goes negative (prune).'],approach:'Backtracking with a start index and pruning.',cx:'Exponential in the worst case'},
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
    return sorted(result)`,tests:[['generate(3)','["((()))", "(()())", "(())()", "()(())", "()()()"]'],['generate(1)','["()"]'],['len(generate(6))','132']],hints:['You may add "(" while fewer than n are open.','You may add ")" only while closed < opened. Those two rules prune every invalid string.'],approach:'Backtracking with counts of opened/closed brackets.',cx:'O(Catalan(n)) results'},
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
    return result`,tests:[['letter_combinations("23")','["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]'],['letter_combinations("")','[]'],['letter_combinations("7")','["p", "q", "r", "s"]']],hints:['One level of recursion per digit; branch on that digit’s letters.'],approach:'Backtracking over digit positions.',cx:'O(4ⁿ · n)'},
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

    return place(0)`,tests:[['n_queens(1)','1'],['n_queens(4)','2'],['n_queens(6)','4'],['n_queens(8)','92']],hints:['Place one queen per row; for each row try every column.','A square (r, c) is attacked if its column, its r − c diagonal or its r + c diagonal is taken. Keep three sets.'],approach:'Row-by-row backtracking with column and diagonal sets.',cx:'Exponential, heavily pruned'}
]);
