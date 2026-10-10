/* Topic 20 · Dynamic Programming. */
COURSE.topic({id:'dp',
goal:'Spot overlapping subproblems, define a state, write the transition, and implement it top-down (memoization) or bottom-up (tabulation), then optimise the space.',
learn:[
{title:'From recursion to memoization',short:'Memoization',mins:12,lead:'Plain recursion often solves the same subproblem over and over. Cache each answer the first time, and an exponential algorithm becomes linear.',does:['visualize','predict','complete','code'],blocks:[
 {t:'viz',fn:'fibtree',title:'The repeated work',intro:'Look at how many times fib(2) appears in the call tree. Then turn on memoization.'},
 {t:'q',ids:['dp-p1','dp-p2','dp-c2','dp-c1','dp-m1']},
 {t:'code',title:'Two ways to memoize',code:`from functools import lru_cache

@lru_cache(maxsize=None)          # 1) let Python cache the results
def fib(n):
    return n if n < 2 else fib(n - 1) + fib(n - 2)

def fib2(n, memo={0: 0, 1: 1}):   # 2) a dict you manage yourself
    if n not in memo:
        memo[n] = fib2(n - 1) + fib2(n - 2)
    return memo[n]

print(fib(80), fib2(80))`,note:'A mutable default like <code>memo={}</code> is shared between calls. That is usually a bug (topic 1), but here it is a deliberate cache.'},
 {t:'q',ids:['dp-b1']},
 {t:'q',title:'Code it',ids:['dp-fib-memo']}]},

{title:'Tabulation: state, base case, transition',short:'Tabulation',mins:14,lead:'Bottom-up DP fills a table from the smallest subproblems upwards. Every DP solution is the same four decisions: what a cell means, the base cases, how a cell is computed from smaller ones, and the order to fill them.',does:['dry run','concept','debug','code'],blocks:[
 {t:'cards',title:'The DP recipe',items:[
  {tag:'1',title:'State',body:'Say exactly what <code>dp[i]</code> means, in words. "dp[i] = the most money from houses 0..i."'},
  {tag:'2',title:'Base cases',body:'The smallest states you can answer directly: dp[0], an empty prefix, the first row.'},
  {tag:'3',title:'Transition',body:'How dp[i] follows from smaller states. Think about the last decision: "rob house i or not".'},
  {tag:'4',title:'Order and answer',body:'Fill so that every dependency is ready first. Which cell holds the final answer?'}]},
 {t:'q',ids:['dp-m3','dp-m2','dp-m8','dp-ch1','dp-dr1']},
 {t:'q',ids:['dp-d4','dp-b3']},
 {t:'q',title:'Code it',ids:['dp-min-cost-stairs','dp-house-robber','dp-robber-circle','dp-decode-ways','dp-word-break']},
 {t:'teacher',items:['For every DP problem in class, make students write the four lines (state, base, transition, order) as comments BEFORE any code. Grade those lines, not just passing tests.']}]},

{title:'Coins and unbounded choices',short:'Coins',mins:14,lead:'Coin change is the classic case where greedy fails and DP succeeds. The table is indexed by amount, and each coin can be used any number of times.',does:['visualize','dry run','predict','debug','code'],blocks:[
 {t:'viz',fn:'dp-table',arg:{mode:'coins'},title:'Fewest coins for 1, 3, 4',intro:'Coins 1, 3, 4 and amount 6: greedy picks 4 + 1 + 1, the table finds 3 + 3.'},
 {t:'q',ids:['dp-dr2','dp-c3','dp-d1','dp-p3']},
 {t:'q',title:'Code it',ids:['dp-coin-change','dp-coin-ways']}]},

{title:'Grids',short:'Grids',mins:12,lead:'When you may only move right or down, each cell depends on the cell above and the cell to its left. The table is the grid itself.',does:['visualize','predict','complete','code'],blocks:[
 {t:'viz',fn:'dp-table',arg:{mode:'grid'},title:'Counting paths around walls'},
 {t:'q',ids:['dp-p5','dp-b2','dp-ch3']},
 {t:'q',title:'Code it',ids:['rec-count-paths','dp-grid-obstacles','dp-min-path-sum','dp-max-square']}]},

{title:'Two sequences',short:'Strings',mins:16,lead:'With two strings, the state is a pair of prefixes: dp[i][j] answers the question for a[:i] and b[:j]. Compare the last characters and look up, left or diagonally.',does:['visualize','concept','complexity','debug','code'],blocks:[
 {t:'viz',fn:'dp-table',arg:{mode:'lcs'},title:'Longest common subsequence'},
 {t:'q',ids:['dp-m5','dp-c4','dp-ch2','dp-d2']},
 {t:'q',title:'Code it',ids:['dp-lcs','dp-edit-distance','dp-lps']}]},

{title:'Knapsack and subsets',short:'Knapsack',mins:16,lead:'Each item is taken or left. The state is (items considered, capacity left). The same table answers "best value", "is this sum reachable?" and "how many ways?".',does:['visualize','concept','debug','code'],blocks:[
 {t:'viz',fn:'dp-table',arg:{mode:'knap'},title:'0/1 knapsack table'},
 {t:'q',ids:['dp-m4','dp-d3']},
 {t:'q',title:'Code it',ids:['dp-knapsack','dp-partition','dp-target-sum']}]},

{title:'LIS, state tricks and saving space',short:'LIS & space',mins:14,lead:'Sometimes one number per state is not enough (max product needs a max and a min), and sometimes the whole table is not needed (keep only the last row, or the last two values).',does:['dry run','predict','concept','code'],blocks:[
 {t:'q',ids:['dp-dr3','dp-p4','dp-m6','dp-m7']},
 {t:'q',title:'Code it',ids:['dp-lis','dp-lis-fast','dp-max-product']}]}],

challenge:[
 {t:'b2o',title:'Coin change: recursion → table',qid:'dp-coin-change',problem:'<p>Fewest coins that make the amount, or −1.</p>',
  brute:{code:`def coin_change(coins, amount):
    if amount == 0:
        return 0
    best = float("inf")
    for c in coins:
        if c <= amount:
            sub = coin_change(coins, amount - c)
            if sub != -1:
                best = min(best, sub + 1)
    return best if best != float("inf") else -1`,cx:'O(2ⁿ)',why:'Each call branches on every coin, and the same amounts are solved again and again: exponential in the amount.'},
  slow:{q:'How many different subproblems are there?',opts:['Only amount + 1 (one per value 0..amount), yet each is solved many times','Infinitely many','One per coin','2^amount'],a:0,why:'The only thing that changes between calls is the remaining amount.'},
  better:{q:'What turns this into an efficient algorithm?',opts:['Store the answer for each amount (memoization or a table)','Sort the coins','Use greedy','Use a heap'],a:0,why:'amount + 1 states × k coins per state.'},
  optimal:{code:`def coin_change(coins, amount):
    dp = [0] + [float("inf")] * amount
    for a in range(1, amount + 1):
        for c in coins:
            if c <= a:
                dp[a] = min(dp[a], dp[a - c] + 1)
    return dp[amount] if dp[amount] != float("inf") else -1`,cx:'O(n²)',cxOpts:['O(n)','O(n²)','O(2ⁿ)','O(n log n)'],why:'O(amount × k): quadratic-style "states × choices". (Pick O(n²) as the closest option.)'},
  takeaway:'<p>Count the distinct states. If there are few states but many calls, cache them: that is dynamic programming.</p>'}],

review:[
 {t:'flash',items:[['DP needs…','Overlapping subproblems + optimal substructure.'],['Four DP decisions?','State, base cases, transition, fill order (+ where the answer is).'],['Memoization vs tabulation?','Top-down + cache vs bottom-up loops. Same complexity.'],['Coin change min: init?','dp[0] = 0, everything else ∞.'],['0/1 knapsack 1D: loop capacity…','Downwards.'],['LCS cell?','Match: diagonal + 1; else max(up, left).'],['Space trick?','Keep only the rows/values you still need.'],['LIS fast?','Tails list + bisect_left: O(n log n).']]},
 {t:'quiz',topic:'dp',n:10,title:'Topic quiz'},
 {t:'task',title:'Homework',items:['For five DP problems, write the state, base cases and transition in one sentence each before coding.','Convert one memoized solution into a bottom-up table, then reduce it to O(1) or one-row space.']}]
});
