/* Topic 20 · Dynamic Programming — question bank. */
COURSE.qs('dp',[
/* ---------- predict the output ---------- */
{id:'dp-p1',type:'predict',d:2,p:'dp',title:'Calls without memoization',code:`calls = 0

def fib(n):
    global calls
    calls += 1
    return n if n < 2 else fib(n - 1) + fib(n - 2)

fib(10)
print(calls)`,a:'177',hints:['The call tree for fib(10) recomputes the same values many times.','calls(n) = 1 + calls(n − 1) + calls(n − 2), with calls(0) = calls(1) = 1.'],why:'177 calls to compute fib(10). The count grows like 1.6ⁿ: exponential, because every subproblem is solved again and again.'},
{id:'dp-p2',type:'predict',d:2,p:'dp',title:'Calls with lru_cache',code:`from functools import lru_cache

calls = 0

@lru_cache(maxsize=None)
def fib(n):
    global calls
    calls += 1
    return n if n < 2 else fib(n - 1) + fib(n - 2)

print(fib(20), calls)`,a:'6765 21',why:'With the cache each fib(k) for k = 0..20 runs exactly once: 21 calls instead of about 22,000. That is memoization.'},
{id:'dp-p3',type:'predict',d:2,p:'dp',title:'Counting coin combinations',code:`dp = [0] * 6
dp[0] = 1
for coin in [1, 2]:
    for a in range(coin, 6):
        dp[a] += dp[a - coin]
print(dp)`,a:'[1, 1, 2, 2, 3, 3]',hints:['After coin 1, every amount has exactly one way.','Coin 2 then adds dp[a − 2] to each amount from 2 up.'],why:'dp[a] counts the combinations of coins that make a. Looping over coins on the outside counts each combination once (1 + 2 and 2 + 1 are the same).'},
{id:'dp-p4',type:'predict',d:3,p:'binary-search',title:'Patience sorting tails',code:`from bisect import bisect_left

tails = []
for x in [4, 10, 4, 3, 8, 9]:
    i = bisect_left(tails, x)
    if i == len(tails):
        tails.append(x)
    else:
        tails[i] = x
print(tails, len(tails))`,a:'[3, 8, 9] 3',why:'tails[k] is the smallest possible last value of an increasing subsequence of length k + 1. Its length is the LIS length: 3 (for example 4, 8, 9).'},
{id:'dp-p5',type:'predict',d:1,p:'dp',title:'Grid paths table',code:`rows, cols = 3, 4
dp = [[1] * cols for _ in range(rows)]
for r in range(1, rows):
    for c in range(1, cols):
        dp[r][c] = dp[r - 1][c] + dp[r][c - 1]
print(dp[-1])`,a:'[1, 3, 6, 10]',why:'Each cell is reached from above or from the left, so its count is the sum of those two. Row 1 is [1, 2, 3, 4], row 2 is [1, 3, 6, 10].'},

/* ---------- concept ---------- */
{id:'dp-m1',type:'mcq',d:1,p:'dp',title:'When does DP apply?',q:'Dynamic programming helps when a problem has…',opts:['A sorted input','Overlapping subproblems and optimal substructure','Only one possible answer','No recursion'],a:1,why:'Overlapping: the same smaller problems come up again and again (so caching pays). Optimal substructure: the best answer is built from best answers to smaller problems.'},
{id:'dp-m2',type:'mcq',d:1,p:'dp',title:'Memoization vs tabulation',q:'What is the difference?',opts:['Memoization is always faster','Memoization is top-down recursion plus a cache; tabulation fills a table bottom-up with loops','Tabulation cannot use lists','They solve different problems'],a:1,why:'Same subproblems, same complexity. Memoization only computes what it needs; tabulation avoids recursion depth limits and makes space optimisation easy.'},
{id:'dp-m3',type:'mcq',d:1,p:'dp',title:'The first step',q:'What should you write down first when designing a DP solution?',opts:['The loops','The meaning of the state, e.g. "dp[i] = the best answer using the first i items"','The return statement','The time complexity'],a:1,why:'Once the state has a precise meaning, the base cases, the transition and the loop order usually follow.'},
{id:'dp-m4',type:'mcq',d:3,p:'dp',title:'Backwards in 0/1 knapsack',q:'With a 1D table, 0/1 knapsack loops capacity from high to low. Why?',opts:['It is faster','Going upwards would read values already updated for the same item, letting it be taken many times','Python requires it','To save memory'],a:1,why:'Downwards, dp[w − weight] still holds the value from before this item. Upwards gives the unbounded knapsack, where items can repeat.'},
{id:'dp-m5',type:'mcq',d:2,p:'dp',title:'The LCS table',q:'In the LCS table, what does dp[i][j] mean?',opts:['Whether a[i] == b[j]','The length of the longest common subsequence of a[:i] and b[:j]','The number of matches in row i','The answer for the whole strings'],a:1,why:'Prefixes are the subproblems. The answer for the full strings is dp[len(a)][len(b)].'},
{id:'dp-m6',type:'mcq',d:2,p:'dp',title:'Space optimisation',q:'Each row of a 2D table depends only on the row above it. What can you do?',opts:['Nothing','Keep only two rows (or one, with care): O(n·m) space becomes O(m)','Switch to recursion','Sort the rows'],a:1,why:'Rows you will never read again do not need to be stored. Climbing stairs goes further: two variables instead of a list.'},
{id:'dp-m7',type:'mcq',d:2,p:'dp',title:'RecursionError with memoization',q:'A memoized recursive solution crashes with RecursionError for n = 10,000. Best fix?',opts:['Raise the recursion limit to a million','Rewrite it bottom-up with a loop (tabulation)','Remove the cache','Use a global variable'],a:1,why:'Python’s default recursion limit is about 1,000. A loop has no depth limit.'},
{id:'dp-m8',type:'mcq',d:1,p:'dp',title:'Combine with + or min?',q:'"How many ways…" versus "what is the minimum cost…". How do the transitions differ?',opts:['They are identical','Count problems add the options (+); optimisation problems take the best option (min or max)','Count problems use min','Optimisation problems multiply'],a:1,why:'Same states, different combining step. Climbing stairs adds; min-cost stairs takes the min.'},

/* ---------- complexity ---------- */
{id:'dp-c1',type:'complexity',d:1,p:'dp',title:'Memoized Fibonacci',code:`@lru_cache(maxsize=None)
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)`,a:'O(n)',why:'n + 1 distinct states, O(1) work each.'},
{id:'dp-c2',type:'complexity',d:1,p:'dp',title:'Plain recursive Fibonacci',code:`def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)`,a:'O(2ⁿ)',why:'The call tree roughly doubles at each level (more precisely it grows like 1.6ⁿ).'},
{id:'dp-c3',type:'complexity',d:2,p:'dp',title:'Coin change table',code:`for a in range(1, amount + 1):
    for c in coins:
        if c <= a:
            dp[a] = min(dp[a], dp[a - c] + 1)`,opts:['O(amount)','O(k)','O(amount · k)','O(2^amount)'],a:2,why:'amount states, k coins tried per state (k = number of coin types).'},
{id:'dp-c4',type:'complexity',d:2,p:'dp',title:'LCS table',code:`for i in range(1, n + 1):
    for j in range(1, m + 1):
        if a[i - 1] == b[j - 1]:
            dp[i][j] = dp[i - 1][j - 1] + 1
        else:
            dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])`,opts:['O(n + m)','O(n · m)','O(n² · m²)','O(2ⁿ)'],a:1,why:'(n + 1)(m + 1) cells, O(1) each.'},

/* ---------- choose ---------- */
{id:'dp-ch1',type:'choose',d:1,p:'dp',title:'Ways to climb',q:'Count the ways to climb n stairs taking 1 or 2 steps at a time.',opts:['DP: ways(n) = ways(n − 1) + ways(n − 2)','Greedy: always take 2 steps','Binary search','A heap'],a:0,why:'The last move is 1 or 2 steps, so the count splits into two smaller counts.'},
{id:'dp-ch2',type:'choose',d:2,p:'dp',title:'Two strings',q:'Find the minimum number of insertions, deletions and replacements to turn one word into another.',opts:['2D DP over prefixes of both words (edit distance)','Sorting both words','A greedy left-to-right match','Hashing'],a:0,why:'Each cell compares prefixes a[:i] and b[:j]; the last characters either match or cost one operation.'},
{id:'dp-ch3',type:'choose',d:2,p:'bfs',title:'Fewest moves in a maze',q:'Fewest moves from start to exit in a grid maze where you can move in 4 directions.',opts:['BFS: every move costs the same and moves can go in any direction','Grid DP from the top-left','Greedy: always move towards the exit','Knapsack DP'],a:0,why:'Grid DP only works when moves go one way (e.g. right and down). With cycles and all four directions, BFS finds shortest paths.'},

/* ---------- dry run ---------- */
{id:'dp-dr1',type:'dryrun',d:1,p:'dp',title:'Climbing stairs in two variables',code:`n = 5
a, b = 1, 1
for _ in range(n - 1):
    a, b = b, a + b`,cols:['a','b'],rows:[['1','2'],['2','3'],['3','5'],['5','8']],why:'b is the number of ways to reach the current step: 1, 2, 3, 5, 8. Only the last two values are ever needed.'},
{id:'dp-dr2',type:'dryrun',d:2,p:'dp',title:'Minimum coins, coins 1, 3, 4',code:`coins = [1, 3, 4]
dp = [0] + [99] * 6
for a in range(1, 7):
    dp[a] = min(dp[a - c] for c in coins if c <= a) + 1`,cols:['a','dp[a]'],given:[0],rows:[['1','1'],['2','2'],['3','1'],['4','1'],['5','2'],['6','2']],why:'dp[6] = 1 + min(dp[5], dp[3], dp[2]) = 1 + 1 = 2 (3 + 3). Greedy would have used 4 + 1 + 1.'},
{id:'dp-dr3',type:'dryrun',d:2,p:'dp',title:'LIS in O(n²)',code:`nums = [3, 1, 4, 2, 5]
lis = [1] * 5
for i in range(1, 5):
    for j in range(i):
        if nums[j] < nums[i]:
            lis[i] = max(lis[i], lis[j] + 1)`,cols:['i','lis'],given:[0],rows:[['1','[1, 1, 1, 1, 1]'],['2','[1, 1, 2, 1, 1]'],['3','[1, 1, 2, 2, 1]'],['4','[1, 1, 2, 2, 3]']],setup:'One row per value of i (the outer loop).',why:'lis[i] is the longest increasing subsequence ending at index i. The answer is max(lis) = 3.'},

/* ---------- complete the code ---------- */
{id:'dp-b1',type:'blanks',d:1,p:'dp',title:'Complete memoized Fibonacci',code:`def fib(n, memo=None):
    if memo is None:
        memo = {}
    if n < 2:
        return n
    if n not in memo:
        memo[n] = ______
    return ______`,blanks:[['fib(n - 1, memo) + fib(n - 2, memo)','fib(n-1, memo) + fib(n-2, memo)','fib(n - 2, memo) + fib(n - 1, memo)'],['memo[n]']],tests:[['fib(10)','55'],['fib(80)','23416728348467685'],['fib(1)','1']],why:'Store each result the first time; every later request is a dictionary lookup.'},
{id:'dp-b2',type:'blanks',d:1,p:'dp',title:'Complete unique grid paths',code:`def unique_paths(m, n):
    dp = [[1] * n for _ in range(m)]
    for r in range(1, m):
        for c in range(1, n):
            dp[r][c] = ______
    return ______`,blanks:[['dp[r - 1][c] + dp[r][c - 1]','dp[r-1][c] + dp[r][c-1]','dp[r][c - 1] + dp[r - 1][c]'],['dp[m - 1][n - 1]','dp[-1][-1]','dp[m-1][n-1]']],tests:[['unique_paths(3, 7)','28'],['unique_paths(3, 2)','3'],['unique_paths(1, 1)','1']],why:'The first row and column have one path each (straight line); every other cell sums its top and left neighbours.'},
{id:'dp-b3',type:'blanks',d:2,p:'dp',title:'Complete House Robber in O(1) space',code:`def rob(nums):
    prev, cur = 0, 0
    for x in nums:
        prev, cur = ______, ______
    return cur`,blanks:[['cur'],['max(cur, prev + x)','max(prev + x, cur)']],tests:[['rob([2, 7, 9, 3, 1])','12'],['rob([])','0'],['rob([2, 1, 1, 2])','4']],why:'cur is the best total so far; prev is the best before the previous house. Rob this house (prev + x) or skip it (cur).'},

/* ---------- debug ---------- */
{id:'dp-d1',type:'debug',d:1,p:'dp',title:'Zero coins for everything',code:`def coin_change(coins, amount):
    dp = [0] * (amount + 1)
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != float("inf") else -1`,opts:['The loops are in the wrong order','dp starts at 0 for every amount, so min() never improves on 0: start at infinity (except dp[0] = 0)','c <= a should be c < a','It should return dp[0]'],a:1,why:'For a minimisation, unknown states must start at +infinity. Only the base case dp[0] = 0 is truly zero.',fix:`def coin_change(coins, amount):
    dp = [0] + [float("inf")] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != float("inf") else -1`,tests:[['coin_change([1, 2, 5], 11)','3'],['coin_change([2], 3)','-1'],['coin_change([1], 0)','0']]},
{id:'dp-d2',type:'debug',d:2,p:'dp',title:'LCS shifted by one',code:`def lcs(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i] == b[j]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]`,opts:['dp should have n rows, not n + 1','Row i stands for the prefix a[:i], whose last character is a[i − 1], not a[i]','max should be min','It should return dp[0][0]'],a:1,why:'The table has an extra row and column for empty prefixes, so string indexes are shifted by one: compare a[i − 1] with b[j − 1].',fix:`def lcs(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]`,tests:[['lcs("abcde", "ace")','3'],['lcs("abc", "abc")','3'],['lcs("abc", "def")','0']]},
{id:'dp-d3',type:'debug',d:3,p:'dp',title:'The item that was packed three times',code:`def knapsack(values, weights, capacity):
    dp = [0] * (capacity + 1)
    for v, w in zip(values, weights):
        for cap in range(w, capacity + 1):
            dp[cap] = max(dp[cap], dp[cap - w] + v)
    return dp[capacity]`,opts:['zip is wrong here','The capacity loop goes upwards, so dp[cap − w] may already include this item: each item can be reused. Loop downwards.','dp should be 2D, a 1D table can never work','max should be min'],a:1,why:'With values [10], weights [1] and capacity 3 the buggy version returns 30. Looping from capacity down to w keeps every item 0/1.',fix:`def knapsack(values, weights, capacity):
    dp = [0] * (capacity + 1)
    for v, w in zip(values, weights):
        for cap in range(capacity, w - 1, -1):
            dp[cap] = max(dp[cap], dp[cap - w] + v)
    return dp[capacity]`,tests:[['knapsack([10], [1], 3)','10'],['knapsack([60, 100, 120], [10, 20, 30], 50)','220'],['knapsack([1, 4, 5, 7], [1, 3, 4, 5], 7)','9']]},
{id:'dp-d4',type:'debug',d:1,p:'dp',title:'A robber with the wrong start',code:`def rob(nums):
    if not nums:
        return 0
    dp = [0] * len(nums)
    dp[0] = nums[0]
    if len(nums) > 1:
        dp[1] = nums[1]
    for i in range(2, len(nums)):
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
    return dp[-1]`,opts:['dp[0] should be 0','dp[1] must be the best of the first two houses, max(nums[0], nums[1]), not nums[1]','The loop should start at 1','It should return max(nums)'],a:1,why:'dp[i] means "best total using houses 0..i". With only two houses you take the richer one.',fix:`def rob(nums):
    if not nums:
        return 0
    dp = [0] * len(nums)
    dp[0] = nums[0]
    if len(nums) > 1:
        dp[1] = max(nums[0], nums[1])
    for i in range(2, len(nums)):
        dp[i] = max(dp[i - 1], dp[i - 2] + nums[i])
    return dp[-1]`,tests:[['rob([2, 1, 1, 2])','4'],['rob([5, 1])','5'],['rob([1, 2, 3, 1])','4']]},

/* ---------- coding (schema v2) ---------- */
{id:'dp-fib-memo',type:'code',d:1,p:'dp',title:'Fibonacci with Memoization',prompt:'<p>Return the n-th Fibonacci number (<code>fib(0) = 0</code>, <code>fib(1) = 1</code>). Plain recursion is far too slow for n = 90: cache your results.</p>',prereq:['rec-climb'],
constraints:['0 ≤ n ≤ 90'],
starter:`def fib(n):
    # your code here
    pass`,solution:`from functools import lru_cache


@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)`,
tests:[['fib(0)','0'],['fib(1)','1'],['fib(10)','55'],['fib(50)','12586269025'],['fib(90)','2880067194370816120']],
hints:['Write the plain recursive version first.','Add @lru_cache(maxsize=None) from functools, or store results in a dict.'],approach:'Memoized recursion: each fib(k) is computed once.',cx:'O(n) time, O(n) space',
mistakes:['Leaving out the cache: fib(90) would take longer than the age of the universe.','Wrong base cases, e.g. fib(0) = 1.'],
followup:'Write it bottom-up with two variables: O(n) time and O(1) space.'},

{id:'dp-min-cost-stairs',type:'code',d:1,p:'dp',title:'Min Cost Climbing Stairs',prompt:'<p><code>cost[i]</code> is the price of stepping on stair i. You may start on stair 0 or 1, and from each stair climb 1 or 2 steps. Return the minimum cost to reach the top (just past the last stair).</p>',prereq:['rec-climb'],
constraints:['2 ≤ len(cost) ≤ 1000','0 ≤ cost[i] ≤ 999'],
starter:`def min_cost(cost):
    # your code here
    pass`,solution:`def min_cost(cost):
    # dp[i] = cheapest way to stand on stair i (including its cost)
    dp = cost[:2]
    for i in range(2, len(cost)):
        dp.append(cost[i] + min(dp[i - 1], dp[i - 2]))
    return min(dp[-1], dp[-2])   # the top is reached from either of the last two stairs`,
tests:[['min_cost([10, 15, 20])','15'],['min_cost([1, 100, 1, 1, 1, 100, 1, 1, 100, 1])','6'],['min_cost([0, 0])','0'],['min_cost([5, 10])','5'],['min_cost([1, 2, 3])','2']],
hints:['Define dp[i] as the cheapest total to stand on stair i.','dp[i] = cost[i] + min(dp[i − 1], dp[i − 2]). The top is one step past the end.'],approach:'1D DP over stairs; the answer is the cheaper of the last two stairs.',cx:'O(n) time, O(n) space (O(1) with two variables)',
mistakes:['Returning dp[-1] only: you may also jump to the top from the second-to-last stair.','Adding the cost of the top, which is free.'],
followup:'Reduce the space to O(1).'},

{id:'dp-house-robber',type:'code',d:2,p:'dp',title:'House Robber',prompt:'<p>Houses in a row hold <code>nums[i]</code> money. You cannot rob two adjacent houses. Return the most money you can take.</p>',
constraints:['0 ≤ len(nums) ≤ 100','0 ≤ nums[i] ≤ 400'],
starter:`def rob(nums):
    # your code here
    pass`,solution:`def rob(nums):
    skip, take = 0, 0          # best so far if the previous house was skipped / allowed
    for x in nums:
        skip, take = take, max(take, skip + x)
    return take`,
tests:[['rob([1, 2, 3, 1])','4'],['rob([2, 7, 9, 3, 1])','12'],['rob([])','0'],['rob([5])','5'],['rob([2, 1, 1, 2])','4'],['rob([0, 0, 0])','0']],
hints:['At each house you either rob it (and add the best total from two houses back) or skip it.','best(i) = max(best(i − 1), best(i − 2) + nums[i]).'],approach:'1D DP; only the previous two values are needed, so use two variables.',cx:'O(n) time, O(1) space',
dry:`nums 2 7 9 3 1
best 2 7 11 11 12   (11 = 2 + 9, 12 = 11 + 1)`,
mistakes:['Taking every other house (even or odd positions): [2, 1, 1, 2] needs houses 0 and 3.','Mishandling an empty list or a single house.'],
followup:'House Robber II: the houses are in a circle (dp-robber-circle).'},

{id:'dp-robber-circle',type:'code',d:2,p:'dp',title:'House Robber II (circle)',prompt:'<p>Same as House Robber, but the houses form a circle: the first and last houses are neighbours.</p>',prereq:['dp-house-robber'],
constraints:['1 ≤ len(nums) ≤ 100','0 ≤ nums[i] ≤ 1000'],
starter:`def rob_circle(nums):
    # your code here
    pass`,solution:`def rob_line(nums):
    skip, take = 0, 0
    for x in nums:
        skip, take = take, max(take, skip + x)
    return take


def rob_circle(nums):
    if len(nums) == 1:
        return nums[0]
    # either the first house is not robbed, or the last one is not
    return max(rob_line(nums[1:]), rob_line(nums[:-1]))`,
tests:[['rob_circle([2, 3, 2])','3'],['rob_circle([1, 2, 3, 1])','4'],['rob_circle([1, 2, 3])','3'],['rob_circle([5])','5'],['rob_circle([1, 3, 1, 3, 100])','103']],
hints:['You can never rob both the first and the last house.','Solve two straight-line problems: without the first house, and without the last.'],approach:'Reduce the circle to two line problems and take the better one.',cx:'O(n) time, O(1) extra space besides the slices',
mistakes:['Forgetting the single-house case (both slices are empty).','Subtracting something instead of splitting into two cases.'],
followup:'What if the houses form a binary tree and you cannot rob a parent and child together?'},

{id:'dp-decode-ways',type:'code',d:2,p:'dp',title:'Decode Ways',prompt:'<p>A message of letters is encoded as numbers: A = 1, …, Z = 26. Given a string of digits, return how many ways it can be decoded. "06" is not a valid code for F.</p>',
constraints:['1 ≤ len(s) ≤ 100','s contains only digits'],
starter:`def num_decodings(s):
    # your code here
    pass`,solution:`def num_decodings(s):
    # ways ending one character back (prev1) and two characters back (prev2)
    prev2, prev1 = 1, 1 if s[0] != "0" else 0
    for i in range(1, len(s)):
        cur = 0
        if s[i] != "0":                       # decode s[i] alone
            cur += prev1
        if 10 <= int(s[i - 1:i + 1]) <= 26:   # decode s[i-1:i+1] as one letter
            cur += prev2
        prev2, prev1 = prev1, cur
    return prev1`,
tests:[['num_decodings("12")','2'],['num_decodings("226")','3'],['num_decodings("06")','0'],['num_decodings("10")','1'],['num_decodings("11106")','2'],['num_decodings("2611055971756562")','4'],['num_decodings("0")','0']],
hints:['The last letter used either one digit or two digits.','ways(i) = ways(i − 1) if s[i] is 1–9, plus ways(i − 2) if the last two digits form 10–26.'],approach:'1D DP like climbing stairs, with validity checks for one-digit and two-digit steps.',cx:'O(n) time, O(1) space',
mistakes:['Treating "0" as a letter on its own.','Allowing two-digit codes like "05" or "27".'],
followup:'Return one valid decoding as letters, or all of them for short strings.'},

{id:'dp-coin-change',type:'code',d:2,p:'dp',title:'Coin Change (fewest coins)',prompt:'<p>Return the fewest coins that add up to <code>amount</code>, using any number of each coin. Return −1 if it is impossible.</p>',prereq:['gr-make-change'],
constraints:['1 ≤ len(coins) ≤ 12','1 ≤ coins[i] ≤ 2<sup>31</sup> − 1','0 ≤ amount ≤ 10<sup>4</sup>'],
starter:`def coin_change(coins, amount):
    # your code here
    pass`,solution:`def coin_change(coins, amount):
    INF = float("inf")
    dp = [0] + [INF] * amount          # dp[a] = fewest coins for amount a
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a and dp[a - c] + 1 < dp[a]:
                dp[a] = dp[a - c] + 1
    return dp[amount] if dp[amount] != INF else -1`,
tests:[['coin_change([1, 2, 5], 11)','3'],['coin_change([2], 3)','-1'],['coin_change([1], 0)','0'],['coin_change([1, 3, 4], 6)','2'],['coin_change([186, 419, 83, 408], 6249)','20'],['coin_change([2, 5, 10, 1], 27)','4']],
hints:['Greedy fails for coins like [1, 3, 4]. Think about the last coin used.','dp[a] = 1 + min(dp[a − c]) over coins c ≤ a; dp[0] = 0, everything else starts at infinity.'],approach:'Unbounded DP over amounts 0..amount.',cx:'O(amount · k) time, O(amount) space',
dry:`coins [1, 3, 4], amount 6
a:   0 1 2 3 4 5 6
dp:  0 1 2 1 1 2 2`,
mistakes:['Starting dp at 0 instead of infinity.','Returning infinity instead of −1.','Using greedy.'],
followup:'Also return which coins to use (store the last coin chosen for each amount).'},

{id:'dp-coin-ways',type:'code',d:2,p:'dp',title:'Coin Change II (number of ways)',prompt:'<p>Return the number of <b>combinations</b> of coins that make <code>amount</code> (order does not matter: 1 + 2 and 2 + 1 are the same).</p>',prereq:['dp-coin-change'],
constraints:['1 ≤ len(coins) ≤ 300','0 ≤ amount ≤ 5000'],
starter:`def coin_ways(amount, coins):
    # your code here
    pass`,solution:`def coin_ways(amount, coins):
    dp = [1] + [0] * amount            # one way to make 0: no coins
    for c in coins:                    # coins outside: each combination counted once
        for a in range(c, amount + 1):
            dp[a] += dp[a - c]
    return dp[amount]`,
tests:[['coin_ways(5, [1, 2, 5])','4'],['coin_ways(3, [2])','0'],['coin_ways(10, [10])','1'],['coin_ways(0, [7])','1'],['coin_ways(4, [1, 2, 3])','4']],
hints:['dp[a] = number of ways to make a. dp[0] = 1.','Loop over coins on the outside, amounts on the inside; with the loops swapped you count orderings instead.'],approach:'Unbounded knapsack counting: add dp[a − c] for each coin c, with coins in the outer loop.',cx:'O(amount · k) time, O(amount) space',
mistakes:['Swapping the loops, which counts 1 + 2 and 2 + 1 separately.','dp[0] = 0, which makes every answer 0.'],
followup:'Count ordered sequences instead (that is "Combination Sum IV"). Which loop order do you need?'},

{id:'dp-grid-obstacles',type:'code',d:2,p:'dp',title:'Unique Paths with Obstacles',prompt:'<p>Move only right or down from the top-left to the bottom-right cell. Cells with 1 are blocked. Return the number of paths.</p>',prereq:['rec-count-paths'],
constraints:['1 ≤ rows, cols ≤ 100','grid[r][c] is 0 or 1'],
starter:`def paths_with_obstacles(grid):
    # your code here
    pass`,solution:`def paths_with_obstacles(grid):
    cols = len(grid[0])
    dp = [0] * cols                    # one row of the table at a time
    dp[0] = 1
    for row in grid:
        for c in range(cols):
            if row[c] == 1:
                dp[c] = 0              # blocked: no path ends here
            elif c > 0:
                dp[c] += dp[c - 1]     # from above (old dp[c]) + from the left
    return dp[-1]`,
tests:[['paths_with_obstacles([[0, 0, 0], [0, 1, 0], [0, 0, 0]])','2'],['paths_with_obstacles([[0, 1], [0, 0]])','1'],['paths_with_obstacles([[1]])','0'],['paths_with_obstacles([[0]])','1'],['paths_with_obstacles([[0, 0], [0, 1]])','0'],['paths_with_obstacles([[0] * 7 for _ in range(3)])','28']],
hints:['paths(r, c) = paths(r − 1, c) + paths(r, c − 1), and 0 on a blocked cell.','You only need one row of the table if you update it left to right.'],approach:'Grid DP with a single rolling row.',cx:'O(rows · cols) time, O(cols) space',
mistakes:['Setting the whole first row/column to 1 even after an obstacle.','Forgetting that the start or the end itself may be blocked.'],
followup:'Return the path count modulo 10⁹ + 7 for a 1000 × 1000 grid.'},

{id:'dp-min-path-sum',type:'code',d:2,p:'dp',title:'Minimum Path Sum',prompt:'<p>Move only right or down from the top-left to the bottom-right. Return the smallest possible sum of the numbers on your path.</p>',
constraints:['1 ≤ rows, cols ≤ 200','0 ≤ grid[r][c] ≤ 200'],
starter:`def min_path_sum(grid):
    # your code here
    pass`,solution:`def min_path_sum(grid):
    rows, cols = len(grid), len(grid[0])
    dp = [[0] * cols for _ in range(rows)]
    for r in range(rows):
        for c in range(cols):
            if r == 0 and c == 0:
                dp[r][c] = grid[0][0]
            elif r == 0:
                dp[r][c] = dp[r][c - 1] + grid[r][c]
            elif c == 0:
                dp[r][c] = dp[r - 1][c] + grid[r][c]
            else:
                dp[r][c] = min(dp[r - 1][c], dp[r][c - 1]) + grid[r][c]
    return dp[-1][-1]`,
tests:[['min_path_sum([[1, 3, 1], [1, 5, 1], [4, 2, 1]])','7'],['min_path_sum([[1, 2, 3], [4, 5, 6]])','12'],['min_path_sum([[5]])','5'],['min_path_sum([[1, 2], [1, 1]])','3'],['min_path_sum([[1, 9, 9], [1, 9, 9], [1, 1, 1]])','5']],
hints:['A cell is entered from above or from the left.','dp[r][c] = grid[r][c] + min(dp[r − 1][c], dp[r][c − 1]); the first row and column have only one option.'],approach:'Grid DP taking the cheaper of the two incoming neighbours.',cx:'O(rows · cols) time and space',
mistakes:['Greedily stepping to the smaller neighbour, which can lead into an expensive region.','Treating the first row/column like inner cells (index −1 wraps around in Python!).'],
followup:'Print the path itself by walking back from the bottom-right cell.'},

{id:'dp-lcs',type:'code',d:2,p:'dp',title:'Longest Common Subsequence',prompt:'<p>Return the length of the longest sequence of characters that appears in both strings in the same order (not necessarily next to each other).</p>',
constraints:['0 ≤ len(a), len(b) ≤ 1000','lowercase or uppercase English letters'],
starter:`def lcs(a, b):
    # your code here
    pass`,solution:`def lcs(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]   # dp[i][j] = LCS of a[:i] and b[:j]
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[n][m]`,
tests:[['lcs("abcde", "ace")','3'],['lcs("abc", "abc")','3'],['lcs("abc", "def")','0'],['lcs("", "a")','0'],['lcs("AGGTAB", "GXTXAYB")','4'],['lcs("bl", "yby")','1']],
hints:['Compare the last characters of the two prefixes.','If they match: 1 + LCS of both prefixes shortened. Otherwise: the better of dropping one character from either string.'],approach:'2D DP over prefixes with an extra row and column for empty prefixes.',cx:'O(n · m) time and space',
dry:`      ""  a  c  e
 ""    0  0  0  0
 a     0  1  1  1
 b     0  1  1  1
 c     0  1  2  2
 d     0  1  2  2
 e     0  1  2  3`,
mistakes:['Comparing a[i] with b[j] instead of a[i − 1] with b[j − 1].','Confusing subsequence with substring (contiguous).'],
followup:'Reconstruct one LCS string by walking back through the table.'},

{id:'dp-edit-distance',type:'code',d:3,p:'dp',title:'Edit Distance',prompt:'<p>Return the minimum number of single-character insertions, deletions and replacements needed to turn <code>a</code> into <code>b</code>.</p>',prereq:['dp-lcs'],
constraints:['0 ≤ len(a), len(b) ≤ 500'],
starter:`def edit_distance(a, b):
    # your code here
    pass`,solution:`def edit_distance(a, b):
    n, m = len(a), len(b)
    dp = [[0] * (m + 1) for _ in range(n + 1)]
    for i in range(n + 1):
        dp[i][0] = i                   # delete everything
    for j in range(m + 1):
        dp[0][j] = j                   # insert everything
    for i in range(1, n + 1):
        for j in range(1, m + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1]
            else:
                dp[i][j] = 1 + min(dp[i - 1][j],      # delete a[i-1]
                                   dp[i][j - 1],      # insert b[j-1]
                                   dp[i - 1][j - 1])  # replace
    return dp[n][m]`,
tests:[['edit_distance("horse", "ros")','3'],['edit_distance("intention", "execution")','5'],['edit_distance("", "abc")','3'],['edit_distance("abc", "abc")','0'],['edit_distance("kitten", "sitting")','3'],['edit_distance("ab", "")','2']],
hints:['Base cases: turning a prefix into an empty string costs its length.','If the last characters match, no cost; otherwise 1 + the best of delete, insert and replace.'],approach:'2D DP over prefixes (Levenshtein distance).',cx:'O(n · m) time and space',
mistakes:['Forgetting the base row and column.','Adding 1 even when the characters match.'],
followup:'Use only two rows of the table: O(m) space.'},

{id:'dp-knapsack',type:'code',d:2,p:'dp',title:'0/1 Knapsack',prompt:'<p>Each item has a value and a weight and can be taken at most once. Return the largest total value with total weight ≤ <code>capacity</code>.</p>',prereq:['gr-fractional'],
constraints:['0 ≤ n ≤ 100','1 ≤ weights[i] ≤ 1000, 0 ≤ values[i] ≤ 1000','0 ≤ capacity ≤ 10<sup>4</sup>'],
starter:`def knapsack(values, weights, capacity):
    # your code here
    pass`,solution:`def knapsack(values, weights, capacity):
    dp = [0] * (capacity + 1)          # dp[c] = best value with capacity c
    for v, w in zip(values, weights):
        for c in range(capacity, w - 1, -1):    # downwards: each item at most once
            dp[c] = max(dp[c], dp[c - w] + v)
    return dp[capacity]`,
tests:[['knapsack([60, 100, 120], [10, 20, 30], 50)','220'],['knapsack([60, 100, 120], [10, 20, 30], 0)','0'],['knapsack([10], [5], 4)','0'],['knapsack([1, 4, 5, 7], [1, 3, 4, 5], 7)','9'],['knapsack([], [], 10)','0'],['knapsack([10], [1], 3)','10']],
hints:['For each item: skip it, or take it and add its value to the best answer for capacity − weight.','A 2D table dp[i][c] works. A 1D table works too if capacity goes downwards.'],approach:'Classic 0/1 knapsack DP over capacities.',cx:'O(n · capacity) time, O(capacity) space',
dry:`values [1, 4, 5, 7], weights [1, 3, 4, 5], capacity 7
best: weights 3 + 4 = 7, values 4 + 5 = 9`,
mistakes:['Looping capacity upwards with a 1D table (items get reused).','Using greedy by value/weight ratio, which is wrong for 0/1.'],
followup:'Return which items to take. (Keep the 2D table, then walk back.)'},

{id:'dp-partition',type:'code',d:2,p:'dp',title:'Partition Equal Subset Sum',prompt:'<p>Return <code>True</code> if the list can be split into two groups with equal sums.</p>',prereq:['dp-knapsack'],
constraints:['1 ≤ len(nums) ≤ 200','1 ≤ nums[i] ≤ 100'],
starter:`def can_partition(nums):
    # your code here
    pass`,solution:`def can_partition(nums):
    total = sum(nums)
    if total % 2:
        return False
    target = total // 2
    reachable = [True] + [False] * target   # reachable[s]: some subset sums to s
    for x in nums:
        for s in range(target, x - 1, -1):
            if reachable[s - x]:
                reachable[s] = True
    return reachable[target]`,
tests:[['can_partition([1, 5, 11, 5])','True'],['can_partition([1, 2, 3, 5])','False'],['can_partition([1, 1])','True'],['can_partition([1])','False'],['can_partition([2, 2, 3, 5])','False'],['can_partition([1, 2, 5])','False']],
hints:['If the total is odd, the answer is no. Otherwise: is there a subset summing to total / 2?','That is a 0/1 knapsack with booleans: reachable sums.'],approach:'Subset-sum DP over sums 0..total/2, iterating sums downwards.',cx:'O(n · total) time, O(total) space',
mistakes:['Forgetting the odd-total shortcut.','Iterating sums upwards, which lets one number be used twice.'],
followup:'Use a Python int as a bitset: reach |= reach << x. Why does that work?'},

{id:'dp-target-sum',type:'code',d:2,p:'dp',title:'Target Sum',prompt:'<p>Put a + or − in front of every number. Return how many ways the expression can equal <code>target</code>.</p>',prereq:['dp-partition'],
constraints:['1 ≤ len(nums) ≤ 20','0 ≤ nums[i] ≤ 1000, sum(nums) ≤ 1000','−1000 ≤ target ≤ 1000'],
starter:`def find_target_sum_ways(nums, target):
    # your code here
    pass`,solution:`def find_target_sum_ways(nums, target):
    ways = {0: 1}                      # running sum -> number of ways to reach it
    for x in nums:
        nxt = {}
        for s, count in ways.items():
            nxt[s + x] = nxt.get(s + x, 0) + count
            nxt[s - x] = nxt.get(s - x, 0) + count
        ways = nxt
    return ways.get(target, 0)`,
tests:[['find_target_sum_ways([1, 1, 1, 1, 1], 3)','5'],['find_target_sum_ways([1], 1)','1'],['find_target_sum_ways([1], 2)','0'],['find_target_sum_ways([1, 0], 1)','2'],['find_target_sum_ways([2, 3], 1)','1'],['find_target_sum_ways([0, 0, 0], 0)','8']],
hints:['Brute force tries 2ⁿ sign choices. Many lead to the same running sum.','Keep a dict: running sum → number of ways, and update it for each number.'],approach:'DP over the set of reachable running sums (counting).',cx:'O(n · S) time and space where S = sum(nums)',
mistakes:['Forgetting that 0 can take both signs (two ways).','Using a list indexed by sum without an offset for negative sums.'],
followup:'Turn it into subset sum: the positive part P satisfies P = (sum + target) / 2.'},

{id:'dp-lis',type:'code',d:2,p:'dp',title:'Longest Increasing Subsequence',prompt:'<p>Return the length of the longest strictly increasing subsequence.</p>',
constraints:['0 ≤ len(nums) ≤ 2500','−10<sup>4</sup> ≤ nums[i] ≤ 10<sup>4</sup>'],
starter:`def lis(nums):
    # your code here
    pass`,solution:`def lis(nums):
    best = [1] * len(nums)             # best[i] = LIS ending at index i
    for i in range(len(nums)):
        for j in range(i):
            if nums[j] < nums[i]:
                best[i] = max(best[i], best[j] + 1)
    return max(best, default=0)`,
tests:[['lis([10, 9, 2, 5, 3, 7, 101, 18])','4'],['lis([0, 1, 0, 3, 2, 3])','4'],['lis([7, 7, 7])','1'],['lis([])','0'],['lis([5])','1'],['lis([1, 2, 3, 4])','4']],
hints:['Let best[i] be the longest increasing subsequence that ends exactly at index i.','best[i] = 1 + max(best[j]) over j < i with nums[j] < nums[i].'],approach:'O(n²) DP over end positions; the answer is the max over all ends.',cx:'O(n²) time, O(n) space',
mistakes:['Returning best[-1]: the longest subsequence may end anywhere.','Using <= and counting equal values (the sequence must be strictly increasing).'],
followup:'Solve it in O(n log n) (dp-lis-fast).'},

{id:'dp-lis-fast',type:'code',d:3,p:'binary-search',title:'LIS in O(n log n)',prompt:'<p>Return the length of the longest strictly increasing subsequence, for lists of up to 100,000 numbers.</p>',prereq:['dp-lis','bs-insert'],
constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>'],
starter:`def lis_fast(nums):
    # your code here
    pass`,solution:`from bisect import bisect_left


def lis_fast(nums):
    tails = []                 # tails[k] = smallest tail of an increasing run of length k + 1
    for x in nums:
        i = bisect_left(tails, x)
        if i == len(tails):
            tails.append(x)    # x extends the longest run
        else:
            tails[i] = x       # x is a smaller tail for runs of length i + 1
    return len(tails)`,
tests:[['lis_fast([10, 9, 2, 5, 3, 7, 101, 18])','4'],['lis_fast([3, 10, 2, 1, 20])','3'],['lis_fast([3, 2])','1'],['lis_fast([])','0'],['lis_fast([50, 3, 10, 7, 40, 80])','4'],['lis_fast(list(range(100000)))','100000'],['lis_fast([2, 2, 2])','1']],
hints:['Keep, for each length, the smallest possible last element of an increasing run of that length.','That list is sorted, so find where x goes with bisect_left.'],approach:'Patience sorting: maintain the sorted tails list with binary search.',cx:'O(n log n) time, O(n) space',
mistakes:['bisect_right, which allows equal values (non-strict increase).','Thinking tails is itself an increasing subsequence of the input (it is not).'],
followup:'Recover an actual longest subsequence, not only its length.'},

{id:'dp-max-square',type:'code',d:2,p:'dp',title:'Largest Square of Ones',prompt:'<p>Return the area of the largest square containing only 1s in a grid of 0s and 1s.</p>',
constraints:['1 ≤ rows, cols ≤ 300'],
starter:`def max_square(grid):
    # your code here
    pass`,solution:`def max_square(grid):
    rows, cols = len(grid), len(grid[0])
    side = [[0] * (cols + 1) for _ in range(rows + 1)]   # side of the best square ending at (r, c)
    best = 0
    for r in range(1, rows + 1):
        for c in range(1, cols + 1):
            if grid[r - 1][c - 1] == 1:
                side[r][c] = 1 + min(side[r - 1][c], side[r][c - 1], side[r - 1][c - 1])
                best = max(best, side[r][c])
    return best * best`,
tests:[['max_square([[1, 0, 1, 0, 0], [1, 0, 1, 1, 1], [1, 1, 1, 1, 1], [1, 0, 0, 1, 0]])','4'],['max_square([[0, 1], [1, 0]])','1'],['max_square([[0]])','0'],['max_square([[1, 1], [1, 1]])','4'],['max_square([[1, 1, 1], [1, 1, 1], [1, 1, 1]])','9']],
hints:['Let side[r][c] be the side of the largest all-ones square whose bottom-right corner is (r, c).','It is 1 + the minimum of the squares ending above, to the left and diagonally above-left.'],approach:'2D DP on bottom-right corners; return the best side squared.',cx:'O(rows · cols) time and space',
mistakes:['Returning the side instead of the area.','Taking the max of the three neighbours instead of the min.'],
followup:'Count all squares of ones (of every size) in the grid.'},

{id:'dp-word-break',type:'code',d:2,p:'dp',title:'Word Break',prompt:'<p>Return <code>True</code> if <code>s</code> can be split into a sequence of words from <code>words</code> (words may be reused).</p>',
constraints:['0 ≤ len(s) ≤ 300','1 ≤ len(words) ≤ 1000, each word 1–20 letters'],
starter:`def word_break(s, words):
    # your code here
    pass`,solution:`def word_break(s, words):
    vocab = set(words)
    longest = max(map(len, vocab), default=0)
    ok = [True] + [False] * len(s)         # ok[i]: s[:i] can be split
    for i in range(1, len(s) + 1):
        for j in range(max(0, i - longest), i):
            if ok[j] and s[j:i] in vocab:
                ok[i] = True
                break
    return ok[len(s)]`,
tests:[['word_break("leetcode", ["leet", "code"])','True'],['word_break("applepenapple", ["apple", "pen"])','True'],['word_break("catsandog", ["cats", "dog", "sand", "and", "cat"])','False'],['word_break("", ["a"])','True'],['word_break("aaaaaaab", ["a", "aa", "aaa"])','False'],['word_break("cars", ["car", "ca", "rs"])','True']],
hints:['ok[i] means the first i characters can be split into words.','ok[i] is True if some j < i has ok[j] True and s[j:i] is a word.'],approach:'1D DP over prefix lengths with a set for O(1) word lookups.',cx:'O(n · L) slice checks where L is the longest word length',
mistakes:['A greedy "take the longest word first" (fails on "cars" with ca, rs, car).','Plain recursion without memoization: exponential on "aaaa…b".'],
followup:'Return all possible sentences (memoize lists of splits per start index).'},

{id:'dp-max-product',type:'code',d:2,p:'dp',title:'Maximum Product Subarray',prompt:'<p>Return the largest product of a non-empty contiguous subarray.</p>',prereq:['arr-max-subarray'],
constraints:['1 ≤ len(nums) ≤ 2 × 10<sup>4</sup>','−10 ≤ nums[i] ≤ 10'],
starter:`def max_product(nums):
    # your code here
    pass`,solution:`def max_product(nums):
    hi = lo = best = nums[0]          # largest and smallest product ending here
    for x in nums[1:]:
        candidates = (x, hi * x, lo * x)
        hi, lo = max(candidates), min(candidates)
        best = max(best, hi)
    return best`,
tests:[['max_product([2, 3, -2, 4])','6'],['max_product([-2, 0, -1])','0'],['max_product([-2, 3, -4])','24'],['max_product([-2])','-2'],['max_product([0, 2])','2'],['max_product([-1, -3, -10, 0, 60])','60']],
hints:['Like Kadane, but a negative number turns the smallest product into the largest.','Track both the max and the min product of a subarray ending at each index.'],approach:'DP with two states per index: max and min product ending here.',cx:'O(n) time, O(1) space',
mistakes:['Tracking only the maximum (fails on [-2, 3, -4]).','Updating hi before computing lo with the old hi.'],
followup:'Return the subarray itself, not just its product.'},

{id:'dp-lps',type:'code',d:3,p:'dp',title:'Longest Palindromic Subsequence',prompt:'<p>Return the length of the longest subsequence of <code>s</code> that reads the same forwards and backwards.</p>',prereq:['dp-lcs'],
constraints:['1 ≤ len(s) ≤ 1000'],
starter:`def longest_pal_subseq(s):
    # your code here
    pass`,solution:`def longest_pal_subseq(s):
    n = len(s)
    dp = [[0] * n for _ in range(n)]       # dp[i][j] = answer for s[i..j]
    for i in range(n - 1, -1, -1):         # shorter intervals first
        dp[i][i] = 1
        for j in range(i + 1, n):
            if s[i] == s[j]:
                dp[i][j] = dp[i + 1][j - 1] + 2
            else:
                dp[i][j] = max(dp[i + 1][j], dp[i][j - 1])
    return dp[0][n - 1]`,
tests:[['longest_pal_subseq("bbbab")','4'],['longest_pal_subseq("cbbd")','2'],['longest_pal_subseq("a")','1'],['longest_pal_subseq("abcde")','1'],['longest_pal_subseq("agbdba")','5'],['longest_pal_subseq("aa")','2']],
hints:['Interval DP: the state is a substring s[i..j].','If the ends match, they wrap the best answer for the inside; otherwise drop one end.'],approach:'Interval DP filled from short substrings to long ones (or: LCS of s and reversed s).',cx:'O(n²) time and space',
mistakes:['Filling i from 0 upwards, which reads dp[i + 1][…] before it is computed.','Confusing it with the longest palindromic substring (contiguous).'],
followup:'Show that the answer equals lcs(s, s[::-1]), and find the minimum insertions to make s a palindrome.'},
]);
