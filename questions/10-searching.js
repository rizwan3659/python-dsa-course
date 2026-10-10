/* Topic 10 · Searching: linear search, binary search and its variations. */
COURSE.qs('searching',[
{id:'bs-p1',type:'predict',d:2,p:'binary-search',title:'bisect_left vs bisect_right',code:`import bisect
a = [1, 3, 3, 5]
print(bisect.bisect_left(a, 3), bisect.bisect_right(a, 3))`,a:'1 3',why:'bisect_left: first index where 3 could go (before the 3s). bisect_right: just after the last 3.'},
{id:'bs-p2',type:'predict',d:1,p:'binary-search',title:'The middle index',code:`low, high = 0, 9
print((low + high) // 2)`,a:'4',why:'Integer division rounds down.'},
{id:'bs-p3',type:'predict',d:2,p:'binary-search',title:'Count the steps',code:`nums = list(range(100))
low, high, steps = 0, 99, 0
while low <= high:
    mid = (low + high) // 2
    steps += 1
    if nums[mid] == 99:
        break
    if nums[mid] < 99:
        low = mid + 1
    else:
        high = mid - 1
print(steps)`,a:'7',hints:['Write down mid each time: 49, 74, …'],why:'mid goes 49, 74, 87, 93, 96, 98, 99. About log₂(100) ≈ 7 steps.'},
{id:'bs-p4',type:'predict',d:2,p:'binary-search',title:'Insert position',code:`nums = [1, 3, 5, 7]
target = 4
low, high = 0, len(nums)
while low < high:
    mid = (low + high) // 2
    if nums[mid] < target:
        low = mid + 1
    else:
        high = mid
print(low)`,a:'2',why:'The first index whose value is ≥ 4 is 2 (value 5): that is where 4 would be inserted.'},
{id:'bs-p5',type:'predict',d:1,p:'binary-search',title:'insort',code:`import bisect
a = [1, 4, 6]
bisect.insort(a, 5)
print(a)`,a:'[1, 4, 5, 6]',why:'insort finds the position with binary search, then inserts (which shifts elements).'},
{id:'bs-p6',type:'predict',d:2,p:'binary-search',title:'Integer square root',code:`x = 17
lo, hi, ans = 0, x, 0
while lo <= hi:
    mid = (lo + hi) // 2
    if mid * mid <= x:
        ans = mid
        lo = mid + 1
    else:
        hi = mid - 1
print(ans)`,a:'4',why:'The largest integer whose square is ≤ 17. Binary search works on any monotonic yes/no question, not just arrays.'},
{id:'bs-c1',type:'complexity',d:1,p:'binary-search',title:'Binary search',code:`while low <= high:
    mid = (low + high) // 2
    if nums[mid] < target:
        low = mid + 1
    else:
        high = mid - 1`,a:'O(log n)',why:'The range halves every step.'},
{id:'bs-c2',type:'complexity',d:1,p:'traversal',title:'Linear search',code:`def find(nums, target):
    for i, x in enumerate(nums):
        if x == target:
            return i
    return -1`,a:'O(n)',why:'In the worst case every element is checked.'},
{id:'bs-c3',type:'complexity',d:2,p:'binary-search',title:'Sort once, search q times',q:'Sort n numbers once, then answer q membership queries with binary search. Total time?',code:`nums.sort()
for t in queries:
    bisect.bisect_left(nums, t)`,opts:['O(n + q)','O(n log n + q log n)','O(q · n)','O(n²)'],a:1,why:'Sorting pays for itself when there are many queries: each one is O(log n) instead of O(n).'},
{id:'bs-c4',type:'complexity',d:3,p:'binary-search',title:'Binary search on the answer',q:'Binary search over speeds 1..M, where each guess runs an O(n) feasibility check. Total time?',code:`lo, hi = 1, max(piles)        # M = max(piles)
while lo < hi:
    mid = (lo + hi) // 2
    if can_finish(piles, mid, h):   # O(n)
        hi = mid
    else:
        lo = mid + 1`,opts:['O(n)','O(n log M)','O(M)','O(n · M)'],a:1,why:'log M guesses, each O(n).'},
{id:'bs-c5',type:'complexity',d:3,p:'binary-search',title:'The cost of insort',code:`import bisect
for x in stream:          # n values
    bisect.insort(sorted_list, x)`,a:'O(n²)',why:'Finding the spot is O(log n), but inserting into a list shifts elements: O(n) each. Use a heap if you only need the min/max.'},
{id:'bs-m1',type:'mcq',d:1,p:'binary-search',title:'The requirement',q:'Binary search on a list only works if…',opts:['The list is short','The list is sorted (or the yes/no condition is monotonic)','The values are distinct','The list has an odd length'],a:1,why:'Sorted order is what tells you which half to throw away.'},
{id:'bs-m2',type:'mcq',d:1,p:'binary-search',title:'Steps for 1,000 items',q:'At most how many comparisons does binary search need for 1,000 sorted items?',opts:['About 10','About 100','About 500','1,000'],a:0,why:'2¹⁰ = 1024 ≥ 1000.'},
{id:'bs-m3',type:'mcq',d:2,p:'binary-search',title:'Lower bound',q:'“Lower bound” of x in a sorted list is…',opts:['The smallest element','The first index i with nums[i] ≥ x','The last index with nums[i] ≤ x','The index of x, or −1'],a:1,why:'It is also the insert position, and it is what bisect_left returns.'},
{id:'bs-m4',type:'mcq',d:3,p:'binary-search',title:'Search on the answer',q:'You can binary search over possible ANSWERS (like a speed or a capacity) when…',opts:['The answers are prime','If a value works, every larger value also works (a monotonic yes/no condition)','The input is sorted','There are fewer than 1,000 answers'],a:1,why:'False … False True … True: binary search finds the first True.'},
{id:'bs-ch1',type:'choose',d:2,p:'binary-search',title:'Nearest value queries',q:'Static data; many queries of the form “smallest stored value ≥ x”.',opts:['A set','A sorted list + bisect','A dict','A stack'],a:1,why:'A set answers “is x there?” but not “what is the next one up?”. Sorted order + binary search does both.'},
{id:'bs-ch2',type:'choose',d:1,p:'traversal',title:'One lookup, unsorted data',q:'You must find one value, once, in an unsorted list.',opts:['Sort it, then binary search','Linear search','Build a heap first','Binary search directly'],a:1,why:'Sorting costs O(n log n), more than the O(n) scan you need once.'},
{id:'bs-dr1',type:'dryrun',d:2,p:'binary-search',title:'Lower bound trace',code:`nums = [1, 3, 5, 7, 9, 11, 13]
target = 9
low, high = 0, len(nums)
while low < high:
    mid = (low + high) // 2
    if nums[mid] < target:
        low = mid + 1
    else:
        high = mid`,cols:['mid','low','high'],rows:[['3','4','7'],['5','4','5'],['4','4','4']],why:'7 < 9 moves low up; 11 and 9 are ≥ 9, so high moves down to mid. low = high = 4 is the answer.'},
{id:'bs-dr2',type:'dryrun',d:2,p:'binary-search',title:'Square root trace',code:`x = 20
lo, hi, ans = 0, 20, 0
while lo <= hi:
    mid = (lo + hi) // 2
    if mid * mid <= x:
        ans = mid
        lo = mid + 1
    else:
        hi = mid - 1`,cols:['mid','lo','hi','ans'],rows:[['10','0','9','0'],['4','5','9','4'],['7','5','6','4'],['5','5','4','4']],why:'4² = 16 ≤ 20 is recorded; 5² = 25 is too big. ⌊√20⌋ = 4.'},
{id:'bs-b1',type:'blanks',d:1,p:'binary-search',title:'Complete binary search',code:`def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while ______:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = ______
        else:
            high = ______
    return -1`,blanks:[['low <= high'],['mid + 1'],['mid - 1']],tests:[['binary_search([1, 3, 5, 7], 7)','3'],['binary_search([1, 3, 5, 7], 4)','-1'],['binary_search([5], 5)','0'],['binary_search([], 1)','-1']],why:'Inclusive bounds: loop while the range is non-empty; skip past mid, which was already checked.'},
{id:'bs-b2',type:'blanks',d:2,p:'binary-search',title:'Complete lower_bound',code:`def lower_bound(nums, target):
    low, high = 0, len(nums)
    while low < high:
        mid = (low + high) // 2
        if ______:
            low = mid + 1
        else:
            high = ______
    return low`,blanks:[['nums[mid] < target'],['mid']],tests:[['lower_bound([1, 3, 3, 5], 3)','1'],['lower_bound([1, 3, 5], 6)','3'],['lower_bound([], 2)','0']],why:'high = mid keeps mid as a candidate answer; low = mid + 1 rules it out.'},
{id:'bs-b3',type:'blanks',d:3,p:'binary-search',title:'Complete the search on the answer',code:`def min_speed(piles, h):
    def hours(speed):
        return sum((p + speed - 1) // speed for p in piles)
    lo, hi = 1, max(piles)
    while lo < hi:
        mid = (lo + hi) // 2
        if ______:
            hi = mid
        else:
            lo = mid + 1
    return lo`,blanks:[['hours(mid) <= h']],tests:[['min_speed([3, 6, 7, 11], 8)','4'],['min_speed([30, 11, 23, 4, 20], 5)','30']],why:'If speed mid is fast enough, every faster speed is too: keep mid and search left.'},
{id:'bs-d1',type:'debug',d:1,p:'binary-search',title:'The last element is never checked',code:`def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low < high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,opts:['mid is computed wrongly','With inclusive bounds the loop must run while low <= high; when low == high that last candidate is skipped','high should start at len(nums)','It should return low'],a:1,why:'binary_search([5], 5) returns −1. Match the loop condition to the meaning of your bounds.',fix:`def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,tests:[['binary_search([5], 5)','0'],['binary_search([1, 3], 3)','1']]},
{id:'bs-d2',type:'debug',d:2,p:'binary-search',title:'It hangs',code:`def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid
        else:
            high = mid
    return -1`,q:'For some inputs (like searching for 4 in [1, 3]) this never stops. Why?',opts:['The loop condition','low = mid and high = mid can leave the range unchanged, so it loops forever: use mid + 1 and mid − 1','// should be /','It should be recursive'],a:1,why:'Every iteration must shrink the range. Since mid itself was already checked, exclude it.',fix:`def binary_search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`},
{id:'bs-d3',type:'debug',d:2,p:'binary-search',title:'Not the FIRST occurrence',code:`def first_occurrence(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,opts:['It returns −1 too often','When it finds the target it returns at once, but an earlier copy may exist on the left','mid should round up','The list must be reversed'],a:1,why:'For [2, 2, 2, 2, 2] it returns 2, not 0. Record the index and keep searching left: high = mid − 1.',fix:`def first_occurrence(nums, target):
    low, high, ans = 0, len(nums) - 1, -1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            ans = mid
            high = mid - 1
        elif nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return ans`,tests:[['first_occurrence([2, 2, 2, 2, 2], 2)','0'],['first_occurrence([1, 2, 2, 3], 2)','1']]},
{id:'bs-d4',type:'debug',d:1,p:'binary-search',title:'Binary search on unsorted data',code:`def contains(nums, target):
    import bisect
    i = bisect.bisect_left(nums, target)
    return i < len(nums) and nums[i] == target

print(contains([7, 2, 9, 4], 7))`,opts:['bisect is imported inside the function','The list is not sorted, so binary search can discard the half that holds the target','i < len(nums) is wrong','It should use bisect_right'],a:1,why:'Sort first (or use a set / a linear scan).',fix:`def contains(nums, target):
    import bisect
    nums = sorted(nums)
    i = bisect.bisect_left(nums, target)
    return i < len(nums) and nums[i] == target`,tests:[['contains([7, 2, 9, 4], 7)','True'],['contains([7, 2, 9, 4], 5)','False']]},
{id:'bs-linear',type:'code',d:1,p:'traversal',title:'Linear Search',prompt:'<p>Return the index of the first occurrence of target, or -1. Do not use <code>.index()</code>.</p>',starter:`def linear_search(nums, target):
    pass`,solution:`def linear_search(nums, target):
    for i, x in enumerate(nums):
        if x == target:
            return i
    return -1`,tests:[['linear_search([4, 2, 7, 2], 2)','1'],['linear_search([4, 2], 9)','-1'],['linear_search([], 1)','-1']],hints:['enumerate gives index and value together.'],approach:'Scan from the left.',cx:'O(n)'},
{id:'bs-search',type:'code',d:1,p:'binary-search',title:'Binary Search',prompt:'<p><code>nums</code> is sorted ascending. Return the index of <code>target</code>, or -1. Must be O(log n); do not use bisect.</p>',starter:`def search(nums, target):
    pass`,solution:`def search(nums, target):
    low, high = 0, len(nums) - 1
    while low <= high:
        mid = (low + high) // 2
        if nums[mid] == target:
            return mid
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`,tests:[['search([-1, 0, 3, 5, 9, 12], 9)','4'],['search([-1, 0, 3, 5, 9, 12], 2)','-1'],['search([5], 5)','0'],['search([], 5)','-1'],['search(list(range(0, 2000000, 2)), 1999998)','999999','','1,000,000 items']],hints:['Keep low and high; look at the middle.','If the middle is too small, the target can only be to its right.'],approach:'Classic binary search with inclusive bounds.',cx:'O(log n)'},
{id:'bs-insert',type:'code',d:1,p:'binary-search',title:'Search Insert Position',prompt:'<p>Return the index of target in the sorted list, or the index where it would be inserted to keep it sorted.</p>',starter:`def search_insert(nums, target):
    pass`,solution:`def search_insert(nums, target):
    low, high = 0, len(nums)
    while low < high:
        mid = (low + high) // 2
        if nums[mid] < target:
            low = mid + 1
        else:
            high = mid
    return low`,tests:[['search_insert([1, 3, 5, 6], 5)','2'],['search_insert([1, 3, 5, 6], 2)','1'],['search_insert([1, 3, 5, 6], 7)','4'],['search_insert([], 3)','0']],hints:['You want the first index with nums[i] ≥ target.','Use high = len(nums) (exclusive) and high = mid when nums[mid] ≥ target.'],approach:'Lower bound.',cx:'O(log n)'},
{id:'bs-sqrt',type:'code',d:1,p:'binary-search',title:'Integer Square Root',prompt:'<p>Return ⌊√x⌋ for x ≥ 0 without math.sqrt or ** 0.5.</p>',starter:`def my_sqrt(x):
    pass`,solution:`def my_sqrt(x):
    lo, hi, ans = 0, x, 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid <= x:
            ans = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ans`,tests:[['my_sqrt(8)','2'],['my_sqrt(16)','4'],['my_sqrt(0)','0'],['my_sqrt(1)','1'],['my_sqrt(2147395599)','46339']],hints:['The answer is somewhere in 0..x, and “mid² ≤ x” is True then False.','Binary search for the last mid where it is True.'],approach:'Binary search on the answer.',cx:'O(log x)'},
{id:'bs-first-bad',type:'code',d:1,p:'binary-search',title:'First Bad Version',prompt:'<p>Versions 1..n; from some version on, every version is bad. <code>is_bad(v)</code> is given. Return the first bad version with as few calls as possible.</p>',starter:`def first_bad(n, is_bad):
    pass`,solution:`def first_bad(n, is_bad):
    lo, hi = 1, n
    while lo < hi:
        mid = (lo + hi) // 2
        if is_bad(mid):
            hi = mid
        else:
            lo = mid + 1
    return lo`,post:`def _run(n, first):
    calls = []
    def is_bad(v):
        calls.append(v)
        return v >= first
    return (first_bad(n, is_bad), len(calls) <= 40)`,tests:[['_run(5, 4)','(4, True)'],['_run(1, 1)','(1, True)'],['_run(2**31 - 1, 1702766719)','(1702766719, True)','','n ≈ 2 billion: at most 40 calls']],hints:['good good … good bad bad … bad: a monotonic condition.','Find the first True.'],approach:'Binary search for the boundary.',cx:'O(log n) calls'},
{id:'bs-count',type:'code',d:1,p:'binary-search',title:'Count Occurrences in a Sorted List',prompt:'<p>Return how many times target appears in the sorted list, in O(log n). You may use the bisect module.</p>',starter:`import bisect

def count_occurrences(nums, target):
    pass`,solution:`import bisect

def count_occurrences(nums, target):
    return bisect.bisect_right(nums, target) - bisect.bisect_left(nums, target)`,tests:[['count_occurrences([1, 2, 2, 2, 3], 2)','3'],['count_occurrences([1, 3], 2)','0'],['count_occurrences([], 2)','0']],hints:['Where does the block of target values start, and where does it end?'],approach:'bisect_right − bisect_left.',cx:'O(log n)'},
{id:'bs-first-last',type:'code',d:2,p:'binary-search',title:'First and Last Position',prompt:'<p>Return <code>[first, last]</code> indexes of target in the sorted list, or <code>[-1, -1]</code>. O(log n), without bisect.</p>',starter:`def search_range(nums, target):
    pass`,solution:`def search_range(nums, target):
    def bound(left):
        lo, hi, ans = 0, len(nums) - 1, -1
        while lo <= hi:
            mid = (lo + hi) // 2
            if nums[mid] == target:
                ans = mid
                if left:
                    hi = mid - 1
                else:
                    lo = mid + 1
            elif nums[mid] < target:
                lo = mid + 1
            else:
                hi = mid - 1
        return ans
    return [bound(True), bound(False)]`,tests:[['search_range([5, 7, 7, 8, 8, 10], 8)','[3, 4]'],['search_range([5, 7, 7, 8, 8, 10], 6)','[-1, -1]'],['search_range([], 0)','[-1, -1]'],['search_range([2, 2], 2)','[0, 1]']],hints:['Two binary searches: one keeps going left after a match, the other keeps going right.'],approach:'Two boundary searches.',cx:'O(log n)'},
{id:'bs-rotated',type:'code',d:2,p:'binary-search',title:'Search in Rotated Sorted Array',prompt:'<p>A sorted list of distinct numbers was rotated (e.g. [4, 5, 6, 7, 0, 1, 2]). Return the index of target or -1, in O(log n).</p>',starter:`def search_rotated(nums, target):
    pass`,solution:`def search_rotated(nums, target):
    lo, hi = 0, len(nums) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if nums[mid] == target:
            return mid
        if nums[lo] <= nums[mid]:               # left half is sorted
            if nums[lo] <= target < nums[mid]:
                hi = mid - 1
            else:
                lo = mid + 1
        else:                                   # right half is sorted
            if nums[mid] < target <= nums[hi]:
                lo = mid + 1
            else:
                hi = mid - 1
    return -1`,tests:[['search_rotated([4, 5, 6, 7, 0, 1, 2], 0)','4'],['search_rotated([4, 5, 6, 7, 0, 1, 2], 3)','-1'],['search_rotated([1], 0)','-1'],['search_rotated([3, 1], 1)','1'],['search_rotated([5, 1, 3], 5)','0']],hints:['At least one half around mid is always sorted.','Check whether the target lies inside the sorted half; if yes go there, otherwise go to the other half.'],approach:'Binary search choosing the half by which side is sorted.',cx:'O(log n)'},
{id:'bs-rotated-min',type:'code',d:2,p:'binary-search',title:'Minimum in Rotated Sorted Array',prompt:'<p>Return the minimum of a rotated sorted list of distinct numbers, in O(log n).</p>',starter:`def find_min(nums):
    pass`,solution:`def find_min(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] > nums[hi]:
            lo = mid + 1          # the drop is to the right of mid
        else:
            hi = mid              # mid could be the minimum
    return nums[lo]`,tests:[['find_min([3, 4, 5, 1, 2])','1'],['find_min([4, 5, 6, 7, 0, 1, 2])','0'],['find_min([11, 13, 15, 17])','11'],['find_min([2, 1])','1']],hints:['Compare nums[mid] with nums[hi].','If nums[mid] > nums[hi], the minimum is right of mid.'],approach:'Binary search toward the rotation point.',cx:'O(log n)'},
{id:'bs-peak',type:'code',d:2,p:'binary-search',title:'Find a Peak Element',prompt:'<p>A peak is strictly greater than its neighbours (outside the list counts as −∞). Neighbours are never equal. Return the index of any peak in O(log n).</p>',starter:`def find_peak(nums):
    pass`,solution:`def find_peak(nums):
    lo, hi = 0, len(nums) - 1
    while lo < hi:
        mid = (lo + hi) // 2
        if nums[mid] < nums[mid + 1]:
            lo = mid + 1          # uphill to the right: a peak exists there
        else:
            hi = mid
    return lo`,post:`def _ok(nums):
    i = find_peak(nums)
    left = nums[i - 1] if i > 0 else float("-inf")
    right = nums[i + 1] if i + 1 < len(nums) else float("-inf")
    return nums[i] > left and nums[i] > right`,tests:[['_ok([1, 2, 3, 1])','True','','[1, 2, 3, 1]'],['_ok([1, 2, 1, 3, 5, 6, 4])','True','','[1, 2, 1, 3, 5, 6, 4]'],['_ok([1])','True','','[1]'],['_ok([3, 2, 1])','True','','[3, 2, 1]']],hints:['If nums[mid] < nums[mid + 1], walking right goes uphill: a peak must exist on the right.'],approach:'Binary search following the uphill direction.',cx:'O(log n)'},
{id:'bs-matrix',type:'code',d:2,p:'binary-search',title:'Search a 2D Matrix',prompt:'<p>Each row is sorted, and each row’s first value is greater than the previous row’s last. Return True if target is present, in O(log(rows × cols)).</p>',starter:`def search_matrix(matrix, target):
    pass`,solution:`def search_matrix(matrix, target):
    if not matrix or not matrix[0]:
        return False
    rows, cols = len(matrix), len(matrix[0])
    lo, hi = 0, rows * cols - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        val = matrix[mid // cols][mid % cols]   # treat it as one flat list
        if val == target:
            return True
        if val < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return False`,tests:[['search_matrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3)','True'],['search_matrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 13)','False'],['search_matrix([[]], 1)','False']],hints:['The matrix is really one sorted list cut into rows.','Index k of that list is matrix[k // cols][k % cols].'],approach:'Binary search over flattened indexes.',cx:'O(log(rows · cols))'},
{id:'bs-koko',type:'code',d:2,p:'binary-search',title:'Koko Eating Bananas',prompt:'<p>Piles of bananas; each hour Koko eats up to k bananas from one pile. Return the minimum integer k so she finishes all piles within h hours.</p><p><code>([3, 6, 7, 11], 8)</code> → <code>4</code></p>',starter:`def min_eating_speed(piles, h):
    pass`,solution:`def min_eating_speed(piles, h):
    lo, hi = 1, max(piles)
    while lo < hi:
        k = (lo + hi) // 2
        hours = sum((p + k - 1) // k for p in piles)   # ceil(p / k)
        if hours <= h:
            hi = k
        else:
            lo = k + 1
    return lo`,tests:[['min_eating_speed([3, 6, 7, 11], 8)','4'],['min_eating_speed([30, 11, 23, 4, 20], 5)','30'],['min_eating_speed([30, 11, 23, 4, 20], 6)','23'],['min_eating_speed([1000000000], 2)','500000000']],hints:['If speed k is enough, any faster speed is too.','Binary search k between 1 and max(piles); check a speed in O(n).'],approach:'Binary search on the answer with an O(n) feasibility check.',cx:'O(n log M)'},
{id:'bs-ship',type:'code',d:2,p:'binary-search',title:'Capacity to Ship Within D Days',prompt:'<p>Packages must ship in order; each day the ship carries a contiguous group with total weight ≤ capacity. Return the least capacity that ships everything within <code>days</code> days.</p>',starter:`def ship_within_days(weights, days):
    pass`,solution:`def ship_within_days(weights, days):
    def days_needed(cap):
        d, load = 1, 0
        for w in weights:
            if load + w > cap:
                d += 1
                load = 0
            load += w
        return d
    lo, hi = max(weights), sum(weights)
    while lo < hi:
        mid = (lo + hi) // 2
        if days_needed(mid) <= days:
            hi = mid
        else:
            lo = mid + 1
    return lo`,tests:[['ship_within_days([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 5)','15'],['ship_within_days([3, 2, 2, 4, 1, 4], 3)','6'],['ship_within_days([1, 2, 3, 1, 1], 4)','3']],hints:['The capacity is at least max(weights) and at most sum(weights).','For a given capacity, a greedy pass counts the days needed.'],approach:'Binary search on capacity + greedy check.',cx:'O(n log(sum))'},
{id:'bs-median-two',type:'code',d:3,p:'binary-search',title:'Median of Two Sorted Arrays',prompt:'<p>Return the median of two sorted lists, in O(log(min(n, m))).</p>',starter:`def find_median(a, b):
    pass`,solution:`def find_median(a, b):
    if len(a) > len(b):
        a, b = b, a                       # binary search the shorter list
    n, m = len(a), len(b)
    half = (n + m + 1) // 2
    lo, hi = 0, n
    while lo <= hi:
        i = (lo + hi) // 2                # take i from a, half - i from b
        j = half - i
        a_left = a[i - 1] if i > 0 else float("-inf")
        a_right = a[i] if i < n else float("inf")
        b_left = b[j - 1] if j > 0 else float("-inf")
        b_right = b[j] if j < m else float("inf")
        if a_left <= b_right and b_left <= a_right:
            if (n + m) % 2:
                return float(max(a_left, b_left))
            return (max(a_left, b_left) + min(a_right, b_right)) / 2
        if a_left > b_right:
            hi = i - 1
        else:
            lo = i + 1`,tests:[['find_median([1, 3], [2])','2.0','float'],['find_median([1, 2], [3, 4])','2.5','float'],['find_median([], [1])','1.0','float'],['find_median([0, 0], [0, 0])','0.0','float']],hints:['Merging is O(n + m). For O(log), binary search how many elements the left half takes from the shorter list.','A split is right when every left-side value ≤ every right-side value.'],approach:'Binary search the partition of the shorter array.',cx:'O(log min(n, m))'},
{id:'bs-split-array',type:'code',d:3,p:'binary-search',title:'Split Array Largest Sum',prompt:'<p>Split the list into k non-empty contiguous parts so that the largest part-sum is as small as possible. Return that sum.</p><p><code>([7, 2, 5, 10, 8], 2)</code> → <code>18</code></p>',starter:`def split_array(nums, k):
    pass`,solution:`def split_array(nums, k):
    def parts_needed(limit):
        parts, total = 1, 0
        for x in nums:
            if total + x > limit:
                parts += 1
                total = 0
            total += x
        return parts
    lo, hi = max(nums), sum(nums)
    while lo < hi:
        mid = (lo + hi) // 2
        if parts_needed(mid) <= k:
            hi = mid
        else:
            lo = mid + 1
    return lo`,tests:[['split_array([7, 2, 5, 10, 8], 2)','18'],['split_array([1, 2, 3, 4, 5], 2)','9'],['split_array([1, 4, 4], 3)','4']],hints:['Guess the answer L. Can you split into ≤ k parts with every sum ≤ L? A greedy pass tells you.','If L works, any bigger L works: binary search.'],approach:'Binary search on the answer + greedy feasibility (same shape as shipping capacity).',cx:'O(n log(sum))'}
]);
