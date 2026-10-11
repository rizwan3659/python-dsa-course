/* Topic 4 · Arrays / Python lists — reference question bank. */
COURSE.qs('arrays',[
/* ---------- predict the output ---------- */
{id:'arr-p1',type:'predict',d:1,p:'traversal',title:'Doubling in place',code:`x = [1, 2, 3]
for i in range(len(x)):
    x[i] *= 2
print(x)`,a:'[2, 4, 6]',hints:['range(len(x)) gives the indexes 0, 1, 2.','x[i] *= 2 writes back into the list at that index.'],why:'Looping over indexes lets you change the list itself: each <code>x[i]</code> is replaced by its double.'},
{id:'arr-p2',type:'predict',d:1,p:'traversal',title:'Negative index and slice',code:`a = [10, 20, 30, 40, 50]
print(a[-2], a[1:3])`,opts:['40 [20, 30]','40 [20, 30, 40]','30 [20, 30]','20 [10, 20]'],a:0,why:'<code>a[-2]</code> is the second from the end (40). A slice includes the start and excludes the stop: indexes 1 and 2.'},
{id:'arr-p3',type:'predict',d:1,p:'traversal',title:'Changing the loop variable',code:`nums = [1, 2, 3]
for n in nums:
    n = n * 10
print(nums)`,opts:['[10, 20, 30]','[1, 2, 3]','[1, 2, 3, 10, 20, 30]','Error'],a:1,why:'<code>n</code> is just a name bound to each value in turn. <code>n = n * 10</code> rebinds the name; the list is never touched. To change the list, assign to <code>nums[i]</code>.'},
{id:'arr-p4',type:'predict',d:1,p:'traversal',title:'insert() shifts',code:`a = [5, 3, 8]
a.insert(1, 7)
print(a)`,a:'[5, 7, 3, 8]',hints:['insert(i, x) puts x at index i.','Everything from index 1 onward moves one place right.'],why:'7 goes to index 1; 3 and 8 shift right. That shifting is why insert is O(n).'},
{id:'arr-p5',type:'predict',d:1,p:'traversal',title:'pop() returns the item',code:`a = [4, 5, 6]
last = a.pop()
print(last, a)`,opts:['6 [4, 5]','[4, 5] 6','4 [5, 6]','6 [4, 5, 6]'],a:0,why:'<code>pop()</code> removes and returns the last item in O(1).'},
{id:'arr-p6',type:'predict',d:1,p:'traversal',title:'remove() takes the first match',code:`a = [1, 2, 1, 2]
a.remove(2)
print(a)`,a:'[1, 1, 2]',why:'<code>remove(x)</code> deletes the <b>first</b> occurrence of the value x (it searches: O(n)).'},
{id:'arr-p7',type:'predict',d:1,p:'python',title:'append vs extend',code:`a = [1, 2]
b = [1, 2]
a.append([3, 4])
b.extend([3, 4])
print(len(a), len(b))`,opts:['3 4','4 4','3 3','4 3'],a:0,why:'<code>append</code> adds one item (the whole list <code>[3, 4]</code> becomes a single element). <code>extend</code> adds each item.'},
{id:'arr-p8',type:'predict',d:2,p:'python',title:'Slice assignment',code:`a = [0, 0, 0, 0, 0]
a[1:3] = [9]
print(a)`,a:'[0, 9, 0, 0]',hints:['a[1:3] is two elements: indexes 1 and 2.','They are replaced by a list of ONE element, so the list shrinks.'],why:'Assigning to a slice replaces that whole range with the new items, even if the length differs.'},
{id:'arr-p9',type:'predict',d:2,p:'python',title:'The grid trap',code:`grid = [[0] * 3] * 2
grid[0][0] = 1
print(grid)`,opts:['[[1, 0, 0], [0, 0, 0]]','[[1, 0, 0], [1, 0, 0]]','[[1, 1, 1], [0, 0, 0]]','Error'],a:1,why:'<code>[row] * 2</code> repeats the <b>reference</b> to one inner list. Both rows are the same object. Build grids with <code>[[0] * 3 for _ in range(2)]</code>.'},
{id:'arr-p10',type:'predict',d:2,p:'python',title:'Reverse, then slice',code:`a = [1, 2, 3, 4, 5]
print(a[::-1][1:3])`,a:'[4, 3]',why:'<code>a[::-1]</code> is <code>[5, 4, 3, 2, 1]</code>; its indexes 1 and 2 hold 4 and 3.'},
{id:'arr-p11',type:'predict',d:1,p:'traversal',title:'enumerate with start',code:`for i, v in enumerate(["a", "b", "c"], start=1):
    print(i, v)`,a:'1 a\n2 b\n3 c',why:'<code>enumerate</code> yields (index, value) pairs; <code>start=1</code> only changes the numbering.'},
{id:'arr-p12',type:'predict',d:1,p:'traversal',title:'One past the end',code:`a = [1, 2, 3]
print(a[3])`,opts:['3','None','IndexError','[]'],a:2,why:'Valid indexes are 0 to len − 1 (here 0, 1, 2). Index 3 raises <code>IndexError</code>.'},
{id:'arr-p13',type:'predict',d:1,p:'traversal',title:'Slices never go out of range',code:`a = [1, 2, 3]
print(a[1:10])`,opts:['IndexError','[2, 3]','[2, 3, None]','[1, 2, 3]'],a:1,why:'Slices clamp to the list bounds, so an over-long stop is fine. Only single-index access raises IndexError.'},
{id:'arr-p14',type:'predict',d:1,p:'sorting',title:'sorted() vs sort()',code:`a = [3, 1, 2]
b = sorted(a)
a.sort(reverse=True)
print(a, b)`,a:'[3, 2, 1] [1, 2, 3]',why:'<code>sorted(a)</code> returns a new list; <code>a.sort()</code> sorts <code>a</code> in place (and returns None).'},
{id:'arr-p15',type:'predict',d:2,p:'two-pointers',title:'Where do the pointers stop?',code:`nums = [1, 2, 3, 4, 5]
left, right = 0, len(nums) - 1
while left < right:
    nums[left], nums[right] = nums[right], nums[left]
    left += 1
    right -= 1
print(nums, left, right)`,a:'[5, 4, 3, 2, 1] 2 2',hints:['Trace the pairs swapped: (0, 4), then (1, 3).','After two swaps both pointers are at the middle index.'],why:'Two swaps reverse a 5-element list; the loop stops when <code>left == right == 2</code>.'},
{id:'arr-p16',type:'predict',d:1,p:'prefix-sum',title:'Building running totals',code:`nums = [2, 4, 1]
prefix = [0]
for n in nums:
    prefix.append(prefix[-1] + n)
print(prefix)`,a:'[0, 2, 6, 7]',why:'Each new entry is the previous total plus the next number. <code>prefix[i]</code> is the sum of the first i numbers.'},

/* ---------- complexity ---------- */
{id:'arr-c1',type:'complexity',d:1,p:'big-o',title:'Reading by index',code:`value = nums[i]`,a:'O(1)',why:'A list stores elements side by side, so position i is at a computable address: one jump, whatever the size.'},
{id:'arr-c2',type:'complexity',d:1,p:'big-o',title:'One pass',code:`total = 0
for x in nums:
    total += x`,a:'O(n)',why:'The body runs once per element.'},
{id:'arr-c3',type:'complexity',d:2,p:'big-o',title:'Inserting at the front in a loop',code:`result = []
for x in nums:
    result.insert(0, x)`,a:'O(n²)',hints:['How much work is one insert(0, x) when result has k items?'],why:'Each <code>insert(0, x)</code> shifts every element already in <code>result</code>: 0 + 1 + … + (n − 1) ≈ n²/2. Use <code>append</code> and reverse once, or a deque.'},
{id:'arr-c4',type:'complexity',d:1,p:'big-o',title:'Appending in a loop',code:`result = []
for x in nums:
    result.append(x * 2)`,a:'O(n)',why:'Append is O(1) amortized, done n times.'},
{id:'arr-c5',type:'complexity',d:1,p:'big-o',title:'Every pair',code:`count = 0
for i in range(len(nums)):
    for j in range(i + 1, len(nums)):
        if nums[i] + nums[j] == 0:
            count += 1`,a:'O(n²)',why:'About n²/2 pairs. Halving does not change the class: still quadratic.'},
{id:'arr-c6',type:'complexity',d:2,p:'big-o',title:'The hidden loop',code:`common = []
for x in a:          # len(a) = n
    if x in b:       # len(b) = m, b is a list
        common.append(x)`,opts:['O(n)','O(n + m)','O(n · m)','O(n log m)'],a:'O(n · m)',why:'<code>x in b</code> scans the list b: O(m) per check, n times. Converting b to a set first makes it O(n + m).'},
{id:'arr-c7',type:'complexity',d:2,p:'big-o',title:'Slicing inside a loop',code:`for i in range(len(nums)):
    rest = nums[i:]
    print(sum(rest))`,a:'O(n²)',why:'<code>nums[i:]</code> copies n − i elements and <code>sum</code> reads them again. Summed over all i: about n²/2. A running total (or suffix sums) makes it O(n).'},
{id:'arr-c8',type:'complexity',d:2,p:'big-o',title:'Sort, then one scan',code:`def has_duplicate(nums):
    nums.sort()
    for i in range(1, len(nums)):
        if nums[i] == nums[i - 1]:
            return True
    return False`,a:'O(n log n)',why:'Sorting is O(n log n); the scan is O(n). The bigger term wins.'},
{id:'arr-c9',type:'complexity',d:2,p:'sliding-window',title:'Sliding a window',code:`window = sum(nums[:k])
best = window
for i in range(k, len(nums)):
    window += nums[i] - nums[i - k]
    best = max(best, window)`,a:'O(n)',why:'The first sum is O(k) once; each slide is O(1). Total O(k + n) = O(n).'},
{id:'arr-c10',type:'complexity',d:1,p:'prefix-sum',title:'Space for prefix sums',q:'What is the <b>extra space</b> used by a prefix-sum array for n numbers?',code:`prefix = [0] * (len(nums) + 1)
for i in range(len(nums)):
    prefix[i + 1] = prefix[i] + nums[i]`,a:'O(n)',why:'It stores n + 1 totals. We trade O(n) memory for O(1) range queries.'},

/* ---------- dry runs ---------- */
{id:'arr-dr1',type:'dryrun',d:1,p:'traversal',title:'Running total',code:`nums = [4, 7, 2]
total = 0
for n in nums:
    total += n`,cols:['n','total'],rows:[['4','4'],['7','11'],['2','13']],why:'total accumulates: 0 + 4 = 4, 4 + 7 = 11, 11 + 2 = 13.'},
{id:'arr-dr2',type:'dryrun',d:1,p:'traversal',title:'Running maximum',code:`nums = [3, 8, 2, 9]
best = nums[0]
for x in nums:
    if x > best:
        best = x`,cols:['x','best'],rows:[['3','3'],['8','8'],['2','8'],['9','9']],why:'best only changes when a bigger value appears.'},
{id:'arr-dr3',type:'dryrun',d:2,p:'two-pointers',title:'Two-pointer reverse',code:`nums = [1, 2, 3, 4, 5]
left, right = 0, 4
while left < right:
    nums[left], nums[right] = nums[right], nums[left]
    left += 1
    right -= 1`,cols:['left','right','nums'],rows:[['1','3','[5, 2, 3, 4, 1]'],['2','2','[5, 4, 3, 2, 1]']],why:'First swap the ends, then the next pair in. The middle element never moves.'},
{id:'arr-dr4',type:'dryrun',d:1,p:'prefix-sum',title:'Prefix sums',code:`nums = [3, 1, 4, 2]
prefix = [0]
for x in nums:
    prefix.append(prefix[-1] + x)`,cols:['x','prefix'],given:[0],rows:[['3','[0, 3]'],['1','[0, 3, 4]'],['4','[0, 3, 4, 8]'],['2','[0, 3, 4, 8, 10]']],why:'Each step appends the newest running total.'},
{id:'arr-dr5',type:'dryrun',d:2,p:'kadane',title:"Kadane's algorithm",code:`nums = [-2, 1, -3, 4, -1, 2]
cur = best = nums[0]
for x in nums[1:]:
    cur = max(x, cur + x)
    best = max(best, cur)`,cols:['x','cur','best'],given:[0],rows:[['1','1','1'],['-3','-2','1'],['4','4','4'],['-1','3','4'],['2','5','5']],why:'At 4, restarting (4) beats extending (−2 + 4 = 2). The best run is [4, −1, 2] = 5.'},
{id:'arr-dr6',type:'dryrun',d:2,p:'sliding-window',title:'Fixed window of size 2',code:`nums = [2, 1, 5, 1, 3]
k = 2
window = nums[0] + nums[1]
best = window
for right in range(k, len(nums)):
    window += nums[right] - nums[right - k]
    best = max(best, window)`,cols:['right','window','best'],given:[0],rows:[['2','6','6'],['3','6','6'],['4','4','6']],why:'Each slide adds the new right element and subtracts the one that left: 3 + 5 − 2 = 6, 6 + 1 − 1 = 6, 6 + 3 − 5 = 4.'},
{id:'arr-dr7',type:'dryrun',d:2,p:'two-pointers',title:'Move zeroes with a write pointer',code:`nums = [0, 1, 0, 3, 12]
write = 0
for read in range(len(nums)):
    if nums[read] != 0:
        nums[write], nums[read] = nums[read], nums[write]
        write += 1`,cols:['read','write','nums'],given:[0],rows:[['0','0','[0, 1, 0, 3, 12]'],['1','1','[1, 0, 0, 3, 12]'],['2','1','[1, 0, 0, 3, 12]'],['3','2','[1, 3, 0, 0, 12]'],['4','3','[1, 3, 12, 0, 0]']],why:'write marks the next slot for a non-zero. Swapping (instead of copying) pushes zeros toward the end.'},

/* ---------- complete the code ---------- */
{id:'arr-b1',type:'blanks',d:1,p:'traversal',title:'Complete find_max',code:`def find_max(nums):
    maximum = ______

    for n in nums:
        if ______:
            ______

    return maximum`,blanks:[['nums[0]','float("-inf")',"float('-inf')"],['n > maximum','maximum < n','n >= maximum'],['maximum = n']],tests:[['find_max([3, 9, 2])','9'],['find_max([-5, -2, -9])','-2'],['find_max([7])','7']],hints:['What should maximum start as so that negative numbers still work?','Update maximum whenever you see something bigger.'],why:'Start from the first element (not 0, which breaks on all-negative input), then keep the larger value.'},
{id:'arr-b2',type:'blanks',d:1,p:'two-pointers',title:'Complete reverse in place',code:`def reverse(nums):
    left, right = 0, ______
    while ______:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        ______
    return nums`,blanks:[['len(nums) - 1','len(nums)-1'],['left < right','right > left'],['right -= 1','right = right - 1']],tests:[['reverse([1, 2, 3])','[3, 2, 1]'],['reverse([1, 2, 3, 4])','[4, 3, 2, 1]'],['reverse([])','[]']],why:'Pointers start at both ends and meet in the middle.'},
{id:'arr-b3',type:'blanks',d:2,p:'prefix-sum',title:'Complete range_sum with prefix sums',code:`def range_sum(nums, l, r):
    prefix = [0] * (len(nums) + 1)
    for i in range(len(nums)):
        prefix[i + 1] = ______
    return ______   # sum of nums[l..r], inclusive`,blanks:[['prefix[i] + nums[i]','nums[i] + prefix[i]'],['prefix[r + 1] - prefix[l]','prefix[r+1] - prefix[l]']],tests:[['range_sum([1, 2, 3, 4], 1, 2)','5'],['range_sum([5, -1, 3], 0, 2)','7'],['range_sum([4], 0, 0)','4']],hints:['prefix[i + 1] is the sum of the first i + 1 numbers.','Sum of l..r = (sum of the first r + 1) − (sum of the first l).'],why:'prefix[r + 1] counts everything up to r; subtracting prefix[l] removes everything before l.'},
{id:'arr-b4',type:'blanks',d:1,p:'traversal',title:'Complete count_evens',code:`def count_evens(nums):
    count = 0
    for n in nums:
        if ______:
            count += 1
    return count`,blanks:[['n % 2 == 0','not n % 2','n%2==0']],tests:[['count_evens([1, 2, 4, 7])','2'],['count_evens([])','0'],['count_evens([-2, 3])','1']],why:'A number is even when the remainder after dividing by 2 is 0.'},
{id:'arr-b5',type:'blanks',d:2,p:'sliding-window',title:'Complete the sliding window',code:`def max_sum_k(nums, k):
    window = sum(nums[:k])
    best = window
    for right in range(k, len(nums)):
        window += nums[right] - ______
        best = ______
    return best`,blanks:[['nums[right - k]','nums[right-k]'],['max(best, window)','max(window, best)']],tests:[['max_sum_k([2, 1, 5, 1, 3, 2], 3)','9'],['max_sum_k([1, 2], 2)','3'],['max_sum_k([-1, -2, -3], 1)','-1']],why:'The element leaving the window is k places behind the one entering.'},
{id:'arr-b6',type:'blanks',d:2,p:'kadane',title:"Complete Kadane's algorithm",code:`def max_subarray(nums):
    cur = best = nums[0]
    for x in nums[1:]:
        cur = ______
        best = ______
    return best`,blanks:[['max(x, cur + x)','max(cur + x, x)'],['max(best, cur)','max(cur, best)']],tests:[['max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])','6'],['max_subarray([-3, -1])','-1'],['max_subarray([2, 3])','5']],why:'Either extend the current run with x or start a new run at x; remember the best run ever seen.'},

/* ---------- debugging ---------- */
{id:'arr-d1',type:'debug',d:1,p:'traversal',title:'The total that is not a total',code:`def total(nums):
    result = 0
    for n in nums:
        result = n
    return result`,opts:['result should start at 1','It overwrites result instead of adding to it: use result += n','The loop skips the last element','It should return n'],a:1,why:'<code>result = n</code> replaces the value each time, so it returns the last element. Accumulate with <code>result += n</code>.',fix:`def total(nums):
    result = 0
    for n in nums:
        result += n
    return result`,tests:[['total([1, 2, 3])','6'],['total([])','0'],['total([5])','5']]},
{id:'arr-d2',type:'debug',d:1,p:'traversal',title:'Maximum of negative numbers',code:`def find_max(nums):
    best = 0
    for n in nums:
        if n > best:
            best = n
    return best`,opts:['The comparison should be >=','Starting at best = 0 is wrong when every number is negative','It should loop with range(len(nums))','It returns too early'],a:1,why:'For <code>[-3, -1, -7]</code> nothing beats 0, so it wrongly returns 0. Start from <code>nums[0]</code>.',fix:`def find_max(nums):
    best = nums[0]
    for n in nums:
        if n > best:
            best = n
    return best`,tests:[['find_max([-3, -1, -7])','-1'],['find_max([2, 8])','8']]},
{id:'arr-d3',type:'debug',d:1,p:'traversal',title:'One step too far',code:`def contains(nums, target):
    for i in range(len(nums) + 1):
        if nums[i] == target:
            return True
    return False`,opts:['range(len(nums) + 1) goes one past the last index, so a missing target raises IndexError','It should return False inside the loop','nums[i] should be nums[i - 1]','Nothing: it works'],a:0,why:'Valid indexes stop at len − 1. When the target is absent the loop reaches <code>nums[len(nums)]</code> and crashes.',fix:`def contains(nums, target):
    for x in nums:
        if x == target:
            return True
    return False`,tests:[['contains([1, 2], 5)','False'],['contains([1, 2], 2)','True'],['contains([], 1)','False']]},
{id:'arr-d4',type:'debug',d:2,p:'traversal',title:'Removing while looping',code:`def remove_evens(nums):
    for n in nums:
        if n % 2 == 0:
            nums.remove(n)
    return nums`,opts:['% should be //','Removing items from the list you are looping over makes the loop skip elements','remove() deletes the wrong value','It should return None'],a:1,hints:['Trace remove_evens([2, 4, 6, 1]) by hand. Which values does the loop actually visit?'],why:'After removing 2, everything shifts left and the loop moves on to index 1, skipping 4. Build a new list instead.',fix:`def remove_evens(nums):
    return [n for n in nums if n % 2 != 0]`,tests:[['remove_evens([2, 4, 6, 1])','[1]'],['remove_evens([1, 3])','[1, 3]']]},
{id:'arr-d5',type:'debug',d:1,p:'traversal',title:'Reversed copy crashes',code:`def reverse_copy(nums):
    result = []
    for i in range(len(nums)):
        result.append(nums[len(nums) - i])
    return result`,opts:['The index should be len(nums) - 1 - i','result should start as None','append should be extend','The function needs a while loop'],a:0,why:'When i is 0 the index is <code>len(nums)</code>, one past the end. The last valid index is <code>len(nums) - 1</code>.',fix:`def reverse_copy(nums):
    result = []
    for i in range(len(nums)):
        result.append(nums[len(nums) - 1 - i])
    return result`,tests:[['reverse_copy([1, 2, 3])','[3, 2, 1]'],['reverse_copy([])','[]']]},
{id:'arr-d6',type:'debug',d:1,p:'sorting',title:'Second largest with duplicates',code:`def second_largest(nums):
    nums = sorted(nums)
    return nums[-2]`,opts:['sorted() sorts in descending order','If the maximum appears twice, nums[-2] is the maximum again','nums[-2] is the smallest element','It changes the caller’s list'],a:1,why:'For <code>[5, 5, 3]</code> the answer should be 3, but <code>nums[-2]</code> is 5. Remove duplicates first.',fix:`def second_largest(nums):
    distinct = sorted(set(nums))
    return distinct[-2] if len(distinct) >= 2 else None`,tests:[['second_largest([5, 5, 3])','3'],['second_largest([1, 2])','1'],['second_largest([4, 4])','None']]},
{id:'arr-d7',type:'debug',d:2,p:'two-pointers',title:'Move zeroes forgets the zeroes',code:`def move_zeroes(nums):
    write = 0
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write] = nums[read]
            write += 1
    return nums`,opts:['The condition should be == 0','After the loop, every position from write to the end must be set to 0','write should start at 1','read should go backwards'],a:1,hints:['Run it on [0, 1, 0, 3]. What is left at the end of the list?'],why:'The non-zeros are copied forward, but the old values stay behind: <code>[0, 1, 0, 3]</code> becomes <code>[1, 3, 0, 3]</code>. Fill the tail with zeros (or swap instead of copying).',fix:`def move_zeroes(nums):
    write = 0
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write] = nums[read]
            write += 1
    for i in range(write, len(nums)):
        nums[i] = 0
    return nums`,tests:[['move_zeroes([0, 1, 0, 3])','[1, 3, 0, 0]'],['move_zeroes([1, 2])','[1, 2]']]},
{id:'arr-d8',type:'debug',d:2,p:'traversal',title:'Rotate by more than the length',code:`def rotate(nums, k):
    return nums[-k:] + nums[:-k]`,opts:['Slices cannot use negative numbers','k can be larger than len(nums): reduce it with k %= len(nums) first','It should be nums[k:] + nums[:k]','Lists cannot be added with +'],a:1,why:'For <code>rotate([1, 2, 3], 4)</code> the answer is the same as rotating by 1: <code>[3, 1, 2]</code>. With k = 4 the slices give the list unchanged.',fix:`def rotate(nums, k):
    if not nums:
        return nums
    k %= len(nums)
    return nums[-k:] + nums[:-k] if k else nums[:]`,tests:[['rotate([1, 2, 3], 4)','[3, 1, 2]'],['rotate([1, 2, 3], 1)','[3, 1, 2]'],['rotate([1, 2], 2)','[1, 2]']]},

/* ---------- choose / concepts ---------- */
{id:'arr-ch1',type:'choose',d:1,p:'traversal',title:'Jump to position i',q:'You need to read the element at any position i, millions of times. Which structure?',opts:['Python list (dynamic array)','Linked list','Set','Stack'],a:0,why:'Arrays give O(1) access by index. A linked list must walk i nodes; a set has no positions.'},
{id:'arr-ch2',type:'choose',d:1,p:'queue',title:'Work at both ends',q:'You need frequent insertion and removal at <b>both</b> ends.',opts:['List','Stack','Deque','Heap'],a:2,why:'<code>collections.deque</code> adds and removes at either end in O(1). A list is O(1) only at the end; <code>insert(0, x)</code> and <code>pop(0)</code> are O(n).'},
{id:'arr-ch3',type:'choose',d:1,p:'hashing',title:'Have I seen it?',q:'You check “is x in my collection?” thousands of times. Order does not matter.',opts:['List','Set','Tuple','Sorted list with a loop'],a:1,why:'Set membership is O(1) on average; a list scans in O(n).'},
{id:'arr-ch4',type:'choose',d:1,p:'prefix-sum',title:'Many range sums',q:'An array never changes, and you must answer 100,000 “sum from index l to r” questions.',opts:['Re-sum the slice for every question','Build a prefix-sum array once','Sort the array first','Use a stack'],a:1,why:'Prefix sums cost O(n) once, then each query is O(1): <code>prefix[r + 1] − prefix[l]</code>.'},
{id:'arr-m1',type:'mcq',d:1,p:'traversal',title:'Why is indexing O(1)?',q:'Why does <code>nums[i]</code> take the same time for i = 3 and i = 3,000,000?',opts:['Python caches recently used elements','Elements sit side by side, so the address is start + i × size','Lists are secretly hash tables','Because both numbers are small'],a:1,why:'Arrays are contiguous: the computer calculates the address directly instead of walking to it.'},
{id:'arr-m2',type:'mcq',d:2,p:'big-o',title:'Amortized append',q:'Sometimes <code>append</code> has to resize the list and copy all n elements. Why is append still called O(1)?',opts:['Copying is free in Python','Capacity grows by a constant factor, so resizes are rare and the average cost per append stays constant','Python never resizes lists','It is not: append is O(n)'],a:1,why:'After a resize to ~2× capacity, the next n appends are cheap. Spreading the copy cost over them gives O(1) <b>amortized</b>.'},
{id:'arr-m3',type:'mcq',d:1,p:'two-pointers',title:'When do opposite pointers work?',q:'Two pointers from both ends find a pair with a given sum in O(n)… when?',opts:['Always','When the array is sorted','When the array has no negatives','When the array length is even'],a:1,why:'Sorted order is what tells you which pointer to move: too small → move left up, too big → move right down.'},
{id:'arr-m4',type:'mcq',d:2,p:'sliding-window',title:'Why non-negative numbers?',q:'The “shrink while the sum ≥ target” window needs non-negative numbers. Why?',opts:['Negative numbers cannot be added','With negatives, removing an element from the left could make the sum bigger, so shrinking no longer moves toward “too small”','Python windows only support positives','It is only for speed'],a:1,why:'The window logic assumes growing increases the sum and shrinking decreases it. Negatives break that, and you need prefix sums + a hash map instead.'},

/* ---------- coding: easy ---------- */
{id:'arr-find-max',type:'code',d:1,p:'traversal',title:'Find Maximum',prompt:'<p>Return the largest number in a non-empty list <b>without</b> using <code>max()</code>.</p><p><code>find_max([3, 9, 2])</code> → <code>9</code></p>',starter:`def find_max(nums):
    # your code here
    pass`,solution:`def find_max(nums):
    best = nums[0]
    for n in nums[1:]:
        if n > best:
            best = n
    return best`,tests:[['find_max([3, 9, 2])','9'],['find_max([-5, -2, -9])','-2'],['find_max([7])','7'],['find_max([1, 1, 1])','1']],constraints:['1 ≤ len(nums) ≤ 10<sup>5</sup>'],mistakes:['Starting best at 0: wrong when every number is negative.','Sorting the list (O(n log n)) just to read one value.'],followup:'Return the index of the maximum instead of its value.',hints:['Keep one variable holding the biggest value seen so far.','Start it from nums[0], not 0: what if every number is negative?'],approach:'Single scan with a running maximum.',cx:'O(n) time, O(1) space'},
{id:'arr-find-min',type:'code',d:1,p:'traversal',title:'Find Minimum',prompt:'<p>Return the smallest number in the list, or <code>None</code> if the list is empty. Do not use <code>min()</code>.</p>',starter:`def find_min(nums):
    pass`,solution:`def find_min(nums):
    if not nums:
        return None
    best = nums[0]
    for n in nums:
        if n < best:
            best = n
    return best`,tests:[['find_min([3, 9, 2])','2'],['find_min([])','None'],['find_min([-1, -8, 0])','-8'],['find_min([4])','4']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>'],mistakes:['Crashing on an empty list instead of returning None.','Starting the minimum at 0 or a "large" constant that might be too small.'],followup:'Find the minimum and the maximum in one pass with about 1.5n comparisons.',hints:['Handle the empty list first.','Then scan, keeping the smallest seen so far.'],approach:'Guard clause for empty input, then a running minimum.',cx:'O(n) time, O(1) space'},
{id:'arr-second-largest',type:'code',d:1,p:'traversal',title:'Second Largest',prompt:'<p>Return the second largest <b>distinct</b> value, or <code>None</code> if there is none.</p><p><code>second_largest([4, 9, 2, 9])</code> → <code>4</code> · <code>second_largest([7, 7])</code> → <code>None</code></p>',starter:`def second_largest(nums):
    # your code here
    pass`,solution:`def second_largest(nums):
    first = second = None
    for x in nums:
        if first is None or x > first:
            first, second = x, first
        elif x != first and (second is None or x > second):
            second = x
    return second`,tests:[['second_largest([4, 9, 2, 9])','4'],['second_largest([7, 7])','None'],['second_largest([])','None'],['second_largest([-1, -5, -3])','-3'],['second_largest([1, 2])','1']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>'],mistakes:['Returning the largest again when it appears twice.','Sorting: O(n log n) for an O(n) problem.'],followup:'Return the k-th largest distinct value.',hints:['A short version: sorted(set(nums)) and take the second from the end if it exists.','Can you do it in one pass? Track the top two distinct values.'],approach:'One pass keeping the two largest distinct values seen so far.',cx:'O(n) time, O(1) space',explain:'The short version with <code>sorted(set(nums))</code> is also correct, just O(n log n).'},
{id:'arr-reverse',type:'code',d:1,p:'two-pointers',title:'Reverse Array',prompt:'<p>Reverse the list <b>in place</b> (modify <code>nums</code> itself). Do not use <code>reversed()</code>, <code>.reverse()</code> or <code>[::-1]</code>.</p>',starter:`def reverse(nums):
    # swap from the outside in
    pass`,solution:`def reverse(nums):
    left, right = 0, len(nums) - 1
    while left < right:
        nums[left], nums[right] = nums[right], nums[left]
        left += 1
        right -= 1`,post:`def _check(a):
    reverse(a)
    return a`,tests:[['_check([1, 2, 3, 4, 5])','[5, 4, 3, 2, 1]',,'reverse(nums) on [1, 2, 3, 4, 5] → nums becomes [5, 4, 3, 2, 1]'],['_check([1, 2])','[2, 1]','','[1, 2] → [2, 1]'],['_check([])','[]','','[] stays []'],['_check([7])','[7]','','[7] stays [7]']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>','O(1) extra space'],mistakes:['Looping to the end instead of the middle, which reverses everything twice.','Building a new list instead of changing nums.'],followup:'Reverse only the part between indexes l and r.',hints:['Use two indexes: one at each end.','Swap, then move both toward the middle until they meet.'],approach:'Two pointers from both ends, swapping as they move inward.',cx:'O(n) time, O(1) space'},
{id:'arr-remove-dups',type:'code',d:1,p:'two-pointers',title:'Remove Duplicates from Sorted Array',prompt:'<p><code>nums</code> is sorted. Remove duplicates <b>in place</b> so each value appears once, and return <code>k</code>, the number of unique values. The first k slots must hold them in order (what is after them does not matter).</p><p><code>[1, 1, 2]</code> → returns 2, nums starts with <code>[1, 2]</code></p>',starter:`def remove_duplicates(nums):
    pass`,solution:`def remove_duplicates(nums):
    if not nums:
        return 0
    write = 1
    for read in range(1, len(nums)):
        if nums[read] != nums[read - 1]:
            nums[write] = nums[read]
            write += 1
    return write`,post:`def _check(a):
    k = remove_duplicates(a)
    return (k, a[:k])`,tests:[['_check([1, 1, 2])','(2, [1, 2])','','[1, 1, 2] → k = 2, [1, 2]'],['_check([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])','(5, [0, 1, 2, 3, 4])','','[0, 0, 1, 1, 1, 2, 2, 3, 3, 4] → k = 5'],['_check([])','(0, [])','','[] → k = 0'],['_check([5])','(1, [5])','','[5] → k = 1']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>','nums is sorted; O(1) extra space'],mistakes:['Deleting from the list while looping over it (O(n²), and skips elements).','Returning the list instead of k.'],followup:'Allow each value at most twice.',hints:['Because the list is sorted, duplicates sit next to each other.','Keep a write index for the next unique value, and a read index that scans ahead.'],approach:'Slow/fast pointers: read scans, write marks where the next new value goes.',cx:'O(n) time, O(1) space'},
{id:'arr-move-zeroes',type:'code',d:1,p:'two-pointers',title:'Move Zeroes',prompt:'<p>Move all zeros to the end <b>in place</b>, keeping the order of the non-zero numbers.</p><p><code>[0, 1, 0, 3, 12]</code> → <code>[1, 3, 12, 0, 0]</code></p>',starter:`def move_zeroes(nums):
    pass`,solution:`def move_zeroes(nums):
    write = 0
    for read in range(len(nums)):
        if nums[read] != 0:
            nums[write], nums[read] = nums[read], nums[write]
            write += 1`,post:`def _check(a):
    move_zeroes(a)
    return a`,tests:[['_check([0, 1, 0, 3, 12])','[1, 3, 12, 0, 0]','','[0, 1, 0, 3, 12] → [1, 3, 12, 0, 0]'],['_check([0])','[0]','','[0] → [0]'],['_check([1, 2])','[1, 2]','','[1, 2] → [1, 2]'],['_check([0, 0, 1])','[1, 0, 0]','','[0, 0, 1] → [1, 0, 0]']],constraints:['1 ≤ len(nums) ≤ 10<sup>5</sup>','in place, O(1) extra space'],mistakes:['Removing zeros with remove() and appending them: O(n²).','Changing the order of the non-zero numbers.'],followup:'Minimise the number of writes to the list.',hints:['Keep an index write for where the next non-zero should go.','When you find a non-zero, swap it into position write.'],approach:'Write pointer + swap: non-zeros move forward in order, zeros drift back.',cx:'O(n) time, O(1) space'},
{id:'arr-two-sum',type:'code',d:1,p:'hashing',title:'Two Sum',prompt:'<p>Return the indices <code>[i, j]</code> (with i &lt; j) of the two numbers that add up to <code>target</code>. Exactly one answer exists. You may not use the same element twice.</p><p><code>two_sum([2, 7, 11, 15], 9)</code> → <code>[0, 1]</code></p>',starter:`def two_sum(nums, target):
    pass`,solution:`def two_sum(nums, target):
    seen = {}                      # value -> index
    for i, x in enumerate(nums):
        need = target - x
        if need in seen:
            return [seen[need], i]
        seen[x] = i`,brute:{code:`def two_sum(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return [i, j]`,cx:'O(n²)'},tests:[['two_sum([2, 7, 11, 15], 9)','[0, 1]'],['two_sum([3, 2, 4], 6)','[1, 2]'],['two_sum([3, 3], 6)','[0, 1]'],['two_sum([-1, -2, -3, -4, -5], -8)','[2, 4]']],constraints:['2 ≤ len(nums) ≤ 10<sup>4</sup>','exactly one answer exists'],mistakes:['Storing the current number before checking, which pairs a number with itself.','Returning values instead of indexes.'],followup:'Return all pairs that add up to target, without duplicates.',hints:['For each number x, what other number are you looking for?','Can you remember the numbers you have already passed, so the lookup is instant?'],approach:'Hash map from value to index. For each x, check whether target − x was seen before; if not, store x.',cx:'O(n) time, O(n) space',improve:'The nested-loop version is O(n²). Storing seen values in a dict turns the inner search into an O(1) lookup.'},
{id:'arr-stock',type:'code',d:1,p:'greedy',title:'Best Time to Buy and Sell Stock',prompt:'<p><code>prices[i]</code> is the price on day i. Buy on one day and sell on a <b>later</b> day. Return the maximum profit, or 0 if no profit is possible.</p><p><code>[7, 1, 5, 3, 6, 4]</code> → <code>5</code> (buy at 1, sell at 6)</p>',starter:`def max_profit(prices):
    pass`,solution:`def max_profit(prices):
    lowest = float("inf")
    best = 0
    for p in prices:
        lowest = min(lowest, p)
        best = max(best, p - lowest)
    return best`,tests:[['max_profit([7, 1, 5, 3, 6, 4])','5'],['max_profit([7, 6, 4, 3, 1])','0'],['max_profit([2, 4, 1])','2'],['max_profit([1])','0']],constraints:['1 ≤ len(prices) ≤ 10<sup>5</sup>'],mistakes:['Selling before buying (using max − min of the whole list).','Returning a negative profit instead of 0.'],followup:'You may buy and sell many times (pt-stock-ii).',hints:['If you sell today, which buy day is best?','Track the lowest price seen so far as you scan.'],approach:'One pass: remember the cheapest price so far, and the best “sell today” profit.',cx:'O(n) time, O(1) space'},
{id:'arr-running-sum',type:'code',d:1,p:'prefix-sum',title:'Running Sum',prompt:'<p>Return a new list where element i is the sum of <code>nums[0..i]</code>.</p><p><code>[1, 2, 3, 4]</code> → <code>[1, 3, 6, 10]</code></p>',starter:`def running_sum(nums):
    pass`,solution:`def running_sum(nums):
    result = []
    total = 0
    for x in nums:
        total += x
        result.append(total)
    return result`,tests:[['running_sum([1, 2, 3, 4])','[1, 3, 6, 10]'],['running_sum([])','[]'],['running_sum([5])','[5]'],['running_sum([3, -3, 2])','[3, 0, 2]']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>'],mistakes:['Recomputing sum(nums[:i + 1]) for every i: O(n²).','Modifying the input list when a new one was asked for.'],followup:'Use itertools.accumulate, then answer range sums with the result.',hints:['Keep a running total.','Keep a running total and append it after adding each number.'],approach:'Accumulate as you go; never re-add earlier numbers.',cx:'O(n) time'},
{id:'arr-max-sum-k',type:'code',d:1,p:'sliding-window',title:'Maximum Sum of k in a Row',prompt:'<p>Return the largest sum of any <code>k</code> consecutive numbers (1 ≤ k ≤ len(nums)).</p><p><code>max_sum_k([2, 1, 5, 1, 3, 2], 3)</code> → <code>9</code> (5 + 1 + 3)</p>',starter:`def max_sum_k(nums, k):
    pass`,solution:`def max_sum_k(nums, k):
    window = sum(nums[:k])
    best = window
    for right in range(k, len(nums)):
        window += nums[right] - nums[right - k]
        best = max(best, window)
    return best`,tests:[['max_sum_k([2, 1, 5, 1, 3, 2], 3)','9'],['max_sum_k([2, 3, 4, 1, 5], 2)','7'],['max_sum_k([5], 1)','5'],['max_sum_k([-1, -2, -3], 2)','-3']],constraints:['1 ≤ k ≤ len(nums) ≤ 10<sup>5</sup>'],mistakes:['Recomputing each window with sum(): O(n · k).','Starting best at 0 when every sum can be negative.'],followup:'Return the start index of the best window too.',hints:['Neighbouring windows share k − 1 numbers.','Slide: add the number entering, subtract the one leaving.'],approach:'Fixed-size sliding window: one add and one subtract per step.',cx:'O(n) time, O(1) space'},
{id:'arr-merge-sorted',type:'code',d:1,p:'two-pointers',title:'Merge Two Sorted Lists',prompt:'<p>Given two sorted lists, return one sorted list with all their elements. Do not call <code>sorted()</code>.</p>',starter:`def merge_sorted(a, b):
    pass`,solution:`def merge_sorted(a, b):
    i = j = 0
    out = []
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            out.append(a[i])
            i += 1
        else:
            out.append(b[j])
            j += 1
    out.extend(a[i:])
    out.extend(b[j:])
    return out`,tests:[['merge_sorted([1, 3, 5], [2, 4, 6])','[1, 2, 3, 4, 5, 6]'],['merge_sorted([], [1])','[1]'],['merge_sorted([1, 2, 2], [2, 3])','[1, 2, 2, 2, 3]'],['merge_sorted([], [])','[]']],constraints:['0 ≤ len(a), len(b) ≤ 10<sup>5</sup>','a and b are sorted'],mistakes:['Forgetting to copy what is left of one list after the other runs out.','Calling sorted(a + b): O((n + m) log(n + m)).'],followup:'Merge k sorted lists with a heap.',hints:['Look at the front of each list: which one comes next?','When one list runs out, the rest of the other is already sorted.'],approach:'One pointer per list; always take the smaller front element.',cx:'O(n + m) time'},
{id:'arr-majority',type:'code',d:1,p:'hashing',title:'Majority Element',prompt:'<p>The majority element appears more than n / 2 times (it always exists). Return it.</p><p><code>[2, 2, 1, 1, 1, 2, 2]</code> → <code>2</code></p>',starter:`def majority(nums):
    pass`,solution:`def majority(nums):
    candidate, count = None, 0
    for x in nums:
        if count == 0:
            candidate = x
        count += 1 if x == candidate else -1
    return candidate`,tests:[['majority([3, 2, 3])','3'],['majority([2, 2, 1, 1, 1, 2, 2])','2'],['majority([1])','1'],['majority([5, 5, 5, 1, 1])','5'],['majority([-1, 2, -1])','-1']],constraints:['1 ≤ len(nums) ≤ 10<sup>5</sup>','a majority element always exists'],mistakes:['Sorting to find it (O(n log n)) when O(n) is possible.','Returning the most common element without checking the majority guarantee.'],followup:'Solve it in O(1) extra space with the Boyer-Moore voting algorithm.',hints:['Counting with a dict works in O(n) time and O(n) space.','Bonus (Boyer–Moore voting): pair each majority element with a different one; the majority survives.'],approach:'Counting works; Boyer–Moore voting does it in O(1) space.',cx:'O(n) time, O(1) space (voting)'},
{id:'arr-missing',type:'code',d:1,p:'math',title:'Missing Number',prompt:'<p><code>nums</code> holds n distinct numbers from the range 0..n. Exactly one is missing: return it.</p><p><code>[3, 0, 1]</code> → <code>2</code></p>',starter:`def missing_number(nums):
    pass`,solution:`def missing_number(nums):
    n = len(nums)
    return n * (n + 1) // 2 - sum(nums)`,tests:[['missing_number([3, 0, 1])','2'],['missing_number([0, 1])','2'],['missing_number([9, 6, 4, 2, 3, 5, 7, 0, 1])','8'],['missing_number([0])','1']],constraints:['1 ≤ n ≤ 10<sup>4</sup>','all numbers are distinct'],mistakes:['Forgetting that n itself may be the missing number.','Sorting first: O(n log n).'],followup:'Solve it with XOR (bit-missing).',hints:['What should 0 + 1 + … + n add up to?','Compare with the actual sum.'],approach:'Expected sum n(n + 1)/2 minus the actual sum.',cx:'O(n) time, O(1) space'},
{id:'arr-pivot',type:'code',d:1,p:'prefix-sum',title:'Find Pivot Index',prompt:'<p>Return the leftmost index where the sum of the numbers strictly to its left equals the sum strictly to its right, or -1.</p><p><code>[1, 7, 3, 6, 5, 6]</code> → <code>3</code> (1 + 7 + 3 = 5 + 6 = 11)</p>',starter:`def pivot_index(nums):
    pass`,solution:`def pivot_index(nums):
    total = sum(nums)
    left = 0
    for i, x in enumerate(nums):
        if left == total - left - x:
            return i
        left += x
    return -1`,tests:[['pivot_index([1, 7, 3, 6, 5, 6])','3'],['pivot_index([1, 2, 3])','-1'],['pivot_index([2, 1, -1])','0'],['pivot_index([])','-1']],constraints:['0 ≤ len(nums) ≤ 10<sup>4</sup>','values may be negative'],mistakes:['Including nums[i] in the left or right sum.','Recomputing both sums for every index: O(n²).'],followup:'Return every pivot index, not just the leftmost.',hints:['If you know the total and the left sum, what is the right sum?','right = total − left − nums[i].'],approach:'One running left sum; the right sum follows from the total.',cx:'O(n) time, O(1) space'},
{id:'arr-max-ones',type:'code',d:1,p:'traversal',title:'Max Consecutive Ones',prompt:'<p>Return the length of the longest run of 1s in a list of 0s and 1s.</p>',starter:`def max_ones(nums):
    pass`,solution:`def max_ones(nums):
    best = run = 0
    for x in nums:
        run = run + 1 if x == 1 else 0
        best = max(best, run)
    return best`,tests:[['max_ones([1, 1, 0, 1, 1, 1])','3'],['max_ones([1, 0, 1, 1, 0, 1])','2'],['max_ones([])','0'],['max_ones([0, 0])','0']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>'],mistakes:['Forgetting to compare the final run after the loop ends.','Resetting the best count instead of the current count on a 0.'],followup:'Allow one 0 to be flipped (arr-longest-ones-k).',hints:['Count the current run; reset it on a 0.','Keep the current run length and the best so far; a 0 resets the current run.'],approach:'Current run length + best so far.',cx:'O(n) time'},
{id:'arr-plus-one',type:'code',d:1,p:'simulation',title:'Plus One',prompt:'<p>A number is stored as a list of digits (most significant first). Return the digits of that number plus one.</p><p><code>[1, 2, 9]</code> → <code>[1, 3, 0]</code> · <code>[9, 9]</code> → <code>[1, 0, 0]</code></p>',starter:`def plus_one(digits):
    pass`,solution:`def plus_one(digits):
    digits = digits[:]
    for i in range(len(digits) - 1, -1, -1):
        if digits[i] < 9:
            digits[i] += 1
            return digits
        digits[i] = 0
    return [1] + digits`,tests:[['plus_one([1, 2, 3])','[1, 2, 4]'],['plus_one([9, 9])','[1, 0, 0]'],['plus_one([0])','[1]'],['plus_one([4, 3, 9])','[4, 4, 0]']],constraints:['1 ≤ len(digits) ≤ 100','no leading zeros except the number 0'],mistakes:['Converting to int and back (works in Python, but misses the point of the exercise).','Forgetting the extra leading 1 for all nines.'],followup:'Add two numbers stored as digit lists.',hints:['Work from the last digit backwards.','A 9 becomes 0 and carries; anything else just increases and you are done.'],approach:'Right-to-left carry, prepend 1 if every digit was 9.',cx:'O(n) time'},
{id:'arr-monotonic',type:'code',d:1,p:'traversal',title:'Monotonic Array',prompt:'<p>Return True if the list is entirely non-decreasing or entirely non-increasing.</p>',starter:`def is_monotonic(nums):
    pass`,solution:`def is_monotonic(nums):
    up = down = True
    for i in range(1, len(nums)):
        if nums[i] < nums[i - 1]:
            up = False
        if nums[i] > nums[i - 1]:
            down = False
    return up or down`,tests:[['is_monotonic([1, 2, 2, 3])','True'],['is_monotonic([6, 5, 4, 4])','True'],['is_monotonic([1, 3, 2])','False'],['is_monotonic([])','True']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>'],mistakes:['Requiring strictly increasing values (equal neighbours are allowed).','Checking only the first pair to decide the direction.'],followup:'Do it in a single pass that tracks both directions.',hints:['Track two flags: could it still be increasing? decreasing?','Track two flags: "could still be non-decreasing" and "could still be non-increasing".'],approach:'Compare neighbours once, keeping two flags.',cx:'O(n) time'},
{id:'arr-above-avg',type:'code',d:1,p:'traversal',title:'Count Above Average',prompt:'<p>Return how many numbers are strictly greater than the average. Return 0 for an empty list.</p>',starter:`def count_above_average(nums):
    pass`,solution:`def count_above_average(nums):
    if not nums:
        return 0
    avg = sum(nums) / len(nums)
    return sum(1 for x in nums if x > avg)`,tests:[['count_above_average([1, 2, 3, 4])','2'],['count_above_average([5, 5, 5])','0'],['count_above_average([])','0'],['count_above_average([-1, 1])','1']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>'],mistakes:['Dividing by zero on an empty list.','Using integer division for the average.'],followup:'Count how many are within 10% of the average.',hints:['Two passes are fine: one for the average, one to count.','Compute the average once, then count in a second pass.'],approach:'Compute the average once, then count.',cx:'O(n) time'},

/* ---------- coding: medium ---------- */
{id:'arr-rotate',type:'code',d:2,p:'two-pointers',title:'Rotate Array',prompt:'<p>Rotate the list to the right by <code>k</code> steps, <b>in place</b>. k may be larger than the length.</p><p><code>[1, 2, 3, 4, 5, 6, 7], k = 3</code> → <code>[5, 6, 7, 1, 2, 3, 4]</code></p>',starter:`def rotate(nums, k):
    pass`,solution:`def rotate(nums, k):
    n = len(nums)
    if n == 0:
        return
    k %= n

    def rev(lo, hi):
        while lo < hi:
            nums[lo], nums[hi] = nums[hi], nums[lo]
            lo += 1
            hi -= 1

    rev(0, n - 1)      # 7 6 5 4 3 2 1
    rev(0, k - 1)      # 5 6 7 | 4 3 2 1
    rev(k, n - 1)      # 5 6 7 | 1 2 3 4`,post:`def _check(a, k):
    rotate(a, k)
    return a`,tests:[['_check([1, 2, 3, 4, 5, 6, 7], 3)','[5, 6, 7, 1, 2, 3, 4]','','[1..7], k = 3 → [5, 6, 7, 1, 2, 3, 4]'],['_check([-1, -100, 3, 99], 2)','[3, 99, -1, -100]','','[-1, -100, 3, 99], k = 2'],['_check([1, 2], 3)','[2, 1]','','[1, 2], k = 3 (k > n)'],['_check([1], 0)','[1]','','[1], k = 0'],['_check([], 4)','[]','','[] stays []']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>','0 ≤ k ≤ 10<sup>9</sup>'],mistakes:['Forgetting k %= n, so large k does too much work or fails.','Rotating one step at a time: O(n · k).'],followup:'Do it with three reversals in O(1) extra space.',hints:['Rotating by n changes nothing, so first do k %= n.','In place trick: reverse the whole list, then reverse the first k and the rest separately.'],approach:'Three reversals (O(1) extra space), or slice assignment nums[:] = nums[-k:] + nums[:-k] (O(n) extra).',cx:'O(n) time, O(1) space'},
{id:'arr-max-subarray',type:'code',d:2,p:'kadane',title:'Maximum Subarray',prompt:'<p>Return the largest sum of any non-empty contiguous subarray.</p><p><code>[-2, 1, -3, 4, -1, 2, 1, -5, 4]</code> → <code>6</code> (<code>[4, -1, 2, 1]</code>)</p>',starter:`def max_subarray(nums):
    pass`,solution:`def max_subarray(nums):
    cur = best = nums[0]
    for x in nums[1:]:
        cur = max(x, cur + x)
        best = max(best, cur)
    return best`,brute:{code:`def max_subarray(nums):
    best = nums[0]
    for i in range(len(nums)):
        total = 0
        for j in range(i, len(nums)):
            total += nums[j]
            best = max(best, total)
    return best`,cx:'O(n²)'},tests:[['max_subarray([-2, 1, -3, 4, -1, 2, 1, -5, 4])','6'],['max_subarray([1])','1'],['max_subarray([5, 4, -1, 7, 8])','23'],['max_subarray([-3, -1, -2])','-1']],constraints:['1 ≤ len(nums) ≤ 10<sup>5</sup>','−10<sup>4</sup> ≤ nums[i] ≤ 10<sup>4</sup>'],mistakes:['Starting best at 0: wrong when all numbers are negative.','Resetting the running sum to 0 before comparing with best.'],followup:'Return the start and end indexes of the best subarray.',hints:['Brute force: try every start i and every end j. Can you avoid recomputing?','At each number: is it better to extend the run ending just before, or to start fresh here?'],approach:"Kadane's algorithm: cur = max(x, cur + x), best = max(best, cur).",cx:'O(n) time, O(1) space'},
{id:'arr-product-except',type:'code',d:2,p:'prefix-sum',title:'Product of Array Except Self',prompt:'<p>Return a list where element i is the product of every number except <code>nums[i]</code>. <b>Do not use division.</b></p><p><code>[1, 2, 3, 4]</code> → <code>[24, 12, 8, 6]</code></p>',starter:`def product_except_self(nums):
    pass`,solution:`def product_except_self(nums):
    n = len(nums)
    out = [1] * n
    left = 1
    for i in range(n):            # product of everything to the left
        out[i] = left
        left *= nums[i]
    right = 1
    for i in range(n - 1, -1, -1):  # times everything to the right
        out[i] *= right
        right *= nums[i]
    return out`,tests:[['product_except_self([1, 2, 3, 4])','[24, 12, 8, 6]'],['product_except_self([-1, 1, 0, -3, 3])','[0, 0, 9, 0, 0]'],['product_except_self([2, 3])','[3, 2]'],['product_except_self([0, 0, 5])','[0, 0, 0]'],['product_except_self([1, 1, 1, 1])','[1, 1, 1, 1]']],constraints:['2 ≤ len(nums) ≤ 10<sup>5</sup>','no division allowed'],mistakes:['Dividing the total product by nums[i] (breaks with zeros).','Using two extra lists when the output list can hold the prefix products.'],followup:'Use O(1) extra space besides the output.',hints:['The answer at i = (product of everything left of i) × (product of everything right of i).','Build the left products in one pass and multiply in the right products in a second pass backwards.'],approach:'Prefix products from the left, suffix products from the right.',cx:'O(n) time, O(1) extra space (besides the output)'},
{id:'arr-container',type:'code',d:2,p:'two-pointers',title:'Container With Most Water',prompt:'<p><code>height[i]</code> is the height of a wall at position i. Pick two walls; the water they hold is <code>min(height) × distance</code>. Return the maximum.</p><p><code>[1, 8, 6, 2, 5, 4, 8, 3, 7]</code> → <code>49</code></p>',starter:`def max_area(height):
    pass`,solution:`def max_area(height):
    left, right = 0, len(height) - 1
    best = 0
    while left < right:
        area = min(height[left], height[right]) * (right - left)
        best = max(best, area)
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    return best`,brute:{code:`def max_area(height):
    best = 0
    for i in range(len(height)):
        for j in range(i + 1, len(height)):
            best = max(best, min(height[i], height[j]) * (j - i))
    return best`,cx:'O(n²)'},tests:[['max_area([1, 8, 6, 2, 5, 4, 8, 3, 7])','49'],['max_area([1, 1])','1'],['max_area([4, 3, 2, 1, 4])','16'],['max_area([1, 2, 1])','2']],constraints:['2 ≤ len(height) ≤ 10<sup>5</sup>'],mistakes:['Moving the taller wall inward (that can never help).','Trying every pair: O(n²).'],followup:'Explain why moving the shorter wall can never skip the best answer.',hints:['Start with the widest container: one pointer at each end.','Moving the taller wall inward can never help. Which pointer should move?'],approach:'Two pointers from both ends; always move the shorter wall.',cx:'O(n) time, O(1) space'},
{id:'arr-sorted-squares',type:'code',d:2,p:'two-pointers',title:'Squares of a Sorted Array',prompt:'<p><code>nums</code> is sorted (it may contain negatives). Return the squares in sorted order, in O(n).</p><p><code>[-4, -1, 0, 3, 10]</code> → <code>[0, 1, 9, 16, 100]</code></p>',starter:`def sorted_squares(nums):
    pass`,solution:`def sorted_squares(nums):
    n = len(nums)
    out = [0] * n
    left, right = 0, n - 1
    for pos in range(n - 1, -1, -1):
        if abs(nums[left]) > abs(nums[right]):
            out[pos] = nums[left] ** 2
            left += 1
        else:
            out[pos] = nums[right] ** 2
            right -= 1
    return out`,tests:[['sorted_squares([-4, -1, 0, 3, 10])','[0, 1, 9, 16, 100]'],['sorted_squares([-7, -3, 2, 3, 11])','[4, 9, 9, 49, 121]'],['sorted_squares([])','[]'],['sorted_squares([-2, -1])','[1, 4]']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>','nums is sorted'],mistakes:['Squaring and sorting: O(n log n).','Filling the result from the front with two pointers (the largest squares are at the ends).'],followup:'Return sorted absolute values of the cubes instead.',hints:['The biggest square is at one of the two ends.','Fill the output from the back with two pointers.'],approach:'Two pointers at the ends; place the larger square at the back of the output.',cx:'O(n) time'},
{id:'arr-min-len',type:'code',d:2,p:'sliding-window',title:'Minimum Size Subarray Sum',prompt:'<p>All numbers are positive. Return the length of the shortest contiguous subarray whose sum is ≥ <code>target</code>, or 0 if none.</p><p><code>min_subarray_len(7, [2, 3, 1, 2, 4, 3])</code> → <code>2</code> (<code>[4, 3]</code>)</p>',starter:`def min_subarray_len(target, nums):
    pass`,solution:`def min_subarray_len(target, nums):
    left = total = 0
    best = float("inf")
    for right in range(len(nums)):
        total += nums[right]
        while total >= target:
            best = min(best, right - left + 1)
            total -= nums[left]
            left += 1
    return 0 if best == float("inf") else best`,tests:[['min_subarray_len(7, [2, 3, 1, 2, 4, 3])','2'],['min_subarray_len(4, [1, 4, 4])','1'],['min_subarray_len(11, [1, 1, 1, 1, 1, 1, 1, 1])','0'],['min_subarray_len(15, [1, 2, 3, 4, 5])','5']],constraints:['1 ≤ len(nums) ≤ 10<sup>5</sup>','all numbers are positive'],mistakes:['Not shrinking the window as far as possible.','Returning n + 1 or infinity instead of 0 when no window works.'],followup:'What changes if numbers can be negative? (pt-shortest-subarray-k)',hints:['Grow the window to the right until the sum is big enough.','Then shrink from the left while it stays big enough, recording the length.'],approach:'Variable-size sliding window: expand right, shrink left while valid.',cx:'O(n) time, O(1) space'},
{id:'arr-sort-colors',type:'code',d:2,p:'two-pointers',title:'Sort Colors (0s, 1s and 2s)',prompt:'<p>Sort a list containing only 0, 1 and 2 <b>in place</b> in one pass, without calling sort.</p><p><code>[2, 0, 2, 1, 1, 0]</code> → <code>[0, 0, 1, 1, 2, 2]</code></p>',starter:`def sort_colors(nums):
    pass`,solution:`def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1`,post:`def _check(a):
    sort_colors(a)
    return a`,tests:[['_check([2, 0, 2, 1, 1, 0])','[0, 0, 1, 1, 2, 2]','','[2, 0, 2, 1, 1, 0]'],['_check([2, 0, 1])','[0, 1, 2]','','[2, 0, 1]'],['_check([])','[]','','[]'],['_check([1, 1])','[1, 1]','','[1, 1]']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>','one pass, in place'],mistakes:['Incrementing i after swapping with the high pointer (the swapped-in value is unchecked).','Counting and rewriting: correct but two passes.'],followup:'Sort four colours in one pass.',hints:['Counting the 0s, 1s and 2s and rewriting works in two passes.','One pass: keep three regions with pointers low (end of 0s), mid (scanner), high (start of 2s).'],approach:'Dutch national flag: three pointers partition into 0s | 1s | unknown | 2s.',cx:'O(n) time, O(1) space'},
{id:'arr-three-sum',type:'code',d:2,p:'two-pointers',title:'3Sum',prompt:'<p>Return all <b>unique</b> triplets <code>[a, b, c]</code> from the list with a + b + c = 0. Write each triplet in ascending order; the order of the triplets does not matter.</p><p><code>[-1, 0, 1, 2, -1, -4]</code> → <code>[[-1, -1, 2], [-1, 0, 1]]</code></p>',starter:`def three_sum(nums):
    pass`,solution:`def three_sum(nums):
    nums = sorted(nums)
    out = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue                      # skip duplicate first values
        left, right = i + 1, len(nums) - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s < 0:
                left += 1
            elif s > 0:
                right -= 1
            else:
                out.append([nums[i], nums[left], nums[right]])
                left += 1
                while left < right and nums[left] == nums[left - 1]:
                    left += 1
    return out`,tests:[['three_sum([-1, 0, 1, 2, -1, -4])','[[-1, -1, 2], [-1, 0, 1]]','unordered'],['three_sum([0, 1, 1])','[]','unordered'],['three_sum([0, 0, 0, 0])','[[0, 0, 0]]','unordered'],['three_sum([-2, 0, 0, 2, 2])','[[-2, 0, 2]]','unordered']],constraints:['3 ≤ len(nums) ≤ 3000'],mistakes:['Not skipping duplicate values, which repeats triplets.','Three nested loops: O(n³).'],followup:'Return the triplet whose sum is closest to a target.',hints:['Sort first. Fix the first number, then you need a pair summing to its negative.','A pair sum in a sorted array is a two-pointer job. Skip equal neighbours to avoid duplicates.'],approach:'Sort, fix i, two pointers on the rest; skip duplicates.',cx:'O(n²) time'},
{id:'arr-subarray-sum-k',type:'code',d:2,p:'prefix-sum',title:'Subarray Sum Equals K',prompt:'<p>Count the contiguous subarrays whose sum is exactly <code>k</code>. Numbers can be negative.</p><p><code>subarray_sum([1, 1, 1], 2)</code> → <code>2</code></p>',starter:`def subarray_sum(nums, k):
    pass`,solution:`def subarray_sum(nums, k):
    count = 0
    prefix = 0
    seen = {0: 1}          # prefix sum -> how many times it occurred
    for x in nums:
        prefix += x
        count += seen.get(prefix - k, 0)
        seen[prefix] = seen.get(prefix, 0) + 1
    return count`,tests:[['subarray_sum([1, 1, 1], 2)','2'],['subarray_sum([1, 2, 3], 3)','2'],['subarray_sum([1, -1, 0], 0)','3'],['subarray_sum([], 0)','0']],constraints:['0 ≤ len(nums) ≤ 2 × 10<sup>4</sup>','numbers can be negative'],mistakes:['A sliding window, which fails with negative numbers.','Forgetting seen[0] = 1 for subarrays that start at index 0.'],followup:'Return the longest subarray with sum k.',hints:['A subarray i..j sums to k exactly when prefix[j + 1] − prefix[i] = k.','As you scan, count how many earlier prefix sums equal (current prefix − k). A dict stores those counts.'],approach:'Prefix sums + a hash map of how often each prefix has occurred. (A sliding window fails with negatives.)',cx:'O(n) time, O(n) space'},
{id:'arr-longest-ones-k',type:'code',d:2,p:'sliding-window',title:'Max Consecutive Ones with k Flips',prompt:'<p>You may flip at most <code>k</code> zeros to ones. Return the longest run of 1s you can make.</p><p><code>longest_ones([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)</code> → <code>6</code></p>',starter:`def longest_ones(nums, k):
    pass`,solution:`def longest_ones(nums, k):
    left = zeros = best = 0
    for right, x in enumerate(nums):
        if x == 0:
            zeros += 1
        while zeros > k:
            if nums[left] == 0:
                zeros -= 1
            left += 1
        best = max(best, right - left + 1)
    return best`,tests:[['longest_ones([1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0], 2)','6'],['longest_ones([0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1], 3)','10'],['longest_ones([0, 0], 0)','0'],['longest_ones([1, 0, 1], 1)','3']],constraints:['1 ≤ len(nums) ≤ 10<sup>5</sup>','0 ≤ k ≤ len(nums)'],mistakes:['Restarting the window from scratch after too many zeros (O(n²)).','Counting ones instead of zeros inside the window.'],followup:'Return the window boundaries too.',hints:['Rephrase: longest window containing at most k zeros.','Grow right; when there are too many zeros, move left until there are k again.'],approach:'Variable window tracking the number of zeros inside.',cx:'O(n) time'},
{id:'arr-range-sum',type:'code',kind:'optimize',d:2,p:'prefix-sum',title:'Optimize: Many Range Sums',prompt:'<p><code>range_sums(nums, queries)</code> answers each query <code>(l, r)</code> with <code>sum(nums[l..r])</code> (inclusive). The starter is correct but O(n · q): with 20,000 numbers and 20,000 queries it is far too slow. Make it O(n + q).</p>',starter:`def range_sums(nums, queries):
    answers = []
    for l, r in queries:
        answers.append(sum(nums[l:r + 1]))   # O(n) per query
    return answers`,solution:`def range_sums(nums, queries):
    prefix = [0]
    for x in nums:
        prefix.append(prefix[-1] + x)
    return [prefix[r + 1] - prefix[l] for l, r in queries]`,tests:[['range_sums([1, 2, 3, 4, 5], [(0, 2), (1, 4), (3, 3)])','[6, 14, 4]'],['range_sums([5, -2], [(0, 1)])','[3]'],['range_sums(list(range(20000)), [(0, 19999)] * 20000)','[199990000] * 20000','','20,000 queries on 20,000 numbers (must be fast)'],['range_sums([0], [(0, 0), (0, 0)])','[0, 0]']],constraints:['1 ≤ n, q ≤ 2 × 10<sup>4</sup>'],mistakes:['Building a new prefix list for every query.','Off-by-one: prefix[r] − prefix[l] instead of prefix[r + 1] − prefix[l].'],followup:'Support updates between queries (rq-num-array).',hints:['Every query re-adds numbers you already added for earlier queries.','Precompute running totals once; then each query is a subtraction.'],approach:'Prefix sums: O(n) to build, O(1) per query.',cx:'O(n + q) time'},
{id:'arr-pair-sorted',type:'code',kind:'optimize',d:2,p:'two-pointers',title:'Optimize: Pair Sum in a Sorted List',prompt:'<p><code>nums</code> is sorted. Return True if two different positions add up to <code>target</code>. The starter checks every pair: O(n²). Use the sorted order to make it O(n) with O(1) extra space.</p>',starter:`def has_pair_sorted(nums, target):
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] + nums[j] == target:
                return True
    return False`,solution:`def has_pair_sorted(nums, target):
    left, right = 0, len(nums) - 1
    while left < right:
        total = nums[left] + nums[right]
        if total == target:
            return True
        if total < target:
            left += 1
        else:
            right -= 1
    return False`,tests:[['has_pair_sorted([1, 3, 4, 6, 8, 11], 10)','True'],['has_pair_sorted([1, 2, 3], 7)','False'],['has_pair_sorted([], 0)','False'],['has_pair_sorted(list(range(20000)), 39997)','True','','20,000 numbers, pair at the very end (must be fast)'],['has_pair_sorted(list(range(0, 40000, 2)), 3)','False','','20,000 even numbers, odd target (must be fast)']],constraints:['0 ≤ len(nums) ≤ 10<sup>5</sup>','nums is sorted; O(1) extra space'],mistakes:['Using the same position twice (left == right).','Moving both pointers at once.'],followup:'Count all pairs with the target sum.',hints:['If nums[left] + nums[right] is too small, can nums[left] be part of any answer?','Move one pointer per step; each step rules out one element.'],approach:'Opposite-direction two pointers on the sorted list.',cx:'O(n) time, O(1) space'},

/* ---------- coding: hard ---------- */
{id:'arr-trap',type:'code',d:3,p:'two-pointers',title:'Trapping Rain Water',prompt:'<p><code>height</code> describes an elevation map with bars of width 1. Return how much rain water it traps.</p><p><code>[0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]</code> → <code>6</code></p>',starter:`def trap(height):
    pass`,solution:`def trap(height):
    left, right = 0, len(height) - 1
    left_max = right_max = 0
    water = 0
    while left < right:
        if height[left] < height[right]:
            left_max = max(left_max, height[left])
            water += left_max - height[left]
            left += 1
        else:
            right_max = max(right_max, height[right])
            water += right_max - height[right]
            right -= 1
    return water`,tests:[['trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])','6'],['trap([4, 2, 0, 3, 2, 5])','9'],['trap([])','0'],['trap([3])','0'],['trap([2, 0, 2])','2']],constraints:['0 ≤ len(height) ≤ 10<sup>5</sup>'],mistakes:['Using only the left maximum or only the right maximum.','O(n²) by scanning both sides for every bar.'],followup:'Solve it with a monotonic stack and compare with the two-pointer version.',hints:['Water above bar i = min(tallest bar to its left, tallest to its right) − height[i].','Prefix max + suffix max arrays give O(n) time and O(n) space. Two pointers can drop the extra arrays: process the side with the smaller wall.'],approach:'Two pointers with running left_max and right_max; the smaller side is always safe to settle.',cx:'O(n) time, O(1) space'},
{id:'arr-first-missing',type:'code',d:3,p:'hashing',title:'First Missing Positive',prompt:'<p>Return the smallest positive integer that is <b>not</b> in the list. Aim for O(n) time and O(1) extra space (you may modify the list).</p><p><code>[3, 4, -1, 1]</code> → <code>2</code></p>',starter:`def first_missing_positive(nums):
    pass`,solution:`def first_missing_positive(nums):
    n = len(nums)
    for i in range(n):
        # place value v at index v - 1 while it belongs inside 1..n
        while 1 <= nums[i] <= n and nums[nums[i] - 1] != nums[i]:
            j = nums[i] - 1
            nums[i], nums[j] = nums[j], nums[i]
    for i in range(n):
        if nums[i] != i + 1:
            return i + 1
    return n + 1`,tests:[['first_missing_positive([1, 2, 0])','3'],['first_missing_positive([3, 4, -1, 1])','2'],['first_missing_positive([7, 8, 9, 11, 12])','1'],['first_missing_positive([1])','2'],['first_missing_positive([])','1']],constraints:['1 ≤ len(nums) ≤ 10<sup>5</sup>','O(n) time, O(1) extra space'],mistakes:['Sorting: O(n log n).','Swapping into place with a while loop that never ends on duplicates.'],followup:'Find the k-th missing positive number.',hints:['With a set it is easy in O(n) space: check 1, 2, 3, … The answer is at most n + 1.','O(1) space: use the list itself as the “set”. Put each value v (1 ≤ v ≤ n) at index v − 1.'],approach:'Cyclic placement: swap every in-range value to its home index, then find the first index that does not hold i + 1.',cx:'O(n) time, O(1) space'},
{id:'arr-max-circular',type:'code',d:3,p:'kadane',title:'Maximum Sum Circular Subarray',prompt:'<p>The list is circular (the end wraps to the start). Return the maximum sum of a non-empty subarray.</p><p><code>[5, -3, 5]</code> → <code>10</code> (5 + 5, wrapping)</p>',starter:`def max_circular(nums):
    pass`,solution:`def max_circular(nums):
    cur_max = cur_min = 0
    best_max, best_min = nums[0], nums[0]
    total = 0
    for x in nums:
        cur_max = max(x, cur_max + x)
        best_max = max(best_max, cur_max)
        cur_min = min(x, cur_min + x)
        best_min = min(best_min, cur_min)
        total += x
    if best_max < 0:          # every number is negative
        return best_max
    return max(best_max, total - best_min)`,tests:[['max_circular([1, -2, 3, -2])','3'],['max_circular([5, -3, 5])','10'],['max_circular([-3, -2, -3])','-2'],['max_circular([3, -1, 2, -1])','4']],constraints:['1 ≤ len(nums) ≤ 3 × 10<sup>4</sup>'],mistakes:['Returning total − min subarray when every number is negative (that empties the subarray).','Doubling the list and running Kadane without limiting the length to n.'],followup:'Return the indexes of the best circular subarray.',hints:['Either the best subarray does not wrap (plain Kadane), or it wraps.','A wrapping subarray = total − (a middle subarray you skip). Skip the minimum-sum subarray.'],approach:'Kadane for the max and for the min; answer = max(best_max, total − best_min), unless everything is negative.',cx:'O(n) time, O(1) space'}
]);
