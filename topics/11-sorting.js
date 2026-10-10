/* Topic 11 · Sorting. */
COURSE.topic({id:'sorting',
goal:'Understand how the classic sorting algorithms work, compare their costs, and use Python’s sorted() with keys like a pro.',
learn:[
{title:'Simple sorts: bubble, selection, insertion',short:'O(n²) sorts',mins:12,lead:'Three easy algorithms that each build the sorted result one element at a time. All are O(n²), but they differ in swaps, early exits and behaviour on nearly sorted data.',does:['visualize','predict','dry run','code'],blocks:[
 {t:'viz',fn:'sorting',title:'Compare them',intro:'Run Bubble, Selection and Insertion on the same input, then on “Sorted” input. Which one finishes almost instantly?'},
 {t:'table',head:['Algorithm','Idea','Best','Worst','Stable'],rows:[['Bubble','Swap neighbours that are out of order; the largest bubbles to the end','O(n)','O(n²)','yes'],['Selection','Select the minimum of the rest; swap it into place','O(n²)','O(n²)','no'],['Insertion','Insert each item into the sorted part on its left','O(n)','O(n²)','yes']]},
 {t:'q',ids:['so-p5','so-dr1','so-dr2','so-dr3']},
 {t:'q',ids:['so-c1','so-c3','so-m2','so-ch3']},
 {t:'q',ids:['so-b1','so-d1']},
 {t:'q',title:'Code it',ids:['so-bubble','so-insertion']}]},

{title:'Merge sort',short:'Merge sort',mins:10,lead:'Divide and conquer: split the list in half, sort each half, then merge two sorted lists in linear time. Always O(n log n).',does:['visualize','complete','debug','code'],blocks:[
 {t:'diagram',text:`
            [38, 27, 43, 3]
           /               \\
       [38, 27]          [43, 3]          split (log n levels)
       /     \\           /     \\
     [38]   [27]       [43]    [3]
       \\     /           \\     /
       [27, 38]          [3, 43]          merge (n work per level)
           \\               /
            [3, 27, 38, 43]`,aria:'Merge sort split and merge tree'},
 {t:'viz',fn:'sorting',title:'Watch the merges',arg:{alg:'merge'}},
 {t:'q',ids:['so-m3','so-c2','so-c7','so-b2','so-d2']},
 {t:'q',title:'Code it',ids:['so-merge-sort']}]},

{title:'Quick sort and heap sort',short:'Quick + heap',mins:10,lead:'Quick sort partitions around a pivot and recurses; it is fast in practice but O(n²) with bad pivots. Heap sort uses a max-heap and needs no extra memory.',does:['visualize','predict','complexity','code'],blocks:[
 {t:'viz',fn:'sorting',title:'Partition, then heapify',arg:{alg:'quick'},intro:'Run Quick on “Sorted” input and count the comparisons. Then try Heap.'},
 {t:'q',ids:['so-p6','so-c4','so-m4','so-m5']},
 {t:'q',title:'Code it',ids:['so-quick-sort','so-kth-largest']}]},

{title:'Sorting in Python',short:'sorted() + keys',mins:9,lead:'In real code you call sorted() or list.sort(): Timsort, stable, O(n log n). The skill is choosing the key.',does:['predict','complete','code'],blocks:[
 {t:'code',title:'Keys and stability',code:`people = [("ann", 30), ("bob", 25), ("cat", 30)]
print(sorted(people, key=lambda p: p[1]))            # by age; ties keep their order
print(sorted(people, key=lambda p: (-p[1], p[0])))   # age desc, then name
words = ["banana", "Apple", "cherry"]
print(sorted(words, key=str.lower))                  # case-insensitive
print(sorted(words, key=len, reverse=True))`},
 {t:'q',ids:['so-p1','so-p2','so-p3','so-p4','so-p7','so-m1','so-m6','so-c5']},
 {t:'q',ids:['so-b3','so-d3']},
 {t:'q',title:'Code it',ids:['so-people','so-meetings','so-relative']}]},

{title:'Beyond comparisons: counting sort',short:'Counting sort',mins:6,lead:'If values are small integers, count them instead of comparing them: O(n + k).',does:['complexity','choose','code'],blocks:[
 {t:'q',ids:['so-c6','so-ch1','so-ch2']},
 {t:'q',title:'Code it',ids:['so-counting']}]}],

challenge:[
 {t:'b2o',title:'Count Inversions: every pair → merge sort',qid:'so-inversions',problem:'<p>Count pairs i &lt; j with nums[i] &gt; nums[j].</p>',
  brute:{code:`def count_inversions(nums):
    count = 0
    for i in range(len(nums)):
        for j in range(i + 1, len(nums)):
            if nums[i] > nums[j]:
                count += 1
    return count`,cx:'O(n²)',why:'Every pair is checked.'},
  slow:{q:'When merging two SORTED halves, if right[j] is smaller than left[i], what do you know?',opts:['Nothing','right[j] is also smaller than every remaining item of the left half: that is len(left) − i inversions at once','Only one inversion','The halves are equal'],a:1,why:'Sorted halves let you count many inversions with one comparison.'},
  better:{q:'So which algorithm should do the counting?',opts:['Bubble sort','Merge sort, counting while merging','Binary search','Counting sort'],a:1,why:'The merge step already compares exactly the right pairs.'},
  optimal:{code:`def count_inversions(nums):
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
                inv += len(left) - i
        return out + left[i:] + right[j:], inv
    return sort(nums)[1]`,cx:'O(n log n)',why:'Same cost as merge sort itself.'},
  takeaway:'<p>Sorting algorithms are also tools: piggy-back extra counting on their work.</p>'}],

review:[
 {t:'flash',items:[['Bubble sort?','Swap neighbours; O(n²); O(n) best with early exit.'],['Selection sort?','Pick the minimum each pass; always O(n²); not stable.'],['Insertion sort?','Grow a sorted prefix; great on nearly sorted data.'],['Merge sort?','Split, sort halves, merge; O(n log n), O(n) space, stable.'],['Quick sort?','Partition around a pivot; O(n log n) expected, O(n²) worst.'],['Heap sort?','Build a max-heap, extract max repeatedly; O(n log n), O(1) space.'],['Stable?','Equal keys keep their original order.'],['Python sort?','Timsort, stable; use key=.']]}]
});
