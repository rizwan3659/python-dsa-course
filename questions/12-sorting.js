/* Topic 12 · Sorting. */
COURSE.qs('sorting',[
{id:'so-p1',type:'predict',d:1,p:'sorting',title:'Sort by two keys',code:`people = [("ann", 30), ("bob", 25), ("cat", 30)]
print(sorted(people, key=lambda p: (-p[1], p[0])))`,a:"[('ann', 30), ('cat', 30), ('bob', 25)]",why:'Age descending (negated), then name ascending for ties.'},
{id:'so-p2',type:'predict',d:2,p:'sorting',title:'Stability',code:`words = ["bb", "a", "cc", "d"]
print(sorted(words, key=len))`,a:"['a', 'd', 'bb', 'cc']",why:'Python’s sort is stable: items with equal keys keep their original order (a before d, bb before cc).'},
{id:'so-p3',type:'predict',d:1,p:'sorting',title:'Uppercase first',code:`print(sorted(["b", "A", "a"]))`,a:"['A', 'a', 'b']",why:'Strings compare by character code, and all uppercase letters come before lowercase ones.'},
{id:'so-p4',type:'predict',d:1,p:'sorting',title:'Case-insensitive sort',code:`print(sorted(["b", "A", "c"], key=str.lower))`,a:"['A', 'b', 'c']",why:'key=str.lower compares lowercase versions, but returns the original strings.'},
{id:'so-p5',type:'predict',d:1,p:'sorting',title:'One bubble pass',code:`a = [5, 1, 4, 2, 8]
for j in range(len(a) - 1):
    if a[j] > a[j + 1]:
        a[j], a[j + 1] = a[j + 1], a[j]
print(a)`,a:'[1, 4, 2, 5, 8]',why:'The 5 is carried right until it meets the bigger 8. After one pass, the largest value is at the end.'},
{id:'so-p6',type:'predict',d:2,p:'sorting',title:'One partition',code:`a = [3, 8, 2, 5, 1, 4]
pivot = a[-1]
i = 0
for j in range(len(a) - 1):
    if a[j] < pivot:
        a[i], a[j] = a[j], a[i]
        i += 1
a[i], a[-1] = a[-1], a[i]
print(a)`,a:'[3, 2, 1, 4, 8, 5]',hints:['Values smaller than 4 are swapped to the front, in the order they are found.'],why:'After partitioning, the pivot 4 is in its final position: everything left is smaller, everything right is larger.'},
{id:'so-p7',type:'predict',d:1,p:'sorting',title:'Sorting tuples',code:`print(sorted([(2, "b"), (1, "z"), (2, "a")]))`,a:"[(1, 'z'), (2, 'a'), (2, 'b')]",why:'Tuples compare element by element: first number, then the string to break ties.'},
{id:'so-c1',type:'complexity',d:1,p:'sorting',title:'Bubble sort',code:`for i in range(n):
    for j in range(n - 1 - i):
        if a[j] > a[j + 1]:
            a[j], a[j + 1] = a[j + 1], a[j]`,a:'O(n²)',why:'About n²/2 comparisons.'},
{id:'so-c2',type:'complexity',d:1,p:'divide-conquer',title:'Merge sort',code:`def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    return merge(merge_sort(a[:mid]), merge_sort(a[mid:]))`,a:'O(n log n)',why:'log n levels of halving, and each level merges n elements in total.'},
{id:'so-c3',type:'complexity',d:2,p:'sorting',title:'Insertion sort on nearly sorted input',q:'Insertion sort on a list that is already sorted except for a couple of items. Time?',code:`for i in range(1, len(a)):
    key = a[i]
    j = i - 1
    while j >= 0 and a[j] > key:
        a[j + 1] = a[j]
        j -= 1
    a[j + 1] = key`,a:'O(n)',why:'The inner while loop almost never runs: each item is nearly in place. Best case O(n).'},
{id:'so-c4',type:'complexity',d:3,p:'sorting',title:'Quick sort on sorted input',q:'Quick sort with the LAST element as pivot, on an already sorted list. Time?',code:`def quick_sort(a, lo, hi):
    if lo >= hi:
        return
    p = partition(a, lo, hi)      # pivot = a[hi]
    quick_sort(a, lo, p - 1)
    quick_sort(a, p + 1, hi)`,a:'O(n²)',why:'The pivot is always the largest, so each partition peels off just one element. Random pivots avoid this.'},
{id:'so-c5',type:'complexity',d:1,p:'sorting',title:'sorted()',code:`result = sorted(nums)`,a:'O(n log n)',why:'Timsort: O(n log n) worst case, close to O(n) on nearly sorted data.'},
{id:'so-c6',type:'complexity',d:2,p:'sorting',title:'Counting sort',q:'n integers, all between 0 and k. Time?',code:`count = [0] * (k + 1)
for x in nums:
    count[x] += 1
out = []
for v in range(k + 1):
    out.extend([v] * count[v])`,opts:['O(n log n)','O(n + k)','O(n · k)','O(k log k)'],a:1,why:'No comparisons at all: one pass to count, one pass over the k + 1 values.'},
{id:'so-c7',type:'complexity',d:2,p:'divide-conquer',title:'Merge sort space',q:'Extra <b>space</b> used by merge sort on a list?',code:`merged = []
while i < len(left) and j < len(right):
    ...`,a:'O(n)',why:'Merging needs a buffer the size of the input.'},
{id:'so-m1',type:'mcq',d:1,p:'sorting',title:'Stable sorting',q:'A sorting algorithm is <b>stable</b> if…',opts:['It never crashes','Equal elements keep their original relative order','It uses O(1) memory','It is always O(n log n)'],a:1,why:'Stability lets you sort by several keys in passes (secondary key first).'},
{id:'so-m2',type:'mcq',d:2,p:'sorting',title:'When insertion sort shines',q:'Why is insertion sort used for small or nearly sorted inputs (even inside Timsort)?',opts:['It is O(n log n)','Very little overhead, and close to O(n) when items are almost in place','It uses recursion','It is not stable'],a:1,why:'Each element moves only as far as it is out of place.'},
{id:'so-m3',type:'mcq',d:1,p:'divide-conquer',title:'Divide and conquer',q:'Merge sort’s three steps are…',opts:['Pick a pivot, partition, recurse','Split in half, sort each half, merge','Find the minimum, swap, repeat','Count, prefix-sum, place'],a:1,why:'The work happens in the merge.'},
{id:'so-m4',type:'mcq',d:2,p:'sorting',title:'Pivot choice',q:'How do practical quick sorts avoid the O(n²) worst case?',opts:['They do not','Random pivot or median-of-three, so bad splits are very unlikely','They sort twice','They use a stack'],a:1,why:'Expected O(n log n) for any input.'},
{id:'so-m5',type:'mcq',d:3,p:'sorting',title:'The comparison-sort limit',q:'Any sort that only compares pairs of elements needs, in the worst case, at least…',opts:['O(n) comparisons','about n log n comparisons','n² comparisons','log n comparisons'],a:1,why:'There are n! orderings, and each comparison at best halves the possibilities: log₂(n!) ≈ n log n. Counting sort beats it by not comparing.'},
{id:'so-m6',type:'mcq',d:1,p:'sorting',title:'Python’s sort',q:'Which is true about list.sort() and sorted()?',opts:['They are unstable quick sorts','They use Timsort: stable, O(n log n) worst case','They are O(n²)','They only work on numbers'],a:1,why:'Any comparable items, and a key function for custom orders.'},
{id:'so-ch1',type:'choose',d:2,p:'sorting',title:'Sorting ages',q:'Sort 10 million ages (integers 0–120).',opts:['Bubble sort','Counting sort','Insertion sort','Selection sort'],a:1,why:'Small value range: O(n + k) with k = 121.'},
{id:'so-ch2',type:'choose',d:2,p:'sorting',title:'Guaranteed and stable',q:'You need a guaranteed O(n log n) sort that is also stable, on a linked list.',opts:['Quick sort','Merge sort','Heap sort','Selection sort'],a:1,why:'Merge sort is stable, worst-case O(n log n), and needs no random access.'},
{id:'so-ch3',type:'choose',d:2,p:'sorting',title:'Almost sorted already',q:'A list of 50 items is already sorted except for one item at the end.',opts:['Insertion sort','Quick sort with last pivot','Selection sort','Merge sort'],a:0,why:'Only the last item moves: about O(n) work.'},
{id:'so-dr1',type:'dryrun',d:1,p:'sorting',title:'Bubble sort passes',code:`a = [4, 3, 2, 1]
n = len(a)
for i in range(n):
    for j in range(n - 1 - i):
        if a[j] > a[j + 1]:
            a[j], a[j + 1] = a[j + 1], a[j]`,cols:['i','a'],given:[0],rows:[['0','[3, 2, 1, 4]'],['1','[2, 1, 3, 4]'],['2','[1, 2, 3, 4]'],['3','[1, 2, 3, 4]']],why:'Each pass carries the largest remaining value to the end.'},
{id:'so-dr2',type:'dryrun',d:1,p:'sorting',title:'Selection sort passes',code:`a = [3, 1, 2]
for i in range(len(a)):
    m = i
    for j in range(i + 1, len(a)):
        if a[j] < a[m]:
            m = j
    a[i], a[m] = a[m], a[i]`,cols:['i','a'],given:[0],rows:[['0','[1, 3, 2]'],['1','[1, 2, 3]'],['2','[1, 2, 3]']],why:'Each pass selects the smallest remaining value and swaps it into position i.'},
{id:'so-dr3',type:'dryrun',d:2,p:'sorting',title:'Insertion sort passes',code:`a = [5, 2, 4, 1]
for i in range(1, len(a)):
    key = a[i]
    j = i - 1
    while j >= 0 and a[j] > key:
        a[j + 1] = a[j]
        j -= 1
    a[j + 1] = key`,cols:['key','a'],rows:[['2','[2, 5, 4, 1]'],['4','[2, 4, 5, 1]'],['1','[1, 2, 4, 5]']],why:'The left part is always sorted; each key slides left to its place.'},
{id:'so-b1',type:'blanks',d:1,p:'sorting',title:'Complete insertion sort',code:`def insertion_sort(a):
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and ______:
            a[j + 1] = ______
            j -= 1
        a[j + 1] = ______
    return a`,blanks:[['a[j] > key'],['a[j]'],['key']],tests:[['insertion_sort([5, 2, 4, 1])','[1, 2, 4, 5]'],['insertion_sort([])','[]'],['insertion_sort([2, 2, 1])','[1, 2, 2]']],why:'Shift bigger items right, then drop the key into the gap.'},
{id:'so-b2',type:'blanks',d:2,p:'divide-conquer',title:'Complete the merge',code:`def merge(left, right):
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1
    return out + ______ + ______`,blanks:[['left[i:]'],['right[j:]']],tests:[['merge([1, 4], [2, 3, 9])','[1, 2, 3, 4, 9]'],['merge([], [1])','[1]']],why:'One side runs out first; whatever remains on the other side is already sorted.'},
{id:'so-b3',type:'blanks',d:1,p:'sorting',title:'Complete the sort key',code:`def by_score(students):
    # highest score first; ties broken by name A→Z
    return sorted(students, key=lambda s: ______)`,blanks:[['(-s[1], s[0])','(-s[1],s[0])']],tests:[['by_score([("bo", 80), ("al", 90), ("cy", 80)])','[("al", 90), ("bo", 80), ("cy", 80)]']],why:'Negate a number to sort it descending inside a tuple key.'},
{id:'so-d1',type:'debug',d:1,p:'sorting',title:'Index out of range',code:`def bubble_sort(a):
    n = len(a)
    for i in range(n):
        for j in range(n - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
    return a`,opts:['The outer loop should run n − 1 times only','The inner loop goes one step too far, so a[j + 1] can be past the end: use range(n - 1 - i)','> should be <','It should return None'],a:1,why:'j + 1 must stay ≤ n − 1.',fix:`def bubble_sort(a):
    n = len(a)
    for i in range(n):
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
    return a`,tests:[['bubble_sort([3, 1, 2])','[1, 2, 3]']]},
{id:'so-d2',type:'debug',d:2,p:'divide-conquer',title:'Merge sort loses numbers',code:`def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out`,opts:['mid is wrong','The leftovers of one half are never appended after the loop','<= should be <','The base case should be len(a) == 0'],a:1,why:'merge_sort([2, 1]) returns [1]. Add <code>out + left[i:] + right[j:]</code>.',fix:`def merge_sort(a):
    if len(a) <= 1:
        return a
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i]); i += 1
        else:
            out.append(right[j]); j += 1
    return out + left[i:] + right[j:]`,tests:[['merge_sort([2, 1])','[1, 2]'],['merge_sort([5, 3, 8, 1])','[1, 3, 5, 8]']]},
{id:'so-d3',type:'debug',d:1,p:'sorting',title:'k-th largest, off by one',code:`def kth_largest(nums, k):
    return sorted(nums, reverse=True)[k]`,opts:['reverse=True is wrong','k is 1-based (k = 1 means the largest) but the index is 0-based: use [k - 1]','sorted modifies nums','It should use max()'],a:1,why:'kth_largest([3, 1, 2], 1) should be 3.',fix:`def kth_largest(nums, k):
    return sorted(nums, reverse=True)[k - 1]`,tests:[['kth_largest([3, 1, 2], 1)','3'],['kth_largest([3, 1, 2], 3)','1']]},
{id:'so-bubble',type:'code',d:1,p:'sorting',title:'Bubble Sort',prompt:'<p>Sort the list in place with bubble sort and return it. Stop early if a pass makes no swaps.</p>',starter:`def bubble_sort(a):
    pass`,solution:`def bubble_sort(a):
    n = len(a)
    for i in range(n):
        swapped = False
        for j in range(n - 1 - i):
            if a[j] > a[j + 1]:
                a[j], a[j + 1] = a[j + 1], a[j]
                swapped = True
        if not swapped:
            break
    return a`,tests:[['bubble_sort([5, 1, 4, 2, 8])','[1, 2, 4, 5, 8]'],['bubble_sort([])','[]'],['bubble_sort([1, 2, 3])','[1, 2, 3]'],['bubble_sort([2, 2, 1])','[1, 2, 2]']],constraints:['0 ≤ len(a) ≤ 1000'],mistakes:['Comparing a[i] with a[i + 1] up to the very end, causing IndexError.','Not stopping early when a pass makes no swaps.'],followup:'Count the number of swaps (it equals the number of inversions).',hints:['Compare neighbours; swap when out of order.','After pass i, the last i items are in place.'],approach:'Repeated neighbour swaps with an early exit.',cx:'O(n²) worst, O(n) best'},
{id:'so-selection',type:'code',d:1,p:'sorting',title:'Selection Sort',prompt:'<p>Sort in place with selection sort and return the list.</p>',starter:`def selection_sort(a):
    pass`,solution:`def selection_sort(a):
    for i in range(len(a)):
        m = i
        for j in range(i + 1, len(a)):
            if a[j] < a[m]:
                m = j
        a[i], a[m] = a[m], a[i]
    return a`,tests:[['selection_sort([64, 25, 12, 22, 11])','[11, 12, 22, 25, 64]'],['selection_sort([])','[]'],['selection_sort([3, 3, 1])','[1, 3, 3]'],['selection_sort([2, 1])','[1, 2]']],constraints:['0 ≤ len(a) ≤ 1000'],mistakes:['Swapping on every smaller element instead of once per pass.','Searching for the minimum from index 0 every time.'],followup:'Is selection sort stable? Find an example.',hints:['Find the minimum of a[i:], swap it into position i.','For each position i, find the smallest element in a[i:] and swap it into position i.'],approach:'Select the minimum each pass.',cx:'O(n²)'},
{id:'so-insertion',type:'code',d:1,p:'sorting',title:'Insertion Sort',prompt:'<p>Sort in place with insertion sort and return the list.</p>',starter:`def insertion_sort(a):
    pass`,solution:`def insertion_sort(a):
    for i in range(1, len(a)):
        key = a[i]
        j = i - 1
        while j >= 0 and a[j] > key:
            a[j + 1] = a[j]
            j -= 1
        a[j + 1] = key
    return a`,tests:[['insertion_sort([12, 11, 13, 5, 6])','[5, 6, 11, 12, 13]'],['insertion_sort([])','[]'],['insertion_sort([1])','[1]'],['insertion_sort([3, 1, 2])','[1, 2, 3]']],constraints:['0 ≤ len(a) ≤ 1000'],mistakes:['Swapping repeatedly instead of shifting and inserting once.','Moving equal elements past each other (breaks stability).'],followup:'Use binary search to find the insertion point.',hints:['Keep the left part sorted. Take the next item and shift bigger ones right until its place opens up.','Take a[i], shift larger elements of the sorted prefix one place right, then drop a[i] into the gap.'],approach:'Grow a sorted prefix.',cx:'O(n²) worst, O(n) best'},
{id:'so-merge-sort',type:'code',d:2,p:'divide-conquer',title:'Merge Sort',prompt:'<p>Return a new sorted list using merge sort (no sorted()/sort()).</p>',starter:`def merge_sort(a):
    pass`,solution:`def merge_sort(a):
    if len(a) <= 1:
        return a[:]
    mid = len(a) // 2
    left, right = merge_sort(a[:mid]), merge_sort(a[mid:])
    out, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            out.append(left[i])
            i += 1
        else:
            out.append(right[j])
            j += 1
    return out + left[i:] + right[j:]`,tests:[['merge_sort([38, 27, 43, 3, 9, 82, 10])','[3, 9, 10, 27, 38, 43, 82]'],['merge_sort([])','[]'],['merge_sort([2, 1, 2, 1])','[1, 1, 2, 2]'],['merge_sort(list(range(20000, 0, -1))) == list(range(1, 20001))','True','','20,000 items']],constraints:['0 ≤ len(a) ≤ 10<sup>5</sup>'],mistakes:['Merging with list.pop(0), which is O(n) per pop.','Forgetting to copy what is left of one half.'],followup:'Make it stable and prove that it is.',hints:['Base case: 0 or 1 items are sorted.','Sort each half recursively, then merge with two pointers.'],approach:'Divide and conquer.',cx:'O(n log n) time, O(n) space'},
{id:'so-quick-sort',type:'code',d:2,p:'divide-conquer',title:'Quick Sort',prompt:'<p>Sort the list <b>in place</b> with quick sort (Lomuto or Hoare partition) and return it.</p>',starter:`def quick_sort(a):
    pass`,solution:`import random

def quick_sort(a):
    def sort(lo, hi):
        if lo >= hi:
            return
        r = random.randint(lo, hi)          # random pivot avoids the O(n²) trap
        a[r], a[hi] = a[hi], a[r]
        pivot, i = a[hi], lo
        for j in range(lo, hi):
            if a[j] < pivot:
                a[i], a[j] = a[j], a[i]
                i += 1
        a[i], a[hi] = a[hi], a[i]
        sort(lo, i - 1)
        sort(i + 1, hi)
    sort(0, len(a) - 1)
    return a`,tests:[['quick_sort([10, 7, 8, 9, 1, 5])','[1, 5, 7, 8, 9, 10]'],['quick_sort([])','[]'],['quick_sort([3, 3, 3])','[3, 3, 3]'],['quick_sort(list(range(3000))) == list(range(3000))','True','','3,000 already-sorted items (a fixed last-element pivot recurses too deep)']],constraints:['0 ≤ len(a) ≤ 10<sup>5</sup>'],mistakes:['Always picking the first element as pivot: O(n²) on sorted input.','Partition loops that never end when all values are equal.'],followup:'Use a random pivot and a three-way partition for many duplicates.',hints:['Partition: move everything smaller than the pivot to the left, then put the pivot right after them.','Recurse on the two sides. Pick a random pivot to stay fast on sorted input.'],approach:'Partition around a random pivot, recurse.',cx:'O(n log n) expected, O(n²) worst'},
{id:'so-counting',type:'code',d:1,p:'sorting',title:'Counting Sort',prompt:'<p>All values are integers in 0..k. Return them sorted without comparisons.</p>',starter:`def counting_sort(nums, k):
    pass`,solution:`def counting_sort(nums, k):
    count = [0] * (k + 1)
    for x in nums:
        count[x] += 1
    out = []
    for v in range(k + 1):
        out.extend([v] * count[v])
    return out`,tests:[['counting_sort([4, 2, 2, 8, 3, 3, 1], 8)','[1, 2, 2, 3, 3, 4, 8]'],['counting_sort([], 5)','[]'],['counting_sort([0, 0], 0)','[0, 0]'],['counting_sort([3, 0, 3, 1], 3)','[0, 1, 3, 3]']],constraints:['0 ≤ len(nums) ≤ 10<sup>6</sup>','0 ≤ nums[i] ≤ k ≤ 10<sup>6</sup>'],mistakes:['Allocating counts of size max(nums) when k is given (or vice versa).','Comparing elements (that is not counting sort).'],followup:'Make it stable for sorting records by a small integer key.',hints:['Count how many of each value there are.','Count each value in a list of size k + 1, then write each value count times.'],approach:'Count per value, then write values out in order.',cx:'O(n + k)'},
{id:'so-people',type:'code',d:1,p:'sorting',title:'Sort People',prompt:'<p>Sort (name, age) pairs by age ascending; equal ages by name alphabetically.</p>',starter:`def sort_people(people):
    pass`,solution:`def sort_people(people):
    return sorted(people, key=lambda p: (p[1], p[0]))`,tests:[['sort_people([("cy", 30), ("al", 25), ("bo", 30)])','[("al", 25), ("bo", 30), ("cy", 30)]'],['sort_people([])','[]'],['sort_people([("b", 1), ("a", 1)])','[("a", 1), ("b", 1)]'],['sort_people([("x", 9)])','[("x", 9)]']],constraints:['0 ≤ len(people) ≤ 10<sup>5</sup>'],mistakes:['Sorting twice in the wrong order (sort by name first, then by age, relies on stability).','Sorting by name descending.'],followup:'Sort by age descending but names ascending.',hints:['A tuple key sorts by the first item, then the second.','Use sorted(people, key=lambda p: (p[1], p[0])).'],approach:'sorted with a tuple key.',cx:'O(n log n)'},
{id:'so-meetings',type:'code',d:1,p:'intervals',title:'Can Attend All Meetings',prompt:'<p>Given meeting intervals [start, end], return True if no two overlap (a meeting ending at t and one starting at t do not overlap).</p>',starter:`def can_attend(intervals):
    pass`,solution:`def can_attend(intervals):
    intervals = sorted(intervals)
    for i in range(1, len(intervals)):
        if intervals[i][0] < intervals[i - 1][1]:
            return False
    return True`,tests:[['can_attend([[0, 30], [5, 10], [15, 20]])','False'],['can_attend([[7, 10], [2, 4]])','True'],['can_attend([])','True'],['can_attend([[1, 2], [2, 3]])','True']],constraints:['0 ≤ len(intervals) ≤ 10<sup>4</sup>'],mistakes:['Not sorting first.','Using >= when comparing, which flags back-to-back meetings.'],followup:'Return the minimum number of rooms (hp-meeting-rooms).',hints:['After sorting by start time, only neighbours can overlap.','Sort by start time, then compare each meeting with the one before it.'],approach:'Sort by start; compare each start with the previous end.',cx:'O(n log n)'},
{id:'so-min-diff',type:'code',d:1,p:'sorting',title:'Minimum Absolute Difference Pairs',prompt:'<p>Return all pairs [a, b] (a &lt; b) of distinct integers with the minimum absolute difference, in ascending order.</p>',starter:`def min_abs_pairs(arr):
    pass`,solution:`def min_abs_pairs(arr):
    arr = sorted(arr)
    best = min(arr[i + 1] - arr[i] for i in range(len(arr) - 1))
    return [[arr[i], arr[i + 1]] for i in range(len(arr) - 1) if arr[i + 1] - arr[i] == best]`,tests:[['min_abs_pairs([4, 2, 1, 3])','[[1, 2], [2, 3], [3, 4]]'],['min_abs_pairs([1, 3, 6, 10, 15])','[[1, 3]]'],['min_abs_pairs([3, 8, -10, 23, 19, -4, -14, 27])','[[-14, -10], [19, 23], [23, 27]]'],['min_abs_pairs([1, 2])','[[1, 2]]']],constraints:['2 ≤ len(arr) ≤ 10<sup>5</sup>','values are distinct'],mistakes:['Comparing every pair: O(n²).','Forgetting to sort first.'],followup:'Return just the minimum difference for a stream of insertions.',hints:['After sorting, the closest pairs are neighbours.','After sorting, the closest pairs are neighbours.'],approach:'Sort, then scan adjacent differences.',cx:'O(n log n)'},
{id:'so-relative',type:'code',d:1,p:'sorting',title:'Relative Sort Array',prompt:'<p>Sort <code>arr1</code> so that values appear in the order given by <code>arr2</code>; values not in arr2 go at the end in ascending order.</p>',starter:`def relative_sort(arr1, arr2):
    pass`,solution:`def relative_sort(arr1, arr2):
    rank = {v: i for i, v in enumerate(arr2)}
    return sorted(arr1, key=lambda x: (rank.get(x, len(arr2)), x))`,tests:[['relative_sort([2, 3, 1, 3, 2, 4, 6, 7, 9, 2, 19], [2, 1, 4, 3, 9, 6])','[2, 2, 2, 1, 4, 3, 3, 9, 6, 7, 19]'],['relative_sort([28, 6, 22, 8, 44, 17], [22, 28, 8, 6])','[22, 28, 8, 6, 17, 44]'],['relative_sort([3, 2, 1], [])','[1, 2, 3]'],['relative_sort([1, 1, 2], [1, 2])','[1, 1, 2]']],constraints:['1 ≤ len(arr1), len(arr2) ≤ 1000','values of arr2 are distinct and all appear in arr1'],mistakes:['Sorting the leftover values in arr1 order instead of ascending.','Using arr2.index() inside the key: O(n · m).'],followup:'Do it with counting sort when values are small.',hints:['Give every value in arr2 a rank; everything else gets a rank after all of them.','Map each value of arr2 to its position, then sort with key (position or len(arr2), value).'],approach:'Custom sort key (rank, value).',cx:'O(n log n)'},
{id:'so-kth-largest',type:'code',d:2,p:'divide-conquer',title:'Kth Largest Element',prompt:'<p>Return the k-th largest element (k = 1 is the maximum). Try to beat O(n log n): quickselect averages O(n).</p>',starter:`def find_kth_largest(nums, k):
    pass`,solution:`import random

def find_kth_largest(nums, k):
    target = len(nums) - k               # index in ascending order
    lo, hi = 0, len(nums) - 1
    nums = nums[:]
    while True:
        r = random.randint(lo, hi)
        nums[r], nums[hi] = nums[hi], nums[r]
        pivot, i = nums[hi], lo
        for j in range(lo, hi):
            if nums[j] < pivot:
                nums[i], nums[j] = nums[j], nums[i]
                i += 1
        nums[i], nums[hi] = nums[hi], nums[i]
        if i == target:
            return nums[i]
        if i < target:
            lo = i + 1
        else:
            hi = i - 1`,tests:[['find_kth_largest([3, 2, 1, 5, 6, 4], 2)','5'],['find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)','4'],['find_kth_largest([1], 1)','1'],['find_kth_largest([5, 5, 5], 2)','5']],constraints:['1 ≤ k ≤ len(nums) ≤ 10<sup>5</sup>'],mistakes:['Sorting ascending and returning nums[k].','A quickselect without random pivots, which is slow on sorted input.'],followup:'Solve it with a min-heap of size k and compare.',hints:['Sorting works in O(n log n). A min-heap of size k gives O(n log k).','Quickselect: partition like quick sort, but recurse into only the side that contains the target index.'],approach:'Quickselect (or heap of size k).',cx:'O(n) average'},
{id:'so-largest-number',type:'code',d:2,p:'sorting',title:'Largest Number',prompt:'<p>Arrange the non-negative integers to form the largest number; return it as a string.</p><p><code>[3, 30, 34, 5, 9]</code> → <code>"9534330"</code></p>',starter:`def largest_number(nums):
    pass`,solution:`from functools import cmp_to_key

def largest_number(nums):
    s = [str(x) for x in nums]
    s.sort(key=cmp_to_key(lambda a, b: (b + a > a + b) - (b + a < a + b)))
    result = "".join(s)
    return "0" if result[0] == "0" else result`,tests:[['largest_number([10, 2])','"210"'],['largest_number([3, 30, 34, 5, 9])','"9534330"'],['largest_number([0, 0])','"0"'],['largest_number([1])','"1"']],constraints:['1 ≤ len(nums) ≤ 100','0 ≤ nums[i] ≤ 10<sup>9</sup>'],mistakes:['Sorting numerically or as plain strings.','Returning "00" for [0, 0].'],followup:'Same comparator idea: the smallest number instead.',hints:['Which should come first, "3" or "30"? Compare "330" with "303".','Sort with a comparator: a before b if a + b > b + a. functools.cmp_to_key turns a comparator into a key.'],approach:'Custom comparator sort.',cx:'O(n log n · L)'},
{id:'so-h-index',type:'code',d:2,p:'sorting',title:'H-Index',prompt:'<p>The h-index is the largest h such that the researcher has at least h papers with ≥ h citations each.</p>',starter:`def h_index(citations):
    pass`,solution:`def h_index(citations):
    c = sorted(citations, reverse=True)
    h = 0
    while h < len(c) and c[h] >= h + 1:
        h += 1
    return h`,tests:[['h_index([3, 0, 6, 1, 5])','3'],['h_index([1, 3, 1])','1'],['h_index([0])','0'],['h_index([10, 10])','2']],constraints:['1 ≤ len(citations) ≤ 5000'],mistakes:['Off-by-one between "at least h papers" and indexes.','Sorting ascending and counting from the wrong end.'],followup:'Do it in O(n) with counting.',hints:['Sort descending: the i-th paper (1-based) has c[i − 1] citations.','h grows while the h-th paper still has at least h citations.'],approach:'Sort descending and scan.',cx:'O(n log n)'},
{id:'so-inversions',type:'code',d:3,p:'divide-conquer',title:'Count Inversions',prompt:'<p>Count pairs i &lt; j with nums[i] &gt; nums[j], in O(n log n).</p>',starter:`def count_inversions(nums):
    pass`,solution:`def count_inversions(nums):
    def sort(a):
        if len(a) <= 1:
            return a, 0
        mid = len(a) // 2
        left, x = sort(a[:mid])
        right, y = sort(a[mid:])
        out, i, j, inv = [], 0, 0, x + y
        while i < len(left) and j < len(right):
            if left[i] <= right[j]:
                out.append(left[i]); i += 1
            else:
                out.append(right[j]); j += 1
                inv += len(left) - i         # every remaining left item is bigger
        return out + left[i:] + right[j:], inv
    return sort(nums)[1]`,tests:[['count_inversions([2, 4, 1, 3, 5])','3'],['count_inversions([1, 2, 3])','0'],['count_inversions([3, 2, 1])','3'],['count_inversions(list(range(3000, 0, -1)))','3000 * 2999 // 2','','3,000 items (O(n²) is too slow)']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>'],mistakes:['Adding 1 instead of the number of remaining left elements when a right element is smaller.','Two nested loops: O(n²).'],followup:'Count inversions with a Fenwick tree (rq-count-smaller).',hints:['Checking every pair is O(n²).','During merge sort, when you take from the right half, every element still waiting in the left half forms an inversion with it.'],approach:'Merge sort that counts while merging.',cx:'O(n log n)'}
]);

/* ---------- second hard problem (added with the v2 backfill) ---------- */
COURSE.qs('sorting',[
{id:'so-max-gap',type:'code',d:3,p:'sorting',title:'Maximum Gap',prompt:'<p>Return the largest difference between two neighbours in the <b>sorted</b> order of the list, or 0 for fewer than two numbers. Try to do it in O(n) time with buckets instead of sorting.</p>',prereq:['so-counting'],
constraints:['1 ≤ len(nums) ≤ 10<sup>5</sup>','0 ≤ nums[i] ≤ 10<sup>9</sup>'],
starter:`def maximum_gap(nums):
    # your code here
    pass`,solution:`def maximum_gap(nums):
    n = len(nums)
    if n < 2:
        return 0
    lo, hi = min(nums), max(nums)
    if lo == hi:
        return 0
    size = max(1, (hi - lo) // (n - 1))          # the answer is at least this big
    count = (hi - lo) // size + 1
    low = [None] * count
    high = [None] * count
    for x in nums:
        b = (x - lo) // size
        low[b] = x if low[b] is None else min(low[b], x)
        high[b] = x if high[b] is None else max(high[b], x)
    best, previous = 0, lo
    for b in range(count):                       # the gap lives between buckets
        if low[b] is None:
            continue
        best = max(best, low[b] - previous)
        previous = high[b]
    return best`,
tests:[['maximum_gap([3, 6, 9, 1])','3'],['maximum_gap([10])','0'],['maximum_gap([1, 10000000])','9999999'],['maximum_gap([1, 1, 1, 1])','0'],['maximum_gap([100, 3, 2, 1])','97'],['maximum_gap(list(range(0, 300000, 3)))','3'],['maximum_gap([1, 3, 100, 101, 102, 200])','98']],
hints:['Sorting gives O(n log n). For O(n): with n numbers between lo and hi, the biggest gap is at least (hi − lo) / (n − 1).','Make buckets of that width. The biggest gap can never be inside one bucket, so keep only each bucket’s min and max and compare neighbouring non-empty buckets.'],approach:'Pigeonhole bucketing: track min and max per bucket and scan the buckets.',cx:'O(n) time, O(n) space',
mistakes:['Comparing neighbours in the original (unsorted) order.','A bucket width of 0 when all numbers are close (use max(1, …)).','Looking for the gap inside a bucket instead of between buckets.'],
followup:'Solve it with radix sort and compare the two O(n) approaches.'},
]);
