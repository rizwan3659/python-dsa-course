/* Topic 22 · Range Queries — question bank: prefix sums (recap), difference arrays, Fenwick trees, segment trees. */
COURSE.qs('rangeq',[
/* ---------- predict the output ---------- */
{id:'rq-p1',type:'predict',d:2,p:'prefix-sum',title:'Two range additions',code:`diff = [0] * 6
for l, r, v in [(1, 3, 5), (2, 4, 2)]:
    diff[l] += v
    diff[r + 1] -= v
out, run = [], 0
for d in diff[:5]:
    run += d
    out.append(run)
print(out)`,a:'[0, 5, 7, 7, 2]',hints:['diff becomes [0, 5, 2, 0, −5, −2].','A running sum of diff rebuilds the array.'],why:'Each range update touches only two cells of diff. One prefix-sum pass at the end applies all of them.'},
{id:'rq-p2',type:'predict',d:2,p:'range-query',title:'Lowest set bit',code:`print([i & -i for i in range(1, 9)])`,a:'[1, 2, 1, 4, 1, 2, 1, 8]',why:'i & −i is the lowest set bit of i. In a Fenwick tree it is the length of the range that tree[i] covers.'},
{id:'rq-p3',type:'predict',d:2,p:'range-query',title:'Fenwick query path',code:`i, path = 13, []
while i > 0:
    path.append(i)
    i -= i & -i
print(path)`,a:'[13, 12, 8]',hints:['13 = 0b1101.','Each step removes the lowest set bit.'],why:'tree[13] covers [13], tree[12] covers [9..12], tree[8] covers [1..8]. Three nodes add up to the prefix 1..13: O(log n).'},
{id:'rq-p4',type:'predict',d:2,p:'range-query',title:'Fenwick update path',code:`n, i, path = 16, 5, []
while i <= n:
    path.append(i)
    i += i & -i
print(path)`,a:'[5, 6, 8, 16]',why:'Adding the lowest set bit climbs to every node whose range contains position 5.'},

/* ---------- concept ---------- */
{id:'rq-m1',type:'mcq',d:1,p:'prefix-sum',title:'When prefix sums stop working',q:'Prefix sums answer range sums in O(1). What goes wrong when values change between queries?',opts:['Nothing','Changing one value changes every later prefix: O(n) per update','Queries become O(n²)','They use too much memory'],a:1,why:'With q updates and queries mixed, that is O(n · q). Fenwick and segment trees make both operations O(log n).'},
{id:'rq-m2',type:'mcq',d:1,p:'prefix-sum',title:'What a difference array is for',q:'When is a difference array the right tool?',opts:['Many range-add updates first, then reading the final array once','Range minimum queries','Sorting','Many updates and queries interleaved'],a:0,why:'Each range add is O(1) (two cells), and one prefix-sum pass recovers the array. Reading in between costs O(n) each time.'},
{id:'rq-m3',type:'mcq',d:2,p:'range-query',title:'Fenwick vs segment tree',q:'Why can a segment tree answer range-minimum queries with updates, while a plain Fenwick tree cannot?',opts:['Segment trees are newer','A Fenwick tree answers ranges as prefix(r) − prefix(l − 1), which needs an inverse operation; min has no inverse','Fenwick trees cannot be updated','Segment trees use less memory'],a:1,why:'You cannot "subtract" a minimum. A segment tree combines whole node ranges directly, so any associative operation (sum, min, max, gcd) works.'},
{id:'rq-m4',type:'mcq',d:2,p:'range-query',title:'Segment tree size',q:'An iterative segment tree for n values stores its nodes in a list of what size?',opts:['n','2n (leaves at n..2n − 1, parents below)','n²','log n'],a:1,why:'Node i has children 2i and 2i + 1. Recursive versions usually allocate 4n to be safe.'},
{id:'rq-m5',type:'mcq',d:1,p:'range-query',title:'Fenwick indexes start at 1',q:'Why do Fenwick trees use 1-based positions?',opts:['Tradition only','With i = 0, i & −i is 0, so the update and query loops would never move','Python lists start at 1','It saves memory'],a:1,why:'The loops step by i & −i. Shift every input index by one.'},

/* ---------- complexity ---------- */
{id:'rq-c1',type:'complexity',d:1,p:'range-query',title:'Fenwick prefix query',code:`total = 0
while i > 0:
    total += tree[i]
    i -= i & -i`,a:'O(log n)',why:'Each step clears a bit of i, and i has at most log₂ n + 1 bits.'},
{id:'rq-c2',type:'complexity',d:1,p:'range-query',title:'q queries the naive way',code:`for l, r in queries:
    answers.append(sum(nums[l:r + 1]))`,opts:['O(q)','O(n + q)','O(n · q)','O(q log n)'],a:2,why:'Each query may sum up to n elements. Prefix sums make it O(n + q).'},

/* ---------- choose ---------- */
{id:'rq-ch1',type:'choose',d:1,p:'prefix-sum',title:'Static sums',q:'An array never changes; you answer a million range-sum queries.',opts:['Prefix sums','Segment tree','Re-sum each range','Sort the array'],a:0,why:'O(n) once, then O(1) per query, and only a few lines of code.'},
{id:'rq-ch2',type:'choose',d:1,p:'prefix-sum',title:'Many range additions, one read',q:'Apply 10⁵ "add v to positions l..r" updates, then print the final array.',opts:['Difference array','Loop over each range','Fenwick tree','Heap'],a:0,why:'O(1) per update plus one O(n) pass, instead of O(n) per update.'},
{id:'rq-ch3',type:'choose',d:2,p:'range-query',title:'Updates and minimums interleaved',q:'Point updates and range-minimum queries arrive interleaved, 10⁵ of each.',opts:['Segment tree','Prefix sums','Difference array','Fenwick tree for sums'],a:0,why:'O(log n) per operation for an operation (min) that has no inverse.'},

/* ---------- dry run ---------- */
{id:'rq-dr1',type:'dryrun',d:1,p:'prefix-sum',title:'Rebuilding from a difference array',code:`diff = [3, 0, 2, -3, 0, -2]
arr, run = [], 0
for d in diff:
    run += d
    arr.append(run)`,cols:['d','run'],given:[0],rows:[['3','3'],['0','3'],['2','5'],['-3','2'],['0','2'],['-2','0']],why:'The final array is [3, 3, 5, 2, 2, 0]. The running sum turns a list of changes back into values.'},
{id:'rq-dr2',type:'dryrun',d:2,p:'range-query',title:'Fenwick prefix sum of [1..8] up to 7',code:`tree = [0, 1, 3, 3, 10, 5, 11, 7, 36]
i, total = 7, 0
while i > 0:
    total += tree[i]
    i -= i & -i`,cols:['i','total'],rows:[['6','7'],['4','18'],['0','28']],setup:'tree is the Fenwick tree of the values 1, 2, …, 8 (index 0 unused).',why:'tree[7] = 7, tree[6] = 5 + 6 = 11, tree[4] = 1 + 2 + 3 + 4 = 10. 7 + 11 + 10 = 28 = 1 + … + 7.'},

/* ---------- complete ---------- */
{id:'rq-b1',type:'blanks',d:2,p:'range-query',title:'Complete the Fenwick loops',code:`class Fenwick:
    def __init__(self, n):
        self.tree = [0] * (n + 1)

    def add(self, i, delta):          # i is 1-based
        while i < len(self.tree):
            self.tree[i] += delta
            i += ______

    def prefix(self, i):              # sum of positions 1..i
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= ______
        return total`,blanks:[['i & -i','i & (-i)','(i & -i)'],['i & -i','i & (-i)','(i & -i)']],tests:[['(lambda f: (f.add(3, 5), f.add(1, 2), f.prefix(2), f.prefix(4))[2:])(Fenwick(5))','(2, 7)']],why:'Updates climb by adding the lowest set bit; queries descend by removing it.'},
{id:'rq-b2',type:'blanks',d:1,p:'prefix-sum',title:'Complete the difference array',code:`def apply_updates(n, updates):
    diff = [0] * (n + 1)
    for l, r, v in updates:
        diff[l] += v
        diff[______] -= v
    out, run = [], 0
    for i in range(n):
        run += diff[i]
        out.append(______)
    return out`,blanks:[['r + 1','r+1'],['run']],tests:[['apply_updates(5, [(1, 3, 2)])','[0, 2, 2, 2, 0]'],['apply_updates(3, [(0, 2, 1), (1, 1, 5)])','[1, 6, 1]']],why:'+v where the range starts, −v just after it ends; the running sum does the rest.'},

/* ---------- debug ---------- */
{id:'rq-d1',type:'debug',d:2,p:'range-query',title:'The update that went the wrong way',code:`class Fenwick:
    def __init__(self, n):
        self.tree = [0] * (n + 1)

    def add(self, i, delta):
        while i > 0:
            self.tree[i] += delta
            i -= i & -i

    def prefix(self, i):
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & -i
        return total`,opts:['tree should have n elements','add walks downwards like a query; it must climb with i += i & −i (while i ≤ n) to reach every node covering i','prefix should add i & −i','delta should be negated'],a:1,why:'An update must touch every node whose range contains i: those are found by adding the lowest set bit.',fix:`class Fenwick:
    def __init__(self, n):
        self.tree = [0] * (n + 1)

    def add(self, i, delta):
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & -i

    def prefix(self, i):
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & -i
        return total`,post:`def _t():
    f = Fenwick(8)
    for i in range(1, 9):
        f.add(i, i)
    return [f.prefix(k) for k in (1, 4, 7, 8)]`,tests:[['_t()','[1, 10, 28, 36]']]},
{id:'rq-d2',type:'debug',d:1,p:'prefix-sum',title:'Off the end of the difference array',code:`def apply_updates(n, updates):
    diff = [0] * n
    for l, r, v in updates:
        diff[l] += v
        diff[r + 1] -= v
    out, run = [], 0
    for d in diff:
        run += d
        out.append(run)
    return out`,opts:['run should start at 1','When r is the last index, r + 1 is out of range: make diff one cell longer (and ignore the extra cell)','The loop should go backwards','diff[l] should be -= v'],a:1,why:'Allocate n + 1 cells so diff[r + 1] always exists, and rebuild only the first n.',fix:`def apply_updates(n, updates):
    diff = [0] * (n + 1)
    for l, r, v in updates:
        diff[l] += v
        diff[r + 1] -= v
    out, run = [], 0
    for d in diff[:n]:
        run += d
        out.append(run)
    return out`,tests:[['apply_updates(3, [(0, 2, 1)])','[1, 1, 1]'],['apply_updates(4, [(1, 2, 3)])','[0, 3, 3, 0]'],['apply_updates(2, [])','[0, 0]']]},
{id:'rq-d3',type:'debug',d:1,p:'prefix-sum',title:'Range sum misses the last element',code:`def build(nums):
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    return prefix

def range_sum(prefix, l, r):          # inclusive l..r
    return prefix[r] - prefix[l]`,opts:['build is wrong','prefix[k] is the sum of the first k values, so l..r inclusive is prefix[r + 1] − prefix[l]','It should be prefix[l] − prefix[r]','l should be l − 1'],a:1,why:'Write down what prefix[k] means, then the indexes follow: elements l..r are the first r + 1 values minus the first l.',fix:`def build(nums):
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    return prefix

def range_sum(prefix, l, r):          # inclusive l..r
    return prefix[r + 1] - prefix[l]`,tests:[['range_sum(build([1, 2, 3, 4]), 1, 2)','5'],['range_sum(build([1, 2, 3, 4]), 0, 3)','10'],['range_sum(build([7]), 0, 0)','7']]},

/* ---------- coding (schema v2) ---------- */
{id:'rq-static-sum',type:'code',d:1,p:'prefix-sum',title:'Range Sum Query (static)',prompt:'<p>Build a class <code>RangeSum(nums)</code> with a method <code>sum_range(l, r)</code> that returns <code>nums[l] + … + nums[r]</code> in O(1). The list never changes.</p>',prereq:['arr-dr4'],
constraints:['1 ≤ len(nums) ≤ 10<sup>4</sup>','up to 10<sup>4</sup> calls to sum_range, 0 ≤ l ≤ r &lt; n'],
starter:`class RangeSum:
    def __init__(self, nums):
        pass

    def sum_range(self, l, r):
        pass`,solution:`class RangeSum:
    def __init__(self, nums):
        self.prefix = [0]
        for x in nums:
            self.prefix.append(self.prefix[-1] + x)   # prefix[k] = sum of the first k values

    def sum_range(self, l, r):
        return self.prefix[r + 1] - self.prefix[l]`,
tests:[['RangeSum([-2, 0, 3, -5, 2, -1]).sum_range(0, 2)','1'],['RangeSum([-2, 0, 3, -5, 2, -1]).sum_range(2, 5)','-1'],['RangeSum([-2, 0, 3, -5, 2, -1]).sum_range(0, 5)','-3'],['RangeSum([5]).sum_range(0, 0)','5'],['RangeSum(list(range(10000))).sum_range(1, 9999)','49995000']],
hints:['Precompute running totals once in __init__.','sum(l..r) = prefix[r + 1] − prefix[l].'],approach:'Prefix sums with a leading 0.',cx:'O(n) to build, O(1) per query',
mistakes:['Summing the slice in every query (O(n) each).','Off-by-one: prefix[r] − prefix[l] misses nums[r].'],
followup:'Do the same for a 2D matrix (rq-region-sum).'},

{id:'rq-range-add',type:'code',d:1,p:'prefix-sum',title:'Apply Range Additions',prompt:'<p>Start with n zeros. Each update <code>(l, r, v)</code> adds v to every position from l to r inclusive. Return the final list, in O(n + number of updates).</p>',
constraints:['1 ≤ n ≤ 10<sup>5</sup>','0 ≤ len(updates) ≤ 10<sup>5</sup>, 0 ≤ l ≤ r &lt; n'],
starter:`def apply_updates(n, updates):
    # your code here
    pass`,solution:`def apply_updates(n, updates):
    diff = [0] * (n + 1)
    for l, r, v in updates:
        diff[l] += v          # the change starts here
        diff[r + 1] -= v      # and stops after r
    out, run = [], 0
    for i in range(n):
        run += diff[i]
        out.append(run)
    return out`,
tests:[['apply_updates(5, [(1, 3, 2), (2, 4, 3), (0, 2, -2)])','[-2, 0, 3, 5, 3]'],['apply_updates(3, [])','[0, 0, 0]'],['apply_updates(1, [(0, 0, 7)])','[7]'],['apply_updates(4, [(0, 3, 1), (0, 3, 1)])','[2, 2, 2, 2]'],['sum(apply_updates(100000, [(0, 99999, 1)] * 1000))','100000000']],
hints:['Looping over every range is O(n) per update. Record only where each change starts and stops.','diff[l] += v and diff[r + 1] −= v, then take running sums.'],approach:'Difference array plus one prefix-sum pass.',cx:'O(n + u) time, O(n) space',
dry:`n = 5, updates (1,3,+2) (2,4,+3) (0,2,−2)
diff  −2  2  3  −2  −2  −3(ignored)
run   −2  0  3   5   3`,
mistakes:['diff of length n: diff[r + 1] fails when r = n − 1.','Rebuilding with the extra last cell included.'],
followup:'Range additions on a 2D grid: a 2D difference array with four corner updates.'},

{id:'rq-car-pooling',type:'code',d:2,p:'prefix-sum',title:'Car Pooling',prompt:'<p>Each trip is <code>[passengers, start, end]</code>: they get in at km start and out at km end (so they are not in the car at km end). Can a car with <code>capacity</code> seats do all trips?</p>',prereq:['rq-range-add'],
constraints:['1 ≤ len(trips) ≤ 1000','1 ≤ passengers ≤ 100, 0 ≤ start &lt; end ≤ 1000, 1 ≤ capacity ≤ 10<sup>5</sup>'],
starter:`def car_pooling(trips, capacity):
    # your code here
    pass`,solution:`def car_pooling(trips, capacity):
    change = [0] * 1001
    for people, start, end in trips:
        change[start] += people     # get in
        change[end] -= people       # get out (seat free again at km end)
    load = 0
    for c in change:
        load += c
        if load > capacity:
            return False
    return True`,
tests:[['car_pooling([[2, 1, 5], [3, 3, 7]], 4)','False'],['car_pooling([[2, 1, 5], [3, 3, 7]], 5)','True'],['car_pooling([[2, 1, 5], [3, 5, 7]], 3)','True'],['car_pooling([[3, 2, 7], [3, 7, 9], [8, 3, 9]], 11)','True'],['car_pooling([[9, 0, 1]], 8)','False']],
hints:['Only the points where people get in or out matter.','Record +people at start and −people at end, then sweep and keep a running load.'],approach:'Difference array over kilometres (a sweep line).',cx:'O(n + K) time where K = 1001 kilometres',
mistakes:['Subtracting at end + 1: passengers leave AT km end.','Checking only the starting points of trips.'],
followup:'If kilometres go up to 10⁹, sort the 2n events instead of using an array.'},

{id:'rq-flight-bookings',type:'code',d:2,p:'prefix-sum',title:'Flight Bookings',prompt:'<p>There are n flights numbered 1..n. Booking <code>[first, last, seats]</code> reserves that many seats on every flight from first to last. Return the total seats reserved on each flight.</p>',prereq:['rq-range-add'],
constraints:['1 ≤ n ≤ 2 × 10<sup>4</sup>','1 ≤ len(bookings) ≤ 2 × 10<sup>4</sup>, 1 ≤ first ≤ last ≤ n'],
starter:`def flight_bookings(bookings, n):
    # your code here
    pass`,solution:`def flight_bookings(bookings, n):
    diff = [0] * (n + 2)                 # 1-based flights, plus room for last + 1
    for first, last, seats in bookings:
        diff[first] += seats
        diff[last + 1] -= seats
    result, run = [], 0
    for flight in range(1, n + 1):
        run += diff[flight]
        result.append(run)
    return result`,
tests:[['flight_bookings([[1, 2, 10], [2, 3, 20], [2, 5, 25]], 5)','[10, 55, 45, 25, 25]'],['flight_bookings([[1, 2, 10], [2, 2, 15]], 2)','[10, 25]'],['flight_bookings([], 3)','[0, 0, 0]'],['flight_bookings([[1, 1, 5]], 1)','[5]'],['flight_bookings([[3, 3, 1]], 4)','[0, 0, 1, 0]']],
hints:['This is "apply range additions" with 1-based positions.','Allocate n + 2 cells so diff[last + 1] always exists.'],approach:'Difference array with 1-based indexes.',cx:'O(n + b) time, O(n) space',
mistakes:['Mixing 0-based and 1-based flight numbers.','Returning the difference array instead of the running sums.'],
followup:'Answer "how many seats on flight k?" online while bookings keep arriving (use a Fenwick tree with range-update, point-query).'},

{id:'rq-region-sum',type:'code',d:2,p:'prefix-sum',title:'2D Region Sums',prompt:'<p>Given a matrix and a list of queries <code>(r1, c1, r2, c2)</code>, return the sum of each rectangle (inclusive corners). Precompute so that each query is O(1).</p>',prereq:['rq-static-sum'],
constraints:['1 ≤ rows, cols ≤ 200','up to 10<sup>4</sup> queries'],
starter:`def region_sums(matrix, queries):
    # your code here
    pass`,solution:`def region_sums(matrix, queries):
    rows, cols = len(matrix), len(matrix[0])
    # P[r][c] = sum of the rectangle (0, 0) .. (r - 1, c - 1)
    P = [[0] * (cols + 1) for _ in range(rows + 1)]
    for r in range(rows):
        for c in range(cols):
            P[r + 1][c + 1] = matrix[r][c] + P[r][c + 1] + P[r + 1][c] - P[r][c]
    return [P[r2 + 1][c2 + 1] - P[r1][c2 + 1] - P[r2 + 1][c1] + P[r1][c1]
            for r1, c1, r2, c2 in queries]`,
tests:[['region_sums([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]], [(2, 1, 4, 3), (1, 1, 2, 2), (1, 2, 2, 4)])','[8, 11, 12]'],['region_sums([[5]], [(0, 0, 0, 0)])','[5]'],['region_sums([[1, 2], [3, 4]], [(0, 0, 1, 1), (1, 0, 1, 1), (0, 1, 1, 1)])','[10, 7, 6]'],['region_sums([[1, 2], [3, 4]], [])','[]']],
hints:['Build P[r][c] = sum of everything above and to the left (inclusion–exclusion: add top and left, subtract the overlap).','A rectangle sum is one big prefix minus two strips plus the corner subtracted twice.'],approach:'2D prefix sums with an extra zero row and column.',cx:'O(rows · cols) to build, O(1) per query',
mistakes:['Forgetting to add back P[r1][c1] (subtracted twice).','Off-by-one between matrix and P indexes.'],
followup:'Support point updates too (2D Fenwick tree).'},

{id:'rq-fenwick',type:'code',d:2,p:'range-query',title:'Build a Fenwick Tree',prompt:'<p>Implement <code>Fenwick(n)</code> for positions 0..n − 1 with <code>add(i, delta)</code>, <code>prefix_sum(i)</code> (sum of positions 0..i) and <code>range_sum(l, r)</code>, each in O(log n).</p>',prereq:['rq-p2','rq-p3'],
constraints:['1 ≤ n ≤ 10<sup>5</sup>','up to 10<sup>5</sup> operations'],
starter:`class Fenwick:
    def __init__(self, n):
        pass

    def add(self, i, delta):
        pass

    def prefix_sum(self, i):
        pass

    def range_sum(self, l, r):
        pass`,solution:`class Fenwick:
    def __init__(self, n):
        self.tree = [0] * (n + 1)     # 1-based internally

    def add(self, i, delta):
        i += 1
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & -i               # climb to the next node covering i

    def prefix_sum(self, i):
        i += 1
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & -i               # drop the lowest set bit
        return total

    def range_sum(self, l, r):
        return self.prefix_sum(r) - (self.prefix_sum(l - 1) if l > 0 else 0)`,
post:`def _t1():
    f = Fenwick(5)
    for i, v in enumerate([1, 2, 3, 4, 5]):
        f.add(i, v)
    return f.prefix_sum(0), f.prefix_sum(4), f.range_sum(1, 3)
def _t2():
    f = Fenwick(5)
    for i, v in enumerate([1, 2, 3, 4, 5]):
        f.add(i, v)
    f.add(2, 10)
    return f.range_sum(2, 2), f.range_sum(0, 4)
def _t3():
    f = Fenwick(1)
    f.add(0, -7)
    return f.prefix_sum(0), f.range_sum(0, 0)
def _t4():
    import random
    rng = random.Random(1)
    n = 200
    arr = [0] * n
    f = Fenwick(n)
    for _ in range(2000):
        i = rng.randrange(n)
        v = rng.randint(-50, 50)
        arr[i] += v
        f.add(i, v)
        l = rng.randrange(n)
        r = rng.randrange(l, n)
        if f.range_sum(l, r) != sum(arr[l:r + 1]):
            return False
    return True
def _t5():
    f = Fenwick(100000)
    for i in range(100000):
        f.add(i, 1)
    return f.prefix_sum(99999), f.range_sum(500, 1499)`,
tests:[['_t1()','(1, 15, 9)','','values 1..5: prefix_sum(0), prefix_sum(4), range_sum(1, 3)'],['_t2()','(13, 25)','','after add(2, 10)'],['_t3()','(-7, -7)','','a single position, negative value'],['_t4()','True','','2,000 random updates and queries compared with a plain list'],['_t5()','(100000, 1000)','','100,000 updates and queries (must be fast)']],
hints:['Store a list of n + 1 zeros and shift positions by 1, because i & −i is 0 for i = 0.','add climbs with i += i & −i; prefix_sum descends with i −= i & −i; range_sum is a difference of two prefixes.'],approach:'Binary indexed tree with 1-based internal indexes.',cx:'O(log n) per operation, O(n) space',
mistakes:['Using 0-based indexes inside the loops (i & −i is 0: an infinite loop).','range_sum(l, r) computed as prefix_sum(r) − prefix_sum(l), which drops position l.'],
followup:'Build the tree in O(n) from an initial list instead of n calls to add.'},

{id:'rq-num-array',type:'code',d:2,p:'range-query',title:'Range Sum Query (mutable)',prompt:'<p>Build <code>NumArray(nums)</code> with <code>update(i, value)</code> (set nums[i] to value) and <code>sum_range(l, r)</code>, both in O(log n). Use a Fenwick tree or a segment tree.</p>',prereq:['rq-fenwick'],
constraints:['1 ≤ len(nums) ≤ 3 × 10<sup>4</sup>','up to 3 × 10<sup>4</sup> calls in total'],
starter:`class NumArray:
    def __init__(self, nums):
        pass

    def update(self, i, value):
        pass

    def sum_range(self, l, r):
        pass`,solution:`class NumArray:
    def __init__(self, nums):
        self.nums = [0] * len(nums)
        self.tree = [0] * (len(nums) + 1)
        for i, x in enumerate(nums):
            self.update(i, x)

    def _add(self, i, delta):
        i += 1
        while i < len(self.tree):
            self.tree[i] += delta
            i += i & -i

    def _prefix(self, i):            # sum of positions 0..i - 1
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & -i
        return total

    def update(self, i, value):
        self._add(i, value - self.nums[i])   # Fenwick stores changes, so add the difference
        self.nums[i] = value

    def sum_range(self, l, r):
        return self._prefix(r + 1) - self._prefix(l)`,
post:`def _t1():
    a = NumArray([1, 3, 5])
    first = a.sum_range(0, 2)
    a.update(1, 2)
    return first, a.sum_range(0, 2)
def _t2():
    a = NumArray([7])
    a.update(0, -1)
    return a.sum_range(0, 0)
def _t3():
    a = NumArray([0, 9, 5, 7, 3])
    a.update(4, 5)
    a.update(4, 5)
    return a.sum_range(4, 4), a.sum_range(2, 4)
def _t4():
    import random
    rng = random.Random(7)
    arr = [rng.randint(-9, 9) for _ in range(300)]
    a = NumArray(arr)
    for _ in range(3000):
        i = rng.randrange(300)
        arr[i] = rng.randint(-9, 9)
        a.update(i, arr[i])
        l = rng.randrange(300)
        r = rng.randrange(l, 300)
        if a.sum_range(l, r) != sum(arr[l:r + 1]):
            return False
    return True
def _t5():
    a = NumArray([1] * 30000)
    for i in range(0, 30000, 2):
        a.update(i, 3)
    return a.sum_range(0, 29999)`,
tests:[['_t1()','(9, 8)','','[1, 3, 5]: sum, then update(1, 2) and sum again'],['_t2()','-1','','update to a negative value'],['_t3()','(5, 17)','','updating to the same value twice'],['_t4()','True','','3,000 random updates and queries compared with a plain list'],['_t5()','60000','','30,000 elements and 15,000 updates (must be fast)']],
hints:['update sets a value, but a Fenwick tree adds: add (value − old value).','Keep a copy of the current values to know the old value.'],approach:'Fenwick tree storing differences, plus the current array.',cx:'O(log n) per operation, O(n log n) to build this way',
mistakes:['Adding value instead of value − old (the update then accumulates).','Rebuilding prefix sums on every update: O(n).'],
followup:'Implement the same class with an iterative segment tree and compare the code.'},

{id:'rq-segtree-min',type:'code',d:3,p:'range-query',title:'Segment Tree for Range Minimum',prompt:'<p>Build <code>MinTree(nums)</code> with <code>update(i, value)</code> and <code>query(l, r)</code> returning the minimum of nums[l..r] inclusive, both in O(log n).</p>',prereq:['rq-m3','rq-m4'],
constraints:['1 ≤ len(nums) ≤ 10<sup>5</sup>','up to 10<sup>5</sup> operations'],
starter:`class MinTree:
    def __init__(self, nums):
        pass

    def update(self, i, value):
        pass

    def query(self, l, r):
        pass`,solution:`class MinTree:
    def __init__(self, nums):
        self.n = len(nums)
        self.tree = [0] * self.n + list(nums)       # leaves at n .. 2n - 1
        for i in range(self.n - 1, 0, -1):
            self.tree[i] = min(self.tree[2 * i], self.tree[2 * i + 1])

    def update(self, i, value):
        i += self.n
        self.tree[i] = value
        while i > 1:                                 # fix every ancestor
            i //= 2
            self.tree[i] = min(self.tree[2 * i], self.tree[2 * i + 1])

    def query(self, l, r):
        best = float("inf")
        l += self.n
        r += self.n + 1                              # half-open [l, r)
        while l < r:
            if l & 1:                                # l is a right child: take it, move right
                best = min(best, self.tree[l])
                l += 1
            if r & 1:                                # r is a right boundary: step left, take it
                r -= 1
                best = min(best, self.tree[r])
            l //= 2
            r //= 2
        return best`,
post:`def _t1():
    t = MinTree([5, 2, 8, 6, 3, 7])
    return t.query(0, 5), t.query(2, 3), t.query(4, 4)
def _t2():
    t = MinTree([5, 2, 8, 6, 3, 7])
    t.update(1, 10)
    return t.query(0, 2), t.query(0, 5)
def _t3():
    t = MinTree([4])
    t.update(0, -2)
    return t.query(0, 0)
def _t4():
    import random
    rng = random.Random(3)
    arr = [rng.randint(-100, 100) for _ in range(257)]
    t = MinTree(arr)
    for _ in range(3000):
        i = rng.randrange(257)
        arr[i] = rng.randint(-100, 100)
        t.update(i, arr[i])
        l = rng.randrange(257)
        r = rng.randrange(l, 257)
        if t.query(l, r) != min(arr[l:r + 1]):
            return False
    return True
def _t5():
    t = MinTree(list(range(100000, 0, -1)))
    for i in range(0, 100000, 1000):
        t.update(i, -i)
    return t.query(0, 99999), t.query(1, 998)`,
tests:[['_t1()','(2, 6, 3)','','min of [5, 2, 8, 6, 3, 7] on three ranges'],['_t2()','(5, 3)','','after update(1, 10)'],['_t3()','-2','','a single element'],['_t4()','True','','3,000 random updates and queries on an odd-sized list, compared with min()'],['_t5()','(-99000, 99002)','','100,000 elements (must be fast)']],
hints:['Store leaves at tree[n + i]; parent p holds min(tree[2p], tree[2p + 1]).','Query bottom-up with a half-open range [l, r): when l is a right child take it and move right; when r is odd, step left and take it.'],approach:'Iterative segment tree of size 2n with bottom-up query.',cx:'O(n) build, O(log n) per update and query, O(n) space',
mistakes:['Using a Fenwick tree with "prefix minus prefix": min has no inverse.','Forgetting to update ancestors after a point update.','Mixing inclusive and half-open ranges.'],
followup:'Add range assignment ("set l..r to v") with lazy propagation.'},

{id:'rq-count-smaller',type:'code',d:3,p:'range-query',title:'Count Smaller Numbers After Self',prompt:'<p>Return a list where element i is the number of elements to the right of nums[i] that are strictly smaller.</p>',prereq:['rq-fenwick'],
constraints:['1 ≤ len(nums) ≤ 10<sup>5</sup>','−10<sup>4</sup> ≤ nums[i] ≤ 10<sup>4</sup>'],
starter:`def count_smaller(nums):
    # your code here
    pass`,solution:`def count_smaller(nums):
    ranks = {v: i + 1 for i, v in enumerate(sorted(set(nums)))}   # values -> 1..m
    tree = [0] * (len(ranks) + 1)
    result = []
    for x in reversed(nums):                 # walk from the right
        i, smaller = ranks[x] - 1, 0
        while i > 0:                         # how many seen values have rank < rank(x)
            smaller += tree[i]
            i -= i & -i
        result.append(smaller)
        i = ranks[x]
        while i < len(tree):                 # record x as seen
            tree[i] += 1
            i += i & -i
    return result[::-1]`,
tests:[['count_smaller([5, 2, 6, 1])','[2, 1, 1, 0]'],['count_smaller([-1])','[0]'],['count_smaller([-1, -1])','[0, 0]'],['count_smaller([3, 2, 1])','[2, 1, 0]'],['count_smaller([1, 2, 3])','[0, 0, 0]'],['sum(count_smaller(list(range(100000, 0, -1))))','4999950000']],
hints:['Walk from right to left and keep track of the values seen so far.','A Fenwick tree over value ranks answers "how many seen values are smaller?" in O(log n). Compress values to ranks 1..m first.'],approach:'Coordinate compression + Fenwick tree of counts, scanning from the right.',cx:'O(n log n) time, O(n) space',
mistakes:['O(n²) double loop: too slow for 10⁵.','Counting equal values as smaller (query rank − 1, not rank).','Forgetting to reverse the result.'],
followup:'Count inversions of the whole list (the sum of this output) with merge sort instead.'},
]);
