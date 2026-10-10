/* Topic 19 · Greedy Algorithms — question bank. Classic greedy problems already in topic 23 (jump game, gas station, ...) are reused by the lessons. */
COURSE.qs('greedy',[
/* ---------- predict the output ---------- */
{id:'gr-p1',type:'predict',d:1,p:'greedy',title:'Greedy coins can fail',code:`coins = [4, 3, 1]
amount, used = 6, []
for c in coins:
    while amount >= c:
        amount -= c
        used.append(c)
print(used, len(used))`,a:'[4, 1, 1] 3',hints:['Take as many 4s as fit, then 3s, then 1s.','After one 4, the remaining 2 is less than 3.'],why:'Greedy uses 3 coins, but 3 + 3 uses only 2. "Take the biggest coin" is only optimal for special coin systems such as 1, 5, 10, 25.'},
{id:'gr-p2',type:'predict',d:1,p:'intervals',title:'Sort by end time',code:`meetings = [[1, 9], [2, 3], [4, 6]]
print(sorted(meetings, key=lambda m: m[1]))`,a:'[[2, 3], [4, 6], [1, 9]]',why:'The key picks what to sort by: here the second item, the end time. Sorting by end is the first step of activity selection.'},
{id:'gr-p3',type:'predict',d:2,p:'sorting',title:'Two-part sort key',code:`words = ["bb", "a", "ccc", "dd"]
print(sorted(words, key=lambda w: (-len(w), w)))`,a:"['ccc', 'bb', 'dd', 'a']",hints:['Tuples compare item by item.','-len(w) puts longer words first; ties are broken alphabetically.'],why:'A tuple key sorts by the first part, then breaks ties with the second. Negating a number reverses its order.'},
{id:'gr-p4',type:'predict',d:2,p:'greedy',title:'Ordering by concatenation',code:`from functools import cmp_to_key

def cmp(a, b):
    return -1 if a + b > b + a else 1

print("".join(sorted(["3", "30", "34"], key=cmp_to_key(cmp))))`,a:'34330',hints:['Compare "3" + "30" = "330" with "30" + "3" = "303".','"34" + "3" = "343" beats "3" + "34" = "334".'],why:'Putting a before b is better exactly when a + b &gt; b + a as strings. Sorting with that rule builds the largest number.'},
{id:'gr-p5',type:'predict',d:2,p:'greedy',title:'How far can you reach?',code:`nums = [3, 2, 1, 0, 4]
reach = 0
for i, x in enumerate(nums):
    if i > reach:
        print("stuck at", i)
        break
    reach = max(reach, i + x)
else:
    print("made it")`,a:'stuck at 4',why:'Every path leads to index 3, whose jump length is 0. reach stays 3, so index 4 is never reachable.'},

/* ---------- concept ---------- */
{id:'gr-m1',type:'mcq',d:1,p:'greedy',title:'What makes greedy work?',q:'When is a greedy algorithm guaranteed to be optimal?',opts:['Whenever it runs fast','When a locally best choice can always be extended to a globally best solution (greedy-choice property) and the rest is the same kind of problem (optimal substructure)','When the input is sorted','Never: greedy is only a heuristic'],a:1,why:'You need both properties, and you should be able to argue why. Without a proof, test against a brute force.'},
{id:'gr-m2',type:'mcq',d:2,p:'intervals',title:'Why sort by end time?',q:'To fit the most non-overlapping meetings in one room, why pick the meeting that ends earliest?',opts:['It is the shortest meeting','It leaves the most time for everything after it, so it can replace the first meeting of any optimal plan','It starts earliest','Sorting by end is faster than sorting by start'],a:1,why:'Exchange argument: take any optimal plan and swap its first meeting for the earliest-ending one. Nothing conflicts, and the count stays the same.'},
{id:'gr-m3',type:'mcq',d:2,p:'greedy',title:'Exchange argument',q:'What does an exchange argument show?',opts:['That swapping two variables is O(1)','That any optimal solution can be changed, step by step, into the greedy one without getting worse','That greedy is faster than DP','That the input can be sorted'],a:1,why:'If you can always swap in the greedy choice without losing anything, greedy is optimal.'},
{id:'gr-m4',type:'mcq',d:1,p:'greedy',title:'Greedy or DP?',q:'A greedy idea fails on one small example you tried. What next?',opts:['Add special cases until it passes','Look for a dynamic programming solution: it considers every choice instead of committing to one','Give up','Sort the input differently until it works'],a:1,why:'One counterexample proves greedy wrong for the problem. DP explores all choices and keeps the best, at a higher cost.'},
{id:'gr-m5',type:'mcq',d:2,p:'intervals',title:'Merging vs selecting',q:'Merge overlapping intervals → sort by …; fit the most non-overlapping intervals → sort by …',opts:['start; end','end; start','start; start','end; end'],a:0,why:'Merging grows a block from the left, so process by start. Selecting wants to finish early, so process by end.'},
{id:'gr-m6',type:'mcq',d:1,p:'greedy',title:'Fractional vs 0/1 knapsack',q:'Greedy by value per kilo is optimal for which knapsack?',opts:['0/1 knapsack (take an item or leave it)','Fractional knapsack (you may take part of an item)','Both','Neither'],a:1,why:'With fractions you can always fill the bag with the best-ratio stuff. With whole items a high-ratio item can waste space, so 0/1 knapsack needs DP.'},

/* ---------- complexity ---------- */
{id:'gr-c1',type:'complexity',d:1,p:'greedy',title:'Sort, then one pass',code:`items.sort(key=lambda x: x[1])
for start, end in items:
    ...  # O(1) work`,a:'O(n log n)',why:'The sort dominates: O(n log n) + O(n) = O(n log n). Most greedy algorithms cost exactly this.'},
{id:'gr-c2',type:'complexity',d:1,p:'greedy',title:'Reach in one pass',code:`reach = 0
for i, x in enumerate(nums):
    if i > reach:
        break
    reach = max(reach, i + x)`,a:'O(n)',why:'A single scan with O(1) work per element.'},
{id:'gr-c3',type:'complexity',d:2,p:'greedy',title:'Latest free slot',code:`jobs.sort(key=lambda j: -j[1])
for deadline, profit in jobs:
    for t in range(deadline, 0, -1):
        if not used[t]:
            used[t] = True
            break`,a:'O(n²)',why:'For each of n jobs, the inner loop may scan up to n slots (deadlines larger than n are useless). A union-find of free slots makes it nearly O(n log n).'},

/* ---------- choose ---------- */
{id:'gr-ch1',type:'choose',d:1,p:'greedy',title:'US coins',q:'Fewest coins for an amount, with coins 1, 5, 10 and 25.',opts:['Greedy: largest coin first','Dynamic programming is required','Binary search','Backtracking only'],a:0,why:'For this "canonical" coin system greedy is provably optimal, and it is O(amount / smallest) or better.'},
{id:'gr-ch2',type:'choose',d:2,p:'dp',title:'Any coins',q:'Fewest coins for an amount, with an arbitrary list of coin values.',opts:['Greedy: largest coin first','Dynamic programming over amounts 0..target','Sort and two pointers','A heap'],a:1,why:'Coins like [1, 3, 4] break greedy (amount 6). DP computes the best answer for every smaller amount (topic 20).'},
{id:'gr-ch3',type:'choose',d:1,p:'intervals',title:'One meeting room',q:'Choose the largest number of talks that can happen in one hall without overlapping.',opts:['Sort by end time, then take every talk that starts after the last chosen one ends','Sort by length','Sort by start time and take all','Try all subsets'],a:0,why:'That is activity selection: O(n log n) and provably optimal.'},

/* ---------- dry run ---------- */
{id:'gr-dr1',type:'dryrun',d:1,p:'intervals',title:'Activity selection',code:`talks = [[1, 3], [2, 4], [3, 5], [5, 7]]
count, last_end = 0, 0
for start, end in talks:
    if start >= last_end:
        count += 1
        last_end = end`,cols:['start','end','count','last_end'],given:[0,1],rows:[['1','3','1','3'],['2','4','1','3'],['3','5','2','5'],['5','7','3','7']],setup:'The talks are already sorted by end time.',why:'[2, 4] starts before 3, so it is skipped. [3, 5] may start exactly when [1, 3] ends.'},
{id:'gr-dr2',type:'dryrun',d:1,p:'greedy',title:'Furthest reach',code:`nums = [2, 3, 1, 1, 4]
reach = 0
for i, x in enumerate(nums):
    reach = max(reach, i + x)`,cols:['i','reach'],given:[0],rows:[['0','2'],['1','4'],['2','4'],['3','4'],['4','8']],why:'From index 1 you can already reach index 4, the last one, so the answer to "can I reach the end?" is yes.'},

/* ---------- complete the code ---------- */
{id:'gr-b1',type:'blanks',d:1,p:'intervals',title:'Complete activity selection',code:`def max_activities(intervals):
    intervals.sort(key=lambda x: ______)
    count, last_end = 0, float("-inf")
    for start, end in intervals:
        if ______:
            count += 1
            last_end = end
    return count`,blanks:[['x[1]'],['start >= last_end','last_end <= start']],tests:[['max_activities([[1, 3], [2, 4], [3, 5]])','2'],['max_activities([[1, 10], [2, 3], [4, 5]])','2'],['max_activities([])','0']],why:'Sort by end, then keep every interval that starts no earlier than the last chosen end.'},
{id:'gr-b2',type:'blanks',d:2,p:'greedy',title:'Complete two-city scheduling',code:`def two_city(costs):
    costs.sort(key=lambda c: ______)
    n = len(costs) // 2
    return sum(c[0] for c in costs[:n]) + sum(c[1] for c in ______)`,blanks:[['c[0] - c[1]','c[0]-c[1]'],['costs[n:]']],tests:[['two_city([[10, 20], [30, 200], [400, 50], [30, 20]])','110'],['two_city([[5, 1], [1, 5]])','2']],why:'People with the most negative (A − B) save the most by going to A, so the first half goes to A.'},

/* ---------- debug ---------- */
{id:'gr-d1',type:'debug',d:1,p:'intervals',title:'Sorted by the wrong end',code:`def max_activities(intervals):
    intervals.sort(key=lambda x: x[0])
    count, last_end = 0, float("-inf")
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count`,opts:['last_end should start at 0','It sorts by start time; one long early interval blocks everything. Sort by end time.','start >= last_end should be start > last_end','count should start at 1'],a:1,why:'With [[1, 10], [2, 3], [4, 5]] it picks [1, 10] and stops at 1. Sorting by end picks [2, 3] and [4, 5].',fix:`def max_activities(intervals):
    intervals.sort(key=lambda x: x[1])
    count, last_end = 0, float("-inf")
    for start, end in intervals:
        if start >= last_end:
            count += 1
            last_end = end
    return count`,tests:[['max_activities([[1, 10], [2, 3], [4, 5]])','2'],['max_activities([[1, 2], [3, 4]])','2'],['max_activities([])','0']]},
{id:'gr-d2',type:'debug',d:2,p:'two-pointers',title:'The last passenger is left behind',code:`def num_boats(people, limit):
    people.sort()
    i, j = 0, len(people) - 1
    boats = 0
    while i < j:
        if people[i] + people[j] <= limit:
            i += 1
        j -= 1
        boats += 1
    return boats`,opts:['Sorting is not needed','When i == j one person is still waiting, but the loop has stopped: use while i <= j','j should move only when the pair fits','boats should start at 1'],a:1,why:'With weights [1, 2, 2, 3] and limit 3 the pointers meet on one person who never gets a boat.',fix:`def num_boats(people, limit):
    people.sort()
    i, j = 0, len(people) - 1
    boats = 0
    while i <= j:
        if people[i] + people[j] <= limit:
            i += 1
        j -= 1
        boats += 1
    return boats`,tests:[['num_boats([3, 2, 2, 1], 3)','3'],['num_boats([5], 5)','1'],['num_boats([1, 2], 3)','1']]},
{id:'gr-d3',type:'debug',d:2,p:'greedy',title:'Spending the wrong change',code:`def lemonade_change(bills):
    fives = tens = 0
    for b in bills:
        if b == 5:
            fives += 1
        elif b == 10:
            if fives == 0:
                return False
            fives -= 1
            tens += 1
        else:
            if fives >= 3:
                fives -= 3
            elif tens and fives:
                tens -= 1
                fives -= 1
            else:
                return False
    return True`,opts:['A $10 bill should be refused','For $20 it spends three $5 bills before trying $10 + $5. Fives are more useful (they are needed for $10 bills), so give $10 + $5 first.','fives should start at 1','The loop should go backwards'],a:1,why:'Greedy choice: keep the most flexible coin. With [5, 5, 5, 5, 10, 20, 10] the buggy version has no $5 left for the last customer.',fix:`def lemonade_change(bills):
    fives = tens = 0
    for b in bills:
        if b == 5:
            fives += 1
        elif b == 10:
            if fives == 0:
                return False
            fives -= 1
            tens += 1
        else:
            if tens and fives:
                tens -= 1
                fives -= 1
            elif fives >= 3:
                fives -= 3
            else:
                return False
    return True`,tests:[['lemonade_change([5, 5, 5, 5, 10, 20, 10])','True'],['lemonade_change([5, 5, 10, 10, 20])','False'],['lemonade_change([5, 5, 5, 10, 20])','True']]},

/* ---------- coding (schema v2) ---------- */
{id:'gr-activity',type:'code',d:1,p:'intervals',title:'Activity Selection',prompt:'<p>Each activity is <code>[start, end]</code>. Two activities are compatible if one starts at or after the other ends. Return the largest number of compatible activities.</p>',
constraints:['0 ≤ len(intervals) ≤ 10<sup>5</sup>','0 ≤ start &lt; end ≤ 10<sup>9</sup>'],
starter:`def max_activities(intervals):
    # your code here
    pass`,solution:`def max_activities(intervals):
    count, last_end = 0, float("-inf")
    for start, end in sorted(intervals, key=lambda x: x[1]):   # earliest end first
        if start >= last_end:
            count += 1
            last_end = end
    return count`,
tests:[['max_activities([[1, 3], [2, 4], [3, 5], [0, 6], [5, 7], [8, 9], [5, 9]])','4'],['max_activities([[1, 10], [2, 3], [4, 5]])','2'],['max_activities([])','0'],['max_activities([[1, 2], [1, 2], [1, 2]])','1'],['max_activities([[5, 6], [1, 2], [3, 4]])','3'],['max_activities([[1, 2]])','1']],
hints:['Which activity should you do first to leave the most room for the rest?','Sort by end time; keep an activity if it starts at or after the last kept end.'],approach:'Sort by end time and greedily take every compatible activity.',cx:'O(n log n) time, O(n) space for the sorted copy',
dry:`sorted by end: [1,3] [2,4] [3,5] [0,6] [5,7] [8,9] [5,9]
take [1,3] (last_end 3), skip [2,4], take [3,5] (5), skip [0,6],
take [5,7] (7), take [8,9] (9), skip [5,9] → 4`,
mistakes:['Sorting by start time or by length.','Using start > last_end, which rejects back-to-back activities.'],
followup:'Return the chosen activities themselves, not just how many.'},

{id:'gr-make-change',type:'code',d:1,p:'greedy',title:'Make Change (canonical coins)',prompt:'<p>The coin system is canonical (like 1, 5, 10, 25), so taking the largest coin that fits is optimal. Return the coins used, largest first. The coins may be given in any order and always include 1.</p>',
constraints:['0 ≤ amount ≤ 10<sup>4</sup>','1 ≤ len(coins) ≤ 10, 1 is always present'],
starter:`def make_change(amount, coins):
    # your code here
    pass`,solution:`def make_change(amount, coins):
    used = []
    for c in sorted(coins, reverse=True):
        while amount >= c:
            amount -= c
            used.append(c)
    return used`,
tests:[['make_change(63, [1, 5, 10, 25])','[25, 25, 10, 1, 1, 1]'],['make_change(0, [1, 5])','[]'],['make_change(30, [1, 5, 10, 25])','[25, 5]'],['make_change(11, [5, 1, 10])','[10, 1]'],['make_change(99, [1, 5, 10, 25, 50, 100])','[50, 25, 10, 10, 1, 1, 1, 1]']],
hints:['Sort the coins from largest to smallest first.','Take each coin as many times as it fits.'],approach:'Largest coin first, as many times as it fits. Only correct because the coin system is canonical.',cx:'O(k log k + number of coins used) time',
mistakes:['Forgetting to sort coins that arrive in a random order.','Believing this works for any coins: [1, 3, 4] with amount 6 breaks it.'],
followup:'Write a brute force that finds the true minimum for small amounts and use it to find the smallest amount where greedy fails for coins [1, 3, 4].'},

{id:'gr-min-arrows',type:'code',d:2,p:'intervals',title:'Minimum Arrows to Burst Balloons',prompt:'<p>Each balloon covers <code>[start, end]</code> on the x-axis. An arrow shot at x bursts every balloon with start ≤ x ≤ end. Return the fewest arrows that burst all balloons.</p>',prereq:['gr-activity'],
constraints:['0 ≤ len(points) ≤ 10<sup>5</sup>','−2<sup>31</sup> ≤ start ≤ end &lt; 2<sup>31</sup>'],
starter:`def min_arrows(points):
    # your code here
    pass`,solution:`def min_arrows(points):
    arrows, last = 0, float("-inf")
    for start, end in sorted(points, key=lambda p: p[1]):
        if start > last:        # not burst by the last arrow
            arrows += 1
            last = end          # shoot as far right as possible
    return arrows`,
tests:[['min_arrows([[10, 16], [2, 8], [1, 6], [7, 12]])','2'],['min_arrows([[1, 2], [3, 4], [5, 6], [7, 8]])','4'],['min_arrows([[1, 2], [2, 3], [3, 4], [4, 5]])','2'],['min_arrows([])','0'],['min_arrows([[1, 10]])','1'],['min_arrows([[-5, -1], [-3, 2], [0, 0]])','2']],
hints:['Shoot the first arrow at the end of the balloon that ends first.','Sort by end. A balloon needs a new arrow only if it starts after the last arrow’s position.'],approach:'Like activity selection: sort by end, place an arrow at each group’s first end.',cx:'O(n log n) time',
mistakes:['Using >= instead of >: touching balloons share an arrow.','Sorting by start without tracking the minimum end.'],
followup:'How is this related to "minimum number of intervals to remove so the rest do not overlap"?'},

{id:'gr-boats',type:'code',d:2,p:'two-pointers',title:'Boats to Save People',prompt:'<p>Each boat carries at most two people with total weight ≤ <code>limit</code>. Every person weighs at most <code>limit</code>. Return the fewest boats.</p>',
constraints:['1 ≤ len(people) ≤ 5 × 10<sup>4</sup>','1 ≤ weight ≤ limit ≤ 3 × 10<sup>4</sup>'],
starter:`def num_boats(people, limit):
    # your code here
    pass`,solution:`def num_boats(people, limit):
    people = sorted(people)
    i, j = 0, len(people) - 1
    boats = 0
    while i <= j:
        if people[i] + people[j] <= limit:   # lightest rides with the heaviest
            i += 1
        j -= 1                               # the heaviest always leaves
        boats += 1
    return boats`,
tests:[['num_boats([1, 2], 3)','1'],['num_boats([3, 2, 2, 1], 3)','3'],['num_boats([3, 5, 3, 4], 5)','4'],['num_boats([5], 5)','1'],['num_boats([1, 1, 1, 1], 2)','2'],['num_boats([2, 4], 5)','2']],
hints:['The heaviest person must go in some boat. Who is the best partner for them?','Sort, then pair the lightest with the heaviest when they fit.'],approach:'Sort and use two pointers: the heaviest person leaves every round, taking the lightest along if possible.',cx:'O(n log n) time, O(n) space for the sorted copy',
mistakes:['while i < j, which forgets the last single person.','Trying to pair the two heaviest people.'],
followup:'What changes if a boat can carry any number of people up to the weight limit? (Hint: it becomes bin packing, which is NP-hard.)'},

{id:'gr-platforms',type:'code',d:2,p:'greedy',title:'Minimum Train Platforms',prompt:'<p>Train k arrives at <code>arr[k]</code> and departs at <code>dep[k]</code>, occupying a platform for the whole closed interval. A train arriving at the same time another departs needs a different platform. Return the fewest platforms needed.</p>',
constraints:['0 ≤ n ≤ 10<sup>5</sup>','0 ≤ arr[k] ≤ dep[k] ≤ 2359'],
starter:`def min_platforms(arr, dep):
    # your code here
    pass`,solution:`def min_platforms(arr, dep):
    arr, dep = sorted(arr), sorted(dep)
    i = j = 0
    current = best = 0
    while i < len(arr):
        if arr[i] <= dep[j]:      # a train arrives before the earliest departure
            current += 1
            best = max(best, current)
            i += 1
        else:                      # a train leaves first
            current -= 1
            j += 1
    return best`,
tests:[['min_platforms([900, 940, 950, 1100, 1500, 1800], [910, 1200, 1120, 1130, 1900, 2000])','3'],['min_platforms([100], [200])','1'],['min_platforms([100, 200], [150, 250])','1'],['min_platforms([100, 150], [200, 250])','2'],['min_platforms([100, 200], [200, 300])','2'],['min_platforms([], [])','0']],
hints:['Only the order of events matters: arrivals and departures.','Sort both lists and sweep through time, counting trains present.'],approach:'Sweep line over sorted arrivals and departures, tracking the number of trains present.',cx:'O(n log n) time, O(n) space',
mistakes:['Using < instead of <= and sharing a platform at the exact same minute.','Sorting the (arr, dep) pairs together and comparing neighbours only.'],
followup:'Solve it with a min-heap of departure times (see Meeting Rooms II, hp-meeting-rooms).'},

{id:'gr-fractional',type:'code',d:2,p:'greedy',title:'Fractional Knapsack',prompt:'<p>Items are <code>(value, weight)</code>. You may take any fraction of an item. Return the largest total value that fits in <code>capacity</code>, as a float.</p>',
constraints:['0 ≤ len(items) ≤ 10<sup>5</sup>','1 ≤ weight, value ≤ 10<sup>4</sup>; 0 ≤ capacity ≤ 10<sup>9</sup>'],
starter:`def fractional_knapsack(items, capacity):
    # your code here
    pass`,solution:`def fractional_knapsack(items, capacity):
    total = 0.0
    for value, weight in sorted(items, key=lambda it: it[0] / it[1], reverse=True):
        if capacity == 0:
            break
        take = min(weight, capacity)          # all of it, or what still fits
        total += value * take / weight
        capacity -= take
    return total`,
tests:[['fractional_knapsack([(60, 10), (100, 20), (120, 30)], 50)','240.0','float'],['fractional_knapsack([(10, 5)], 0)','0.0','float'],['fractional_knapsack([(10, 5)], 10)','10.0','float'],['fractional_knapsack([(500, 30)], 10)','500 / 3','float'],['fractional_knapsack([(20, 4), (30, 6), (10, 1)], 5)','30.0','float'],['fractional_knapsack([], 7)','0.0','float']],
hints:['Which item gives the most value per unit of weight?','Take best-ratio items whole while they fit, then a fraction of the next one.'],approach:'Sort by value / weight descending and fill the bag greedily.',cx:'O(n log n) time',
mistakes:['Sorting by value or by weight instead of by ratio.','Using integer division and losing the fractional part.'],
followup:'Show with a small example why this greedy is wrong for 0/1 knapsack, then solve 0/1 knapsack with DP (topic 20).'},

{id:'gr-largest-number',type:'code',d:2,p:'sorting',title:'Largest Number',prompt:'<p>Arrange the non-negative integers so that, concatenated, they form the largest number. Return it as a string without leading zeros.</p>',
constraints:['1 ≤ len(nums) ≤ 100','0 ≤ nums[i] ≤ 10<sup>9</sup>'],
starter:`def largest_number(nums):
    # your code here
    pass`,solution:`from functools import cmp_to_key


def largest_number(nums):
    def compare(a, b):
        if a + b > b + a:
            return -1      # a goes first
        if a + b < b + a:
            return 1
        return 0

    parts = sorted(map(str, nums), key=cmp_to_key(compare))
    result = "".join(parts)
    return "0" if result[0] == "0" else result`,
tests:[['largest_number([10, 2])','"210"'],['largest_number([3, 30, 34, 5, 9])','"9534330"'],['largest_number([0, 0])','"0"'],['largest_number([1])','"1"'],['largest_number([432, 43243])','"43243432"'],['largest_number([0, 1, 0])','"100"']],
hints:['Sorting numerically or as plain strings both fail (try 3 and 30).','Put a before b when str(a) + str(b) > str(b) + str(a).'],approach:'Sort the strings with a comparator on a + b versus b + a, then join; handle all zeros.',cx:'O(n log n · L) time where L is the number of digits',
mistakes:['Returning "00" for [0, 0].','Sorting strings in reverse order: "30" would come before "3".'],
followup:'Prove the comparator is transitive (so sorting with it is valid).'},

{id:'gr-lemonade',type:'code',d:1,p:'greedy',title:'Lemonade Change',prompt:'<p>Lemonade costs $5. Customers pay with $5, $10 or $20 bills, in order, and you start with no change. Return <code>True</code> if you can give everyone correct change.</p>',
constraints:['1 ≤ len(bills) ≤ 10<sup>5</sup>','Every bill is 5, 10 or 20'],
starter:`def lemonade_change(bills):
    # your code here
    pass`,solution:`def lemonade_change(bills):
    fives = tens = 0
    for b in bills:
        if b == 5:
            fives += 1
        elif b == 10:
            if fives == 0:
                return False
            fives -= 1
            tens += 1
        elif tens and fives:       # $15 change: prefer $10 + $5, keep the flexible fives
            tens -= 1
            fives -= 1
        elif fives >= 3:
            fives -= 3
        else:
            return False
    return True`,
tests:[['lemonade_change([5, 5, 5, 10, 20])','True'],['lemonade_change([5, 5, 10, 10, 20])','False'],['lemonade_change([10])','False'],['lemonade_change([5, 5, 10])','True'],['lemonade_change([5, 5, 5, 5, 20, 20])','False'],['lemonade_change([5, 5, 5, 5, 10, 20, 10])','True']],
hints:['You only need to count $5 and $10 bills ($20 bills are never given as change).','For $20, which change should you give first: $10 + $5, or three $5s?'],approach:'Count bills; for $20 give $10 + $5 when possible because $5 bills are more useful later.',cx:'O(n) time, O(1) space',
mistakes:['Spending three $5 bills when a $10 + $5 is available.','Counting $20 bills as change.'],
followup:'What if lemonade costs $10 and customers can pay with $10, $20 or $50?'},

{id:'gr-candy',type:'code',d:3,p:'greedy',title:'Candy',prompt:'<p>Children stand in a line with ratings. Each child gets at least one candy, and a child with a higher rating than a neighbour must get more candies than that neighbour. Return the fewest candies needed.</p>',
constraints:['1 ≤ len(ratings) ≤ 2 × 10<sup>4</sup>','0 ≤ ratings[i] ≤ 2 × 10<sup>4</sup>'],
starter:`def candy(ratings):
    # your code here
    pass`,solution:`def candy(ratings):
    n = len(ratings)
    give = [1] * n
    for i in range(1, n):                  # left neighbour rule
        if ratings[i] > ratings[i - 1]:
            give[i] = give[i - 1] + 1
    for i in range(n - 2, -1, -1):         # right neighbour rule, keep the left result
        if ratings[i] > ratings[i + 1]:
            give[i] = max(give[i], give[i + 1] + 1)
    return sum(give)`,
tests:[['candy([1, 0, 2])','5'],['candy([1, 2, 2])','4'],['candy([1])','1'],['candy([1, 3, 4, 5, 2])','11'],['candy([5, 4, 3, 2, 1])','15'],['candy([1, 2, 87, 87, 87, 2, 1])','13']],
hints:['Handle one neighbour at a time: first everyone versus their left neighbour.','Then a right-to-left pass for the right neighbour, taking the max so the first rule still holds.'],approach:'Two greedy passes: left-to-right for left neighbours, right-to-left for right neighbours, keeping the maximum.',cx:'O(n) time, O(n) space',
dry:`ratings     1  3  4  5  2
left pass   1  2  3  4  1
right pass  1  2  3  4  1   (only index 3 checks 5 > 2: max(4, 2) = 4)
sum = 11`,
mistakes:['A single pass, which cannot see a later lower neighbour.','Overwriting the left-pass value instead of taking the max.','Giving more candy for an equal rating (not required).'],
followup:'Solve it in O(1) extra space by counting the lengths of rising and falling runs.'},

{id:'gr-job-sequencing',type:'code',d:2,p:'greedy',title:'Job Sequencing with Deadlines',prompt:'<p>Each job <code>(deadline, profit)</code> takes one unit of time and must finish by its deadline (time slots are 1, 2, 3, …). Do at most one job per slot. Return the largest total profit.</p>',
constraints:['0 ≤ len(jobs) ≤ 2000','1 ≤ deadline ≤ 2000, 1 ≤ profit ≤ 10<sup>4</sup>'],
starter:`def max_profit(jobs):
    # your code here
    pass`,solution:`def max_profit(jobs):
    if not jobs:
        return 0
    last = min(len(jobs), max(d for d, _ in jobs))
    used = [False] * (last + 1)
    total = 0
    for deadline, profit in sorted(jobs, key=lambda j: -j[1]):   # most profitable first
        for t in range(min(deadline, last), 0, -1):             # latest free slot
            if not used[t]:
                used[t] = True
                total += profit
                break
    return total`,
tests:[['max_profit([(4, 20), (1, 10), (1, 40), (1, 30)])','60'],['max_profit([(2, 100), (1, 19), (2, 27), (1, 25), (3, 15)])','142'],['max_profit([])','0'],['max_profit([(1, 5)])','5'],['max_profit([(1, 5), (1, 6)])','6'],['max_profit([(3, 1), (3, 2), (3, 3), (3, 4)])','9']],
hints:['Consider the most profitable jobs first.','Put each job in the latest free slot not after its deadline, leaving earlier slots for jobs with tight deadlines.'],approach:'Sort by profit descending; place each job in the latest free slot ≤ its deadline.',cx:'O(n²) time in the worst case, O(n) space',
mistakes:['Putting a job in the earliest free slot, which blocks urgent jobs.','Sorting by deadline instead of profit.'],
followup:'Speed up "latest free slot" with a union-find over slots to get about O(n log n).'},

{id:'gr-two-city',type:'code',d:2,p:'greedy',title:'Two City Scheduling',prompt:'<p><code>costs[i] = [a, b]</code> is the cost of flying person i to city A or city B. Exactly half the people (the list length is even) must go to each city. Return the minimum total cost.</p>',
constraints:['2 ≤ len(costs) ≤ 100, even','1 ≤ a, b ≤ 1000'],
starter:`def two_city(costs):
    # your code here
    pass`,solution:`def two_city(costs):
    order = sorted(costs, key=lambda c: c[0] - c[1])   # biggest saving by choosing A first
    n = len(costs) // 2
    return sum(a for a, _ in order[:n]) + sum(b for _, b in order[n:])`,
tests:[['two_city([[10, 20], [30, 200], [400, 50], [30, 20]])','110'],['two_city([[259, 770], [448, 54], [926, 667], [184, 139], [840, 118], [577, 469]])','1859'],['two_city([[1, 2], [3, 4]])','5'],['two_city([[5, 1], [1, 5]])','2']],
hints:['Imagine everyone goes to B first. Sending person i to A instead changes the cost by a − b.','Send the n people with the smallest a − b to A.'],approach:'Sort by a − b and send the first half to A, the rest to B.',cx:'O(n log n) time',
mistakes:['Sending each person to their cheaper city, which ignores the half-and-half rule.','Sorting by a alone.'],
followup:'What if city A takes exactly k people instead of half?'},

{id:'gr-truck-units',type:'code',d:1,p:'greedy',title:'Maximum Units on a Truck',prompt:'<p><code>box_types[i] = [count, units_per_box]</code>. The truck holds at most <code>truck_size</code> boxes. Return the most units you can load.</p>',
constraints:['0 ≤ len(box_types) ≤ 1000','1 ≤ count, units ≤ 1000; 0 ≤ truck_size ≤ 10<sup>6</sup>'],
starter:`def max_units(box_types, truck_size):
    # your code here
    pass`,solution:`def max_units(box_types, truck_size):
    total = 0
    for count, units in sorted(box_types, key=lambda b: -b[1]):
        take = min(count, truck_size)
        total += take * units
        truck_size -= take
        if truck_size == 0:
            break
    return total`,
tests:[['max_units([[1, 3], [2, 2], [3, 1]], 4)','8'],['max_units([[5, 10], [2, 5], [4, 7], [3, 9]], 10)','91'],['max_units([], 5)','0'],['max_units([[2, 5]], 0)','0'],['max_units([[2, 5]], 10)','10']],
hints:['Every box takes one slot, so prefer boxes with more units.','Sort by units per box, descending, and fill up.'],approach:'Greedy by units per box: since all boxes have the same size, the best boxes first is optimal.',cx:'O(n log n) time',
mistakes:['Sorting by count instead of units per box.','Not stopping when the truck is full (taking negative amounts).'],
followup:'Why does the same greedy fail if boxes have different sizes?'},
]);
